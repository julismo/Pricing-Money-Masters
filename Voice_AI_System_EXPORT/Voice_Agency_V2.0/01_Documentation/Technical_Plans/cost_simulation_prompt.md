# Meta Prompt de Simulação de Custos (Modo Demo/Interno)

Este "Meta Prompt" foi desenhado para simular o cenário financeiro exato do projeto **Moltbot + Voice AI** numa fase de **Testes Internos**.

Podes usar este prompt em qualquer LLM (ou seguir a lógica abaixo) para recalcular os custos se mudares as variáveis (ex: mais minutos, servidor diferente).

---

## O Prompt

**Contexto:**
Estamos a construir um Voice AI Agent Self-Hosted (Moltbot) para uma Barbearia.
A arquitetura é: VPS Hetzner + Twilio (Número PT) + Claude API + STT/TTS Interno (ou APIs baratas).
O objetivo é **testes internos e demonstração para um cliente** (apenas nós ligamos para o bot). Dados ficam todos connosco (Self-hosted).

**Variáveis de Custo Unitário (Estimadas):**
1.  **Infraestrutura Fixa (Mensal):**
    *   VPS Hetzner (2 vCPU / 4GB RAM): €6.00
    *   Número Twilio (Local Portugal +351 2x or 3x): $1.15 (~€1.10)
    *   *Nota: Se fosse Móvel (+351 9x) seria ~$15.00, mas vamos assumir Local para teste barato.*

2.  **Custos Variáveis (Por Minuto de Conversa):**
    *   **Twilio Voice Inbound**: $0.0085/min (~€0.008)
    *   **STT (Deepgram Nova-2)**: $0.0043/min (~€0.004)
    *   **TTS (ElevenLabs/OpenAI)**: ~$0.02/min (média conservadora) (~€0.018)
    *   **LLM (Claude 3.5 Sonnet)**: Estimativa de €0.02/minuto de conversa (input/output context).
    *   **Total Variável Estimado**: ~€0.05 a €0.07 por minuto.

**Cenário de Teste (Inputs):**
*   **Frequência**: Testes pontuais da equipa de dev + 1 Demo ao cliente.
*   **Duração Total de Chamadas**: 60 minutos no mês (exagero para margem de segurança).
*   **Mensagens de Texto (WhatsApp)**: 50 mensagens de teste.

**Instrução:**
Calcule o Custo Total de Propriedade (TCO) para este mês de teste ("Mês 0").
Diferencie Custo Fixo (que pagamos mesmo sem ligar) do Custo Variável.

---

## Resultado da Simulação (Estimativa para o Teu Caso)

Executando o modelo acima para o teu cenário específico ("Ligar para nós mesmos para mostrar ao cliente"):

### 1. Custos Fixos (O que pagas só para "ter" o sistema)
*   **VPS Hetzner**: €6.00
*   **Número Twilio (Local)**: €1.10
*   **Total Fixo**: **€7.10 / mês**

### 2. Custos Variáveis (O "Gasto" real do teste)
Assumindo **60 minutos** de conversa real (o que é muito para uma demo!):
*   **Twilio Voice**: 60 min x €0.008 = €0.48
*   **Inteligência (STT+TTS+Claude)**: 60 min x €0.06 = €3.60
*   **Total Variável**: **~€4.10**

### 💰 Total Final para o Mês de Teste
**€7.10 (Fixo) + €4.10 (Uso) = ~€11.20**

---

### Conclusão para "Internal Test Mode"
Como podes ver, o custo é extremamente baixo.
*   Principal Custo é o **VPS** (que ficas com ele para ti).
*   A demonstração em si custa "cêntimos".
*   Não há fidelização nem taxas de setup grandes (além de carregar saldo no Twilio/OpenAI).

**Recomendação:** Carregar €20 em créditos (Twilio + Anthropic) e pagar o mês do VPS. Isso cobre todo o período de desenvolvimento e demonstração com folga.
