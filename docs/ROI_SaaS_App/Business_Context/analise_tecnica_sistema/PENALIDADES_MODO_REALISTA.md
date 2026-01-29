# Análise de Penalidades Aplicadas ao Modo Realista

Este documento lista **todas as penalidades e ajustes conservadores** aplicados ao cenário "Realista" (modo `tempo`) em comparação com o modo "Otimista" (modo `oportunidade`).

---

## 📊 Resumo Executivo

O modo **Realista** aplica **5 tipos principais de penalidades** para tornar os cálculos mais conservadores:

1. **Utilization Factor Reduzido** (65% vs 85%)
2. **Safety Margin de 10%** (redução global)
3. **Ramp-up Factors** (primeiros 3 meses com eficiência reduzida)
4. **Stress Penalty** (alta temporada: -10% receita, -5% chamadas)
5. **Capacity Limit** (limitação física de horas/dia)

---

## 🔍 Detalhamento das Penalidades

### 1. **Utilization Factor Reduzido**

**Localização:** `src/utils/roiCalculations.ts:76`

```74:82:src/utils/roiCalculations.ts
// MODO A: TEMPO (Default - Realista)
const TEMPO_ASSUMPTIONS = {
    utilizationFactor: 0.65,        // 65% do tempo recuperado vira cortes
    aiEfficiency: 0.80,             // 80% das perdidas a IA resolve
    conversionRate: 0.85,           // 85% convertem em marcação
    capacityLimit: true,            // Respeita limite de horas/dia
    contextSwitch: 3,               // 3 min de penalização
    safetyMargin: 0.90              // NEW: 10% extra safety margin (conservative)
};
```

**Comparação:**
- **Realista:** `utilizationFactor: 0.65` (65%)
- **Otimista:** `utilizationFactor: 0.85` (85%)

**Impacto:** Reduz a receita em **~23%** (0.65/0.85 = 0.765)

**Aplicação:** Linha 126
```125:128:src/utils/roiCalculations.ts
    const timeWastedMinutes = callsAnswered * (data.callDuration + assumptions.contextSwitch);
    const convertibleMinutes = timeWastedMinutes * assumptions.utilizationFactor;
    const cutsFromTime = convertibleMinutes / data.cutDuration;
    const revenueFromTime = cutsFromTime * data.averageTicket;
```

---

### 2. **Safety Margin de 10%**

**Localização:** `src/utils/roiCalculations.ts:81` e `src/utils/roiCalculations.ts:330`

**Definição:**
- **Realista:** `safetyMargin: 0.90` (redução de 10%)
- **Otimista:** `safetyMargin: 1.00` (sem redução)

**Aplicação:** Linha 330
```329:330:src/utils/roiCalculations.ts
        // NEW: Apply safety margin (10% reduction for Realista, 0% for Otimista)
        revenue *= safetyMargin;
```

**Impacto:** Reduz a receita mensal em **10%** adicional após todos os outros cálculos.

---

### 3. **Ramp-up Factors (Curva de Aprendizado)**

**Localização:** `src/utils/roiCalculations.ts:96-101` e `src/utils/roiCalculations.ts:324-327`

**Definição:**
```94:101:src/utils/roiCalculations.ts
// NEW: Ramp-up factors for first months (simulates implementation learning curve)
// Only applies to TEMPO (Realista) mode
const RAMP_UP_FACTORS = [
    0.55,  // Month 1: 55% efficiency (implementation phase)
    0.85,  // Month 2: 85% efficiency (stabilization)
    0.95,  // Month 3: 95% efficiency (near-optimal)
    1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00  // Month 4+: 100%
];
```

**Aplicação:** Linhas 324-327
```323:327:src/utils/roiCalculations.ts
        // NEW: Apply ramp-up factor for Realista mode (first 3 months reduced efficiency)
        if (isRealistaMode) {
            const rampUpFactor = RAMP_UP_FACTORS[index] || 1.0;
            revenue *= rampUpFactor;
        }
```

**Impacto por Mês:**
- **Mês 1:** Receita reduzida em **45%** (0.55)
- **Mês 2:** Receita reduzida em **15%** (0.85)
- **Mês 3:** Receita reduzida em **5%** (0.95)
- **Mês 4+:** Sem penalidade (1.00)

**Impacto Anual Médio:** Aproximadamente **-5% a -8%** na receita anual total.

---

### 4. **Stress Penalty (Alta Temporada)**

**Localização:** `src/utils/roiCalculations.ts:273-275` e `src/utils/roiCalculations.ts:338-342`

**Aplicação 1 - Cálculo Anual:** Linhas 273-275
```273:279:src/utils/roiCalculations.ts
        if (data.calculationMode === "tempo" && month.factor > 1.15) {
            const stressPenalty = 0.90;
            totalYearlyRevenue += adjustedRevenue * stressPenalty;
        } else {
            totalYearlyRevenue += adjustedRevenue;
        }
```

