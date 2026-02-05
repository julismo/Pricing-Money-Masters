# Meta-Prompt PRD: Pesquisa de Automações por Nicho

Preciso que atues como consultor de automação e cries um **PRD (Product Requirements Document)** completo para um SaaS B2B que vende automações (Voice AI, Chatbots, Workflows) a PMEs em **Portugal/Europa**.

---

## 🎯 OBJETIVO

Cria um PRD que mapeie:
1. **Nichos de mercado** onde automação tem maior ROI
2. **Tipos de automação** aplicáveis a cada nicho
3. **Inputs necessários** para calcular valor/ROI de cada automação
4. Separação clara entre automações que **Poupam Tempo** vs **Geram Dinheiro**

---

## 📋 ESTRUTURA DO PRD

### PARTE 1: Descoberta de Nichos

Para cada nicho que identificares com alto potencial de automação em Portugal:

```
### [Nome do Nicho]

**Descrição:** Breve descrição do negócio típico
**Tamanho do Mercado PT:** Número estimado de empresas
**Dor Principal:** O problema #1 que perdem dinheiro/tempo
**Potencial de Automação:** Alto/Médio/Baixo (justifica)
```

**Não te limites aos nichos óbvios.** Procura nichos onde:
- Há muitas chamadas/mensagens repetitivas
- Há tarefas manuais que consomem tempo
- Há leads que se perdem por falta de resposta rápida
- Há no-shows ou cancelamentos frequentes

---

### PARTE 2: Tipos de Automação

Para cada tipo de automação disponível no mercado:

```
### [Tipo de Automação]
Ex: Voice AI, Chatbot WhatsApp, Chatbot Website, Email Automation, Workflow Automation, SMS Automation

**O que faz:** Descrição funcional
**Categoria Principal:** 
  - 💰 Gera Dinheiro (aumenta receita, converte leads, upsell)
  - ⏱️ Poupa Tempo (reduz tarefas manuais, automatiza processos)
  - 🔄 Híbrido (faz ambos)

**Nichos Ideais:** Onde esta automação tem mais impacto
**Custo Típico de Implementação:** Range de preços no mercado
```

---

### PARTE 3: Matriz Nicho × Automação × Inputs

Esta é a parte mais importante. Para **cada combinação válida** de Nicho + Automação:

```
### [Nicho] + [Automação]

**Categoria:** 💰 Gera Dinheiro | ⏱️ Poupa Tempo | 🔄 Híbrido

---

#### INPUTS NECESSÁRIOS (para calcular ROI)

**Se "Gera Dinheiro":**
| Input | Descrição | Unidade | Valor Típico PT |
|-------|-----------|---------|-----------------|
| Valor Lifetime Cliente (LTV) | Quanto vale 1 cliente ao longo do tempo | € | [pesquisa] |
| Taxa de Conversão Atual | % leads que viram clientes sem automação | % | [pesquisa] |
| Nº Leads/Mês | Volume médio de leads | número | [pesquisa] |
| Melhoria Esperada | % aumento na conversão com automação | % | [pesquisa] |
| Ticket Médio | Valor médio por transação | € | [pesquisa] |

**Se "Poupa Tempo":**
| Input | Descrição | Unidade | Valor Típico PT |
|-------|-----------|---------|-----------------|
| Execuções/Dia | Quantas vezes a tarefa é feita por dia | número | [pesquisa] |
| Tempo por Execução (Antes) | Minutos gastos manualmente | minutos | [pesquisa] |
| Tempo por Execução (Depois) | Minutos com automação (0 se 100% auto) | minutos | [pesquisa] |
| Custo Hora Funcionário | Salário + TSU / horas | €/hora | [pesquisa] |
| Nº Funcionários na Tarefa | Quantas pessoas fazem isto | número | [pesquisa] |
| Taxa de Erro Humano | % de erros antes da automação | % | [pesquisa] |
| Custo por Erro | Impacto financeiro de cada erro | € | [pesquisa] |

---

#### FÓRMULA DE ROI SUGERIDA

[Escreve a fórmula específica para este caso]

Exemplo Poupa Tempo:
ROI = (Horas Poupadas × Custo/Hora × 12 meses) + (Erros Evitados × Custo/Erro)

Exemplo Gera Dinheiro:
ROI = (Leads × Melhoria na Conversão × LTV) - Custo da Automação
```

---

### PARTE 4: Benchmarks de Mercado

```
### Benchmarks Gerais (Portugal/Europa 2025)

**Custo médio de recepcionista/admin:** €X/hora (com TSU)
**Taxa típica de chamadas perdidas PME:** X%
**Tempo médio resposta a lead (sem automação):** X horas
**Perda estimada por lead não respondido em 1h:** X%
**Taxa média de no-show (sem confirmação automática):** X%

### Por Nicho Específico
[Pesquisa dados reais para cada nicho identificado]
```

---

### PARTE 5: Recomendações para o Wizard

Com base na pesquisa, sugere:

1. **Top 5 Nichos** para começar (maior potencial ROI)
2. **Top 3 Automações** para cada nicho prioritário
3. **Inputs Mínimos** que o wizard deve perguntar (não sobrecarregar o user)
4. **Valores Default** sugeridos para cada input (baseado em médias PT)
5. **Red Flags** - quando NÃO recomendar automação

---

## 📊 FORMATO DE ENTREGA

Entrega o PRD em formato estruturado com:
- Tabelas onde aplicável
- Fontes citadas para cada dado numérico
- Ranges (min-max) em vez de valores únicos quando há variação
- Indicação de confiança: 🟢 Dado confirmado | 🟡 Estimativa | 🔴 A validar

---

## 🌍 CONTEXTO

- **Geografia:** Portugal e Europa, dados de 2024-2026
- **Target:** PMEs com 1-50 funcionários
- **Budget típico do cliente:** €200-2000/mês para automação
- **Objectivo:** Criar calculador de ROI realista (não inflacionado)
- **Diferenciador:** Mostrar valor claro = fácil de vender

---

## ❓ PERGUNTAS BÓNUS

Se encontrares dados, responde também:
1. Quais nichos têm maior resistência a automação? Porquê?
2. Quais automações têm maior taxa de churn após implementação?
3. Qual o tempo médio até o cliente ver ROI positivo?
4. Existem nichos em Portugal sub-explorados por agências de automação?
