// Configurações por Nicho - Inputs específicos para cada setor
// Atualizado com dados de mercado Portugal 2025

export interface NicheInput {
    id: string;
    label: string;
    type: 'number' | 'currency' | 'percent';
    defaultValue: number;
    description?: string;
    step?: number;
    unit?: string;
    min?: number;  // Valor mínimo permitido
    max?: number;  // Valor máximo permitido
    // NOVO: Mostrar apenas para um objetivo específico
    showFor?: ('time' | 'money')[];
    // NOVO: Para inputs de volume, permitir escolher período
    volumePeriod?: 'day' | 'week';  // Se definido, mostra toggle dia/semana
}

export interface NicheConfig {
    id: string;
    label: string;
    description: string;
    icon: string; // Lucide icon name

    // Inputs do formulário
    inputs: NicheInput[];

    // Inputs comuns que todos os nichos têm
    commonInputs: {
        volumeInput: NicheInput;      // Chamadas/Leads/Mensagens por dia
        missedRateInput: NicheInput;  // Taxa de perdidas
        ticketInput: NicheInput;      // Valor médio
    };

    // Benchmarks de ROI para este nicho
    roiCalculations: {
        averageRevenuePerIntervention: number;
        missedOpportunityRate: number;
        conversionRate: number;
        // NOVO: Métricas específicas para Poupar Tempo
        avgTaskDurationMinutes: number;     // Tempo médio da tarefa manual
        contextSwitchMinutes: number;       // Tempo perdido a mudar de contexto
        hourlyStaffCost: number;            // Custo hora funcionário (com TSU)
    };

    // Dados de mercado Portugal 2025
    marketData: {
        totalBusinesses: number;      // Número estimado de negócios em PT
        avgVolumePerDay: number;      // Volume médio diário
        avgTicket: number;            // Ticket médio real
        missedRate: number;           // Taxa perdidas típica
        noShowRate?: number;          // Taxa no-show (se aplicável)
    };
}

// ============================================================
// CONFIGURAÇÕES POR NICHO
// ============================================================

