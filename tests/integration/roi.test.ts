// STANDALONE VALIDATION SCRIPT (No imports, purely for math verification)

// 1. DATA
const SEASONALITY_FACTORS = [
    { month: 'Janeiro', factor: 0.75, label: 'Pós-Festas' },
    { month: 'Fevereiro', factor: 0.80, label: 'Inverno' },
    { month: 'Março', factor: 0.85, label: 'Início Primavera' },
    { month: 'Abril', factor: 0.90, label: 'Páscoa' },
    { month: 'Maio', factor: 1.00, label: 'Base' },
    { month: 'Junho', factor: 1.10, label: 'Santo António' },
    { month: 'Julho', factor: 0.95, label: 'Pré-Férias' },
    { month: 'Agosto', factor: 0.70, label: 'Férias (Vale)' },
    { month: 'Setembro', factor: 0.85, label: 'Regresso' },
    { month: 'Outubro', factor: 0.95, label: 'Estável' },
    { month: 'Novembro', factor: 1.05, label: 'Black Friday' },
    { month: 'Dezembro', factor: 1.20, label: 'Natal (Pico)' },
];

const WEEKS_PER_MONTH = 4.3;
const CONTEXT_SWITCH_PENALTY_MINUTES = 3;
const UTILISATION_FACTOR = 0.6;
const COST_PER_MINUTE = 0.12;
const FIXED_MONTHLY_COST = 22;

const BOOKING_CONVERSION_RATE = 0.40;
const AI_EFFICIENCY_RATE = 0.75;
const BASE_NO_SHOW_RATE = 0.15;
const NO_SHOW_RECOVERY_FACTOR = 0.30;

interface InputData {
    callsPerWeek: number;
    callDuration: number;
    cutDuration: number;
    averageTicket: number;
    missedCallsPercent: number;
    workingDays: number;
}

interface Results {
    totalBenefitYearly: number;
    roiPercent: number;
    paybackMonths: number;
    netProfitYearly: number;
    auditROI: number;
}

// 2. LOGIC
function calculateProductivityGains(monthlyFactor: number, baseOccupancy = 0.65): number {
    const currentOccupancy = baseOccupancy * monthlyFactor;

    // 1. UPPER BOUND: If barber is too busy, they can't squeeze in more cuts (Capacity Limit)
    if (currentOccupancy > 0.85) return 0;     // Full/Lotado
    if (currentOccupancy > 0.75) return 0.5;   // Very limited space

    // 2. LOWER BOUND: If barber is empty, efficiency doesn't matter (Demand Limit)
    // Paradox Fix: You can't gain revenue from "focus" if you have no clients to focus on.
    if (currentOccupancy < 0.60) return 0;     // Shop is too empty (e.g. August)

    // 3. SWEET SPOT: Busy enough to have clients, but messy enough to need AI efficiency
    if (currentOccupancy > 0.65) return 0.75;   // Limited space

    return 1.0; // Sweet spot (Occupancy 60-65%)
}

