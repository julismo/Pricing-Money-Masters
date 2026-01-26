# 📚 Estrutura da Documentação - Barbearia Neves Voice AI

> **Atualizado:** 23 Janeiro 2026  
> **Projeto:** Sistema de Voice AI (Agente "Bruno") para agendamentos

---

## 📁 Organização das Pastas

```
docs/
├── Perplexity/          → Pesquisas + Documentação de Prompts
├── Base_treinamento/    → Knowledge Base (D3) para o agente
├── analise_tecnica_sistema/
├── auditoria_tecnica/
├── business_strategy/
├── diagnosticos/
├── modelos_negocio/
└── politica_precos/
```

---

## 📂 docs/Perplexity (Pesquisas + Prompts)

**Propósito:** Contém pesquisas do Perplexity.ai e toda a documentação sobre estrutura de prompts para Voice AI.

### Arquivos Principais:

#### **Framework e Estrutura**
- **`Framework_D1_D5_Guia_Completo.md`** ⭐ **DOCUMENTO MESTRE**
  - Estrutura completa D1-D5
  - Templates prontos para uso
  - Checklist de validação
  - Métricas de sucesso

- **`Manual_Boas_Praticas_Voice_AI_Prompt.md`**
  - Referência rápida D1-D5
  - Otimização de latência
  - Regras de barge-in
  - Benchmarks de produção

#### **Pesquisas Técnicas**
- **`Relatório Especialista Knowledge Base.md`**
  - Comparação Vapi.ai vs Retell AI
  - Arquitetura RAG
  - Performance e latência
  - Recomendação: Retell AI ⭐⭐⭐⭐⭐

- **`Curiosos.md`**
  - Proteção contra abuso de tokens
  - Detecção de chamadas não-produtivas
  - Implementação de webhooks
  - Economia: €468-€860/ano

- **`Relatório Técnico de Viabilidade – Integração Elev.md`**
  - Integração ElevenLabs
  - Voice/TTS configuration
  - Latência e custos

#### **Pesquisas Especializadas**
- **`Atue como um Engenheiro Sênior de Voice AI e Espec.md`**
  - Português vs Inglês para Voice AI
  - Escolha de modelos LLM
  - Recomendação: Qwen2.5-7b com prompt PT

- **`Atua como Arquiteto de Soluções de Voice AI. Reali.md`**
  - Arquitetura de soluções
  - Function calling complexity

- **`Atua como Consultor Jurídico especializado em Prop.md`**
  - GDPR compliance
  - Sourcing de dados
  - Aspectos legais

- **`Atue como especialista em engenharia de prompts pa.md`**
  - Engenharia de prompts avançada
  - Técnicas de otimização

- **`Relatório Especializado_ Impacto de Gênero e Perso.md`**
  - Impacto de gênero na voz
  - Persona optimization
  - Sotaque Lisboa/Coimbra

#### **Outros**
- **`Analiase_ultra_apurada.md`**
  - Análise técnica aprofundada

- **`Para fins de entretenimento pessoal mesmo e 100% u.md`**
  - Conteúdo adicional

---

## 📂 docs/Base_treinamento (Knowledge Base D3)

**Propósito:** Contém a base de conhecimento factual (camada D3) que alimenta o agente de voz "Bruno".

### Arquivos Principais:

#### **Documento Master**
- **`Daso_sobre_negocio.md`** ⭐ **D3 COMPLETO** (1.092 linhas)
  - Identidade e posicionamento
  - Localização e instalações
  - Horários de funcionamento
  - Perfis dos barbeiros (Julismo e João)
  - Catálogo completo de serviços
  - FAQ com 50+ perguntas
  - Terminologia técnica
  - Produtos e marcas

#### **Arquivos Modulares**
- **`01_Catalogo_Servicos_Precos.md`**
  - Tabela de serviços e preços
  - Durações
  - Barbeiros recomendados

- **`02_Politicas_Operacionais.md`**
  - Horários detalhados
  - Política de agendamento
  - Política de cancelamento
  - Formas de pagamento
  - GDPR compliance
  - Proteção contra abuso do sistema

- **`03_FAQ_Vendas_Qualificacao_Leads.md`**
  - Perguntas frequentes
  - Qualificação de leads
  - Scripts de vendas

- **`04_Perfis_Barbeiros.md`**
  - Julismo Neves (Sênior)
  - João Cardoso (Moderno)
  - Especialidades
  - Disponibilidade

- **`05_Terminologia_Tecnica_Glossario.md`**
  - Glossário PT-PT ↔ EN
  - Tipos de fade
  - Termos técnicos

- **`Treinamento_para_aumentar_faturação.md`**
  - Estratégias de vendas
  - Upselling
  - Cross-selling

---

## 🎯 Como Usar Esta Documentação

### Para Implementar o Voice AI:

1. **Leia o Framework D1-D5:**
   - `Perplexity/Framework_D1_D5_Guia_Completo.md`

2. **Configure a Knowledge Base:**
   - `Base_treinamento/Daso_sobre_negocio.md`

3. **Escolha a Plataforma:**
   - `Perplexity/Relatório Especialista Knowledge Base.md`
   - Recomendação: **Retell AI**

4. **Implemente Proteções:**
   - `Perplexity/Curiosos.md`

5. **Configure Voice/TTS:**
   - `Perplexity/Relatório Técnico de Viabilidade – Integração Elev.md`

### Para Manutenção:

- **Atualizar preços/horários:** Editar `Base_treinamento/02_Politicas_Operacionais.md`
- **Adicionar serviços:** Editar `Base_treinamento/01_Catalogo_Servicos_Precos.md`
- **Ajustar prompts:** Consultar `Perplexity/Framework_D1_D5_Guia_Completo.md`

---

## 📊 Stack Técnico Recomendado

| Componente | Tecnologia | Justificativa |
|------------|------------|---------------|
| **Plataforma Voice AI** | Retell AI | RAG automático <100ms latência |
| **LLM** | Qwen2.5-7b | Otimizado para PT-PT |
| **TTS** | ElevenLabs | Melhor qualidade PT-PT |
| **Backend** | Node.js + Supabase | Webhooks, blacklist, logs |
| **Knowledge Base** | 3-5 arquivos .md (~7MB) | RAG nativo |

---

## 🎯 Objetivo Final

Criar um **Voice AI SDR (Sales Development Representative)** chamado **Bruno** que:

1. ✅ Atende chamadas 24/7
2. ✅ Qualifica leads automaticamente
3. ✅ Agenda cortes/barbas
4. ✅ Responde FAQ
5. ✅ Escala para humano quando necessário
6. ✅ Protege contra abuso de tokens
7. ✅ Mantém tom conversacional PT-PT autêntico
8. ✅ Garante conformidade GDPR

---

## 📈 ROI Esperado

- **Economia com proteção anti-abuso:** €468-€860/ano
- **Conversão esperada:** 85%+ accuracy em FAQ
- **Satisfação cliente:** >8/10 NPS
- **Tempo de implementação:** 2-3 semanas
- **Custo operacional:** ~€0.13-€0.20/minuto

---

**Última Atualização:** 23 Janeiro 2026  
**Versão:** 2.0 (Estrutura reorganizada)
