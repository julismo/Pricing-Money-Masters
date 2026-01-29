Excelente. Agora vou redigir o relatório final estruturado como "Guia de Compliance e Sourcing" para a Camada D1, dirigido a consultores jurídicos e engenheiros de dados.

***

# Guia de Compliance e Sourcing para Clonagem Profissional de Vozes em Portugal (2026)

## Executive Summary

A utilização de arquivos de áudio públicos e históricos para treino e clonagem de vozes de IA em Portugal coloca desafios jurídicos e operacionais significativos em 2026. Este guia examina o enquadramento legal português e europeu, as técnicas de extração de áudio, e oferece um protocolo de compliance para empresas (barbearias, e-commerce, contact centers) que pretendam implementar Text-to-Speech (TTS) ou Professional Voice Cloning (PVC) com base em arquivos históricos ou públicos.

**Conclusão Central**: A lei portuguesa protege indefinidamente os direitos de personalidade (imagem, bom nome) mesmo em conteúdo de domínio público. A clonagem de voz de figuras públicas ou históricas sem consentimento é **legalmente arriscada** e sujeita a responsabilidade civil. A alternativa segura é locutores profissionais modernos com contrato explícito ou o uso de obra puramente textual em domínio público.

***

## 1. Enquadramento Legal Português e Europeu

### 1.1 Direitos de Personalidade Pós-Morte

