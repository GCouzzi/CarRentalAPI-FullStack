import { ChangeDetectorRef, Component } from '@angular/core';
import { AutomovelResponseDTO } from '../../../core/models/automovel.model';
import { Page } from '../../../core/models/page.model';
import { AutomovelService } from '../../../core/services/automovel.service';
import { AppApiError } from '../../../core/models/app-api-error.model';
import { AuthService } from '../../../core/services/auth.service';
import { BehaviorSubject, catchError, Observable, of, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-automoveis-lista',
  standalone: false,
  templateUrl: './automoveis-lista.html',
  styleUrl: './automoveis-lista.scss',
})
export class AutomoveisLista {
  isAdmin: boolean = false;
  errorMessage: string = '';

  page$!: Observable<Page<AutomovelResponseDTO> | null>;

  constructor(
    private readonly _automovelService: AutomovelService,
    private readonly _authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.isAdmin = this._authService.isAdmin();
    this.page$ = this.route.queryParams.pipe(
      switchMap((params) => {
        const page = params['page'] ? +params['page'] : 0;
        const size = params['size'] ? +params['size'] : 10;
        return this._automovelService.findAll(page, size).pipe(
          catchError((err: AppApiError) => {
            this.errorMessage = `${err.status} - ${err.message}`;
            return of(null);
          }),
        );
      }),
    );
  }

  onDelete(
    placa: string,
    totalInPage: number,
    currentPage: number,
    size: number,
  ): void {
    if (!confirm(`Confirma exclusão do veículo placa ${placa}?`)) return;

    this._automovelService.deleteByPlaca(placa).subscribe({
      next: () => {
        alert('Veículo excluído com sucesso!');
        const newPage =
          totalInPage === 1 && currentPage > 0 ? currentPage - 1 : currentPage;
        this.router.navigate([], {
          queryParams: { page: newPage, size },
          queryParamsHandling: 'merge',
        });
      },
      error: (err: AppApiError) => {
        this.errorMessage = `Error ${err.status} - ${err.message}`;
      },
    });
  }

  goToPage(p: number): void {
    this.router.navigate([], {
      queryParams: { page: p },
      queryParamsHandling: 'merge',
    });
  }

  onPageSizeChange(newSize: number): void {
    this.router.navigate([], {
      queryParams: { page: 0, size: newSize },
      queryParamsHandling: 'merge',
    });
  }

  getPageNumbers(pageData: Page<AutomovelResponseDTO>): number[] {
    const start = Math.max(0, pageData.number - 2);
    const end = Math.min(pageData.totalPages - 1, pageData.number + 2);
    const range: number[] = [];
    for (let i = start; i <= end; i++) range.push(i);
    return range;
  }
}
