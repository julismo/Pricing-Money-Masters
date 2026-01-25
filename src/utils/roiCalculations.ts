// Re-export types from types/index.ts for backward compatibility
export type { UnifiedFormData, FormData, CalculationResults } from '@/types';

// Logic for Working Days
const WORKING_DAYS_MAP = {
    "5dias": 5,
    "6dias": 6,
    "7dias": 7
};

// MODO A: TEMPO (Default - Realista)
// MODO A: TEMPO (Default - Realista)
const TEMPO_ASSUMPTIONS = {
    utilizationFactor: 0.75,        // 75% do tempo recuperado vira cortes (Revised up from 65%)
    aiEfficiency: 0.80,             // 80% das perdidas a IA resolve
    conversionRate: 0.85,           // 85% convertem em marcação
    capacityLimit: true,            // Respeita limite de horas/dia
    contextSwitch: 3,               // 3 min de penalização
    safetyMargin: 1.00              // 100% (No artificial safety margin penalty)
};

// MODO B: OPORTUNIDADE (Otimista - Potencial Máximo)
const OPORTUNIDADE_ASSUMPTIONS = {
    utilizationFactor: 0.85,        // 85% do tempo recuperado vira cortes
    aiEfficiency: 0.85,             // 85% das perdidas (mais otimista)
    conversionRate: 0.90,           // 90% convertem (cliente motivado)
    capacityLimit: false,           // Assume que vais expandir se necessário
    contextSwitch: 3,               // Mantém realista
    safetyMargin: 1.00              // No safety margin (speculative ceiling)
};

// NEW: Ramp-up factors for first months (simulates implementation learning curve)
// Only applies to TEMPO (Realista) mode
const RAMP_UP_FACTORS = [
    0.55,  // Month 1: 55% efficiency (implementation phase)
    0.85,  // Month 2: 85% efficiency (stabilization)
    0.95,  // Month 3: 95% efficiency (near-optimal)
    1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00  // Month 4+: 100%
];

import { SEASONALITY_FACTORS } from './seasonalityData';

