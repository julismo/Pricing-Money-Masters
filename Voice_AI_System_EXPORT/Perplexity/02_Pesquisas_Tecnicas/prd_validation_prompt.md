# Meta-Prompt: Validação 360º do PRD "Gerar Dinheiro vs Poupar Tempo"

## 🎯 Contexto do Projeto

Estou a desenvolver um **SaaS B2B de Voice AI** (Calculadora de ROI + Sistema de Vendas) para PMEs portuguesas.

### Produto Atual (Implementado)

- **Calculadora ROI Web** com wizard de 5 passos
- **2 Modos de Cálculo:**
  1. **Poupar Tempo** (Realista) - Foco em eficiência operacional
  2. **Gerar Dinheiro** (Otimista) - Foco em crescimento de receita
- **4 Nichos Suportados:**
  - ✅ Barbearia (Validado, em produção)
  - 🧪 Clínica Médica/Dentária (Beta)
  - 🧪 Restaurante (Beta)
  - 🧪 Stand Automóvel (Beta)

### Arquitetura Técnica (Já Implementada)

**Wizard Flow:**

```
Step 1: Tipo de Valor → "Poupar Tempo" OU "Gerar Dinheiro"
Step 2: Nicho → Barbearia | Clínica | Restaurante | Stand
Step 3: Solução → Atendente Voz | Chatbot | Combo
Step 4: Inputs Dinâmicos → Formulário adapta-se ao nicho escolhido
Step 5: Resultados → ROI calculado com terminologia do nicho
```

**Inputs por Nicho (Implementados):**

| Nicho | Inputs Atuais | Métrica ROI |
|-------|---------------|-------------|
| **Barbearia** | Chamadas/dia, Ticket Médio, Taxa Perdidas | Cortes Recuperados |
| **Clínica** | Chamadas/dia, Valor Consulta, No-Show%, Custo Rececionista | Consultas Recuperadas |
| **Restaurante** | Mesas, Ticket/Pessoa, Grupo Médio, Chamadas/dia, No-Show% | Reservas Recuperadas |
| **Stand** | Leads/dia, Margem Bruta/Venda, Conversão Atual, Leads Fora Horário | Vendas Recuperadas |

**Cálculo ROI:**

- Normaliza inputs específicos (ex: Stand usa `grossMargin` como ticket, não `avgCarValue`)
- Gera 2 cenários: Realista (com ramp-up) vs Otimista (sem limitações)
- Outputs: Lucro Líquido Anual, ROI%, Payback (meses)

---

## 📄 PRD a Validar

