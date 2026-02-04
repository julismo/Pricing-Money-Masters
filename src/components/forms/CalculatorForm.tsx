import { useState, useEffect } from 'react';
import { Calculator, HelpCircle } from 'lucide-react';
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
import { nicheConfigs, NicheConfig } from '@/utils/nicheConfigs';

interface CalculatorFormProps {
  niche: string;
  objective: 'time' | 'money';
  onCalculate: (data: UnifiedFormData) => void;
}

export function CalculatorForm({ niche, objective, onCalculate }: CalculatorFormProps) {
  const currentConfig: NicheConfig = nicheConfigs[niche] || nicheConfigs['barbearia'];

  // Dynamic state for dynamic inputs
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  // Common state
  const [workingDays, setWorkingDays] = useState<"5dias" | "6dias" | "7dias">('6dias');
  const [startMonth, setStartMonth] = useState<string>("0");
  const [useSeasonality, setUseSeasonality] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize defaults based on current niche config
  useEffect(() => {
    const defaults: Record<string, string> = {};
    currentConfig.inputs.forEach(input => {
      defaults[input.id] = input.defaultValue.toString();
    });
    setFormValues(defaults);
  }, [niche, currentConfig]);

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

    currentConfig.inputs.forEach(input => {
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
    // We map dynamic inputs to the standard UnifiedFormData structure where possible, 
    // or add them as specific fields if needed.
    // For now, we map key fields to the UnifiedFormData expected names as best as possible
    // or pass the raw inputs for the specialized calculator to handle.

    // Mapping common fields:
    const daysMap = { "5dias": 5, "6dias": 6, "7dias": 7 };
    const daysNum = daysMap[workingDays];

    // NOTE: This basic mapping ensures backward compatibility with the existing calculateUnifiedROI
    // but the calculateUnifiedROI function itself will need to be updated to handle specific niche fields.
    // For now we populate with default fallbacks or mapped values.

    const callsPerDay = Number(formValues['callsPerDay'] || formValues['leadsPerDay'] || 0);
    const callsPerWeek = callsPerDay * daysNum;

    // Extract other common values if they exist, otherwise default to 0
    const avgTicket = Number(formValues['avgTicket'] || formValues['ticketPerPerson'] || formValues['avgCarValue'] || 0);
    const missedPercent = Number(formValues['missedCallRate'] || formValues['missedCallsService'] || formValues['afterHoursLeads'] || formValues['noShowRate'] || 0);

    onCalculate({
      callsPerWeek: callsPerWeek,
      callDuration: 2, // Default or add input
      cutDuration: 30, // Default or add input
      averageTicket: avgTicket,
      missedCallsPercent: missedPercent,
      workingDays: workingDays,
      useSeasonality: useSeasonality,
      startMonth: startMonth,
      calculationMode: objective === 'money' ? 'oportunidade' : 'tempo', // Map objective to mode
      niche: niche, // Pass niche context

      // Pass raw dynamic values for advanced calculations
      ...formValues
    } as any);
  };

  return (
    <Card className="card-shadow-lg border-0">
      <CardContent className="p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="grid gap-6 md:grid-cols-2">

            {/* Common: Working Days */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="workingDays" className="text-sm font-medium">
                  Dias Abertos (por semana)
                </Label>
              </div>
              <Select value={workingDays} onValueChange={(v) => setWorkingDays(v as any)}>
                <SelectTrigger id="workingDays">
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
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="startMonth" className="text-sm font-medium">
                  Mês de Início (Sazonalidade)
                </Label>
              </div>
              <Select value={startMonth} onValueChange={setStartMonth}>
                <SelectTrigger id="startMonth">
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

            {/* Dynamic Inputs based on Niche */}
            {currentConfig.inputs.map((input) => (
              <div key={input.id} className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor={input.id} className="text-sm font-medium">
                    {input.label}
                  </Label>
                  {input.description && (
                    <TooltipProvider>
                      <Tooltip delayDuration={300}>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-slate-400 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="bg-slate-900 text-white p-3 max-w-xs text-sm">
                          <p>{input.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>

                {input.type === 'percent' ? (
                  <Select
                    value={formValues[input.id] || input.defaultValue.toString()}
                    onValueChange={(val) => handleInputChange(input.id, val)}
                  >
                    <SelectTrigger id={input.id}>
                      <SelectValue placeholder="Selecionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0%</SelectItem>
                      <SelectItem value="10">10%</SelectItem>
                      <SelectItem value="15">15%</SelectItem>
                      <SelectItem value="20">20%</SelectItem>
                      <SelectItem value="25">25%</SelectItem>
                      <SelectItem value="30">30%</SelectItem>
                      <SelectItem value="40">40%</SelectItem>
                      <SelectItem value="50">50%</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id={input.id}
                    type="number"
                    step={input.step || 1}
                    placeholder={`Ex: ${input.defaultValue}`}
                    value={formValues[input.id] || ''}
                    onChange={(e) => handleInputChange(input.id, e.target.value)}
                    className={errors[input.id] ? 'border-loss' : ''}
                  />
                )}

                {errors[input.id] && (
                  <p className="text-xs text-loss">{errors[input.id]}</p>
                )}
              </div>
            ))}

            {/* Seasonality Toggle */}
            <div className="flex items-center space-x-2 border rounded-lg p-3 sm:col-span-2 bg-slate-50">
              <Checkbox
                id="seasonality"
                checked={useSeasonality}
                onCheckedChange={(checked) => setUseSeasonality(checked as boolean)}
              />
              <Label htmlFor="seasonality" className="cursor-pointer">
                Considerar Sazonalidade (Ajustar picos de Natal/Verão)
              </Label>
            </div>

          </div>

          <Button type="submit" variant="cta" size="xl" className="w-full">
            <Calculator className="h-5 w-5" />
            <span className="font-bold">CALCULAR RESULTADOS</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
