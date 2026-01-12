import { PhoneCall, MessageSquare, Zap, ChevronLeft, Star, Receipt } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
                {/* Card: Atendente de Voz (Active) */}
                <Card
                    className="p-8 relative border-2 border-primary shadow-xl cursor-pointer bg-white transition-all hover:scale-[1.02] ring-4 ring-blue-50/50 group"
                    onClick={() => onNext('voice')}
                >
                    <div className="flex flex-col items-start gap-6">
                        <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center">
                            <PhoneCall className="h-6 w-6 text-primary" />
                        </div>
                        <div className="text-left space-y-2">
                            <h3 className="text-lg font-bold text-slate-900">Atendente de Voz</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                Atende chamadas, agenda serviços e tira dúvidas 24/7 com voz humana.
                            </p>
                        </div>
                    </div>
                </Card>

                {/* Card: Chatbot IA (Disabled) */}
                <Card className="p-8 relative opacity-60 border border-slate-200 shadow-sm cursor-not-allowed bg-white grayscale overflow-hidden">
                    <Badge variant="secondary" className="absolute top-4 right-4 bg-slate-100 text-slate-500 z-10">Em breve</Badge>
                    <div className="flex flex-col items-start gap-6 pt-2">
                        <div className="h-12 w-12 rounded-lg bg-slate-50 flex items-center justify-center">
                            <MessageSquare className="h-6 w-6 text-slate-400" />
                        </div>
                        <div className="text-left space-y-2">
                            <h3 className="text-lg font-bold text-slate-900">Chatbot IA</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                Responde automaticamente no WhatsApp e Instagram Direct.
                            </p>
                        </div>
                    </div>
                </Card>

                {/* Card: Combo (Disabled) */}
                <Card className="p-8 relative opacity-60 border border-slate-200 shadow-sm cursor-not-allowed bg-white grayscale overflow-hidden">
                    <Badge variant="secondary" className="absolute top-4 right-4 bg-slate-100 text-slate-500 z-10">Em breve</Badge>
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
                <Card className="p-8 relative opacity-60 border border-slate-200 shadow-sm cursor-not-allowed bg-white grayscale overflow-hidden">
                    <Badge variant="secondary" className="absolute top-4 right-4 bg-slate-100 text-slate-500 z-10">Em breve</Badge>
                    <div className="flex flex-col items-start gap-6 pt-2">
                        <div className="h-12 w-12 rounded-lg bg-slate-50 flex items-center justify-center">
                            <Star className="h-6 w-6 text-slate-400" />
                        </div>
                        <div className="text-left space-y-2">
                            <h3 className="text-lg font-bold text-slate-900">Gestão de Reviews</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                Autuomação de respostas no Google Maps e gestão de reputação.
                            </p>
                        </div>
                    </div>
                </Card>

                {/* Card: Faturação (Disabled) */}
                <Card className="p-8 relative opacity-60 border border-slate-200 shadow-sm cursor-not-allowed bg-white grayscale overflow-hidden">
                    <Badge variant="secondary" className="absolute top-4 right-4 bg-slate-100 text-slate-500 z-10">Em breve</Badge>
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
