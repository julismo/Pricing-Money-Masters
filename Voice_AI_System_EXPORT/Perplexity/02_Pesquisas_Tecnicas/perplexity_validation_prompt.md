# Meta Prompt para Validação de Dados (Perplexity AI)

Copia e cola este prompt no Perplexity (com modo "Pro" ou "Deep Search" ativo se possível) para obter uma auditoria independente e dados em tempo real sobre o nosso planeamento.

---

**Prompt:**

Atua como um Engenheiro Sénior de VoIP e Arquiteto Cloud. Estou a validar uma arquitetura para um "Voice AI Agent" self-hosted para uma empresa em Portugal.

**O Stack Proposto:**
*   **Core**: Moltbot (ex-Clawdbot/Clawd) rodando em Docker.
*   **Infra**: VPS Hetzner (Alemanha).
*   **Telefonia**: Twilio (Números de Portugal + Media Streams para áudio bidirecional).
*   **IA Stack**: Anthropic Claude 3.5 Sonnet (Cérebro) + Deepgram (STT) + ElevenLabs/OpenAI (TTS).
*   **Cenário**: Fase de testes internos e demo (baixo volume, ~60 min/mês).

Realiza uma pesquisa profunda e atualizada (considerando a data atual em 2026) para validar os seguintes pontos críticos:

1.  **Auditoria de Custos Twilio Portugal (2025/2026):**
    *   Qual é o preço *exato* mensal de um número **Local** (+351 2x) vs **Móvel** (+351 9x) na Twilio hoje?
    *   Existem requisitos regulatórios (ex: comprovativo de morada/identidade) para ativar números portugueses na Twilio que possam bloquear o setup imediato?
    *   Confirma as taxas de terminação (outbound) para redes móveis portuguesas (MEO, NOS, Vodafone). Costumam ser caras?

2.  **Validação de Latência (Real-Time Voice):**
    *   Pesquisa benchmarks sobre a latência entre **Twilio Media Streams** (Europa) e **Hetzner** (Falkenstein/Nuremberg).
    *   A latência de round-trip é aceitável para um AI conversacional (<500ms totais) usando esta rota?
    *   Existem relatos de problemas de "jitter" em VPS partilhados (shared vCPU) para processamento de áudio via WebSocket?

3.  **Estado Atual do Moltbot (Clawdbot):**
    *   Procura por discussões recentes (GitHub Issues, Reddit, Twitter/X) sobre o "Moltbot" ou "Clawdbot".
    *   A funcionalidade de **Voice Agent** está estável no repositório oficial? Ou é necessário instalar um fork/plugin específico?

4.  **Alternativas "Hidden Gem":**
    *   Existe algum fornecedor de SIP Trunking/Números em Portugal que seja mais barato ou tecnicamente superior à Twilio para uso com AI (suporte nativo a WebSockets/Media Streams)? (Ex: Telnyx, SignalWire).

Por favor, apresenta os dados em tabelas comparativas e cita as fontes mais recentes possíveis.

---
