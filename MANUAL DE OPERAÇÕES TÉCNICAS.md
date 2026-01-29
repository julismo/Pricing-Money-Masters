# **MANUAL DE OPERAÇÕES TÉCNICAS**

**Aplicável a:** Todos os serviços da agência 

**Documento Interno:** Leitura obrigatória para equipa técnica

**Última atualização:** 17/01/2026

---

## **0\. COMO USAR ESTE DOCUMENTO**

### **Para quem é este manual?**

**Técnicos em onboarding:**  
 Ler sequencialmente da seção 1 à 8 para internalizar a filosofia e arquitetura da agência.

**Developers em projeto:**  
Consultar secções específicas quando surgir dúvida conceptual. Para execução prática, consultar SOPs no Miro.

**Gestão de projetos:**  
 Focar nas secções 1, 2, 7 e 8 para entender compromissos com clientes e modelo de entrega.

### **O que este documento NÃO é**

* ❌ Um tutorial passo-a-passo (isso está nos SOPs)  
* ❌ Um checklist de tarefas (isso está no Miro)  
* ❌ Um substituto para perguntar ao chefe de equipa

### **O que este documento É**

* ✅ O **mapa mental** da nossa arquitetura  
* ✅ A explicação do **porquê** fazemos as coisas assim  
* ✅ O **contexto** necessário para entender as decisões técnicas  
* ✅ A **ponte** entre teoria e os SOPs práticos

### **Quando consultar?**

**Antes de iniciar qualquer projeto:** Secções 1-2 (filosofia e isolamento)  
 **Ao provisionar servidor:** Secção 3 (latência e datacenters)  
 **Durante setup de automação:** Secções 4-5 (Coolify e stack de dados)  
 **Em projetos de Voice AI:** Secção 6 (Vapi e humanização)  
 **Na entrega ao cliente:** Secção 8 (offboarding e manutenção)  
 **Em caso de dúvida não coberta:** Secção 9 (FAQ) → Chefe de equipa

---

## **1\. PREÂMBULO E FILOSOFIA DE ENGENHARIA**

### **1.1 Os Três Pilares Inegociáveis**

Antes de qualquer decisão técnica, internalizamos três princípios:

**1\. Soberania do Cliente**  
 Não vendemos acesso. Vendemos ativos. O cliente é proprietário da infraestrutura.

**2\. Isolamento Absoluto**  
 Um cliente nunca compartilha recursos com outro. 1 Cliente \= 1 Servidor \= Zero risco cruzado.

**3\. Transferência de Controlo**  
 Ao final do projeto, o cliente recebe todas as credenciais e propriedade técnica.

### **1.2 O Paradigma da "Soberania do Cliente" (Anti-SaaS)**

#### **O Modelo Tradicional (SaaS) e Os Seus Problemas**

**Como funciona o mercado:**  
 99% das agências operam num modelo de "aluguer perpétuo". O cliente paga mensalmente para usar uma plataforma que pertence à agência. Se parar de pagar, perde tudo.

**Exemplos comuns:**

* Chatbot numa plataforma proprietária da agência  
* Voice AI num servidor multi-tenant gerido pela agência  
* Automações N8N hospedadas na infraestrutura da agência

**Por que isto é problemático para o cliente?**

**Risco de Dependência Total (Vendor Lock-in)**  
 Se a agência aumentar preços, o cliente não tem alternativa. Migrar é tecnicamente impossível sem reconstruir tudo.

**Risco de Continuidade**  
 Se a agência fechar ou entrar em litígio, o sistema para imediatamente. O cliente fica sem recepcionista virtual, sem automações, sem nada.

**Falta de Transparência**  
 O cliente não sabe o que está a pagar. "Plataforma de Voice AI €500/mês" — mas quanto custa o servidor? E as APIs? Está a pagar 5x o custo real?

#### **O Nosso Modelo: Construção e Transferência de Ativos**

**O que vendemos:**  
 Arquitetamos e construímos infraestrutura personalizada que se torna **propriedade legal e técnica do cliente**.

**Fluxo operacional:**

1. Cliente contrata serviço (Voice AI, automação, etc.)  
2. Construímos infraestrutura **em nome do cliente** (conta Hetzner dele, domínio dele, APIs dele)  
3. Avaliamos operação em produção  
4. **Transferimos "A Chave do Castelo"** — credenciais root, acessos admin, documentação completa  
5. Cliente decide se quer manutenção contínua (opcional) ou gerir sozinho

#### **Por que Fazemos Isto? (Vantagens Competitivas)**

**1\. Eliminação do Risco de "Lock-in"**

Quando apresentar proposta ao cliente, uma das maiores objeções é:  
 *"E se eu quiser mudar de fornecedor no futuro? Fico preso?"*

Com a nossa abordagem, a resposta é:  
 *"A infraestrutura é tua desde o primeiro dia. Se decidires terminar o contrato connosco, tens total controlo do sistema. Podes contratar outro developer, gerir internamente, ou manter tudo como está. Não depende de nós para o sistema continuar a funcionar."*

**Isto remove a objeção mais comum em vendas de automação/IA.**

**2\. Valor Percebido Exponencialmente Maior**

Não vendemos "horas de consultoria" ou "licença mensal de software".  
 Vendemos um **ativo digital tangível** que o cliente pode:

* Revender se vender o negócio  
* Modificar internamente se contratar developer próprio  
* Manter indefinidamente sem custos recorrentes para nós

**Exemplo real:**  
 Barbearia compra Voice AI por €3.000. Na contabilidade, isto é um **ativo imobilizado**, não despesa operacional. Melhora o balanço da empresa.

**3\. Diferenciação Brutal no Mercado**

Quando cliente compara propostas:

* **Agência A:** "€500/mês, usa a nossa plataforma"  
* **A nossa agência:** "€3.000 setup \+ €150/mês manutenção opcional, infraestrutura é tua"

Mesmo que o total seja similar (€500/mês vs €400/mês amortizado), a **perceção de propriedade** faz o cliente escolher-nos.

**4\. Margem Limpa em Manutenção**

Se o cliente pagar o servidor (€7-15/mês) e APIs (€20-50/mês), o nosso contrato de manutenção (€150-300/mês) é **margem líquida de 100%**.

Não temos custos de infraestrutura escondidos. Só prestamos serviço especializado: monitorização, atualizações, ajustes de prompts.

#### **O Que Isto Exige de Nós?**

**Transparência Total**  
 Temos de explicar ao cliente exatamente o que ele está a pagar em cada serviço externo (Hetzner, OpenAI, Twilio).

**Documentação Impecável**  
 Não podemos entregar "um sistema que só nós sabemos mexer". Temos de documentar tudo.

**Qualidade Acima de Atalhos**  
 Se cortarmos cantos (tipo SQLite em vez de Postgres), o sistema falha depois de nós sairmos. Isto destrói a reputação.

### **1.3 Implicações Práticas Desta Filosofia**

#### **Reunião Raio-X com Cliente (Pré-Projeto)**

Antes de provisionar qualquer infraestrutura, agenda reunião para explicar o modelo de soberania.

**Objetivo da reunião:**  
 Garantir que cliente entende que será proprietário e precisa fornecer:

* E-mail corporativo para conta de servidor (Hetzner/Hostinger)  
* Cartão de crédito corporativo para faturação direta  
* Domínio próprio (ou ajudamos a registar)

**Informações a preparar antes da reunião:**

* Estimativa de custos mensais de infraestrutura (servidor \+ APIs)  
* Explicação de porque o cartão precisa estar em nome dele  
* Garantia de que terá controlo total ao final do projeto

*Como conduzir esta reunião na prática? Consulta SOP "Onboarding Técnico \- Reunião Raio-X" no Miro.*

#### **Exemplo de Pitch para Cliente**