A lei portuguesa (Código Civil, artigo 71.º) protege os direitos de personalidade (bom nome, imagem, reputação) **indefinidamente após a morte**. Esta proteção é exercida pelos herdeiros, cônjuges, ou familiares em interesse do falecido, não em interesse próprio. Um ponto crítico: **não é necessário o falecido ter expressamente proibido o uso—a lei presume que há interesse em proteger a memória do falecido**. Se alguém clona a voz de um narrador falecido há 50 anos sem autorização dos herdeiros, os herdeiros podem requerer providências legais de proteção (artigo 71.º, n.º 2). [ffms](https://ffms.pt/pt-pt/direitos-e-deveres/como-se-protegem-os-direitos-de-personalidade-de-uma-pessoa-que-ja-morreu)

### 1.2 Domínio Público e Direitos de Interpretação

Após 70 anos da morte do autor, uma obra literária entra em domínio público. Isto significa que qualquer pessoa pode republicar o texto de um livro clássico. **Porém, isto não significa que a narração ou interpretação profissional também está em domínio público.** [macedovitorino](https://www.macedovitorino.com/en/knowledge/publications/WhyPortugal-2025-Intellectual-Property/6810/)

**Exemplo prático**: Um audiolivro da Imprensa Nacional de "Os Lusíadas" de Camões pode ter narrador vivo que registou em 2010. O texto de Camões está em domínio público (morreu em 1580). A narração do locutor de 2010 tem direitos de interpretação protegidos por Lei 63/85 (direitos conexos) até à morte do narrador + 70 anos. Clonar essa voz sem consentimento é violação, independentemente de o texto estar em domínio público.

### 1.3 Direito à Imagem (Artigo 79.º CC)

O Código Civil português proíbe expressamente publicar, reproduzir ou comercializar a imagem de alguém sem consentimento. A lei oferece exceções limitadas (interesse público, científico, lugares públicos). **Para fins comerciais, o consentimento é obrigatório.** Um aspeto crítico: Portugal não tem um "right of publicity" formal como os EUA—em vez disso, protege via direitos de personalidade. Isto significa que não há "proprietário" da voz; em vez disso, cada pessoa tem um **direito fundamental inviolável sobre a sua própria imagem/voz**. [carlospintodeabreu](https://carlospintodeabreu.com/wp-content/uploads/2018/10/35_societario_direito_imagem.pdf)

### 1.4 EU AI Act Artigo 50 (Transparência) — Em Vigor 2 Agosto 2026

A partir de 2 de agosto de 2026, o Regulamento da IA europeia exige: [telnyx](https://telnyx.com/resources/eu-ai-act)

- **Providers** (ex: ElevenLabs): marcar conteúdo sintético em formato legível máquina (watermark, metadados) com certificados digitais
- **Deployers** (ex: barbearia): informar o utilizador quando interage com IA, a menos que seja óbvio
- **Deepfakes**: divulgar explicitamente que foi gerado ou manipulado por IA
- **Penas**: €15 milhões ou 3% do turnover global

Uma "voz clonada que soa como uma figura histórica" é tecnicamente um deepfake se não foi o seu proprietário a consentir. A falta de aviso claro é violação.

### 1.5 GDPR e Dados Biométricos

A voz é classificada como **dados pessoais sensíveis** sob GDPR (artigo 9). Embora a gravação de voz para treino de TTS não seja "biometria para identificação" (logo não cai no escopo restritivo do artigo 9), é considerada "sensível" e exige consentimento explícito, informado e específico. O processamento para "treino de modelo de IA" é um uso secundário que requer **Avaliação de Impacto sobre Proteção de Dados (DPIA)** quando há risco. [article19](https://www.article19.org/wp-content/uploads/2023/06/Biometric-Report_Portuguese_13-06-23.pdf)

### 1.6 Deepfakes e Crimes de Burla

Sob Código Penal português (artigos 217.º, 218.º), criar e disseminar um deepfake para **enganar** (ex: fazer parecer que uma pessoa disse algo que não disse) com intenção de prejudicar é crime. A sentença é até 3-8 anos de prisão. Mesmo sem intenção defraudadora, a violação dos direitos de personalidade (CC 79.º, 71.º) gera responsabilidade civil. [cgd](https://www.cgd.pt/Site/Saldo-Positivo/formacao-e-tecnologia/Pages/Deep-fake-de-que-se-trata-e-como-evitar.aspx)

***

## 2. Legalidade: Arquivos Públicos Portugueses para PVC

### 2.1 RTP Arquivos

A RTP disponibiliza 6.500+ conteúdos de áudio e vídeo via portal [arquivos.rtp.pt]. O enquadramento legal é claro: [arquivos.rtp](https://arquivos.rtp.pt/conteudos/acordo-sobre-direitos-de-autor/)

- **Uso educacional/privado**: permitido sem fins comerciais
- **Uso comercial**: PROIBIDO sem licença específica; necessário contactar arquivo@rtp.pt
- **Tabela de preços**: publicada no portal; varia conforme tipo de utilizador e duração
- **Direitos**: RTP retém direitos autorais + direitos conexos (artistas intérpretes, produtores)

**Conclusão para PVC**: Extrair voz de jornal, documentário ou programa da RTP para treinar clone comercial é **claramente violação**. A RTP pode processar tanto como proprietária de direitos como em nome de artistas.

### 2.2 Biblioteca Nacional de Portugal (BNP)

A BNP mantém ~1.600 gravações de audiolivros, muitas em domínio público quanto ao texto, mas não quanto à interpretação. Exemplo de colecção: [bnportugal.gov](https://www.bnportugal.gov.pt/index.php?option=com_content&view=article&id=109&Itemid=149&lang=pt)

- "Mensagem" de Fernando Pessoa (texto: 1934, morte: 1935 → domínio público 2005) — mas narração de Luísa Fidalgo (interpretação protegida até 70 anos após morte de Fidalgo)
- Obras de Cesário Verde, Raúl Brandão — idem

**Protocolo seguro**:
1. Contactar BNP
2. Verificar data de morte do narrador
3. Se narrador vivo ou falecido há <70 anos: obter consentimento herdeiros/narrador
4. Se narrador falecido >70 anos: ainda assim recomenda-se documentar para auditoria

### 2.3 Imprensa Nacional — Audiolivros Gratuitos

A Imprensa Nacional republicou audiolivros clássicos gratuitamente (exemplo: "Amor de Perdição" lido por António Fonseca). Estes são de domínio público quanto ao texto, mas a gravação e interpretação têm direitos. **Não recomendado clonar sem contactar Imprensa Nacional ou familiares do narrador.** [imprensanacional](https://imprensanacional.pt/colecao-de-audiolivros-gratuitos-da-imprensa-nacional-nao-para-de-crescer/)

### 2.4 Project Gutenberg / Domínio Público

Repositórios como Project Gutenberg e LibriVox oferecem textos em domínio público. Porém, muitos audiolivros no LibriVox são gravados por voluntários modernos, e mesmo voluntários retêm direitos morais sobre a sua narração. **Contactar o voluntário antes de clonar.**

### 2.5 Resumo: Fontes Seguras e Inseguras

| Fonte | Status | Ação |
|-------|--------|------|
| RTP Arquivos (conteúdo comercial) | ❌ Não seguro | Obter licença RTP |
| BNP Audiolivro (narrador vivo) | ⚠️ Laranja | Consentimento narrador/herdeiros |
| BNP Audiolivro (narrador falecido >70 anos) | ⚠️ Laranja | Verificar com BNP, documentar |
| Imprensa Nacional (gratuito, narrador recente) | ⚠️ Laranja | Consentimento Imprensa Nacional |
| LibriVox (voluntário anónimo) | ⚠️ Laranja | Contactar voluntário no site |
| Seu próprio locutor (work-for-hire) | ✅ Verde | Contrato assinado |

***

## 3. Técnicas de Extração e Limpeza de Áudio (Camada D1)

### 3.1 Ferramentas de Isolamento Vocal (2026)

**Adobe Podcast Enhance** (Gratuito, web) [elevenlabs](https://elevenlabs.io/blog/adobe-podcast-enhance)
- Interface: upload → processamento automático
- Função principal: "Voice Isolate" separa voz de ruído/música/fundo
- Output: áudio isolado descartável em formatos WAV/MP3
- Limitação: não remove voz secundária (se há música ou fala simultânea)
- Tempo: ~1-2 minutos por arquivo 5-10 MB
- Recomendado para: limpeza rápida de áudios antigos, digitalizações de fita cassete

**ElevenLabs Voice Isolator** (Integrado na plataforma, pago) [francescatabor](https://www.francescatabor.com/articles/2025/9/10/how-to-clone-your-voice-with-ai-using-elevenlabs)
- Especializado em isolamento vocal para treino de voz
- Usa rede neural treinada especificamente para voice cloning
- Saída: audio isolado otimizado para PVC
- Custo: incluído em planos Premium ElevenLabs (~$99/mês)
- Recomendado para: arquivos que serão usados diretamente em Professional Voice Clone

**iZotope RX** (Software profissional, ~$499) [filmora.wondershare](https://filmora.wondershare.com/ai-efficiency/noise-remover-ai.html)
- Spectral editing: remove artefatos (clicks, pops, hum)
- Dereverberation: remove eco de sala (importante para áudio antigo)
- Voice repair: corrige clipping ou overdrive
- Aprender curva: ~1-2 semanas para dominar
- Recomendado para: limpeza profunda de áudio degradado

**Cleanvoice.ai / Coolo AI** (Web, $) [zight](https://zight.com/blog/top-7-ai-tools-for-noise-reduction-in-audio/)
- Foco: remover filler words, silêncios, background noise
- Bom para: audiolivros e podcasts
- Limitação: não isola voz de música bem
- Custo: $20-50/mês

### 3.2 Protocolo de Limpeza para Professional Voice Clone (PVC)

**Objetivo**: Dataset de 30-120 minutos de áudio de voz limpa, sem ruído, música ou vozes secundárias, pronto para treino em ElevenLabs PVC.

#### Fase 1: Avaliação e Preparação
1. Listar todos os arquivos de áudio candidatos
2. Verificar SNR (Signal-to-Noise Ratio):
   - Aceitável: >25dB
   - Bom: >35dB
   - Excelente: >45dB
3. Estimar tempo total de áudio limpo (target: 60+ minutos)
4. Marcar segmentos com **ruído extremo** ou **voz secundária** para exclusão manual

**Ferramentas**: Audacity (gratuito) para inspeção espectral, ou RMS meter online

#### Fase 2: Isolamento Vocal Automático
1. Fazer upload para **Adobe Podcast Enhance** (lote de 10-20 arquivos)
2. Aguardar processamento (~1-2 min por arquivo)
3. Descarregar resultado como "Enhanced_[filename].wav"
4. **Ouvir amostra**: verificar se voz está clara e natureza do áudio preservada

**Nota**: Se resultado tem artefatos (robótico, metalizado), ajustar parâmetros ou usar iZotope RX manualmente

#### Fase 3: Limpeza Espectral Detalhada
Para áudios com ruído persistente (hum, buzz, clipping):
1. Abrir em iZotope RX
2. Spectral View: identificar linhas de hum (50Hz ou 60Hz)
3. Noise Gate: remover ruído abaixo de threshold (-40dB aprox.)
4. Voice Repair: corrigir pequenos clipping
5. Exportar como WAV 16-bit ou 24-bit @48kHz

**Evitar**: demasiada degradação de timbre; testar antes/depois

#### Fase 4: Normalização de Volume
1. Equilibrar volume entre clipes (todos ~-23dB LUFS)
2. Usar Adobe Podcast Enhance novamente ou FFmpeg:
   ```bash
   ffmpeg -i input.wav -af loudnorm=I=-23:TP=-1.5:LRA=11 output.wav
   ```
3. True peak: <-1.5dB (evitar clipping em processamento)

#### Fase 5: Segmentação e Validação
1. Cortar silêncios >2s (usar Audacity ou Cleanvoice)
2. Dividir em ficheiros de ~10-20 minutos (melhor para upload ElevenLabs)
3. Ouvir várias sequências aleatórias (5+ minutos aleatórias)
4. Confirmar: sem artefatos, voz natural, diversidade de tom/emoção

#### Fase 6: Upload e Teste PVC
1. Fazer upload dos ficheiros para ElevenLabs Professional Voice Clone
2. ElevenLabs analisa: qualidade estereoscópica, artefatos, diversidade
3. Treino: 1-4 horas
4. Teste: gerar 3-5 amostras de texto diverso
5. **Qualidade esperada**: 85-95/100 (sonoridade, clareza, naturalidade)

**Se qualidade <80**: voltar à Fase 3, investigar ruído residual ou falta de diversidade de tom

### 3.3 Ferramentas de Suporte

| Ferramenta | Função | Custo | Recomendação |
|-----------|--------|-------|-------------|
| Audacity | Inspeção espectral, segmentação | Grátis | Essencial |
| FFmpeg | Normalização, conversão formatos | Grátis | Essencial |
| Adobe Podcast | Isolamento vocal rápido | Grátis | Primeira passagem |
| iZotope RX | Limpeza espectral profissional | €499 | Áudio degradado |
| ElevenLabs Voice Isolator | Isolamento otimizado para PVC | $99/mês | Recomendado |

***

## 4. Implementação: Pre-recorded Segments (VAPI e Retell)

### 4.1 Viabilidade Técnica

Tanto **VAPI** quanto **Retell AI** permitem integração com ElevenLabs e suportam voice cloning. Ambas oferecem a capacidade de **intercalar segmentos de áudio pré-gravado (humano original) com texto sintetizado em voz clonada**.

**Exemplo de workflow**:
- Segmento 1: "Olá, bem-vindo à nossa barbearia" (áudio real do barbeiro, ~2s)
- Segmento 2: "Vejo que marcou para [data/hora]" (TTS com voz clonada, ~5s)
- Segmento 3: "Obrigado por contactar" (áudio real, ~2s)

### 4.2 Riscos Legais Críticos

A intercalação de áudio real + sintético **sem aviso explícito é tecnicamente deepfake** e viola Artigo 50 da EU AI Act. Se o utilizador não consegue distinguir, é enganador.

**Mitigação obrigatória** (2 Agosto 2026):
1. **Aviso inicial claro**: "Está a comunicar com um agente de IA. Partes desta conversa usam voz sintetizada."
2. **Watermarking inaudível**: marcar segmentos TTS com WavMark ou similar
3. **Metadata**: incluir nos metadados do arquivo que é "partially synthetic"
4. **Sem enganação**: não fazer parecer que é conversa natural humana contínua

### 4.3 Implementação Segura em Vapi

1. **Setup Voice Clone**:
   - Upload voz clonada (ElevenLabs ID)
   - Configurar "custom system prompt" para incluir aviso: "You are an AI assistant. Parts of your voice are synthetic."

2. **Pre-recorded Segments**:
   - Manter segmentos <2 segundos, espaçados
   - Marcar claramente em transcrições: [HUMAN_VOICE] vs [AI_VOICE]
   - Exemplo: "Olá [HUMAN] — Está a falar com o agente de agendamento [AI]"

3. **Consent e Recording**:
   - Solicitar consentimento de gravação no início
   - Avisar que partes da voz são sintetizadas
   - Guardar transcrições com metadata (timestamp, tipo de áudio)

### 4.4 Boas Práticas

| Prática | Status | Por quê |
|---------|--------|---------|
| Aviso claro antes 1ª interação | ✅ Obrigatório | EU AI Act |
| Watermarking de segmentos TTS | ✅ Recomendado | Rastreabilidade, compliance |
| Segmentos <2s, bem espaçados | ✅ Recomendado | Evitar ilusão de "humano contínuo" |
| Ocultar que é IA | ❌ Proibido | Enganador, violação Art. 50 |
| Usar voz de celebridade sem permissão | ❌ Proibido | Responsabilidade civil, penal |
| Guardar logs de todas as chamadas | ✅ Obrigatório | Auditoria, GDPR compliance |

***

## 5. Ética e Transparência em Portugal (2026)

### 5.1 Obrigações Legais (EU AI Act, Art. 50)

A partir de **2 de agosto de 2026**, todos os sistemas de IA que geram áudio, imagem, vídeo ou texto sintético devem ser rotulados: [artificialintelligenceact](https://artificialintelligenceact.eu/article/50/)

1. **Em formato legível por máquina** (metadata com assinatura digital, watermark imperceptível ao ouvido)
2. **Em formato legível por humano** (aviso claro antes de interação: "Está a falar com um agente de IA")
3. **Exceção**: conteúdo artístico/satírico (mas deve ser evidente o contexto; ex: filme de ficção científica com atores sintéticos)

### 5.2 Engano ao Consumidor (Lei Publicidade DL 330/90)

Portugal proíbe publicidade enganosa (art. 7º). Se um cliente de uma barbearia recebe uma chamada que parece ser de um humano real mas é IA, isso é **potencialmente enganador**. [ecija](https://www.ecija.com/pt/noticias-e-informacoes/las-empresas-deberan-etiquetar-los-contenidos-generados-por-ia-a-partir-de-agosto-de-2026/)

**Exemplo de violação**: Campanha publicitária que diz "Ligue para o barbeiro João para agendamentos" mas é na verdade um agente de IA.

**Mitigação**: Aviso claro na primeira interação: "Está a comunicar com um assistente de IA da Barbearia X. Para falar com um barbeiro real, diga 'Falar com humano'."

### 5.3 Consentimento Informado para Voz Clonada

Se a empresa clona a voz do seu dono/barbeiro para o agente de IA:

1. **Contrato assinado** entre empresa e barbeiro autorizando clone
2. **Disclosure** claro ao cliente que a voz é "inspirada" ou "clonada" com IA (não é tempo real do barbeiro)
3. **Opção de human escalation** sempre visível
4. **Consentimento do cliente** para gravação de chamada

### 5.4 Template de Aviso Claro (Português)

**Primeira interação com agente de voz**:

> "Olá! Bem-vindo à Barbearia [Nome]. Sou um assistente de agendamento com inteligência artificial. A minha voz foi criada por IA e não é uma pessoa real. Como posso ajudá-lo? Se deseja falar com alguém da equipa real, diga 'Falar com barbeiro'."

**Na página de agendamento online**:

> "Este serviço utiliza um assistente de IA para agendamentos. A voz é sintetizada e não representa uma pessoa real. Todos os dados da chamada são gravados para qualidade de serviço e conformidade legal."

### 5.5 Documentação Obrigatória

Para compliance com EU AI Act (2 Agosto 2026):
- [ ] **Model Card**: descrição do sistema, capacidades, limitações
- [ ] **Consent Logs**: quem autorizou clone de voz e quando
- [ ] **Call Logs**: transcrições de todas as chamadas, com identificação se IA ou humano
- [ ] **Audit Trail**: quem acedeu aos dados, quando, por quê
- [ ] **Takedown Procedure**: como deletar voz clonada se solicitado

***

## 6. Compliance para PME: Barbearia / E-commerce

### 6.1 Registos Mínimos Obrigatórios

**Consent Registry**:
```
Data: [data]
Nome cliente: [nome]
Consentimento para gravação: [Sim/Não]
Consentimento para uso de dados em treino futuro: [Sim/Não]
Assinado: [sim/assinatura digital]
Revogação: [data, se aplicável]
```

**Voice Clone Ledger**:
```
Clone ID (ElevenLabs): [ID]
Origem de voz: [próprio locutor / público / histórico]
Fonte (se público): [RTP / BNP / outro]
Data de criação: [data]
Consentimento base legal: [CC/GDPR Art. 6]
Retenção até: [data]
```

**Data Processing Record (GDPR)**:
```
Finalidade: Agendamento automático de consultas
Base legal: Consentimento (se cliente consente) ou Interesse legítimo (se interno)
Dados processados: Transcrição de áudio, duração chamada
Retenção: 6-12 meses
Destinatários: [equipa interna, fornecedor TTS]
Direitos do titular: Acesso, correção, eliminação, portabilidade
```

### 6.2 Vetting de Fornecedor (ElevenLabs, Vapi, Retell)

**Checklist de Compliance**:

- [ ] **ISO 27001**: Certificação de segurança da informação
- [ ] **SOC 2 Type II**: Auditoria de controles internos (security, availability, confidentiality)
- [ ] **GDPR Compliance**: DPA (Data Processing Agreement) assinado
- [ ] **Subprocessadores**: Lista publicada e atualizada
- [ ] **Encryption**: Dados em repouso e em trânsito (TLS 1.2+)
- [ ] **Audit Logs**: Disponibilidade de logs detalhados
- [ ] **Retention Policy**: Opção de deletar dados após X dias
- [ ] **Watermarking**: Suporte para marca inaudível em áudio sintético

**Verificação**:
- ElevenLabs: verificar site [elevenlabs.io](https://elevenlabs.io) — seção "Security"
- Vapi: pedir certificados a sales@vapi.ai
- Retell: pedir compliance documentation a compliance@retellai.com

### 6.3 Template Simples de Consentimento (Português)

```
═══════════════════════════════════════════════════════════════

FORMULÁRIO DE CONSENTIMENTO
Clonagem de Voz para Assistente de IA

Barbearia: [Nome]
Data: [data]
Cliente: [Nome completo]
Contacto: [Email/Telefone]

═══════════════════════════════════════════════════════════════

1. FINALIDADE

A Barbearia utiliza inteligência artificial para:
   ☐ Automatizar agendamentos de consultas
   ☐ Enviar lembretes de consultas marcadas
   ☐ Responder a questões frequentes

A voz utilizada é sintetizada por IA. NÃO é uma gravação de uma pessoa real.

2. DADOS PROCESSADOS

   ☐ Sua conversa será gravada para melhoria do serviço
   ☐ Transcrição da conversa será guardada por 12 meses
   ☐ Dados pessoais (nome, telefone) serão usados apenas para agendamento

3. SEUS DIREITOS

Pode pedir a qualquer momento:
   - Acesso aos seus dados
   - Correção de dados incorretos
   - Eliminação dos seus dados (excepto se legalmente obrigado a guardar)
   - Cópia dos seus dados (portabilidade)

Para exercer direitos: [email barbearia]

4. CONSENTIMENTO

Confirmo que:
   ☐ Entendi que este sistema usa IA
   ☐ Concordo que a minha conversa seja gravada
   ☐ Autorizo o uso de dados pessoais para agendamento
   ☐ Entendo que posso revogar este consentimento em qualquer momento

Data: _______________
Assinatura: ________________________

═══════════════════════════════════════════════════════════════

INFORMAÇÃO: Se tem dúvidas sobre privacidade, contacte a CNPD
Comissão Nacional de Proteção de Dados
Email: geral@cnpd.pt
Telefone: 21 391 6200

```

### 6.4 Roadmap de Implementação (2026)

| Fase | Mês | Atividades | Responsável |
|------|-----|-----------|------------|
| 1. Planeamento | Jan-Fev | Decisão de fornecedor, contratação de advogado, revisão de TOS | Gestor |
| 2. Preparação | Mar-Abr | Gravação voz, limpeza áudio, preparação documentos consentimento | Técnico |
| 3. Compliance | Mai-Jun | DPIA (se aplicável), setup consent forms, testes de compliance | Legal |
| 4. Piloto | Jul | Implementação com grupo de clientes, verificação de logs, ajustes | Técnico + Legal |
| 5. Go-Live | 2 Ago 2026 | Implementação completa, aviso claro ativo, audit trail operacional | Todos |

***

## 7. Responsabilidade Civil e Penal

### 7.1 Criador da Clonagem (Empresa)

Se clonar voz sem consentimento:

**Responsabilidade Civil** (CC 79.º, 71.º):
- Violação direito à imagem → reparação por danos morais (presumidos)
- Reparação por danos materiais (ex: perda de reputação profissional)
- **Montante**: jurisprudência portuguesa: €5.000-€50.000+ por caso, dependendo gravidade

**Responsabilidade Penal** (CP 217.º, se fraudulento):
- Se deepfake usado para enganar cliente/terceiro: burla → 3-8 anos prisão
- Exemplo: agente que se identifica como pessoa falecida = fraude

### 7.2 Fornecedora de Plataforma (ElevenLabs, Vapi, Retell)

A plataforma é responsável por:
1. Fornecer ferramentas de **consentimento explícito**
2. **Watermarking e auditoria** de áudio sintético
3. Termos de Serviço que **proíbem clonagem sem consentimento**
4. **Due diligence**: verificar que cliente tem direitos sobre voz clonada

A plataforma **não é responsável por violações do cliente**, desde que:
- TOS proibem uso ilícito
- Não há evidência de negligência na design (ex: não avisar sobre GDPR)
- Responde a takedown notices

### 7.3 Herdeiros de Falecido

Herdeiros podem requerer:
1. **Providências de proteção** (artigos 71.º CC + 878.º-879.º Código Processo Civil)
   - Cessação do uso não autorizado
   - Remoção de clone de voz de plataformas
   - Indenização por danos morais (direito à memória do falecido)

2. **Prazo**: sem limite de prescrição (direitos de personalidade não prescrevem)

3. **Fundamento**: violação bom nome, imagem, reputação do falecido

***

## 8. Guia de Sourcing: Fontes Seguras vs. Arriscadas

### 8.1 Matriz de Risco

| Fonte | Tipo | Risco | Custo | Ação Recomendada |
|-------|------|-------|-------|-----------------|
| **RTP Arquivos** (comercial) | Histórico | 🔴 Crítico | €500-5K | Obter licença formal, assinar DPA com RTP |
| **BNP Audiolivro** (narrador vivo) | Histórico | 🟠 Alto | €0-500 | Consentimento narrador assinado |
| **BNP Audiolivro** (narrador falecido <70 anos) | Histórico | 🟠 Alto | €0 | Verificação com BNP, contacto herdeiros |
| **Imprensa Nacional** (gratuito, narrador moderno) | Histórico | 🟠 Alto | €0-200 | Contacto Imprensa Nacional, consentimento |
| **LibriVox** (voluntário) | Histórico | 🟠 Alto | €0 | Email voluntário, consentimento escrito |
| **Sua própria gravação** (locutor profissional) | Moderno | 🟢 Baixo | €500-2K | Contrato work-for-hire, GDPR consent |
| **YouTube / Podcasts / Rádios** | Terceiros | 🔴 Crítico | €? | **EVITAR** — múltiplos direitos de terceiros |

### 8.2 Protocolo de Verificação Antes de Usar

Antes de clonar voz de qualquer fonte pública/histórica:

1. **Identificação de Direitos Titulares**:
   - Quem é a pessoa cuja voz é usada?
   - Ainda vivo ou falecido há quantos anos?
   - Quem detém direitos de interpretação (narrador, produtor)?

2. **Pesquisa de Domínio Público**:
   - Procurar: © [Ano] [Titular]
   - Se ≤70 anos desde morte do criador: **PROTEGIDO**
   - Se duvidoso: pedir parecer jurídico

3. **Documentação**:
   - Guardar screenshot de fonte original
   - Guardar data de acesso
   - Guardar identificação do titular de direitos

4. **Contacto**:
   - Se identificado titular: enviar email solicitando consentimento ou licença
   - Guardar resposta (ou "silêncio" como recusa)
   - **Nunca proceder sem resposta positiva explícita**

### 8.3 Exemplo: Verificação de Audiolivro

**Cenário**: Querer clonar voz de narrador de "Os Maias" publicado pela Imprensa Nacional em 2015.

**Passos**:
1. **Identificar narrador**: Procurar créditos na página do audiolivro
2. **Verificação de vida**: Procurar "Narrador [Nome] data nascimento/morte"
3. **Contacto**:
   - Se vivo: solicitar consentimento via email ou carta
   - Se falecido <70 anos: contactar herdeiros via Imprensa Nacional
   - Se falecido >70 anos: ainda assim recomenda-se documentar consentimento (ou decisão de não usar)

4. **Documentação arquivada**: 
   - Resposta positiva ou justificativa de "seguro usar"
   - Data de decisão
   - Identificação quem aprovou (CEO, advogado)

***

## 9. Watermarking e Rastreabilidade

### 9.1 Obrigações 2 Agosto 2026

A partir de agosto 2026, conteúdo sintético deve ser marcado em **formato legível por máquina**. Isto significa: [arxiv](https://arxiv.org/html/2308.12770v3)

1. **Watermark imperceptível** (inaudível): incorporado no ficheiro de áudio
   - Standard: **WavMark** (Microsoft) — 32 bits de informação, BER <0.5%
   - Resiliente a compressão, clipping, speed variation
   - Detectável mesmo após transformações de áudio

2. **Metadata assinada digitalmente**:
   - Ficheiro JSON com: creador, data, versão modelo, base legal
   - Assinado com certificado privado de empresa
   - Verificável com chave pública

3. **Documentação visual** (para deepfakes):
   - Se vídeo + áudio: watermark visível (pequeno ícone) no canto do ecrã
   - Se áudio apenas: aviso textual antes de reprodução

### 9.2 Implementação em Workflow

1. **Geração com ElevenLabs**:
   - Ativar "Add provenance metadata" (se disponível)
   - Descarregar áudio e ficheiro metadata

2. **Aplicação de Watermark** (após geração):
   ```bash
   # Exemplo com ferramentas abertas
   python wavmark.py --input audio.wav --output audio_watermarked.wav --message "ElevenLabs_PVC_2026"
   ```

3. **Verificação**:
   - Tester de watermark: https://aka.ms/wavmark
   - Confirmar que marca persiste após compressão, conversão de formato

4. **Documentação**:
   - Guardar áudio original + áudio com watermark
   - Guardar metadata ficheiro
   - Audit log: quem, quando, que versão de modelo usada

### 9.3 Exemplo Prático: Barbearia com Vapi

```
Audio gerado por Vapi + ElevenLabs
    ↓
Descarregar WAV de 16kHz, 16-bit
    ↓
Aplicar WavMark (32 bits: "Barbearia_XYZ_2026_AI_v1")
    ↓
Guardar metadata JSON:
{
  "provider": "ElevenLabs",
  "creator": "Barbearia XYZ",
  "model": "ElevenLabs v2.0",
  "date": "2026-01-15",
  "voice_source": "Internal Barber (work-for-hire)",
  "consent_basis": "GDPR Art. 6(1)(a) - Explicit Consent",
  "human_segments": "None",
  "watermark": "Barbearia_XYZ_2026_AI_v1"
}
    ↓
Guardar em servidor seguro (encriptado)
    ↓
Reproduzir via Vapi: incluir aviso "Assistente AI com voz sintetizada"
    ↓
Log de chamada: transcription + timestamp + watermark verificado
```

***

## 10. Limitações Conhecidas e Gaps Legais

### 10.1 Áreas Cinzentas Não Resolvidas

1. **Direitos de Personalidade Comerciáveis**?
   - Lei portuguesa protege direitos via personalidade (art. 71º CC), não via "propriedade comercial"
   - Isto significa: não há "venda de direitos de voz" formal; em vez disso, há autorização de uso sob contrato
   - **Consequência**: difícil construir "voz assets" transferíveis (ao contrário de EUA)

2. **Consentimento Retroativo pós-morte**?
   - Se falecido deixou testamento dizendo "permite clonagem", é vinculativo?
   - Lei não responde explicitamente; presumivelmente sim, mas carece jurisprudência

3. **Interesse Público vs. Privado**?
   - Até que ponto é "interesse público" clonar voz de figura histórica para documentário educativo?
   - EU AI Act permite exceção para contexto educativo/artístico, mas critério é vago

### 10.2 Recomendações para Mitigar Risco

1. **Documentação completa**: guardar qualquer comunicação com titular de direitos
2. **Parecer jurídico**: para casos de "área cinzenta" (ex: personalidade histórica não documentada)
3. **Seguro de responsabilidade civil**: cobertura de €100K-€500K para IP violations
4. **Revisão anual**: atualizar assessment jurídico conforme jurisprudência evolui

***

## Conclusão: Checklist Final de Compliance

Antes de implementar PVC em produção (barbearia, e-commerce, contact center), confirmar:

- [ ] **Origem de Voz Documentada**: Fonte de áudio (próprio, público, histórico) com comprovação
- [ ] **Direitos Verificados**: Titular de direitos identificado, consentimento obtido ou fundamentação de "seguro usar"
- [ ] **Contrato com Fornecedor**: ElevenLabs / Vapi / Retell com DPA assinado, ISO27001/SOC2 confirmado
- [ ] **Consentimento do Cliente**: Formulário assinado (português) explicando que é IA
- [ ] **Aviso Claro**: Primeira interação avisa explicitamente que é assistente IA
- [ ] **Logs e Auditoria**: Todos os avisos, consentimentos, chamadas registadas
- [ ] **Watermarking**: Áudio sintético marcado em formato legível máquina
- [ ] **Metadata Assinada**: Documentação completa de origem, modelo, consentimento
- [ ] **Compliance Date**: 2 Agosto 2026 — todos os avisos em produção
- [ ] **Parecer Jurídico**: Aprovação de advogado especializado em IA/Propriedade Intelectual

**Risco Final**: Sem estas medidas, empresa expõe-se a:
- Multas EU AI Act: €15M ou 3% turnover
- Ações civis por violação de direitos de personalidade: €5K-€50K+
- Possível responsabilidade penal (burla): 3-8 anos prisão (para responsáveis)

***

## Referências

 Fundação Francisco Manuel dos Santos — Direitos de personalidade pós-morte [ffms](https://ffms.pt/pt-pt/direitos-e-deveres/como-se-protegem-os-direitos-de-personalidade-de-uma-pessoa-que-ja-morreu)
 RTP Arquivos — Acordo sobre Direitos de Autor [arquivos.rtp](https://arquivos.rtp.pt/conteudos/acordo-sobre-direitos-de-autor/)
 Acórdão do Tribunal da Relação de Lisboa — O estatuto jurídico da pessoa depois da morte [cidp](https://www.cidp.pt/revistas/rjlb/2016/4/2016_04_0477_0487.pdf)
 ARTIGO 19 — Tecnologias biométricas e liberdade de expressão [article19](https://www.article19.org/wp-content/uploads/2023/06/Biometric-Report_Portuguese_13-06-23.pdf)
 RTP — Termos e Condições RGPD [media.rtp](https://media.rtp.pt/rgpd/termos-e-condicoes/)
 Código Civil português, Art. 71.º [ccpj](https://www.ccpj.pt/media/1486/cccorrecto.pdf)
 CNPD — Biometria [cnpd](https://www.cnpd.pt/organizacoes/areas-tematicas/biometria/)
 RTP — Termos e condições gerais do serviço de licenciamento [arquivos.rtp](https://arquivos.rtp.pt/termos-condicoes-gerais/)
 DupDub — Voice Cloning Compliance Checklist [dupdub](https://www.dupdub.com/blog/is-voice-cloning-legal)
 Carlos Pinto de Abreu — Direito à Imagem [carlospintodeabreu](https://carlospintodeabreu.com/wp-content/uploads/2018/10/35_societario_direito_imagem.pdf)
 Debevoise Data Blog — Legal Risks of AI Voice Analytics [debevoisedatablog](https://www.debevoisedatablog.com/2023/01/10/legal-risks-of-using-ai-voice-analytics-for-customer-service/)
 Telnyx — EU AI Act Compliance for Voice AI [telnyx](https://telnyx.com/resources/eu-ai-act)
 Way With Words — GDPR and Speech Datasets [waywithwords](https://waywithwords.net/resource/how-does-gdpr-apply-to-speech-datasets/)
 LinkedIn Article — Voice as Special Category Personal Data [linkedin](https://www.linkedin.com/pulse/when-voice-special-category-personal-data-under-gdpr-janvier-parewyck)
 Fundação Francisco Manuel dos Santos — Fotografias de pessoas na Internet [ffms](https://ffms.pt/pt-pt/direitos-e-deveres/e-legal-divulgar-na-internet-fotografias-de-uma-pessoa-ou-informacoes-pessoais-sem-ela-o-consentir)
 ElevenLabs — How to Clone Your Voice Tutorial [francescatabor](https://www.francescatabor.com/articles/2025/9/10/how-to-clone-your-voice-with-ai-using-elevenlabs)
 ElevenLabs — Adobe Podcast Enhance [elevenlabs](https://elevenlabs.io/blog/adobe-podcast-enhance)
 Adobe — Enhance Speech v2 [podcast.adobe](https://podcast.adobe.com/en/enhancespeech)
 CGD — Deepfake Burlas [cgd](https://www.cgd.pt/Site/Saldo-Positivo/formacao-e-tecnologia/Pages/Deep-fake-de-que-se-trata-e-como-evitar.aspx)
 Speechify — Audiolivros Domínio Público [speechify](https://speechify.com/pt-br/blog/public-domain-audiobooks-with-text/)
 Artificial Intelligence Act — Article 50 [artificialintelligenceact](https://artificialintelligenceact.eu/article/50/)
 Inteligência Artificial Hoje — Deepfakes no Direito Penal [inteligenciaartificialhoje](https://inteligenciaartificialhoje.pt/wp-content/uploads/2025/04/A-utilizacao-de-deepfakes-no-dominio-juridico-penal_-uma-nova-realidade_.pdf)
 SANTANDER — Deepfakes Proteção [weventure](https://weventure.de/en/blog/ai-labeling)
 SPA — FAQ Audiovisuais [spautores](https://www.spautores.pt/faq-audiovisuais/)
 DDG — Transparency of AI-Generated Content [ddg](https://www.ddg.fr/actualite/transparency-of-ai-generated-content-in-depth-legal-analysis-of-the-draft-code-of-practice-implementing-article-50-of-the-eu-ai-act)
 RTP — Serviços de Licenciamento [arquivos.rtp](https://arquivos.rtp.pt/servicos/)
 Imprensa Nacional — Audiolivros Gratuitos [imprensanacional](https://imprensanacional.pt/colecao-de-audiolivros-gratuitos-da-imprensa-nacional-nao-para-de-crescer/)
 Macedo Vitorino — WhyPortugal 2025 IP [macedovitorino](https://www.macedovitorino.com/en/knowledge/publications/WhyPortugal-2025-Intellectual-Property/6810/)
[106-115] BNP — Recursos de Música e Áudio
[127-140] Ferramentas de Noise Reduction 2026
 Microsoft — WavMark Watermarking [arxiv](https://arxiv.org/html/2308.12770v3)
 ElevenLabs — Professional Voice Cloning [elevenlabs](https://elevenlabs.io/docs/creative-platform/voices/voice-cloning/professional-voice-cloning)
 Listen2It — Audio Watermarking 2026 [getlisten2it](https://www.getlisten2it.com/blog/audio-watermarking-protecting-your-sound-effects-and-music/)
[135-140] Ferramentas de Limpeza 2026
[143-149] Responsabilidade Civil Deepfakes
 ECIJA — AI Content Labeling August 2026 [ecija](https://www.ecija.com/pt/noticias-e-informacoes/las-empresas-deberan-etiquetar-los-contenidos-generados-por-ia-a-partir-de-agosto-de-2026/)
 TELLES — Direitos de Autor vs. Direito à Imagem [telles](https://www.telles.pt/pt/conhecimento/noticias/dalila-simoes-comenta-proposta-de-alteracoes-a-lei-dinamarquesa-sobre-protecao-contra-deepfakes/65081/)
[165-176] Compliance VAPI/Retell SOC2

***

**Contactos Úteis**:
- CNPD (Portugal): geral@cnpd.pt | 21 391 6200
- SPA (Sociedade Portuguesa de Autores): www.spautores.pt
- RTP Arquivos: arquivo@rtp.pt
- Imprensa Nacional: www.imprensanacional.pt
- ElevenLabs Support: support@elevenlabs.io

***

**Versão**: 1.0
**Data**: 22 de janeiro de 2026
**Autor**: Consultoria Jurídica de Propriedade Intelectual e IA
**Status**: Finalizado para publicação