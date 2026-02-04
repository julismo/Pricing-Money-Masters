import { Server, Phone, Bot, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { AnimatedNumber } from '@/components/common/AnimatedNumber';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface CostBreakdownProps {
    costBreakdown: {
        server: number;
        twilioNumber: number;
        retellAI: number;
        sms: number;
    };
    serverTier: string;
    totalCostMonthly: number;
}

/**
 * CostBreakdown - Componente de visualização de custos
 * 
 * Aplica princípios de Interface Design:
 * - Subtle layering: diferenças sutis entre componentes
 * - Data visualization: números com contexto
 * - Collapsible: informação sob demanda
 */
export function CostBreakdown({ costBreakdown, serverTier, totalCostMonthly }: CostBreakdownProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const costs = [
        {
            icon: Server,
            label: 'Servidor',
            sublabel: serverTier,
            value: costBreakdown.server,
            color: 'text-slate-600',
            bgColor: 'bg-slate-100',
        },
        {
            icon: Phone,
            label: 'Twilio',
            sublabel: 'Número PT',
            value: costBreakdown.twilioNumber,
            color: 'text-red-600',
            bgColor: 'bg-red-50',
        },
        {
            icon: Bot,
            label: 'Retell AI',
            sublabel: 'Voice Agent',
            value: costBreakdown.retellAI,
            color: 'text-violet-600',
            bgColor: 'bg-violet-50',
        },
        {
            icon: MessageSquare,
            label: 'SMS',
            sublabel: 'Lembretes',
            value: costBreakdown.sms,
            color: 'text-emerald-600',
            bgColor: 'bg-emerald-50',
        },
    ];

    return (
        <div className="mt-4">
            {/* Toggle Button */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={cn(
                    "w-full flex items-center justify-between px-4 py-2 rounded-lg transition-all",
                    "text-sm font-medium text-slate-600 hover:text-slate-900",
                    "bg-slate-50 hover:bg-slate-100 border border-slate-200",
                    isExpanded && "bg-slate-100 border-slate-300"
                )}
            >
                <span className="flex items-center gap-2">
                    Ver detalhes do custo
                </span>
                {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                )}
            </button>

            {/* Breakdown Panel */}
            <div
                className={cn(
                    "overflow-hidden transition-all duration-300 ease-out",
                    isExpanded ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0"
                )}
            >
                <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200 p-4">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                        <span className="text-sm font-medium text-slate-500">
                            Custo mensal
                        </span>
                        <span className="text-sm font-bold text-slate-700">
                            €{totalCostMonthly.toFixed(0)}/mês
                        </span>
                    </div>

                    {/* Cost Items */}
                    <div className="space-y-3">
                        {costs.map((cost) => {
                            const Icon = cost.icon;
                            const percentage = totalCostMonthly > 0
                                ? (cost.value / totalCostMonthly) * 100
                                : 0;

                            return (
                                <div key={cost.label} className="group">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={cn(
                                                "flex h-8 w-8 items-center justify-center rounded-lg",
                                                cost.bgColor
                                            )}>
                                                <Icon className={cn("h-4 w-4", cost.color)} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-slate-700">{cost.label}</p>
                                                <p className="text-xs text-slate-400">{cost.sublabel}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-slate-800">
                                                <AnimatedNumber value={cost.value} decimals={2} suffix="€" />
                                            </p>
                                            <p className="text-xs text-slate-400">
                                                {percentage.toFixed(0)}%
                                            </p>
                                        </div>
                                    </div>

                                    {/* Progress bar */}
                                    <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className={cn(
                                                "h-full rounded-full transition-all duration-500",
                                                cost.color.replace('text-', 'bg-')
                                            )}
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>


                </div>
            </div>
        </div>
    );
}
