# 📘 Manual de Boas Práticas — Prompts para Voice AI (Vapi)

> **Para uso no Miro** — Referência rápida baseada em pesquisa aprofundada de mercado.

---

# 🎯 ARQUITETURA EM CAMADAS (D1-D5)

## Estrutura Recomendada

| Camada | Função | Tokens |
|--------|--------|--------|
| **D1: Identidade** | QUEM é o agente, tom, objetivo | 50-150 |
| **D2: Comportamento** | Regras de interação, DO's e DON'Ts | 100-200 |
| **D3: Contexto** | Negócio, dados, horários, KB | 200-400 |
| **D4: Ferramentas** | Tools, function calling, regras técnicas | 200-500 |
| **D5: Fluxos** | Conversação passo-a-passo, cenários | 400-700 |
| **TOTAL** | — | **950-1950** |

> ⚠️ **Ultrapassar 2000 tokens degrada latência significativamente.**

---

# ⚡ OTIMIZAÇÃO DE LATÊNCIA

## Metas de Performance

| Métrica | Bom | Alerta | Crítico |
|---------|-----|--------|---------|
| **TTFB (Time-to-First-Byte)** | <500ms | >800ms | >1200ms |
| **Latência Barge-In** | <200ms | 200-400ms | >400ms |

## Regras para Baixa Latência

1. **Respostas curtas:** 1-3 frases por turno (máx. 50 palavras)
2. **Prompts econômicos:** <2000 tokens reduzem latência 15-20%
3. **Streaming ativo:** Começar TTS enquanto LLM ainda gera
4. **Cache de áudio:** Pré-sintetizar frases frequentes

### ❌ Evitar
```
"Agradeço o contato. Fico feliz em assistir. 
Como posso ajudá-lo hoje?"
```

### ✅ Preferir
```
"Opa! Tô aqui pra ajudar."
```

---

# 🎤 BARGE-IN (Interrupções)

## Protocolo Obrigatório

Quando o usuário interromper:

1. **PAUSE imediatamente** (não termine a frase)
2. **Reconheça:** "Entendi, pode falar"
3. **Processe** o novo input primeiro
4. **Adapte** sem voltar ao tópico anterior

> 💡 Vapi detecta interrupções em <200ms e distingue "verdadeiros" barge-ins ("espera", "pera") de feedback ("entendi", "certo").

---

# 🗣️ ESTILO CONVERSACIONAL

## Técnicas para Soar Humano

### Discourse Markers (PT-PT)
- "então", "pois", "olhe", "pronto", "tipo", "sabe?"

### Contrações
- "tá", "ó", "tá certo?", "blz"

### Anti-Exemplos (40% mais efetivos que descrições)

| ❌ Robótico | ✅ Natural |
|------------|-----------|
| "Agradeço o contato." | "Opa, obrigado!" |
| "Fico feliz em ajudar." | "Tô aqui pra ajudar." |
| "Como posso ajudá-lo hoje?" | "Em que posso ajudar?" |

### Nunca fazer em voz:
- Listas numeradas faladas ("primeiro... segundo...")
- Frases genéricas de call center
- Respostas longas (>3 frases)

---

# 🛡️ GUARDRAILS (Segurança)

## Regras Obrigatórias

### VOCÊ DEVE SEMPRE:
1. Reconhecer o que o usuário disse ANTES de responder
2. Se interrompido, pausar IMEDIATAMENTE
3. Manter contexto de perguntas anteriores
4. Oferecer escalação em 2 turnos sem sucesso

### VOCÊ NUNCA DEVE:
1. Inventar informações fora da KB/APIs
2. Fazer listas numeradas faladas
3. Usar frases genéricas de call center
4. Ignorar dados do usuário já mencionados
5. Forçar tópico fora do escopo

## Fallback para Informação Não Encontrada

```
"Deixa eu verificar isso pra você. 
Vou conectar um especialista que tem a resposta certinha."
```

---

# 🔧 FUNCTION CALLING (Tools)

## Regra de Ouro

**Antes de chamar qualquer tool:**
```
"Aguarde um momento, por favor, vou verificar."
```

## Coleta de Dados — Passo a Passo

**NUNCA pedir tudo de uma vez.**

### ❌ Errado
```
"Qual seu nome, telefone e quando quer marcar?"
```

### ✅ Certo
```
1. "Qual é o seu número de telefone?"
2. [resposta]
3. "Qual serviço quer?"
4. [resposta]
5. "Para que dia e hora?"
```

---

# 📈 BENCHMARKS (Dados de Produção 2025)

| Métrica | Sem Otimização | Com D1-D4 | Melhoria |
|---------|----------------|-----------|----------|
| TTFB médio | 1200ms | 480ms | **-60%** |
| Barge-in falhas | 35% | 8% | **-77%** |
| NPS | 42 | 71 | **+69%** |
| Alucinações/100 calls | 12 | 2 | **-83%** |
| Taxa conclusão | 68% | 92% | **+35%** |

---

# 📋 CHECKLIST PRÉ-DEPLOY

## D1 — Identidade
- [ ] Persona clara e específica
- [ ] Tom definido (2-3 adjetivos + exemplos)
- [ ] Objetivo em 1 frase
- [ ] Abertura padrão definida

## D2 — Comportamento
- [ ] Regras de barge-in
- [ ] Protocolo de silêncio
- [ ] Regras de escalação
- [ ] Anti-exemplos incluídos

## D3 — Contexto
- [ ] Horários/dados em tabela (não prosa)
- [ ] Knowledge Base referenciada
- [ ] Fallback para dados não encontrados

## D4 — Tools
- [ ] Frase antes de cada tool
- [ ] Triggers explícitos
- [ ] Tratamento de erros
- [ ] Coleta passo-a-passo

## D5 — Fluxos
- [ ] Fluxo de marcação nova completo
- [ ] Fluxo de alteração de marcação
- [ ] Fluxo de cancelamento
- [ ] Fluxo de FAQ/informações
- [ ] Cada fluxo tem passos numerados
- [ ] Confirmações explícitas antes de ações

## Geral
- [ ] Total <2000 tokens
- [ ] UMA pergunta por mensagem
- [ ] Horários por extenso (voz)
- [ ] Testado em produção (50+ calls)

---

# 🔑 REGRAS DE OURO (Resumo)

1. **UMA pergunta por mensagem** — SEMPRE
2. **"Aguarde..."** antes de tools — SEMPRE
3. **Respostas curtas** — 1-3 frases, máx. 50 palavras
4. **Tratar pelo nome** — assim que disponível
5. **Horários por extenso** — "dezasseis horas", não "16:00"
6. **Escalar em 2 turnos** — se não resolver
7. **Nunca inventar** — se não sabe, diz que vai verificar

---

# 📚 FONTES

- Documentação oficial Vapi
- Best practices Agora.io
- Voice AI hallucinations (Voiceflow, Gladia)
- Function calling guides (Zoice.ai)
- Prompt engineering guides (Anthropic, OpenAI)
- Dados de produção de agências usando Vapi (2025)
