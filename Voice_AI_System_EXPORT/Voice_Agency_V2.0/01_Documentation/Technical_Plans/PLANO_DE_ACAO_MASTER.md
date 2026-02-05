# PLANO MESTRE DE AÇÃO: INFRAESTRUTURA CENTRAL ("A NOSSA CASA")
**Data:** 29 de Janeiro de 2026
**Status:** Pronto para Execução
**Responsável:** Equipa de Engenharia Interna

---

## 1. RESUMO EXECUTIVO FINANCEIRO (TCO MENSAL)

A infraestrutura interna ("A Nossa Casa") operará em regime 24/7 com um custo total estimado de **€46,43/mês** (Cenário Premium).

| Categoria | Custo Mensal | Detalhes |
| :--- | :--- | :--- |
| **Custos Fixos (Móvel)** | **€20,49** | Hetzner VPS + **Twilio Mobile (+351 9...)** |
| **Moltbot (Assistente Texto)** | **€17,93** | Claude 3.5 Sonnet (1.100 requests/mês) |
| **Voice Agent (R&D Voz)** | **€5,04** | ElevenLabs Turbo + Deepgram (60 min/mês) |
| **Margem Segurança (10%)** | **€2,97** | Flutuação cambial e overages |
| **TOTAL ESTIMADO** | **€46,43** | |

*Nota: Em cenário de otimização máxima (trocando Sonnet por Haiku e ElevenLabs por Deepgram Aura), este valor pode descer para **€14,07/mês**.*

---

## 2. ARQUITETURA TÉCNICA (Padrão Enterprise)

Seguindo rigorosamente o "Manual de Operações Técnicas", esta infraestrutura garante isolamento absoluto e capacidade de transferência imediata.

### 2.1 Topologia
*   **Servidor:** 1x VPS Hetzner CX21 (2 vCPU, 4GB RAM) em **Nuremberg (Alemanha)**.
*   **Segurança:** Cloudflare (Proxy Mode) com SSL Full (Strict).
*   **Orquestração:** Coolify (PaaS Self-hosted).
*   **Dados:**
    *   **PostgreSQL 16:** Persistência de dados (conversas, logs).
    *   **Redis:** Filas de mensagens e cache.

---

## 3. ROTEIRO DE IMPLEMENTAÇÃO (PASSO A PASSO)

### FASE 1: Fundação (Dia 0)
1.  **Provisionar VPS:** Criar servidor `vps-moltbot-prod-01` na Hetzner (Nuremberg).
2.  **Configurar DNS:** Apontar domínios na Cloudflare:
    *   `painel.demo.com` → IP do VPS
    *   `api.demo.com` → IP do VPS
3.  **Instalar Coolify:** Rodar script de instalação no SSH.

### FASE 2: Stack de Dados (Dia 1)
1.  **Deploy PostgreSQL:** Via template Coolify (Rede interna `coolify_network`).
2.  **Deploy Redis:** Via template Coolify (Rede interna `coolify_network`).
3.  **Validação:** Confirmar que serviços estão "Healthy" no painel.

### FASE 3: O Cérebro (Moltbot Core)
1.  **Deploy Moltbot:** Via Docker Compose customizado no Coolify.
2.  **Configuração:** Injetar variáveis de ambiente:
    *   `ANTHROPIC_API_KEY` (Claude Sonnet)
    *   `DATABASE_URL` (Conexão interna ao Postgres)
    *   `REDIS_URL` (Conexão interna ao Redis)

### FASE 4: Integração de Voz (Híbrida)
1.  **Servidor de Voz (Node.js):** Deploy do serviço de relay WebSocket.
    *   *Pipeline:* Twilio ↔ Deepgram ↔ Moltbot ↔ ElevenLabs ↔ Twilio.
2.  **Configuração Twilio:**
    *   Comprar número `+351...`
    *   Apontar webhook de voz para `https://api.demo.com/voice`.

---

## 4. ESTRATÉGIA DE OPERAÇÃO HÍBRIDA

Este servidor funcionará com dupla personalidade, maximizando o ROI da infraestrutura:

1.  **Modo Laboratório de Voz (R&D):**
    *   Ao ligar para o número, testamos a latência real, a qualidade do TTS ElevenLabs e a "inteligência" do GPT-4o/Claude.
    *   *Custo:* Pay-per-use (~€0,10 por minuto de teste).

2.  **Modo Assistente Interno (Moltbot):**
    *   Durante o dia, a equipa usa o chat para automações e consultas.
    *   O Moltbot roda no mesmo contentor, partilhando a memória (Postgres) com o agente de voz.

---

## 5. PRÓXIMOS PASSOS IMEDIATOS

1.  [ ] **Aprovação Financeira:** Confirmar budget de ~€35/mês no cartão da empresa.
2.  [ ] **Acesso:** Criar conta na Hetzner (se ainda não existir).
3.  [ ] **Execução:** Autorizar o início do provisionamento do VPS.