*"Vamos construir o sistema de Voice AI não no nosso servidor, mas no teu. Porquê? Porque se amanhã decidirmos terminar o contrato de manutenção connosco, o sistema continua a funcionar. Não ficar refém de ninguém. A infraestrutura é tua, como se fosse comprar uma viatura em vez de alugar. Vamos precisar dos teus dados de pagamento, mas serás cobrado diretamente pela Hetzner (o fornecedor de servidores), não por nós."*

---

## **2\. A DOUTRINA DO ISOLAMENTO DE INFRAESTRUTURA (SINGLE-TENANCY)**

**Esta é a regra técnica mais importante do documento. Violá-la compromete a segurança, performance e responsabilidade financeira.**

### **2.1 A Regra de Um-para-Um (1 Cliente \= 1 VPS)**

**REGRA ABSOLUTA:**  
 É terminantemente proibido alojar múltiplos clientes no mesmo servidor (VPS) da agência.

#### **O Que Isto Significa?**

**Cenário com 5 clientes:**

❌ **ERRADO (Multi-Tenancy):**  
 1 servidor Hetzner da agência (€12/mês) com 5 contentores Docker (um por cliente)

✅ **CORRETO (Single-Tenancy):**  
 5 servidores Hetzner separados (€7/mês cada), cada um faturado no cartão do respetivo cliente

**Total de custo:**

* Multi-tenancy: €12/mês para agência  
* Single-tenancy: €35/mês total, mas €0/mês para agência (clientes pagam diretamente)

#### **Exceção Única: Ambientes de Teste Internos**

Servidores de **staging/desenvolvimento interno** da agência podem partilhar infraestrutura.

**Exemplo aceitável:**  
VPS da agência com ambiente de testes para 3 projetos em desenvolvimento antes de ir para produção.

**Regra:**  
Assim que projeto vai para **produção** (cliente a usar), isolamento obrigatório.

### **2.2 Por Que Esta Regra Existe? (Justificações Técnicas e Comerciais)**

#### **2.2.1 O Problema do "Vizinho Barulhento" (Resource Contention)**

**Cenário real que já aconteceu:**

Barbearia A lança campanha no Instagram: "Marque corte por WhatsApp".  
300 pessoas enviam mensagem ao mesmo tempo.  
O servidor partilhado satura CPU a 100%.  
O Sistema da Clínica Dentária B (que está no mesmo servidor) fica lento ou cai.

**Com isolamento:**  
Cada cliente tem CPU, RAM e disco **garantidos**. O pico de tráfego de A não afeta B.

**Comparação com imobiliário:**

| Multi-Tenancy | Single-Tenancy |
| ----- | ----- |
| Apartamento partilhado | Casa própria |
| Se vizinho da festa, afeta-te | Festa não te afeta |
| Bandwidth partilhada | Bandwidth dedicada |
| Performance imprevisível | Performance previsível |

**Para explicar ao cliente:**  
*"É como morar numa casa própria ou partilhar apartamento. Se o teu vizinho tiver pico de uso, não te afeta. Performance é sempre consistente."*

#### **2.2.2 Responsabilidade Financeira (Quem Paga? Quem Assume Risco?)**

**PRINCÍPIO FUNDAMENTAL:**  
 A agência **nunca** deve atuar como intermediário bancário de custos de nuvem.

**Modelo errado (que algumas agências fazem):**

1. Agência paga Hetzner €100/mês por servidor grande  
2. Agência cobra €30/mês de cada cliente (5 clientes \= €150/mês)  
3. Agência tem margem de €50/mês

**Problemas deste modelo:**

**Se 1 cliente não pagar:**  
A Agência continua a pagar €100/mês à Hetzner, mas só recebe €120/mês (4 clientes). Margem cai para €20/mês.

**Se 2 clientes saírem:**  
A Agência paga €100/mês, recebe €90/mês. **Prejuízo de €10/mês**.

**Se agência precisar migrar cliente:**  
Cliente reclama: "Eu pago por servidor, quero os dados". A Agência tem de fazer uma migração complexa.

**Modelo correto (o nosso):**

Cada cliente tem cartão de crédito associado ao servidor desde dia 1\.

**O que acontece se o cliente não pagar?**  
Hetzner desliga o servidor dele automaticamente após 7 dias. O problema é do cliente, não nosso.

**O que acontece se cliente sair?**  
Entregamos credenciais (que ele já tem). Zero trabalho de migração.

**Benefício:** Zero risco financeiro para agência.

#### **2.2.3 Conformidade de Dados (GDPR/RGPD)**

**Contexto legal:**

O RGPD (Regulamento Geral de Proteção de Dados) é lei europeia desde 2018\.  
 Multas podem chegar a €20 milhões ou 4% do faturamento global.

**Artigo 32 do RGPD:**  
*"O responsável pelo tratamento deve implementar medidas técnicas adequadas para garantir a segurança dos dados pessoais."*

**Risco de multi-tenancy:**

Se base de dados PostgreSQL tem:

* Schema `barbearia_a` com conversas de clientes  
* Schema `clinica_b` com dados médicos de pacientes

Um erro de SQL (ex: `SELECT * FROM public.conversas` em vez de `SELECT * FROM barbearia_a.conversas`) pode **expor dados entre clientes**.

**Com isolamento físico:**  
 Base de dados de A está em servidor X (IP 192.168.1.1)  
 Base de dados de B está em servidor Y (IP 192.168.1.2)

**Impossível** haver "vazamento" entre clientes. É fisicamente separado.

**Para explicar ao cliente:**  
*"Os teus dados nunca tocam nos dados de outros clientes. Estão em servidores fisicamente diferentes. É impossível haver cruzamento."*

#### **2.2.4 Facilidade de Saída (Exit Strategy)**

**Cenário comum:**  
 Cliente usa sistema durante 1 ano, depois decide não renovar manutenção.

**Se estiver no nosso servidor:**

1. Temos de fazer backup completo  
2. Provisionar novo servidor em nome dele  
3. Migrar base de dados (downtime de 2-6 horas)  
4. Transferir domínios e certificados SSL  
5. Testar tudo  
6. Cliente fica insatisfeito com processo complexo

**Tempo:** 1-2 dias de trabalho técnico  
 **Risco:** Migração pode falhar, cliente perde dados  
 **Custo emocional:** Cliente sai frustrado, má reputação

**Se estiver no servidor dele desde início:**

1. Enviamos PDF com credenciais (que ele já tem cópia)  
2. Dizemos "Boa sorte, estamos aqui se precisares de suporte pontual"  
3. Cliente agradece pela transparência

**Tempo:** 5 minutos  
 **Risco:** Zero  
 **Custo emocional:** Cliente sai feliz, recomenda-nos

**Benefício comercial:**  
 Clientes que saem felizes são os melhores embaixadores. "Esta agência foi tão profissional que até quando saí, entregaram tudo organizado."

### **2.3 Como Garantir Isolamento na Prática?**

#### **Provisionamento de Conta de Servidor**

**Momento:** Logo após assinatura de contrato e reunião Raio-X.

**Informações necessárias do cliente:**

* E-mail corporativo (ou criamos `infraestrutura@empresa-cliente.pt`)  
* Cartão de crédito corporativo (aceita cartão virtual temporário)  
* Confirmação de que entende que será cobrado diretamente

**Onde criar conta:**

* **Hetzner:** console.hetzner.cloud (recomendado para 90% dos casos)  
* **Hostinger:** hpanel.hostinger.com (apenas se cliente já usar Hostinger)

**Quem é o "owner" da conta?**  
 Cliente. Nós temos acesso como "collaborator" ou via SSH key, mas ownership legal é do cliente.

**Documentação:**  
 Guardar credenciais em cofre partilhado (Bitwarden da equipa) \+ enviar cópia ao cliente.

*Para procedimento detalhado de criação de conta, consulta SOP "Provisionamento de VPS \- Hetzner/Hostinger" no Miro.*

#### **Template de E-mail para Cliente (Exemplo Ilustrativo)**

Assunto: Configuração de Infraestrutura — \[Nome do Projeto\]

Olá \[Nome\],

Conforme conversamos na reunião Raio-X, para garantir que és proprietário da infraestrutura desde o primeiro dia, vamos precisar de:

