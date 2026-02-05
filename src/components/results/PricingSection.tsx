import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { DollarSign, Clock, ChevronDown, ChevronUp, Calendar, User, Bot, TrendingDown, HelpCircle, FileDown } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { CalculationResults } from '@/types';

interface PricingSectionProps {
    results: CalculationResults;
    realisticResults?: CalculationResults;
    optimisticResults?: CalculationResults;
    onPricingChange?: (setup: number, maintenance: number, contractMonths: number) => void;
}

export function PricingSection({ results, realisticResults, optimisticResults, onPricingChange }: PricingSectionProps) {
    // Pricing Strategy State (Default 30% - Premium)
    const [pricingStrategy, setPricingStrategy] = useState<0.20 | 0.25 | 0.30>(0.30);

    const averageYearlyBenefit = useMemo(() => {
        if (realisticResults && optimisticResults) {
            return Math.round((realisticResults.totalBenefitYearly + optimisticResults.totalBenefitYearly) / 2);
        }
        return results.totalBenefitYearly;
    }, [realisticResults, optimisticResults, results.totalBenefitYearly]);

    // Calculate Setup based on Strategy % (No artificial floors)
    const calculatedSetup = useMemo(() => {
        const baseValue = averageYearlyBenefit;
        const setup = Math.round(baseValue * pricingStrategy);

        // #region agent log
        if (import.meta.env.DEV) {
            fetch('http://127.0.0.1:7242/ingest/06be08a1-ac35-45a9-b258-8ec6e4d80378', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    location: 'PricingSection.tsx:28',
                    message: 'Setup Calculation',
                    data: {
                        averageYearlyBenefit: Math.round(baseValue),
                        pricingStrategy: pricingStrategy * 100,
                        calculatedSetup: setup,
                        realisticYearly: realisticResults ? Math.round(realisticResults.totalBenefitYearly) : null,
                        optimisticYearly: optimisticResults ? Math.round(optimisticResults.totalBenefitYearly) : null,
                        realisticRecommended: realisticResults ? Math.round(realisticResults.recommendedSetup) : null,
                        optimisticRecommended: optimisticResults ? Math.round(optimisticResults.recommendedSetup) : null
                    },
                    timestamp: Date.now(),
                    sessionId: 'debug-session',
                    runId: 'run1',
                    hypothesisId: 'B'
                })
            }).catch(() => { });
        }
        // #endregion
        return setup;
    }, [averageYearlyBenefit, pricingStrategy, realisticResults, optimisticResults]);

    // Maintenance pricing caps based on Perplexity research (Feb 2026)
    // Industry benchmark: $199-300 max for any volume
    const MAINTENANCE_CAP = 300; // €300/mês máximo
    const MAINTENANCE_MIN = 40;  // €40/mês mínimo

    // Calculate average-based Maintenance (25% of monthly benefit, with cap)
    // Rounded to nearest 5€ for cleaner pricing (40, 45, 50, 55...)
    const averageBasedMaintenance = useMemo(() => {
        let rawMaintenance;
        if (realisticResults && optimisticResults) {
            const avgMonthly = (realisticResults.totalBenefitMonthly + optimisticResults.totalBenefitMonthly) / 2;
            rawMaintenance = avgMonthly * 0.25;
        } else {
            rawMaintenance = results.totalBenefitMonthly * 0.25;
        }

        // Round to nearest 5€ (e.g. 53€ → 55€, 47€ → 45€)
        let maintenance = Math.round(rawMaintenance / 5) * 5;

        // Apply cap (Perplexity benchmark: max €300/mês for Voice AI)
        maintenance = Math.min(Math.max(maintenance, MAINTENANCE_MIN), MAINTENANCE_CAP);

        // #region agent log
        if (import.meta.env.DEV) {
            fetch('http://127.0.0.1:7242/ingest/06be08a1-ac35-45a9-b258-8ec6e4d80378', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    location: 'PricingSection.tsx:37',
                    message: 'Maintenance Calculation (Rounded to 5€)',
                    data: {
                        rawMaintenance: Math.round(rawMaintenance),
                        maintenance,
                        realisticMonthly: realisticResults ? Math.round(realisticResults.totalBenefitMonthly) : null,
                        optimisticMonthly: optimisticResults ? Math.round(optimisticResults.totalBenefitMonthly) : null,
                        currentMonthly: Math.round(results.totalBenefitMonthly),
                        percentage: 25
                    },
                    timestamp: Date.now(),
                    sessionId: 'debug-session',
                    runId: 'run1',
                    hypothesisId: 'C'
                })
            }).catch(() => { });
        }
        // #endregion
        return maintenance;
    }, [realisticResults, optimisticResults, results.totalBenefitMonthly]);

    // State for custom overrides
    const [customSetup, setCustomSetup] = useState<number>(calculatedSetup);
    const [customMaintenance, setCustomMaintenance] = useState<number>(averageBasedMaintenance);
    const [contractMonths, setContractMonths] = useState<number>(6); // Default 6 month contract
    const [showConfig, setShowConfig] = useState(false);

    // Update custom setup when strategy changes (but allow manual override if needed)
    useEffect(() => {
        setCustomSetup(calculatedSetup);
    }, [calculatedSetup]);

    // Estado para rastrear se foi seleção manual (para não interferir)
    const [isManualSelection, setIsManualSelection] = useState(false);

    // AUTO-AJUSTE: Reduzir percentagem automaticamente para garantir payback ≤ 12 meses
    // Só roda quando dados de input mudam, não quando é seleção manual
    useEffect(() => {
        // Se foi seleção manual, não interferir
        if (isManualSelection) return;

        const monthlyBenefit = results.totalBenefitMonthly;
        const infraCost = results.totalCostMonthly;
        const totalMonthlyOutflow = infraCost + averageBasedMaintenance;
        const netMonthlyGain = monthlyBenefit - totalMonthlyOutflow;

        if (netMonthlyGain <= 0) return; // Não viável, não ajustar

        const strategies: (0.30 | 0.25 | 0.20)[] = [0.30, 0.25, 0.20];

        for (const strategy of strategies) {
            const setupForStrategy = Math.round(averageYearlyBenefit * strategy);
            const paybackMonths = Math.ceil(setupForStrategy / netMonthlyGain);

            if (paybackMonths <= 12) {
                // Encontrou estratégia viável (payback ≤ 12 meses)
                setPricingStrategy(strategy);
                return;
            }
        }

        // Se nenhuma estratégia permite payback ≤ 12 meses, fica no 20% (mínimo)
        setPricingStrategy(0.20);
    }, [averageYearlyBenefit, results.totalBenefitMonthly, results.totalCostMonthly, averageBasedMaintenance, isManualSelection]);

    // Handler para seleção manual de estratégia (reseta o auto-ajuste)
    const handleStrategySelect = (strategy: 0.20 | 0.25 | 0.30) => {
        setIsManualSelection(true);
        setPricingStrategy(strategy);
    };

    // Calculate payback - ALIGNED with CashflowChart logic
    // Uses real monthlyData with seasonality, NOT linear approximation
    const paybackData = useMemo(() => {
        const monthlyBenefit = results.totalBenefitMonthly;
        const infraCost = results.totalCostMonthly;
        const totalMonthlyOutflow = infraCost + customMaintenance;
        const netMonthlyGain = monthlyBenefit - totalMonthlyOutflow;

        if (netMonthlyGain <= 0) {
            // #region agent log
            if (import.meta.env.DEV) {
                fetch('http://127.0.0.1:7242/ingest/06be08a1-ac35-45a9-b258-8ec6e4d80378', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        location: 'PricingSection.tsx:paybackData',
                        message: 'Payback Not Viable',
                        data: {
                            monthlyBenefit: Math.round(monthlyBenefit),
                            infraCost: Math.round(infraCost),
                            customMaintenance,
                            totalMonthlyOutflow: Math.round(totalMonthlyOutflow),
                            netMonthlyGain: Math.round(netMonthlyGain)
                        },
                        timestamp: Date.now(),
                        sessionId: 'debug-session',
                        runId: 'run1',
                        hypothesisId: 'D'
                    })
                }).catch(() => { });
            }
            // #endregion
            return { months: 0, isViable: false };
        }

        // ITERATIVE CALCULATION - same logic as CashflowChart
        // Uses real monthlyData with seasonality for accurate payback
        let paybackMonths = 0;
        if (results.monthlyData && results.monthlyData.length > 0) {
            // Use monthlyData with real cumulativeProfit (includes seasonality)
            for (let i = 0; i < results.monthlyData.length; i++) {
                const monthData = results.monthlyData[i];
                const cumulativeInvestment = customSetup + (customMaintenance * (i + 1));

                // monthlyData.cumulativeProfit already accounts for seasonality
                if (monthData.cumulativeProfit >= cumulativeInvestment) {
                    paybackMonths = i + 1; // 1-indexed (month 1, 2, 3...)
                    break;
                }
            }
            // If no payback within 12 months, estimate beyond
            if (paybackMonths === 0) {
                // Fallback to linear approximation for months > 12
                paybackMonths = Math.ceil(customSetup / netMonthlyGain);
            }
        } else {
            // Fallback if no monthlyData (shouldn't happen)
            paybackMonths = Math.ceil(customSetup / netMonthlyGain);
        }

        // #region agent log
        if (import.meta.env.DEV) {
            fetch('http://127.0.0.1:7242/ingest/06be08a1-ac35-45a9-b258-8ec6e4d80378', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    location: 'PricingSection.tsx:paybackData',
                    message: 'Payback Calculation (Iterative)',
                    data: {
                        customSetup,
                        netMonthlyGain: Math.round(netMonthlyGain),
                        paybackMonths,
                        contractMonths,
                        withinContract: paybackMonths <= contractMonths,
                        usedMonthlyData: results.monthlyData && results.monthlyData.length > 0,
                        monthlyBenefit: Math.round(monthlyBenefit),
                        totalMonthlyOutflow: Math.round(totalMonthlyOutflow)
                    },
                    timestamp: Date.now(),
                    sessionId: 'debug-session',
                    runId: 'run1',
                    hypothesisId: 'E'
                })
            }).catch(() => { });
        }
        // #endregion
        return {
            months: paybackMonths,
            isViable: true,
            withinContract: paybackMonths <= contractMonths
        };
    }, [customSetup, customMaintenance, results.totalBenefitMonthly, results.totalCostMonthly, results.monthlyData, contractMonths]);

    // Total investment for the contract period
    // NOTE: Month 1 = Setup only, Maintenance starts from Month 2
    const maintenanceMonths = Math.max(0, contractMonths - 1);
    const totalInvestment = useMemo(() => {
        return customSetup + (customMaintenance * maintenanceMonths);
    }, [customSetup, customMaintenance, maintenanceMonths]);

    // Monthly equivalent cost for comparison (Setup amortized + Maintenance pro-rated)
    // Formula: (Setup + Maintenance*(Months-1)) / Months
    const monthlyEquivalent = useMemo(() => {
        if (contractMonths <= 0) return customSetup;
        const total = customSetup + (customMaintenance * maintenanceMonths);
        return Math.round(total / contractMonths);
    }, [customSetup, customMaintenance, contractMonths, maintenanceMonths]);

    // Savings compared to receptionist (avg €1.000/month - realistic range covering recibos verdes to legal)
    const receptionistAvg = 1000; // Middle of €800-1.200 range
    const monthlySavings = Math.max(0, receptionistAvg - monthlyEquivalent);
    const annualSavings = monthlySavings * 12;

    // Notify parent of changes
    useEffect(() => {
        onPricingChange?.(customSetup, customMaintenance, contractMonths);
    }, [customSetup, customMaintenance, contractMonths, onPricingChange]);

    // Show in both modes (Realista and Otimista)
    // Config inputs are hidden in Otimista mode

    return (
        <Card className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/30 backdrop-blur-xl shadow-xl mt-4">
            <CardHeader className="pb-2">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <CardTitle className="flex items-center gap-2 text-slate-700 text-lg">
                        <DollarSign className="h-5 w-5" />
                        O Teu Investimento
                    </CardTitle>

                    {/* Strategy Selector */}
                    <div className="flex bg-slate-100 p-1 rounded-lg">
                        {[0.20, 0.25, 0.30].map((strategy) => (
                            <button
                                key={strategy}
                                onClick={() => handleStrategySelect(strategy as 0.20 | 0.25 | 0.30)}
                                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${pricingStrategy === strategy
                                    ? 'bg-white text-blue-600 shadow-sm border border-slate-200'
                                    : 'text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                {strategy * 100}%
                            </button>
                        ))}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Main Display - Client sees this */}
                <div className="bg-white/40 rounded-xl p-6 border border-white/40 shadow-sm relative overflow-hidden">
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />

                    <div className="grid grid-cols-3 gap-4 relative z-10">
                        {/* Setup Cost */}
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-1 mb-2">
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Implementação</p>
                                <TooltipProvider>
                                    <Tooltip delayDuration={200}>
                                        <TooltipTrigger asChild>
                                            <HelpCircle className="h-3.5 w-3.5 text-slate-400 cursor-help" />
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-slate-900 text-white p-3 max-w-xs text-xs">
                                            <p className="font-medium mb-1">Como calculamos:</p>
                                            <p>{pricingStrategy * 100}% do benefício médio anual ({averageYearlyBenefit.toLocaleString('pt-PT')}€)</p>
                                            <p className="mt-1 text-slate-300">Inclui: configuração, treino da IA, integração com agenda.</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <p className="text-3xl font-bold text-slate-800 tabular-nums tracking-tight">
                                {customSetup}€
                            </p>
                            <p className="text-xs text-slate-400">uma vez</p>
                        </div>

                        {/* Maintenance Fee (Consultant) */}
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-1 mb-2">
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Manutenção</p>
                                <TooltipProvider>
                                    <Tooltip delayDuration={200}>
                                        <TooltipTrigger asChild>
                                            <HelpCircle className="h-3.5 w-3.5 text-slate-400 cursor-help" />
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-slate-900 text-white p-3 max-w-xs text-xs">
                                            <p className="font-medium mb-1">Como calculamos:</p>
                                            <p>25% do benefício mensal médio (máx 300€)</p>
                                            <p className="mt-1 text-slate-300">Cobre: suporte, actualizações, monitorização 24/7.</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <p className="text-3xl font-bold text-slate-800 tabular-nums tracking-tight">
                                {customMaintenance > 0 ? `${customMaintenance}€` : '—'}
                            </p>
                            <p className="text-xs text-slate-400">por mês</p>
                        </div>

                        {/* Contract Duration */}
                        <div className="text-center">
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Contrato</p>
                            <p className="text-3xl font-bold text-slate-800 tabular-nums tracking-tight">
                                {contractMonths}
                            </p>
                            <p className="text-xs text-slate-400">meses</p>
                        </div>
                    </div>

                    {/* Payback info */}
                    {paybackData.isViable && (
                        <div className="mt-8 pt-6 border-t border-slate-200/50 text-center relative z-10">
                            <div className="flex items-center justify-center gap-2 text-green-600">
                                <Clock className="h-4 w-4" />
                                <span className="text-sm font-medium">
                                    Recuperas o investimento em{' '}
                                    <span className="font-bold tabular-nums">
                                        {paybackData.months} {paybackData.months === 1 ? 'mês' : 'meses'}
                                    </span>
                                </span>
                            </div>
                            {totalInvestment > 0 && (
                                <p className="text-xs text-slate-400 mt-1">
                                    Investimento total: <span className="tabular-nums font-medium">{totalInvestment}€</span> em <span className="tabular-nums">{contractMonths}</span> meses
                                </p>
                            )}

                            {/* Consultant Config Toggle - Moved inside Payback section */}
                            {results.mode === 'tempo' && (
                                <div className="flex justify-center mt-4">
                                    <button
                                        onClick={() => setShowConfig(!showConfig)}
                                        className="flex items-center gap-2 px-4 py-1.5 text-xs font-medium text-slate-500 bg-white/50 hover:bg-white/80 border border-white/40 rounded-full transition-all shadow-sm hover:shadow active:scale-95"
                                    >
                                        {showConfig ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                                        {showConfig ? 'Fechar configuração' : 'Ajustar valores'}
                                    </button>
                                </div>
                            )}

                            {/* Consultant Config Panel - Moved inside Payback section */}
                            {results.mode === 'tempo' && showConfig && (
                                <div className="mt-4 bg-white/40 rounded-xl p-4 border border-white/30 text-left shadow-inner">
                                    <p className="text-xs text-slate-500 mb-3 flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        Configuração do consultor
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div>
                                            <label className="text-xs text-slate-500">Setup (€)</label>
                                            <Input
                                                type="number"
                                                value={customSetup}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomSetup(Number(e.target.value) || 0)}
                                                className="mt-1 h-8 text-xs"
                                                min={0}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs text-slate-500">Manutenção (€/mês)</label>
                                            <Input
                                                type="number"
                                                value={customMaintenance}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomMaintenance(Number(e.target.value) || 0)}
                                                className="mt-1 h-8 text-xs"
                                                min={0}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs text-slate-500">Contrato (meses)</label>
                                            <Input
                                                type="number"
                                                value={contractMonths}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContractMonths(Number(e.target.value) || 12)}
                                                className="mt-1 h-8 text-xs"
                                                min={1}
                                                max={36}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    )}

                    {/* Export Button - Transparency for client */}
                    <div className="mt-4 pt-4 border-t border-slate-200 text-center">
                        <button
                            disabled={true}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm text-slate-400 bg-slate-100 cursor-not-allowed rounded-lg transition-colors opacity-70"
                        >
                            <FileDown className="h-4 w-4" />
                            Exportar explicação dos cálculos (Em breve)
                        </button>
                    </div>
                </div>

                <div className="bg-emerald-50/30 rounded-xl p-5 border border-emerald-100/50 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingDown className="h-4 w-4 text-emerald-600" />
                        <h4 className="text-sm font-semibold text-emerald-800">Comparação de Custo</h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Receptionist Comparison - Portugal barbershop context */}
                        {/* Google/Perplexity: SMN €870 + TSU ~€207 + overhead = ~€1.100-1.400 */}
                        {/* Using €800-1.200 (bruto range) for simpler client communication */}
                        <div className="bg-white/40 rounded-xl p-4 border border-white/40 shadow-sm backdrop-blur-md">
                            <div className="flex items-center gap-2 mb-2">
                                <User className="h-4 w-4 text-slate-500" />
                                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Recepcionista</span>
                            </div>
                            <p className="text-xl font-bold text-slate-700 tabular-nums tracking-tight">€800-1.200<span className="text-sm font-normal text-slate-400 ml-1">/mês</span></p>
                            <p className="text-xs text-slate-400 mt-1">(Base + TSU + subsídios)</p>
                            <ul className="text-xs text-slate-500 mt-3 space-y-1.5">
                                <li className="flex items-center gap-2 opacity-70"><span className="text-red-400">✕</span> Só horário comercial</li>
                                <li className="flex items-center gap-2 opacity-70"><span className="text-red-400">✕</span> Faltas e férias</li>
                                <li className="flex items-center gap-2 opacity-70"><span className="text-red-400">✕</span> Erros de agendamento</li>
                            </ul>
                        </div>

                        {/* AI Voice Agent */}
                        <div className="bg-gradient-to-br from-white/60 to-emerald-50/60 rounded-xl p-4 border border-emerald-200/50 shadow-[0_0_20px_-5px_rgba(16,185,129,0.15)] ring-1 ring-emerald-100 backdrop-blur-md">
                            <div className="flex items-center gap-2 mb-2">
                                <Bot className="h-4 w-4 text-emerald-600" />
                                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Assistente IA Voice</span>
                            </div>
                            <p className="text-xl font-bold text-emerald-600 tabular-nums tracking-tight">{monthlyEquivalent}€<span className="text-sm font-normal text-emerald-600/60 ml-1">/mês</span></p>
                            <p className="text-xs text-emerald-600/60 mt-1 tabular-nums">
                                ({customSetup}€{customMaintenance > 0 && maintenanceMonths > 0 ? ` + ${customMaintenance}€×${maintenanceMonths}` : ''}) ÷ {contractMonths}
                            </p>
                            <ul className="text-xs text-emerald-700 mt-3 space-y-1.5">
                                <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> 24h/7 dias/365 dias</li>
                                <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> Consistência alta</li>
                                <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> Sem faltas/férias</li>
                                <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> Resposta imediata</li>
                            </ul>
                        </div>
                    </div>

                    {/* Value Highlight */}
                    <div className="mt-4 pt-3 border-t border-emerald-200 text-center">
                        {monthlySavings > 0 ? (
                            <>
                                <p className="text-sm text-emerald-800 font-medium">
                                    Poupas <span className="text-emerald-600 font-bold">{monthlySavings}€/mês</span> vs recepcionista
                                </p>
                                <p className="text-xs text-slate-500 mt-1">
                                    Economia anual: <span className="font-semibold">{annualSavings.toLocaleString('pt-PT')}€</span> + benefícios 24/7
                                </p>
                            </>
                        ) : (
                            <>
                                <p className="text-sm text-emerald-800 font-medium">
                                    Mesmo preço. <span className="text-emerald-600">10x mais benefícios.</span>
                                </p>
                                <p className="text-xs text-slate-500 mt-1">
                                    Captura chamadas à noite • Agenda automática • Nunca perde cliente
                                </p>
                            </>
                        )}
                    </div>
                </div>



            </CardContent>
        </Card>
    );
}
