# Relatório Técnico de Viabilidade – Integração ElevenLabs com Vapi e Retell AI (PT‑PT, Camada D1)

## 1. Sumário Executivo

Para um cenário de Voice AI em Português de Portugal, com foco em chamadas telefónicas em tempo real (ex.: barbearia com 1.000 chamadas/mês), a combinação ElevenLabs + plataforma de orquestração (Vapi ou Retell AI) é tecnicamente viável, mas com limitações claras ao nível de:

- Disponibilidade de vozes nativamente PT‑PT no catálogo público
- Controlo fino de sotaque (evitar deriva para PT‑BR)
- Custos recorrentes de TTS em escala
- Latência end‑to‑end num pipeline STT → LLM → TTS

Principais conclusões:

1. **Catálogo PT‑PT**  
   - O suporte a “português” e “sotaques regionais” existe a nível de modelo (Multilingual v2 / Flash v2.5), mas o catálogo público ainda é dominado por vozes brasileiras. [elevenlabs](https://elevenlabs.io/pt/text-to-speech/portuguese-accent)
   - Em catálogos agregadores (JSON2Video) surgem apenas **duas vozes claramente marcadas como Europeias (Tiago, Hugo Mendonça)** e algumas vozes descritas genericamente como “Portuguese male voice”, sem distinção clara PT‑PT/PT‑BR. [json2video](https://json2video.com/ai-voices/elevenlabs/languages/portuguese/)
   - **Não existe, em fontes públicas, uma lista canónica das “melhores 5 vozes PT‑PT masculinas/femininas” na ElevenLabs em 2025/2026.** Qualquer ranking depende de testes internos de audição/MOS.

2. **Clonagem Profissional (PVC) vs Instantânea (IVC)**  
   - **IVC**: 1–3 min de áudio limpo é o “sweet spot” recomendado para clones instantâneos, com mais duração a não trazer ganhos e até gerar instabilidade. [elevenlabs-sdk.mintlify](https://elevenlabs-sdk.mintlify.app/voices/voice-lab/instant-voice-cloning)
   - **PVC**: ElevenLabs recomenda **mínimo 30 min** de áudio de alta qualidade, idealmente 2–3 horas, para clones de nível estúdio. [elevenlabs](https://elevenlabs.io/docs/creative-platform/voices/voice-cloning/professional-voice-cloning)
   - A latência de inferência em tempo real **é praticamente idêntica** para vozes IVC e PVC quando se usa o mesmo modelo (Flash/Multilingual); a diferença está no esforço de preparação de dados e na robustez do timbre/prosódia. [elevenlabs](https://elevenlabs.io/blog/elevenlabs-vs-cartesia)
   - Usar apenas **1–5 min de áudio antigo de arquivos (RTP, etc.)** é tecnicamente possível via IVC, mas:  
     - A qualidade do clone depende fortemente de ruído, música, compressão e reverb dos ficheiros; o modelo tende a “copiar” também esses artefactos. [elevenlabs](https://elevenlabs.io/docs/creative-platform/voices/voice-cloning/professional-voice-cloning)
     - Em contexto de Voice AI telefónico, consegue‑se um resultado “humano suficiente”, mas não com o mesmo grau de consistência que um PVC treinado com áudio limpo de estúdio. [qcall](https://qcall.ai/elevenlabs-review/)

3. **Stability / Similarity Boost / Style Exaggeration**  
   - A própria ElevenLabs recomenda, como ponto de partida genérico, **Stability ~50, Similarity ~75 e Style=0**. [elevenlabs](https://elevenlabs.io/docs/creative-platform/products/studio)
   - Tutoriais independentes convergem em faixas semelhantes: **Stability 35–65, Similarity 55–75, Style 0–15 (no máximo)**. [youtube](https://www.youtube.com/watch?v=ZA4hsYHami0)
   - Para PT‑PT em conversação telefónica, a melhor prática para minimizar “sons estranhos” é:  
     - **Stability relativamente alta (55–70)** para reduzir variação aleatória de fonemas  
     - **Similarity moderadamente alta (65–80)** para preservar o timbre e evitar deriva de sotaque  
     - **Style Exaggeration muito baixo (0–3)**; acima de ~10 aumenta a instabilidade e a latência sem ganhos claros em call center. [elevenlabs](https://elevenlabs.io/docs/creative-platform/playground/text-to-speech)

4. **Vapi vs Retell (integração ElevenLabs e latência)**  
   - ElevenLabs Flash v2.5 atinge **TTFB ≈ 75 ms** em TTS isolado, com latências de 150–200 ms TTFB em infraestrutura europeia optimizada. [assemblyai](https://www.assemblyai.com/blog/how-to-build-lowest-latency-voice-agent-vapi)
   - Guias de Vapi com ElevenLabs Flash reportam **~465 ms de latência end‑to‑end** para um agente de voz completo (STT+LLM+TTS) bem optimizado. [assemblyai](https://www.assemblyai.com/blog/biggest-challenges-building-ai-voice-agents-how-assemblyai-vapi-are-solving-them)
   - Retell reporta arquitecturas semelhantes de streaming com **~600 ms end‑to‑end** em pipelines otimizados, o que está alinhado com benchmarks independentes (~800–1000 ms típicos de mercado quando a pilha não é altamente optimizada). [rnikhil](https://rnikhil.com/2025/05/18/how-to-reduce-latency-voice-agents)
   - Em ambos os casos, **ao usar a mesma voz clonada ElevenLabs**, a componente TTS contribui de forma muito semelhante para o TTFB; as diferenças práticas vêm sobretudo de **STT, LLM, rede e buffers da plataforma**, não do tipo de clone (PVC vs IVC). [elevenlabs](https://elevenlabs.io/docs/developers/best-practices/latency-optimization)

5. **Post‑processing de áudio**  
   - **Vapi** oferece uma camada robusta de denoising em tempo real, combinando **Krisp (Smart Denoising) + Fourier denoising**, com impacto desprezável (<0,5 ms) na latência, e opções avançadas de configuração. [vapi](https://vapi.ai/blog/revolutionize-voice-clarity-with-vapi-s-ai-driven-noise-reduction-tools)
   - **Retell** oferece modos “Remove noise” e “Remove noise + background speech”, com opção agressiva (que também remove fala de fundo) com sobretaxa de $0,005/min. [docs.retellai](https://docs.retellai.com/build/handle-background-noise)
   - Para uma barbearia em ambiente ruidoso, **ambas** as plataformas oferecem pós‑processamento suficiente na via de entrada (cliente → STT); o TTS ElevenLabs por si já é “limpo”, pelo que pós‑processing na via de saída é geralmente desnecessário.

6. **Custos para 1.000 chamadas/mês (3 min)**  
   - 1.000 chamadas × 3 min = **3.000 min/mês**.  
   - TTS ElevenLabs (via API, sem plataforma de orquestração): com preços de overage de **$0,24–0,30 / 1.000 caracteres** e ~800–900 caracteres por minuto de fala, obtém‑se **≈ $0,19–0,27 / min** (~$570–$810 / mês para 3.000 min). [dev](https://dev.to/flexprice_8116ed925/the-complete-guide-to-elevenlabs-plans-overages-and-usage-based-pricing-3jam)
   - Plataformas como Vapi e Retell **já embutem** o custo de TTS+STT+LLM, tipicamente:  
     - **Vapi**: custo efetivo de **≈ $0,13–0,25 / min** ao somar $0,05/min de hosting com telephony, STT, TTS e LLM. [blog.dograh](https://blog.dograh.com/vapi-pricing-breakdown-2025-plans-hidden-costs-what-to-expect/)
     - **Retell**: base de **$0,07–0,08 / min** para o motor de voz + extras (LLM, telephony) a levar o total típico a **≈ $0,13–0,31 / min**. [retellai](https://www.retellai.com/resources/voice-ai-platform-pricing-comparison-2025)
   - Para 3.000 min/mês, uma operação simples de marcação/gestão de marcações numa barbearia deverá ficar, de forma realista, na ordem dos **$400–$900/mês**, dependendo do modelo escolhido (OpenAI vs modelos mais caros), da agressividade de denoising e de extras (analytics, QA, etc.). [dialora](https://www.dialora.ai/blog/vapi-ai-reviews)

7. **PVC vale a pena para este volume?**  
   - O custo marginal de TTS por minuto **não aumenta** por ser PVC; o custo está no **setup** (talento, estúdio, edição, tempo da equipa). [audio-generation-plugin](https://audio-generation-plugin.com/elevenlabs-professional-voice-cloning/)
   - Para 3.000 min/mês, o ganho marginal de uma PVC (vs uma boa IVC ou voz PT‑PT de biblioteca) **é mais de branding do que financeiro/latência**.  
   - A recomendação, para uma barbearia, é **começar com uma voz IVC/PT‑PT bem configurada** ou voz de biblioteca adequada, e só investir em PVC quando a persona de voz se tornar um ativo de marca crítico.

***

## 2. Catálogo de Vozes PT‑PT na ElevenLabs

### 2.1. Estado actual do suporte a Português de Portugal

A ElevenLabs oferece:

- Modelo **Multilingual v2**, focado em expressividade e qualidade em ≈32 idiomas, incluindo português com vários sotaques. [elevenlabs](https://elevenlabs.io/text-to-speech/portuguese)
- Modelo **Flash v2.5 / Turbo**, otimizado para baixa latência (≈75 ms de TTS) e custo reduzido, com áudio a 128 kbps e menor expressividade. [flexprice](https://flexprice.io/blog/elevenlabs-pricing-breakdown)

As páginas oficiais de “Portuguese Text‑to‑Speech” descrevem explicitamente:

- **Captura de “dialetos regionais” do português**, com controlo de sotaque e nuances culturais via Voice Design e Voice Cloning. [elevenlabs](https://elevenlabs.io/pt/text-to-speech/portuguese)
- Suporte a vários sotaques de português (incluindo BR e europeus), mas **sem separação clara PT‑PT / PT‑BR em todos os presets de voz**. [elevenlabs](https://elevenlabs.io/pt/text-to-speech/portuguese-accent)

Discussões da comunidade indicam que:

- Muitos presets geram pronúncia mais próxima de português do Brasil por defeito.  
- Para PT‑PT autêntico é necessário usar vozes da Voice Library treinadas com locutores europeus ou criar/clonar vozes com áudio PT‑PT. [reddit](https://www.reddit.com/r/ElevenLabs/comments/1hfg8l9/european_portuguese/)

### 2.2. Candidatos de vozes masculinas PT‑PT (catálogo público)

Num catálogo independente que indexa vozes ElevenLabs por idioma/acento, surgem os seguintes candidatos claramente marcados como europeus: [json2video](https://json2video.com/ai-voices/elevenlabs/languages/portuguese/)

| Voz                | Género | Tipo / Fonte                         | Notas sobre sotaque e uso recomendado                                                                          |
|--------------------|--------|--------------------------------------|-----------------------------------------------------------------------------------------------------------------|
| **Tiago**          | M      | Voice Library – “European”          | Jovem, tom calmo e profissional; descrito como “Young Portuguese Male Voice”. Ótimo para atendimento standard. [json2video](https://json2video.com/ai-voices/elevenlabs/languages/portuguese/) |
| **Hugo Mendonça**  | M      | Voice Library – “European”          | Meia‑idade, português com sotaque de Portugal; adequado para narração e tom institucional. [json2video](https://json2video.com/ai-voices/elevenlabs/languages/portuguese/)                  |
| **Muhammad Umm**   | M      | Voice Library – “Portuguese male”   | Listado como “middle-aged Portuguese male voice”; sotaque reportado como mais neutro-europeu que BR.           |
| **Vagner de Souza**| M      | Voice Library – “male Portuguese”   | “Middle aged male Portuguese voice”; bom para locuções informativas.                                           |
| **Lax**            | M      | Voice Library – “Portuguese voice”  | Jovem, tom alegre/relaxado descrito como “Cheerful and relaxing Portuguese voice”; bom para branding leve.     |

Limitações importantes:

- O catálogo JSON2Video não disponibiliza amostras de áudio integradas aqui; é necessário teste na própria ElevenLabs para confirmar ausência de deriva para PT‑BR em longos trechos. [json2video](https://json2video.com/ai-voices/elevenlabs/languages/portuguese/)
- A descrição textual “Portuguese voice” não distingue de forma inequívoca PT‑PT de PT‑BR; a validação auditiva é obrigatória.

### 2.3. Lacuna em vozes femininas PT‑PT

Ao contrário das vozes masculinas acima:

- Nos catálogos públicos analisados, a maioria das vozes femininas listadas em “Portuguese” é explicitamente rotulada como **Brazilian Portuguese female voice**. [json2video](https://json2video.com/ai-voices/elevenlabs/languages/portuguese/)
- Não surgem entradas claramente etiquetadas como **“European Portuguese female”** nas fontes escrapadas.  
- Páginas genéricas de “Adult Female Voices” da ElevenLabs apresentam vozes (Allison, Amy, Hope, etc.) sem associação directa a PT‑PT; o sotaque real dependerá do texto e do modelo escolhido. [elevenlabs](https://elevenlabs.io/voice-library/adult-female-voices)

Conclusão técnica:

- **Não é possível, com informação pública, nomear 5 vozes femininas nativas PT‑PT com melhor performance em 2025/2026.**  
- A estratégia recomendada para PT‑PT feminino é:  
  1. **Clonar uma locutora portuguesa** (PVC ou IVC) com áudio de estúdio PT‑PT.  
  2. Em alternativa, usar uma voz Multilingual neutra e forçar o texto em ortografia PT‑PT, aceitando algum “colorido” não 100% nativo.

### 2.4. Naturalidade rítmica e deriva de sotaque

Nos modelos Multilingual, dois factores influenciam a “naturalidade rítmica” e o risco de deslizamento para PT‑BR:

1. **Distribuição de treino**  
   - A maioria dos datasets abertos de português é dominada por PT‑BR; modelos multilingues tendem a “cair” nesse sotaque quando as pistas do locutor não são fortíssimas. [arxiv](http://arxiv.org/pdf/2406.04904.pdf)

2. **Qualidade e pureza da voz/clones**  
   - Se o clone ou a voz de biblioteca for treinado com mistura PT‑PT + PT‑BR, o modelo “herda” esse blend de acentos.  
   - PVC bem curada com **100% PT‑PT** e ortografia europeia tem muito menor probabilidade de deriva.

Na prática:

- Para **diálogo telefónico curto (frases de 2–10 s)**, clones e vozes europeias tendem a manter o ritmo e acento.  
- Em **monólogos longos (narração, audiolivro)**, é mais frequente ver pequenas mudanças de entoação e, ocasionalmente, léxico ou realização de vogais mais próximas do padrão brasileiro; isto é mais visível em vozes genéricas Multilingual do que em clones com treino PT‑PT dedicado. [arxiv](https://arxiv.org/pdf/2206.12229.pdf)

***

## 3. Clonagem Profissional (PVC) vs Instantânea (IVC)

### 3.1. Requisitos técnicos

**Instant Voice Cloning (IVC)** – guia oficial ElevenLabs: [elevenlabs](https://elevenlabs.io/docs/creative-platform/voices/voice-cloning/instant-voice-cloning)

- Duração recomendada: **1–2 minutos** de áudio limpo, sem reverb nem ruído; mínimo absoluto de ~1 min.  
- Áudio acima de **3 minutos não traz benefícios e pode degradar a estabilidade** do clone. [youtube](https://www.youtube.com/watch?v=l6gGWvz1BSk)
- A IA replica tudo o que ouve: timbre, sotaque, ritmo, até respirações e cliques; artefactos e ruído também são “imitados”. [elevenlabs-sdk.mintlify](https://elevenlabs-sdk.mintlify.app/voices/voice-lab/instant-voice-cloning)
- Pense em IVC como “clone rápido, bom o suficiente” para uso comercial leve, mas não como voz de “marca” premium. [elevenlabs.accenture](https://elevenlabs.accenture.com/blog/7-tips-for-creating-a-professional-grade-voice-clone-in-elevenlabs)

**Professional Voice Cloning (PVC)** – documentação oficial: [audio-generation-plugin](https://audio-generation-plugin.com/elevenlabs-professional-voice-cloning/)

- Duração mínima recomendada: **≥ 30 minutos**; ideal entre **2–3 horas** de áudio de alta qualidade, único locutor. [elevenlabs](https://elevenlabs.io/docs/creative-platform/voices/voice-cloning/professional-voice-cloning)
- Deve ser áudio **sem música, sem ruído, sem reverb** perceptível; gravações com ruído fazem com que o modelo replique esse ruído. [audio-generation-plugin](https://audio-generation-plugin.com/elevenlabs-professional-voice-cloning/)
- O processo inclui verificação de consentimento, processamento de áudio (limpeza, separação de oradores) e treino, demorando tipicamente **8–12 horas**. [audio-generation-plugin](https://audio-generation-plugin.com/elevenlabs-professional-voice-cloning/)
- Destina‑se a clones de uso profissional (audiolivros, campanhas publicitárias, branding de longo prazo). [datahackers](https://www.datahackers.news/p/elevenlabs-nova-ai-que-clona-voz-em-portugu-s-fazendo-text-to-speech)

### 3.2. Latência: PVC vs IVC

Nem a documentação ElevenLabs nem comparativos credíveis indicam diferenças de latência significativas entre PVC e IVC, **desde que o modelo TTS e as configurações sejam os mesmos**:

- A latência depende essencialmente de:  
  - Modelo (Flash vs Multilingual v2) – Flash é o mais rápido (~75 ms de modelo, ~135 ms TTFB). [elevenlabs](https://elevenlabs.io/docs/overview/models)
  - Localização do servidor (EU stack ~150–200 ms TTFB para Europa). [elevenlabs](https://elevenlabs.io/docs/developers/best-practices/latency-optimization)
  - Configurações de style exaggeration e complexidade de texto (maior estilo → mais custo computacional). [elevenlabs](https://elevenlabs.io/docs/creative-platform/products/studio)

Ou seja: **PVC vs IVC não altera de forma mensurável o TTFB**; altera apenas a **qualidade e robustez** da voz.

### 3.3. Usar 1–5 minutos de áudio de arquivos públicos (RTP, Ministérios)

Do ponto de vista estritamente técnico (ignorando aqui a questão legal/consentimento):

- **IVC com 1–2 minutos de áudio limpo** é suportado e está dentro do “sweet spot” oficial. [elevenlabs](https://elevenlabs.io/docs/creative-platform/voices/voice-cloning/instant-voice-cloning)
- No entanto, áudio de arquivo RTP / institucional tipicamente tem:  
  - Compressão agressiva, música de fundo, crowd noise.  
  - Reverb de sala de conferências ou estúdios grandes.  
  - Eventual mistura de multi‑locutor ou cortes/edições.

Dado que o modelo **replica artefactos**, isto traz riscos:

- A voz clonada pode sair com **coloração de broadcast** permanente (compressão forte, “radio sound”), o que em Voice AI pode até ser desejável, mas reduz naturalidade.  
- Ruídos e ambiências intermitentes podem aparecer como “fantasmas sonoros” ou transientes estranhos em certas sílabas.  
- Se houver mais de um locutor nos samples, o modelo aprende um timbre “médio” instável.

Mitigações técnicas:

- Usar o **Voice Isolator** da própria ElevenLabs ou ferramentas de denoise/dereverb externas para isolar a voz antes de fazer o upload. [arxiv](https://arxiv.org/pdf/2206.03065.pdf)
- Selecionar apenas segmentos de fala solo, sem música, com dinâmica o mais neutra possível.  
- Garantir que os 1–2 min de sample cobrem **variedade prosódica** (frases interrogativas, afirmativas, entusiasmo neutro).

Expectativa realista:

- Com 1–5 min de áudio de arquivo cuidadosamente selecionado e limpo, **é possível obter uma voz “humana” suficiente para Voice AI telefónico** (MOS ≈ 3,5–4/5 num cenário de call center).  
- Não se consegue, em regra, o mesmo nível de naturalidade e consistência que um PVC treinado com dezenas de minutos de áudio de estúdio; para branding de alto nível, o PVC continua recomendável. [qcall](https://qcall.ai/elevenlabs-review/)

Nota crítica (não pedida, mas relevante em produção):

- A política de uso da ElevenLabs **exige consentimento e direitos sobre a voz** a clonar; a clonagem de vozes de figuras públicas a partir de arquivos sem autorização é explicitamente desencorajada e pode violar termos de uso e legislação (direito de personalidade). [margabagus](https://margabagus.com/elevenlabs-voice-cloning-consent-2025/)

***

## 4. Configurações Ideais: Stability, Similarity Boost, Style Exaggeration

### 4.1. Semântica dos controlos

Da documentação oficial e de explicações de engenharia: [reddit](https://www.reddit.com/r/ElevenLabs/comments/1d7hfce/can_someone_please_properly_explain_to_me/)

- **Stability**  
  - Valores baixos → mais variação natural: pausas, entoação, ênfases; também mais risco de pronúncias inconsistentes.  
  - Valores altos → delivery mais estável, por vezes monótono; menos “surpresas” fonéticas.

- **Similarity Boost**  
  - Controla o quão estritamente o modelo tenta corresponder ao timbre/origem.  
  - Valores altos fazem a voz soar mais “presa” ao sample original; valores baixos deixam o modelo derivar para um “tipo de voz” semelhante mas não idêntica.

- **Style Exaggeration**  
  - Amplifica o estilo/prosódia do locutor fonte.  
  - A ElevenLabs alerta que **aumenta a latência e torna o modelo menos estável**, devendo em geral ficar em 0. [elevenlabs](https://elevenlabs.io/docs/creative-platform/playground/text-to-speech)

A ElevenLabs recomenda como “mais comum”: **Stability ~50, Similarity ~75, Style=0**. [elevenlabs](https://elevenlabs.io/docs/creative-platform/products/studio)

### 4.2. Recomendações específicas para PT‑PT em Voice AI

Para chamadas em tempo real com sotaque PT‑PT estável, o objetivo é:

- Minimizar “alucinações” fonéticas (sons que não correspondem a sílabas reais).  
- Maximizar inteligibilidade telefónica (8 kHz) e consistência de sotaque ao longo da conversa.  
- Conservar alguma expressividade (não queremos um robô monótono).

Recomendações práticas de faixa (0–100) para PT‑PT em Voice AI:

| Caso de uso                                  | Modelo          | Stability      | Similarity Boost | Style Exaggeration | Justificação técnica                                                                                 |
|---------------------------------------------|-----------------|----------------|------------------|--------------------|------------------------------------------------------------------------------------------------------|
| Atendimento telefónico genérico (barbearia) | **Flash v2.5**  | **60–70**      | **65–80**        | **0–2**            | Mais estabilidade reduz pronúncias estranhas; Similarity alta fixa o sotaque; Style quase nulo.     |
| Atendimento premium / persona marcada       | Multilingual v2 | 50–60          | 75–90            | 0–5                | Mais expressividade, mantendo sotaque forte de clone/PT‑PT.                                          |
| Narração longa PT‑PT                        | Multilingual v2 | 45–55          | 70–85            | 0–5                | Compromisso entre dinâmica rítmica e consistência.                                                   |
| Personagem exagerado (não call center)      | Multilingual v2 | 30–45          | 60–75            | 5–15               | Só para conteúdos criativos; risco elevado de “over‑acting” e artefactos em português.              |

Boas práticas adicionais:

- **Style Exaggeration > 10** só deve ser usado em protótipos criativos; a própria ElevenLabs recomenda manter em **0 para uso normal**, e qualquer valor >0 aumenta a instabilidade e a latência. [youtube](https://www.youtube.com/watch?v=ZA4hsYHami0)
- Convém fixar estas configs no backend e **não expor sliders a ferramentas no‑code**, para evitar que alguém “brinque” e degrade a qualidade em produção.

***

## 5. Vapi vs Retell AI – Integração com ElevenLabs e Performance de Áudio

### 5.1. Arquitecturas de integração

**Vapi**

- Integração nativa com ElevenLabs via API, suportando **streaming TTS** em tempo real (WebSockets) com modelos como Flash v2.5. [docs.vapi](https://docs.vapi.ai/providers/voice/elevenlabs)
- Pipelines típicos: STT (Deepgram/AssemblyAI/OpenAI) → LLM (OpenAI/Anthropic/etc.) → ElevenLabs TTS (Flash) → WebRTC/SIP para o utilizador. [frejun](https://frejun.ai/elevenlabs-io-vs-vapi-ai-which-ai-voice-platform-is-best-for-developers-in-2025/)
- Documentação e guias de parceiros mostram configuração explícita de **“Optimize Streaming Latency”** e uso de Flash v2.5 para obter TTFB ≈ 75 ms. [assemblyai](https://www.assemblyai.com/blog/how-to-build-lowest-latency-voice-agent-vapi)

**Retell AI**

- Plataforma focada em **call center / operações de voz em escala**, com orquestração própria (telephony, STT, LLM, TTS) e suporte a ElevenLabs e outros TTS como fornecedores plugáveis. [retellai](https://www.retellai.com/comparisons/retell-vs-elevenlabs)
- Documentação permite escolher ElevenLabs como **“Conversation Voice Engine”** e gerir clones/comunity voices por voice name/ID. [blog.dograh](https://blog.dograh.com/decoding-retell-ai-pricing-and-plans-in-2025/)
- Infraestrutura concebida para milhares/milhões de chamadas com latência end‑to‑end na ordem de **~600 ms** quando bem configurada. [introl](https://introl.com/blog/voice-ai-infrastructure-real-time-speech-agents-asr-tts-guide-2025)

Em ambos os casos, o fluxo base STT→LLM→TTS é semelhante, e a diferença está em:

- Onde corre o STT (fornecedor, região).  
- Como é feito o streaming (WebRTC hops, buffers).  
- Estratégias de barge‑in (interrupção) e turno de fala.

### 5.2. TTFB e latência end‑to‑end

**Camada TTS (ElevenLabs)**

- Modelo **Flash v2.5**: tempo de modelo ~75 ms, TTFB visado ~135 ms em pipelines internos optimizados. [elevenlabs](https://elevenlabs.io/blog/how-do-you-optimize-latency-for-conversational-ai)
- Direct TTFB por região (docs de optimização de latência):  
  - Europa: baseline ~230 ms; com stack europeu dedicado, **150–200 ms**. [elevenlabs](https://elevenlabs.io/docs/developers/best-practices/latency-optimization)
- Benchmarks de terceiros apontam **TTFA (time‑to‑first‑audio) P90 ~200 ms** em comparações com outros TTS comerciais. [cartesia](https://cartesia.ai/vs/elevenlabs-vs-resemble)

Ou seja, **TTS isolado está muito abaixo do limiar perceptivo de atraso em chamada**; o problema está na soma STT+LLM+rede.

**Pipelines completos**

- Guia de AssemblyAI+Vapi demonstra **~465 ms de latência end‑to‑end** com Vapi + ElevenLabs Flash v2.5 optimizados para baixa latência. [assemblyai](https://www.assemblyai.com/blog/how-to-build-lowest-latency-voice-agent-vapi)
- Arquitecturas gerais de Voice AI indicam a soma típica: STT (100–500 ms) + LLM (350–1000 ms) + TTS (75–200 ms) + rede/buffers → **800–2000 ms** em muitos sistemas de produção não optimizados. [arxiv](https://arxiv.org/pdf/2409.10358.pdf)
- Posts técnicos citam **Retell** como alcançando end‑to‑end na casa dos **~600 ms** via pipelining agressivo (STT, LLM e TTS em streaming). [rnikhil](https://rnikhil.com/2025/05/18/how-to-reduce-latency-voice-agents)

Comparação qualitativa Vapi vs Retell ao usar ElevenLabs:

- **TTFB de TTS em si é essencialmente idêntico.** Ambos chamam o mesmo endpoint ElevenLabs; o clone PVC vs IVC não altera isso.  
- Diferenças de e2e vêm de:
  - Arquitectura de STT (Retell tem modos fast/accurate; Vapi deixa a escolha ao dev). [docs.retellai](https://docs.retellai.com/build/handle-background-noise)
  - LLM (modelos maiores → mais lentos).  
  - Estratégias de buffer e barge‑in (quanto áudio se acumula antes de começar a falar).

Na prática para 3 min de chamada:

- Uma diferença de 150–250 ms entre Vapi e Retell **não é crítica** para uma barbearia; ambos estão abaixo do limiar “insuportável” de ≈1,2 s. [blog.dograh](https://blog.dograh.com/how-to-reduce-speech-latency-in-voice-ai-tips-for-real-time-performance/)
- A escolha deve ser feita mais por **custo total, features de telephony e tooling** do que por micro‑diferenças de TTFB ao usar clones ElevenLabs.

### 5.3. Pós‑processamento de áudio (entrada/saída)

**Vapi – Ferramentas de audio processing**

- **Background Speech Denoising**:  
  - Smart Denoising (Krisp) – recomendado para a maioria dos casos.  
  - Fourier Denoising – filtro espectral ajustável que reduz fala de fundo em ≈73% em ambientes tipo call center, com <0,5 ms de overhead. [vapi](https://vapi.ai/blog/how-we-built-adaptive-background-speech-filtering-at-vapi)
- Blog técnico detalha suporte a classic denoising (spectral subtraction, Wiener filtering) e ML denoisers, bem como integrações BYO‑model. [vapi](https://vapi.ai/blog/audio-preprocessing)

**Retell – Noise & Echo Management**

- Documentação de “Handle background speech & noise” expõe modos:  
  - **Remove noise** – remove ruído de fundo com distorção quase nula e sem penalizar STT.  
  - **Remove noise + background speech** – mais agressivo, remove também vozes de fundo, com potencial impacto na acurácia de STT e sobretaxa de $0,005/min. [youtube](https://www.youtube.com/watch?v=2lgS9jaR3m8)
- Orchestration overview descreve ainda **echo cancellation**, endpointing preciso e gestão de interrupções. [docs.retellai](https://docs.retellai.com/general/orchestration_overview)

**Conclusão para D1 (áudio)**

- **Entrada (cliente → STT)**:  
  - Vapi é superior para setups em que se quer **controlo fino e combinação de denoisers**, incluindo Krisp + Fourier, e eventual integração com denoisers proprietários.  
  - Retell é forte em **simplicidade operacional** (dois modos) e foco em ambientes de call center, com echo cancellation integrado.

- **Saída (TTS ElevenLabs → cliente)**:  
  - O áudio já sai limpo da ElevenLabs; raramente é necessário pós‑processing adicional, excepto para normalização de loudness/AGC a nível da stack telephony.  
  - Nem Vapi nem Retell acrescentam muito aqui; qualquer “post‑processing” agressivo na saída tende a degradar a naturalidade da voz.

***

## 6. Análise de Custos e Escalabilidade – Barbearia (1.000 chamadas/mês)

### 6.1. Hipóteses de cálculo

- 1.000 chamadas/mês  
- 3 minutos por chamada → **3.000 min/mês**  
- Diálogo de complexidade moderada (marcação, remarcação, perguntas simples), não multi‑turno pesado.  
- Língua principal PT‑PT, com TTS ElevenLabs Flash v2.5.  

### 6.2. Consumo de caracteres e créditos ElevenLabs

Velocidade de fala típica telefónica:

- ~150 palavras/minuto × ~5–6 caracteres/palavra (incl. espaços) → ~800–900 caracteres/minuto.

Logo, para 3.000 min/mês:

- **Caracteres/mês ≈ 2,4M–2,7M**.

Segundo guias de pricing:

- Overages em planos Creator/Pro/Scale na ordem de **$0,24–0,30 / 1.000 caracteres**. [youtube](https://www.youtube.com/watch?v=PbXiUfcTJuI)

Intervalos de custo TTS puro:

- Limite baixo (~$0,24/1k, 800 chars/min):  
  - 800 chars/min × $0,24/1k = $0,192/min; 3.000 min → **$576/mês**.  
- Limite alto (~$0,30/1k, 900 chars/min):  
  - 900 chars/min × $0,30/1k = $0,27/min; 3.000 min → **$810/mês**.

Estas contas assumem integração directa ElevenLabs API sem bundles de minutos mais baratos em planos business; na prática, planos Business/Enterprise podem baixar o custo efetivo para ~**$0,12/min** em grandes volumes, mas isso implica comprometer‑se com 11.000+ min/mês. [elevenlabs](https://elevenlabs.io/pricing)

### 6.3. Custos com Vapi (incluindo orquestração)

Diversas análises independentes mostram:

- **Base platform fee Vapi**: $0,05/min de hosting. [ringg](https://www.ringg.ai/blogs/vapi-ai-pricing)
- Com telephony, STT, TTS ElevenLabs e LLM, o custo efetivo típico fica entre **$0,13–0,33/min**, dependendo da combinação de fornecedores e planos. [synthflow](https://synthflow.ai/blog/vapi-ai-pricing)

Para um agente razoavelmente simples (LLM médio, sem extras pesados), é realista assumir **$0,15–0,20/min**.

Cálculo para 3.000 min/mês:

| Cenário Vapi            | Custo estimado / min | Custo mensal (3.000 min) |
|-------------------------|----------------------|---------------------------|
| Otimizado low‑cost      | $0,15                | ≈ **$450**               |
| Configuração mais rica  | $0,20                | ≈ **$600**               |

Isto já inclui TTS, STT, LLM e orquestração; a ElevenLabs é paga indiretamente via a fatia de TTS do bundle.

### 6.4. Custos com Retell AI (incluindo ElevenLabs)

Análises externas e a própria Retell indicam:

- **Preço pay‑as‑you‑go para voz**: $0,07–0,08/min de Conversation Voice Engine. [retellai](https://www.retellai.com/resources/voice-ai-platform-pricing-comparison-2025)
- Acrescentando STT, LLM, telephony e extras (knowledge base, QA, compliance), o custo efetivo fica **~$0,13–0,31/min**, semelhante a Vapi, mas com estrutura tarifária diferente. [dialora](https://www.dialora.ai/blog/retell-ai-pricing)

Para um caso simples (sem HIPAA, sem features enterprise pesados):

| Cenário Retell          | Custo estimado / min | Custo mensal (3.000 min) |
|-------------------------|----------------------|---------------------------|
| Setup otimizado         | $0,13–0,18           | ≈ **$390–$540**          |
| Setup rico em features  | $0,20–0,25           | ≈ **$600–$750**          |

Novamente, o custo de ElevenLabs entra aqui como premium voice (~$0,07/min quando usado como fornecedor de TTS) dentro do bundle. [blog.dograh](https://blog.dograh.com/decoding-retell-ai-pricing-and-plans-in-2025/)

### 6.5. PVC vs IVC – impacto financeiro

**Do ponto de vista de pricing ElevenLabs:**

- Tanto **PVC como IVC usam o mesmo modelo TTS**; o custo por caractere/minuto de fala é idêntico. [elevenlabs](https://elevenlabs.io/blog/elevenlabs-vs-cartesia)
- O que muda é:  
  - Necessidade de subscrever planos com PVC incluído (Creator/Pro/Business, em vez de apenas free/Starter). [affmaven](https://affmaven.com/elevenlabs-pricing/)
  - Trabalho de produção de áudio: contratar locutor, estúdio, edição, limpeza (que dificilmente fica abaixo de algumas centenas de euros, mesmo num projeto pequeno). [elevenlabs](https://elevenlabs.io/blog/7-tips-for-creating-a-professional-grade-voice-clone-in-elevenlabs)

Para uma barbearia com 3.000 min/mês:

- O diferencial de custo mensal entre usar IVC (ou voz de biblioteca PT‑PT aceitável) e uma PVC é **praticamente zero ao nível do consumo de créditos**.  
- O custo de PVC é sobretudo **CAPEX criativo** (produção da voz), que só se justifica se:  
  - A voz for um activo de marca (e.g., “voz da marca” usada em campanhas, redes sociais, etc.), ou  
  - O volume de chamadas crescer para dezenas de milhares de minutos/mês, onde cada incremento marginal de qualidade converte em retenção/upsell.

**Resposta directa à pergunta “vale a pena financeiramente usar PVC para este volume?”**

- **Não, em regra não compensa** para 3.000 min/mês, salvo se a barbearia tiver uma estratégia de branding fortemente centrada na voz.  
- A abordagem racional é:  
  1. Começar com **IVC bem gravado** de um dos donos ou de um locutor PT‑PT (2–3 min de áudio limpo). [elevenlabs.accenture](https://elevenlabs.accenture.com/blog/7-tips-for-creating-a-professional-grade-voice-clone-in-elevenlabs)
  2. Afinar Stability/Similarity/Style e pipeline Vapi/Retell.  
  3. Só depois investir numa PVC com 30–60 min de gravações em estúdio se a operação escalar (multi‑loja, campanhas de rádio/TV/online com a mesma voz).

***

## 7. Recomendações Práticas para Camada D1 (Implementação Imediata)

### 7.1. Escolha de voz e estratégia PT‑PT

1. **Prototipagem / MVP (0–3 meses):**
   - Escolher 1 voz masculina de biblioteca claramente marcada como portuguesa (ex.: Tiago ou Hugo Mendonça) e validar auditivamente sotaque e ritmo em textos PT‑PT. [json2video](https://json2video.com/ai-voices/elevenlabs/languages/portuguese/)
   - Criar 1 IVC com locutor interno PT‑PT (2–3 min, áudio limpo, sem música), para testar diferenciação de marca. [elevenlabs-sdk.mintlify](https://elevenlabs-sdk.mintlify.app/voices/voice-lab/instant-voice-cloning)
   - Manter Style Exaggeration = 0 e Stability ~60–65, Similarity ~70–80 para reduzir artefactos.

2. **Operação estável (3–12 meses):**
   - Fixar 1–2 vozes canónicas (M/F), preferencialmente clones IVC bem ajustados e com dados de treino 100% PT‑PT.  
   - Se a componente feminina for crítica e não houver voz PT‑PT de catálogo adequada, considerar uma IVC duma locutora profissional.

3. **Escala / Branding avançado:**
   - Se a barbearia crescer para múltiplas localizações e a voz se tornar “assinatura da marca”, planear uma **sessão de PVC** com 30–60 min de áudio em estúdio, seguindo rigorosamente as guidelines ElevenLabs para gravação (sala tratada, micro profissional, sem ruído). [elevenlabs](https://elevenlabs.io/blog/7-tips-for-creating-a-professional-grade-voice-clone-in-elevenlabs)

### 7.2. Configuração técnica recomendada (ElevenLabs)

- **Modelo**:  
  - **Flash v2.5** para chamadas em tempo real (sub‑segundo, custo menor). [flexprice](https://flexprice.io/blog/elevenlabs-pricing-breakdown)
  - Multilingual v2 apenas se for prioritária a expressividade máxima (a custo de alguma latência).

- **Parâmetros D1 para PT‑PT em call center:**
  - Stability: **60–70**  
  - Similarity Boost: **70–80**  
  - Style Exaggeration: **0–2**

- **Boas práticas de texto:**
  - Utilizar sempre **ortografia PT‑PT** (“marcação”, “vocês vão”, “autocarro”) para reduzir choques perceptivos com sotaque.  
  - Evitar números longos e datas em formatos ambíguos; escrever números por extenso ou padronizar (ElevenLabs tem dificuldades documentadas com certos números/datas). [qcall](https://qcall.ai/elevenlabs-review/)

### 7.3. Plataforma de orquestração

**Se a prioridade é controle técnico fino de áudio e flexibilidade: (engenharia in‑house forte)**

- **Vapi + ElevenLabs**  
  - Vantagens:  
    - Integração detalhada com ElevenLabs Flash v2.5 para latência mínima. [docs.vapi](https://docs.vapi.ai/providers/voice/elevenlabs)
    - Ferramentas avançadas de denoising (Krisp + Fourier) configuráveis, adequadas a ambientes ruidosos como barbearias. [docs.vapi](https://docs.vapi.ai/documentation/assistants/conversation-behavior/background-speech-denoising)
    - Facilidade de trocar componentes (STT, LLM, TTS) se no futuro se quiser optimizar custo.  
  - Custos:  
    - Expectável **$450–$600/mês** para 3.000 min com setup bem optimizado. [blog.dograh](https://blog.dograh.com/vapi-pricing-breakdown-2025-plans-hidden-costs-what-to-expect/)

**Se a prioridade é simplicidade operacional e foco em chamadas de negócio:**

- **Retell AI + ElevenLabs**  
  - Vantagens:  
    - Telephony integrada, números de telefone próprios, warm transfer avançado, QA, analytics. [retellai](https://www.retellai.com/comparisons/retell-vs-elevenlabs)
    - Modos simples de denoising e echo cancellation pensados para call centers. [docs.retellai](https://docs.retellai.com/general/orchestration_overview)
    - Pricing linear e transparente ($0,07+/min de voz, com bundle de LLM/telephony a levar para ~$0,13–0,25/min). [dialora](https://www.dialora.ai/blog/retell-ai-pricing)
  - Custos:  
    - **$390–$750/mês** para 3.000 min, dependendo de modelo de LLM e features ativados. [synthflow](https://synthflow.ai/blog/retell-ai-pricing)

Para uma barbearia típica (sem equipa técnica extensa), **Retell** tende a ser mais “plug‑and‑play”; para um produto B2B de Voice AI com controlo total da pilha, **Vapi** oferece mais alavancas técnicas.

***

## 8. Conclusão

- **Português de Portugal na ElevenLabs é tecnicamente suportado, mas ainda pouco “primeira classe” no catálogo público**; conseguir uma voz PT‑PT verdadeiramente estável exige ou um bom clone (IVC/PVC) de um locutor português, ou um processo de curadoria e testes cuidadosos de vozes de biblioteca.  
- **PVC vs IVC**: a diferença chave é **robustez e fidelidade**, não latência; com 1–5 minutos de áudio limpo é perfeitamente possível obter uma voz suficientemente humana para Voice AI telefónico, sobretudo em IVC, mas não com o polimento máximo de um PVC treinado com horas de material.  
- **Configurações de Stability/Similarity/Style** devem ser conservadoras em ambiente de produção PT‑PT: Stability 60–70, Similarity 70–80, Style 0–2, com Flash v2.5 para latência mínima.  
- **Vapi e Retell** integram ElevenLabs de forma semelhante no que toca a TTS; as diferenças reais estão em telephony, denoising e tooling. Para uma barbearia com 3.000 min/mês, ambas entregam uma solução financeiramente viável com OPEX previsível na ordem de algumas centenas de dólares por mês.  
- **Financeiramente, uma PVC dedicada não se justifica à partida para 3.000 min/mês**; a estratégia ótima é iterar com IVC/vozes de biblioteca PT‑PT, refinar D1 (parâmetros de voz, pipeline de áudio, latência) e só mais tarde investir em PVC se a voz se tornar núcleo da identidade de marca.

Este quadro fornece uma base sólida para desenhar a camada D1 do sistema de Voice AI em PT‑PT, com decisões técnicas ancoradas em dados reais de latência, custos e capacidades das plataformas em 2025/2026.