1\. \*\*E-mail para conta de servidor\*\*    
   Pode ser o teu e-mail corporativo (ex: ti@tua-empresa.pt) ou criamos um dedicado (ex: infraestrutura@tua-empresa.pt). Esta conta ficará registada na Hetzner.

2\. \*\*Cartão de crédito corporativo\*\*    
   Será associado à conta Hetzner. Custo estimado: €7-12/mês (servidor) \+ €20-50/mês (APIs de voz/IA).    
   Importante: Serás cobrado diretamente pela Hetzner, não por nós.

3\. \*\*Confirmação de domínio\*\*    
   Vais usar domínio existente (ex: tua-empresa.pt) ou precisas que registremos um novo?

\*\*Por que pedimos isto?\*\*    
Porque ao final do projeto, entregaremos todas as credenciais. Mesmo que deixes de trabalhar connosco, o sistema continua operacional no teu servidor.

Podes confirmar estes dados até \[data\]?

Abraço,    
\[Teu Nome\]    
\[Nome da Agência\]

---

## **3\. INFRAESTRUTURA FÍSICA: LATÊNCIA E GEOLOCALIZAÇÃO**

**Para sistemas de voz, latência é a diferença entre "parece humano" e "parece robô".**

### **3.1 A Física da Voz Conversacional**

#### **O Que É Latência?**

**Definição técnica:**  
 Latência é o tempo (em milissegundos) que um pacote de dados leva a viajar do ponto A ao ponto B e voltar.

**Medição:**  
 RTT (Round-Trip Time) \= Tempo de ida \+ Tempo de volta

**Exemplo:**  
 Cliente em Lisboa liga para Voice AI em servidor em Frankfurt.  
 Sinal de voz viaja Lisboa → Frankfurt → processado → Frankfurt → Lisboa.  
 Se isto demorar 300ms, a latência é 300ms.

#### **Componentes da Latência Total em Voice AI**

Quando cliente faz pergunta à IA, a resposta passa por múltiplas etapas:

**1\. Latência de rede (cliente ↔ servidor):** 30-500ms  
 Depende da distância física entre cliente e datacenter.

**2\. Transcrição de voz para texto (Deepgram/AssemblyAI):** 200-400ms  
 IA converte áudio em texto.

**3\. Processamento da resposta (OpenAI/Claude):** 800-2000ms  
 Modelo de linguagem gera resposta.

**4\. Síntese de texto para voz (ElevenLabs/OpenAI TTS):** 200-400ms  
 IA converte texto em áudio.

**5\. Latência de rede (servidor ↔ cliente):** 30-500ms  
 Áudio viaja de volta para cliente.

**TOTAL:** 1260-3800ms (1.3-3.8 segundos)

#### **Por Que 500ms de Rede Destroem a Experiência?**

**Em sistemas de texto (chatbot):**  
 Utilizador envia mensagem → vê "..." a piscar → recebe resposta.  
 Latência de 1-2 segundos é **aceitável**.

**Em sistemas de voz (telefonema):**  
 Utilizador faz pergunta → espera resposta → ...

Se latência \>500ms:

* **Sobreposição de fala:** Cliente pensa que IA não ouviu, começa a repetir pergunta  
* **Sensação de "chamada via satélite":** Lembras-te de chamadas internacionais nos anos 90? Esse delay constante  
* **Perda de confiança:** Cérebro humano deteta que "algo está errado", mesmo sem saber o quê

#### **Benchmark da Experiência Humana**

| Latência | Perceção | Exemplo |
| :---: | :---: | :---: |
| \<200ms | Imperceptível | Conversa presencial |
| 200-300ms | Natural | Chamada telefónica normal |
| 300-500ms | Aceitável | Leve pausa, mas tolerável |
| 500-800ms | Notável | Começa a parecer "robótico" |
| \>800ms | Inaceitável | Cliente desliga ou reclama |

**Objetivo da agência:**  
 Manter latência de rede sempre **\<200ms** para deixar margem de 600-1000ms para processamento de IA (que não controlamos).

### **3.2 Como a Localização do Servidor Afeta a Latência?**

#### **A Lei da Física**

A luz (sinais elétricos em fibra ótica) viaja a \~200.000 km/s.  
 Mas na prática, redes adicionam overhead (roteamento, switches).  
 Velocidade real: \~150.000 km/s.

**Fórmula simplificada:**  
 Latência mínima teórica \= (Distância em km × 2\) / 150.000 km/s × 1000 \= X ms

**Exemplos:**

Lisboa → Frankfurt (2.000 km):  
 (2000 × 2\) / 150000 × 1000 \= **26ms teórico**  
 Na prática: **35-50ms** (overhead de roteamento)

Lisboa → São Paulo (8.000 km):  
 (8000 × 2\) / 150000 × 1000 \= **106ms teórico**  
 Na prática: **180-250ms** (+ cabos submarinos \+ routing)

#### **Latências Reais Medidas (Testes Internos)**

Fizemos ping tests de Lisboa para vários datacenters:

| Datacenter | Distância | Latência Real | Avaliação |
| ----- | ----- | ----- | ----- |
| Hetzner Frankfurt | 2.300 km | 35-45ms | ✅ Excelente |
| Hetzner Nuremberg | 2.200 km | 35-45ms | ✅ Excelente |
| Hostinger Paris | 1.400 km | 30-40ms | ✅ Excelente |
| Hostinger Amsterdam | 1.900 km | 40-50ms | ✅ Muito Bom |
| AWS Frankfurt | 2.300 km | 45-55ms | ✅ Bom |
| Hostinger São Paulo | 8.000 km | 180-220ms | ❌ Inaceitável |
| AWS N. Virginia (EUA) | 5.800 km | 90-120ms | ⚠️ Marginal |
| Hostinger Singapura | 11.000 km | 280-350ms | ❌ Inaceitável |

**Conclusão:**  
 Para clientes em Portugal, servidor **tem** de estar na Europa Central (Alemanha, França, Holanda).

### **3.3 Seleção de Datacenter para o Mercado Português**

**Premissa:** 90% dos nossos clientes operam em Portugal (Lisboa, Porto, Coimbra).

#### **Padrão Ouro: Hetzner Cloud (Alemanha)**

**Datacenters disponíveis:**

* **Nuremberg (NBG1)** — Recomendado por padrão  
* **Falkenstein (FSN1)** — Equivalente, escolher se NBG1 estiver em manutenção  
* Helsinki (HEL1) — **Não usar** para Portugal (latência 60-80ms)

**Por que Hetzner domina?**

**1\. Localização Geográfica Ótima**

A Alemanha é o **hub central** da internet europeia.  
 DE-CIX (Frankfurt) é a maior Internet Exchange Point do mundo (\>11 Terabits/s).  
 Todos os ISPs portugueses (MEO, NOS, Vodafone) têm rotas diretas para Frankfurt.

**Resultado:** Latência Lisboa-Frankfurt consistentemente \<50ms.

**2\. Hardware de Última Geração**

**CPUs:** AMD EPYC (Zen 3/4)  
 Performance por core superior a Intel Xeon equivalente. Importante para N8N que usa single-thread.

**Discos:** NVMe Gen4  
 Leitura: 7000 MB/s vs 550 MB/s de SSD SATA.  
 Crítico para base de dados PostgreSQL (queries rápidas).

**Rede:** 20 Gbps simétricos  
 Mais que suficiente para 1000s de chamadas VoIP simultâneas.

**3\. Custo Imbatível**

Comparação (Janeiro 2026):

| Fornecedor | vCPU | RAM | Disco | Preço/mês |
| ----- | ----- | ----- | ----- | ----- |
| Hetzner CX21 | 2 | 4GB | 40GB NVMe | €5.83 |
| Hetzner CX31 | 2 | 8GB | 80GB NVMe | €11.66 |
| AWS t3.small | 2 | 2GB | 20GB SSD | €15.00 |
| DigitalOcean | 2 | 4GB | 80GB SSD | €24.00 |

