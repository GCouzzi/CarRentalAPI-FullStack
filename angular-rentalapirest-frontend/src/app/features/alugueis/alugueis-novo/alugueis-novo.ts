import { AluguelResponseDTO } from './../../../core/models/aluguel.model';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioResponseDTO } from '../../../core/models/user.model';
import { AutomovelResponseDTO } from '../../../core/models/automovel.model';
import { AluguelService } from '../../../core/services/aluguel.service';
import { UsuarioService } from '../../../core/services/usuario.service';
import { AppApiError } from '../../../core/models/app-api-error.model';
import { AutomovelService } from '../../../core/services/automovel.service';


@Component({
  selector: 'app-alugueis-novo',
  standalone: false,
  templateUrl: './alugueis-novo.html',
  styleUrl: './alugueis-novo.scss',
})
export class AlugueisNovo {
  form!: FormGroup;
  errorMessage = '';
  resultado: AluguelResponseDTO | null = null;

  usuarios: UsuarioResponseDTO[] = [];
  automoveis: AutomovelResponseDTO[] = [];

  constructor(private readonly _fb: FormBuilder,
    private readonly _aluguelService: AluguelService,
    private readonly _cdr: ChangeDetectorRef,
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

    this.loadUsuarios();
    this.loadAutomoveis();
  }

  loadUsuarios(): void {
    this._usuarioService.findAllCustom().subscribe({
      next: (response: UsuarioResponseDTO[]) => {
        this.usuarios = response;
        this._cdr.markForCheck();
      },
      error: (err: AppApiError) => {
        this.errorMessage = `Error ${err.status} - ${err.message}`;
        this._cdr.markForCheck();
      }
    });
  }

  loadAutomoveis(): void {
    this._automovelService.findAllCustom().subscribe({
      next: (response: AutomovelResponseDTO[]) => {
        this.automoveis = response;
        this._cdr.markForCheck();
      },
      error: (err: AppApiError) => {
        this.errorMessage = `Error ${err.status} - ${err.message}`;
        this._cdr.markForCheck();
      }
    });
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
        this._cdr.markForCheck();
      },
      error: (err: AppApiError) => {
        this.errorMessage = `Error ${err.status} - ${err.message}`;
        this._cdr.markForCheck();
      }
    })
  }

  onLimpar(): void {
    this.form.reset();
    this.errorMessage = '';
    this.resultado = null;
  }

  getFieldClass(field: string): string {
    const control = this.form.get(field);
    if (!control || !control.touched) return '';
    return control.invalid ? 'is-invalid' : 'is-valid';
  }
}
