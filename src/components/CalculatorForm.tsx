import { useState } from 'react';
import { Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';

export interface FormData {
  callsPerWeek: number;
  callDuration: number;
  cutDuration: number;
  averageTicket: number;
  missedCallsPercent: number;
}

interface CalculatorFormProps {
  onCalculate: (data: FormData) => void;
}

export function CalculatorForm({ onCalculate }: CalculatorFormProps) {
  const [callsPerWeek, setCallsPerWeek] = useState<string>('');
  const [callDuration, setCallDuration] = useState<string>('2');
  const [cutDuration, setCutDuration] = useState<string>('30');
  const [averageTicket, setAverageTicket] = useState<string>('');
  const [missedCallsPercent, setMissedCallsPercent] = useState<string>('10');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!callsPerWeek || Number(callsPerWeek) <= 0) {
      newErrors.callsPerWeek = 'Introduz um número válido';
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

    onCalculate({
      callsPerWeek: Number(callsPerWeek),
      callDuration: Number(callDuration),
      cutDuration: Number(cutDuration),
      averageTicket: Number(averageTicket),
      missedCallsPercent: Number(missedCallsPercent),
    });
  };

  return (
    <Card className="card-shadow-lg border-0">
      <CardContent className="p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Calls per week */}
            <div className="space-y-2">
              <Label htmlFor="callsPerWeek" className="text-sm font-medium">
                Quantas chamadas recebe por semana?
              </Label>
              <Input
                id="callsPerWeek"
                type="number"
                placeholder="Ex: 15"
                value={callsPerWeek}
                onChange={(e) => setCallsPerWeek(e.target.value)}
                className={errors.callsPerWeek ? 'border-loss' : ''}
              />
              {errors.callsPerWeek && (
                <p className="text-xs text-loss">{errors.callsPerWeek}</p>
              )}
            </div>

            {/* Call duration */}
            <div className="space-y-2">
              <Label htmlFor="callDuration" className="text-sm font-medium">
                Quanto tempo dura cada chamada? (minutos)
              </Label>
              <Select value={callDuration} onValueChange={setCallDuration}>
                <SelectTrigger id="callDuration">
                  <SelectValue placeholder="Selecionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 minuto</SelectItem>
                  <SelectItem value="2">2 minutos</SelectItem>
                  <SelectItem value="3">3 minutos</SelectItem>
                  <SelectItem value="4">4 minutos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Cut duration */}
            <div className="space-y-2">
              <Label htmlFor="cutDuration" className="text-sm font-medium">
                Quanto tempo demora um corte completo? (minutos)
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

            {/* Average ticket */}
            <div className="space-y-2">
              <Label htmlFor="averageTicket" className="text-sm font-medium">
                Quanto cada cliente paga em média? (€)
              </Label>
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

            {/* Missed calls percentage */}
            <div className="space-y-2 md:col-span-2">
              <Label
                htmlFor="missedCallsPercent"
                className="text-sm font-medium"
              >
                Quantas chamadas ficam por atender quando estão ocupados? (%)
              </Label>
              <Select
                value={missedCallsPercent}
                onValueChange={setMissedCallsPercent}
              >
                <SelectTrigger id="missedCallsPercent">
                  <SelectValue placeholder="Selecionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0%</SelectItem>
                  <SelectItem value="10">10%</SelectItem>
                  <SelectItem value="20">20%</SelectItem>
                  <SelectItem value="30">30%</SelectItem>
                  <SelectItem value="50">50%</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" variant="cta" size="xl" className="w-full">
            <Calculator className="h-5 w-5" />
            CALCULAR ROI
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
