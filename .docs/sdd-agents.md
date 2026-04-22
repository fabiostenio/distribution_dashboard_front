# SDD — Agentes de IA

## O que é SDD

**SDD (Software Development with AI Agents)** é uma metodologia que define agentes especializados para cada papel do processo de desenvolvimento. Cada agente possui identidade, responsabilidades e instruções operacionais documentadas, permitindo que ferramentas de IA (GitHub Copilot Agent Mode, Cursor, etc.) atuem com contexto preciso e consistente.

---

## Estrutura de arquivos

Os agentes residem em `.github/` e cada agente é composto por três arquivos:

```
.github/
├── agents/
│   └── <nome>.agent.md          ← Identidade: quem é, o que faz, escopo
├── prompts/
│   └── <nome>.prompt.md         ← Como ativar o agente (prompts de entrada)
└── instructions/
    └── <nome>.instructs.md      ← Comportamento detalhado, checklists, formatos
```

| Arquivo | Propósito |
|---|---|
| `.agent.md` | Define a persona, responsabilidades e limites do agente |
| `.prompt.md` | Contém os prompts prontos para ativar o agente em diferentes contextos |
| `.instructs.md` | Instrui o agente sobre formatos de saída, critérios de qualidade e fluxos de trabalho |

---

## Agentes disponíveis

### `engenheiro-front`

**Papel:** Guardião da arquitetura e das decisões técnicas de infraestrutura.

**Ativa quando:**
- Há uma nova proposta de feature com impacto arquitetural
- Uma nova dependência externa é sugerida
- O `Dockerfile`, `docker-compose.yml` ou `Makefile` precisa ser alterado
- Um padrão de código novo será adotado pelo time

**Responsabilidades:**
- Revisar se o código segue os padrões Angular 21 (signals, standalone, `@if`/`@for`)
- Avaliar novas dependências pelo critério: bundle size, necessidade real, manutenção ativa, compatibilidade
- Garantir que mudanças de infraestrutura são testadas e documentadas
- Registrar débitos técnicos no formato padronizado

---

### `dev-senior-angular`

**Papel:** Implementador de componentes, serviços e interfaces Angular 21.

**Ativa quando:**
- Um novo componente ou serviço precisa ser criado
- Um bug em template ou lógica de componente precisa ser corrigido
- Uma interface em `dashboard.model.ts` precisa ser atualizada
- Refactoring localizado é necessário

**Responsabilidades:**
- Gerar código Angular 21 correto: standalone, signals, `@if`/`@for`, `track` no `@for`
- Seguir a paleta CSS dark mode do projeto
- Tipar todos os `@Input()` com interfaces de `dashboard.model.ts`
- Tratar erros de Observable com `catchError`

---

### `po`

**Papel:** Dono do produto — traduz necessidades de negócio em requisitos técnicos.

**Ativa quando:**
- Uma nova feature precisa ser especificada
- Critérios de aceite precisam ser definidos ou refinados
- Uma entrega precisa ser validada contra os requisitos
- O backlog precisa ser priorizado

**Responsabilidades:**
- Escrever histórias de usuário no formato: Como / Quero / Para
- Definir critérios de aceite objetivos e verificáveis
- Usar a matriz Valor × Esforço para priorização
- Comunicar o "o quê" sem prescrever o "como"

---

### `planning`

**Papel:** Planejador técnico — transforma requisitos em tarefas executáveis.

**Ativa quando:**
- Um épico ou feature aprovada pelo PO precisa ser quebrada em tarefas
- Um sprint precisa ser planejado
- Dependências entre tarefas precisam ser mapeadas
- Estimativas de Story Points são necessárias

**Responsabilidades:**
- Quebrar épicos em tarefas com caminho, passos e critérios de conclusão
- Estimar Story Points (escala 1–8)
- Mapear dependências entre tarefas
- Manter o mapa de épicos atualizado

---

## Fluxo de trabalho entre agentes

```
     PO                    PLANNING             DEV SENIOR           ENGENHEIRO
      │                       │                     │                     │
      │  Historia de usuário   │                     │                     │
      │──────────────────────▶│                     │                     │
      │                       │  Tarefas técnicas   │                     │
      │                       │────────────────────▶│                     │
      │                       │                     │  Revisão de padrão  │
      │                       │                     │────────────────────▶│
      │                       │                     │◀────────────────────│
      │                       │                     │  Implementação      │
      │                       │                     │─────────────────────┤
      │  Validação de entrega  │                     │                     │
      │◀──────────────────────┤─────────────────────│                     │
```

---

## Backlog de épicos

| # | Épico | Status |
|---|---|---|
| E1 | Core Dashboard | ✅ Concluído |
| E2 | Qualidade e Testes | 🔲 Pendente |
| E3 | Alertas e Interatividade | 🔲 Pendente |
| E4 | CI/CD GitHub Actions | 🔲 Pendente |

---

## Como usar os agentes

### Com GitHub Copilot Agent Mode

Abra o chat do Copilot no modo Agent e referencie o arquivo de instruções:

```
Leia .github/instructions/dev-senior-angular.instructs.md e crie um componente
para exibir o histórico de atendimentos dos últimos 7 dias.
```

### Com Cursor

Adicione o arquivo `.agent.md` ao contexto da conversa e ative o modo Composer.

### Manualmente

Cada `.prompt.md` contém prompts prontos para copiar e colar em qualquer LLM com o contexto do projeto.
