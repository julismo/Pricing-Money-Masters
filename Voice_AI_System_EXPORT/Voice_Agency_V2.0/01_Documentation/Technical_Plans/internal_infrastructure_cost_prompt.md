# Meta Prompt: Projeção de Custos - "A Nossa Casa" (Internal Lab)

Este prompt foi desenhado para calcular o custo mensal real de manter a infraestrutura interna da agência.

**Instrução:** Copie e cole este prompt numa IA (ChatGPT o1/4o, Claude Opus, ou Perplexity) para obter uma simulação financeira detalhada.

---

**Prompt:**

Atua como um **Arquiteto de Soluções Cloud & FinOps**. Preciso de uma estimativa financeira rigorosa (TCO mensal) para a infraestrutura interna da minha agência de IA.

**O Cenário ("A Nossa Casa"):**
Não é para um cliente. É o nosso servidor central de operações e R&D.
O sistema deve estar online 24/7.

**Stack Técnica Fixa (Custos de Existência):**
1.  **Servidor:** Hetzner Cloud (Nuremberg), Modelo **CX21** (2 vCPU, 4GB RAM, 40GB NVMe). IP IPv4 público dedicado.
2.  **Orquestração:** Coolify (Self-hosted no servidor acima).
3.  **Telefonia:** Twilio (1 Número Local de Portugal `+351 2...`).
4.  **Armazenamento:** Backups diários do PostgreSQL (aprox. 5GB total) guardados localmente ou em S3 barato.

**Perfil de Uso Variável (A Nossa Rotina):**
1.  **Moltbot (Assistente de Texto):**
    *   Usado por 2 desenvolvedores.
    *   Volume: ~50 comandos complexos/dia (seg-sex).
    *   Modelo: Claude 3.5 Sonnet (Input context médio: 4k tokens, Output: 500 tokens).
2.  **Voice Agent (Testes R&D):**
    *   Volume: 60 minutos de chamadas totais por mês (testes de novas features).
    *   Pipeline de Voz: Twilio Stream -> Deepgram Nova-2 (STT) -> OpenAI GPT-4.5 / GPT-5.1 (Brain) -> ElevenLabs Turbo v2.5 (TTS) -> Twilio Stream.
    *   Simular latência média e overhead.

**O Que Quero Saber (Output):**
1.  **O "Custo de Existência" (Fixo):** Quanto pago mensalmente só para o servidor estar ligado e o número ativo, mesmo que ninguém o use?
2.  **O "Custo de Operação" (Variável):** Quanto vou gastar em APIs? IMPORTANTE: Quero que separe explicitamente o custo do **Moltbot (uso diário da equipa)** do custo do **Voice Agent (testes)**.
3.  **O Total Mensal Estimado:** Soma realista com margem de segurança de 10%.
4.  **Onde Posso Cortar?** Se eu quiser reduzir este valor em 30%, onde está a "gordura"? (Ex: Trocar ElevenLabs por Deepgram Aura? Trocar Sonnet por Haiku no texto?).

Apresente os valores em **Euros (€)**, usando as taxas de câmbio atuais e preços oficiais de 2025/2026.

---
