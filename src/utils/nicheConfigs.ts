
export interface NicheInput {
    id: string;
    label: string;
    type: 'number' | 'currency' | 'percent';
    defaultValue: number;
    description?: string;
    step?: number;
}

export interface NicheConfig {
    id: string;
    label: string;
    inputs: NicheInput[];
    roiCalculations: {
        // Factors to calculate ROI
        averageRevenuePerIntervention: number; // e.g. ticket médio
        missedOpportunityRate: number; // % missed calls/leads
        conversionRate: number; // % conversion from lead to sale
    };
}

export const nicheConfigs: Record<string, NicheConfig> = {
    barbearia: {
        id: 'barbearia',
        label: 'Barbearia',
        inputs: [
            {
                id: 'teamSize',
                label: 'Número de Barbeiros',
                type: 'number',
                defaultValue: 3,
                description: 'Quantos profissionais atendem na barbearia?',
                step: 1
            },
            {
                id: 'avgTicket',
                label: 'Ticket Médio (€)',
                type: 'currency',
                defaultValue: 18,
                description: 'Valor médio gasto por cliente (corte + barba)',
                step: 0.5
            },
            {
                id: 'callsPerDay',
                label: 'Chamadas por Dia',
                type: 'number',
                defaultValue: 20,
                description: 'Média de chamadas recebidas diariamente',
                step: 1
            },
            {
                id: 'missedCallRate',
                label: 'Taxa de Chamadas Perdidas (%)',
                type: 'percent',
                defaultValue: 30,
                description: 'Percentagem estimada de chamadas não atendidas',
                step: 5
            }
        ],
        roiCalculations: {
            averageRevenuePerIntervention: 18,
            missedOpportunityRate: 0.30,
            conversionRate: 0.60 // 60% of answered calls result in booking
        }
    },
    clinica: {
        id: 'clinica',
        label: 'Clínica Médica / Dentária',
        inputs: [
            {
                id: 'callsPerDay',
                label: 'Chamadas por Dia',
                type: 'number',
                defaultValue: 30,
                description: 'Volume médio de chamadas diárias',
                step: 1
            },
            {
                id: 'avgTicket',
                label: 'Valor Médio Consulta (€)',
                type: 'currency',
                defaultValue: 70,
                description: 'Valor médio por consulta ou procedimento',
                step: 5
            },
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
                description: 'Salário + encargos de uma recepcionista (2026)',
                step: 50
            },
            {
                id: 'missedCallRate',
                label: 'Chamadas Perdidas (%)',
                type: 'percent',
                defaultValue: 25,
                description: 'Estimativa de chamadas não atendidas',
                step: 5
            }
        ],
        roiCalculations: {
            averageRevenuePerIntervention: 70,
            missedOpportunityRate: 0.25,
            conversionRate: 0.50
        }
    },
    restaurante: {
        id: 'restaurante',
        label: 'Restaurante',
        inputs: [
            {
                id: 'tablesCount',
                label: 'Número de Mesas',
                type: 'number',
                defaultValue: 40,
                step: 1
            },
            {
                id: 'ticketPerPerson',
                label: 'Ticket por Pessoa (€)',
                type: 'currency',
                defaultValue: 35,
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
                id: 'callsPerDay',
                label: 'Chamadas/Reservas por Dia',
                type: 'number',
                defaultValue: 25,
                description: 'Volume de chamadas recebidas diariamente',
                step: 1
            },
            {
                id: 'noShowRate',
                label: 'Taxa de No-Show (%)',
                type: 'percent',
                defaultValue: 15,
                description: 'Reservas que não comparecem (média PT sem sistema)',
                step: 1
            },
            {
                id: 'missedCallsService',
                label: 'Chamadas Perdidas no Serviço (%)',
                type: 'percent',
                defaultValue: 30,
                description: 'Chamadas perdidas durante almoço/jantar',
                step: 5
            }
        ],
        roiCalculations: {
            averageRevenuePerIntervention: 105, // 35 * 3
            missedOpportunityRate: 0.30,
            conversionRate: 0.70
        }
    },
    automoveis: {
        id: 'automoveis',
        label: 'Stand Automóvel',
        inputs: [
            {
                id: 'leadsPerDay',
                label: 'Leads por Dia',
                type: 'number',
                defaultValue: 15,
                description: 'Total de contactos (email, telefone, chat)',
                step: 1
            },
            {
                id: 'avgCarValue',
                label: 'Valor Médio Viatura (€)',
                type: 'currency',
                defaultValue: 20000,
                step: 500
            },
            {
                id: 'grossMargin',
                label: 'Margem Bruta por Venda (€)',
                type: 'currency',
                defaultValue: 2000,
                step: 100
            },
            {
                id: 'conversionRate',
                label: 'Taxa de Conversão Atual (%)',
                type: 'percent',
                defaultValue: 25,
                description: 'Leads que convertem em visita/venda',
                step: 1
            },
            {
                id: 'afterHoursLeads',
                label: 'Leads Fora de Horário (%)',
                type: 'percent',
                defaultValue: 30,
                description: 'Contactos recebidos quando fechado',
                step: 5
            }
        ],
        roiCalculations: {
            averageRevenuePerIntervention: 2000, // Margin is what matters for value calculation
            missedOpportunityRate: 0.30,
            conversionRate: 0.25
        }
    }
};
