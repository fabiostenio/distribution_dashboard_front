.DEFAULT_GOAL := help
COMPOSE       := docker compose
CONTAINER     := frontend

# ─────────────────────────────────────────────────────────────────────────────
.PHONY: help
help:
	@echo ""
	@echo "  FlowPay — Dashboard Frontend"
	@echo "  Todos os comandos rodam dentro do container Docker (Node 22)"
	@echo ""
	@echo "  ── Setup ─────────────────────────────────────────────────────"
	@echo "  make build      Constrói (ou reconstrói) a imagem Docker"
	@echo ""
	@echo "  ── Ciclo de vida ─────────────────────────────────────────────"
	@echo "  make up         Sobe o container em background"
	@echo "  make down       Para e remove o container"
	@echo "  make restart    Reinicia o container"
	@echo "  make logs       Exibe logs em tempo real"
	@echo ""
	@echo "  ── Servidor ──────────────────────────────────────────────────"
	@echo "  make serve      ng serve com hot-reload (porta 4200)"
	@echo "  make start      npm start (alias de ng serve)"
	@echo ""
	@echo "  ── Utilitários ───────────────────────────────────────────────"
	@echo "  make shell      Abre shell interativo no container (persistente)"
	@echo "  make install    npm install dentro do container"
	@echo "  make ng CMD=... Executa qualquer comando ng  ex: make ng CMD='generate component foo'"
	@echo "  make npm CMD=... Executa qualquer comando npm ex: make npm CMD='run build'"
	@echo "  make clean      Remove container, imagem e volumes"
	@echo ""

# ─────────────────────────────────────────────────────────────────────────────
# Setup
# ─────────────────────────────────────────────────────────────────────────────
.PHONY: build
build:
	$(COMPOSE) build

# ─────────────────────────────────────────────────────────────────────────────
# Ciclo de vida
# ─────────────────────────────────────────────────────────────────────────────
.PHONY: up
up:
	$(COMPOSE) up -d

.PHONY: down
down:
	$(COMPOSE) down

.PHONY: restart
restart:
	$(COMPOSE) restart

.PHONY: logs
logs:
	$(COMPOSE) logs -f

# ─────────────────────────────────────────────────────────────────────────────
# Servidor Angular
# ─────────────────────────────────────────────────────────────────────────────
.PHONY: serve
serve:
	$(COMPOSE) run --rm --service-ports $(CONTAINER) \
		ng serve --host 0.0.0.0 --proxy-config proxy.conf.json

.PHONY: start
start:
	$(COMPOSE) run --rm --service-ports $(CONTAINER) \
		npm start -- --host 0.0.0.0 --proxy-config proxy.conf.json

# ─────────────────────────────────────────────────────────────────────────────
# Utilitários
# ─────────────────────────────────────────────────────────────────────────────
.PHONY: shell
shell:
	$(COMPOSE) run --rm -it $(CONTAINER) sh

.PHONY: install
install:
	$(COMPOSE) run --rm $(CONTAINER) npm install

.PHONY: ng
ng:
	$(COMPOSE) run --rm $(CONTAINER) ng $(CMD)

.PHONY: npm
npm:
	$(COMPOSE) run --rm $(CONTAINER) npm $(CMD)

# ─────────────────────────────────────────────────────────────────────────────
# Limpeza
# ─────────────────────────────────────────────────────────────────────────────
.PHONY: clean
clean:
	$(COMPOSE) down --rmi local --volumes --remove-orphans