export const nicheConfigs: Record<string, NicheConfig> = {

    // --------------------------------------------------------
    // BARBEARIA
    // --------------------------------------------------------
    barbearia: {
        id: 'barbearia',
        label: 'Barbearia',
        description: 'Gestão de marcações e atendimento ao cliente',
        icon: 'Scissors',

        commonInputs: {
            volumeInput: {
                id: 'callsPerDay',
                label: 'Chamadas',
                type: 'number',
                defaultValue: 20,
                description: 'Média de chamadas recebidas',
                step: 1,
                volumePeriod: 'day'
            },
            missedRateInput: {
                id: 'missedCallRate',
                label: 'Chamadas Perdidas (%)',
                type: 'percent',
                defaultValue: 20,
                description: 'Percentagem estimada de chamadas não atendidas (máx 30%)',
                step: 5,
                max: 30
            },
            ticketInput: {
                id: 'avgTicket',
                label: 'Ticket Médio (€)',
                type: 'currency',
                defaultValue: 18,
                description: 'Valor médio gasto por cliente (corte + barba)',
                step: 1
            }
        },

        inputs: [
            {
                id: 'noShowRate',
                label: 'Taxa de No-Show (%)',
                type: 'percent',
                defaultValue: 12,
                description: 'Percentagem de clientes que não comparecem à marcação (máx 30%)',
                step: 1,
                min: 0,
                max: 30
            },
            {
                id: 'cutDuration',
                label: 'Duração do Corte (min)',
                type: 'number',
                defaultValue: 30,
                description: 'Tempo médio de um corte completo',
                step: 5,
                showFor: ['time']
            },
            {
                id: 'callDuration',
                label: 'Duração da Chamada (min)',
                type: 'number',
                defaultValue: 2,
                description: 'Tempo médio de cada chamada de agendamento (1-5 min)',
                step: 1,
                min: 1,
                max: 5,
                showFor: ['time']
            }
        ],

        roiCalculations: {
            averageRevenuePerIntervention: 18,
            missedOpportunityRate: 0.30,
            conversionRate: 0.60,
            avgTaskDurationMinutes: 2,
            contextSwitchMinutes: 3,
            hourlyStaffCost: 8  // €8/hora (salário mínimo + margem)
        },

        marketData: {
            totalBusinesses: 3500,
            avgVolumePerDay: 20,
            avgTicket: 18,
            missedRate: 0.30,
            noShowRate: 0.12
        }
    },

    // --------------------------------------------------------
    // CLÍNICA MÉDICA / DENTÁRIA
    // --------------------------------------------------------
    clinica: {
        id: 'clinica',
        label: 'Clínica Médica / Dentária',
        description: 'Agendamento de consultas e confirmações automáticas',
        icon: 'Stethoscope',

        commonInputs: {
            volumeInput: {
                id: 'callsPerDay',
                label: 'Chamadas',
                type: 'number',
                defaultValue: 30,
                description: 'Volume médio de chamadas',
                step: 1,
                volumePeriod: 'day'
            },
            missedRateInput: {
                id: 'missedCallRate',
                label: 'Chamadas Perdidas (%)',
                type: 'percent',
                defaultValue: 20,
                description: 'Estimativa de chamadas não atendidas (máx 30%)',
                step: 5,
                max: 30
            },
            ticketInput: {
                id: 'avgTicket',
                label: 'Valor Médio Consulta (€)',
                type: 'currency',
                defaultValue: 70,
                description: 'Valor médio por consulta ou procedimento',
                step: 5
            }
        },

        inputs: [
            {
                id: 'noShowRate',
                label: 'Taxa de No-Show (%)',
                type: 'percent',
                defaultValue: 12,
                description: 'Percentagem de pacientes que faltam sem avisar',
                step: 1
            },
            {
                id: 'receptionistCost',
                label: 'Custo Mensal Receção (€)',
                type: 'currency',
                defaultValue: 1600,
                description: 'Salário + encargos de uma recepcionista (2025-2026)',
                step: 50,
                showFor: ['time']
            },
            {
                id: 'confirmationCallDuration',
                label: 'Duração da Chamada (min)',
                type: 'number',
                defaultValue: 2,
                description: 'Tempo médio de confirmação de consulta (1-5 min)',
                step: 1,
                min: 1,
                max: 5,
                showFor: ['time']
            },
            {
                id: 'consultationsPerDay',
                label: 'Consultas por Dia',
                type: 'number',
                defaultValue: 25,
                description: 'Número médio de consultas agendadas por dia',
                step: 1,
                showFor: ['time']
            }
        ],

        roiCalculations: {
            averageRevenuePerIntervention: 70,
            missedOpportunityRate: 0.25,
            conversionRate: 0.50,
            avgTaskDurationMinutes: 3,
            contextSwitchMinutes: 2,
            hourlyStaffCost: 10  // €10/hora (admin/rececionista)
        },

        marketData: {
            totalBusinesses: 6000,
            avgVolumePerDay: 30,
            avgTicket: 70,
            missedRate: 0.25,
            noShowRate: 0.12
        }
    },

    // --------------------------------------------------------
    // RESTAURANTE
    // --------------------------------------------------------
    restaurante: {
        id: 'restaurante',
        label: 'Restaurante',
        description: 'Reservas automáticas e gestão de no-shows',
        icon: 'Utensils',

        commonInputs: {
            volumeInput: {
                id: 'callsPerDay',
                label: 'Chamadas/Reservas',
                type: 'number',
                defaultValue: 25,
                description: 'Volume de chamadas/reservas recebidas',
                step: 1,
                volumePeriod: 'day'
            },
            missedRateInput: {
                id: 'missedCallsService',
                label: 'Chamadas Perdidas no Serviço (%)',
                type: 'percent',
                defaultValue: 25,
                description: 'Chamadas perdidas durante almoço/jantar (máx 30%)',
                step: 5,
                max: 30
            },
            ticketInput: {
                id: 'ticketPerPerson',
                label: 'Ticket por Pessoa (€)',
                type: 'currency',
                defaultValue: 31,
                description: 'Gasto médio por pessoa (dados turismo PT 2024)',
                step: 1
            }
        },

        inputs: [
            {
                id: 'tablesCount',
                label: 'Número de Mesas',
                type: 'number',
                defaultValue: 40,
                step: 1
            },
            {
                id: 'avgGroupSize',
                label: 'Pessoas por Mesa',
                type: 'number',
                defaultValue: 3,
                step: 1
            },
            {
                id: 'noShowRate',
                label: 'Taxa de No-Show (%)',
                type: 'percent',
                defaultValue: 18,
                description: 'Percentagem de reservas que não comparecem (máx 30%)',
                step: 1,
                min: 0,
                max: 30
            },
            {
                id: 'turnsPerDay',
                label: 'Rotações por Dia',
                type: 'number',
                defaultValue: 2,
                description: 'Quantas vezes cada mesa é ocupada (almoço + jantar)',
                step: 0.5,
                showFor: ['money']
            },
            {
                id: 'reservationCallDuration',
                label: 'Duração da Chamada (min)',
                type: 'number',
                defaultValue: 2,
                description: 'Tempo médio de reserva por telefone (1-5 min)',
                step: 1,
                min: 1,
                max: 5,
                showFor: ['time']
            }
        ],

        roiCalculations: {
            averageRevenuePerIntervention: 93, // 31 * 3 pessoas
            missedOpportunityRate: 0.35,
            conversionRate: 0.70,
            avgTaskDurationMinutes: 3,
            contextSwitchMinutes: 5, // Mais alto porque interrompe serviço
            hourlyStaffCost: 9  // €9/hora
        },

        marketData: {
            totalBusinesses: 25000,
            avgVolumePerDay: 25,
            avgTicket: 93,
            missedRate: 0.35,
            noShowRate: 0.15
        }
    },

    // --------------------------------------------------------
    // STAND AUTOMÓVEIS
    // --------------------------------------------------------
    automoveis: {
        id: 'automoveis',
        label: 'Stand Automóvel',
        description: 'Qualificação de leads e resposta imediata 24/7',
        icon: 'Car',

        commonInputs: {
            volumeInput: {
                id: 'leadsPerDay',
                label: 'Leads',
                type: 'number',
                defaultValue: 15,
                description: 'Total de contactos (email, telefone, chat, OLX)',
                step: 1,
                volumePeriod: 'day'
            },
            missedRateInput: {
                id: 'afterHoursLeads',
                label: 'Leads Fora de Horário (%)',
                type: 'percent',
                defaultValue: 35,
                description: 'Contactos recebidos quando fechado (noite/fim-de-semana)',
                step: 5
            },
            ticketInput: {
                id: 'grossMargin',
                label: 'Margem Bruta por Venda (€)',
                type: 'currency',
                defaultValue: 2000,
                description: 'Lucro médio por viatura vendida (não valor total)',
                step: 100
            }
        },

        inputs: [
            {
                id: 'avgCarValue',
                label: 'Valor Médio Viatura (€)',
                type: 'currency',
                defaultValue: 18000,
                description: 'Preço médio dos carros vendidos',
                step: 500,
                showFor: ['money']
            },
            {
                id: 'currentConversionRate',
                label: 'Taxa de Conversão Atual (%)',
                type: 'percent',
                defaultValue: 8,
                description: 'Leads que convertem em venda (benchmark PT: 5-10%)',
                step: 1,
                showFor: ['money']
            },
            {
                id: 'responseTimeMinutes',
                label: 'Tempo de Resposta Atual (min)',
                type: 'number',
                defaultValue: 120,
                description: 'Tempo médio até responder a um lead (em minutos)',
                step: 15,
                showFor: ['time']
            },
            {
                id: 'salesTeamSize',
                label: 'Tamanho Equipa Comercial',
                type: 'number',
                defaultValue: 3,
                description: 'Número de comerciais que respondem a leads',
                step: 1,
                showFor: ['time']
            },
            {
                id: 'timePerLeadMinutes',
                label: 'Tempo por Lead (min)',
                type: 'number',
                defaultValue: 15,
                description: 'Tempo gasto a qualificar cada lead manualmente',
                step: 5,
                showFor: ['time']
            }
        ],

        roiCalculations: {
            averageRevenuePerIntervention: 2000, // Margem, não valor total
            missedOpportunityRate: 0.35,
            conversionRate: 0.08,
            avgTaskDurationMinutes: 15,
            contextSwitchMinutes: 5,
            hourlyStaffCost: 15  // €15/hora (comercial)
        },

        marketData: {
            totalBusinesses: 5000,
            avgVolumePerDay: 15,
            avgTicket: 2000,
            missedRate: 0.35
        }
    }
};

