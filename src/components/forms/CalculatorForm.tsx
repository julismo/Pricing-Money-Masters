import { useState, useEffect } from 'react';
import { Calculator, HelpCircle, TrendingUp, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { UnifiedFormData } from '@/types';
import { getNicheConfig, getAllInputsForNiche, getDefaultsForNiche, NicheInput } from '@/utils/nicheConfigs';

// Re-export FormData from here for backwards compatibility
export type { UnifiedFormData as FormData } from '@/types';

interface CalculatorFormProps {
  niche: string;
  objective: 'time' | 'money';
  onCalculate: (data: UnifiedFormData) => void;
}

export function CalculatorForm({ niche, objective, onCalculate }: CalculatorFormProps) {
  const nicheConfig = getNicheConfig(niche);

  // Get inputs filtered by objective
  const visibleInputs = getAllInputsForNiche(niche, objective);

  // Dynamic state for dynamic inputs
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  // Common state
  const [workingDays, setWorkingDays] = useState<"5dias" | "6dias" | "7dias">('6dias');
  const [startMonth, setStartMonth] = useState<string>("0");
  const [useSeasonality, setUseSeasonality] = useState<boolean>(false);
  const [volumePeriod, setVolumePeriod] = useState<'day' | 'week'>('day'); // NOVO: Toggle dia/semana
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize defaults based on current niche config
  useEffect(() => {
    const defaults = getDefaultsForNiche(niche);
    const stringDefaults: Record<string, string> = {};
    Object.entries(defaults).forEach(([key, value]) => {
      stringDefaults[key] = value.toString();
    });
    setFormValues(stringDefaults);
  }, [niche]);

  const handleInputChange = (id: string, value: string) => {
    setFormValues(prev => ({
      ...prev,
      [id]: value
    }));
    // Clear error for this field
    if (errors[id]) {
      const newErrors = { ...errors };
      delete newErrors[id];
      setErrors(newErrors);
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    visibleInputs.forEach(input => {
      const val = Number(formValues[input.id]);
      if (!formValues[input.id] || isNaN(val) || val < 0) {
        newErrors[input.id] = 'Introduz um número válido';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    // Convert formValues to typed numbers/inputs expected by roiCalculations
    const daysMap = { "5dias": 5, "6dias": 6, "7dias": 7 };
    const daysNum = daysMap[workingDays];

    // Get the volume input (callsPerDay, leadsPerDay, etc.)
    const volumeInputId = nicheConfig.commonInputs.volumeInput.id;
    let volumePerDay = Number(formValues[volumeInputId] || 0);

    // Convert weekly to daily if user selected "por Semana"
    if (volumePeriod === 'week') {
      volumePerDay = volumePerDay / daysNum;
    }

    const callsPerWeek = volumePerDay * daysNum;

    // Get ticket value
    const ticketInputId = nicheConfig.commonInputs.ticketInput.id;
    const avgTicket = Number(formValues[ticketInputId] || 0);

    // Get missed rate
    const missedInputId = nicheConfig.commonInputs.missedRateInput.id;
    const missedPercent = Number(formValues[missedInputId] || 0);

    // Get call/task duration (for time savings calculation)
    const callDuration = Number(formValues['callDuration'] || formValues['confirmationCallDuration'] || formValues['reservationCallDuration'] || formValues['timePerLeadMinutes'] || 2);

    // Get cut/service duration
    const cutDuration = Number(formValues['cutDuration'] || 30);

    const payload = {
      callsPerWeek: callsPerWeek,
      callDuration: callDuration,
      cutDuration: cutDuration,
      averageTicket: avgTicket,
      missedCallsPercent: missedPercent,
      workingDays: workingDays,
      useSeasonality: useSeasonality,
      startMonth: startMonth,
      calculationMode: objective === 'money' ? 'oportunidade' : 'tempo',
      niche: niche,

      // Pass raw dynamic values
      ...Object.fromEntries(
        Object.entries(formValues).map(([k, v]) => [k, Number(v)])
      )
    } as UnifiedFormData;

    // OVERRIDE: Update the specific volume input (e.g., callsPerDay) with the normalized daily value
    // This fixes the bug where "50 calls/week" was being treated as "50 calls/day"
    if (volumeInputId) {
      (payload as any)[volumeInputId] = volumePerDay;
    }

    onCalculate(payload);
  };

  const renderInput = (input: NicheInput) => {
    const value = formValues[input.id] || '';
    const hasError = !!errors[input.id];

    // Dynamic label for volume inputs
    const displayLabel = input.volumePeriod
      ? `${input.label} por ${volumePeriod === 'day' ? 'Dia' : 'Semana'}`
      : input.label;

    return (
      <div key={input.id} className="space-y-2 group">
        <div className="flex items-center gap-2">
          <Label htmlFor={input.id} className="text-sm font-semibold text-slate-700 group-hover:text-primary transition-colors">
            {displayLabel}
          </Label>
          {input.description && (
            <TooltipProvider>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-slate-400 cursor-help hover:text-primary transition-colors" />
                </TooltipTrigger>
                <TooltipContent className="bg-slate-900 text-white p-3 max-w-xs text-sm shadow-xl">
                  <p>{input.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {/* Toggle dia/semana para inputs de volume */}
          {input.volumePeriod && (
            <div className="ml-auto flex items-center gap-1 bg-slate-100 rounded-lg p-1 border border-slate-200">
              <button
                type="button"
                onClick={() => setVolumePeriod('day')}
                className={`px-3 py-1 text-xs rounded-md transition-all font-medium ${volumePeriod === 'day'
                  ? 'bg-white text-primary shadow-sm ring-1 ring-slate-200'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
              >
                Dia
              </button>
              <button
                type="button"
                onClick={() => setVolumePeriod('week')}
                className={`px-3 py-1 text-xs rounded-md transition-all font-medium ${volumePeriod === 'week'
                  ? 'bg-white text-primary shadow-sm ring-1 ring-slate-200'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
              >
                Semana
              </button>
            </div>
          )}
        </div>

        {input.type === 'percent' ? (
          <Select
            value={value || input.defaultValue.toString()}
            onValueChange={(val: string) => handleInputChange(input.id, val)}
          >
            <SelectTrigger id={input.id} className="input-refined">
              <SelectValue placeholder="Selecionar" />
            </SelectTrigger>
            <SelectContent>
              {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]
                .filter(p => input.max === undefined || p <= input.max)
                .map(p => (
                  <SelectItem key={p} value={p.toString()}>{p}%</SelectItem>
                ))}
            </SelectContent>
          </Select>
        ) : (
          <div className="relative">
            <Input
              id={input.id}
              type="number"
              step={input.step || 1}
              min={input.min}
              max={input.max}
              placeholder={`Ex: ${input.defaultValue}`}
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(input.id, e.target.value)}
              className={`${hasError ? 'border-loss ring-loss/20' : ''} input-refined pr-8`}
            />
            {input.unit && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium pointer-events-none">
                {input.unit}
              </span>
            )}
            {input.type === 'currency' && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium pointer-events-none">
                €
              </span>
            )}
          </div>
        )}

        {hasError && (
          <p className="text-xs text-loss animate-fade-in">{errors[input.id]}</p>
        )}
      </div>
    );
  };

  return (
    <Card className="card-shadow-lg border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Header with context */}
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="h-10 w-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-lg shadow-sm">
                🏷️
              </span>
              <div>
                <p className="text-sm font-medium text-slate-500">Configuração</p>
                <p className="font-bold text-slate-900 text-lg">{nicheConfig.label}</p>
              </div>
            </div>
            <div className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 ${objective === 'time' ? 'bg-blue-50 text-blue-700' : 'bg-emerald-50 text-emerald-700'
              }`}>
              {objective === 'time' ? <Clock className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
              {objective === 'time' ? 'Poupar Tempo' : 'Gerar Dinheiro'}
            </div>
          </div>

          <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">

            {/* Common: Working Days */}
            <div className="space-y-2 group">
              <div className="flex items-center gap-2">
                <Label htmlFor="workingDays" className="text-sm font-semibold text-slate-700 group-hover:text-primary transition-colors">
                  Dias Abertos (por semana)
                </Label>
              </div>
              <Select value={workingDays} onValueChange={(v) => setWorkingDays(v as any)}>
                <SelectTrigger id="workingDays" className="input-refined">
                  <SelectValue placeholder="Selecionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5dias">5 Dias (Seg-Sex)</SelectItem>
                  <SelectItem value="6dias">6 Dias (Seg-Sáb)</SelectItem>
                  <SelectItem value="7dias">7 Dias (Todos os dias)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Common: Start Month */}
            <div className="space-y-2 group">
              <div className="flex items-center gap-2">
                <Label htmlFor="startMonth" className="text-sm font-semibold text-slate-700 group-hover:text-primary transition-colors">
                  Mês de Início
                </Label>
              </div>
              <Select value={startMonth} onValueChange={setStartMonth}>
                <SelectTrigger id="startMonth" className="input-refined">
                  <SelectValue placeholder="Selecionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Janeiro</SelectItem>
                  <SelectItem value="1">Fevereiro</SelectItem>
                  <SelectItem value="2">Março</SelectItem>
                  <SelectItem value="3">Abril</SelectItem>
                  <SelectItem value="4">Maio</SelectItem>
                  <SelectItem value="5">Junho</SelectItem>
                  <SelectItem value="6">Julho</SelectItem>
                  <SelectItem value="7">Agosto</SelectItem>
                  <SelectItem value="8">Setembro</SelectItem>
                  <SelectItem value="9">Outubro</SelectItem>
                  <SelectItem value="10">Novembro</SelectItem>
                  <SelectItem value="11">Dezembro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Row 1 is Working Days & Start Month (Above) */}

            {/* Row 2: Volume & Missed Rate (Explicit Alignment) */}
            {renderInput(nicheConfig.commonInputs.volumeInput)}
            {renderInput(nicheConfig.commonInputs.missedRateInput)}

            {/* Row 3: Ticket & No-Show (Explicit Alignment) */}
            {renderInput(nicheConfig.commonInputs.ticketInput)}
            {visibleInputs.find(i => i.id === 'noShowRate') && renderInput(visibleInputs.find(i => i.id === 'noShowRate')!)}

            {/* Remaining Dynamic Inputs (Durations, Costs, etc) */}
            {visibleInputs
              .filter(i =>
                i.id !== nicheConfig.commonInputs.volumeInput.id &&
                i.id !== nicheConfig.commonInputs.missedRateInput.id &&
                i.id !== nicheConfig.commonInputs.ticketInput.id &&
                i.id !== 'noShowRate'
              )
              .map(renderInput)}

            {/* Seasonality Toggle */}
            <div className="flex items-center space-x-3 border border-slate-200 rounded-xl p-4 sm:col-span-2 bg-slate-50/50 hover:bg-slate-50 transition-colors">
              <Checkbox
                id="seasonality"
                checked={useSeasonality}
                onCheckedChange={(checked) => setUseSeasonality(checked === true)}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <div className="flex flex-col">
                <Label htmlFor="seasonality" className="cursor-pointer font-semibold text-slate-900">
                  Considerar Sazonalidade
                </Label>
                <span className="text-xs text-slate-500">Ajusta automaticamente picos de Natal, Verão e Black Friday</span>
              </div>
            </div>

          </div>

          <Button type="submit" className="w-full btn-cta-refined group">
            <Calculator className="h-5 w-5 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-lg">CALCULAR RESULTADOS</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
