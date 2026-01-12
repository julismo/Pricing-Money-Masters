
// Based on research for Portugal (Lisbon/Margem Sul) 2025/2026
// Source: User provided market analysis

export const SEASONALITY_FACTORS = [
    { month: 'Janeiro', factor: 0.75, label: 'Pós-Festas' },
    { month: 'Fevereiro', factor: 0.80, label: 'Inverno' },
    { month: 'Março', factor: 0.85, label: 'Início Primavera' },
    { month: 'Abril', factor: 0.90, label: 'Páscoa' },
    { month: 'Maio', factor: 1.00, label: 'Base' },
    { month: 'Junho', factor: 1.25, label: 'Santo António' },
    { month: 'Julho', factor: 0.95, label: 'Pré-Férias' },
    { month: 'Agosto', factor: 0.65, label: 'Férias (Vale)' },
    { month: 'Setembro', factor: 0.85, label: 'Regresso' },
    { month: 'Outubro', factor: 0.95, label: 'Estável' },
    { month: 'Novembro', factor: 1.05, label: 'Black Friday' },
    { month: 'Dezembro', factor: 1.35, label: 'Natal (Pico)' },
];
