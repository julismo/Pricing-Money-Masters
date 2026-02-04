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
    <div className="animate-fade-in-up space-y-6">
      {/* Low Volume Warning Banner */}
      {results.lowVolumeWarning && (
        <div className="flex items-start gap-3 rounded-lg bg-amber-50 border border-amber-200 p-4">
          <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-800">
              Volume baixo detectado
            </p>
            <p className="text-sm text-amber-700 mt-1">
              Com {results.callsPerMonth} chamadas/mês e ~{Math.round(results.missedCalls)} perdidas,
              a margem de lucro é reduzida.
              <span className="font-medium"> Recomendamos 15+ chamadas/semana</span> para maximizar o retorno.
            </p>
          </div>
        </div>
      )}

      {/* Current Situation Card */}
      <Card className="shadow-sm border border-slate-200/80">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-slate-600">
            <TrendingDown className="h-5 w-5 text-loss" />
            Situação Atual
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Row 1: Volume metrics */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-loss/10">
                <Phone className="h-5 w-5 text-loss" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  <AnimatedNumber value={results.callsPerMonth} />
                </p>
                <p className="text-sm text-muted-foreground">chamadas recebidas</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-loss/20">
                <Phone className="h-5 w-5 text-loss" />
              </div>
              <div>
                <p className="text-2xl font-bold text-loss">
                  ~<AnimatedNumber value={Math.round(results.missedCalls)} />
                </p>
                <p className="text-sm text-muted-foreground">não atendidas</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-loss/10">
                <Clock className="h-5 w-5 text-loss" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  <AnimatedNumber value={results.hoursLost} decimals={1} suffix="h" />
                </p>
                <p className="text-sm text-muted-foreground">em atendimento</p>
              </div>
            </div>
          </div>

          {/* Row 2: Financial metrics */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-loss/10">
                <Scissors className="h-5 w-5 text-loss" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  <AnimatedNumber value={results.cutsLost} decimals={1} />
                </p>
                <p className="text-sm text-muted-foreground">{labels.lost}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-loss/10">
                <DollarSign className="h-5 w-5 text-loss" />
              </div>
              <div>
                <p className="text-2xl font-bold text-loss">
                  ~<AnimatedNumber
                    value={Math.round(
                      results.totalBenefitMonthly * (results.startMonthSeasonalityFactor || 1.0)
                    )}
                    suffix="€"
                  />/mês
                </p>
                <p className="text-sm text-muted-foreground">
                  {labels.revenue}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-loss/10">
                <TrendingDown className="h-5 w-5 text-loss" />
              </div>
              <div>
                <p className="text-2xl font-bold text-loss">
                  ~<AnimatedNumber value={Math.round(results.totalBenefitYearly)} suffix="€" />/ano
                </p>
                <p className="text-sm text-muted-foreground">receita recuperável</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* With System Card */}
      <Card className="shadow-sm border border-emerald-200/80 bg-gradient-to-br from-white to-emerald-50/30">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-emerald-700">
            <TrendingUp className="h-5 w-5" />
            Com o Sistema Activo 24/7
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xl font-bold">
                  <AnimatedNumber value={results.totalCostMonthly} decimals={2} suffix="€" />/mês
                </p>
                <p className="text-sm text-muted-foreground">
                  (<AnimatedNumber value={results.totalCostYearly} decimals={2} suffix="€" />/ano)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-xl font-bold text-success">
                  <AnimatedNumber value={Math.round(results.totalBenefitMonthly)} suffix="€" />/mês
                </p>
                <p className="text-sm text-muted-foreground">
                  (<AnimatedNumber value={Math.round(results.totalBenefitYearly)} suffix="€" />/ano)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-xl font-bold text-success">
                  <AnimatedNumber value={Math.round(results.netProfitYearly)} suffix="€" />/ano
                </p>
                <p className="text-sm text-muted-foreground">lucro líquido</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                <Rocket className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-xl font-bold text-accent">
                  <AnimatedNumber value={Math.round(results.roiPercent)} suffix="%" />
                </p>
                <p className="text-sm text-muted-foreground">ROI</p>
              </div>
            </div>
          </div>

          {/* Cost Breakdown - Detalhamento de custos */}
          <CostBreakdown
            costBreakdown={results.costBreakdown}
            serverTier={results.serverTier}
            totalCostMonthly={results.totalCostMonthly}
          />
        </CardContent>
      </Card>
    </div>
  );
}
