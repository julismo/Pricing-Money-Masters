import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalculationResults } from './ResultsCards';

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
      color: 'hsl(160 84% 39%)',
    },
  ];

  const formatValue = (value: number) => {
    return `${value.toLocaleString('pt-PT')}€`;
  };

  return (
    <Card className="card-shadow-lg animate-fade-in-up border-0">
      <CardHeader>
        <CardTitle className="text-center text-lg font-semibold">
          Comparação Anual
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 10, right: 60, left: 10, bottom: 10 }}
            >
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }}
                width={120}
              />
              <Bar
                dataKey="value"
                radius={[0, 6, 6, 0]}
                barSize={32}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
                <LabelList
                  dataKey="value"
                  position="right"
                  formatter={formatValue}
                  style={{ fontSize: 14, fontWeight: 600, fill: 'hsl(var(--foreground))' }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Payback highlight */}
        <div className="mt-6 rounded-xl bg-gradient-to-r from-success/10 to-accent/10 p-6 text-center">
          <p className="text-lg text-muted-foreground">
            O sistema paga-se sozinho em
          </p>
          <p className="mt-1 text-4xl font-extrabold text-success">
            {results.paybackMonths} {results.paybackMonths === 1 ? 'mês' : 'meses'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
