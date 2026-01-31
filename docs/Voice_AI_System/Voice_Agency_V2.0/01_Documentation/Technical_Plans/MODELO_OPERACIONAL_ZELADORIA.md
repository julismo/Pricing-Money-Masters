# MODELO OPERACIONAL: A "ZELADORIA HÍBRIDA" 🧹🤖

**Dúvida Central:** *Quem cuida da casa? Nós ou o Robô?*
**Resposta:** O Robô (Moltbot) é o **Zelador Residente**. Nós (Agência) somos a **Equipa de Engenharia**.

Este documento explica como a manutenção funciona na prática para a **Nossa Agência** e para os **Clientes**.

---

## 1. A ESTRUTURA DE PODER (Quem faz o quê?)

| Papel | Quem | Função | Ferramentas |
| :--- | :--- | :--- | :--- |
| **O "Zelador"** (Nível 0) | **Moltbot + n8n** | Monitoramento 24/7, Auto-reparo simples, Alertas. | Scripts, Webhooks, Docker, Cron |
| **O "Engenheiro"** (Nível 1) | **Tua Equipa** | Resolver problemas complexos, Atualizar versões, Otimizar. | Coolify, Terminal SSH, IDE |
| **O "Dono"** (Nível 2) | **Cliente** | Pagar a fatura, Usar o sistema, Pedir novas features. | WhatsApp, Dashboard |

---

## 2. O FLUXO DE ZELADORIA (Cenário Real)

*Imagine que o banco de dados do Cliente X parou às 3 da manhã.*

### Passo 1: O "Cheiro de Fumo" (Automático) 🚨
*   **O n8n (Braço):** Roda um fluxo a cada 5 minutos: `Check Status Postgres`.
*   **Resultado:** "Erro: Connection Refused".
*   **Ação:** O n8n avisa o Moltbot.

### Passo 2: A Tentativa de Auto-Reparo (Automático) 🛠️
*   **Moltbot (Cérebro):** Recebe o erro.
*   **Decisão:** "Vou tentar reiniciar o container".
*   **Ação:** Moltbot manda comando para a API do Coolify: `Restart Service Postgres`.
*   **Resultado:** Se voltar a funcionar -> **Zeladoria Concluída**. O Humano nem acorda.

### Passo 3: O Pedido de Socorro (Escalonamento) 📢
*   **Cenário:** O container não voltou (Ex: erro de disco cheio).
*   **Moltbot (Cérebro):** "Não consegui resolver. Preciso de um Humano."
*   **Ação:** Moltbot envia mensagem urgente no **WhatsApp da Tua Equipa**:
    > *"⚠️ ALERTA CRÍTICO: Cliente X sem base de dados. Tentei reiniciar e falhei. Erro: Disk Full."*

### Passo 4: A Intervenção Humana (Engenharia) 👨‍💻
*   **Tua Equipa:** Acorda, vê a mensagem.
*   **Ação:** Loga no Coolify (`painel.cliente-x.com`), vê os logs, limpa o disco.
*   **Resolução:** Sistema volta.

---

## 3. VIABILIDADE TÉCNICA (O n8n aguenta?)

**A pergunta:** *"O n8n consegue fazer fluxo de tudo isso mesmo?"*
**A resposta:** **SIM.**

Porquê?
1.  **O Coolify tem API:** O n8n consegue fazer TUDO o que tu fazes com o mouse (Reiniciar, Parar, Ver Logs) através de blocos "HTTP Request".
2.  **O Docker é Controlável:** O n8n roda dentro da rede Docker. Ele tem acesso direto aos "vizinhos" (Database, API).
3.  **A Lógica é Simples:** `Se (Erro) Então (Ação) Senão (Avisar Humano)`.

---

## 4. COMO NÓS TRABALHAMOS (Workflow da Agência)

1.  **Bitwarden:** É o chaveiro mestre. Só nós (Engenheiros) temos acesso.
2.  **Coolify Central:** Nós temos um painel onde vemos todos os servidores de todos os clientes? **Não.** Cada cliente tem o seu (Soberania).
3.  **Monitoramento Central:** Mas o **Nosso Moltbot (Interno)** recebe os alertas de **Todos os Moltbots (Clientes)**.
    *   *Cliente 1 Moltbot* -> "Estou com febre".
    *   *Agência Moltbot* -> "Chefe, o Cliente 1 está com febre".

**Resumo:** O Moltbot trabalha para nós. Ele tira 90% do tédio (chores) da manutenção. Nós só entramos nos 10% críticos.