export function calculateUnifiedROI(
    data: UnifiedFormData
): CalculationResults {

    // 0. Validação de Inputs (Edge Cases)
    if (data.cutDuration <= 0) {
        throw new Error("Tempo de corte deve ser maior que zero");
    }
    if (data.averageTicket <= 0) {
        throw new Error("Valor médio do corte deve ser maior que zero");
    }
    if (data.callsPerWeek < 0) {
        throw new Error("Número de chamadas não pode ser negativo");
    }
    if (data.callDuration < 0) {
        throw new Error("Duração da chamada não pode ser negativa");
    }
    if (data.missedCallsPercent < 0 || data.missedCallsPercent > 100) {
        throw new Error("Percentual de chamadas perdidas deve estar entre 0 e 100");
    }

    // 1. Selecionar Assumptions
    const assumptions = data.calculationMode === "tempo"
        ? TEMPO_ASSUMPTIONS
        : OPORTUNIDADE_ASSUMPTIONS;

    // 2. Ajustar por Dias Úteis
    const workingDaysPerWeek = WORKING_DAYS_MAP[data.workingDays] || 5; // Default to 5 if undefined
    const weeksPerMonth = 4.3;

    // 3. Volume Base
    const callsPerMonth = Math.round(data.callsPerWeek * weeksPerMonth);
    const missedRate = data.missedCallsPercent / 100;
    const callsMissed = Math.round(callsPerMonth * missedRate);
    const callsAnswered = callsPerMonth - callsMissed;

    // 4. VETOR 1: Tempo Recuperado (Chamadas Atendidas)
    const timeWastedMinutes = callsAnswered * (data.callDuration + assumptions.contextSwitch);
    const convertibleMinutes = timeWastedMinutes * assumptions.utilizationFactor;
    const cutsFromTime = convertibleMinutes / data.cutDuration;
    const revenueFromTime = cutsFromTime * data.averageTicket;

    // 5. VETOR 2: Oportunidade (Chamadas Perdidas)
    // Re-enabled to show true potential value, even in Realistic mode
    const aiRecovered = callsMissed * assumptions.aiEfficiency;

    // In Realistic mode, we apply a 50% conservative factor to the opportunity
    // This allows us to acknowledge the value without being overly optimistic
    const opportunityFactor = data.calculationMode === "tempo" ? 0.50 : 1.0;

    // Calculate new clients with the factor
    const newClients = aiRecovered * assumptions.conversionRate * opportunityFactor;

    // Revenue from additional clients (Ticket Médio * Novos Clientes)
    const revenueFromOpportunity = newClients * data.averageTicket;

    // 6. Limitação de Capacidade (só no modo TEMPO)
    // Agora a receita final é a SOMA dos dois vetores (Tempo + Oportunidade)
    let finalRevenue = revenueFromTime + revenueFromOpportunity;

    if (assumptions.capacityLimit) {
        // Assume 8h/dia de trabalho
        const maxMinutesPerMonth = (8 * 60) * workingDaysPerWeek * weeksPerMonth;

        // CORREÇÃO: Considerar TODOS os cortes (tempo recuperado + novos clientes)
        // Antes só considerava cutsFromTime, agora inclui newClients também
        const totalCuts = cutsFromTime + newClients;
        const totalMinutes = totalCuts * data.cutDuration;

        // Se o total de cortes (ganho de tempo + novos clientes) exceder capacidade física
        if (totalMinutes > maxMinutesPerMonth) {
            const capFactor = maxMinutesPerMonth / totalMinutes;
            if (capFactor < 1) {
                // Aplicar fator de capacidade proporcionalmente à receita
                finalRevenue = finalRevenue * capFactor;
            }
        }
    }

    // 7. Custos
    // PATCH: Variable cost fixed to €0.12/min (per provider table)
    const COST_PER_MIN = 0.12;
    const variableCost = (callsPerMonth * data.callDuration) * COST_PER_MIN;
    const INFRA_COST = 22; // €22/month base infrastructure
    const totalCostMonthly = INFRA_COST + variableCost;
    const totalCostYearly = totalCostMonthly * 12;

    // 8. ROI
    // User requested: "Optimistic" mode should automatically enable seasonality
    const effectiveSeasonality = data.useSeasonality || data.calculationMode === "oportunidade";

    const monthlyRevenue = finalRevenue;
    const yearlyRevenue = effectiveSeasonality
        ? calculateWithSeasonality(monthlyRevenue, data, assumptions)
        : monthlyRevenue * 12;

    const netProfitYearly = yearlyRevenue - totalCostYearly;

    const roiPercent = totalCostYearly > 0
        ? ((yearlyRevenue - totalCostYearly) / totalCostYearly) * 100
        : 0;

    // PATCH: Fixed payback formula (ChatGPT correction)
    const netMonthlyProfit = monthlyRevenue - totalCostMonthly;
    const paybackMonths = netMonthlyProfit > 0
        ? Math.ceil(totalCostMonthly / netMonthlyProfit)
        : 0; // 0 = "Não compensa" (loss-making scenario)

    // 9. Calculate Effective Conversion for Charts
    // Como removemos a "Oportunidade", a conversão efetiva é baseada apenas na recuperação de tempo
    // convertida em equivalente a "novos cortes".
    // Para visualização, mantemos a projeção de "se o tempo fosse agendamentos":
    const cutsRecovered = cutsFromTime; // Cortes extras possíveis pelo tempo salvo

    // Ratio: (Cortes Extras) / Chamadas Totais
    // Isso é puramente visual para o gráfico de barras "mostrar algo" proporcional ao ganho
    const effectiveConversionRate = Math.min(
        (cutsRecovered) / callsPerMonth,
        1.5
    );

    // Generate Monthly Data
    const monthlyData = generateMonthlyData(
        monthlyRevenue,
        callsPerMonth,
        totalCostMonthly,
        effectiveSeasonality,
        data,
        assumptions,
        effectiveConversionRate
    );

    // 10. Get startMonth seasonality factor for dynamic Card HOJE
    const startMonthIndex = parseInt(data.startMonth || "0");
    const startMonthSeasonalityFactor = effectiveSeasonality
        ? SEASONALITY_FACTORS[startMonthIndex].factor
        : 1.0;

    return {
        mode: data.calculationMode,
        isSeasonal: effectiveSeasonality,
        startMonthSeasonalityFactor, // NEW: Allows Card HOJE to dynamically reflect start month
        callsPerMonth,
        minutesInCalls: timeWastedMinutes,
        realTimeLost: timeWastedMinutes,
        hoursLost: timeWastedMinutes / 60,

        // Mapped fields for UI compatibility
        cutsLost: cutsFromTime,
        revenueLostTime: revenueFromTime,
        missedCalls: callsMissed,
        clientsLost: newClients, // Será 0
        revenueLostCalls: revenueFromOpportunity, // Será 0

        // Results
        totalBenefitMonthly: monthlyRevenue,
        totalBenefitYearly: yearlyRevenue,

        variableCost,
        totalCostMonthly,
        totalCostYearly,

        netProfitYearly,
        roiPercent,
        paybackMonths,

        // Extra UI params
        impliedHourlyRate: (data.averageTicket / data.cutDuration) * 60,
        aiSafetyMargin: (1 - assumptions.aiEfficiency) * 100,
        lowVolumeWarning: callsPerMonth < 40, // NEW: Warn if less than ~10 calls/week
        recommendedSetup: Math.round(yearlyRevenue * 0.20), // NEW: 20% of yearly value = fair price

        // #region agent log (apenas em desenvolvimento)
        // Debug: Log calculation results for pricing validation
        ...(() => {
            // Apenas executar em modo desenvolvimento para evitar erros em produção
            // Vite: import.meta.env.MODE === 'development' ou import.meta.env.DEV
            // Safe check for Node environment (testing) where import.meta.env is undefined
            const isDev = typeof import.meta.env !== 'undefined' && import.meta.env.MODE === 'development';
            if (isDev) {
                fetch('http://127.0.0.1:7242/ingest/06be08a1-ac35-45a9-b258-8ec6e4d80378', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        location: 'roiCalculations.ts:195',
                        message: 'ROI Calculation Complete',
                        data: {
                            mode: data.calculationMode,
                            yearlyRevenue: Math.round(yearlyRevenue),
                            recommendedSetup: Math.round(yearlyRevenue * 0.20),
                            monthlyRevenue: Math.round(monthlyRevenue),
                            totalCostYearly: Math.round(totalCostYearly),
                            netProfitYearly: Math.round(netProfitYearly),
                            roiPercent: Math.round(roiPercent),
                            paybackMonths,
                            callsPerMonth,
                            cutsFromTime: Math.round(cutsFromTime * 10) / 10,
                            revenueFromTime: Math.round(revenueFromTime),
                            revenueFromOpportunity: Math.round(revenueFromOpportunity),
                            newClients: Math.round(newClients * 10) / 10
                        },
                        timestamp: Date.now(),
                        sessionId: 'debug-session',
                        runId: 'run1',
                        hypothesisId: 'A'
                    })
                }).catch(() => { });
            }
            return {};
        })(),
        // #endregion

        // Metadata
        assumptions: {
            utilization: assumptions.utilizationFactor * 100,
            aiEfficiency: assumptions.aiEfficiency * 100,
            workingDays: workingDaysPerWeek
        },

        monthlyData
    };
}

