# Análise Crítica: Sistema de Cálculo ROI - Barbearia

**Data:** 25 Janeiro 2026
**Objetivo:** Avaliar justiça, precisão e sugestões de melhoria

---

## 1. Resumo da Análise
**Veredicto:** Sistema Justo e Sólido (7.5/10)

O sistema apresenta uma lógica robusta baseada em dois vetores de valor (Tempo e Oportunidade) e incorpora conceitos avançados como sazonalidade real. As recentes alterações para "desbufar" o modo Realista melhoraram significativamente a justiça do cálculo de preço.

---

## 2. Pontos Fortes
*   **Transparência:** Separação clara entre os modos "Realista" (Foco em Eficiência) e "Potencial" (Foco em Crescimento).
*   **Assumptions Documentadas:** O código define claramente fatores de utilização, eficiência de IA e taxas de conversão.
*   **Sazonalidade Avançada:** Uso de dados reais de mercado para ajustar receitas e aplicar penalidades de stress em alta temporada.
*   **Preço Orgânico:** O novo seletor de estratégia (20-30%) remove a arbitrariedade de "pisos fixos", baseando o preço inteiramente no valor gerado.

---

## 3. Problemas Críticos Encontrados (e Corrigidos)

### A. Limitação de Capacidade Incompleta
**Problema:** A verificação de capacidade física (horas disponíveis no dia) considerava apenas o tempo poupado (`cutsFromTime`), ignorando os novos cortes gerados pelas chamadas perdidas (`newClients`).
**Risco:** O sistema poderia prometer receitas impossíveis de entregar fisicamente.
**Solução:** Atualizada a lógica para somar `totalCuts = cutsFromTime + newClients` antes de verificar o limite de capacidade.

### B. Falta de Validação de Inputs
**Problema:** O sistema aceitava valores negativos ou zero para inputs críticos como `cutDuration` ou `averageTicket`.
**Risco:** Erros matemáticos (divisão por zero) ou projeções absurdas.
**Solução:** Implementadas "Guard Clauses" no início do cálculo para rejeitar valores inválidos.

### C. Logs de Debug em Produção
**Problema:** Chamadas `fetch` para localhost estavam presentes no código principal.
**Risco:** Erros de console no navegador do cliente (CORS/Network Error) e performance degradada.
**Solução:** Envolvido todo o código de telemetria/debug em verificações `if (import.meta.env.DEV)`.

---

## 4. Sugestões Futuras (Backlog)

### Prioridade Média
*   **Tooltip de Dupla Contagem:** Adicionar explicação visual de que o "Tempo Recuperado" assume que o tempo gasto ao telefone seria usado para cortar cabelo (o que é verdade em barbearias pequenas, mas menos em grandes com recepcionista dedicada).
*   **Expor Assumptions:** Mostrar na UI quais as taxas de conversão usadas em cada modo.

### Prioridade Baixa
*   **Testes Unitários:** Criar suite de testes automatizados para garantir que a lógica de ROI não regride com futuras alterações.

---

*Documento gerado para registro de auditoria técnica.*
