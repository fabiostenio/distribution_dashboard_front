export interface Agente {
  id: number;
  nome: string;
  atendimentosAtivos: number;
  disponivel: boolean;
  capacidadeMaxima: number;
}

export interface TimeData {
  time: 'CARTOES' | 'EMPRESTIMOS' | 'OUTROS';
  abertos: number;
  emFila: number;
  finalizados: number;
  totalAtendimentos: number;
  agentes: Agente[];
}

export interface FilaPorTime {
  time: 'CARTOES' | 'EMPRESTIMOS' | 'OUTROS';
  emFila: number;
  ticketMaisAntigoEm: string | null;
}

export interface Fila {
  totalEmFila: number;
  ticketMaisAntigoEm: string | null;
  tempoEsperaMaximoMinutos: number | null;
  tempoEsperaMedioMinutos: number;
  porTime: FilaPorTime[];
}

export interface Resumo {
  totalTickets: number;
  abertos: number;
  emFila: number;
  finalizados: number;
  totalAgentes: number;
  agentesDisponiveis: number;
  agentesOcupados: number;
}

export interface DashboardResponse {
  geradoEm: string;
  resumo: Resumo;
  times: TimeData[];
  fila: Fila;
}
