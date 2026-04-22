# Docker — Configuração e Uso

## Arquivos

| Arquivo              | Papel                                                    |
|----------------------|----------------------------------------------------------|
| `Dockerfile`         | Imagem Node 22 Alpine com Angular CLI global             |
| `docker-compose.yml` | Serviço `frontend` com volumes, portas e extra_hosts     |
| `.dockerignore`      | Exclui `node_modules/`, `dist/`, `.angular/`, `.git/`    |

---

## Dockerfile

```dockerfile
FROM node:22-alpine
WORKDIR /app
RUN npm install -g @angular/cli   # Angular CLI global no container
COPY package*.json ./
RUN npm install                   # Dependências em layer separada (cache)
COPY . .
EXPOSE 4200
CMD ["npm", "start", "--", "--host", "0.0.0.0", "--poll", "2000"]
```

> O `CMD` é o padrão para `make up`. O `make serve` sobrescreve com `ng serve --host 0.0.0.0`.

---

## docker-compose.yml — Pontos Importantes

```yaml
volumes:
  - .:/app                  # código do host montado no container (hot-reload)
  - /app/node_modules       # node_modules do container isolado do host
  - /app/.angular           # cache de build do container isolado

extra_hosts:
  - "host.docker.internal:host-gateway"   # necessário no Linux
```

### Por que `extra_hosts`?

No **macOS e Windows**, o Docker Desktop resolve `host.docker.internal` automaticamente.  
No **Linux**, é necessário mapear manualmente via `host-gateway` para que o container alcance serviços rodando no host (como o backend na porta 8080).

---

## Fluxo de Rede

```
Navegador
    │  http://localhost:4200
    ▼
Container Docker (Node 22 / ng serve)
    │  proxy /dashboard → http://host.docker.internal:8080
    ▼
Backend (host, porta 8080)
```

---

## Rebuild da Imagem

Necessário apenas quando:
- `package.json` / `package-lock.json` mudar (novas dependências)
- `Dockerfile` mudar

Para alterações em `src/`, o hot-reload via volume cuida automaticamente.

```bash
make build   # reconstrói a imagem
make serve   # sobe com as mudanças
```