```markdown
# Product Requirements: Gerar Dinheiro vs. Poupar Tempo (PRH)

> [!NOTE]
> Este documento define a estratégia de diferenciação entre os dois modos de operação do sistema Voice AI, respondendo à necessidade de clareza sobre o impacto em diferentes nichos.

## 1. Conceito Central

A distinção entre "Poupar Tempo" e "Gerar Dinheiro" não é apenas semântica, mas define **o fluxo operacional** e **o tipo de ROI** que entregamos.

| | **Poupar Tempo (Eficiência)** | **Gerar Dinheiro (Crescimento)** |
|:---:|:---|:---|
| **Foco** | Reduzir custos e atrito operacional | Aumentar receita e ticket médio |
| **Métrica** | Horas poupadas, % chamadas atendidas | Conversão de leads, Upsell, Reativação |
| **Ação da IA** | Atender, agendar, responder dúvidas | Qualificar, persistir, vender, reativar |
| **Para quem?** | Negócios com alto volume de chamadas "lixo" | Negócios com alto ticket ou funil de vendas complexo |

---

## 2. Aplicação por Nicho

Como a automação de "Gerar Dinheiro" se materializa em cada indústria (Beta ou não):

### 💈 Barbearia (Validado)
- **Gerar Dinheiro:**
  - **Reativação:** Ligar para clientes que não vêm há 45 dias.
  - **Preenchimento de Agenda:** Oferecer vagas livres de última hora com desconto (Flash PROMO).
  - **Google Reviews:** Solicitar avaliações após o corte para melhorar ranking orgânico (SEO).

### ⚕️ Clínica Médica / Dentária (Beta)
- **Gerar Dinheiro:**
  - **Recall de Pacientes:** Lembrar check-ups anuais ou limpezas (Dentista).
  - **Qualificação de Tratamentos:** Triagem de leads para implantes/ortodontia (Alto valor).
  - **Recuperação de No-Show:** Remarcar automaticamente quem faltou.

### 🍽️ Restaurante (Beta)
- **Gerar Dinheiro:**
  - **Upsell de Grupo:** "É um aniversário? Gostariam de encomendar o bolo da casa?" durante a reserva.
  - **Gestão de Lista de Espera:** Garantir que nenhuma mesa fica vazia em pico.
  - **Depósitos de Reserva:** Automatizar pedidos de sinal para grandes grupos (Reduz No-show = Dinheiro).

### 🚗 Stand Automóvel (Beta)
- **Gerar Dinheiro (Crítico):**
  - **Speed-to-Lead:** Ligar para o lead do site em <1 min. (Aumenta conversão em 391%).
  - **Qualificação:** Filtrar curiosos vs compradores reais antes de passar ao vendedor.
  - **Agendamento de Test-Drive:** O objetivo não é responder dúvidas, é trazer a pessoa ao stand.

---

## 3. Inputs Necessários (O que perguntar?)

Para calcular o potencial de "Gerar Dinheiro", precisamos de dados diferentes dos atuais.

### Inputs Atuais (Foco Eficiência)
- Chamadas por dia
- Duração da chamada
- Salário/Custo hora

### Inputs "Gerar Dinheiro" (Novos - Futuro)
- **Lifetime Value (LTV):** Quanto vale um cliente ao longo de um ano?
- **Margem de Lucro:** Quanto ganha limpo por venda? (Essencial para Stands)
- **Base de Dados Inativa:** Quantos contatos antigos tem para reativar?
- **Custo por Lead (CAC):** Quanto gasta em ads para ter um lead? (A IA melhora o aproveitamento desse ad spend).

## 4. Conclusão

Enquanto "Poupar Tempo" é uma venda lógica de **Substituição de Custo** (IA vs Secretária), "Gerar Dinheiro" é uma venda emocional de **Investimento** (IA como Vendedor).

Para o MVP (Beta), focamos em mostrar que **atender todas as chamadas já gera dinheiro** ao recuperar a oportunidade perdida. Nas fases seguintes, introduziremos as "Automações Ativas" (Outbound) descritas acima.
```

---

---

## ❓ Questões Estratégicas Críticas (Preciso de Validação)

Antes da análise 360º, preciso que respondas a estas questões com base em benchmarks de mercado:

### 1. **Inputs: Mesmo Nicho, Dados Diferentes?**

- No modo "Gerar Dinheiro", devo pedir **inputs diferentes** do que "Poupar Tempo"?
- Exemplo: Barbearia em "Gerar Dinheiro" precisa de saber "Base de Clientes Inativos" (para Reativação)?
- Ou os mesmos inputs servem, mas a **fórmula de ROI** é que muda?

### 2. **Automações Híbridas (Tempo + Dinheiro)**

Identifiquei automações que **poupam tempo E geram dinheiro simultaneamente**:

- **Onboarding Automatizado:** Cliente novo recebe explicação do serviço via IA (poupa tempo do staff + melhora experiência = mais conversão)
- **Gestão de Reviews:** IA pede avaliação Google após serviço (poupa tempo + melhora SEO = mais clientes orgânicos)

**Pergunta:** Estas automações devem ser:

- a) Um **terceiro modo** ("Crescimento Inteligente")?
- b) **Add-ons opcionais** dentro de cada modo?
- c) **Incluídas por defeito** em "Gerar Dinheiro"?

### 3. **Pricing para Consultores**

Um consultor vai usar esta calculadora para vender Voice AI. Preciso de orientação:

- **Chatbot IA** deve custar **o mesmo** que Atendente de Voz?
- **"Gerar Dinheiro"** deve ter pricing diferente de "Poupar Tempo"?
  - Ex: Base fixa + % de receita gerada (performance-based)?
- Qual o **benchmark de mercado** para pricing de Voice AI B2B em Portugal/Europa?

### 4. **Validação de Casos de Uso**

Os casos de uso que defini (ex: Stand → Speed-to-Lead, Restaurante → Upsell de Grupo) são:

- **Realistas** para o mercado português?
- **Tecnicamente viáveis** com Voice AI atual (2026)?
- **Prioritários** ou há outros mais críticos que esqueci?

---

## 📋 Pedido de Análise 360º

