# Instruções — Desenvolvedor Senior Angular

## Quando este agente é ativado

Ative este agente para qualquer tarefa de implementação em `src/app/`:
- Criar ou modificar componentes
- Criar ou modificar serviços
- Atualizar modelos/interfaces
- Corrigir bugs em templates ou lógica de componente
- Refatorar código existente

---

## Instruções de Implementação

### Criar novo componente

Sempre gere os 3 arquivos. Estrutura obrigatória:

**`nome.component.ts`**
```typescript
import { Component, Input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoInput } from '../../models/dashboard.model';

@Component({
  selector: 'app-nome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nome.component.html',
  styleUrl: './nome.component.css'
})
export class NomeComponent {
  @Input() dado!: TipoInput;
}
```

**`nome.component.html`**
- Use `@if (condicao)` — nunca `*ngIf`
- Use `@for (item of lista; track item.id)` — nunca `*ngFor`
- Atributos de binding com `[class]`, `[style.width.%]`

**`nome.component.css`**
- Seletor raiz: `.nome-componente { ... }`
- Paleta obrigatória:
  ```css
  /* Fundos */
  --bg-card: #1e2535;
  --bg-page: #0f1520;
  --border: #2a3040;
  /* Texto */
  --text-primary: #e2e8f0;
  --text-muted: #94a3b8;
  --text-dim: #64748b;
  /* Cores de status */
  --green:  #22c55e;
  --red:    #ef4444;
  --blue:   #3b82f6;
  --yellow: #eab308;
  --orange: #f97316;
  --teal:   #14b8a6;
  ```

### Registrar componente no App

Adicionar no array `imports` do `app.ts`:
```typescript
imports: [
  CommonModule,
  HeaderComponent,
  ResumoCardsComponent,
  TimeCardComponent,
  FilaPanelComponent,
  NomeComponent,      // ← adicionar aqui
]
```

### Criar novo serviço

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NomeService {
  private readonly http = inject(HttpClient);

  getNome(): Observable<TipoResposta> {
    return this.http.get<TipoResposta>('/endpoint');
  }
}
```

### Corrigir bug

1. Identifique o arquivo exato (caminho completo)
2. Mostre o trecho com problema e o trecho corrigido
3. Explique a causa raiz em 1–2 linhas
4. Verifique se o mesmo bug existe em outros componentes

### Adicionar interface (`dashboard.model.ts`)

- Sempre exporte a interface
- Campos opcionais/nulos: use `| null`
- Enums como union types: `'CARTOES' | 'EMPRESTIMOS' | 'OUTROS'`

---

## Checklist antes de entregar código

- [ ] Componente tem `standalone: true`
- [ ] Estado reativo usa `signal()` (não propriedades simples)
- [ ] Template usa `@if`/`@for` (não `*ngIf`/`*ngFor`)
- [ ] `track` presente em todo `@for`
- [ ] CSS no arquivo do componente (não global)
- [ ] Dark mode respeitado (fundos escuros, texto claro)
- [ ] `@Input()` tipado com interfaces de `dashboard.model.ts`
- [ ] Erros de Observable tratados com `catchError`
