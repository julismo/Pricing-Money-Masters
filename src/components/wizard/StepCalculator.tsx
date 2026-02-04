import { CalculatorForm, FormData } from '@/components/forms/CalculatorForm';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

interface StepCalculatorProps {
    niche: string;
    objective: 'time' | 'money';
    onCalculate: (data: FormData) => void;
    onBack: () => void;
}

export function StepCalculator({ niche, objective, onCalculate, onBack }: StepCalculatorProps) {
    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex items-center justify-between relative mb-8">
                <Button variant="ghost" className="absolute left-0 -top-2 gap-2 text-slate-500 hover:text-slate-900" onClick={onBack}>
                    <ChevronLeft className="h-4 w-4" />
                    Voltar
                </Button>
                <div className="w-full text-center space-y-2 pt-8 md:pt-0">
                    <p className="text-slate-500 font-medium">Configura os parâmetros da tua operação</p>
                </div>
            </div>

            <CalculatorForm niche={niche} objective={objective} onCalculate={onCalculate} />
        </div>
    );
}
