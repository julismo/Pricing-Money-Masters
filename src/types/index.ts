// Types extracted from roiCalculations.ts for better organization

export interface UnifiedFormData {
    // Operação Base
    callsPerWeek: number;
    callDuration: number;
    cutDuration: number;
    averageTicket: number;
    missedCallsPercent: number;

    // Calendário
    workingDays: "5dias" | "6dias" | "7dias";

    // Opções
    useSeasonality: boolean; // Toggle "Considerar sazonalidade"
    calculationMode: "tempo" | "oportunidade"; // Toggle principal
    startMonth: string; // "0" to "11"
}

export type FormData = UnifiedFormData; // Alias for backward compatibility

export interface CalculationResults {
    mode: "tempo" | "oportunidade";
    isSeasonal: boolean; // Added for UI logic
    startMonthSeasonalityFactor: number; // NEW: For dynamic Card HOJE
    callsPerMonth: number;
    minutesInCalls: number; // Added back for compatibility
    realTimeLost: number;   // Added back for compatibility
    hoursLost: number;
    cutsLost: number; // Mapped from cutsRecovered for UI compatibility (Legacy name)
    revenueLostTime: number; // Added for UI compatibility
    missedCalls: number;
    clientsLost: number; // Mapped from newClients for UI compatibility (Legacy name)
    revenueLostCalls: number; // Added for UI compatibility

    totalBenefitMonthly: number;
    totalBenefitYearly: number;

    variableCost: number; // Added for UI
    totalCostMonthly: number; // Added for UI
    totalCostYearly: number;

    netProfitYearly: number;
    roiPercent: number;
    paybackMonths: number;

    impliedHourlyRate: number; // Added for UI
    aiSafetyMargin: number; // Added for UI
    lowVolumeWarning: boolean; // NEW: True if callsPerMonth < 40
    recommendedSetup: number; // NEW: 20% of totalBenefitYearly (fair price suggestion)

    // Metadata
    assumptions: {
        utilization: number;
        aiEfficiency: number;
        workingDays: number;
    };

    monthlyData: {
        month: string;
        revenue: number;
        calls: number; // Added
        cost: number;
        profit: number;
        cumulativeProfit: number;
    }[];
}
