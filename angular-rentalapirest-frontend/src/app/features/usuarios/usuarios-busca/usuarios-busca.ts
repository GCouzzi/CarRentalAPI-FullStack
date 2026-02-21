import { ChangeDetectorRef, Component } from '@angular/core';
import { UsuarioResponseDTO } from '../../../core/models/user.model';
import { UsuarioService } from '../../../core/services/usuario.service';
import { AppApiError } from '../../../core/models/app-api-error.model';

@Component({
  selector: 'app-usuarios-busca',
  standalone: false,
  templateUrl: './usuarios-busca.html',
  styleUrl: './usuarios-busca.scss',
})
export class UsuariosBusca {
  tipoBusca: 'email' | 'cpf' | 'username' = 'username';
  valor = '';
  errorMessage = '';
  resultado: UsuarioResponseDTO | null = null;

  constructor(private readonly _usuarioService: UsuarioService,
    private readonly _cdr: ChangeDetectorRef
  ) { }

  onTipoChange(): void {
    this.onLimpar();
  }

  onBuscar(): void {
    if (!this.valor.trim()) return;
    this.errorMessage = '';
    this.resultado = null;

    if (this.tipoBusca === 'username') {
      this._usuarioService.findByUsername(this.valor).subscribe({
        next: (response: UsuarioResponseDTO) => {
          this.resultado = response;
          this._cdr.markForCheck();
        },
        error: (err: AppApiError) => {
          this.errorMessage = `${err.status} - ${err.message}`;
          this._cdr.markForCheck();
        }
      });
    } else if (this.tipoBusca === 'email') {
      this._usuarioService.findByEmail(this.valor).subscribe({
        next: (response: UsuarioResponseDTO) => {
          this.resultado = response;
          this._cdr.markForCheck();
        },
        error: (err: AppApiError) => {
          this.errorMessage = `${err.status} - ${err.message}`
          this._cdr.markForCheck();
        }
      });
    } else if (this.tipoBusca === 'cpf') {
      this._usuarioService.findByCpf(this.valor).subscribe({
        next: (response: UsuarioResponseDTO) => {
          this.resultado = response;
          this._cdr.markForCheck();
        },
        error: (err: AppApiError) => {
          this.errorMessage = `${err.status} - ${err.message}`
          this._cdr.markForCheck();
        }
      });
    }
  }

  onLimpar(): void {
    this.valor = '';
    this.errorMessage = '';
    this.resultado = null;
  }

  onDelete(id: number): void {
    if (!confirm(`Confirma exclusão do usuário id: ${id}?`)) return;

    this._usuarioService.deleteById(id).subscribe({
      next: () => {
        alert('Usuário excluído com sucesso!');
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
