import { Phone, Clock, Scissors, TrendingDown, TrendingUp, CheckCircle2, Rocket, DollarSign, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedNumber } from './AnimatedNumber';
import { PricingSection } from './PricingSection';

export interface CalculationResults {
  mode: 'tempo' | 'oportunidade';
  isSeasonal?: boolean;
  startMonthSeasonalityFactor?: number;
  callsPerMonth: number;
  minutesInCalls: number;
  realTimeLost: number;
  hoursLost: number;
  cutsLost: number;
  revenueLostTime: number;
  missedCalls: number;
  clientsLost: number;
  revenueLostCalls: number;
  totalBenefitMonthly: number;
  totalBenefitYearly: number;
  variableCost: number;
  totalCostMonthly: number;
  totalCostYearly: number;
  netProfitYearly: number;
  roiPercent: number;
  paybackMonths: number;
  impliedHourlyRate: number;
  aiSafetyMargin: number;
  lowVolumeWarning?: boolean;
  recommendedSetup: number;
}

interface ResultsCardsProps {
  results: CalculationResults;
}

export function ResultsCards({ results }: ResultsCardsProps) {
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
      <Card className="card-shadow-lg border-l-4 border-l-loss">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-loss">
            <TrendingDown className="h-5 w-5" />
            HOJE
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
                <p className="text-sm text-muted-foreground">chamadas/mês</p>
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
                <p className="text-sm text-muted-foreground">perdidas/mês</p>
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
                <p className="text-sm text-muted-foreground">horas perdidas</p>
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
                <p className="text-sm text-muted-foreground">cortes perdidos</p>
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
                  oportunidade perdida
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
                <p className="text-sm text-muted-foreground">que podes recuperar</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* With System Card */}
      <Card className="card-shadow-lg border-l-4 border-l-success">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-success">
            <TrendingUp className="h-5 w-5" />
            COM AUTOMAÇÃO
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
        </CardContent>
      </Card>
    </div>
  );
}
