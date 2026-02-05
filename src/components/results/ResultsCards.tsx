import { Phone, Clock, Scissors, TrendingDown, TrendingUp, CheckCircle2, Rocket, DollarSign, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedNumber } from '@/components/common/AnimatedNumber';
import { CostBreakdown } from './CostBreakdown';
import { CalculationResults } from '@/types';

// Re-export for backward compatibility
export type { CalculationResults };

interface ResultsCardsProps {
  results: CalculationResults;
}

export function ResultsCards({ results }: ResultsCardsProps) {
  const getLabels = (niche?: string) => {
    switch (niche) {
      case 'clinica': return { unit: 'consultas', lost: 'consultas perdidas', revenue: 'faturação perdida' };
      case 'restaurante': return { unit: 'reservas', lost: 'reservas perdidas', revenue: 'faturação perdida' };
      case 'automoveis': return { unit: 'vendas', lost: 'vendas perdidas', revenue: 'margem perdida' };
      default: return { unit: 'cortes', lost: 'cortes perdidos', revenue: 'faturação que escapa' };
    }
  };

  const labels = getLabels(results.niche);

  return (
    <div className="animate-fade-in-up space-y-8">
      {/* Low Volume Warning Banner */}
      {results.lowVolumeWarning && (
        <div className="flex items-start gap-4 rounded-xl bg-amber-50/80 border border-amber-200/60 p-5 shadow-sm">
          <div className="bg-amber-100 p-2 rounded-lg shrink-0">
            <Info className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-amber-900 mb-1">
              Volume baixo detectado
            </h4>
            <p className="text-sm text-amber-700 leading-relaxed">
              Com {results.callsPerMonth} chamadas/mês e ~{Math.round(results.missedCalls)} perdidas,
              a margem de lucro é reduzida.
              <span className="font-medium underline decoration-amber-400/50 underline-offset-2 ml-1">Recomendamos 15+ chamadas/semana</span> para maximizar o retorno.
            </p>
          </div>
        </div>
      )}

      {/* Current Situation Card */}
      <Card className="shadow-sm border border-slate-200">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-slate-600 text-lg">
            <TrendingDown className="h-5 w-5 text-rose-500" />
            Situação Atual
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Row 1: Volume metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                <Phone className="h-5 w-5 text-slate-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  <AnimatedNumber value={results.callsPerMonth} />
                </p>
                <p className="text-sm text-slate-500">chamadas recebidas</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-50">
                <Phone className="h-5 w-5 text-rose-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-rose-600">
                  ~<AnimatedNumber value={Math.round(results.missedCalls)} />
                </p>
                <p className="text-sm text-rose-600/80">não atendidas</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                <Clock className="h-5 w-5 text-slate-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  <AnimatedNumber value={results.hoursLost} decimals={1} suffix="h" />
                </p>
                <p className="text-sm text-slate-500">em atendimento</p>
              </div>
            </div>
          </div>

          {/* Row 2: Financial metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                <Scissors className="h-5 w-5 text-slate-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  <AnimatedNumber value={results.cutsLost} decimals={1} />
                </p>
                <p className="text-sm text-slate-500">{labels.lost}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-50">
                <DollarSign className="h-5 w-5 text-rose-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-rose-600">
                  ~<AnimatedNumber
                    value={Math.round(
                      results.totalBenefitMonthly * (results.startMonthSeasonalityFactor || 1.0)
                    )}
                    suffix="€"
                  />
                  <span className="text-sm ml-1 text-rose-600/60 font-normal">/mês</span>
                </p>
                <p className="text-sm text-rose-600/80">
                  {labels.revenue}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-50">
                <TrendingDown className="h-5 w-5 text-rose-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-rose-600">
                  ~<AnimatedNumber value={Math.round(results.totalBenefitYearly)} suffix="€" />
                  <span className="text-sm ml-1 text-rose-600/60 font-normal">/ano</span>
                </p>
                <p className="text-sm text-rose-600/80">receita recuperável</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* With System Card */}
      <Card className="shadow-md border border-emerald-500/30 bg-white ring-4 ring-emerald-50/50">
        <CardHeader className="pb-2 border-b border-emerald-100/50 bg-emerald-50/30">
          <CardTitle className="flex items-center gap-2 text-emerald-700">
            <TrendingUp className="h-5 w-5" />
            Com o Sistema Activo 24/7
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 border border-slate-100">
                <DollarSign className="h-6 w-6 text-slate-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-slate-700">
                  <AnimatedNumber value={results.totalCostMonthly} decimals={2} suffix="€" />
                  <span className="text-sm ml-1 text-slate-400 font-normal">/mês</span>
                </p>
                <p className="text-sm text-slate-500">
                  (<AnimatedNumber value={results.totalCostYearly} decimals={0} suffix="€" />/ano)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100">
                <TrendingUp className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-emerald-700">
                  <AnimatedNumber value={Math.round(results.totalBenefitMonthly)} suffix="€" />
                  <span className="text-sm ml-1 text-emerald-600/60 font-normal">/mês</span>
                </p>
                <p className="text-sm text-emerald-600/80">
                  (<AnimatedNumber value={Math.round(results.totalBenefitYearly)} suffix="€" />/ano)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100">
                <CheckCircle2 className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-700">
                  <AnimatedNumber value={Math.round(results.netProfitYearly)} suffix="€" />
                  <span className="text-sm ml-1 text-emerald-600/60 font-normal">/ano</span>
                </p>
                <p className="text-sm text-emerald-600/80">lucro líquido</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 shadow-sm">
                <Rocket className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  <AnimatedNumber value={Math.round(results.roiPercent)} suffix="%" />
                </p>
                <p className="text-sm text-slate-500">ROI</p>
              </div>
            </div>
          </div>

          {/* Cost Breakdown - Detalhamento de custos */}
          <div className="mt-6 pt-6 border-t border-slate-100">
            <CostBreakdown
              costBreakdown={results.costBreakdown}
              serverTier={results.serverTier}
              totalCostMonthly={results.totalCostMonthly}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
