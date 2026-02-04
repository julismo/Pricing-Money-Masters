import { TrendingUp, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface StepValueTypeProps {
  onNext: (type: 'time' | 'money') => void;
}

export function StepValueType({ onNext }: StepValueTypeProps) {
  return (
    <div className="space-y-8 animate-fade-in-up max-w-4xl mx-auto py-4">
      <div className="text-center space-y-3 mb-8">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Objetivo da Automação</h2>
        <p className="text-slate-500 text-lg">Qual é o principal foco da melhoria para o teu negócio?</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 px-2">
        {/* Card 1: Gerar Dinheiro (Disabled - Futuro) */}
        <div className="group relative bg-white p-8 rounded-2xl border border-slate-200 cursor-not-allowed bg-white opacity-60 grayscale overflow-hidden">
          <Badge variant="secondary" className="absolute top-4 right-4 bg-slate-100 text-slate-500 z-10">Futuro</Badge>
          <div className="flex flex-col items-center text-center gap-6">
            <div className="h-16 w-16 rounded-2xl bg-blue-50 flex items-center justify-center">
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900">Gerar Dinheiro</h3>
              <p className="text-slate-500 leading-relaxed max-w-[260px] mx-auto">
                Aumentar faturação, atrair novos clientes e maximizar vendas.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: Poupar Tempo */}
        <div
          onClick={() => onNext('time')}
          className="group relative bg-white p-8 rounded-2xl border border-primary/30 cursor-pointer shadow-md hover:shadow-lg ring-1 ring-primary/10 hover:ring-primary/20 hover:border-primary/60 transition-all duration-200"
        >
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-200" />
          <div className="relative flex flex-col items-center text-center gap-6">
            <div className="h-16 w-16 rounded-2xl bg-amber-50 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <Clock className="h-8 w-8 text-amber-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-700 transition-colors">Poupar Tempo</h3>
              <p className="text-slate-500 leading-relaxed max-w-[260px] mx-auto">
                Eliminar tarefas repetitivas, interrupções e trabalho manual.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex gap-4 items-start text-sm text-slate-600 max-w-2xl mx-auto shadow-sm">
        <div className="bg-white p-1.5 rounded-full shadow-sm mt-0.5 border border-slate-100">
          <div className="h-2 w-2 rounded-full bg-amber-500"></div>
        </div>
        <p className="leading-relaxed">A maioria dos negócios começa por <span className="font-semibold text-slate-900">Poupar Tempo</span> para estabilizar operações antes de escalar vendas.</p>
      </div>
    </div>
  );
}

