// tests/debug/debug_paradox.test.ts

interface SeasonalityFactor {
    month: string;
    factor: number;
}

const SEASONALITY_FACTORS: SeasonalityFactor[] = [
    { month: 'Janeiro', factor: 0.75 },
    { month: 'Fevereiro', factor: 0.80 },
    { month: 'Março', factor: 0.85 },
    { month: 'Abril', factor: 0.90 },
    { month: 'Maio', factor: 1.00 },
    { month: 'Junho', factor: 1.10 },
    { month: 'Julho', factor: 0.95 },
    { month: 'Agosto', factor: 0.70 },
    { month: 'Setembro', factor: 0.85 },
    { month: 'Outubro', factor: 0.95 },
    { month: 'Novembro', factor: 1.05 },
    { month: 'Dezembro', factor: 1.20 },
];

function calculateProductivityGains(monthlyFactor: number, baseOccupancy = 0.65): number {
    const currentOccupancy = baseOccupancy * monthlyFactor;
    // Current Logic:
    if (currentOccupancy > 0.85) return 0;
    if (currentOccupancy > 0.75) return 0.5;
    if (currentOccupancy > 0.65) return 0.75;
    return 1.0; // <--- CULPRIT? Low occupancy gets MAX gains?
}

// Stats
let sumFactors = 0;
console.log("--- OCCUPANCY vs PRODUCTIVITY ANALYSIS ---");
console.log("Base Occupancy: 65%");
console.log("Month      | Factor | Occupancy | Gains (Cuts/Day)");
console.log("-----------|--------|-----------|-----------------");

SEASONALITY_FACTORS.forEach(m => {
    sumFactors += m.factor;
    const occ = 0.65 * m.factor;
    const gains = calculateProductivityGains(m.factor, 0.65);
    console.log(`${m.month.padEnd(10)} | ${m.factor.toFixed(2)}   | ${(occ * 100).toFixed(0)}%       | ${gains}`);
});

const avgFactor = sumFactors / 12;
console.log("\n--- SUMMARY ---");
console.log(`Average Seasonal Factor: ${avgFactor.toFixed(3)}`);
if (avgFactor < 1.0) {
    console.log("✅ CONFIRMED: Average calls WILL drop compared to standard month (Factor < 1.0)");
} else {
    console.log("❌ Calls should increase or stay same.");
}

console.log("\n--- PARADOX CHECK ---");
// Check low months
const lowMonth = SEASONALITY_FACTORS.find(m => m.factor < 0.8);
if (lowMonth) {
    const lowOcc = 0.65 * lowMonth.factor;
    const lowGains = calculateProductivityGains(lowMonth.factor, 0.65);

    if (lowOcc < 0.50 && lowGains > 0) {
        console.log(`🚨 PARADOX FOUND: In ${lowMonth.month}, occupancy is ${(lowOcc * 100).toFixed(0)}% (EMPTY shop), but we award +${lowGains} cuts/day!`);
        console.log("   Reason: 'Efficiency' assumes latent demand. If shop is empty, efficiency = €0 revenue.");
    } else {
        console.log("Paradox not clearly visible with these inputs.");
    }
}
