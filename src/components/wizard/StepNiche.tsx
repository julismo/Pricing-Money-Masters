import { Scissors, Stethoscope, Utensils, ChevronLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface StepNicheProps {
  onNext: () => void;
  onBack: () => void;
}

export function StepNiche({ onNext, onBack }: StepNicheProps) {
  return (
    <div className="space-y-8 animate-fade-in-up max-w-5xl mx-auto">
      <div className="flex items-center justify-between relative">
        <Button variant="ghost" className="absolute left-0 -top-2 gap-2 text-slate-500 hover:text-slate-900" onClick={onBack}>
          <ChevronLeft className="h-4 w-4" />
          Voltar
        </Button>
        <div className="w-full text-center space-y-2 pt-8 md:pt-0">
          <h2 className="text-2xl font-bold text-slate-900">Setor de Atividade</h2>
          <p className="text-slate-500 font-medium">Adapta o modelo ao teu mercado</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Card: Barbearia (Active) */}
        <Card
          className="p-8 relative border-2 border-primary shadow-xl cursor-pointer bg-white transition-all hover:scale-[1.02] ring-4 ring-blue-50/50"
          onClick={onNext}
        >
          <div className="flex flex-col items-start gap-6">
            <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center">
              <Scissors className="h-6 w-6 text-primary" />
            </div>
            <div className="text-left space-y-2">
              <h3 className="text-lg font-bold text-slate-900">Barbearia</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Gestão de marcações, atendimento ao cliente e redução de chamadas perdidas.
              </p>
            </div>
          </div>
        </Card>

        {/* Card: Clínica (Disabled) */}
        <Card className="p-8 relative opacity-60 border border-slate-200 shadow-sm cursor-not-allowed bg-white grayscale overflow-hidden">
          <Badge variant="secondary" className="absolute top-4 right-4 bg-slate-100 text-slate-500 z-10">Em breve</Badge>
          <div className="flex flex-col items-start gap-6 pt-2">
            <div className="h-12 w-12 rounded-lg bg-slate-50 flex items-center justify-center">
              <Stethoscope className="h-6 w-6 text-slate-400" />
            </div>
            <div className="text-left space-y-2">
              <h3 className="text-lg font-bold text-slate-900">Clínica</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Agendamento de consultas, triagem automática e confirmações.
              </p>
            </div>
          </div>
        </Card>

        {/* Card: Restaurante (Disabled) */}
        <Card className="p-8 relative opacity-60 border border-slate-200 shadow-sm cursor-not-allowed bg-white grayscale overflow-hidden">
          <Badge variant="secondary" className="absolute top-4 right-4 bg-slate-100 text-slate-500 z-10">Em breve</Badge>
          <div className="flex flex-col items-start gap-6 pt-2">
            <div className="h-12 w-12 rounded-lg bg-slate-50 flex items-center justify-center">
              <Utensils className="h-6 w-6 text-slate-400" />
            </div>
            <div className="text-left space-y-2">
              <h3 className="text-lg font-bold text-slate-900">Restaurante</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Reservas automáticas, menus digitais e gestão de pedidos.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
