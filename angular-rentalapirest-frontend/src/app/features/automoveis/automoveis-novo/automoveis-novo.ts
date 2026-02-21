import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutomovelService } from '../../../core/services/automovel.service';
import { AppApiError } from '../../../core/models/app-api-error.model';

@Component({
  selector: 'app-automoveis-novo',
  standalone: false,
  templateUrl: './automoveis-novo.html',
  styleUrl: './automoveis-novo.scss',
})
export class AutomoveisNovo implements OnInit {
  form!: FormGroup;
  errorMessage = '';
  sucesso = false;

  constructor(private readonly _fb: FormBuilder,
    private readonly _automovelService: AutomovelService,
    private readonly _cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.form = this._fb.group({
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      cor: ['', Validators.required],
      placa: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8),
        Validators.pattern(/^[a-zA-Z]{3}-[0-9]{4}$/)
      ]],
      valorPorMinuto: [null, [Validators.required, Validators.min(0.01)]]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach((key) => {
        this.form.controls[key].markAsTouched();
      });
      return;
    }

    const value = { ...this.form.value }
    value.placa = value.placa?.toUpperCase();

    this._automovelService.register(value).subscribe({
      next: (response) => {
        this.sucesso = true;
        this.errorMessage = '';
        this._cdr.markForCheck();
      },
      error: (err: AppApiError) => {
        this.errorMessage = `Error ${err.status} - ${err.message}`;
        this.sucesso = false;
        this._cdr.markForCheck();
      }
    });
  }

  onLimpar(): void {
    this.form.reset();
    this.errorMessage = '';
    this.sucesso = false;
  }

  getFieldClass(field: string): string {
    const control = this.form.get(field);
    if (!control || !control.touched) return '';
    return control.invalid ? 'is-invalid' : 'is-valid';
  }
}
