import { ChangeDetectorRef, Component } from '@angular/core';
import { AluguelResponseDTO } from '../../../core/models/aluguel.model';
import { AluguelService } from '../../../core/services/aluguel.service';
import { AppApiError } from '../../../core/models/app-api-error.model';

@Component({
  selector: 'app-alugueis-busca',
  standalone: false,
  templateUrl: './alugueis-checkout.html',
  styleUrl: './alugueis-checkout.scss',
})
export class AlugueisCheckout {
  recibo: string = '';
  errorMessage = '';
  resultado: AluguelResponseDTO | null = null;

  constructor(private readonly _aluguelService: AluguelService,
    private readonly _cdr: ChangeDetectorRef) { }

  onCheckout(): void {
    if (!this.recibo.trim()) return;
    this.errorMessage = '';
    this.resultado = null;

    this._aluguelService.checkout(this.recibo).subscribe({
      next: (response: AluguelResponseDTO) => {
        this.resultado = response;
        this._cdr.markForCheck();
      },
      error: (err: AppApiError) => {
        this.errorMessage = `Error ${err.status} - ${err.message}`;
        this._cdr.markForCheck();
      }
    });
  }

  onLimpar(): void {
    this.recibo = '';
    this.errorMessage = '';
    this.resultado = null;
  }
}
