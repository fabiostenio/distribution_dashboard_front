# FlowPay — Central de Atendimentos

Dashboard em tempo real para monitoramento de filas e times de atendimento.

Construído com **Angular 21** (standalone components, Signals, control flow moderno) e executado inteiramente dentro de um container **Docker com Node 22**, sem necessidade de instalar Node, npm ou Angular CLI na máquina local.

---

## Sumário

- [Visão geral](#visão-geral)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação local](#instalação-local)
- [Makefile — referência de comandos](#makefile--referência-de-comandos)
- [Proxy e integração com o backend](#proxy-e-integração-com-o-backend)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Agentes de IA (SDD)](#agentes-de-ia-sdd)

---

## Visão geral

O dashboard consome a API `/dashboard` do backend FlowPay e exibe:

- **Resumo geral** — atendimentos iniciados, em andamento, finalizados, tempo médio de espera, SLA e taxa de abandono
- **Times** — barra de progresso de ocupação, lista de agentes com disponibilidade em tempo real
- **Filas** — distribuição por time com totais consolidados

O polling acontece a cada **10 segundos** de forma automática. Em caso de falha de rede, o último dado válido é mantido na tela com indicador de status offline.

---

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Framework | Angular 21.2 |
| Linguagem | TypeScript 5.9 |
| Reatividade | Angular Signals + RxJS 7.8 |
| Estilo | CSS puro (dark mode, sem frameworks) |
| Runtime | Node 22 Alpine (Docker) |
| Orquestração | Docker Compose + Makefile |

---

## Pré-requisitos

Você precisa **apenas** de:

- [Docker](https://docs.docker.com/get-docker/) ≥ 24
- [Docker Compose](https://docs.docker.com/compose/) ≥ 2 (já incluso no Docker Desktop)
- `make` (disponível por padrão no Linux/macOS; no Windows use WSL2)

> **Node, npm e Angular CLI não precisam estar instalados na máquina host.**  
> Tudo roda dentro do container.

---

## Instalação local

### 1. Clone o repositório

```bash
git clone https://github.com/fabiostenio/distribution_dashboard_front.git
cd distribution_dashboard_front
```

### 2. Construa a imagem Docker

```bash
make build
```

Esse comando executa `docker compose build`, criando a imagem com Node 22 Alpine e instalando o Angular CLI globalmente dentro do container.

> Na primeira execução pode levar alguns minutos. As execuções seguintes usam o cache do Docker e são muito mais rápidas.

### 3. Instale as dependências do projeto

```bash
make install
```

Executa `npm install` dentro do container, criando a pasta `node_modules` mapeada via volume.

### 4. Suba o servidor de desenvolvimento

```bash
make serve
```

O Angular CLI sobe com hot-reload na porta **4200** e o proxy encaminha chamadas `/dashboard` para o backend.

Acesse: [http://localhost:4200](http://localhost:4200)

> Para encerrar: `Ctrl+C`

---

### Fluxo completo (do zero ao dashboard rodando)

```bash
git clone https://github.com/fabiostenio/distribution_dashboard_front.git
cd distribution_dashboard_front
make build
make install
make serve
# Acesse http://localhost:4200
```

---

## Makefile — referência de comandos

Todos os comandos abaixo rodam **dentro do container**. Você nunca precisa entrar no container manualmente para tarefas do dia a dia.

```bash
make help          # Lista todos os comandos disponíveis com descrição
```

### Setup

| Comando | O que faz |
|---|---|
| `make build` | Constrói (ou reconstrói) a imagem Docker |
| `make install` | Executa `npm install` dentro do container |

### Ciclo de vida do container

| Comando | O que faz |
|---|---|
| `make up` | Sobe o container em background (sem travar o terminal) |
| `make down` | Para e remove o container |
| `make restart` | Reinicia o container |
| `make logs` | Exibe os logs em tempo real (`Ctrl+C` para sair) |

### Servidor Angular

| Comando | O que faz |
|---|---|
| `make serve` | `ng serve` com hot-reload na porta 4200 **(uso principal)** |
| `make start` | `npm start` — alias de `ng serve` |

### Utilitários

| Comando | O que faz |
|---|---|
| `make shell` | Abre um shell interativo dentro do container |
| `make ng CMD='...'` | Executa qualquer comando `ng` dentro do container |
| `make npm CMD='...'` | Executa qualquer comando `npm` dentro do container |
| `make clean` | Remove container, imagem e volumes (limpeza total) |

#### Exemplos de uso dos utilitários

```bash
# Gerar um novo componente
make ng CMD='generate component components/meu-componente'

# Gerar um serviço
make ng CMD='generate service services/meu-servico'

# Rodar o build de produção
make npm CMD='run build'

# Instalar uma nova dependência
make npm CMD='install nome-do-pacote'
```

---

## Proxy e integração com o backend

O arquivo `proxy.conf.json` redireciona chamadas `/dashboard` para o backend:

```json
{
  "/dashboard": {
    "target": "http://host.docker.internal:8080",
    "changeOrigin": true,
    "secure": false
  }
}
```

`host.docker.internal` resolve para o IP do host a partir de dentro do container. No Linux, isso é garantido pelo `extra_hosts` configurado no `docker-compose.yml`:

```yaml
extra_hosts:
  - "host.docker.internal:host-gateway"
```

> O backend deve estar rodando em `http://localhost:8080` na máquina host.

---

## Estrutura do projeto

```
.
├── Dockerfile
├── docker-compose.yml
├── Makefile
├── proxy.conf.json
├── angular.json
├── package.json
├── tsconfig.json
├── .nvmrc                        # Node 22
├── .docs/                        # Documentação técnica detalhada
│   ├── overview.md
│   ├── architecture.md
│   ├── api-contract.md
│   ├── docker.md
│   └── development.md
├── .github/
│   ├── agents/                   # Definição dos agentes de IA
│   ├── prompts/                  # Prompts por agente
│   └── instructions/             # Instruções operacionais por agente
└── src/
    └── app/
        ├── app.ts                # Componente raiz + polling
        ├── app.html
        ├── app.config.ts
        ├── app.routes.ts
        ├── models/
        │   └── dashboard.model.ts
        ├── services/
        │   └── dashboard.service.ts
        └── components/
            ├── header/
            ├── resumo-cards/
            ├── time-card/
            └── fila-panel/
```

---

## Agentes de IA (SDD)

O projeto adota a metodologia **SDD (Software Development with AI Agents)**. Os agentes estão definidos em `.github/` e podem ser usados com ferramentas compatíveis (ex: GitHub Copilot Agent Mode, Cursor):

| Agente | Responsabilidade |
|---|---|
| `engenheiro-front` | Decisões de arquitetura, dependências, Docker, padrões de código |
| `dev-senior-angular` | Implementação de componentes, serviços e interfaces Angular 21 |
| `po` | Histórias de usuário, critérios de aceite, priorização do backlog |
| `planning` | Quebra de épicos em tarefas técnicas, estimativas e dependências |

Cada agente possui três arquivos:
- `.github/agents/<nome>.agent.md` — identidade e escopo
- `.github/prompts/<nome>.prompt.md` — prompts de ativação
- `.github/instructions/<nome>.instructs.md` — instruções operacionais detalhadas