function calculateSeasonalROI(data: InputData): Results {
    const baseCallsPerMonth = Math.round(data.callsPerWeek * WEEKS_PER_MONTH);
    const baseMissedRate = data.missedCallsPercent / 100;

    let totalBenefitYearly = 0;
    let totalCostYearly = 0; // Internal code cost (API usage)

    console.log("Month | Factor | Time | Missed | Prod | NoShow | TOTAL");

    SEASONALITY_FACTORS.forEach(monthData => {
        const factor = monthData.factor;
        const monthlyCalls = Math.round(baseCallsPerMonth * factor);

        let monthlyMissedRate = baseMissedRate;
        if (factor > 1.2) {
            monthlyMissedRate = Math.min(0.9, baseMissedRate * 1.2);
        }

        const monthlyCallsMissed = Math.round(monthlyCalls * monthlyMissedRate);
        const monthlyCallsAnswered = monthlyCalls - monthlyCallsMissed;

        // V1: Time
        const timeWasted = monthlyCallsAnswered * (data.callDuration + CONTEXT_SWITCH_PENALTY_MINUTES);
        const convertibleTime = timeWasted * UTILISATION_FACTOR;
        const cutsRecoveredTime = convertibleTime / data.cutDuration;
        const revenueTime = cutsRecoveredTime * data.averageTicket;

        // V2: Missed
        const aiInteractions = monthlyCallsMissed * AI_EFFICIENCY_RATE;
        const newBookings = aiInteractions * BOOKING_CONVERSION_RATE;
        const revenueMissed = newBookings * data.averageTicket;

        // V3: Productivity
        const extraCutsPerDay = calculateProductivityGains(factor);
        const productivityRevenue = (extraCutsPerDay * data.workingDays * WEEKS_PER_MONTH) * data.averageTicket;

        // V4: No-Show
        const totalBookingsAttempted = monthlyCalls * BOOKING_CONVERSION_RATE;
        const baselineNoShows = totalBookingsAttempted * BASE_NO_SHOW_RATE;
        const recoveredNoShows = baselineNoShows * NO_SHOW_RECOVERY_FACTOR;
        const revenueNoShow = recoveredNoShows * data.averageTicket;

        const totalMonthly = revenueTime + revenueMissed + productivityRevenue + revenueNoShow;
        totalBenefitYearly += totalMonthly;

        const monthlyVariableCost = (monthlyCalls * data.callDuration) * COST_PER_MINUTE;
        const monthlyTotalCost = FIXED_MONTHLY_COST + monthlyVariableCost;
        totalCostYearly += monthlyTotalCost;

        console.log(`${monthData.month.padEnd(10)} | ${factor.toFixed(2)} | ${revenueTime.toFixed(0)} | ${revenueMissed.toFixed(0)} | ${productivityRevenue.toFixed(0)} (${extraCutsPerDay}) | ${revenueNoShow.toFixed(0)} | ${totalMonthly.toFixed(0)}`);
    });

    // Use Audit's assumed system cost for ROI comparison if code cost is too low
    const avgMonthlyBenefit = totalBenefitYearly / 12;
    const netProfitYearly = totalBenefitYearly - totalCostYearly;
    const roiPercent = totalCostYearly > 0 ? ((totalBenefitYearly - totalCostYearly) / totalCostYearly) * 100 : 0;
    const paybackMonths = avgMonthlyBenefit > 0 ? Math.ceil(totalCostYearly / avgMonthlyBenefit) : 0;

    // Audit comparison ROI (assuming €2300 cost)
    const auditSystemCost = 2300;
    const auditROI = ((totalBenefitYearly - auditSystemCost) / auditSystemCost) * 100;

    return { totalBenefitYearly, roiPercent, paybackMonths, netProfitYearly, auditROI };
}

// 3. RUN
const inputData: InputData = {
    callsPerWeek: 35,
    callDuration: 2,
    cutDuration: 45,
    averageTicket: 30,
    missedCallsPercent: 20,
    workingDays: 6
};

console.log("RUNNING STANDALONE ROI CHECK...");
const results = calculateSeasonalROI(inputData);

console.log(`Revenue: €${results.totalBenefitYearly.toFixed(2)}`);
console.log(`ROI: ${results.roiPercent.toFixed(0)}%`);
console.log(`Payback: ${results.paybackMonths} months`);

if (results.totalBenefitYearly > 13000 && results.totalBenefitYearly < 16000) {
    console.log("✅ REVENUE TARGET MET");
} else {
    console.log("❌ REVENUE OUT OF RANGE (Expected 13k-16k)");
}

if (results.roiPercent > 400 && results.roiPercent < 750) {
    console.log("✅ ROI TARGET MET");
} else {
    console.log("❌ ROI OUT OF RANGE (Expected 400-750%)");
}
