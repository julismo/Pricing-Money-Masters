# **MANUAL DE OPERAÇÕES TÉCNICAS**

**Aplicável a:** Todos os serviços da agência  
**Documento Interno:** Leitura obrigatória para equipa técnica  
**Última atualização:** 29/01/2026  
**Versão:** 2.0 (Arquitetura Moltbot)

---

## **0. COMO USAR ESTE DOCUMENTO**

### **Para quem é este manual?**

**Técnicos em onboarding:** Ler sequencialmente seções 1-3 (filosofia + arquitetura) e depois consultar seções específicas.

**Developers em projeto:** Consultar seções técnicas quando necessário. SOPs detalhados estão no Miro.

**Gestão de projetos:** Focar seções 1, 2, 8 e 9 para compromissos com clientes.

### **O que este documento NÃO é**

* ❌ Tutorial passo-a-passo (SOPs)
* ❌ Checklist de tarefas (Miro)
* ❌ Substituto para perguntar ao chefe

### **O que este documento É**

* ✅ Mapa mental da arquitetura
* ✅ Explicação do **porquê** das decisões técnicas
* ✅ Contexto necessário para SOPs
* ✅ Ponte entre teoria e prática

---

## **1. FILOSOFIA E PRINCÍPIOS INEGOCIÁVEIS**

### **1.1 Os Três Pilares**

**1. Soberania do Cliente**  
Não vendemos acesso. Vendemos ativos. Cliente é proprietário da infraestrutura.

**2. Isolamento Absoluto**  
1 Cliente = 1 Servidor = Zero risco cruzado.

**3. Transferência de Controlo**  
Ao final do projeto, cliente recebe todas as credenciais e propriedade técnica.

### **1.2 Anti-SaaS: Por Que Somos Diferentes**

**Modelo tradicional (99% das agências):**
- Cliente paga mensalidade perpétua
- Infraestrutura pertence à agência
- Cliente para de pagar = perde tudo

**Nosso modelo:**
- Cliente contrata construção de infraestrutura
- Construímos em nome do cliente (Hetzner dele, APIs dele)
- Transferimos controlo total
- Manutenção é **opcional**

**Vantagens competitivas:**
1. Elimina vendor lock-in (maior objeção em vendas)
2. Cliente tem ativo tangível (melhora balanço contabilístico)
3. Margem 100% em manutenção (cliente paga servidor, nós só expertise)
4. Diferenciação brutal no mercado

### **1.3 Implicações Práticas**

**Reunião Raio-X (pré-projeto):**
- Explicar modelo de soberania
- Cliente fornece email corporativo + cartão de crédito
- Domínio próprio (ou ajudamos a registar)
- Estimativa de custos mensais (servidor + APIs)

**Pitch exemplo:**  
*"Construímos o sistema no teu servidor, não no nosso. Se amanhã terminarmos o contrato, o sistema continua a funcionar. Não ficas refém. A infraestrutura é tua, como comprar uma viatura em vez de alugar."*

---

## **2. ARQUITETURA EM CAMADAS (Brain-Arms-Interfaces)**

### **2.1 Visão Geral da Arquitetura**

**NOVA ESTRUTURA (desde Jan 2026):**

```
┌─────────────────────────────────────────────────┐
│  CAMADA 1: BRAIN (Inteligência & Decisões)      │
│  • Moltbot (Suporte ao Staff - em dev)          │
│  • Retell/Vapi (Atendimento ao Cliente Final)   │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│  CAMADA 2: ARMS (Execução & Automação)          │
│  • n8n (workflows)                               │
│  • APIs (Calendar, WhatsApp, SMS)                │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│  CAMADA 3: INTERFACES (Dados & Storage)          │
│  • PostgreSQL (database)                         │
│  • Redis (cache)                                 │
│  • Google Calendar, Sheets                       │
└─────────────────────────────────────────────────┘
```

### **2.2 Separação de Responsabilidades**

#### **BRAIN (Camada 1)**

**Voice AI (Retell/Vapi):**
- **Função:** Atender cliente final da barbearia
- **Escopo:** Ouve, transcreve, sintetiza voz
- **NÃO faz:** Lógica de negócio complexa

