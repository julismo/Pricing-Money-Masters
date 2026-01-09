import { Phone, Clock, Scissors, TrendingDown, TrendingUp, CheckCircle2, Rocket, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedNumber } from './AnimatedNumber';

export interface CalculationResults {
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
}

interface ResultsCardsProps {
  results: CalculationResults;
}

export function ResultsCards({ results }: ResultsCardsProps) {
  return (
    <div className="animate-fade-in-up space-y-6">
      {/* Current Situation Card */}
      <Card className="card-shadow-lg border-l-4 border-l-loss">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-loss">
            <TrendingDown className="h-5 w-5" />
            Situação Atual (sem automação)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-loss/10">
                <Clock className="h-5 w-5 text-loss" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  <AnimatedNumber value={results.hoursLost} decimals={1} suffix="h" />
                </p>
                <p className="text-sm text-muted-foreground">horas perdidas/mês</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-loss/10">
                <Scissors className="h-5 w-5 text-loss" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  <AnimatedNumber value={results.cutsLost} decimals={1} />
                </p>
                <p className="text-sm text-muted-foreground">cortes não realizados</p>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:col-span-2 lg:col-span-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-loss/10">
                <DollarSign className="h-5 w-5 text-loss" />
              </div>
              <div>
                <p className="text-2xl font-bold text-loss">
                  ~<AnimatedNumber value={Math.round(results.totalBenefitMonthly)} prefix="" suffix="€" />/mês
                </p>
                <p className="text-sm text-muted-foreground">em perdas</p>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:col-span-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-loss/10">
                <TrendingDown className="h-5 w-5 text-loss" />
              </div>
              <div>
                <p className="text-2xl font-bold text-loss">
                  ~<AnimatedNumber value={Math.round(results.totalBenefitYearly)} suffix="€" />/ano
                </p>
                <p className="text-sm text-muted-foreground">desperdiçados</p>
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
            Com o Sistema Automático
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
