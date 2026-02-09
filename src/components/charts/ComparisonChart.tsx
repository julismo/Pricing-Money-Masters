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
      color: '#fb7185', // rose-400
    },
    {
      name: 'Custo do sistema',
      value: Math.round(results.totalCostYearly),
      color: '#475569', // slate-600
    },
    {
      name: 'Lucro líquido',
      value: Math.round(results.netProfitYearly),
      color: results.netProfitYearly >= 0 ? '#10b981' : '#fb7185', // emerald-500 or rose-400
    },
  ];

  // Calculate Payback Month
  // Usar o valor calculado no utilitário que considera a relação Custo Mensal / Lucro Mensal
  // Isso garante que se o lucro cobre o custo, o retorno é "1 Mês" (imediato)
  let monthsToPayback = results.paybackMonths;

  // Safety fallback
  if (monthsToPayback === undefined || monthsToPayback === null) {
    monthsToPayback = 0;
  }

  // Fallback text is handled in render
  const paybackText = monthsToPayback <= 1
    ? '1 Mês'
    : `${monthsToPayback} Meses`;

  return (
    <Card className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/40 backdrop-blur-md shadow-sm p-6">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />

      <h3 className="relative z-10 text-center text-lg font-semibold mb-6 text-slate-700">Comparação Anual</h3>
      <div className="h-[300px] w-full relative z-10">
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
              width={130}
              tick={{ fontSize: 12, fill: '#64748b' }} // slate-500
              axisLine={false}
              tickLine={false}
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

      <div className="mt-6 rounded-xl bg-gradient-to-r from-emerald-50/50 to-teal-50/50 border border-emerald-100/50 p-6 text-center relative z-10 backdrop-blur-sm">
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-sm font-medium text-emerald-600 uppercase tracking-wider">
            O sistema paga-se em
          </p>
          <p className="text-3xl font-bold text-emerald-600 tracking-tight">
            {monthsToPayback <= 1 ? '1 Mês' : `${monthsToPayback} Meses`}
          </p>
        </div>
      </div>
    </Card>
  );
}
