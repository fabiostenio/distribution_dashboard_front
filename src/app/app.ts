import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription, switchMap, catchError, of } from 'rxjs';

import { DashboardService } from './services/dashboard.service';
import { DashboardResponse } from './models/dashboard.model';
import { HeaderComponent } from './components/header/header.component';
import { ResumoCardsComponent } from './components/resumo-cards/resumo-cards.component';
import { TimeCardComponent } from './components/time-card/time-card.component';
import { FilaPanelComponent } from './components/fila-panel/fila-panel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    ResumoCardsComponent,
    TimeCardComponent,
    FilaPanelComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  dashboard = signal<DashboardResponse | null>(null);
  online = signal(true);
  erro = signal<string | null>(null);

  private subscription!: Subscription;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.load();
    this.subscription = interval(10000).pipe(
      switchMap(() =>
        this.dashboardService.getDashboard().pipe(
          catchError((err) => {
            console.error('[Dashboard] Erro no polling:', err);
            this.online.set(false);
            return of(null);
          })
        )
      )
    ).subscribe(data => {
      if (data) {
        this.dashboard.set(data);
        this.online.set(true);
        this.erro.set(null);
      }
    });
  }

  private load(): void {
    this.dashboardService.getDashboard().pipe(
      catchError((err) => {
        console.error('[Dashboard] Erro na carga inicial:', err);
        this.online.set(false);
        this.erro.set(`${err?.status ?? ''} ${err?.message ?? 'Erro desconhecido'}`);
        return of(null);
      })
    ).subscribe(data => {
      if (data) {
        this.dashboard.set(data);
        this.online.set(true);
        this.erro.set(null);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
