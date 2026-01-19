import { useState } from 'react';
import { ResultsCards, CalculationResults } from '@/components/ResultsCards';
import { ComparisonChart } from '@/components/ComparisonChart';
import { CashflowChart } from '@/components/CashflowChart';
import { SeasonalityChart } from '@/components/SeasonalityChart';
import { DetailedBreakdown } from '@/components/DetailedBreakdown';
import { PricingSection } from '@/components/PricingSection';
import { Button } from '@/components/ui/button';
import { RefreshCcw, TrendingUp, Anchor, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface StepResultsProps {
    realistic: CalculationResults;
    optimistic: CalculationResults;
    onRecalculate: () => void;
}

export function StepResults({ realistic, optimistic, onRecalculate }: StepResultsProps) {
    const [viewMode, setViewMode] = useState<'realistic' | 'optimistic'>('realistic');
    const [chartTab, setChartTab] = useState<'annual' | 'monthly' | 'sazonal'>('annual');
    const [showWarning, setShowWarning] = useState(false);

    // Pricing state (for CashflowChart reactivity)
    const [customSetup, setCustomSetup] = useState<number | undefined>(undefined);
    const [customMaintenance, setCustomMaintenance] = useState<number | undefined>(undefined);
    const [contractMonths, setContractMonths] = useState<number>(12);

    // Choose which results to display
    const activeResults = viewMode === 'realistic' ? realistic : optimistic;

    // Handle pricing changes from PricingSection
    const handlePricingChange = (setup: number, maintenance: number, months: number) => {
        setCustomSetup(setup);
        setCustomMaintenance(maintenance);
        setContractMonths(months);
    };

    const handleSeasonalityClick = () => {
        if (!activeResults.isSeasonal) {
            setShowWarning(true);
            return;
        }
        setChartTab('sazonal');
    };

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="text-center space-y-4 mb-8">
                <h2 className="text-2xl font-bold">A tua análise personalizada</h2>

                {/* Mode Toggle */}
                <div className="flex justify-center items-center gap-4">
                    <button
                        onClick={() => setViewMode('realistic')}
                        className={cn(
                            "flex items-center gap-2 px-6 py-3 rounded-full border-2 transition-all font-medium",
                            viewMode === 'realistic'
                                ? "bg-slate-900 border-slate-900 text-white shadow-lg scale-105"
                                : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50"
                        )}
                    >
                        <Anchor className="w-4 h-4" />
                        <div>
                            <span className="block text-sm font-bold">Cenário Realista</span>
                            <span className="block text-[10px] opacity-80 font-normal">Baseado em limitações reais</span>
                        </div>
                    </button>

                    <button
                        onClick={() => setViewMode('optimistic')}
                        className={cn(
                            "flex items-center gap-2 px-6 py-3 rounded-full border-2 transition-all font-medium",
                            viewMode === 'optimistic'
                                ? "bg-emerald-600 border-emerald-600 text-white shadow-lg scale-105"
                                : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50"
                        )}
                    >
                        <TrendingUp className="w-4 h-4" />
                        <div>
                            <span className="block text-sm font-bold">Potencial Máximo</span>
                            <span className="block text-[10px] opacity-80 font-normal">Se tudo correr perfeitamente</span>
                        </div>
                    </button>
                </div>
            </div>

            <ResultsCards results={activeResults} />

            <div className="space-y-4">
                <div className="flex justify-center bg-slate-100 p-1 rounded-lg w-fit mx-auto">
                    <button
                        onClick={() => setChartTab('annual')}
                        className={cn(
                            "px-4 py-2 rounded-md text-sm font-medium transition-all",
                            chartTab === 'annual'
                                ? "bg-white text-slate-900 shadow-sm"
                                : "text-slate-500 hover:text-slate-900"
                        )}
                    >
                        Visão Anual
                    </button>
                    <button
                        onClick={() => setChartTab('monthly')}
                        className={cn(
                            "px-4 py-2 rounded-md text-sm font-medium transition-all",
                            chartTab === 'monthly'
                                ? "bg-white text-slate-900 shadow-sm"
                                : "text-slate-500 hover:text-slate-900"
                        )}
                    >
                        Evolução Mensal
                    </button>
                    <button
                        onClick={handleSeasonalityClick}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all",
                            chartTab === 'sazonal'
                                ? "bg-white text-amber-600 shadow-sm"
                                : "text-slate-500 hover:text-slate-900",
                            !activeResults.isSeasonal && "opacity-50 cursor-help hover:text-slate-500 bg-slate-100" // Disabled look
                        )}
                    >
                        <BarChart3 className="w-4 h-4" />
                        Sazonalidade
                    </button>
                </div>

                <div className="min-h-[400px]">
                    {chartTab === 'annual' && (
                        <ComparisonChart results={activeResults} />
                    )}
                    {chartTab === 'monthly' && (
                        <CashflowChart
                            results={activeResults}
                            customSetup={customSetup}
                            customMaintenance={customMaintenance}
                        />
                    )}
                    {(chartTab === 'sazonal' && activeResults.isSeasonal) && (
                        <SeasonalityChart results={activeResults} />
                    )}
                    {/* Fallback if tab is selected but hidden */}
                    {(chartTab === 'sazonal' && !activeResults.isSeasonal) && (
                        <div className="flex items-center justify-center h-[300px] text-slate-400">
                            Gráfico não disponível neste modo.
                        </div>
                    )}
                </div>
            </div>

            {/* Pricing Section - Below charts, only for Realista */}
            <PricingSection
                results={activeResults}
                onPricingChange={handlePricingChange}
            />

            <div className="flex justify-center">
                <DetailedBreakdown results={activeResults} />
            </div>

            <div className="flex justify-center pb-4">
                <Button variant="outline" onClick={onRecalculate}>
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    Recalcular
                </Button>
            </div>

            <Dialog open={showWarning} onOpenChange={setShowWarning}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Análise Sazonal não incluída</DialogTitle>
                        <DialogDescription className="pt-4 text-base leading-relaxed text-slate-600">
                            Neste cenário, a projeção considera uma <strong>distribuição linear dos resultados</strong>, pois a variável de sazonalidade não foi ativada.
                            <br /><br />
                            Para visualizar o impacto das <strong>flutuações de mercado</strong> (altas e baixas estações) nos resultados financeiros, ative a opção "Considerar Sazonalidade" nos parâmetros do cálculo.
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}