**Moltbot (🚧 Em Desenvolvimento):**
- **Função:** Suporte ao staff/dono da barbearia
- **Escopo:** Recebe comandos do dono (WhatsApp/Slack), interpreta, orquestra ações
- **Exemplo:** "João falta amanhã" → Bloqueia Calendar, avisa clientes, ajusta n8n
- **NÃO faz:** Atendimento ao cliente final (isso é Retell)

#### **ARMS (Camada 2)**

**n8n:**
- **Função:** Executar ações concretas
- **Escopo:** IF/ELSE, chamadas de API, mover dados
- **Recebe ordens de:** Moltbot ou Retell (via webhooks)
- **NÃO faz:** Tomar decisões complexas

#### **INTERFACES (Camada 3)**

**Databases & Storage:**
- PostgreSQL (dados estruturados)
- Redis (cache, sessões)
- Google Calendar, Sheets (ferramentas finais)

### **2.3 Fluxo de Exemplo: "Barbeiro Faltou"**

**Cenário:** Dono manda WhatsApp: "João falta sexta-feira"

```
Dono (WhatsApp) 
    ↓
Moltbot (interpreta: "bloquear agenda João + avisar clientes")
    ↓
n8n (executa):
    1. Vai ao Google Calendar → cria bloqueio
    2. Consulta DB → lista clientes agendados
    3. Envia SMS/WhatsApp aos clientes
    ↓
Cliente final recebe: "Olá! O João está indisponível sexta. 
                       Quer remarcar com outro barbeiro?"
```

**Nota:** Moltbot NÃO fala com cliente final. Só orquestra o backoffice.

---

## **3. REGRA DO ISOLAMENTO (SINGLE-TENANCY)**

**REGRA ABSOLUTA:** É proibido alojar múltiplos clientes no mesmo servidor.

### **3.1 Como Funciona**

❌ **ERRADO:**  
1 servidor Hetzner da agência com 5 Docker containers (1 por cliente)

✅ **CORRETO:**  
5 servidores Hetzner separados, cada um faturado no cartão do cliente

**Total custo:**
- Multi-tenancy: €12/mês (agência paga)
- Single-tenancy: €35/mês total (€0 para agência, clientes pagam)

### **3.2 Por Quê?**

1. **Problema do "vizinho barulhento":** Cliente A lança campanha, satura CPU, Cliente B fica offline
2. **Responsabilidade legal:** Se servidor cai, 5 clientes processam em vez de 1
3. **Performance garantida:** Recursos dedicados, sem contenção
4. **Segurança:** Breach num cliente não afeta outros

**Exceção única:** Ambientes de teste internos da agência (staging).

---

## **4. MOLTBOT: SUPORTE INTELIGENTE AO STAFF (🚧 EM DESENVOLVIMENTO)**

### **4.1 O Que É Moltbot**

**Definição:** Orquestrador open-source que fornece suporte 24h ao staff/dono da barbearia.

**O que NÃO é:**
- ❌ Substituto do Retell (cliente final continua a falar com Retell)
- ❌ Plataforma proprietária nossa
- ❌ LLM próprio (usa Claude/GPT por baixo)

**O que É:**
- ✅ Assistente do dono via WhatsApp/Slack
- ✅ Orquestrador de automações
- ✅ Executor de tarefas administrativas

### **4.2 Arquitetura Técnica**

```
Dono/Staff (WhatsApp Business)
    ↓
Moltbot Gateway (Node.js server)
    ↓
Claude API / GPT (raciocínio)
    ↓
Skills (browser, filesystem, calendar, n8n, etc.)
    ↓
Ações no sistema do cliente
```

**Hosting:**
- VPS adicional (~€10-20/mês) OU mesmo servidor do n8n
- Cada cliente tem instância isolada (ou workspace separado)

**Custo:**
- Software: Grátis (open-source)
- Servidor: ~€10-20/mês
- APIs: Mesmas que já pagas (Claude/GPT)

### **4.3 Casos de Uso**

