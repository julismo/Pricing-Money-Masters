import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalculationResults } from '@/utils/roiCalculations';

interface SeasonalityChartProps {
    results: CalculationResults;
}

export function SeasonalityChart({ results }: SeasonalityChartProps) {
    const data = results.monthlyData;
    const ticket = results.impliedHourlyRate ? (results.impliedHourlyRate / 60) * 30 : 0; // Backup estimation if needed, but better use data.averageTicket if passed. 
    // Wait, CalculationResults structure: { ... impliedHourlyRate ... }
    // Actually we can infer bookings from Revenue / AverageTicket.
    // However, I don't have AverageTicket explicitly in CalculationResults root, only impliedHourlyRate.
    // Ah, wait, I can pass the ticket. 
    // Let's look at CalculationResults definition in roiCalculations.ts.
    // It doesn't store averageTicket directly. 
    // But impliedHourlyRate = (averageTicket / cutDuration) * 60.
    // So Ticket can be derived maybe? Or I can just show Revenue. 
    // User asked for "Numbers of bookings" AND "Real price".
    // Showing Revenue is the "Real Price".

    // Let's show Revenue on bars, and maybe try to estimate bookings in tooltip.

    return (
        <Card className="card-shadow-lg animate-fade-in-up border-0">
            <CardHeader>
                <CardTitle className="text-center text-lg font-semibold">
                    Análise Fina de Sazonalidade
                </CardTitle>
                <CardDescription className="text-center">
                    Simulação do volume de <strong>agendamentos (chamadas)</strong> mês a mês.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
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
                                tickFormatter={(value) => value.toString()}
                                tick={{ fontSize: 12, fill: '#64748b' }}
                            />
                            <Tooltip
                                cursor={{ fill: 'transparent' }}
                                content={({ active, payload, label }) => {
                                    if (active && payload && payload.length) {
                                        const data = payload[0].payload;
                                        return (
                                            <div className="bg-white p-3 border border-slate-100 shadow-xl rounded-lg">
                                                <p className="font-bold text-slate-800 mb-2">{label}</p>
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-sm font-semibold text-slate-700">
                                                        {data.calls} Chamadas
                                                    </span>
                                                    <span className="text-xs text-slate-500 font-normal">
                                                        Faturação Est.: {Math.round(data.revenue).toLocaleString('pt-PT')}€
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Bar dataKey="calls" radius={[4, 4, 0, 0]}>
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.calls > (results.callsPerMonth * 1.1) ? '#10b981' : (entry.calls < (results.callsPerMonth * 0.9) ? '#f59e0b' : '#3b82f6')}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-4 flex justify-center gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1"><div className="w-3 h-3 bg-emerald-500 rounded-sm"></div>Alta Estação</div>
                    <div className="flex items-center gap-1"><div className="w-3 h-3 bg-blue-500 rounded-sm"></div>Média</div>
                    <div className="flex items-center gap-1"><div className="w-3 h-3 bg-amber-500 rounded-sm"></div>Baixa</div>
                </div>
            </CardContent>
        </Card>
    );
}
