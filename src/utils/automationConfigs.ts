// Configurações de Automação por Tipo
// Este ficheiro define os diferentes tipos de automação suportados
// e os seus custos/parâmetros específicos

export type AutomationType = 'voice_ai' | 'chatbot_whatsapp' | 'chatbot_website';
export type VolumeUnit = 'calls' | 'messages';
export type ObjectiveType = 'time' | 'money';

export interface AutomationConfig {
    id: AutomationType;
    label: string;
    description: string;
    icon: string; // Lucide icon name
    volumeUnit: VolumeUnit;
    volumeLabel: string;
    volumeLabelPerWeek: string;

    // Custos padrão (Portugal 2025)
    costs: {
        perUnit: number;        // €/min para voice, €/msg para chatbot
        unitLabel: string;      // "minuto" ou "mensagem"
        platformMonthly: number; // Custo fixo mensal da plataforma
        setupFee: number;       // Taxa de configuração inicial
    };

    // Métricas de performance (benchmarks)
    benchmarks: {
        avgResolutionRate: number;  // % de interações resolvidas sem humano
        avgResponseTime: number;     // Segundos (chatbot) ou minutos (voice)
        conversionLift: number;      // % melhoria na conversão
        timeSavedPerInteraction: number; // Minutos poupados por interação
    };

    // Inputs específicos para este tipo de automação
    specificInputs: AutomationInput[];
}

export interface AutomationInput {
    id: string;
    label: string;
    type: 'number' | 'currency' | 'percent' | 'duration';
    defaultValue: number;
    description?: string;
    step?: number;
    unit?: string;
    showFor?: ObjectiveType[]; // Se vazio, mostra para ambos
}

// ============================================================
// CONFIGURAÇÕES POR TIPO DE AUTOMAÇÃO
// ============================================================

export const automationConfigs: Record<AutomationType, AutomationConfig> = {

    // --------------------------------------------------------
    // VOICE AI (Chamadas Telefónicas)
    // --------------------------------------------------------
    voice_ai: {
        id: 'voice_ai',
        label: 'Voice AI',
        description: 'Atendimento telefónico automatizado com IA',
        icon: 'Phone',
        volumeUnit: 'calls',
        volumeLabel: 'Chamadas',
        volumeLabelPerWeek: 'Chamadas por Semana',

        costs: {
            perUnit: 0.14,          // €/min (Retell AI média)
            unitLabel: 'minuto',
            platformMonthly: 15,    // Twilio número PT
            setupFee: 500,          // Setup inicial
        },

        benchmarks: {
            avgResolutionRate: 0.82,    // 82% resolvidas sem humano
            avgResponseTime: 0,          // Atende imediatamente
            conversionLift: 0.25,        // 25% mais conversões
            timeSavedPerInteraction: 5,  // 5 min poupados por chamada
        },

        specificInputs: [
            {
                id: 'callsPerWeek',
                label: 'Chamadas por Semana',
                type: 'number',
                defaultValue: 100,
                description: 'Total de chamadas recebidas semanalmente',
                step: 5
            },
            {
                id: 'avgCallDuration',
                label: 'Duração Média (minutos)',
                type: 'duration',
                defaultValue: 3,
                description: 'Tempo médio de cada chamada',
                step: 0.5,
                unit: 'min'
            },
            {
                id: 'missedCallRate',
                label: 'Taxa de Chamadas Perdidas (%)',
                type: 'percent',
                defaultValue: 30,
                description: 'Percentagem de chamadas não atendidas',
                step: 5
            }
        ]
    },

    // --------------------------------------------------------
    // CHATBOT WHATSAPP
    // --------------------------------------------------------
    chatbot_whatsapp: {
        id: 'chatbot_whatsapp',
        label: 'Chatbot WhatsApp',
        description: 'Atendimento automático via WhatsApp Business',
        icon: 'MessageCircle',
        volumeUnit: 'messages',
        volumeLabel: 'Mensagens',
        volumeLabelPerWeek: 'Mensagens por Semana',

        costs: {
            perUnit: 0.05,          // €/msg média PT (utility)
            unitLabel: 'mensagem',
            platformMonthly: 50,    // Plataforma chatbot
            setupFee: 300,          // Setup inicial
        },

        benchmarks: {
            avgResolutionRate: 0.70,    // 70% resolvidas sem humano
            avgResponseTime: 5,          // 5 segundos
            conversionLift: 0.40,        // 40% mais conversões (WhatsApp é forte)
            timeSavedPerInteraction: 3,  // 3 min poupados por conversa
        },

        specificInputs: [
            {
                id: 'messagesPerWeek',
                label: 'Mensagens por Semana',
                type: 'number',
                defaultValue: 200,
                description: 'Total de mensagens recebidas semanalmente',
                step: 10
            },
            {
                id: 'avgMessagesPerConversation',
                label: 'Mensagens por Conversa',
                type: 'number',
                defaultValue: 5,
                description: 'Média de mensagens por conversa até resolução',
                step: 1
            },
            {
                id: 'unansweredRate',
                label: 'Taxa Não Respondidas (%)',
                type: 'percent',
                defaultValue: 20,
                description: 'Mensagens que ficam sem resposta (fora horário)',
                step: 5
            }
        ]
    },

    // --------------------------------------------------------
    // CHATBOT WEBSITE
    // --------------------------------------------------------
    chatbot_website: {
        id: 'chatbot_website',
        label: 'Chatbot Website',
        description: 'Widget de chat no website para captura de leads',
        icon: 'Globe',
        volumeUnit: 'messages',
        volumeLabel: 'Conversas',
        volumeLabelPerWeek: 'Conversas por Semana',

        costs: {
            perUnit: 0.02,          // €/conversa (muito baixo)
            unitLabel: 'conversa',
            platformMonthly: 30,    // Plataforma básica
            setupFee: 200,          // Setup simples
        },

        benchmarks: {
            avgResolutionRate: 0.60,    // 60% resolvidas sem humano
            avgResponseTime: 2,          // 2 segundos
            conversionLift: 0.20,        // 20% mais conversões
            timeSavedPerInteraction: 2,  // 2 min poupados por conversa
        },

        specificInputs: [
            {
                id: 'conversationsPerWeek',
                label: 'Conversas por Semana',
                type: 'number',
                defaultValue: 50,
                description: 'Conversas iniciadas no widget do site',
                step: 5
            },
            {
                id: 'leadCaptureRate',
                label: 'Taxa de Captura de Lead (%)',
                type: 'percent',
                defaultValue: 30,
                description: 'Conversas que geram lead qualificado',
                step: 5,
                showFor: ['money']
            }
        ]
    }
};