#### **Uso 1: Gestão de Faltas**
**Input:** Dono manda "João falta amanhã"  
**Moltbot faz:**
1. Bloqueia agenda João no Calendar
2. Lista clientes agendados
3. Envia avisos via WhatsApp/SMS
4. Sugere redistribuição para outros barbeiros

#### **Uso 2: Ajustes de Automação**
**Input:** "Preciso que IA não marque às segundas de manhã"  
**Moltbot faz:**
1. Acede n8n via API
2. Ajusta workflow de disponibilidade
3. Testa mudança
4. Confirma com dono

#### **Uso 3: Relatórios**
**Input:** "Quantos cortes fizemos esta semana?"  
**Moltbot faz:**
1. Consulta PostgreSQL
2. Agrega dados
3. Gera relatório formatado

### **4.4 Limitações por Plano (Skills)**

**IMPORTANTE:** Moltbot tem skills limitadas conforme plano do cliente.

**Plano Básico (exemplo):**
```markdown
# Skills Permitidas
- Bloquear agenda (max 7 dias)
- Avisar clientes (SMS simples)
- Consultar agendamentos

# Skills Bloqueadas
- Criar automações n8n
- Modificar workflows
- Relatórios customizados
```

**Plano Premium:**
```markdown
# Skills Permitidas
- Tudo do Básico +
- Criar/modificar automações n8n
- Relatórios avançados
- Integrações externas
```

**Como funciona:**
- Moltbot lê ficheiros `SKILL.md` no deploy
- Se dono pede algo fora do plano → Responde: *"Esta funcionalidade está no Plano Premium"*
- Upsell automático

### **4.5 Deploy & Configuração (🚧 Em Definição)**

**Estado atual:** Arquitetura definida, implementação em curso.

**Quando estiver pronto:**
1. Instalar Moltbot via Docker (Coolify)
2. Conectar WhatsApp Business API do cliente
3. Configurar skills por plano
4. Limitar acesso (só Calendar + n8n do cliente)
5. Testar em staging antes de produção

**Segurança:**
- Moltbot só acede sistemas do próprio cliente
- Credenciais limitadas (não root)
- Logs de todas as ações

**Documentação adicional:** SOP "Deploy Moltbot" (será criado quando feature estiver estável)

---

## **5. LATÊNCIA E DATACENTERS**

### **5.1 Regra Ouro: <300ms de Latência**

**Para Voice AI:**
- Latência total: Servidor → API (GPT/Claude) → Cliente
- Alvo: <300ms (conversação natural)
- Limite crítico: >500ms (cliente percebe atraso)

### **5.2 Escolha de Datacenter por Região**

| Região Cliente | Datacenter | Latência Típica | Fornecedor |
|----------------|-----------|-----------------|------------|
| Portugal/Espanha | Hetzner Falkenstein (Alemanha) | 20-40ms | Hetzner |
| Brasil | Hostinger São Paulo | 10-30ms | Hostinger |
| EUA | AWS us-east-1 (Virginia) | 15-50ms | AWS |
| UK/Irlanda | Hetzner Helsinki (Finlândia) | 30-60ms | Hetzner |

**Como testar antes de provisionar:**
```bash
ping fsn1-dc14.hetzner.com  # Hetzner Alemanha
ping sao1.hostinger.com     # Hostinger Brasil
```

**Regra:** Se latência >100ms, escolher datacenter mais próximo do cliente.

---

## **6. STACK TÉCNICA OBRIGATÓRIA**

### **6.1 Backend & Orquestração**

**Coolify (Deployment Platform):**
- Docker orchestration
- Backups automáticos
- Rollback fácil
- HTTPS automático via Let's Encrypt

**n8n (Workflow Automation):**
- Versão self-hosted (nunca cloud)
- PostgreSQL como backend (nunca SQLite)
- Redis para queue management

### **6.2 Databases**

**PostgreSQL (OBRIGATÓRIO):**
- Mesmo para projetos pequenos
- Razão: Consistência, migrações futuras, reliability

**Redis (Cache & Sessions):**
- Sessões de WhatsApp (Evolution API)
- Cache de queries frequentes
- Queue de jobs

