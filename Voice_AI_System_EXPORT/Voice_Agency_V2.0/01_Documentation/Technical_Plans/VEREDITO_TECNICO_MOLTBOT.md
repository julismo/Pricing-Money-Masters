# VEREDITO TÉCNICO: O MOLTBOT E A FROTA DE AGENTES 🤖

**Base:** Relatório de Auditoria Perplexity (Jan 2026).
**Decisão:** Avançar com "Client Sovereignty" na Fase 1 (0-15 clientes).

---

## 1. O QUE O MOLTBOT CONSEGUE FAZER? (Realidade)

| Função | Veredito | Autonomia | Notas |
| :--- | :--- | :--- | :--- |
| **Gestão Agenda** | ✅ **VIÁVEL** | 92% | Reagendar "Barbeiro Doente" demora ~12s (aceitável async). Custo de €0.05. |
| **Suporte N1** | ✅ **EXCELENTE** | 95% | Resposta em 2-4s via Chat. O caso de uso perfeito. |
| **Zeladoria** | ⚠️ **PARCIAL** | 78% | Reinicia se cair, mas diagnóstico de root cause é falível. |
| **Voz (Telefone)** | 🔴 **RISCO** | - | Latência acumulada de 4s é inaceitável sem "Filler Audio" + Streaming. |

---

## 2. OS RISCOS CRÍTICOS (O que temos de mitigar HOJE)

1.  **O Silêncio Mortal (Voz):**
    *   *Problema:* 4 segundos de silêncio na chamada faz o cliente desligar.
    *   *Solução Obrigatória:* Implementar "Filler Audio" (Ex: "Hmm, deixa ver...") imediato na Twilio enquanto o Claude pensa.

2.  **O "Loop Infinito" (Custo):**
    *   *Problema:* Cliente indeciso gera 50 chamadas de API (€1+ de custo).
    *   *Solução Obrigatória:* **Guardrails.** Máximo de 8 trocas de mensagem por sessão.

3.  **A Dor de Crescimento (Scale):**
    *   *Problema:* Gerir 50 VPS manualmente é impossível.
    *   *Solução Estratégica:*
        *   **Clientes 0-15:** VPS Dedicado (Learning Phase).
        *   **Clientes 15+:** Migrar "Core Automation" para SaaS Central, manter VPS só para Premium.

---

## 3. O PLANO DE EXECUÇÃO REVISADO

**Fase 1 (Os Primeiros 10): "Client Sovereignty Total"**
*   Cada cliente tem o seu VPS CPX21.
*   Nós controlamos tudo manualmente (Coolify).
*   **Vantagem:** Dados isolados, customização máxima, "Wow Factor" de venda.

**Fase 2 (Acima de 20): "Hybrid Control Plane"**
*   Necessitaremos de Ansible/Terraform para atualizar todos os bots de uma vez.
*   *Não nos preocupamos com isso hoje, mas sabemos que vem aí.*

---

## 4. PRÓXIMOS PASSOS TÉCNICOS

1.  **Instalar Infra (SOP Mestre):** Levantamos o "Moltbot 001" (A Nossa Casa) com a stack validada.
2.  **Desenvolvimento:** Focar 100% em **Latência** (Streaming) e **Guardrails**.
3.  **Zeladoria:** Configurar o script de auto-restart simples (sem diagnósticos complexos por agora).

*Estamos seguros para operar com esta consciência.* 🛡️
