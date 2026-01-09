import { useState } from 'react';
import { Header } from '@/components/Header';
import { CalculatorForm, FormData } from '@/components/CalculatorForm';
import { ResultsCards, CalculationResults } from '@/components/ResultsCards';
import { ComparisonChart } from '@/components/ComparisonChart';
import { DetailedBreakdown } from '@/components/DetailedBreakdown';
import { CTASection } from '@/components/CTASection';

// Fixed variables
const WEEKS_PER_MONTH = 4.3;
const CONTEXT_SWITCH_MINUTES = 1;
const MISSED_CALL_CONVERSION_RATE = 0.20;
const COST_PER_MINUTE = 0.12;
const FIXED_MONTHLY_COST = 22;

function calculateROI(data: FormData): CalculationResults {
  // Calls per month
  const callsPerMonth = Math.round(data.callsPerWeek * WEEKS_PER_MONTH);

  // Minutes in calls
  const minutesInCalls = callsPerMonth * data.callDuration;

  // Real time lost (with context switching)
  const realTimeLost = callsPerMonth * (data.callDuration + CONTEXT_SWITCH_MINUTES);

  // Hours lost
  const hoursLost = realTimeLost / 60;

  // Cuts lost due to time
  const cutsLost = realTimeLost / data.cutDuration;

  // Revenue lost due to time
  const revenueLostTime = cutsLost * data.averageTicket;

  // Missed calls calculations
  const missedCalls = callsPerMonth * (data.missedCallsPercent / 100);
  const clientsLost = missedCalls * MISSED_CALL_CONVERSION_RATE;
  const revenueLostCalls = clientsLost * data.averageTicket;

  // Total benefits
  const totalBenefitMonthly = revenueLostTime + revenueLostCalls;
  const totalBenefitYearly = totalBenefitMonthly * 12;

  // Costs
  const variableCost = minutesInCalls * COST_PER_MINUTE;
  const totalCostMonthly = FIXED_MONTHLY_COST + variableCost;
  const totalCostYearly = totalCostMonthly * 12;

  // Net profit and ROI
  const netProfitYearly = totalBenefitYearly - totalCostYearly;
  const roiPercent = ((totalBenefitYearly - totalCostYearly) / totalCostYearly) * 100;

  // Payback period
  const paybackMonths = Math.ceil(totalCostYearly / totalBenefitMonthly);

  return {
    callsPerMonth,
    minutesInCalls,
    realTimeLost,
    hoursLost,
    cutsLost,
    revenueLostTime,
    missedCalls,
    clientsLost,
    revenueLostCalls,
    totalBenefitMonthly,
    totalBenefitYearly,
    variableCost,
    totalCostMonthly,
    totalCostYearly,
    netProfitYearly,
    roiPercent,
    paybackMonths,
  };
}

const Index = () => {
  const [results, setResults] = useState<CalculationResults | null>(null);

  const handleCalculate = (data: FormData) => {
    const calculatedResults = calculateROI(data);
    setResults(calculatedResults);

    // Scroll to results
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-12">
        <div className="mx-auto max-w-4xl space-y-12">
          {/* Calculator Form */}
          <section>
            <CalculatorForm onCalculate={handleCalculate} />
          </section>

          {/* Results Section */}
          {results && (
            <section id="results" className="space-y-8">
              <ResultsCards results={results} />
              <ComparisonChart results={results} />
              <div className="flex justify-center">
                <DetailedBreakdown results={results} />
              </div>
              <CTASection />
            </section>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>Calculadora de ROI para Sistema Automático de Barbearias</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
