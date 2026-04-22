import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeData } from '../../models/dashboard.model';

@Component({
  selector: 'app-time-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './time-card.component.html',
  styleUrl: './time-card.component.css'
})
export class TimeCardComponent {
  @Input() time!: TimeData;

  get progressPercent(): number {
    if (!this.time || this.time.totalAtendimentos === 0) return 0;
    return Math.round((this.time.abertos / this.time.totalAtendimentos) * 100);
  }

  capacidadePercent(ativo: number, max: number): number {
    if (max === 0) return 0;
    return Math.round((ativo / max) * 100);
  }

  timeLabel(time: string): string {
    const labels: Record<string, string> = {
      CARTOES: '💳 Cartões',
      EMPRESTIMOS: '💰 Empréstimos',
      OUTROS: '📋 Outros'
    };
    return labels[time] ?? time;
  }
}
