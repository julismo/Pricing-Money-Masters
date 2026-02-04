# Skills do Projeto Barbearia ROI Calculator

Este diretório contém as skills que estendem as capacidades do agente AI para trabalhar neste projeto.

## Estrutura

```
.agent/skills/
├── interface-design/       # Princípios de design de interfaces
│   ├── SKILL.md           # Instruções principais
│   ├── references/        # Exemplos e validação
│   └── commands/          # Comandos disponíveis
│
└── claude-code-plugins/   # Plugins do Claude Code
    ├── README.md          # Documentação
    └── plugins/           # Lista de plugins disponíveis
```

## Skills Disponíveis

### 1. Interface Design
**Fonte:** [Dammyjay93/interface-design](https://github.com/Dammyjay93/interface-design)

Para design de dashboards, admin panels, apps e ferramentas interativas (NÃO para landing pages).

**Principais conceitos:**
- Craft & Consistency - Decisões de design que persistem entre sessões
- Subtle Layering - Hierarquia visual com diferenças mínimas
- Intent First - Responder "quem", "o quê", "como" antes de desenhar

**Comandos:**
- `/interface-design:status` - Estado atual do sistema
- `/interface-design:audit` - Verificar código contra sistema
- `/interface-design:extract` - Extrair padrões do código

### 2. Claude Code Plugins
**Fonte:** [anthropics/claude-code](https://github.com/anthropics/claude-code)

Plugins oficiais Anthropic com funcionalidades adicionais.

## Como Usar

O agente irá automaticamente ler o `SKILL.md` quando relevante para a tarefa atual.

Para ativar manualmente, peça: "Use a skill de interface-design para..."

---

*Instalado em: 2026-02-04*
