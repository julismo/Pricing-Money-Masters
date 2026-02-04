import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, LabelList, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalculationResults } from '@/components/results/ResultsCards';

interface ComparisonChartProps {
  results: CalculationResults;
}

export function ComparisonChart({ results }: ComparisonChartProps) {
  const data = [
    {
      name: 'Perde sem sistema',
      value: Math.round(results.totalBenefitYearly),
      color: 'hsl(0 84% 60%)',
    },
    {
      name: 'Custo do sistema',
      value: Math.round(results.totalCostYearly),
      color: 'hsl(224 76% 33%)',
    },
    {
      name: 'Lucro líquido',
      value: Math.round(results.netProfitYearly),
      color: results.netProfitYearly >= 0 ? 'hsl(160 84% 39%)' : 'hsl(0 84% 60%)', // Green or Red
    },
  ];

  // Calculate Payback Month
  // Use recommendedSetup (20% of annual revenue) as the Investment Basis
  const totalSetupCost = results.recommendedSetup || 0;
  const monthlyNetProfit = results.totalBenefitMonthly - results.totalCostMonthly;
  const monthsToPayback = monthlyNetProfit > 0 ? Math.ceil(totalSetupCost / monthlyNetProfit) : 0;

  // Get current month index (0-11)
  const currentMonthIndex = new Date().getMonth();
  const paybackMonthIndex = (currentMonthIndex + monthsToPayback) % 12;

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const paybackMonthName = monthNames[paybackMonthIndex];
  const paybackText = monthsToPayback <= 1
    ? 'no primeiro mês'
    : `em ${paybackMonthName}`;

  return (
    <Card className="p-6">
      <h3 className="text-center text-lg font-semibold mb-6">Comparação Anual</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            barSize={32}
          >
            <XAxis type="number" hide />
            <YAxis
              dataKey="name"
              type="category"
              width={100}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              cursor={{ fill: 'transparent' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <span className="font-medium">{data.name}:</span>
                        <span className="font-bold">
                          {data.value.toLocaleString('pt-PT')}€
                        </span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              dataKey="value"
              radius={[0, 4, 4, 0]}
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
              <LabelList
                dataKey="value"
                position="right"
                formatter={(value: number) => `${value.toLocaleString('pt-PT')}€`}
                className="font-bold fill-slate-700"
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 p-6 text-center">
        <p className="text-sm font-medium text-emerald-800 uppercase tracking-wide opacity-80 mb-1">
          Retorno do Investimento
        </p>
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-2xl md:text-3xl font-bold text-emerald-600">
            O sistema paga-se sozinho {paybackText}
          </p>
        </div>
      </div>
    </Card>
  );
}
