import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { DollarSign, Clock, ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import { CalculationResults } from '@/utils/roiCalculations';

interface PricingSectionProps {
    results: CalculationResults;
    onPricingChange?: (setup: number, maintenance: number, contractMonths: number) => void;
}

export function PricingSection({ results, onPricingChange }: PricingSectionProps) {
    // Default values
    const [customSetup, setCustomSetup] = useState<number>(results.recommendedSetup);
    const [customMaintenance, setCustomMaintenance] = useState<number>(0); // Consultant fee (separate from infra)
    const [contractMonths, setContractMonths] = useState<number>(12); // Default 12 month contract
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
    const totalInvestment = useMemo(() => {
        return customSetup + (customMaintenance * contractMonths);
    }, [customSetup, customMaintenance, contractMonths]);

    // Notify parent of changes
    useEffect(() => {
        onPricingChange?.(customSetup, customMaintenance, contractMonths);
    }, [customSetup, customMaintenance, contractMonths, onPricingChange]);

    // Only show in Realista mode
    if (results.mode !== 'tempo') return null;

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

                {/* Consultant Config Toggle */}
                <button
                    onClick={() => setShowConfig(!showConfig)}
                    className="flex items-center justify-center gap-2 w-full py-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
                >
                    {showConfig ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    {showConfig ? 'Fechar configuração' : 'Ajustar valores'}
                </button>

                {/* Consultant Config Panel */}
                {showConfig && (
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
