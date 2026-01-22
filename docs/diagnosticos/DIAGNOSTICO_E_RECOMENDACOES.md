# DIAGNÓSTICO & RECOMENDAÇÕES: O Site Fica Como Está ou Melhora?

**Versão:** 1.0
**Data:** 2026-01-21
**Base de Análise:** Documentação Estratégica (Perplexity + Lovable + Manual Técnico) + App Running (localhost:8080)

---

## 1. ESTADO ATUAL DO PRODUTO (O QUE EXISTE HOJE)

O browser analysis revelou uma aplicação **bem construída e funcional**.

### Pontos Fortes ✅
| Elemento | Status | Observação |
|:---|:---|:---|
| Wizard de 5 Passos | ✅ Excelente | Guia o utilizador sem overwhelm |
| Visual "HOJE vs COM AUTOMAÇÃO" | ✅ Excelente | Comparação clara de antes/depois |
| Gráfico de ROI com Break-Even | ✅ Excelente | Mostra o mês de payback (Junho) |
| Cálculo de Setup Automático (20% média) | ✅ Bom | Transparente e justificável |
| Design Visual | ✅ Bom | Limpo, profissional, moderno |

### Lacunas Identificadas ⚠️
| Elemento | Status | Observação |
|:---|:---|:---|
| **Âncora de Preço (Recepcionista)** | ❌ Ausente | O preço aparece "sozinho". Não há comparação com custo de Recepcionista Humana (€1.200/mês). |
| **Comunicação de Soberania** | ❌ Ausente | Não há nenhum texto explicando que o cliente é "dono da infraestrutura". Isso vence objeções. |
| **Bundling Visível** | ⚠️ Implícito | O wizard menciona "Atendente de Voz", mas não comunica "Voz + SMS + CRM" como pacote. |
| **Seleção de Tier** | ❌ Ausente | Não há escolha entre Tier 1 (€199/mês) e Tier 2 (€299/mês). |

---

## 2. O VEREDITO: MANTER OU MELHORAR?

**Resposta: O Core Está Pronto. Precisamos de 3 Melhorias Cirúrgicas.**

A calculadora funciona bem para o que foi projetada (provar ROI). Mas não aplica a **estratégia de ancoragem e diferenciação** documentada nos relatórios.

**Analogia:** É como ter um carro com motor bom, mas sem espelhos retrovisores. Funciona, mas falta segurança.

---

## 3. AS 3 MELHORIAS RECOMENDADAS

### MELHORIA 1: Card "Comparativo Recepcionista Humana" (Âncora de Preço)
**Status:** Já estava no `implementation_plan.md`. Prioridade MÁXIMA.

**O Que É:**
Um card visual na seção de Resultados que mostra:
```
┌────────────────────────────────────────────────────────────────┐
│  💼 RECEPCIONISTA HUMANA         │  🤖 NOSSA SOLUÇÃO         │
├──────────────────────────────────┼────────────────────────────┤
│  Salário: €1.200/mês             │  Setup: €750 (uma vez)     │
│  TSU/Férias: +30%                │  Manutenção: €150/mês      │
│  Horário: 9h-18h (Seg-Sex)       │  Horário: 24h/7 dias       │
│  CUSTO ANO: **€18.720**          │  CUSTO ANO: **€2.550**     │
├──────────────────────────────────┴────────────────────────────┤
│  💡 Poupança Anual: **€16.170** (86% menos!)                  │
└───────────────────────────────────────────────────────────────┘
```

**Por que funciona:**
O cliente para de comparar com "Calendly a €15/mês" e passa a comparar com "Funcionário a €1.200/mês".

**Impacto Esperado:** +50% conversão (baseado em benchmarks de Value Pricing).

---

### MELHORIA 2: Selo "Soberania do Cliente" (Diferenciador de Mercado)
**O Que É:**
Um pequeno bloco de texto (ou ícone + tooltip) na seção de Investimento que diz:

> 🏛️ **Infraestrutura Tua, Para Sempre**
> "Ao contrário de SaaS tradicionais, este sistema é instalado no TEU servidor. Se um dia decidires terminar a manutenção connosco, o sistema continua a funcionar. Não ficas preso a ninguém."

**Por que funciona:**
Remove a objeção #1 de vendas de automação: "E se ficares refém?"

**Impacto Esperado:** Reduz drop-off no momento de fechar contrato. Aumenta confiança.

---

### MELHORIA 3: Seleção de Tier no Wizard (Upgrade Path)
**O Que É:**
No **Passo 3 (Solução)**, além de "Atendente de Voz", mostrar 2 opções:

| Tier | Inclui | Preço Sugerido |
|:---|:---|:---|
| **Essencial** | Voz 24/7 + Agendamento | Setup €400 / Manutenção €199/mês |
| **Premium** | Voz + SMS + CRM + Reativação | Setup €600 / Manutenção €299/mês |

**Por que funciona:**
*   Cria "upsell" nativo. Muitos irão para Premium.
*   Comunica bundling de forma clara.
*   Justifica valor percebido (mais features = mais €).

**Impacto Esperado:** ACV (Average Contract Value) sobe 20-30%.

---

## 4. O QUE NÃO PRECISA MUDAR (MANTER COMO ESTÁ)

| Elemento | Justificativa |
|:---|:---|
| Wizard de 5 Passos | Fluxo intuitivo, não quebrar. |
| Gráfico de ROI | Excelente visualização de payback. |
| Comparação HOJE vs COM AUTOMAÇÃO | Core value proposition, já funciona. |
| Inputs da Calculadora | Cobrem os dados essenciais. |

---

## 5. ORDEM DE EXECUÇÃO RECOMENDADA

| Prioridade | Melhoria | Esforço | Impacto |
|:---|:---|:---|:---|
| 1 | Card Recepcionista (Âncora) | 2-3h | ALTO |
| 2 | Selo Soberania | 30min | MÉDIO |
| 3 | Seleção de Tier | 4-6h | ALTO |

**Sugestão:** Implementar Melhorias 1 e 2 agora (são rápidas). Melhoria 3 pode ser Phase 2.

---

## 6. SCREENSHOTS DE REFERÊNCIA (APP ATUAL)

### Resultados com Comparação (Antes/Depois)
![Vista Atual](file:///C:/Users/julis/.gemini/antigravity/brain/6c985f3d-b97f-414e-9773-0951c9bc5278/results_pricing_section_1768991920251.png)

### Gráfico de ROI e Investimento
![Gráfico](file:///C:/Users/julis/.gemini/antigravity/brain/6c985f3d-b97f-414e-9773-0951c9bc5278/charts_visualizations_1768991951744.png)

---

## 7. CONCLUSÃO

**A base está sólida.** Não é preciso refazer nada.
**Faltam 3 peças** para alinhar a UI com a estratégia documentada.

Após implementar Melhoria 1 (Âncora) e 2 (Soberania), a calculadora estará pronta para validar com o Ramilson (MVP).

*Documento gerado por análise profunda de toda documentação estratégica + estado atual do produto.*
