import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, ReferenceLine } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalculationResults } from '@/utils/roiCalculations';

interface CashflowChartProps {
    results: CalculationResults;
}

export function CashflowChart({ results }: CashflowChartProps) {
    const data = results.monthlyData;

    // Calculate break-even index for reference line (first month where cumulative profit > 0)
    const breakEvenIndex = data.findIndex(d => d.cumulativeProfit > 0);
    const breakEvenMonth = breakEvenIndex !== -1 ? data[breakEvenIndex].month : null;

    const formatCurrency = (value: number) => {
        return `${Math.round(value).toLocaleString('pt-PT')}€`;
    };

    return (
        <Card className="card-shadow-lg animate-fade-in-up border-0">
            <CardHeader>
                <CardTitle className="text-center text-lg font-semibold">
                    Evolução do Lucro Acumulado
                </CardTitle>
                <CardDescription className="text-center">
                    Visualiza quando o investimento se paga e o lucro começa a acumular.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={data}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorLoss" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tick={{ fontSize: 12, fill: '#64748b' }}
                                tickFormatter={(val) => val.substring(0, 3)}
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => {
                                    if (value >= 1000) return `${(value / 1000).toFixed(1)}k€`;
                                    return `${Math.round(value)}€`;
                                }}
                                tick={{ fontSize: 12, fill: '#64748b' }}
                            />
                            <Tooltip
                                formatter={(value: number) => [formatCurrency(value), "Lucro Acumulado"]}
                                labelStyle={{ color: '#1e293b', fontWeight: 'bold' }}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <ReferenceLine y={0} stroke="#94a3b8" strokeDasharray="3 3" />

                            <Area
                                type="monotone"
                                dataKey="cumulativeProfit"
                                stroke="#0f172a"
                                strokeWidth={2}
                                fill="url(#colorProfit)"
                                activeDot={{ r: 6, strokeWidth: 0 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {breakEvenMonth && (
                    <div className="mt-4 text-center text-sm text-slate-500 bg-slate-50 p-3 rounded-lg mx-auto max-w-xs">
                        🎉 Ponto de viragem estimado em <span className="font-bold text-slate-900">{breakEvenMonth}</span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