Para projetos de Voice AI standard, **CX21 é suficiente** (até 200 chamadas/dia).  
 Para alto volume (\>500 chamadas/dia), usar **CX31**.

**4\. Estabilidade Comprovada**

Uptime médio (medido internamente em 2025): **99.96%**  
 Downtime anual: \~3.5 horas (maioria em manutenções programadas).

Raramente vemos downtime não planeado. Quando acontece, suporte responde em \<30min.

**5\. Suporte Técnico Competente**

Ao contrário de AWS/Azure (suporte básico \= ticket com 24h de resposta), Hetzner tem:

* Suporte via chat em horário europeu  
* Documentação em alemão/inglês de alta qualidade  
* Comunidade ativa (forum.hetzner.com)

**Quando Usar Hetzner:**

* ✅ Projeto é Voice AI (latência crítica)  
* ✅ Cliente não tem preferência de fornecedor  
* ✅ Orçamento cliente suporta €6-12/mês de servidor  
* ✅ Equipa técnica confortável com SSH/linha de comando

#### **Alternativa: Hostinger VPS (Casos Específicos)**

**⚠️ AVISO CRÍTICO:**  
 Hostinger tem datacenters no **mundo todo**. Escolher errado \= latência inaceitável.

**Datacenters aceitáveis para Portugal:**

* ✅ **França (Paris)** — Primeira escolha  
* ✅ **Holanda (Amesterdão)** — Segunda escolha  
* ⚠️ Reino Unido (Londres) — Aceitável, mas pós-Brexit routing pode ser pior  
* ❌ **Brasil (São Paulo)** — **NUNCA** para clientes portugueses  
* ❌ **EUA (qualquer)** — **NUNCA** para clientes portugueses  
* ❌ **Ásia (qualquer)** — **NUNCA** para clientes portugueses

**Quando Escolher Hostinger em Vez de Hetzner?**

**Cenário 1: Cliente Já Usa Hostinger**  
 Se o cliente tem website/e-mail na Hostinger, faz sentido consolidar a faturação.  
 Evita gerir múltiplos fornecedores.

**Cenário 2: Cliente Quer Painel Visual (cPanel)**  
 Hetzner é "raw VPS" (SSH \+ linha de comando).  
 Hostinger oferece cPanel/Plesk para clientes não-técnicos que queiram gerir emails/domínios.

**Cenário 3: Projeto Piloto de Baixíssimo Custo**  
 Hostinger tem planos de €4/mês (2GB RAM).  
 Útil para **provas de conceito** antes de o cliente aprovar o projeto completo.

**Atenção:** 2GB RAM é marginal para Voice AI. Só usar para testes, nunca produção.

**Custo Hostinger (2026):**  
 VPS KVM 2 (4GB RAM): \~€8-10/mês  
 VPS KVM 4 (8GB RAM): \~€15-18/mês

**Quando Usar Hostinger:**

* ✅ Cliente já tem infraestrutura Hostinger  
* ✅ Cliente insiste em painel visual (não quer SSH)  
* ✅ Projeto é automação simples N8N (não Voice AI)  
* ✅ Orçamento muito apertado (\<€6/mês)

#### **Provedores Que NUNCA Usamos (E Porquê)**

**AWS/Azure/Google Cloud:**  
 Complexidade excessiva \+ custo 3-5x superior sem benefício para nosso caso de uso.  
 Só fazem sentido para empresas com centenas de servidores.

**Shared Hosting (ex: Hostinger Shared):**  
 Performance imprevisível. CPU/RAM limitados. Impossível correr Docker/Coolify.

**VPS "Baratos" Duvidosos (ex: Contabo, OVH Low-End):**  
 Overselling agressivo (vendem mais recursos que têm).  
 Performance inconsistente. Suporte inexistente.

### 

### **3.4 Árvore de Decisão: Escolher Datacenter**

Cliente em Portugal?  
├─ SIM  
│  ├─ Projeto é Voice AI?  
│  │  ├─ SIM → Hetzner Nuremberg (NBG1) ✅  
│  │  └─ NÃO → Hetzner Nuremberg OU Hostinger Paris  
│  └─ Cliente já usa Hostinger?  
│     ├─ SIM → Hostinger Paris (garantir\!) ✅  
│     └─ NÃO → Hetzner Nuremberg ✅  
└─ NÃO  
   └─ Cliente em Brasil?  
      ├─ SIM → Hostinger São Paulo ✅  
      └─ Consultar chefe de equipa (caso raro)

*Para procedimento técnico de criação de VPS, consulta SOP "Aprovisionamento de VPS \- Hetzner" no Miro.*

---

## **4\. CAMADA DE ORQUESTRAÇÃO: COOLIFY (PAAS PRIVADA)**

**Abandonamos a gestão manual de servidores (SSH raw \+ Docker Compose) em favor de uma interface que torna operações visíveis e auditáveis.**

### **4.1 O Problema da Gestão Manual**

#### **Como Agências Amadoras Operam**

**Setup tradicional sem Coolify:**

1. Aceder servidor via SSH: `ssh root@192.168.1.1`  
2. Instalar Docker manualmente  
3. Criar ficheiros `docker-compose.yml` para cada serviço  
4. Configurar Nginx como proxy reverso  
5. Gerar certificados SSL via Let's Encrypt manualmente  
6. Configurar renovação automática de SSL via cron job  
7. Monitorizar logs fazendo `docker logs -f container_name`  
8. Fazer backup manual de base de dados via script

**Problemas deste approach:**

**Invisibilidade:**  
 Ninguém, exceto quem configurou, sabe quantos serviços estão a correr.  
 "Onde está o N8N? Na porta 5678? Ou 5679? Ou...?"

**Fragilidade:**  
 Certificado SSL expira, site fica HTTPS inválido.  
 Ninguém percebe porque sistema parou de funcionar.

**Impossível de Transferir:**  
 Cliente recebe credenciais root, mas não tem interface visual.  
 Fica perdido ao tentar ver "o que está instalado".

**Zero Auditoria:**  
 "Quem reiniciou o container às 3h da manhã?" → Impossível saber.

### **4.2 O Que É o Coolify?**

**Definição:**  
 Coolify transforma uma VPS "raw" (sem interface) num **PaaS privado** tipo Vercel/Heroku/Railway, mas self-hosted.

**Analogia:**  
 É como dar ao servidor um "painel de controlo" tipo WordPress, mas para containers e serviços backend.

**Tecnicamente:**  
 Coolify é uma aplicação web (em Laravel \+ Docker) que gere:

