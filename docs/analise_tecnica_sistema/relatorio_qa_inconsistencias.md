# 🕵️ Relatório de QA Extensivo — Simulador de ROI v2.1
**Data:** 12 Janeiro 2026
**Objectivo:** Identificar todas as incoerências visuais e lógicas que um cliente possa questionar.

---

## 📋 Resumo do Teste
- **Ambiente:** `http://localhost:8080/`
- **Nicho Testado:** Barbearia
- **Solução:** Atendente de Voz
- **Inputs Base:** 15 chamadas/semana, Ticket 12€, 20% perda, 2 min/chamada, 30 min/corte

---

## 🔍 Inconsistências Identificadas

### INC-001: Discrepância entre Cortes Perdidos × Ticket ≠ Valor Exibido
| Campo | Valor Observado |
|:---|:---|
| Cortes perdidos | 5,6 |
| Ticket configurado | 12€ |
| Cálculo esperado | 5,6 × 12€ = **67,20€** |
| Valor exibido | **~174€/mês** |

**Confusão do Cliente:**
> "Se eu perco 5,6 cortes de 12€, como é que perco 174€?"

**Explicação Técnica:**
O valor inclui o **Custo de Oportunidade do Tempo** (4,3h perdidas × ~25€/h de produtividade estimada), mas isto **não está visível na UI**.

**Script do Consultor:**
> "Excelente observação. O nosso cálculo não olha apenas para o valor bruto do ticket, mas também para o **tempo do profissional**. Além dos 67€ diretos, consideramos as 4,3 horas recuperadas para focar em serviços premium ou gestão."

---

### INC-002: Valor por Corte Varia entre Cenários
| Cenário | Valor/mês | Cortes | €/Corte Implícito |
|:---|:---|:---|:---|
| Realista | 174€ | 5,6 | 31,07€ |
| Potencial | 205€ | 6,8 | 30,14€ |

**Confusão do Cliente:**
> "Se o meu ticket é 12€, por que cada corte vale 30€?"

**Explicação Técnica:**
O sistema combina dois vetores: tempo recuperado + chamadas perdidas convertidas. O €/corte não é linear porque inclui ganhos de eficiência.

**Script do Consultor:**
> "A matemática combina dois tipos de ganho. Não é só 1 corte = 12€. É o corte **mais** o tempo que o profissional ganha para fazer outro."

---

### INC-003: Card HOJE Estático com Sazonalidade Ativa
**Observação:**
Com sazonalidade ligada e mês de início = Junho, o card HOJE continua a mostrar o valor base (~174€), sem refletir que Junho é mês de alta estação.

**Confusão do Cliente:**
> "O gráfico mostra Junho com pico, mas o card mostra o mesmo valor?"

**Explicação Técnica:**
O card mostra a **média mensal**, não o mês específico. O gráfico de Evolução Mensal é que diferencia mês a mês.

**Script do Consultor:**
> "O card mostra a tua média anual. Para ver o impacto específico de cada mês, consulta a aba 'Evolução Mensal' ou 'Sazonalidade'."

---

### INC-004: Sem Botão "Voltar" na Tela de Resultados
**Observação:**
Uma vez nos resultados, não existe botão de voltar visível. O stepper no topo não é clicável.

**Confusão do Cliente:**
> "Quero testar com 15€ de ticket, mas tenho de recarregar a página toda?"

**Impacto UX:**
Frustrante. O cliente pode desistir em vez de explorar cenários diferentes.

**Recomendação:**
Adicionar botão "Recalcular" ou tornar o stepper navegável.

---

### INC-005: Payback de "1 Mês" Parece Bom Demais
**Observação:**
Em quase todos os cenários testados, o payback é 1 mês.

**Confusão do Cliente:**
> "1 mês? Isso parece scam..."

**Explicação Técnica:**
Como é uma subscrição mensal sem custo inicial, o payback é imediato quando o lucro mensal > custo mensal.

**Script do Consultor:**
> "Sim! Porque não existe investimento inicial. É uma subscrição. No momento em que a automação recupera 3-4 cortes, já pagou a mensalidade desse mês."

---

### INC-006: Aba Sazonalidade "Morta" sem Explicação
**Observação:**
Se o utilizador não marcou "Considerar Sazonalidade", a aba aparece com `opacity-50`, mas:
- Não explica porquê está desativada
- Não redireciona para ativar

**Confusão do Cliente:**
> "Cliquei e não aconteceu nada. Bug?"

**Recomendação:**
Mostrar tooltip: "Active a sazonalidade no passo anterior para ver esta análise."

---

### INC-007: Gráfico Sazonalidade Sempre Começa em Janeiro
**Observação:**
Mesmo quando o mês de início é Junho, o gráfico de barras de Sazonalidade mostra Jan→Dez em vez de Jun→Mai.

**Confusão do Cliente:**
> "Se eu começo em Junho, por que o gráfico mostra Janeiro primeiro?"

**Explicação Técnica:**
O gráfico de Evolução Mensal roda corretamente. O gráfico de Sazonalidade mostra o perfil anual fixo (referência de mercado).

**Script do Consultor:**
> "O gráfico de Sazonalidade mostra o perfil do mercado em Portugal. A curva real para ti está na 'Evolução Mensal', que começa no teu mês de entrada."

---

### INC-008: "65 chamadas/mês" Igual em Ambos os Cenários
**Observação:**
O número de chamadas/mês no card HOJE é idêntico para Realista e Potencial.

**Confusão do Cliente:**
> "Mudei de cenário e as chamadas não mudaram?"

**Explicação Técnica:**
Este é o volume de **entrada** (input do utilizador). É igual porque representa a realidade atual. O que muda é como o sistema **processa** essas chamadas.

**Script do Consultor:**
> "Correto. As chamadas que entram são sempre as mesmas — é a tua realidade. O que muda é **quantas** dessas chamadas a automação consegue converter em marcações."

---

## 📊 Evidência Visual

### Screenshot: Resultados com Cenário Realista
![Results Cards](results_cards_verification_1768232969634.png)

### Gravação do Teste Completo
📹 [qa_full_test_1768236620648.webp](qa_full_test_1768236620648.webp)

---

## 💡 Respostas do Consultor — Resumo

| Pergunta do Cliente | Resposta Sugerida |
|:---|:---|
| "Por que o valor é 174€ se só perco 5,6 cortes de 12€?" | "O cálculo inclui o custo de oportunidade do tempo do profissional, não só o ticket." |
| "Payback de 1 mês? Isso é real?" | "Sim, porque é subscrição mensal sem custo inicial. O ROI começa no primeiro mês." |
| "O gráfico não roda quando mudo o mês?" | "A Sazonalidade mostra o perfil do mercado. A Evolução Mensal é que começa no teu mês." |
| "Por que as chamadas são iguais nos dois cenários?" | "As chamadas são o teu input atual. O que muda é a taxa de conversão do sistema." |

---

## ✅ Conclusão

O sistema é **matematicamente robusto**, mas a **transparência da UI precisa de melhorias** para evitar desconfiança:

1. **Clarificar** que o valor de oportunidade inclui tempo + ticket
2. **Adicionar** botão de voltar/recalcular
3. **Explicar** aba Sazonalidade desativada
4. **Considerar** rodar o gráfico de Sazonalidade com o mês de início

**Veredicto:** VENDÁVEL, mas prepara os consultores com os scripts acima.