function calculateWithSeasonality(
    baseMonthlyRevenue: number,
    data: UnifiedFormData,
    assumptions: { capacityLimit: boolean }
): number {
    let totalYearlyRevenue = 0;

    SEASONALITY_FACTORS.forEach(month => {
        const adjustedRevenue = baseMonthlyRevenue * month.factor;

        if (data.calculationMode === "tempo" && month.factor > 1.15) {
            const stressPenalty = 0.90;
            totalYearlyRevenue += adjustedRevenue * stressPenalty;
        } else {
            totalYearlyRevenue += adjustedRevenue;
        }
    });

    return totalYearlyRevenue;
}

function generateMonthlyData(
    baseRevenue: number,
    baseCalls: number,
    baseCost: number,
    useSeasonality: boolean,
    data: UnifiedFormData,
    assumptions: any,
    effectiveConversionRate: number = 1.0 // Default to 1 if not passed
) {
    let cumulativeProfit = 0;
    const startMonthIndex = parseInt(data.startMonth || "0"); // Default to Jan
    const isRealistaMode = data.calculationMode === "tempo";
    const safetyMargin = assumptions.safetyMargin || 1.0;

    // Get the seasonality factor for the START MONTH (anchor point)
    const startMonthFactor = useSeasonality
        ? SEASONALITY_FACTORS[startMonthIndex].factor
        : 1.0;

    // Create array of 12 months starting from startMonth
    const rotatedMonths = Array.from({ length: 12 }, (_, i) => {
        const index = (startMonthIndex + i) % 12;
        return SEASONALITY_FACTORS[index];
    });

    return rotatedMonths.map((month, index) => {
        const monthFactor = useSeasonality ? month.factor : 1.0;

        // NEW LOGIC: Input is the ANCHOR for start month
        // Other months scale RELATIVE to the start month's factor
        // Formula: baseCalls × (thisMonthFactor / startMonthFactor)
        // This ensures: startMonth shows exactly baseCalls, other months scale proportionally
        const relativeFactor = useSeasonality
            ? (monthFactor / startMonthFactor)
            : 1.0;

        // Distribution logic - revenue also scales relatively
        let revenue = baseRevenue * relativeFactor;

        // NEW: Apply ramp-up factor for Realista mode (first 3 months reduced efficiency)
        if (isRealistaMode) {
            const rampUpFactor = RAMP_UP_FACTORS[index] || 1.0;
            revenue *= rampUpFactor;
        }

        // NEW: Apply safety margin (10% reduction for Realista, 0% for Otimista)
        revenue *= safetyMargin;

        // Dynamic Calls Visualization
        // ANCHOR LOGIC: baseCalls × relativeFactor
        // Shows actual call volume per month, adjusted for seasonality
        let calls = Math.round(baseCalls * relativeFactor);

        // Apply stress penalty logic if applicable (high season stress)
        if (useSeasonality && isRealistaMode && monthFactor > 1.15) {
            revenue *= 0.90;
            // Also explicitly impact calls to show the "stress" visual
            calls = Math.round(calls * 0.95); // 5% drop in managed calls due to chaos
        }

        // PATCH: Scale cost with seasonality (more calls = more AI minutes = more cost)
        const cost = baseCost * relativeFactor;

        const profit = revenue - cost;
        cumulativeProfit += profit;

        return {
            month: month.month,
            revenue,
            calls,
            cost,
            profit,
            cumulativeProfit
        };
    });
}

// Stub for backward compatibility if needed, though we should update calls
export function calculateROI(data: UnifiedFormData): CalculationResults {
    return calculateUnifiedROI(data);
}

// Deprecated or mapped 
export function calculateSeasonalROI(data: UnifiedFormData): CalculationResults {
    // If we want to force seasonality on
    const newData = { ...data, useSeasonality: true };
    return calculateUnifiedROI(newData);
}