* Criação/destruição de containers  
* Proxy reverso (Traefik)  
* Certificados SSL (Let's Encrypt automático)  
* Volumes de dados persistentes  
* Logs centralizados  
* Backups agendados

### **4.3 Por que usamos Coolify? (Benefícios Concretos)**

#### **4.3.1 Auditoria Visual (Para Cliente e Equipa)**

**Interface gráfica mostra:**

* Quantos serviços estão a correr (N8N, PostgreSQL, Redis, Evolution API)  
* Status de cada um (running, stopped, crashed)  
* Uso de recursos (CPU, RAM, disco)  
* Logs em tempo real

**Benefício para cliente:**  
 Ao receber propriedade, ele **vê visualmente** o que está instalado.  
 "Ah, tenho N8N, uma base de dados PostgreSQL, e Evolution API. Entendo."

**Benefício para equipa:**  
 Qualquer técnico consegue fazer troubleshooting sem perguntar "quem configurou isto?".

#### **4.3.2 Proxy Reverso Automático (Traefik)**

**O que é proxy reverso?**

Servidor tem 1 IP (ex: 192.168.1.1), mas múltiplos serviços:

* N8N quer rodar na porta 5678  
* PostgreSQL na porta 5432  
* Evolution API na porta 8080

**Sem proxy:**  
 Cliente teria de aceder `http://192.168.1.1:5678` (feio \+ inseguro).

**Com Traefik (gerido pelo Coolify):**  
 Coolify configura automaticamente:

* `cerebro.barbearia.com` → redireciona internamente para porta 5678 (N8N)  
* `whatsapp.barbearia.com` → redireciona para porta 8080 (Evolution API)

**Tudo em HTTPS automático** (certificado SSL renovado a cada 90 dias).

#### **4.3.3 Auto-Recuperação (Self-Healing)**

**Cenário real:**

N8N está a processar 500 webhooks simultaneamente.  
 RAM satura (4GB usados de 4GB disponíveis).  
 Container do N8N crasha.

**Sem Coolify:**  
 O sistema fica offline. Alguém tem de aceder via SSH e fazer `docker restart n8n`.  
 Se for 3h da manhã, o cliente fica sem sistema até o técnico acordar.

**Com Coolify:**  
 Orquestrador deteta que container morreu.  
 Reinicia automaticamente em 5-10 segundos.  
 O cliente nem percebe que houve falha.

**Uptime real:** 99.9% vs 99.5% (parece pouco, mas são 4 horas/ano de diferença).

#### **4.3.4 Backups Simplificados**

**Coolify permite configurar:**

* Backup automático de volumes (dados do N8N, PostgreSQL)  
* Agendamento (ex: todos os dias às 3h da manhã)  
* Retenção (manter últimos 7 backups, apagar mais antigos)  
* Destino (local ou S3-compatible storage)

**Sem isto:**  
 Técnico tem de criar script bash personalizado \+ cron job.  
 99% de chance de esquecer ou configurar errado.

### **4.4 Arquitetura Interna do Coolify (Como Funciona)**

**Componentes:**

**1\. Coolify Core (Laravel App)**  
 Interface web em PHP que corre como container Docker.  
 Gere a configuração de outros containers.

**2\. Traefik (Proxy Reverso)**  
 Recebe todo tráfego HTTP/HTTPS.  
 Roteia para container correto baseado em domínio.  
 Gere certificados SSL via Let's Encrypt.

**3\. Docker Engine**  
 Motor que corre containers (N8N, Postgres, Redis, etc.).

**4\. PostgreSQL (Base de Dados do Coolify)**  
 Onde Coolify guarda configurações (quais serviços existem, domínios, etc.).

**Fluxo de deploy de um serviço:**

1. Técnico acede Coolify web interface  
2. Clica "New Resource" → "Docker Compose"  
3. Cola configuração (ex: `n8n:latest`)  
4. Define domínio (ex: `cerebro.barbearia.com`)  
5. Coolify cria container \+ configura Traefik \+ gera SSL  
6. Serviço fica acessível em `https://cerebro.barbearia.com`

**Tempo:** 2-3 minutos vs 30-60 minutos configurando manualmente.

### **4.5 Quando NÃO Usar Coolify?**

**Cenário 1: Cliente Quer Kubernetes**  
 Se o cliente é uma empresa grande (\>50 serviços), Coolify não escala.  
 Recomendar Kubernetes ou consultar chefe de equipa.

**Cenário 2: Servidor Tem \<2GB RAM**  
 Coolify precisa de \~500MB RAM para correr.  
 Se o servidor tem só 1GB, não sobra para aplicações.

**Cenário 3: Cliente Tem Equipa DevOps Interna**  
 Se o cliente tem engenheiros que preferem Terraform \+ Kubernetes, respeitar escolha.

**Para 95% dos nossos clientes:** Coolify é ideal.

*Para instalação e configuração inicial do Coolify, consulta SOP "Setup Coolify em VPS Nova" no Miro.*

---

## **5\. ARQUITETURA DE SOFTWARE: A STACK DE DADOS**

**Não usamos configurações "padrão de tutorial do YouTube". Usamos configurações "Enterprise".**

### **5.1 N8N: O Cérebro das Automações**

#### **O Que É o N8N?**

**Definição:**  
 Plataforma open-source de automação workflow (tipo Zapier/Make, mas self-hosted).

**Para que serve:**

* Conectar WhatsApp (Evolution API) com IA (OpenAI/Claude)  
* Consultar bases de dados (ler agenda de clientes)  
* Enviar notificações (email, SMS, Slack)  
* Processar webhooks (Vapi chama N8N quando precisa de dados)

#### **O Problema da Instalação Padrão (SQLite)**

**Setup default do N8N (quando instalar direto do Docker Hub):**

Usa **SQLite** como base de dados.

**O que é SQLite?**  
 Base de dados que guarda tudo num ficheiro único (ex: `database.sqlite`).  
 Simples, zero configuração, perfeito para protótipos.

**Por que SQLite é amadorismo na produção?**

**Problema 1: Database Lock (Bloqueio)**

SQLite bloqueia **todo o ficheiro** durante a escrita.

**Cenário real:**  
 Cliente A enviar WhatsApp → N8N escreve log na base de dados (bloqueio por 50ms)  
 Cliente B envia WhatsApp no mesmo momento → N8N tenta escrever → **falha** porque BD está bloqueada

**Resultado:** Mensagem de Cliente B é perdida.

**Problema 2: Corrupção de Dados**

Se o servidor crashar no meio de uma escrita (ex: falha de energia), ficheiro SQLite **corrompe**.  
 Recovery é difícil. Dados podem ser perdidos.

**Problema 3: Zero Concorrência**

SQLite foi desenhado para 1 aplicação, 1 utilizador.  
 Voice AI com 50 chamadas simultâneas? SQLite não aguenta.

#### **A Solução Enterprise: PostgreSQL**

**O que é PostgreSQL?**  
 Base de dados relacional open-source de nível industrial.  
 Usada por Instagram, Spotify, Reddit.

**Vantagens para nosso caso de uso:**

**Concorrência Massiva:**  
 Gere milhares de escritas simultâneas usando MVCC (Multi-Version Concurrency Control).  
 50 pessoas ligarem ao mesmo tempo? PostgreSQL nem aquece.

**Durabilidade (ACID):**  
 Se o servidor crashar, PostgreSQL garante que transações são recuperáveis.  
 Zero perda de dados.

**Performance em Escala:**  
 SQLite começa a degradar com \>10.000 registos.  
 PostgreSQL gere biliões de registos sem esforço.

#### **Configuração N8N \+ PostgreSQL**

**Variáveis de ambiente no Coolify:**

N8N\_DATABASE\_TYPE=postgresdb  
DB\_POSTGRESDB\_HOST=postgres  \# Nome do container PostgreSQL  
DB\_POSTGRESDB\_PORT=5432  
DB\_POSTGRESDB\_DATABASE=n8n  
DB\_POSTGRESDB\_USER=n8n\_user  
DB\_POSTGRESDB\_PASSWORD=senha\_segura\_aqui

**Custos:**  
 PostgreSQL em container usa \~100-200MB RAM adicional.  
 Se o servidor tem 4GB, é perfeitamente viável.

### **5.2 Gestão de Filas: Redis para Alto Volume**

#### **Quando Redis é Necessário?**

**Volume baixo (\<200 webhooks/dia):**  
 N8N processa requests síncronamente. Cliente envia webhook → N8N processa → responde.

**Volume alto (\>500 webhooks/dia):**  
 Picos podem saturar N8N (ex: campanha Instagram \= 200 mensagens em 5 minutos).

**Solução:** Modo **queue** do N8N usando Redis.

#### **O Que É Redis?**

**Definição:**  
 Base de dados in-memory (tudo em RAM) ultra-rápida.  
 Usada para cache e filas de mensagens.

#### **Como Funciona N8N Queue Mode?**

**Arquitetura:**

1. **Webhook chega** → N8N recebe e coloca em **fila Redis** (operação de 1-2ms)  
2. **Responde imediatamente** ao remetente (200 OK)  
3. **Workers do N8N** processam fila em background (sem bloquear novos requests)

**Benefício:**  
 Mesmo que 500 webhooks cheguem simultaneamente, N8N aceita todos.  
 Processa em background sem perder nenhum.

**Configuração:**

EXECUTIONS\_MODE=queue  
QUEUE\_BULL\_REDIS\_HOST=redis  
QUEUE\_BULL\_REDIS\_PORT=6379

**Quando ativar:**  
 Se cliente começar a reportar "mensagens perdidas" ou N8N estiver a usar \>80% CPU consistentemente.

### **5.3 Evolution API: A Ponte com WhatsApp**

#### **O Que É a Evolution API?**

**Definição:**  
 API open-source que permite conectar WhatsApp Business (via QR Code) a sistemas externos.

**Alternativas pagas:** Twilio WhatsApp, 360Dialog, Wati  
 **Custo alternativas:** €50-500/mês  
 **Custo Evolution:** €0 (open-source)

#### **Por Que Evolution v2?**

Existe Evolution v1 (antiga) e v2 (atual).

**Diferenças críticas:**

| Feature | v1 | v2 |
| ----- | ----- | ----- |
| Estabilidade conexão | Média | Alta |
| Dependência Redis | Opcional | **Obrigatória** |
| Suporte multi-instância | Limitado | Nativo |
| Documentação | Básica | Completa |

**Regra:** Sempre usar **v2**.

#### **Por que Redis é Obrigatório na Evolution v2?**

**Tecnicamente:**  
 Evolution v2 guarda estado da conexão WhatsApp em Redis (sessão do QR Code, chaves de encriptação).

**Sem Redis:**  
 Conexão cai a cada 2-6 horas.  
 Cliente tem de escanear QR Code repetidamente.

**Com Redis:**  
 Conexão mantém-se estável por semanas/meses.

**Implicação:**  
 Se projeto usa Evolution API, **Redis é mandatório**, mesmo que N8N não use queue mode.

#### **Arquitetura Típica**

**Containers necessários:**

* `evolution-api` (a API em si)  
* `redis` (estado da conexão)  
* `postgresql` (logs e configurações da Evolution)

*Para setup da Evolution API v2, consulta SOP "Configuração Evolution API \+ WhatsApp" no Miro.*

### **5.4 Resumo da Stack Mínima vs Completa**

**Stack Mínima (Projeto Simples \- Automação N8N sem Voice AI):**

* Coolify  
* N8N  
* PostgreSQL (para N8N)

**Stack Completa (Voice AI \+ WhatsApp):**

* Coolify  
* N8N  
* PostgreSQL (para N8N \+ Evolution)  
* Redis (para Evolution \+ N8N queue)  
* Evolution API v2

**Uso de RAM estimado:**

| Stack | RAM Usada | Servidor Recomendado |
| ----- | ----- | ----- |
| Mínima | 1.5-2GB | Hetzner CX21 (4GB) |
| Completa | 2.5-3.5GB | Hetzner CX31 (8GB) |

---

## **6\. ARQUITETURA DE VOZ E INTELIGÊNCIA (VAPI)**

**Esta seção é específica para projetos de Voice AI (nosso core service).**

### **6.1 O Que É a Vapi?**

**Definição:**  
 Plataforma que orquestra chamadas telefónicas com IA (Speech-to-Text, LLM, Text-to-Speech).

**Comparação:**

* **Twilio:** Fornece linhas telefónicas, mas TU tens de construir toda lógica de IA  
* **Vapi:** Fornece linhas telefónicas **\+ orquestração de IA completa**

**Por que usamos Vapi:**  
 Reduz complexidade de 3 meses de desenvolvimento para 3 dias de configuração.

### **6.2 Arquitetura de Latência: Onde Vive a Lógica?**

**Erro comum de agências iniciantes:**  
 Passar toda conversa pelo N8N.

**Fluxo errado:**  
 Cliente fala → Vapi transcreve → **envia para N8N** → N8N processa → devolve para Vapi → Vapi responde

**Problema:**  
 Adiciona 200-500ms de latência extra (ida e volta para N8N).

**Fluxo correto:**  
 Cliente fala → Vapi transcreve → **Vapi processa diretamente com OpenAI** → Vapi responde

**N8N como "Ferramenta Auxiliar":**  
 Vapi só chama N8N quando precisa de dados externos.

**Exemplo:**  
 Cliente: "Tenho marcação para amanhã?"  
 Vapi: *(internamente)* "Preciso consultar agenda. Vou chamar N8N."  
 Vapi → chama webhook N8N → N8N consulta PostgreSQL → devolve dados → Vapi responde

**Latência:**

* Perguntas simples: 800-1200ms (só Vapi \+ OpenAI)  
* Perguntas com dados: 1200-1800ms (Vapi \+ N8N \+ DB)

### **6.3 System Prompt: O "Cérebro" da IA**

**O que é System Prompt?**  
 Instrução inicial que define personalidade e comportamento da IA.

**Onde vive:**  
 No dashboard da Vapi, não no N8N.

**Exemplo para barbearia:**

És a Rita, rececionista virtual da Barbearia Premium Lisboa.  
Atende com simpatia e profissionalismo.

Regras:  
1\. Sempre confirma nome do cliente antes de marcar  
2\. Horários disponíveis: Seg-Sex 9h-19h, Sáb 9h-14h  
3\. Se cliente pedir horário indisponível, sugere alternativa próxima  
4\. No final, repete marcação: "Então fica marcado \[nome\] para \[data\] às \[hora\]"  
5\. Despede-te com "Até lá\!"

Quando precisares consultar agenda, usa a ferramenta "verificar\_disponibilidade".

**Profundidade do prompt:**  
 Quanto mais específico, melhor performance.  
 Prompts de 500-1000 palavras são normais para Voice AI profissional.

*Para templates de prompts por setor (barbearia, clínica, restaurante), consulta biblioteca de prompts no Miro.*

### **6.4 Estratégia de Humanização: Clonagem de Voz Regional**

#### **O Problema do "Vale da Estranheza"**

**Conceito (Uncanny Valley):**  
 Quando algo é 90% humano mas 10% estranho, gera **mais** desconfiança que algo claramente robótico.

**Aplicado a voz:**  
 Voz genérica de IA (sotaque neutro, entoação perfeita) cai no vale da estranheza.  
 O cliente ouve e pensa "isto é fake".

#### **A Solução: Clonagem Regional**

**Processo:**

**1\. Contratar Talento Local**  
 Se o cliente é barbearia no Porto, contratar dublador/atriz do Porto (não Lisboa).  
 Sotaque regional gera identificação imediata.

**2\. Gravar Material Base**  
 Script de \~10-15 minutos com frases variadas:

* "Bom dia\!"  
* "Qual é o teu nome?"  
* "Deixa-me ver a agenda..."  
* "Obrigada, até logo\!"

**3\. Treinar Modelo (ElevenLabs Professional Cloning)**  
 Upload de áudio → ElevenLabs gera clone neural.  
 Modelo aprende entoação, pausa, sotaque.

**4\. Integrar na Vapi**  
 Usar voz clonada em vez de voz stock.

**Custo:**

* Talento: €50-150 (sessão de gravação)  
* ElevenLabs Pro: €99/mês (cobrado ao cliente)  
* **Valor percebido pelo cliente: \+€500-1000** (ativo intangível)

#### **Por Que Isto Funciona?**

**Teste A/B interno (2025):**  
 Barbearia com voz genérica: Taxa de marcação 12%  
 Mesma barbearia com voz clonada (sotaque Porto): Taxa de marcação 31%

**Diferença:** 2.6x mais conversões.

**Explicação:**  
 Cérebro humano deteta "isto é uma pessoa real do meu bairro" vs "isto é uma IA genérica".

### **6.5 Gestão de Custos: OpenAI vs Alternativas**

**Modelos disponíveis na Vapi:**

| Modelo | Custo/1M tokens | Latência | Uso Recomendado |
| ----- | ----- | ----- | ----- |
| GPT-4o | $2.50 | 800-1200ms | Conversas complexas |
| GPT-4o-mini | $0.15 | 600-900ms | **Padrão (95% casos)** |
| Claude Sonnet 4 | $3.00 | 900-1400ms | Raciocínio profundo |
| Claude Haiku | $0.25 | 500-800ms | Respostas rápidas |

**Regra prática:**  
 Usar **GPT-4o-mini** por padrão. É 16x mais barato que GPT-4o com performance quase idêntica à Voice AI.

**Custo real estimado:**

* Chamada média: 3 minutos \= \~5.000 tokens  
* 100 chamadas/mês \= 500.000 tokens \= **$0.08 com GPT-4o-mini**

**Para cliente que faz 1.000 chamadas/mês:**  
 OpenAI: \~$0.80/mês  
 Custo é **negligível**. Gargalo é servidor e voz (ElevenLabs).

---

## **7\. SEGURANÇA PERIMETRAL: CLOUDFLARE**

**Nunca entregamos IP numérico (192.168.1.1) ao cliente. É inseguro e não-profissional.**

### **7.1 O Problema de Expor IP Direto**

**Cenário sem Cloudflare:**

Cliente acede `n8n.barbearia.com` → DNS resolve para `192.168.1.1` (IP da Hetzner) → conexão direta

**Riscos:**

**1\. Ataques DDoS**  
 Qualquer script kiddie pode saturar IP com tráfego falso.  
 Servidor ficar offline.

**2\. Varredura de Portas**  
 Hackers fazem scan: "Que portas estão abertas no 192.168.1.1?"  
 Descobrem PostgreSQL na porta 5432, tentam força bruta.

**3\. Falta de Rate Limiting**  
 Alguém tenta 10.000 logins no N8N em 1 minuto.  
 Sem proteção, o servidor processa tudo.

**4\. Aparência Não-Profissional**  
 Cliente vê `http://192.168.1.1:5678` → parece amador.

### **7.2 O Que É a Cloudflare?**

**Definição:**  
 CDN (Content Delivery Network) \+ firewall que fica **entre** utilizadores e servidores.

**Analogia:**  
 Cloudflare é a "segurança da boate". Visitantes legítimos passam, bots e atacantes são bloqueados.

### **7.3 Proxy Mode (Nuvem Laranja)**

**Como funciona:**

1. Cliente regista domínio `barbearia.com` na Cloudflare  
2. DNS aponta para IPs da Cloudflare (não IP real do servidor)  
3. Cloudflare recebe tráfego → filtra → encaminha para IP real (oculto)

**Benefícios:**

**IP Real Fica Oculto:**  
 Hackers vêm IPs da Cloudflare, não sabem onde está o servidor.

**Proteção DDoS Automática:**  
 Cloudflare absorve ataques até 100+ Gbps.  
 Nosso servidor Hetzner nem sente.

**Rate Limiting Gratuito:**  
 Cloudflare bloqueia IPs que fazem \>100 requests/minuto.

**SSL Automático:**  
 Certificado entre cliente e Cloudflare (grátis, sempre ativo).

### **7.4 Organização de Subdomínios**

**Estrutura recomendada:**

barbearia.com → Website principal  
|  
├─ maquina.barbearia.com → Painel Coolify  
├─ cerebro.barbearia.com → N8N  
├─ whatsapp.barbearia.com → Evolution API  
└─ voz.barbearia.com → Webhook da Vapi (se necessário)

**Vantagens:**

**Lógica Semântica:**  
 Equipa técnica olha e entende "whatsapp \= Evolution API".

**Isolamento de Certificados:**  
 Se o certificado de um subdomínio expira, não afeta outros.

**Rate Limiting Seletivo:**  
 Cloudflare pode ter regras diferentes por subdomínio.

*Para configuração de DNS \+ Cloudflare, consulta SOP "Setup DNS e Segurança" no Miro.*

---

## **8\. O RITUAL DE ENTREGA E MODELO DE MANUTENÇÃO**

**Este é o momento que define nossa reputação: a transição de "projeto nosso" para "propriedade do cliente".**

### **8.1 Offboarding Técnico (Transferência de Propriedade)**

#### **Quando Acontece?**

**Momento:** Após validação em produção (2-4 semanas de operação estável).

#### **O Que Entregar?**

**1\. Cofre de Senhas Completo**

Documento (PDF encriptado ou Bitwarden vault) com:

* Credenciais root do servidor (SSH)  
* Login admin do Coolify  
* Chaves API (OpenAI, ElevenLabs, Twilio)  
* Acesso Evolution API (se aplicável)  
* Login Cloudflare DNS  
* Documentação de arquitetura (diagrama de containers)

**2\. Sanitização Financeira**

Verificação final que **todos** os serviços cobram cartão do cliente:

* ✅ Hetzner → cartão cliente  
* ✅ OpenAI API → cartão cliente  
* ✅ ElevenLabs → cartão cliente  
* ✅ Twilio/Vapi → cartão cliente  
* ❌ **Nenhum serviço no cartão da agência**

**3\. Documentação de Handover**

Documento técnico com:

* Topologia da infraestrutura (quais containers, onde estão)  
* Procedimentos de emergência (como reiniciar serviço)  
* Contactos de suporte (chefe de equipa, horários)

*Template de documento de handover disponível no Miro.*

#### **Reunião de Handover com Cliente**

**Agenda (30-45 minutos):**

**1\. Demonstração de acesso (5 min)**  
 Mostrar como aceder à Coolify, ver logs, verificar status.

**2\. Explicação de custos (5 min)**  
 "Vais receber faturação mensal da Hetzner (\~€12), OpenAI (\~€30), ElevenLabs (\~€99)."

**3\. Opções de manutenção (10 min)**  
 Apresentar proposta de contrato de zeladoria (ver seção 8.2).

**4\. Q\&A (15 min)**  
 Responder dúvidas. Maioria pergunta: "E se algo quebrar?"

**5\. Assinatura de termo de handover (5 min)**  
 Documento atesta que cliente recebeu propriedade.

### **8.2 O Contrato de "Zeladoria" (Maintenance Retainer)**

#### **O Problema que Resolvemos**

**Cliente agora tem:**

* Servidor funcionando ✅  
* Credenciais todas ✅  
* Propriedade técnica ✅

**Cliente NÃO sabe:**

* Como atualizar N8N quando sair versão nova  
* Como diagnosticar se Evolution API desconectar  
* Como ajustar prompt se comportamento da IA mudar  
* Como otimizar se latência aumentar

**Analogia:**  
 Cliente tem "chave da fábrica", mas não sabe operar maquinaria.

#### **Proposta de Valor**

**Pitch:**  
 *"Agora és dono da infraestrutura, e isso é ótimo. Mas sistemas de IA evoluem semanalmente (OpenAI lança modelo novo, Vapi muda API). Nós oferecemos manutenção contínua: monitorizamos uptime, fazemos atualizações, ajustamos prompts. É como ter um departamento de IT dedicado, sem contratar full-time."*

#### **Escopo do Contrato de Manutenção**

**Incluído (Pacote Base \- €150-300/mês):**

**Monitorização 24/7**  
 O Uptime Robot envia alertas se o sistema cair.  
 Equipa reage em \<2h (horário comercial) ou \<12h (fora de horas).

**Atualizações de Software**  
 N8N, Coolify, Evolution API têm updates mensais.  
 Nós aplicamos em horário de baixo tráfego (madrugada).

**Backups Semanais**  
 Garantir que dados estão protegidos.

**Ajustes de Prompts (até 2h/mês)**  
 Cliente queria dizer "Olá" em vez de "Bom dia"? Fazemos.

**Suporte via Slack/WhatsApp**  
 Resposta em \<24h para questões não-urgentes.

**NÃO Incluído (Trabalho Extra \- Faturado à Hora):**

* Mudanças estruturais (adicionar novo serviço)  
* Desenvolvimento de features novas  
* Migrações de servidor  
* Consultoria estratégica (\>2h/mês)

#### **Estrutura de Preços Sugerida**

| Complexidade | Mensalidade | Uso Caso |
| ----- | ----- | ----- |
| Basic | €150/mês | Automação N8N simples |
| Standard | €250/mês | Voice AI até 500 chamadas/mês |
| Premium | €400/mês | Voice AI \+ WhatsApp \+ alto volume |

**Margem:**  
 Cliente paga servidor (€12) \+ APIs (€50).  
 Nós cobramos €250 de manutenção \= **margem líquida de 100%** (só expertise).

#### **E Se Cliente Recusar Manutenção?**

**Resposta profissional:**  
 *"Sem problema\! Tens total controle do sistema. Se no futuro precisares de suporte pontual, cobramos €80/hora. Ficamos à disposição."*

**Realidade:**  
 60-70% dos clientes voltam em 2-6 meses pedindo manutenção.  
 Primeira quebra técnica (N8N atualiza e quebra webhook) \= telefone toca.

### **8.3 Documentação de Encerramento de Projeto**

**Checklist final antes de dar projeto como concluído:**

* \[ \] Cliente tem acesso a todos os serviços  
* \[ \] Todos os pagamentos apontam para cartão do cliente  
* \[ \] Documento de handover assinado  
* \[ \] Backups configurados e testados  
* \[ \] Cliente sabe como contactar suporte  
* \[ \] Proposta de manutenção apresentada (aceite ou recusada)  
* \[ \] Projeto movido para "Manutenção" ou "Encerrado" no CRM

*Template de checklist de encerramento disponível no Miro.*

---

## **9\. FAQ E TROUBLESHOOTING COMUM**

### **9.1 Perguntas Frequentes (Antes de Perguntar ao Chefe)**

#### **Q: Cliente tem orçamento muito baixo (\<€50/mês total). Podemos hospedar vários clientes num servidor?**

**A:** NÃO. Violação da regra de isolamento (secção 2). Alternativas:

* Propor Hostinger VPS básico (€4/mês) \+ setup simplificado  
* Declinar projeto se não for viável  
* Consultar chefe para aprovar exceção (raramente aprovada)

#### **Q: Cliente está no Brasil. Usar mesmo assim Hetzner Alemanha?**

**A:** NÃO. Para clientes no Brasil:

* Usar Hostinger São Paulo  
* Ou AWS São Paulo (se orçamento permitir)  
* Latência Lisboa-Brasil é 180-220ms (inaceitável para voz)

#### **Q: Posso usar SQLite "só para este projeto pequeno"?**

**A:** NÃO. Mesmo projetos pequenos devem usar PostgreSQL. Razões:

* Consistência de stack (toda equipa sabe como operar)  
* Evita migração futura (quando crescer)  
* SQLite falha em produção de formas imprevisíveis

#### **Q: Cliente quer acesso SSH root mas tem zero conhecimento técnico. É seguro?**

**A:** SIM, mas com salvaguardas:

* Dar acesso mas avisar que "modificações não-supervisionadas quebram contrato de manutenção"  
* Documentar que cliente foi avisado  
* Oferecer "modo só leitura" (user SSH sem sudo)

#### **Q: Vapi lançou modelo novo mais barato. Posso mudar sem avisar o cliente?**

**A:** NÃO. Mudanças em modelo de IA podem alterar comportamento. Processo correto:

* Testar em ambiente de staging  
* Propor mudança ao cliente com benefícios (ex: "latência \-200ms")  
* Só aplicar com aprovação

#### **Q: N8N teve update que quebrou workflow. O que fazer?**

**A:** Processo de emergência:

1. Rollback para versão anterior (Coolify permite)  
2. Avisar cliente da quebra temporária  
3. Testar nova versão em staging  
4. Aplicar quando confirmada estável  
5. Reportar issue no GitHub do N8N (se for bug)

### **9.2 Troubleshooting de Problemas Comuns**

#### **Problema: "Evolution API desconecta a cada 2 horas"**

**Diagnóstico:**  
 Redis não está configurado ou crashou.

**Solução:**

1. Aceder Coolify → verificar status do container Redis  
2. Se stopped, restart  
3. Verificar logs: `docker logs redis` para erros de memória  
4. Se persistir, aumentar memoria dedicada ao Redis (em docker-compose)

*SOP detalhado: "Resolver Desconexão Evolution API" no Miro.*

#### **Problema: "Latência da voz subiu de 800ms para 2000ms"**

**Diagnóstico em árvore:**

**1\. Verificar latência de rede:**  
 `ping` ao servidor → se \>100ms, problema pode ser routing  
 Contactar Hetzner/Hostinger

**2\. Verificar uso de CPU/RAM:**  
 Coolify → Metrics → se \>90%, servidor saturado  
 Upgrade para plan superior

**3\. Verificar logs Vapi:**  
 Dashboard Vapi → Call Logs → procurar por "timeout" ou "slow\_response"  
 Pode ser OpenAI a demorar (mudar modelo)

**4\. Verificar N8N:**  
 Se chamadas com dados externos demorarem, pode ser query SQL lenta  
 Otimizar índices PostgreSQL

#### **Problema: "Cliente diz que IA está a dar respostas erradas/estranhas"**

**NÃO é problema técnico. É problema de prompt.**

**Processo:**

1. Pedir exemplos concretos de conversa (transcrição)  
2. Analisar onde prompt falhou  
3. Ajustar System Prompt na Vapi  
4. Testar 10-20 chamadas  
5. Deploy se validado

*Não mexer em código/infraestrutura. 95% de "IA burra" é um prompt mal desenhado.*

#### **Problema: "Backup falhou mas não sei porquê"**

**Diagnóstico:**

1. Coolify → Backups → ver logs de erro  
2. Erro comum: "disco cheio" → limpar logs antigos ou upgrade storage  
3. Erro "permissões": verificar que user do backup tem acesso ao volume  
4. Se backup ia para S3, verificar credenciais AWS

### **9.3 Quando Escalar para Chefe de Equipa?**

**Escala imediatamente se:**

* ✅ Cliente reporta **perda de dados** (mensagens desapareceram)  
* ✅ Downtime \>4 horas sem solução à vista  
* ✅ Cliente ameaça cancelar contrato por problema técnico  
* ✅ Problema de segurança (hack, breach)  
* ✅ Dúvida sobre cobrar ou não cliente por trabalho extra

**Tenta resolver internamente (consultar SOP primeiro) se:**

* ⚠️ Problema de latência (geralmente otimização)  
* ⚠️ Ajuste de prompts (maioria é iterativo)  
* ⚠️ Update quebrou algo (rollback \+ reportar)  
* ⚠️ Cliente pede feature nova (orçamentar antes)

**Nunca escales por preguiça de ler documento.**  
 Se SOP existe, segue. Se não existe, cria (e depois escala para validar).

---

## **10\. CONCLUSÃO E PRINCÍPIOS REITERANTES**

Esta arquitetura não é a mais **fácil** de montar. É a mais **correta**.

**O que nos define:**

Não somos "operadores de ferramentas no-code".  
 Somos **Engenheiros de Soluções** que constroem infraestrutura com:

* Segurança (isolamento, Cloudflare, backups)  
* Performance (latência \<300ms, PostgreSQL, Redis)  
* Ética comercial (cliente é dono, transparência total)  
* Sustentabilidade (manutenção recorrente sem risco financeiro)

**Para equipa técnica:**  
 Este documento é o teu "norte verdadeiro". Quando tiveres dúvida:

1. Consulta secção relevante aqui  
2. Verifica SOP específico no Miro  
3. Se ainda não resolveu, falar com chefe de equipa

**Para novos membros:**  
 Isto não é "só mais um manual". É a diferença entre sermos mais uma agência de automação ou uma referência no mercado português de IA empresarial.

**Última palavra:**  
 A tecnologia evolui. N8N hoje pode ser substituído amanhã. Mas **princípios** não mudam:

* Soberania do cliente  
* Isolamento técnico  
* Transferência de controlo

Estes são inegociáveis.

---

 *Última atualização: Janeiro 2026*  
 *Próxima revisão: Março 2026 ou quando stack tecnológica mudar significativamente*

