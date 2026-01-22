
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingAnalysisProps {
    duration: number;
}

const STEPS = [
    { text: "A analisar dados...", subtext: "Recolhendo histórico" },
    { text: "A simular cenários...", subtext: "Ajustando variáveis de mercado" },
    { text: "A aplicar Sazonalidade...", subtext: "Verificando picos de procura" },
    { text: "A calibrar ROI...", subtext: "Otimizando projeções financeiras" },
    { text: "Quase pronto...", subtext: "Gerando relatório final" }
];

export function LoadingAnalysis({ duration }: LoadingAnalysisProps) {
    const [progress, setProgress] = useState(0);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    useEffect(() => {
        const startTime = Date.now();
        const interval = 30;

        const timer = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const newProgress = Math.min((elapsed / duration) * 100, 100);

            setProgress(newProgress);

            const stepIndex = Math.min(
                Math.floor((newProgress / 100) * STEPS.length),
                STEPS.length - 1
            );
            setCurrentStepIndex(stepIndex);

            if (elapsed >= duration) {
                clearInterval(timer);
            }
        }, interval);

        return () => clearInterval(timer);
    }, [duration]);

    const bounceTransition = {
        y: {
            duration: 0.6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeOut"
        }
    };

    return (
        <div className="w-full h-[600px] flex flex-col items-center justify-center bg-slate-50 rounded-2xl p-8 relative overflow-hidden">

            {/* Background Decor (Subtle) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8)_0%,rgba(240,240,240,0.5)_100%)]" />
            </div>

            <div className="relative z-10 flex flex-col items-center">

                {/* Bouncing Liquid Ball */}
                <motion.div
                    className="relative w-32 h-32 rounded-full border-4 border-slate-200 overflow-hidden bg-white shadow-xl"
                    initial={{ y: 0 }}
                    animate={{ y: [-20, 0] }} // Bouncing effect
                    transition={bounceTransition as any}
                >
                    {/* Inner Liquid */}
                    <div
                        className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-blue-600 to-indigo-500 transition-all duration-300 ease-out"
                        style={{ height: `${progress}%` }}
                    >
                        {/* Wave Effect on top of liquid */}
                        <div className="absolute top-[-10px] left-[-50%] w-[200%] h-4 bg-indigo-400 opacity-50 rounded-[100%] animate-wave" />
                        <div className="absolute top-[-8px] left-[-30%] w-[200%] h-4 bg-blue-400 opacity-30 rounded-[100%] animate-wave-slow" />
                    </div>

                    {/* Percentage Text Inside Ball (Optional, maybe creates clutter, usually clean is better. Let's keep it simple or put icon) */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-xl font-bold transition-colors duration-300 ${progress > 50 ? 'text-white' : 'text-slate-700'}`}>
                            {Math.round(progress)}%
                        </span>
                    </div>
                </motion.div>

                {/* Shadow for bounce realism */}
                <motion.div
                    className="w-24 h-4 bg-slate-200/50 rounded-[100%] blur-sm mt-4"
                    animate={{ scale: [0.8, 1.2], opacity: [0.3, 0.6] }}
                    transition={bounceTransition as any}
                />

                {/* Text Area */}
                <div className="mt-12 text-center space-y-3 h-20">
                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                        {STEPS[currentStepIndex].text}
                    </h3>
                    <p className="text-slate-500 font-medium animate-pulse">
                        {STEPS[currentStepIndex].subtext}
                    </p>
                </div>
            </div>
        </div>
    );
}
