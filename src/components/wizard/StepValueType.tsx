import { TrendingUp, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface StepValueTypeProps {
  onNext: (type: 'time' | 'money') => void;
}

export function StepValueType({ onNext }: StepValueTypeProps) {
  return (
    <div className="space-y-12 animate-fade-in-up max-w-4xl mx-auto">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Objetivo da Automação</h2>
        <p className="text-slate-500 font-medium">Qual é o principal foco da melhoria?</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Card 1: Gerar Dinheiro (Beta - Enabled) */}
        <Card
          className="p-8 relative border-2 border-slate-100 shadow-lg cursor-pointer bg-white transition-all hover:scale-[1.02] hover:border-primary hover:ring-4 hover:ring-blue-50 overflow-hidden"
          onClick={() => onNext('money')}
        >
          <Badge className="absolute top-4 right-4 bg-blue-50 text-blue-700 border-blue-200 z-10">Beta</Badge>
          <div className="flex flex-col items-center text-center gap-6 pt-4">
            <div className="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center">
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900">Gerar Dinheiro</h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-[250px] mx-auto">
                Aumentar faturação, mais clientes, mais vendas
              </p>
            </div>
          </div>
        </Card>

        {/* Card 2: Poupar Tempo (Active - Production) */}
        <Card
          className="p-8 relative border-2 border-primary shadow-xl cursor-pointer bg-white transition-all hover:scale-[1.02] ring-4 ring-blue-50/50"
          onClick={() => onNext('time')}
        >
          <div className="flex flex-col items-center text-center gap-6">
            <div className="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900">Poupar Tempo</h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-[250px] mx-auto">
                Eliminar interrupções e trabalho manual
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="bg-blue-50/50 rounded-lg p-4 border border-blue-100 flex gap-4 items-start text-sm text-slate-600 max-w-2xl mx-auto">
        <div className="bg-white p-1 rounded-full shadow-sm mt-0.5">
          <div className="h-2 w-2 rounded-full bg-blue-500"></div>
        </div>
        <p>A maioria dos serviços começa por <b>Poupar Tempo</b> antes de escalar para Gerar Dinheiro.</p>
      </div>
    </div>
  );
}

