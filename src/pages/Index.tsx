import { useState } from 'react';
import { Stepper } from '@/components/wizard/Stepper';
import { StepValueType } from '@/components/wizard/StepValueType';
import { StepNiche } from '@/components/wizard/StepNiche';
import { StepSolutions } from '@/components/wizard/StepSolutions';
import { StepCalculator } from '@/components/wizard/StepCalculator';
import { StepResults } from '@/components/wizard/StepResults';
import { calculateUnifiedROI } from '@/utils/roiCalculations';
import { UnifiedFormData, CalculationResults } from '@/types';
import { Card } from '@/components/ui/card';
import { LoadingAnalysis } from '@/components/common/LoadingAnalysis';
import { FeedbackButton } from '@/components/feedback/FeedbackButton';

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  // Store both scenarios
  const [roiResults, setRoiResults] = useState<{
    realistic: CalculationResults;
    optimistic: CalculationResults;
  } | null>(null);

  // Store wizard selections
  const [objective, setObjective] = useState<'time' | 'money'>('time');
  const [niche, setNiche] = useState<string>('barbearia');
  const [automationType, setAutomationType] = useState<string>('voice');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisDuration, setAnalysisDuration] = useState(2000);

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 5));
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  const handleValueTypeSelect = (type: 'time' | 'money') => {
    console.log('Selected objective:', type);
    setObjective(type);
    nextStep();
  };

  const handleNicheSelect = (selectedNiche: string) => {
    console.log('Selected niche:', selectedNiche);
    setNiche(selectedNiche);
    nextStep();
  };

  const handleSolutionSelect = (type: string) => {
    console.log('Selected solution:', type);
    setAutomationType(type);
    nextStep();
  };

  const handleCalculate = (data: UnifiedFormData) => {
    // 1. Calculate Duration dynamically
    const baseDuration = 3000;
    const seasonalityPenalty = data.useSeasonality ? 2500 : 0; // Seasonality adds 2.5s
    const volumePenalty = Math.min(data.callsPerWeek * 15, 3000); // Scale with volume, max 3s
    const randomVar = Math.floor(Math.random() * 500); // 0-500ms random

    const totalDuration = baseDuration + seasonalityPenalty + volumePenalty + randomVar;
    setAnalysisDuration(totalDuration);
    setIsAnalyzing(true);

    // 2. Perform Calculations
    const realistic = calculateUnifiedROI({ ...data, calculationMode: 'tempo' });
    const optimistic = calculateUnifiedROI({ ...data, calculationMode: 'oportunidade' });

    // 3. Wait and Show
    setTimeout(() => {
      setRoiResults({ realistic, optimistic });
      setIsAnalyzing(false);
      nextStep();
    }, totalDuration);
  };

  const handleRecalculate = () => {
    setCurrentStep(4);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto w-full space-y-8">

        {/* Formal Header: Logo & Title */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="h-16 w-16">
              <img src="/logo.png" alt="Logo" className="h-full w-full object-contain" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight sm:text-4xl">
            Simulador de Impacto Financeiro
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Analise a eficiência operacional do seu negócio e projete o retorno do investimento em automação.
          </p>
        </div>

        {/* The "Form" Card or Loading Screen */}
        <Card className="bg-white shadow-xl border-slate-200 p-6 sm:p-10 rounded-2xl min-h-[600px] flex flex-col justify-center">
          {isAnalyzing ? (
            <LoadingAnalysis duration={analysisDuration} />
          ) : (
            <>
              <div className="mb-10">
                <Stepper currentStep={currentStep} />
              </div>

              <div className="mt-8">
                {currentStep === 1 && (
                  <StepValueType onNext={handleValueTypeSelect} />
                )}

                {currentStep === 2 && (
                  <StepNiche onNext={handleNicheSelect} onBack={prevStep} />
                )}

                {currentStep === 3 && (
                  <StepSolutions onNext={handleSolutionSelect} onBack={prevStep} />
                )}

                {currentStep === 4 && (
                  <StepCalculator
                    niche={niche}
                    objective={objective}
                    onCalculate={handleCalculate}
                    onBack={prevStep}
                  />
                )}

                {currentStep === 5 && roiResults && (
                  <StepResults
                    realistic={roiResults.realistic}
                    optimistic={roiResults.optimistic}
                    onRecalculate={handleRecalculate}
                  />
                )}
              </div>
            </>
          )}
        </Card>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-sm text-slate-400">
        <p>Feito com ❤️ e ☕ • 2026</p>
      </footer>

      {/* Floating Feedback Button */}
      <FeedbackButton />
    </div>
  );
};

export default Index;
