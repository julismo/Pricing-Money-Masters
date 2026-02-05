# TABELA FINAL DE GASTOS & VALIDAÇÃO INDEPENDENTE

Esta tabela reflete os valores documentados no *Plano Mestre* e na *Estimativa Rigorosa*.

## 1. O Orçamento ("A Nossa Casa" - Cenário Premium)

| Item | Detalhes | Custo Unitário | Qtd. | Total Mensal | Status |
| :--- | :--- | :--- | :---: | :---: | :--- |
| **INFRAESTRUTURA** | | | | **€20,49** | |
| 🔹 Hetzner VPS (CX21) | 2 vCPU, 4GB RAM | €5,49 | 1 | €5,49 | ✅ Confirmado |
| 🔹 Twilio Mobile | Prefixo `+351 9...` | €15,00 | 1 | €15,00 | ⚠️ A Confirmar |
| **SOFTWARE & IA** | | | | **€22,97** | |
| 🔸 Moltbot (Sonnet) | 1.100 requests | ~€0,016 | 1.100 | €17,93 | 📉 Variável |
| 🔸 Voice STT (Deepgram) | Transcrição | €0,004/min | 60 | €0,22 | 📉 Variável |
| 🔸 Voice Brain (LLM) | GPT/Claude | ~€0,02/min | 60 | €1,00 | 📉 Variável |
| 🔸 Voice TTS (ElevenLabs)| Síntese Voz | ~€0,06/min | 60 | €3,82 | 📉 Variável |
| **EXTRAS** | | | | | |
| 🛡️ Margem Segurança | 10% Buffer | - | - | €2,97 | 🛡️ Proteção |
| **TOTAL MENSAL Estimado**| | | | **€46,43** | 🏁 |

---

## 2. Meta Prompt para Validação (Perplexity/ChatGPT)

Use este prompt para confirmar *hoje* se os valores (especialmente o Twilio Mobile PT) estão corretos.

**Copie e cole isto na IA:**

```text
Atua como um Especialista em Preços de Telecomunicações e Cloud.
Preciso validar um orçamento técnico para Portugal (Jan 2026) com precisão de cêntimos.

Por favor, confirma os seguintes preços atuais:

1.  **Twilio Portugal Mobile Number:** Qual é o preço mensal EXATO de um número móvel "Clean" (prefixo +351 91/92/93/96) na Twilio hoje? É $1.15, $15.00 ou outro valor? Existem taxas regulatórias ("regulatory bundle fees") mensais adicionais para Portugal?
2.  **Hetzner Cloud CX21:** O preço em Nuremberg continua a €5,35 + IVA ou houve alteração em 2025? O IPv4 ainda custa €0,60/mês?
3.  **ElevenLabs Turbo v2.5:** O preço continua a $11/mês (Creator Plan) ou mudou o pay-as-you-go?

Saída esperada: Uma tabela com "Preço Orçado vs Preço Real" e um veredito se o meu orçamento de €46/mês é seguro ou se estou a subestimar algum custo escondido.
```