**Aplicação 2 - Dados Mensais:** Linhas 338-342
```337:342:src/utils/roiCalculations.ts
        // Apply stress penalty logic if applicable (high season stress)
        if (useSeasonality && isRealistaMode && monthFactor > 1.15) {
            revenue *= 0.90;
            // Also explicitly impact calls to show the "stress" visual
            calls = Math.round(calls * 0.95); // 5% drop in managed calls due to chaos
        }
```

**Condição:** Aplicado apenas quando `monthFactor > 1.15` (alta temporada)

**Penalidades:**
- **Receita:** Redução de **10%** (multiplicador 0.90)
- **Chamadas:** Redução de **5%** (multiplicador 0.95)

**Impacto:** Meses de alta temporada têm receita reduzida adicionalmente em 10%, simulando o "caos" operacional durante picos de demanda.

---

### 5. **Capacity Limit (Limitação Física)**

**Localização:** `src/utils/roiCalculations.ts:141-157`

**Definição:**
- **Realista:** `capacityLimit: true` (respeita limite físico)
- **Otimista:** `capacityLimit: false` (assume expansão se necessário)

**Aplicação:** Linhas 141-157
```141:157:src/utils/roiCalculations.ts
    if (assumptions.capacityLimit) {
        // Assume 8h/dia de trabalho
        const maxMinutesPerMonth = (8 * 60) * workingDaysPerWeek * weeksPerMonth;

        // Current productivity + efficiency gain
        const currentMinutes = cutsFromTime * data.cutDuration;

        // Se o ganho de tempo tentar "ultrapassar" limites fisicos? (Lógica simplificada aqui)
        // Na verdade, como é tempo recuperado, ele já "cabe" no dia pois era tempo desperdiçado.
        // Mas mantemos a verificação de sanidade
        if (currentMinutes > maxMinutesPerMonth) {
            const capFactor = maxMinutesPerMonth / currentMinutes;
            if (capFactor < 1) {
                finalRevenue = finalRevenue * capFactor;
            }
        }
    }
```

**Impacto:** Limita a receita quando o tempo recuperado excede **8 horas/dia × dias úteis × semanas/mês**.

**Nota:** Segundo o comentário, esta verificação é mais uma "sanidade" pois o tempo recuperado já "cabe" no dia (era tempo desperdiçado). Mas ainda assim pode limitar em casos extremos.

---

## 📈 Comparação de Assumptions

| Assumption | Realista | Otimista | Diferença |
|------------|----------|----------|-----------|
| **Utilization Factor** | 65% | 85% | -23.5% |
| **AI Efficiency** | 80% | 85% | -5.9% |
| **Conversion Rate** | 85% | 90% | -5.6% |
| **Safety Margin** | 90% | 100% | -10% |
| **Capacity Limit** | ✅ Sim | ❌ Não | Limitado |
| **Ramp-up Factors** | ✅ Sim (3 meses) | ❌ Não | -45%/-15%/-5% |
| **Stress Penalty** | ✅ Sim (alta temporada) | ❌ Não | -10% receita, -5% chamadas |

---

## 🧮 Impacto Acumulado Estimado

### Cenário Base (sem sazonalidade):
1. **Utilization Factor:** -23.5%
2. **Safety Margin:** -10%
3. **Ramp-up (média anual):** -5% a -8%

**Impacto Total Estimado:** Aproximadamente **-35% a -38%** na receita anual comparado ao modo Otimista.

### Com Sazonalidade:
Adiciona **-10%** em meses de alta temporada (quando `monthFactor > 1.15`).

---

## 📝 Observações Importantes

1. **Penalidades Compostas:** As penalidades são aplicadas **sequencialmente**, não aditivamente. Por exemplo:
   - Receita base × utilizationFactor × safetyMargin × rampUpFactor × stressPenalty

2. **Ramp-up Apenas nos Primeiros 3 Meses:** A penalidade de ramp-up só afeta os primeiros 3 meses, mas impacta a receita anual total.

3. **Stress Penalty Condicional:** Só aplica em meses de alta temporada (`monthFactor > 1.15`).

4. **Capacity Limit Raramente Ativa:** Segundo o comentário no código, esta verificação é mais uma "sanidade" e raramente limita, pois o tempo recuperado já "cabe" no dia.

---

## 🔧 Recomendações para Análise

Para analisar o impacto de cada penalidade:

1. **Teste isolado:** Comente temporariamente cada penalidade e compare os resultados
2. **Logs detalhados:** Adicione logs para rastrear cada multiplicador aplicado
3. **Comparação lado a lado:** Execute o mesmo input em ambos os modos e compare linha por linha

---

**Última atualização:** Análise baseada no código em `src/utils/roiCalculations.ts`
