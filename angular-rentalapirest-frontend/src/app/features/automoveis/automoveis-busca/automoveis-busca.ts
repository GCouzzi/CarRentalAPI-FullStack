import { Component, OnInit } from '@angular/core';
import { AutomovelResponseDTO } from '../../../core/models/automovel.model';
import { AutomovelService } from '../../../core/services/automovel.service';
import { AppApiError } from '../../../core/models/app-api-error.model';
import { AuthService } from '../../../core/services/auth.service';
import { BehaviorSubject, catchError, combineLatest, map, Observable, of, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-automoveis-busca',
  standalone: false,
  templateUrl: './automoveis-busca.html',
  styleUrl: './automoveis-busca.scss',
})
export class AutomoveisBusca implements OnInit {
  placa = '';
  errorMessage = '';
  isAdmin: boolean = false;
  automovel$!: Observable<AutomovelResponseDTO | null>;
  private refresh$ = new BehaviorSubject<void>(undefined);

  statusOptions = [
    { valor: 'LIVRE', label: 'Livre', classe: 'btn-success' },
    { valor: 'MANUTENCAO', label: 'Manutenção', classe: 'btn-warning' },
    { valor: 'INATIVO', label: 'Inativo', classe: 'btn-secondary' },
    { valor: 'ALUGADO', label: 'Alugado', classe: 'btn-danger'}
  ];

  novoStatus: string = '';

  constructor(
    private readonly _automovelService: AutomovelService,
    private readonly _authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.isAdmin = this._authService.isAdmin();
    this.automovel$ = combineLatest([this.route.paramMap, this.refresh$]).pipe(
      map(([params, refresh]) => params.get('placa')),
      switchMap((placa) => {
        if (!placa) return of(null);
        this.placa = placa;
        return this._automovelService.findByPlaca(placa).pipe(
          catchError((err: AppApiError) => {
            this.errorMessage = `${err.status} - ${err.message}`;
            return of(null);
          }),
        );
      }),
    );
  }

  onAlterarStatus(placa: string): void {
    this._automovelService
      .updateStatusByPlaca(placa, this.novoStatus)
      .subscribe({
        next: () => {
          this.errorMessage = '';
          this.refresh$.next();
        },
        error: (err: AppApiError) => {
          this.errorMessage = `${err.status} - ${err.message}`;
        },
      });
  }

  onBuscar(): void {
    if (!this.placa.trim()) return;
    this.errorMessage = '';
    this.router.navigate(['/automoveis/busca', this.placa]);
  }

  onLimpar(): void {
    this.placa = '';
    this.errorMessage = '';
    this.router.navigate(['/automoveis/busca']);
  }

  onExcluirVeiculo(placa: string): void {
    if (!confirm(`Confirma exclusão do veículo placa ${placa}?`)) return;

    this._automovelService.deleteByPlaca(placa).subscribe({
      next: () => {
        alert('Veículo excluído com sucesso!');
        this.onLimpar();
      },
      error: (err: AppApiError) => {
        this.errorMessage = `Error ${err.status} - ${err.message}`;
      },
    });
  }
}
