import { AluguelResponseDTO } from './../../../core/models/aluguel.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioResponseDTO } from '../../../core/models/user.model';
import { AutomovelResponseDTO } from '../../../core/models/automovel.model';
import { AluguelService } from '../../../core/services/aluguel.service';
import { UsuarioService } from '../../../core/services/usuario.service';
import { AppApiError } from '../../../core/models/app-api-error.model';
import { AutomovelService } from '../../../core/services/automovel.service';
import { catchError, Observable, of } from 'rxjs';


@Component({
  selector: 'app-alugueis-novo',
  standalone: false,
  templateUrl: './alugueis-novo.html',
  styleUrl: './alugueis-novo.scss',
})
export class AlugueisNovo implements OnInit {
  form!: FormGroup;
  errorMessage = '';
  resultado: AluguelResponseDTO | null = null;

  loadUsuarios$!: Observable<UsuarioResponseDTO[]>;
  loadAutomoveis$!: Observable<AutomovelResponseDTO[]>;

  constructor(private readonly _fb: FormBuilder,
    private readonly _aluguelService: AluguelService,
    private readonly _usuarioService: UsuarioService,
    private readonly _automovelService: AutomovelService) { }

  ngOnInit(): void {
    this.form = this._fb.group({
      usuarioUsername: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ]],
      automovelPlaca: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8),
        Validators.pattern(/^[a-zA-Z]{3}-[0-9]{4}$/)
      ]]
    });

    this.loadUsuarios$ = this._usuarioService.findAllCustom().pipe(
      catchError((err: AppApiError) => {
        this.errorMessage = `Error ${err.status} - ${err.message}`;
        return of([]);
      })
    )

    this.loadAutomoveis$ = this._automovelService.findAllCustom().pipe(
      catchError((err: AppApiError) => {
        this.errorMessage = `Error ${err.status} - ${err.message}`;
        return of([]);
      })
    )
  }

  onSubmit(): void {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach((key) => {
        this.form.controls[key].markAsTouched();
      });
      return;
    }
    this.errorMessage = '';
    this.resultado = null;

    this._aluguelService.checkin(this.form.value).subscribe({
      next: (response: AluguelResponseDTO) => {
        this.resultado = response;
      },
      error: (err: AppApiError) => {
        this.errorMessage = `Error ${err.status} - ${err.message}`;
      }
    })
  }

  onLimpar(): void {
    this.form.reset();
    this.errorMessage = '';
    this.resultado = null;
  }

}
