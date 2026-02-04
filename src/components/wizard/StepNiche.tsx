import { Scissors, Stethoscope, Utensils, Car, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface StepNicheProps {
  onNext: (niche: string) => void;
  onBack: () => void;
}

export function StepNiche({ onNext, onBack }: StepNicheProps) {
  return (
    <div className="space-y-8 animate-fade-in-up max-w-5xl mx-auto py-2">
      <div className="flex items-center justify-between relative mb-8">
        <Button variant="ghost" className="absolute left-0 -top-2 gap-2 text-slate-500 hover:text-slate-900 transition-colors" onClick={onBack}>
          <ChevronLeft className="h-4 w-4" />
          Voltar
        </Button>
        <div className="w-full text-center space-y-3 pt-8 md:pt-0">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Setor de Atividade</h2>
          <p className="text-slate-500 text-lg">Adapta o modelo ao teu mercado para resultados precisos</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-2">
        {/* Card: Barbearia */}
        <div
          onClick={() => onNext('barbearia')}
          className="group relative bg-white p-8 rounded-2xl border border-primary/30 cursor-pointer shadow-md hover:shadow-lg ring-1 ring-primary/10 hover:ring-primary/20 hover:border-primary/60 transition-all duration-200"
        >
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-200" />
          <div className="relative flex flex-col items-start gap-5">
            <div className="h-14 w-14 rounded-xl bg-blue-50 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <Scissors className="h-7 w-7 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">Barbearia</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Otimizado para agendamentos, cortes e serviços de barbearia.
              </p>
            </div>
          </div>
        </div>

        {/* Card: Clínica */}
        <div
          onClick={() => onNext('clinica')}
          className="group relative bg-white p-8 rounded-2xl border border-slate-200 cursor-pointer shadow-sm hover:shadow-md hover:border-amber-200 hover:ring-1 hover:ring-amber-100 transition-all duration-200"
        >
          <Badge className="absolute top-4 right-4 bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100 transition-colors">Beta</Badge>
          <div className="relative flex flex-col items-start gap-5">
            <div className="h-14 w-14 rounded-xl bg-amber-50 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <Stethoscope className="h-7 w-7 text-amber-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-700 transition-colors">Clínica</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Ideal para consultas, tratamentos e gestão de pacientes.
              </p>
            </div>
          </div>
        </div>

        {/* Card: Restaurante */}
        <div
          onClick={() => {
            toast.info("Funcionalidade Indisponível", {
              description: "O nicho de Restaurante estará disponível em breve.",
              duration: 3000,
            });
            // Do NOT call onNext('restaurante')
          }}
          className="group relative bg-white p-8 rounded-2xl border border-slate-200 cursor-pointer shadow-sm hover:shadow-md hover:border-rose-200 hover:ring-1 hover:ring-rose-100 transition-all duration-200"
        >
          <Badge className="absolute top-4 right-4 bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100 transition-colors">Beta</Badge>
          <div className="relative flex flex-col items-start gap-5">
            <div className="h-14 w-14 rounded-xl bg-rose-50 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <Utensils className="h-7 w-7 text-rose-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-rose-700 transition-colors">Restaurante</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Perfeito para reservas, encomendas e atendimento ao cliente.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

