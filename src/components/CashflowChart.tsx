import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, ReferenceLine, Line, ComposedChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalculationResults } from '@/utils/roiCalculations';

interface CashflowChartProps {
    results: CalculationResults;
    customSetup?: number;
    customMaintenance?: number;
}

export function CashflowChart({ results, customSetup, customMaintenance }: CashflowChartProps) {
    // Use recommended setup if not provided, maintenance defaults to 0 (consultant fee)
    const setup = customSetup ?? results.recommendedSetup;
    const consultantFee = customMaintenance ?? 0; // Consultant's monthly fee (NOT infra)

    // Enrich data with cumulative investment cost
    // Investment = Setup (one time) + Consultant Fee × months
    const data = results.monthlyData.map((month, index) => ({
        ...month,
        cumulativeInvestment: setup + (consultantFee * (index + 1)),
    }));

    // Find payback month (where cumulative profit >= cumulative investment)
    const paybackIndex = data.findIndex(d => d.cumulativeProfit >= d.cumulativeInvestment);
    const paybackMonth = paybackIndex !== -1 ? data[paybackIndex].month : null;

    const formatCurrency = (value: number) => {
        return `${Math.round(value).toLocaleString('pt-PT')}€`;
    };

    return (
        <Card className="card-shadow-lg animate-fade-in-up border-0">
            <CardHeader>
                <CardTitle className="text-center text-lg font-semibold">
                    Retorno do Teu Investimento
                </CardTitle>
                <CardDescription className="text-center">
                    Vê como o sistema se paga ao longo do tempo
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart
                            data={data}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
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
                                formatter={(value: number, name: string) => {
                                    const label = name === 'cumulativeProfit' ? 'Lucro Acumulado' : 'Investimento';
                                    return [formatCurrency(value), label];
                                }}
                                labelStyle={{ color: '#1e293b', fontWeight: 'bold' }}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <ReferenceLine y={0} stroke="#94a3b8" strokeDasharray="3 3" />

                            {/* Profit Area */}
                            <Area
                                type="monotone"
                                dataKey="cumulativeProfit"
                                stroke="#10b981"
                                strokeWidth={2}
                                fill="url(#colorProfit)"
                                activeDot={{ r: 6, strokeWidth: 0 }}
                                name="cumulativeProfit"
                            />

                            {/* Investment Line (dashed red) */}
                            <Line
                                type="monotone"
                                dataKey="cumulativeInvestment"
                                stroke="#ef4444"
                                strokeWidth={2}
                                strokeDasharray="5 5"
                                dot={false}
                                name="cumulativeInvestment"
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>

                {paybackMonth && (
                    <div className="mt-4 text-center bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg mx-auto max-w-md border border-green-100">
                        <p className="text-sm text-slate-600">O investimento paga-se em</p>
                        <p className="text-2xl font-bold text-green-600">{paybackMonth}</p>
                        {consultantFee > 0 && (
                            <p className="text-xs text-slate-500 mt-1">
                                Setup de {formatCurrency(setup)} + {formatCurrency(consultantFee)}/mês
                            </p>
                        )}
                    </div>
                )}

                {!paybackMonth && (
                    <div className="mt-4 text-center bg-amber-50 p-4 rounded-lg mx-auto max-w-md border border-amber-100">
                        <p className="text-sm text-amber-700">
                            ⚠️ Com estes valores, o investimento leva mais de 12 meses a recuperar.
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

