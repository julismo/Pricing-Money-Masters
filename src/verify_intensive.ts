import { calculateUnifiedROI, UnifiedFormData } from './utils/roiCalculations';

// Mock types for standalone run
// Since we are inside src, imports should work if we use relative paths correctly.
// 'calculateUnifiedROI' is in './utils/roiCalculations'.

console.log("===================================================");
console.log("   INTENSIVE SYSTEM VERIFICATION (USER REQUEST)   ");
console.log("===================================================");

const baseInput: UnifiedFormData = {
    callsPerWeek: 50, // ~215 calls/month (Standard Busy Shop)
    callDuration: 2,
    cutDuration: 40,
    averageTicket: 25,
    missedCallsPercent: 25,
    workingDays: "6dias",
    useSeasonality: true,
    calculationMode: "tempo", // Realista
    startMonth: "0" // Janeiro
};

// 1. VERIFY RAMP-UP (REALISTIC MODE)
console.log("\n[TEST 1] RAMP-UP LOGIC (REALISTIC MODE)");
const resRealistic = calculateUnifiedROI(baseInput);
const months = resRealistic.monthlyData;
const m1 = months[0]; // Jan (55%)
const m2 = months[1]; // Feb (85%)
const m3 = months[2]; // Mar (95%)
const m4 = months[3]; // Apr (100%)

// Check efficiency climb
// Note: Seasonality affects this too, so we need to normalize or pick months with similar seasonality.
// Jan=0.85, Feb=0.80, Mar=0.95, Apr=0.95 (approx).
// Let's just print them to see the progression.
console.log(`Month 1 (Jan): Revenue €${m1.revenue.toFixed(2)} (Ramp 55% * Seas)`);
console.log(`Month 2 (Feb): Revenue €${m2.revenue.toFixed(2)} (Ramp 85% * Seas)`);
console.log(`Month 3 (Mar): Revenue €${m3.revenue.toFixed(2)} (Ramp 95% * Seas)`);
console.log(`Month 4 (Apr): Revenue €${m4.revenue.toFixed(2)} (Ramp 100% * Seas)`);

// Auto-check: m2 should be significantly higher than m1
if (m2.revenue > m1.revenue * 1.3) console.log("✅ Ramp-up verified: Significant jump from M1 to M2");
else console.log("❌ Ramp-up check failed or masked by seasonality");

// 2. VERIFY PRICING (30% STRATEGY)
console.log("\n[TEST 2] PRICING STRATEGY (30% TARGET)");
const yearlyBenefit = resRealistic.totalBenefitYearly;
const setup20 = yearlyBenefit * 0.20;
const setup30 = yearlyBenefit * 0.30;

console.log(`Yearly Benefit: €${yearlyBenefit.toFixed(2)}`);
console.log(`Setup 20%: €${setup20.toFixed(2)}`);
console.log(`Setup 30% (PREMIUM): €${setup30.toFixed(2)}`);

if (setup30 > 500) console.log("✅ Fair Pricing Verified (>€500 for standard shop)");
else console.log("⚠️ Pricing might be low (<€500)");

// 3. VERIFY CAPACITY LIMIT
console.log("\n[TEST 3] CAPACITY LIMIT");
const overloadInput = { ...baseInput, callsPerWeek: 5000 }; // Absurdly high
const resOverload = calculateUnifiedROI(overloadInput);
console.log(`Input: 5000 calls/week`);
console.log(`Revenue: €${resOverload.totalBenefitYearly.toFixed(2)}`);
// If infinite capacity, this would be huge.
// Capacity limit (8h * 6days * 4.3w * 60m) = ~12,384 mins/month
// 5000 calls * 25% missed = 1250 missed * 80% recovered = 1000 cuts * 40min = 40,000 mins
// Should be capped around max physical revenue.
// Max Cuts = 12,384 / 40 = ~309 cuts/mo.
// Max Rev = 309 * 25 = ~€7,725/mo -> ~€92k/yr.
// Wait, newClients vs timeSaved is split. But verifying it's not €1,000,000.
if (resOverload.totalBenefitYearly < 150000) console.log("✅ Capacity Limit Verified (Capped reasonably)");
else console.log(`❌ Capacity Limit Failed? Revenue: €${resOverload.totalBenefitYearly}`);

// 4. VERIFY INPUT VALIDATION
console.log("\n[TEST 4] INPUT VALIDATION (ZERO/NEGATIVE)");
try {
    calculateUnifiedROI({ ...baseInput, cutDuration: 0 });
    console.log("❌ Failed to catch CutDuration=0");
} catch (e: any) {
    console.log(`✅ Caught Error: ${e.message}`);
}

console.log("\n===================================================");
