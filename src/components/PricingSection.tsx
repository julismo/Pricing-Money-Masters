import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { DollarSign, Clock, ChevronDown, ChevronUp, Calendar, User, Bot, TrendingDown } from 'lucide-react';
import { CalculationResults } from '@/utils/roiCalculations';

interface PricingSectionProps {
    results: CalculationResults;
    realisticResults?: CalculationResults;
    optimisticResults?: CalculationResults;
    onPricingChange?: (setup: number, maintenance: number, contractMonths: number) => void;
}

export function PricingSection({ results, realisticResults, optimisticResults, onPricingChange }: PricingSectionProps) {
    // Calculate average-based Setup (fair price = 25% of average yearly benefit)
    const averageBasedSetup = useMemo(() => {
        if (realisticResults && optimisticResults) {
            const avgYearly = (realisticResults.totalBenefitYearly + optimisticResults.totalBenefitYearly) / 2;
            return Math.round(avgYearly * 0.25);
        }
        return results.recommendedSetup; // Fallback to active mode
    }, [realisticResults, optimisticResults, results.recommendedSetup]);

    const averageYearlyBenefit = useMemo(() => {
        if (realisticResults && optimisticResults) {
            return Math.round((realisticResults.totalBenefitYearly + optimisticResults.totalBenefitYearly) / 2);
        }
        return results.totalBenefitYearly;
    }, [realisticResults, optimisticResults, results.totalBenefitYearly]);

    // Calculate average-based Maintenance (same logic: 25% of average monthly benefit)
    const averageBasedMaintenance = useMemo(() => {
        if (realisticResults && optimisticResults) {
            const avgMonthly = (realisticResults.totalBenefitMonthly + optimisticResults.totalBenefitMonthly) / 2;
            return Math.round(avgMonthly * 0.25);
        }
        return Math.round(results.totalBenefitMonthly * 0.25);
    }, [realisticResults, optimisticResults, results.totalBenefitMonthly]);

    // Default values - Setup and Maintenance use average-based calculation
    const [customSetup, setCustomSetup] = useState<number>(averageBasedSetup);
    const [customMaintenance, setCustomMaintenance] = useState<number>(averageBasedMaintenance); // 25% of monthly benefit
    const [contractMonths, setContractMonths] = useState<number>(4); // Default 4 month contract
    const [showConfig, setShowConfig] = useState(false);

    // Calculate payback with custom values
    // Payback = Setup / (Monthly Benefit - Infra Cost - Maintenance Fee)
    const paybackData = useMemo(() => {
        const monthlyBenefit = results.totalBenefitMonthly;
        const infraCost = results.totalCostMonthly; // This is the system infra cost (hidden)
        const totalMonthlyOutflow = infraCost + customMaintenance;
        const netMonthlyGain = monthlyBenefit - totalMonthlyOutflow;

        if (netMonthlyGain <= 0) {
            return { months: 0, isViable: false };
        }

        const paybackMonths = Math.ceil(customSetup / netMonthlyGain);
        return {
            months: paybackMonths,
            isViable: true,
            withinContract: paybackMonths <= contractMonths
        };
    }, [customSetup, customMaintenance, results.totalBenefitMonthly, results.totalCostMonthly, contractMonths]);

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
        <Card className="card-shadow-lg mt-4 border-0">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-slate-700 text-lg">
                        <DollarSign className="h-5 w-5" />
                        O Teu Investimento
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Main Display - Client sees this */}
                <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 border border-slate-100">
                    <div className="grid grid-cols-3 gap-4">
                        {/* Setup Cost */}
                        <div className="text-center">
                            <p className="text-sm text-slate-500 mb-1">Implementação</p>
                            <p className="text-2xl font-bold text-slate-800">
                                {customSetup}€
                            </p>
                            <p className="text-xs text-slate-400">uma vez</p>
                        </div>

                        {/* Maintenance Fee (Consultant) */}
                        <div className="text-center">
                            <p className="text-sm text-slate-500 mb-1">Manutenção</p>
                            <p className="text-2xl font-bold text-slate-800">
                                {customMaintenance > 0 ? `${customMaintenance}€` : '—'}
                            </p>
                            <p className="text-xs text-slate-400">por mês</p>
                        </div>

                        {/* Contract Duration */}
                        <div className="text-center">
                            <p className="text-sm text-slate-500 mb-1">Contrato</p>
                            <p className="text-2xl font-bold text-slate-800">
                                {contractMonths}
                            </p>
                            <p className="text-xs text-slate-400">meses</p>
                        </div>
                    </div>

                    {/* Payback info */}
                    {paybackData.isViable && (
                        <div className="mt-6 pt-4 border-t border-slate-200 text-center">
                            <div className="flex items-center justify-center gap-2 text-green-600">
                                <Clock className="h-4 w-4" />
                                <span className="text-sm font-medium">
                                    Recuperas o investimento em{' '}
                                    <span className="font-bold">
                                        {paybackData.months} {paybackData.months === 1 ? 'mês' : 'meses'}
                                    </span>
                                </span>
                            </div>
                            {totalInvestment > 0 && (
                                <p className="text-xs text-slate-400 mt-1">
                                    Investimento total: {totalInvestment}€ em {contractMonths} meses
                                </p>
                            )}

                        </div>
                    )}
                </div>

                {/* Quality Upgrade Card - Value Proposition (Real Market Data) */}
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-5 border border-emerald-200">
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingDown className="h-4 w-4 text-emerald-600" />
                        <h4 className="text-sm font-semibold text-emerald-800">O Que Ganhas (Mesmo Preço, 10x Melhor)</h4>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Receptionist Comparison (Mixed Reality) */}
                        <div className="bg-white/60 rounded-lg p-4 border border-slate-200">
                            <div className="flex items-center gap-2 mb-2">
                                <User className="h-4 w-4 text-slate-500" />
                                <span className="text-xs font-medium text-slate-600">Recepcionista</span>
                            </div>
                            <p className="text-lg font-bold text-slate-700">€800-1.200<span className="text-sm font-normal text-slate-400">/mês</span></p>
                            <p className="text-xs text-slate-400 mt-1">(Base + TSU + subsídios)</p>
                            <ul className="text-xs text-slate-400 mt-2 space-y-1">
                                <li>❌ Só horário comercial</li>
                                <li>❌ Faltas e férias</li>
                                <li>❌ Erros de agendamento</li>
                                <li>❌ (Se tiver uma)</li>
                            </ul>
                        </div>

                        {/* AI Voice Agent */}
                        <div className="bg-white/60 rounded-lg p-4 border border-emerald-300">
                            <div className="flex items-center gap-2 mb-2">
                                <Bot className="h-4 w-4 text-emerald-600" />
                                <span className="text-xs font-medium text-emerald-700">Nossa Solução IA</span>
                            </div>
                            <p className="text-lg font-bold text-emerald-600">{monthlyEquivalent}€<span className="text-sm font-normal text-slate-400">/mês</span></p>
                            <p className="text-xs text-slate-400 mt-1">
                                ({customSetup}€{customMaintenance > 0 && maintenanceMonths > 0 ? ` + ${customMaintenance}€×${maintenanceMonths}` : ''}) ÷ {contractMonths}
                            </p>
                            <ul className="text-xs text-emerald-600 mt-2 space-y-1">
                                <li>✅ 24h/7 dias/365 dias</li>
                                <li>✅ Nunca falha</li>
                                <li>✅ Zero erros</li>
                                <li>✅ Imagem profissional</li>
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

                {/* Sovereignty Seal - Trust Badge */}
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 flex items-center gap-3">
                    <div className="text-2xl">🏛️</div>
                    <div>
                        <p className="text-sm font-medium text-slate-700">A Infraestrutura é Tua</p>
                        <p className="text-xs text-slate-500">Sistema instalado no TEU servidor. Sem dependência, sem lock-in.</p>
                    </div>
                </div>

                {/* Consultant Config Toggle - Only in Realista mode */}
                {results.mode === 'tempo' && (
                    <button
                        onClick={() => setShowConfig(!showConfig)}
                        className="flex items-center justify-center gap-2 w-full py-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
                    >
                        {showConfig ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        {showConfig ? 'Fechar configuração' : 'Ajustar valores'}
                    </button>
                )}

                {/* Consultant Config Panel - Only in Realista mode */}
                {results.mode === 'tempo' && showConfig && (
                    <div className="bg-slate-100 rounded-lg p-4 border border-slate-200">
                        <p className="text-xs text-slate-500 mb-3 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Configuração do consultor
                        </p>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="text-xs text-slate-500">Setup (€)</label>
                                <Input
                                    type="number"
                                    value={customSetup}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomSetup(Number(e.target.value) || 0)}
                                    className="mt-1"
                                    min={0}
                                />
                            </div>
                            <div>
                                <label className="text-xs text-slate-500">Manutenção (€/mês)</label>
                                <Input
                                    type="number"
                                    value={customMaintenance}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomMaintenance(Number(e.target.value) || 0)}
                                    className="mt-1"
                                    min={0}
                                />
                            </div>
                            <div>
                                <label className="text-xs text-slate-500">Contrato (meses)</label>
                                <Input
                                    type="number"
                                    value={contractMonths}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContractMonths(Number(e.target.value) || 12)}
                                    className="mt-1"
                                    min={1}
                                    max={36}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
