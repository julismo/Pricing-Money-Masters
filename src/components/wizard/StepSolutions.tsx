import { PhoneCall, MessageSquare, Zap, ChevronLeft, Star, Receipt } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface StepSolutionsProps {
    onNext: (type: 'voice' | 'chat' | 'both') => void;
    onBack: () => void;
}

export function StepSolutions({ onNext, onBack }: StepSolutionsProps) {
    return (
        <div className="space-y-8 animate-fade-in-up max-w-5xl mx-auto">
            <div className="flex items-center justify-between relative">
                <Button variant="ghost" className="absolute left-0 -top-2 gap-2 text-slate-500 hover:text-slate-900" onClick={onBack}>
                    <ChevronLeft className="h-4 w-4" />
                    Voltar
                </Button>
                <div className="w-full text-center space-y-2 pt-8 md:pt-0">
                    <h2 className="text-2xl font-bold text-slate-900">Configuração da Solução</h2>
                    <p className="text-slate-500 font-medium">Define a tecnologia a implementar</p>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Card: Atendente de Voz (Active - Production) */}
                <Card
                    className="p-8 relative border border-primary/40 shadow-lg cursor-pointer bg-white transition-all duration-200 hover:shadow-xl hover:border-primary ring-2 ring-primary/10 hover:ring-primary/20 group"
                    onClick={() => onNext('voice')}
                >
                    <div className="flex flex-col items-start gap-6">
                        <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                            <PhoneCall className="h-6 w-6 text-primary" />
                        </div>
                        <div className="text-left space-y-2">
                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">Atendente de Voz</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                Atende chamadas, agenda serviços e tira dúvidas 24/7 com voz humana.
                            </p>
                        </div>
                    </div>
                </Card>

                {/* Card: Chatbot IA (Beta - Enabled) */}
                <Card
                    className="p-8 relative border border-slate-200 shadow-md cursor-pointer bg-white transition-all duration-200 hover:shadow-lg hover:border-primary/40 hover:ring-2 hover:ring-primary/10 overflow-hidden group"
                    onClick={() => {
                        // onNext('chat') // Temporarily disabled
                        toast.info("Funcionalidade Indisponível", {
                            description: "Esta opção encontra-se temporariamente indisponível. Estamos a trabalhar para a disponibilizar brevemente."
                        });
                    }}
                >
                    <Badge className="absolute top-4 right-4 bg-blue-50 text-blue-700 border-blue-200 z-10">Beta</Badge>
                    <div className="flex flex-col items-start gap-6">
                        <div className="h-12 w-12 rounded-lg bg-amber-50 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                            <MessageSquare className="h-6 w-6 text-amber-600" />
                        </div>
                        <div className="text-left space-y-2">
                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors">Chatbot IA</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                Responde automaticamente no WhatsApp e Instagram Direct.
                            </p>
                        </div>
                    </div>
                </Card>

                {/* Card: Combo (Disabled - Futuro) */}
                <Card className="p-8 relative border border-slate-200 shadow-sm cursor-not-allowed bg-white opacity-60 grayscale overflow-hidden">
                    <Badge variant="secondary" className="absolute top-4 right-4 bg-slate-100 text-slate-500 z-10">Futuro</Badge>
                    <div className="flex flex-col items-start gap-6 pt-2">
                        <div className="h-12 w-12 rounded-lg bg-slate-50 flex items-center justify-center">
                            <Zap className="h-6 w-6 text-slate-400" />
                        </div>
                        <div className="text-left space-y-2">
                            <h3 className="text-lg font-bold text-slate-900">Combo (Voz + Chat)</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                Cobertura total em todos os canais de comunicação.
                            </p>
                        </div>
                    </div>
                </Card>

                {/* Card: Gestão de Reviews (Disabled) */}
                <Card className="p-8 relative border border-slate-200 shadow-sm cursor-not-allowed bg-white opacity-60 grayscale overflow-hidden">
                    <Badge variant="secondary" className="absolute top-4 right-4 bg-slate-100 text-slate-500 z-10">Futuro</Badge>
                    <div className="flex flex-col items-start gap-6 pt-2">
                        <div className="h-12 w-12 rounded-lg bg-slate-50 flex items-center justify-center">
                            <Star className="h-6 w-6 text-slate-400" />
                        </div>
                        <div className="text-left space-y-2">
                            <h3 className="text-lg font-bold text-slate-900">Gestão de Reviews</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                Automação de respostas no Google Maps e gestão de reputação.
                            </p>
                        </div>
                    </div>
                </Card>

                {/* Card: Faturação (Disabled) */}
                <Card className="p-8 relative border border-slate-200 shadow-sm cursor-not-allowed bg-white opacity-60 grayscale overflow-hidden">
                    <Badge variant="secondary" className="absolute top-4 right-4 bg-slate-100 text-slate-500 z-10">Futuro</Badge>
                    <div className="flex flex-col items-start gap-6 pt-2">
                        <div className="h-12 w-12 rounded-lg bg-slate-50 flex items-center justify-center">
                            <Receipt className="h-6 w-6 text-slate-400" />
                        </div>
                        <div className="text-left space-y-2">
                            <h3 className="text-lg font-bold text-slate-900">Faturação Automática</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                Emissão e envio automático de faturas certificadas.
                            </p>
                        </div>
                    </div>
                </Card>

            </div>
        </div>
    );
}

