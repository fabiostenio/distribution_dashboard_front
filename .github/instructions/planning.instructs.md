# Instruções — Planning

## Quando este agente é ativado

Ative este agente para:
- Quebrar épicos ou features em tarefas técnicas
- Planejar sprints
- Verificar dependências entre tarefas
- Estimar esforço
- Acompanhar o status do projeto

---

## Instruções de Comportamento

### Formato padrão de tarefa

```markdown
## [LABEL] Título da tarefa

**Épico:** Nome do épico
**Story Points:** N
**Label:** feat | fix | refactor | test | docs | infra
**Arquivos afetados:**
  - src/app/...
**Depende de:** (ID da tarefa anterior, ou "nenhuma")

### O que fazer
1. passo objetivo e acionável
2. passo objetivo e acionável

### Critério de conclusão (DoD)
- [ ] critério verificável 1
- [ ] critério verificável 2
- [ ] make build passa sem erros
```

### Estimativa de Story Points

| SP | Significado | Exemplos no projeto |
|---|---|---|
| 1 | Trivial — mudança pontual de texto/cor | Alterar label de um card |
| 2 | Simples — mudança em 1 arquivo, sem nova lógica | Adicionar campo ao template |
| 3 | Médio — novo componente simples ou refactor localizado | Criar `alerta-badge` component |
| 5 | Complexo — feature com lógica + integração | Filtro por time com signal |
| 8 | Muito complexo — múltiplos componentes + serviço + testes | Gráfico histórico completo |

### Análise de dependências

Ao planejar, mapeie as dependências em grafo simples:
```
T1 ──▶ T2 ──▶ T4
       ▼
       T3 ──▶ T5
```
- Tarefas sem dependências podem ser paralelizadas
- Tarefas com dependências devem ser sequenciadas

### Sprint planning

Para um sprint de 2 semanas, considere:
- Capacidade típica: 20–30 SP por desenvolvedor
- Reserva para bugs/imprevistos: 20% da capacidade
- Máximo de épicos simultâneos: 2

### Rastreamento de status

Use os seguintes estados:
| Emoji | Estado |
|---|---|
| 🔲 | Não iniciado |
| 🔄 | Em progresso |
| 🔍 | Em revisão |
| ✅ | Concluído |
| ⏸️ | Bloqueado |

### Ao criar o planejamento de uma feature nova

1. Receba a história do PO (arquivo `po.agent.md` ou `po.instructs.md`)
2. Quebre em tarefas técnicas usando o Desenvolvedor Senior como referência
3. Estime SP para cada tarefa
4. Identifique dependências
5. Sugira sequência de execução
6. Aponte riscos técnicos se houver

---

## Mapa de épicos atual

```
Épico 1 — Core Dashboard         ✅ Concluído
Épico 2 — Qualidade e Testes     🔲 Pendente  →  próxima prioridade
Épico 3 — Alertas e Interatividade 🔲 Pendente
Épico 4 — CI/CD GitHub Actions   🔲 Pendente
```

## Próximas tarefas sugeridas (Épico 2)

| ID | Tarefa | SP | Label |
|---|---|---|---|
| T-01 | Configurar Vitest para testes unitários | 2 | infra |
| T-02 | Testar `DashboardService.getDashboard()` | 3 | test |
| T-03 | Testar `ResumoCardsComponent` com input mockado | 2 | test |
| T-04 | Testar `TimeCardComponent` — barra de progresso e badge | 3 | test |
| T-05 | Testar `FilaPanelComponent` — estado vazio e com dados | 3 | test |
| T-06 | Testar `HeaderComponent` — formatação de data e badge | 2 | test |
| T-07 | Testar `App` — polling, erro HTTP e signals | 5 | test |
