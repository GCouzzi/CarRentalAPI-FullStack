import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioResponseDTO } from '../../core/models/user.model';
import { UsuarioService } from '../../core/services/usuario.service';
import { AppApiError } from '../../core/models/app-api-error.model';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-me',
  standalone: false,
  templateUrl: './me.html',
  styleUrl: './me.scss',
})
export class Me implements OnInit {
  usuario$!: Observable<UsuarioResponseDTO | null>;
  errorMessage = '';

  contatoForm!: FormGroup;
  contatoError = '';
  contatoSuccess = '';

  senhaForm!: FormGroup;
  senhaError = '';
  senhaSuccess = '';

  constructor(
    private readonly _usuarioService: UsuarioService,
    private readonly _fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.contatoForm = this._fb.group({
      email: ['', Validators.email],
      telefone: ['', Validators.pattern(/^\d{10,11}$/)],
    });

    this.senhaForm = this._fb.group({
      senhaAtual:     ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
      novaSenha:      ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
      confirmarSenha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
    });

    this.usuario$ = this._usuarioService.getMe().pipe(
      tap((dto) => {
        this.contatoForm.patchValue({
          email: dto.email ?? '',
          telefone: dto.telefone ?? '',
        });
      }),
      catchError((err: AppApiError) => {
        this.errorMessage = `${err.status} - ${err.message}`;
        return of(null);
      }),
    );
  }

  onAtualizarContato(): void {
    if (this.contatoForm.invalid) return;
    this.contatoError = '';
    this.contatoSuccess = '';

    this._usuarioService.updateContato(this.contatoForm.value).subscribe({
      next: (dto) => {
        this.usuario$ = of(dto);
        this.contatoSuccess = 'Contato atualizado com sucesso!';
      },
      error: (err: AppApiError) => {
        this.contatoError = `${err.status} - ${err.message}`;
      },
    });
  }

  onAlterarSenha(): void {
    if (this.senhaForm.invalid) return;
    this.senhaError = '';
    this.senhaSuccess = '';

    this._usuarioService.updatePassword(this.senhaForm.value).subscribe({
      next: () => {
        this.senhaSuccess = 'Senha alterada com sucesso!';
        this.senhaForm.reset();
      },
      error: (err: AppApiError) => {
        this.senhaError = `${err.status} - ${err.message}`;
      },
    });
  }
}