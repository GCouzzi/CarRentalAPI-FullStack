import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AutomovelResponseDTO } from '../../../core/models/automovel.model';
import { AutomovelService } from '../../../core/services/automovel.service';
import { AppApiError } from '../../../core/models/app-api-error.model';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-automoveis-busca',
  standalone: false,
  templateUrl: './automoveis-busca.html',
  styleUrl: './automoveis-busca.scss',
})
export class AutomoveisBusca implements OnInit {
  placa = '';
  automovel: AutomovelResponseDTO | null = null;
  errorMessage = '';
  isAdmin: boolean = false;

  constructor(private readonly _automovelService: AutomovelService,
    private readonly _cdr: ChangeDetectorRef,
    private readonly _authService: AuthService) { }

    ngOnInit(): void {
      this.isAdmin = this._authService.isAdmin();
    }

  onBuscar(): void {
    if (!this.placa.trim()) return;
    this.errorMessage = '';
    this.automovel = null;
    this._automovelService.findByPlaca(this.placa).subscribe({
      next: (response: AutomovelResponseDTO) => {
        this.automovel = response;
        this._cdr.markForCheck()
      },
      error: (err: AppApiError) => {
        this.errorMessage = `Error ${err.status} - ${err.message}`;
        this._cdr.markForCheck()
      }
    });
  }

  onLimpar(): void {
    this.placa = '';
    this.automovel = null;
    this.errorMessage = '';
  }

  onExcluirVeiculo(placa: string): void {
    if (!confirm(`Confirma exclusão do veículo placa ${placa}?`)) return;

    this._automovelService.deleteByPlaca(placa).subscribe({
      next: () => {
        alert('Veículo excluído com sucesso!');
        this.onLimpar();
        this._cdr.markForCheck();
      },
      error: (err: AppApiError) => {
        this.errorMessage = `Error ${err.status} - ${err.message}`;
        this._cdr.markForCheck();
      }
    });
  }
}
