# DUBRA CRITICA: O QUE É O MOLTBOT? (Respostas Estruturais)

Aqu tens as respostas exatas para reestruturar o Manual Técnico.

---

## 1. Arquitetura: O Novo Fluxo

**O Modelo Proposto é:**
`Input (Voice/Chat/Sensor)` → **Moltbot (CÉREBRO/DECISOR)** → `n8n (BRAÇOS/EXECUTOR)` → `APIs do Mundo`

*   **Antigamente:** O n8n recebia o input e tinha "If/Else" gigantes para tentar ser inteligente.
*   **Agora:** O Moltbot recebe o input, usa um LLM para entender a *intenção*, e apenas diz ao n8n: "Executa a ferramenta X".

---

## 2. O Moltbot é...

**Definição Técnica:** É um **Servidor de Orquestração** (Node.js/Python) Self-Hosted.

*   **Não é um LLM:** Ele não é o cérebro biológico. Ele é o *crânio* que segura o cérebro.
*   **Usa LLMs:** Ele conecta-se via API ao **Anthropic Claude (Sonnet)** ou **OpenAI (GPT-4o)** para processar lógica.
*   **É um Wrapper Avançado:** Ele gere estado, memória (Postgres), contexto do cliente e filas, chamando a IA apenas para "pensar".

---

## 3. Hosting & Custo (Modelo Soberano)

*   **Onde vive?** No **VPS do Cliente** (Hetzner).
    *   *Filosofia:* "1 Cliente = 1 VPS = 1 Moltbot". Nada de SaaS centralizado.
*   **Modelo de Custo:**
    *   **Antes:** Taxas de SaaS (Make/Vapi) + Custos Ocultos.
    *   **Agora:** Custo Fixo de Infra (€6 servidor) + Custo Variável de Inteligência (Tokens da API Claude/OpenAI).
    *   *Vantagem:* Mais barato para escala, total controlo de dados.

---

## 4. Impacto no Cliente

*   **Interface:** O cliente **NÃO** viaja no painel de admin do Moltbot.
    *   Ele interage via **WhatsApp** (para pedir coisas ao Moltbot) ou **Dashboard Simplificado** (para ver resultados).
*   **Fluxo:** O cliente vê "Magia". Ele diz "Bloqueia a agenda" no WhatsApp, e acontece.
*   **Autonomia:** O cliente não "treina". O cliente define **Políticas** (em linguagem natural) que nós colocamos na "Constituição" do Moltbot dele.

---

## 5. Impacto Interno (A Nossa Operação)

*   **Deploy (A Frota):**
    *   Não é multi-tenant. É **Multi-Instance**.
    *   Usamos o Coolify ou Scripts para clonar o "Moltbot Base" para cada novo cliente em 5 minutos.
*   **Manutenção (Zeladoria Híbrida):**
    *   O Moltbot tem auto-diagnóstico.
    *   Se ele falhar, ele grita (alerta). A "inteligência" (regras de negócio) é mantida por nós via atualizações de código (Git pull).
*   **Integração (n8n Simpificado):**
    *   **Mudança Radical:** Os workflows do n8n ficam **ESTÚPIDOS** (e isso é bom).
    *   Em vez de um workflow complexo "Verificar Horário -> Se X -> Se Y", o n8n passa a ter ferramentas atómicas: "Criar Evento", "Enviar SMS".
    *   Quem decide qual ferramenta usar é o Moltbot.

---

## RESUMO PARA O MANUAL

*   **Camada 1 (Cérebro):** **Moltbot** (Node.js no Docker). Gere Estado, Lógica e Memória.
*   **Camada 2 (Cognição):** **LLM APIs** (Claude/GPT). O processador alugado.
*   **Camada 3 (Braços):** **n8n** (Self-hosted). Executa as ações na API do Google/CRMs.
*   **Camada 4 (Boca/Ouvidos):** **Voice Stack** (Twilio/Deepgram/ElevenLabs). Apenas I/O de áudio.
