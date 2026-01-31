# Arquitetura do Sistema: Moltbot + Voice AI (Self-Hosted)

Este documento descreve a estrutura técnica para o assistente pessoal de IA (Moltbot) integrado com capacidades de voz, hospedado em VPS próprio.

## Visão Geral

O sistema atua como um "Cérebro Central" hospedado em um servidor virtual (VPS), controlando interações via Texto (WhatsApp/Telegram) e Voz (Telefonia). A inteligência é provida pela API do Claude (Anthropic), enquanto a orquestração é feita pelo Moltbot.

```mermaid
graph TD
    User([User])
    
    subgraph "Canais de Entrada"
        WA[WhatsApp / Telegram]
        Phone[Telefone (Voz)]
    end
    
    subgraph "Segurança Perimetral"
        CF[Cloudflare (DNS + Proxy + WAF)]
    end

    subgraph "VPS (Hetzner Nuermberg) - Orchestrated by Coolify"
        ingress[Traefik (Proxy Reverso)]
        
        subgraph "Data Layer"
            Postgres[(PostgreSQL - DB)]
            Redis[(Redis - Queue/Cache)]
        end
        
        subgraph "Apps"
            MoltbotCore[Moltbot Core]
            VoiceService[Serviço de Voz (STT/TTS)]
        end
    end

    User -->|HTTPS/WSS| CF
    CF -->|Filtrado| ingress
    ingress --> MoltbotCore
    ingress --> VoiceService
    
    MoltbotCore --> Postgres
    MoltbotCore --> Redis
    
    VoiceService --> Redis
    
    MoltbotCore -->|Contexto + Prompt| ClaudeAPI
    ClaudeAPI -->|Resposta Inteligente| MoltbotCore
    
    MoltbotCore -->|Resposta Texto| GatewayServer
    MoltbotCore -->|Resposta Texto| VoiceService
    
    GatewayServer -->|Envia Msg| Twilio
    VoiceService -->|Áudio Sintetizado| Twilio
    
    Twilio --> WA
    Twilio --> Phone
```

## Componentes do Sistema

### 1. Infraestrutura (VPS & Orchestration) - "Enterprise Standard"
*   **Provider**: Hetzner Cloud (Location: **Nuremberg/Falkenstein**) - Latência <40ms para PT.
*   **Orquestrador**: **Coolify** (PaaS privado). Substitui gestão manual de Docker.
*   **Segurança**: **Cloudflare** (Modo Proxy) para esconder IP real e mitigar DDoS.
*   **Data Stack**:
    *   **PostgreSQL**: Base de dados robusta para evitar corrupção (vs SQLite).
    *   **Redis**: Para filas de mensagens e buffer de alta velocidade.

### 2. Core (Moltbot/Clawdbot)
*   **Função**: Orquestrador central. Mantém o contexto da conversa, memória de longo prazo e toma decisões.
*   **Deploy**: Via Coolify (Docker Compose).
*   **Integração**: Conecta-se à API da Anthropic.

### 3. Gateway de Voz & Telefonia
*   **Provider**: Twilio (Números de Portugal + Trunking/Programmable Voice).
*   **Voice Stack (Self-hosted Option)**:
    *   **STT (Speech-to-Text)**: Deepgram ou Whisper (local/API) para converter áudio do Twilio em texto rápido.
    *   **TTS (Text-to-Speech)**: ElevenLabs, Deepgram ou OpenAI TTS para gerar áudio de retorno.
    *   **Orquestração de Voz**: Node.js/Python server que gerencia o WebSocket do Twilio Media Stream.

### 4. Inteligência (LLM)
*   **Provider**: Anthropic API.
*   **Modelos**:
    *   *Claude 3.5 Sonnet*: Balanceado para a maioria das interações (Raciocínio + Velocidade).
    *   *Claude 3 Haiku*: Para respostas ultra-rápidas em voz (baixa latência).

## Fluxo de Dados

### Fluxo de Texto (WhatsApp)
1.  Usuário envia mensagem.
2.  Twilio recebe e dispara Webhook para o VPS.
3.  Moltbot processa a mensagem, recupera histórico do DB.
4.  Moltbot envia prompt para Claude API.
5.  Claude responde.
6.  Moltbot envia resposta para Twilio → WhatsApp do usuário.

### Fluxo de Voz (Chamada Telefônica)
1.  Usuário liga para o número Twilio.
2.  Twilio conecta via WebSocket (Media Stream) ao Serviço de Voz no VPS.
3.  **STT**: Serviço converte fala em texto em tempo real.
4.  Texto entra no Moltbot como se fosse uma mensagem.
5.  Moltbot gera resposta (com Claude).
6.  **TTS**: Serviço converte resposta de texto em áudio.
7.  Áudio é enviado de volta pelo WebSocket para o Twilio → Usuário ouve.

## Próximos Passos de Estruturação
1.  **Setup do Ambiente**: Provisionamento do VPS e instalação básica.
2.  **Core Install**: Rodar o Moltbot e testar via texto (Terminal/Web).
3.  **Canais**: Configurar número Twilio e conectar Webhooks básicos.
4.  **Voz**: Implementar o servidor de Media Stream para conectar o "cérebro" à chamada telefônica.
