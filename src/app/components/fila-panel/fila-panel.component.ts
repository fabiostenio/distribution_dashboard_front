import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Fila } from '../../models/dashboard.model';

@Component({
  selector: 'app-fila-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fila-panel.component.html',
  styleUrl: './fila-panel.component.css'
})
export class FilaPanelComponent {
  @Input() fila!: Fila;

  formatDate(value: string | null): string {
    if (!value) return '—';
    const d = new Date(value);
    return d.toLocaleString('pt-BR', {
      day: '2-digit', month: '2-digit',
      hour: '2-digit', minute: '2-digit'
    });
  }

  formatMinutes(value: number | null): string {
    if (value === null || value === undefined) return '—';
    return `${value} min`;
  }
}
