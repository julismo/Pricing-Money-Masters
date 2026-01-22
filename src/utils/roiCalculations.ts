// Re-export types from types/index.ts for backward compatibility
export type { UnifiedFormData, FormData, CalculationResults } from '@/types';

// Logic for Working Days
const WORKING_DAYS_MAP = {
    "5dias": 5,
    "6dias": 6,
    "7dias": 7
};

// MODO A: TEMPO (Default - Realista)
const TEMPO_ASSUMPTIONS = {
    utilizationFactor: 0.65,        // 65% do tempo recuperado vira cortes
    aiEfficiency: 0.80,             // 80% das perdidas a IA resolve
    conversionRate: 0.85,           // 85% convertem em marcação
    capacityLimit: true,            // Respeita limite de horas/dia
    contextSwitch: 3,               // 3 min de penalização
    safetyMargin: 0.90              // NEW: 10% extra safety margin (conservative)
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

    // 5. VETOR 2: Oportunidade (Chamadas Perdidas) - REMOVIDO POR SER ESPECULATIVO
    // Mantemos as variaveis zeradas para compatibilidade de UI se necessário, mas não somamos à receita
    const aiRecovered = callsMissed * assumptions.aiEfficiency;
    // const newClients = aiRecovered * assumptions.conversionRate; // REMOVIDO
    const newClients = 0; // Forçamos 0 pois não é quantificável
    const revenueFromOpportunity = 0; // Forçamos 0 pois não é quantificável

    // 6. Limitação de Capacidade (só no modo TEMPO)
    // Agora a receita final é APENAS o tempo recuperado
    let finalRevenue = revenueFromTime;

    if (assumptions.capacityLimit) {
        // Assume 8h/dia de trabalho
        const maxMinutesPerMonth = (8 * 60) * workingDaysPerWeek * weeksPerMonth;

        // Current productivity + efficiency gain
        const currentMinutes = cutsFromTime * data.cutDuration;

        // Se o ganho de tempo tentar "ultrapassar" limites fisicos? (Lógica simplificada aqui)
        // Na verdade, como é tempo recuperado, ele já "cabe" no dia pois era tempo desperdiçado.
        // Mas mantemos a verificação de sanidade
        if (currentMinutes > maxMinutesPerMonth) {
            const capFactor = maxMinutesPerMonth / currentMinutes;
            if (capFactor < 1) {
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
