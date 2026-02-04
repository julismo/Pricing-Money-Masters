import { Scissors, Stethoscope, Utensils, Car, ChevronLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface StepNicheProps {
  onNext: (niche: string) => void;
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
        {/* Card: Barbearia (Active - Production) */}
        <Card
          className="p-6 relative border-2 border-primary shadow-xl cursor-pointer bg-white transition-all hover:scale-[1.02] ring-4 ring-blue-50/50"
          onClick={() => onNext('barbearia')}
        >
          <div className="flex flex-col items-start gap-4">
            <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center">
              <Scissors className="h-6 w-6 text-primary" />
            </div>
            <div className="text-left space-y-2">
              <h3 className="text-lg font-bold text-slate-900">Barbearia</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Gestão de marcações e atendimento ao cliente.
              </p>
            </div>
          </div>
        </Card>

        {/* Card: Clínica (Beta - Enabled) */}
        <Card
          className="p-6 relative border-2 border-slate-100 shadow-lg cursor-pointer bg-white transition-all hover:scale-[1.02] hover:border-primary hover:ring-4 hover:ring-blue-50 overflow-hidden"
          onClick={() => onNext('clinica')}
        >
          <Badge className="absolute top-3 right-3 bg-blue-50 text-blue-700 border-blue-200 z-10">Beta</Badge>
          <div className="flex flex-col items-start gap-4 pt-2">
            <div className="h-12 w-12 rounded-lg bg-amber-50 flex items-center justify-center">
              <Stethoscope className="h-6 w-6 text-amber-600" />
            </div>
            <div className="text-left space-y-2">
              <h3 className="text-lg font-bold text-slate-900">Clínica</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Agendamento de consultas e confirmações automáticas.
              </p>
            </div>
          </div>
        </Card>

        {/* Card: Restaurante (Beta - Enabled) */}
        <Card
          className="p-6 relative border-2 border-slate-100 shadow-lg cursor-pointer bg-white transition-all hover:scale-[1.02] hover:border-primary hover:ring-4 hover:ring-blue-50 overflow-hidden"
          onClick={() => onNext('restaurante')}
        >
          <Badge className="absolute top-3 right-3 bg-blue-50 text-blue-700 border-blue-200 z-10">Beta</Badge>
          <div className="flex flex-col items-start gap-4 pt-2">
            <div className="h-12 w-12 rounded-lg bg-amber-50 flex items-center justify-center">
              <Utensils className="h-6 w-6 text-amber-600" />
            </div>
            <div className="text-left space-y-2">
              <h3 className="text-lg font-bold text-slate-900">Restaurante</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Reservas automáticas e gestão de no-shows.
              </p>
            </div>
          </div>
        </Card>

        {/* Card: Stand Automóveis (Beta - Enabled) */}
        <Card
          className="p-6 relative border-2 border-slate-100 shadow-lg cursor-pointer bg-white transition-all hover:scale-[1.02] hover:border-primary hover:ring-4 hover:ring-blue-50 overflow-hidden"
          onClick={() => onNext('automoveis')}
        >
          <Badge className="absolute top-3 right-3 bg-blue-50 text-blue-700 border-blue-200 z-10">Beta</Badge>
          <div className="flex flex-col items-start gap-4 pt-2">
            <div className="h-12 w-12 rounded-lg bg-amber-50 flex items-center justify-center">
              <Car className="h-6 w-6 text-amber-600" />
            </div>
            <div className="text-left space-y-2">
              <h3 className="text-lg font-bold text-slate-900">Stand Auto</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Qualificação de leads e resposta imediata 24/7.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

