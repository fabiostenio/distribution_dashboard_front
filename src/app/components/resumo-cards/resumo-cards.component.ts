import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Resumo } from '../../models/dashboard.model';

interface ResumoCard {
  label: string;
  value: number;
  icon: string;
  colorClass: string;
}

@Component({
  selector: 'app-resumo-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resumo-cards.component.html',
  styleUrl: './resumo-cards.component.css'
})
export class ResumoCardsComponent {
  cards: ResumoCard[] = [];

  @Input() set resumo(value: Resumo | null) {
    if (!value) { this.cards = []; return; }
    this.cards = [
      { label: 'Total de Tickets',    value: value.totalTickets,        icon: '🎫', colorClass: 'blue'   },
      { label: 'Em Atendimento',      value: value.abertos,             icon: '🔄', colorClass: 'yellow' },
      { label: 'Em Fila',             value: value.emFila,              icon: '⏳', colorClass: 'orange' },
      { label: 'Finalizados',         value: value.finalizados,         icon: '✅', colorClass: 'green'  },
      { label: 'Agentes Disponíveis', value: value.agentesDisponiveis,  icon: '🟢', colorClass: 'teal'   },
      { label: 'Agentes Ocupados',    value: value.agentesOcupados,     icon: '🔴', colorClass: 'red'    },
    ];
  }
}
