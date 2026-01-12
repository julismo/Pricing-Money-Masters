import { Check } from 'lucide-react';

interface StepperProps {
    currentStep: number;
}

const stepNames = [
    { id: 1, label: 'Tipo de Valor' },
    { id: 2, label: 'Nicho' },
    { id: 3, label: 'Solução' },
    { id: 4, label: 'Calculadora' },
    { id: 5, label: 'Resultados' },
];

export function Stepper({ currentStep }: StepperProps) {
    return (
        <div className="w-full py-8">
            <div className="relative flex justify-between max-w-3xl mx-auto px-4">
                {/* Connecting Line Container - centered vertically behind circles */}
                <div className="absolute left-0 top-5 w-full h-[2px] px-8 md:px-12 box-border z-0">
                    <div className="relative w-full h-full bg-blue-100">
                        <div
                            className="absolute left-0 top-0 h-full bg-primary transition-all duration-500 ease-in-out"
                            style={{ width: `${((currentStep - 1) / (stepNames.length - 1)) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {stepNames.map((step) => {
                    const isCompleted = currentStep > step.id;
                    const isActive = currentStep === step.id;

                    return (
                        <div key={step.id} className="flex flex-col items-center gap-3 z-10 relative">
                            <div
                                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${isCompleted
                                    ? 'border-primary bg-primary text-primary-foreground'
                                    : isActive
                                        ? 'border-primary bg-primary text-primary-foreground shadow-md ring-4 ring-blue-50'
                                        : 'border-slate-200 bg-white text-slate-400'
                                    }`}
                            >
                                {isCompleted ? (
                                    <Check className="h-5 w-5" />
                                ) : (
                                    <span className="text-sm font-bold">{step.id}</span>
                                )}
                            </div>
                            <span
                                className={`text-xs font-semibold uppercase tracking-wider ${isActive ? 'text-primary' : isCompleted ? 'text-primary' : 'text-slate-400'
                                    }`}
                            >
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
