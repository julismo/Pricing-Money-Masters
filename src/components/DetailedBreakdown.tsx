import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CalculationResults } from './ResultsCards';

interface DetailedBreakdownProps {
  results: CalculationResults;
}

export function DetailedBreakdown({ results }: DetailedBreakdownProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatCurrency = (value: number, decimals = 2) => {
    return value.toLocaleString('pt-PT', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }) + '€';
  };

  const formatNumber = (value: number, decimals = 0) => {
    return value.toLocaleString('pt-PT', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  const rows = [
    { label: 'Chamadas/mês', value: formatNumber(results.callsPerMonth) },
    { label: 'Chamadas Perdidas/mês', value: `~${formatNumber(results.missedCalls, 0)}` },
    { label: 'Tempo em Chamadas', value: `${formatNumber(results.minutesInCalls)} min` },
    { label: 'Tempo Perdido Total', value: `${formatNumber(results.realTimeLost)} min (${formatNumber(results.hoursLost, 1)}h)` },
    { label: 'Cortes Perdidos', value: formatNumber(results.cutsLost, 1) },
    { label: 'Perda por Tempo', value: `${formatCurrency(results.revenueLostTime)}/mês` },
    { label: 'Perda por Chamadas', value: `${formatCurrency(results.revenueLostCalls)}/mês` },
    { label: 'Perda Mensal (média)', value: formatCurrency(results.totalBenefitMonthly) },
    { label: 'Perda Anual', value: formatCurrency(results.totalBenefitYearly) },
    { type: 'separator' },
    { label: 'Custo de Voz', value: `${formatCurrency(results.variableCost)}/mês` },
    { label: 'Infraestrutura', value: '22,00€/mês' },
    { label: 'Custo Mensal', value: formatCurrency(results.totalCostMonthly) },
    { label: 'Custo Anual', value: formatCurrency(results.totalCostYearly) },
    { type: 'separator' },
    { label: 'LUCRO LÍQUIDO ANUAL', value: formatCurrency(results.netProfitYearly), highlight: true },
    { type: 'separator' },
    { label: 'Valor da TUA Hora', value: formatCurrency(results.impliedHourlyRate, 0) + '/h', highlight: false },
    { label: 'Margem de Segurança', value: formatNumber(results.aiSafetyMargin, 0) + '%', highlight: false },
  ];

  return (
    <div className="animate-fade-in-up">
      <Button
        variant="ghost"
        onClick={() => setIsExpanded(!isExpanded)}
        className="mx-auto flex items-center gap-2 text-muted-foreground hover:text-foreground"
      >
        Ver cálculos detalhados
        {isExpanded ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </Button>

      {isExpanded && (
        <Card className="card-shadow mt-4 animate-scale-in border-0">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Métrica</TableHead>
                  <TableHead className="text-right font-semibold">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row, index) => {
                  if (row.type === 'separator') {
                    return (
                      <TableRow key={`sep-${index}`}>
                        <TableCell colSpan={2} className="h-2 bg-muted/50" />
                      </TableRow>
                    );
                  }
                  return (
                    <TableRow
                      key={row.label}
                      className={row.highlight ? 'bg-success/10' : ''}
                    >
                      <TableCell
                        className={row.highlight ? 'font-bold text-success' : ''}
                      >
                        {row.label}
                      </TableCell>
                      <TableCell
                        className={`text-right ${row.highlight ? 'font-bold text-success' : ''}`}
                      >
                        {row.value}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
