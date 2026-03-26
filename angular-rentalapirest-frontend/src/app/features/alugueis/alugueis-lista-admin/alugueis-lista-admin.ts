import { Component, OnInit } from '@angular/core';
import { AluguelResponseDTO } from '../../../core/models/aluguel.model';
import { Page } from '../../../core/models/page.model';
import { AluguelService } from '../../../core/services/aluguel.service';
import { AppApiError } from '../../../core/models/app-api-error.model';
import { BehaviorSubject, catchError, Observable, of, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-alugueis-lista-admin',
  standalone: false,
  templateUrl: './alugueis-lista-admin.html',
  styleUrl: './alugueis-lista-admin.scss',
})
export class AlugueisListaAdmin implements OnInit {
  errorMessage: string = '';
  page$!: Observable<Page<AluguelResponseDTO> | null>;

  constructor(
    private readonly _aluguelService: AluguelService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.page$ = this.route.queryParams.pipe(
      switchMap((params) => {
        const page = params['page'] ? +params['page'] : 0;
        const size = params['size'] ? +params['size'] : 10;
        const sortBy = params['sortBy'] ?? 'id';
        const direction = params['direction'] ?? 'asc';
        const finalizado: boolean | undefined =
          params['finalizado'] === 'true'
            ? true
            : params['finalizado'] === 'false'
              ? false
              : undefined;
        return this._aluguelService
          .findAll(page, size, sortBy, direction, finalizado)
          .pipe(
            catchError((err: AppApiError) => {
              this.errorMessage = `${err.status} - ${err.message}`;
              return of(null);
            }),
          );
      }),
    );
  }

  get filtroAtivo(): string {
    const v = this.route.snapshot.queryParamMap.get('finalizado');
    if (v === 'true') return 'true';
    if (v === 'false') return 'false';
    return 'todos';
  }

  setFiltro(valor: 'todos' | 'true' | 'false'): void {
    this.router.navigate([], {
      queryParams: {
        page: 0,
        finalizado: valor === 'todos' ? null : valor,
      },
      queryParamsHandling: 'merge',
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

  getPageNumbers(pageData: Page<AluguelResponseDTO>): number[] {
    const start = Math.max(0, pageData.number - 2);
    const end = Math.min(pageData.totalPages - 1, pageData.number + 2);
    const range: number[] = [];
    for (let i = start; i <= end; i++) range.push(i);
    return range;
  }
}
