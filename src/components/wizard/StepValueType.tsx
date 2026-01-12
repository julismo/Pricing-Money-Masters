import { TrendingUp, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface StepValueTypeProps {
  onNext: () => void;
}

export function StepValueType({ onNext }: StepValueTypeProps) {
  return (
    <div className="space-y-12 animate-fade-in-up max-w-4xl mx-auto">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Objetivo da Automação</h2>
        <p className="text-slate-500 font-medium">Qual é o principal foco da melhoria?</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Card 1: Gerar Dinheiro (Disabled) */}
        <Card className="p-8 relative opacity-60 border border-slate-200 shadow-sm cursor-not-allowed bg-white grayscale overflow-hidden">
          <Badge variant="secondary" className="absolute top-4 right-4 bg-slate-100 text-slate-500 z-10">Em breve</Badge>
          <div className="flex flex-col items-center text-center gap-6 pt-4"> {/* Added pt-4 to avoid overlap */}
            <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center">
              <TrendingUp className="h-8 w-8 text-slate-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900">Gerar Dinheiro</h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-[250px] mx-auto">
                Aumentar faturação, mais clientes, mais vendas
              </p>
            </div>
          </div>
        </Card>

        {/* Card 2: Poupar Tempo (Active) */}
        <Card
          className="p-8 relative border-2 border-primary shadow-xl cursor-pointer bg-white transition-all hover:scale-[1.02] ring-4 ring-blue-50/50"
          onClick={onNext}
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