**❌ NUNCA SQLite em Produção:**
- Falha em concorrência
- Corrupção de dados
- Migração futura é pesadelo

### **6.3 Voice AI**

**Retell AI (Preferencial):**
- Latência mais baixa que Vapi
- Custo-benefício melhor
- Multilingue (PT-PT, PT-BR, EN)

**Vapi (Alternativa):**
- Features avançadas (function calling)
- Maior custo
- Usar quando cliente pede features específicas

**LLM Backend:**
- Claude Sonnet (conversas complexas)
- GPT-4o-mini (custo-benefício)
- Gemini Flash (velocidade, BR específico)

### **6.4 WhatsApp**

**Evolution API (OBRIGATÓRIO para WhatsApp):**
- Self-hosted
- Multi-device
- Redis para persistência de sessão

**❌ NUNCA Baileys direto:**
- Instável
- Banimentos frequentes
- Sem suporte multi-instância

---

## **7. VOICE AI: HUMANIZAÇÃO E PROMPTS**

### **7.1 Princípios de Humanização**

**O que torna IA "robótica":**
1. Respostas longas (>30 palavras)
2. Linguagem formal excessiva
3. Zero pausas/hesitações
4. Nunca usa "hm", "então", "vamos ver"

**Como humanizar:**

**Pausas Estratégicas:**
```
Cliente: "Tem horário hoje às 3?"
IA: "Deixa-me ver... [pausa 0.5s] Sim! Tenho vaga às 3 com o João."
```

**Linguagem Natural:**
```
❌ "Confirmo que possuímos disponibilidade no horário solicitado."
✅ "Tenho sim! Quer marcar?"
```

**Interjeições:**
```
"Hm... às 3 tá difícil, mas às 4 tenho uma vaga boa."
```

### **7.2 Estrutura de System Prompt**

**Template mínimo (adaptável):**

```markdown
# IDENTIDADE
És a recepcionista virtual da [Nome Barbearia].
Atende pelo nome [Nome].
Teu objetivo: agendar cortes de forma eficiente e amigável.

# TOM
- Informal mas profissional
- Usa "tu" em PT-PT, "você" em PT-BR
- Frases curtas (max 25 palavras)
- Pausas naturais: "então...", "vamos ver..."

# FUNÇÕES
1. Consultar agenda (via Google Calendar)
2. Marcar/cancelar cortes
3. Dar preços (Corte adulto: €15)

# RESTRIÇÕES
- NÃO marca fora do horário de funcionamento
- NÃO aceita agendamentos <2h de antecedência
- Se cliente pede barbeiro específico indisponível, sugere alternativa

# COMPORTAMENTO EM CASO DE DÚVIDA
"Deixa-me confirmar isso com a equipa. Podes deixar teu número?"
```

**Adaptar:** Cada barbearia tem tom diferente (mais descontraída, mais formal, etc.)

### **7.3 Testes Obrigatórios Antes de Produção**

**Checklist de validação (mínimo 10 chamadas):**

- [ ] IA entende PT-PT e PT-BR
- [ ] Responde em <2s (latência)
- [ ] Não interrompe cliente
- [ ] Confirma dados antes de marcar
- [ ] Lida com ruído de fundo
- [ ] Não entra em loop infinito
- [ ] Despede-se educadamente

**Casos edge a testar:**
- Cliente fala muito rápido
- Cliente muda de ideia no meio
- Cliente pede horário impossível
- Linha com muito ruído

---

## **8. SEGURANÇA E BACKUPS**

### **8.1 Cloudflare (OBRIGATÓRIO)**

**O que configurar:**
- DNS + Proxy (orange cloud)
- SSL/TLS Full (Strict)
- WAF (Web Application Firewall) ativado
- Rate limiting (200 req/min por IP)

**Por quê:**
- Protege contra DDoS
- Esconde IP real do servidor
- SSL gratuito e automático
- Cache de assets

### **8.2 Backups Automáticos**

