# Contrato da API — GET /dashboard

**Base URL:** `http://localhost:8080`  
**Autenticação:** Nenhuma  
**Headers obrigatórios:** Nenhum  

---

## Endpoint

```
GET /dashboard
```

---

## Resposta (200 OK)

```json
{
  "geradoEm": "2026-04-21T22:50:59.611125",

  "resumo": {
    "totalTickets": 5,
    "abertos": 3,
    "emFila": 2,
    "finalizados": 0,
    "totalAgentes": 3,
    "agentesDisponiveis": 2,
    "agentesOcupados": 1
  },

  "times": [
    {
      "time": "CARTOES",
      "abertos": 3,
      "emFila": 2,
      "finalizados": 0,
      "totalAtendimentos": 5,
      "agentes": [
        {
          "id": 1,
          "nome": "Ana Lima",
          "atendimentosAtivos": 3,
          "disponivel": false,
          "capacidadeMaxima": 3
        }
      ]
    }
  ],

  "fila": {
    "totalEmFila": 2,
    "ticketMaisAntigoEm": "2026-04-21T22:44:19.231454",
    "tempoEsperaMaximoMinutos": 6,
    "tempoEsperaMedioMinutos": 5.5,
    "porTime": [
      { "time": "CARTOES",     "emFila": 2, "ticketMaisAntigoEm": "2026-04-21T22:44:19.231454" },
      { "time": "EMPRESTIMOS", "emFila": 0, "ticketMaisAntigoEm": null },
      { "time": "OUTROS",      "emFila": 0, "ticketMaisAntigoEm": null }
    ]
  }
}
```

---

## Tipos (interfaces TypeScript — `dashboard.model.ts`)

| Interface          | Campos principais                                                         |
|--------------------|---------------------------------------------------------------------------|
| `DashboardResponse`| `geradoEm`, `resumo`, `times[]`, `fila`                                   |
| `Resumo`           | `totalTickets`, `abertos`, `emFila`, `finalizados`, `totalAgentes`, `agentesDisponiveis`, `agentesOcupados` |
| `TimeData`         | `time` (enum), `abertos`, `emFila`, `finalizados`, `totalAtendimentos`, `agentes[]` |
| `Agente`           | `id`, `nome`, `atendimentosAtivos`, `disponivel`, `capacidadeMaxima`      |
| `Fila`             | `totalEmFila`, `ticketMaisAntigoEm`, `tempoEsperaMaximoMinutos`, `tempoEsperaMedioMinutos`, `porTime[]` |
| `FilaPorTime`      | `time`, `emFila`, `ticketMaisAntigoEm`                                    |

---

## Enum `time`

| Valor        | Descrição        |
|--------------|------------------|
| `CARTOES`    | Time de Cartões  |
| `EMPRESTIMOS`| Time de Empréstimos |
| `OUTROS`     | Outros times     |

---

## Comportamento de nulos

| Campo                        | Quando é `null`          |
|------------------------------|--------------------------|
| `fila.ticketMaisAntigoEm`    | Fila vazia               |
| `fila.tempoEsperaMaximoMinutos` | Fila vazia            |
| `porTime[].ticketMaisAntigoEm`  | Time sem fila         |