// ============================================================
// MAPEAMENTO NICHO → AUTOMAÇÕES RECOMENDADAS
// ============================================================

export const nicheToAutomations: Record<string, {
    recommended: AutomationType;
    available: AutomationType[];
    reason: string;
}> = {
    barbearia: {
        recommended: 'voice_ai',
        available: ['voice_ai', 'chatbot_whatsapp'],
        reason: 'Clientes preferem ligar para marcar corte rapidamente'
    },
    clinica: {
        recommended: 'voice_ai',
        available: ['voice_ai', 'chatbot_whatsapp', 'chatbot_website'],
        reason: 'Pacientes mais velhos preferem telefone; jovens usam WhatsApp'
    },
    restaurante: {
        recommended: 'chatbot_whatsapp',
        available: ['voice_ai', 'chatbot_whatsapp'],
        reason: 'WhatsApp é mais prático para reservas rápidas'
    },
    automoveis: {
        recommended: 'chatbot_whatsapp',
        available: ['chatbot_whatsapp', 'chatbot_website', 'voice_ai'],
        reason: 'Leads chegam maioritariamente por digital (OLX, Standvirtual)'
    }
};

// ============================================================
// HELPERS
// ============================================================

export function getAutomationConfig(type: AutomationType): AutomationConfig {
    return automationConfigs[type];
}

export function getAvailableAutomations(niche: string): AutomationType[] {
    return nicheToAutomations[niche]?.available || ['voice_ai'];
}

export function getRecommendedAutomation(niche: string): AutomationType {
    return nicheToAutomations[niche]?.recommended || 'voice_ai';
}

export function calculateAutomationCost(
    type: AutomationType,
    volumePerMonth: number,
    avgDuration: number = 3
): { monthly: number; yearly: number; breakdown: Record<string, number> } {
    const config = automationConfigs[type];

    let variableCost = 0;
    if (type === 'voice_ai') {
        // Voice: volume * duration * €/min
        variableCost = volumePerMonth * avgDuration * config.costs.perUnit;
    } else {
        // Chatbot: volume * €/msg
        variableCost = volumePerMonth * config.costs.perUnit;
    }

    const monthly = variableCost + config.costs.platformMonthly;
    const yearly = monthly * 12;

    return {
        monthly,
        yearly,
        breakdown: {
            variable: variableCost,
            platform: config.costs.platformMonthly,
            setup: config.costs.setupFee
        }
    };
}