**Frequência:**
- PostgreSQL: Diário (retention 7 dias)
- n8n workflows: Semanal (retention 4 semanas)
- Ficheiros (uploads): Semanal

**Onde armazenar:**
1. **Local** (mesmo servidor): Backup imediato
2. **S3/Backblaze** (cloud): Backup offsite (recomendado)

**Configurar via Coolify:**
- Settings → Backups → Enable
- Destino: S3 bucket do cliente (não nosso)

**Testar restore:**
- 1x por mês: fazer restore num ambiente de teste
- Se falhar, backup é inútil

### **8.3 Credenciais e Acessos**

**Hierarquia de acessos:**

1. **Cliente (Owner):**
   - Root SSH
   - Admin Coolify
   - Admin n8n
   - Todas as APIs

2. **Agência (Manutenção):**
   - User SSH (sem sudo)
   - Read-only em produção
   - Admin em staging

**Armazenamento de credenciais:**
- 1Password (partilhado com cliente)
- NUNCA em email ou WhatsApp
- NUNCA hardcoded em código

---

## **9. OFFBOARDING E MANUTENÇÃO**

### **9.1 Transferência de Controlo (Handover)**

**Checklist final antes de entregar projeto:**

- [ ] Cliente tem acesso root a servidor
- [ ] Todos os pagamentos apontam para cartão do cliente
- [ ] Documento de handover assinado
- [ ] Backups configurados e testados
- [ ] Cliente sabe como contactar suporte
- [ ] Proposta de manutenção apresentada

**Documento de handover (template no Miro):**
- Lista de todos os serviços e credenciais
- Custos mensais estimados
- Procedimentos de emergência
- Contactos de suporte

### **9.2 Contrato de Manutenção**

**O que ESTÁ incluído (base):**

- Monitorização 24/7 (uptime, erros)
- Updates de segurança (patches)
- Ajustes de prompts (até 2h/mês)
- Suporte técnico (<24h response)

**O que NÃO está incluído (cobrar extra):**

- Mudanças estruturais (novo serviço)
- Features novas
- Migrações de servidor
- Consultoria estratégica (>2h/mês)

**Estrutura de preços sugerida:**

| Complexidade | Mensalidade | Caso de Uso |
|--------------|-------------|-------------|
| Basic | €150/mês | n8n simples |
| Standard | €250/mês | Voice AI <500 chamadas/mês |
| Premium | €400/mês | Voice AI + WhatsApp + alto volume |

**Margem:**  
Cliente paga servidor (€12) + APIs (€50) = €62.  
Nós cobramos €250 manutenção = **margem líquida 100%** (só expertise).

### **9.3 Se Cliente Recusar Manutenção**

**Resposta profissional:**  
*"Sem problema! Tens total controle do sistema. Se no futuro precisares de suporte pontual, cobramos €80/hora. Ficamos à disposição."*

**Realidade:** 60-70% voltam em 2-6 meses.

---

## **10. FAQ E TROUBLESHOOTING**

### **10.1 Perguntas Frequentes**

**Q: Cliente tem orçamento <€50/mês. Podemos hospedar vários clientes num servidor?**

**A:** NÃO. Alternativas:
- Hostinger VPS básico (€4/mês)
- Declinar projeto
- Consultar chefe para exceção (rara)

**Q: Cliente no Brasil. Usar Hetzner Alemanha?**

**A:** NÃO.
- Usar Hostinger São Paulo
- Ou AWS São Paulo
- Latência Lisboa-Brasil: 180-220ms (inaceitável para voz)

**Q: Posso usar SQLite "só para este projeto pequeno"?**

**A:** NÃO.
- PostgreSQL mesmo em projetos pequenos
- Razão: Consistência, migrações futuras, reliability

**Q: Vapi lançou modelo novo. Posso mudar sem avisar cliente?**

**A:** NÃO.
1. Testar em staging
2. Propor mudança ao cliente
3. Só aplicar com aprovação

### **10.2 Troubleshooting Comum**

**Problema: Evolution API desconecta a cada 2h**

**Diagnóstico:** Redis não configurado ou crashou.