Agora, analisa o PRD sob **7 dimensões críticas** e dá-me feedback estruturado:

### 1. **Clareza Estratégica**

- A distinção entre "Poupar Tempo" vs "Gerar Dinheiro" está clara?
- Um founder de cada nicho conseguiria entender imediatamente qual modo escolher?
- Há ambiguidade ou overlap entre os dois conceitos?

### 2. **Viabilidade Técnica**

- As automações propostas (ex: Reativação, Upsell, Speed-to-Lead) são tecnicamente possíveis com Voice AI atual?
- Há alguma funcionalidade que exija integrações complexas (CRM, POS, etc.)?
- Identificas riscos técnicos que não foram mencionados?

### 3. **Validação de Mercado**

- Os casos de uso por nicho refletem problemas reais desses mercados?
- Há benchmarks ou estudos que validem as afirmações (ex: "Speed-to-Lead aumenta conversão em 391%")?
- Falta algum nicho óbvio onde esta distinção seria valiosa?

### 4. **Inputs de Dados**

- Os inputs propostos (LTV, Margem, CAC, Base Inativa) são realistas?
- Um dono de barbearia/clínica/restaurante/stand tem acesso fácil a estes dados?
- Há inputs críticos em falta para calcular ROI de "Gerar Dinheiro"?

### 5. **Modelo de Pricing**

- Como deveria ser o pricing diferenciado entre os dois modos?
- "Gerar Dinheiro" deveria custar mais (porque gera mais valor)?
- Faz sentido um modelo híbrido (Base + % de receita gerada)?

### 6. **Go-to-Market**

- Qual modo deveria ser o "cavalo de Troia" para cada nicho?
  - Ex: Stands começam por "Gerar Dinheiro" (Speed-to-Lead)?
  - Barbearias começam por "Poupar Tempo" (Atendimento 24/7)?
- Como comunicar esta dualidade sem confundir o cliente?

### 7. **Gaps e Riscos**

- O que está a faltar neste PRD?
- Que perguntas críticas não foram respondidas?
- Que suposições perigosas estão implícitas?

---

## Formato de Resposta Desejado

Para cada dimensão, usa este formato:

**[Dimensão]**

- ✅ **Pontos Fortes:** [O que está bem]
- ⚠️ **Pontos de Atenção:** [O que precisa de refinamento]
- 🔴 **Crítico:** [Bloqueadores ou falhas graves]
- 💡 **Recomendação:** [Ação concreta a tomar]

---

---

## 🎯 Objetivo Final & Deliverables

Preciso de **3 outputs concretos** desta análise:

### 1. **Decisão Go/No-Go**

- ✅ **VERDE:** PRD está pronto para implementação (Fase 4: Tab "Gerar Dinheiro")
- ⚠️ **AMARELO:** Precisa de refinamento, mas pode avançar com ajustes
- 🔴 **VERMELHO:** Gaps críticos, precisa de re-design antes de implementar

### 2. **Tabela de Inputs Recomendados**

Cria uma tabela final com os inputs que DEVO pedir em cada modo:

| Nicho | Inputs "Poupar Tempo" | Inputs "Gerar Dinheiro" | Inputs Comuns |
|-------|----------------------|------------------------|---------------|
| Barbearia | ... | ... | ... |
| Clínica | ... | ... | ... |
| Restaurante | ... | ... | ... |
| Stand | ... | ... | ... |

### 3. **Guia de Pricing para Consultores**

Fornece benchmarks de mercado (com fontes) para:

- **Setup Fee:** Quanto cobrar pela implementação inicial?
- **Mensalidade:** Preço base por nicho e solução (Voz vs Chat vs Combo)?
- **Performance Fee:** Faz sentido cobrar % de receita gerada em modo "Gerar Dinheiro"?

---

## 📚 Fontes Esperadas

Quero que uses (e cites) fontes como:

- **Gartner, Forrester:** Benchmarks de Voice AI B2B
- **CallRail, Twilio:** Estudos de ROI de automação telefónica
- **HubSpot, Salesforce:** Dados de Speed-to-Lead e conversão
- **Estudos de Mercado PT/EU:** Pricing de SaaS B2B em Portugal

---

**Sê brutalmente honesto.** Prefiro descobrir problemas agora do que depois de construir.

**Lembra-te:** Este PRD vai ser usado por **consultores comerciais** para vender o sistema. Precisa de ser claro, credível e acionável.
