import { Component, OnInit } from '@angular/core';
import { UsuarioResponseDTO } from '../../../core/models/user.model';
import { UsuarioService } from '../../../core/services/usuario.service';
import { AppApiError } from '../../../core/models/app-api-error.model';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-usuarios-busca',
  standalone: false,
  templateUrl: './usuarios-busca.html',
  styleUrl: './usuarios-busca.scss',
})
export class UsuariosBusca implements OnInit {
  tipoBusca: 'email' | 'cpf' | 'username' = 'username';
  valor = '';
  errorMessage = '';
  resultado$!: Observable<UsuarioResponseDTO | null>;

  constructor(
    private readonly _usuarioService: UsuarioService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.resultado$ = this.route.queryParams.pipe(
      tap((params) => {
        if (params['email']) {
          this.tipoBusca = 'email';
          this.valor = params['email'];
        }
        if (params['cpf']) {
          this.tipoBusca = 'cpf';
          this.valor = params['cpf'];
        }
        if (params['username']) {
          this.tipoBusca = 'username';
          this.valor = params['username'];
        }
      }),
      switchMap((params) => {
        const { email, cpf, username } = params;

        const request$: Observable<UsuarioResponseDTO | null> = username
          ? this._usuarioService.findByUsername(username)
          : email
            ? this._usuarioService.findByEmail(email)
            : cpf
              ? this._usuarioService.findByCpf(cpf)
              : of(null);

        return request$.pipe(
          catchError((err: AppApiError) => {
            this.errorMessage = `${err.status} - ${err.message}`;
            return of(null);
          }),
        );
      }),
    );
  }

  onTipoChange(): void {
    this.onLimpar();
  }

  onBuscar(): void {
    if (!this.valor.trim()) return;

    this.errorMessage = '';
    this.router.navigate([], {
      queryParams: { [this.tipoBusca]: this.valor },
    });
  }

  onLimpar(): void {
    this.valor = '';
    this.errorMessage = '';
    this.router.navigate([], { queryParams: {} });
  }

  onDelete(id: number): void {
    if (!confirm(`Confirma exclusão do usuário id: ${id}?`)) return;

    this._usuarioService.deleteById(id).subscribe({
      next: () => {
        alert('Usuário excluído com sucesso!');
        this.onLimpar();
      },
      error: (err: AppApiError) => {
        this.errorMessage = `Error ${err.status} - ${err.message}`;
      },
    });
  }
}
