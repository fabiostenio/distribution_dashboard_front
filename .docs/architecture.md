# Arquitetura — FlowPay Dashboard Frontend

## Padrão Geral

Angular 21 **standalone** (sem NgModules), detecção de mudanças via **Signals**, CSS puro por componente, tema dark.

---

## Fluxo de Dados

```
Backend (localhost:8080)
        │
        │  GET /dashboard  (a cada 10s via interval + switchMap)
        ▼
  DashboardService
  (HttpClient + Observable)
        │
        ▼
  App (componente raiz)
  ├── dashboard = signal<DashboardResponse | null>
  ├── online    = signal<boolean>
  └── erro      = signal<string | null>
        │
        ├──▶ HeaderComponent        [geradoEm, online]
        ├──▶ ResumoCardsComponent   [resumo]
        ├──▶ TimeCardComponent ×3   [time]
        └──▶ FilaPanelComponent     [fila]
```

---

## Componentes

### `App` (raiz)
- Injeta `DashboardService`
- `ngOnInit`: chama `load()` imediato + inicia polling com `interval(10000)`
- Erro HTTP: mantém último dado exibido, seta `online = false`
- Usa **Signals** para forçar re-render no Angular 21 (sem Zone.js implícito)

### `HeaderComponent`
- Inputs: `geradoEm: string | null`, `online: boolean`
- Formata `geradoEm` via `Date.toLocaleString('pt-BR')`
- Badge animado com CSS `@keyframes pulse`

### `ResumoCardsComponent`
- Input: `resumo: Resumo`
- Setter `@Input` que gera array de cards dinamicamente
- 6 cards com cores por tipo (blue, yellow, orange, green, teal, red)

### `TimeCardComponent`
- Input: `time: TimeData`
- Barra de progresso: `abertos / totalAtendimentos`
- Por agente: barra de capacidade `atendimentosAtivos / capacidadeMaxima`
- Badge verde (disponível) ou vermelho (lotado) via `disponivel: boolean`

### `FilaPanelComponent`
- Input: `fila: Fila`
- Se `totalEmFila === 0`: exibe mensagem vazia
- Caso contrário: 3 summary cards + tabela por time

---

## Decisões Técnicas

| Decisão | Motivo |
|---|---|
| Signals em vez de propriedades de classe | Angular 21 usa detecção de mudanças baseada em signals; propriedades regulares não disparam re-render sem Zone.js |
| `proxy.conf.json` com `host.docker.internal` | Dentro do container, `localhost` é o próprio container — `host-gateway` mapeia para o host |
| `extra_hosts` no docker-compose | No Linux, `host.docker.internal` não é resolvido automaticamente pelo Docker (diferente de macOS/Windows) |
| CSS por componente, sem framework | Isolamento de estilos, zero dependência externa, tema dark consistente |
| `@if` / `@for` (control flow v17+) | Sintaxe moderna Angular, sem `*ngIf` / `*ngFor` |