**Solução:**
1. Coolify → verificar status Redis
2. Se stopped, restart
3. Verificar logs: `docker logs redis`
4. Se persistir, aumentar memória Redis

---

**Problema: Latência voz subiu de 800ms para 2000ms**

**Diagnóstico em árvore:**
1. Verificar rede: `ping` servidor (>100ms = problema routing)
2. Verificar CPU/RAM: Coolify → Metrics (>90% = saturado)
3. Verificar logs Vapi: timeout/slow_response
4. Verificar n8n: queries SQL lentas

---

**Problema: IA dando respostas erradas**

**NÃO é problema técnico. É problema de prompt.**

**Processo:**
1. Pedir exemplos de conversa
2. Analisar onde prompt falhou
3. Ajustar System Prompt
4. Testar 10-20 chamadas
5. Deploy se validado

*95% de "IA burra" é prompt mal desenhado.*

---

### **10.3 Quando Escalar para Chefe**

**Escala imediatamente:**
- ✅ Perda de dados
- ✅ Downtime >4h sem solução
- ✅ Cliente ameaça cancelar
- ✅ Problema de segurança (hack)
- ✅ Dúvida sobre cobrar trabalho extra

**Tenta resolver internamente:**
- ⚠️ Problema de latência
- ⚠️ Ajuste de prompts
- ⚠️ Update quebrou algo (rollback)
- ⚠️ Cliente pede feature nova

**Nunca escales por preguiça de ler documento.**

---

## **11. CONCLUSÃO E PRÓXIMOS PASSOS**

### **11.1 Princípios Inegociáveis**

A tecnologia evolui (n8n hoje, outra ferramenta amanhã), mas princípios não mudam:

1. **Soberania do Cliente**
2. **Isolamento Técnico**
3. **Transferência de Controlo**

### **11.2 Roadmap Técnico (Q1-Q2 2026)**

**Em Desenvolvimento:**
- [ ] Moltbot (suporte ao staff) - estabilização + SOPs
- [ ] Skills por plano (Básico/Premium/Enterprise)
- [ ] Integração Moltbot ↔ n8n via API

**Em Avaliação:**
- [ ] Multi-tenancy controlado (workspaces isolados)
- [ ] Dashboard unificado para clientes
- [ ] Automação de deploy (IaC com Terraform)

**Estável (Produção):**
- [x] Retell Voice AI
- [x] n8n + PostgreSQL + Redis
- [x] Evolution API (WhatsApp)
- [x] Coolify (deployment)

### **11.3 Para Novos Membros**

Este documento é o teu norte verdadeiro. Quando tiveres dúvida:

1. Consulta seção relevante aqui
2. Verifica SOP no Miro
3. Se ainda não resolveu, falar com chefe

**Última palavra:**  
Não somos "operadores de ferramentas no-code". Somos **Engenheiros de Soluções** que constroem infraestrutura com segurança, performance e ética comercial.

---

**Próxima revisão:** Março 2026 ou quando Moltbot entrar em produção  
**Versão:** 2.0 (Arquitetura em Camadas + Moltbot)  
**Changelog:** Ver seção 12 para histórico de mudanças

---

## **12. CHANGELOG E HISTÓRICO DE VERSÕES**

### **v2.0 (29/01/2026) - Arquitetura Moltbot**

**Adições:**
- Seção 2: Nova arquitetura em 3 camadas (Brain/Arms/Interfaces)
- Seção 4: Moltbot (suporte ao staff) - em desenvolvimento
- Seção 4.4: Sistema de skills por plano
- Roadmap técnico Q1-Q2 2026

**Modificações:**
- Seção 1: Simplificada (menos verbosa, mantém técnico)
- Seção 7: Atualizada com exemplos de humanização
- Seção 10: FAQ reorganizado por prioridade

**Removido:**
- Verbosidade excessiva em filosofia (mantido essencial)
- Exemplos redundantes de pitch comercial

### **v1.0 (17/01/2026) - Baseline**
- Versão original
- Foco em Retell + n8n + PostgreSQL

---

*Documento vivo. Contribuições e feedback são bem-vindos via equipa técnica.*
