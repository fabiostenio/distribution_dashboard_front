# FlowPay — Dashboard Frontend

## Visão Geral

Dashboard de monitoramento em tempo real para o sistema de distribuição de atendimentos da **FlowPay**, uma fintech. Exibe métricas de tickets, agentes e filas de espera com atualização automática a cada 10 segundos.

---

## Stack

| Tecnologia   | Versão   | Papel                          |
|--------------|----------|--------------------------------|
| Angular      | 21.x     | Framework frontend             |
| TypeScript   | 5.9.x    | Linguagem                      |
| RxJS         | 7.8.x    | Reatividade / polling          |
| Node.js      | 22       | Runtime (container Docker)     |
| Docker       | —        | Containerização                |

---

## Funcionalidades

- Polling automático a cada **10 segundos** via `interval + switchMap`
- Badge **Online / Sem conexão** com detecção de falha HTTP
- **6 cards** de resumo geral (tickets, agentes)
- **3 colunas** de times: CARTÕES, EMPRÉSTIMOS, OUTROS
  - Barra de progresso de atendimentos
  - Lista de agentes com capacidade e badge disponível/lotado
- Painel de **fila de espera** com tabela por time e tempos de espera
- Tema **dark mode** completo, CSS puro por componente
- Responsivo: times empilham em telas < 960 px

---

## Estrutura de Arquivos

```
src/
└── app/
    ├── app.ts                          ← Componente raiz, polling, signals
    ├── app.html                        ← Template principal
    ├── app.css                         ← Layout dark mode
    ├── app.config.ts                   ← provideHttpClient + provideRouter
    ├── app.routes.ts                   ← Rotas (vazio — SPA single view)
    ├── models/
    │   └── dashboard.model.ts          ← Interfaces TypeScript do contrato JSON
    ├── services/
    │   └── dashboard.service.ts        ← getDashboard(): Observable<DashboardResponse>
    └── components/
        ├── header/                     ← Logo, timestamp, badge online/offline
        ├── resumo-cards/               ← 6 cards de métricas
        ├── time-card/                  ← Card de time com agentes
        └── fila-panel/                 ← Painel de fila de espera
proxy.conf.json                         ← Proxy /dashboard → host.docker.internal:8080
angular.json                            ← proxyConfig configurado no serve:development
Dockerfile                              ← Node 22 Alpine + ng serve
docker-compose.yml                      ← Serviço frontend + extra_hosts Linux
Makefile                                ← Comandos de desenvolvimento
```

---

## Variáveis de Ambiente / Configuração

| Parâmetro           | Valor padrão                      | Descrição                        |
|---------------------|-----------------------------------|----------------------------------|
| Proxy target        | `http://host.docker.internal:8080`| URL do backend (via proxy Angular)|
| Porta frontend      | `4200`                            | Exposta no host                  |
| Polling interval    | `10000 ms`                        | Frequência de atualização        |
