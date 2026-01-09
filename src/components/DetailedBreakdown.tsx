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
    { label: 'Minutos totais em chamadas', value: `${formatNumber(results.minutesInCalls)} min` },
    { label: 'Tempo perdido (com interrupções)', value: `${formatNumber(results.realTimeLost)} min (${formatNumber(results.hoursLost, 1)} horas)` },
    { label: 'Cortes equivalentes perdidos', value: formatNumber(results.cutsLost, 1) },
    { label: 'Receita perdida (tempo)', value: `${formatCurrency(results.revenueLostTime)}/mês` },
    { label: 'Receita perdida (chamadas não atendidas)', value: `${formatCurrency(results.revenueLostCalls)}/mês` },
    { label: 'Total perdido/mês', value: formatCurrency(results.totalBenefitMonthly) },
    { label: 'Total perdido/ano', value: formatCurrency(results.totalBenefitYearly) },
    { type: 'separator' },
    { label: 'Custo consumo (minutos × 0.12€)', value: `${formatCurrency(results.variableCost)}/mês` },
    { label: 'Custo infraestrutura fixa', value: '22,00€/mês' },
    { label: 'Custo total sistema/mês', value: formatCurrency(results.totalCostMonthly) },
    { label: 'Custo total sistema/ano', value: formatCurrency(results.totalCostYearly) },
    { type: 'separator' },
    { label: 'LUCRO LÍQUIDO ANUAL', value: formatCurrency(results.netProfitYearly), highlight: true },
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
