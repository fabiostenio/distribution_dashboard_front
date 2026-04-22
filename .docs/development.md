# Guia de Desenvolvimento

## Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/) instalado e rodando
- Backend FlowPay rodando em `http://localhost:8080`

> **Nenhuma outra dependência local é necessária.** Node, npm e Angular CLI rodam dentro do container.

---

## Primeiros Passos

```bash
# 1. Clone o repositório
git clone https://github.com/fabiostenio/distribution_dashboard_front.git
cd distribution_dashboard_front

# 2. Construa a imagem Docker (apenas na primeira vez ou ao mudar dependências)
make build

# 3. Inicie o servidor de desenvolvimento com hot-reload
make serve
```

Acesse: **http://localhost:4200**

---

## Referência de Comandos (`make`)

| Comando              | Descrição                                                  |
|----------------------|------------------------------------------------------------|
| `make build`         | Constrói (ou reconstrói) a imagem Docker                   |
| `make serve`         | `ng serve` com hot-reload na porta 4200                    |
| `make start`         | `npm start` — alias de `ng serve`                          |
| `make up`            | Sobe o container em background (sem saída no terminal)     |
| `make down`          | Para e remove o container                                  |
| `make restart`       | Reinicia o container                                       |
| `make logs`          | Exibe logs em tempo real                                   |
| `make shell`         | Abre shell `sh` interativo no container (sessão persistente)|
| `make install`       | Executa `npm install` dentro do container                  |
| `make ng CMD='...'`  | Executa qualquer comando `ng` ex: `make ng CMD='generate component foo'` |
| `make npm CMD='...'` | Executa qualquer comando `npm` ex: `make npm CMD='run build'` |
| `make clean`         | Remove container, imagem e volumes Docker                  |

---

## Hot-Reload

O volume `.:/app` no `docker-compose.yml` monta o código do host dentro do container, permitindo que alterações nos arquivos `src/` sejam detectadas pelo Angular sem rebuild da imagem.

Os volumes anônimos `/app/node_modules` e `/app/.angular` preservam as dependências do container, evitando conflito com `node_modules` local caso exista.

---

## Gerar Componentes / Services

Use o shell do container para rodar `ng generate`:

```bash
make shell
# dentro do container:
ng generate component components/meu-componente
ng generate service services/meu-service
```

---

## Proxy e CORS

O arquivo `proxy.conf.json` redireciona requisições de `/dashboard` para o backend:

```json
{
  "/dashboard": {
    "target": "http://host.docker.internal:8080",
    "changeOrigin": true
  }
}
```

- **Em desenvolvimento local (sem Docker):** altere o target para `http://localhost:8080`
- **`host.docker.internal`** é necessário para que o container acesse o host. No Linux, o `docker-compose.yml` injeta `extra_hosts: host.docker.internal:host-gateway` automaticamente.
