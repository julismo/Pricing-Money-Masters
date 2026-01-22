import { calculateUnifiedROI, UnifiedFormData } from '../../src/utils/roiCalculations';

// Standard inputs from the audit
const inputData: UnifiedFormData = {
    callsPerWeek: 35, // ~151 calls/month
    callDuration: 2,
    cutDuration: 45,
    averageTicket: 30,
    missedCallsPercent: 20,
    workingDays: "6dias",
    useSeasonality: true,
    calculationMode: "tempo",
    startMonth: "0"
};

console.log("---------------------------------------------------");
console.log("RUNNING ROI VALIDATION (AUDIT TARGETS)");
console.log("---------------------------------------------------");
console.log(`Inputs: ${JSON.stringify(inputData, null, 2)}`);

const results = calculateUnifiedROI(inputData);

console.log("\n--- YEARLY RESULTS ---");
console.log(`Total Revenue (Yearly): €${results.totalBenefitYearly.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}`);
console.log(`ROI: ${results.roiPercent.toFixed(0)}%`);
console.log(`Payback: ${results.paybackMonths} months`);
console.log(`Net Profit: €${results.netProfitYearly.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}`);

console.log("\n--- DEBUG BREAKDOWN (If available) ---");
if (results.monthlyData) {
    console.table(results.monthlyData);
}

console.log("\n--- VALIDATION CHECK ---");
const revenueOk = results.totalBenefitYearly > 13000 && results.totalBenefitYearly < 16000;
const roiOk = results.roiPercent > 400 && results.roiPercent < 750;

console.log(`Revenue Target (€13.5k - €15.5k): ${revenueOk ? '✅ PASS' : '❌ FAIL'}`);
console.log(`ROI Target (400% - 750%):       ${roiOk ? '✅ PASS' : '❌ FAIL'}`);