// ============================================================
// HELPERS
// ============================================================

export function getNicheConfig(nicheId: string): NicheConfig {
    return nicheConfigs[nicheId] || nicheConfigs['barbearia'];
}

export function getAllInputsForNiche(nicheId: string, objective: 'time' | 'money'): NicheInput[] {
    const config = getNicheConfig(nicheId);

    // Combinar inputs comuns + específicos
    const allInputs = [
        config.commonInputs.volumeInput,
        config.commonInputs.missedRateInput,
        config.commonInputs.ticketInput,
        ...config.inputs
    ];

    // Filtrar por objetivo (se showFor definido)
    return allInputs.filter(input => {
        if (!input.showFor || input.showFor.length === 0) return true;
        return input.showFor.includes(objective);
    });
}

export function getDefaultsForNiche(nicheId: string): Record<string, number> {
    const config = getNicheConfig(nicheId);
    const defaults: Record<string, number> = {};

    // Common inputs
    defaults[config.commonInputs.volumeInput.id] = config.commonInputs.volumeInput.defaultValue;
    defaults[config.commonInputs.missedRateInput.id] = config.commonInputs.missedRateInput.defaultValue;
    defaults[config.commonInputs.ticketInput.id] = config.commonInputs.ticketInput.defaultValue;

    // Specific inputs
    config.inputs.forEach(input => {
        defaults[input.id] = input.defaultValue;
    });

    return defaults;
}
