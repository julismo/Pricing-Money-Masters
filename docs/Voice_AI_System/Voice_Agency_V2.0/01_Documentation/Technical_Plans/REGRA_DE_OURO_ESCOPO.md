# REGRA DE OURO: ESCOPO & PERMISSÕES (Moltbot vs. Retell) 🛡️

**A Clarificação Final:**
*   📞 **Retell AI:** Fala com o **Cliente Final** (Faz agendamentos).
*   🤖 **Moltbot:** Fala com o **Barbeiro** (Faz gestão e suporte).

---

## 1. O FLUXO DE "BLOQUEIO" (Exemplo Real)

1.  **Ação:** Barbeiro diz no WhatsApp: *"Moltbot, vou estar doente amanhã."*
2.  **Moltbot (Cérebro):**
    *   Entende a intenção: `BLOCK_SCHEDULE`.
    *   Executa n8n: Vai ao Google Calendar e cria eventos de "Dia Inteiro" com a cor `Vermelho` (ou etiqueta `[BLOCKED]`).
3.  **Retell AI (A Voz):**
    *   Recebe uma ligação de um cliente.
    *   Tenta ler a agenda. Vê o `[BLOCKED]`.
    *   Diz: *"O barbeiro não tem vagas amanhã."*

**Conclusão:** O Moltbot não precisa de falar com o cliente. Ele apenas "prepara o terreno" (a agenda) para o Retell não fazer asneira.

---

## 2. O PROBLEMA DO "ABUSO" (Permissions System)

**O Medo:** O Barbeiro começa a tratar o Moltbot como escravo pessoal: *"Moltbot, faz-me uma pesquisa de mercado sobre preços de tesouras."* ou *"Moltbot, envia 5000 SMS de marketing."*

**A Solução: A Constituição do Bot (System Prompt + Code Checks)**

### Camada 1: O "Não" Educado (System Prompt)
No cérebro do Moltbot (Claude), colocamos instruções rígidas:

> *"Tu és o Assistente Operacional da Barbearia X. A tua função é EXCLUSIVAMENTE gerir agenda e tirar dúvidas sobre o sistema.*
> *SE o utilizador pedir para fazer marketing, pesquisas externas ou tarefas pessoais, RECUSA educadamente e diz que isso não está no pacote contratado."*

### Camada 2: O "Não" Técnico (Hard Limits)
No código (n8n/Backend), bloqueamos as ferramentas:

*   **Tabela de Permissões (Postgres):**
    *   `Cliente A (Plano Básico):` Tools = [`calendar_block`, `tech_support`].
    *   `Cliente B (Plano Premium):` Tools = [`calendar_block`, `tech_support`, `marketing_blast`].

*   **Cenário:** O Barbeiro do Plano Básico pede: *"Manda SMS para todos."*
*   **Moltbot:** Tenta chamar a tool `marketing_blast`.
*   **Middleware:** "ERRO 403: O teu plano não permite Marketing."
*   **Moltbot responde:** *"Desculpe, o envio de SMS em massa é uma funcionalidade Premium. Quer falar com a agência para fazer upgrade?"*

---

## 3. RESUMO ESTRATÉGICO

Não precisamos de inventar a roda da Voz (Retell faz isso).
O **Moltbot** é o **Gerente de Loja 24h**.
*   Ele garante que a agenda está limpa.
*   Ele ajuda o dono a usar o software.
*   **Ele tem limites CLAROS do que pode fazer.**

Isso resolve a sua preocupação? O Moltbot é um funcionário com **Contrato de Trabalho** (regras), não faz "biscates".
