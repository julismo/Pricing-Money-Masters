import { useState } from 'react';
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
import { UnifiedFormData } from '@/utils/roiCalculations';

interface CalculatorFormProps {
  onCalculate: (data: UnifiedFormData) => void;
}

export function CalculatorForm({ onCalculate }: CalculatorFormProps) {
  const [callsAmount, setCallsAmount] = useState<string>('');
  const [callsPeriod, setCallsPeriod] = useState<string>('week');
  const [callDuration, setCallDuration] = useState<string>('2');
  const [cutDuration, setCutDuration] = useState<string>('30');
  const [averageTicket, setAverageTicket] = useState<string>('');
  const [missedCallsPercent, setMissedCallsPercent] = useState<string>('20');
  const [workingDays, setWorkingDays] = useState<"5dias" | "6dias" | "7dias">('6dias');
  const [startMonth, setStartMonth] = useState<string>("0");
  const [useSeasonality, setUseSeasonality] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!callsAmount || Number(callsAmount) <= 0) {
      newErrors.callsAmount = 'Introduz um número válido';
    }
    if (!cutDuration || Number(cutDuration) <= 0) {
      newErrors.cutDuration = 'Introduz um número válido';
    }
    if (!averageTicket || Number(averageTicket) <= 0) {
      newErrors.averageTicket = 'Introduz um número válido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    // Convert to weekly if user selected daily
    // Note: workingDays is now a string like "5dias". We need to map it to a number for this specific calculation if callsPeriod is 'day'
    const daysMap = { "5dias": 5, "6dias": 6, "7dias": 7 };
    const daysNum = daysMap[workingDays];

    const callsPerWeek = callsPeriod === 'day'
      ? Number(callsAmount) * daysNum
      : Number(callsAmount);

    onCalculate({
      callsPerWeek,
      callDuration: Number(callDuration),
      cutDuration: Number(cutDuration),
      averageTicket: Number(averageTicket),
      missedCallsPercent: Number(missedCallsPercent),
      workingDays: workingDays,
      useSeasonality: useSeasonality,
      startMonth: startMonth,
      calculationMode: 'tempo', // Default mode, results page handles switching
    });
  };

  return (
    <Card className="card-shadow-lg border-0">
      <CardContent className="p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">

            {/* Working Days */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="workingDays" className="text-sm font-medium">
                  Dias Abertos (por semana)
                </Label>
                <TooltipProvider>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-slate-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-slate-900 text-white p-3 max-w-xs text-sm">
                      <p>Conta os dias em que a barbearia está fisicamente aberta. A IA trabalhará 24/7 nos outros dias.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
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

            {/* Start Month */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="startMonth" className="text-sm font-medium">
                  Mês de Início
                </Label>
                <TooltipProvider>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-slate-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-slate-900 text-white p-3 max-w-xs text-sm">
                      <p>Define quando começa a operação para ajustar a curva de sazonalidade.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
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

            {/* Calls amount with period selector */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="callsAmount" className="text-sm font-medium">
                  Chamadas Recebidas
                </Label>
                <TooltipProvider>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-slate-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-slate-900 text-white p-3 max-w-xs text-sm">
                      <p>Total de chamadas que o telemóvel recebe (atendidas + perdidas).</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex gap-2">
                <Input
                  id="callsAmount"
                  type="number"
                  placeholder="Ex: 15"
                  value={callsAmount}
                  onChange={(e) => setCallsAmount(e.target.value)}
                  className={`flex-1 ${errors.callsAmount ? 'border-loss' : ''}`}
                />
                <Select value={callsPeriod} onValueChange={setCallsPeriod}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">por dia</SelectItem>
                    <SelectItem value="week">por semana</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {errors.callsAmount && (
                <p className="text-xs text-loss">{errors.callsAmount}</p>
              )}
            </div>

            {/* Average ticket */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="averageTicket" className="text-sm font-medium">
                  Valor Médio do Corte (€)
                </Label>
                <TooltipProvider>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-slate-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-slate-900 text-white p-3 max-w-xs text-sm">
                      <p>A média que um cliente gasta por visita (corte + barba + produtos).</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="averageTicket"
                type="number"
                placeholder="Ex: 12"
                value={averageTicket}
                onChange={(e) => setAverageTicket(e.target.value)}
                className={errors.averageTicket ? 'border-loss' : ''}
              />
              {errors.averageTicket && (
                <p className="text-xs text-loss">{errors.averageTicket}</p>
              )}
            </div>

            {/* Cut duration */}
            <div className="space-y-2">
              <Label htmlFor="cutDuration" className="text-sm font-medium">
                Tempo de Corte (min)
              </Label>
              <Input
                id="cutDuration"
                type="number"
                placeholder="Ex: 30"
                value={cutDuration}
                onChange={(e) => setCutDuration(e.target.value)}
                className={errors.cutDuration ? 'border-loss' : ''}
              />
              {errors.cutDuration && (
                <p className="text-xs text-loss">{errors.cutDuration}</p>
              )}
            </div>

            {/* Call duration */}
            <div className="space-y-2">
              <Label htmlFor="callDuration" className="text-sm font-medium">
                Duração da Chamada (min)
              </Label>
              <Select value={callDuration} onValueChange={setCallDuration}>
                <SelectTrigger id="callDuration">
                  <SelectValue placeholder="Selecionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 minuto</SelectItem>
                  <SelectItem value="2">2 minutos</SelectItem>
                  <SelectItem value="3">3 minutos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Missed calls percentage */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label
                  htmlFor="missedCallsPercent"
                  className="text-sm font-medium"
                >
                  Chamadas Perdidas (%)
                </Label>
                <TooltipProvider>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-slate-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-slate-900 text-white p-3 max-w-xs text-sm">
                      <p>Inclui chamadas fora de horário, em dias de folga ou quando estás ocupado a cortar.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Select
                value={missedCallsPercent}
                onValueChange={setMissedCallsPercent}
              >
                <SelectTrigger id="missedCallsPercent">
                  <SelectValue placeholder="Selecionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0% (Nenhuma)</SelectItem>
                  <SelectItem value="10">10% (Baixo)</SelectItem>
                  <SelectItem value="20">20% (Média)</SelectItem>
                  <SelectItem value="30">30% (Alto)</SelectItem>
                  <SelectItem value="40">40% (Crítico)</SelectItem>
                </SelectContent>
              </Select>
            </div>

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
            VER O MEU GANHO
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
