import { useState } from 'react';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

export function FeedbackButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [email, setEmail] = useState('');
    const [screenshot, setScreenshot] = useState<File | null>(null);
    const { toast } = useToast();

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                toast({
                    title: 'Ficheiro muito grande',
                    description: 'Por favor, escolha uma imagem até 5MB.',
                    variant: 'destructive',
                });
                return;
            }
            setScreenshot(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!feedback.trim()) {
            toast({
                title: 'Feedback vazio',
                description: 'Por favor, escreva o seu feedback antes de enviar.',
                variant: 'destructive',
            });
            return;
        }

        setIsSubmitting(true);

        try {
            // Convert screenshot to base64 if exists
            let screenshotData = null;
            if (screenshot) {
                const reader = new FileReader();
                const base64 = await new Promise<string>((resolve) => {
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.readAsDataURL(screenshot);
                });
                screenshotData = {
                    filename: screenshot.name,
                    content: base64.split(',')[1], // Remove data:image/png;base64, prefix
                };
            }

            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    feedback,
                    email,
                    url: window.location.href,
                    userAgent: navigator.userAgent,
                    timestamp: new Date().toISOString(),
                    screenshot: screenshotData,
                }),
            });

            if (!response.ok) {
                throw new Error('Erro ao enviar feedback');
            }

            toast({
                title: 'Feedback enviado! 🎉',
                description: 'Obrigado pela sua contribuição. Vamos analisar em breve!',
            });

            // Reset form
            setFeedback('');
            setEmail('');
            setScreenshot(null);
            setIsOpen(false);
        } catch (error) {
            toast({
                title: 'Erro ao enviar',
                description: 'Tente novamente ou contacte-nos diretamente.',
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* Floating Feedback Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-medium text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                aria-label="Enviar Feedback"
            >
                <MessageSquare className="h-5 w-5" />
                <span className="hidden sm:inline">Feedback</span>
            </button>

            {/* Feedback Dialog */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Enviar Feedback</DialogTitle>
                        <DialogDescription>
                            Ajude-nos a melhorar! Partilhe a sua experiência, sugestões ou reporte problemas.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email (Optional) */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email (opcional)</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="seu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <p className="text-xs text-muted-foreground">
                                Deixe o seu email se quiser receber uma resposta.
                            </p>
                        </div>

                        {/* Feedback Text */}
                        <div className="space-y-2">
                            <Label htmlFor="feedback">Feedback *</Label>
                            <Textarea
                                id="feedback"
                                placeholder="Descreva a sua experiência, sugestão ou problema..."
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                rows={5}
                                required
                            />
                        </div>

                        {/* Image Upload */}
                        <div className="space-y-2">
                            <Label htmlFor="file-upload">Anexar Imagem (opcional)</Label>
                            <p className="text-xs text-muted-foreground mb-2">
                                Pode anexar prints, imagens ou ficheiros até 5MB
                            </p>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => document.getElementById('file-upload')?.click()}
                                className="w-full"
                            >
                                📎 Escolher Ficheiro
                            </Button>
                            <input
                                id="file-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                                className="hidden"
                            />
                            {screenshot && (
                                <div className="flex items-center gap-2 rounded-md bg-muted p-2 text-sm">
                                    <span className="flex-1 truncate">{screenshot.name}</span>
                                    <button
                                        type="button"
                                        onClick={() => setScreenshot(null)}
                                        className="text-muted-foreground hover:text-foreground"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="flex gap-2 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsOpen(false)}
                                className="flex-1"
                                disabled={isSubmitting}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                className="flex-1"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Enviando...
                                    </>
                                ) : (
                                    <>
                                        <Send className="mr-2 h-4 w-4" />
                                        Enviar
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
