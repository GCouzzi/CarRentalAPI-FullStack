import { Component, OnInit } from '@angular/core';
import { AluguelResponseDTO } from '../../../core/models/aluguel.model';
import { Page } from '../../../core/models/page.model';
import { AluguelService } from '../../../core/services/aluguel.service';
import { AppApiError } from '../../../core/models/app-api-error.model';
import { BehaviorSubject, catchError, Observable, of, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-alugueis-lista',
  standalone: false,
  templateUrl: './alugueis-lista.html',
  styleUrl: './alugueis-lista.scss',
})
export class AlugueisLista implements OnInit {
  errorMessage = '';
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
        return this._aluguelService.findAllPessoal(page, size).pipe(
          catchError((err: AppApiError) => {
            this.errorMessage = `${err.status} - ${err.message}`;
            return of(null);
          }),
        );
      }),
    );
  }

  goToPage(p: number): void {
    this.router.navigate([], {
      queryParams: { page: p },
      queryParamsHandling: 'merge'
    });
  }

  onPageSizeChange(newSize: number): void {
    this.router.navigate([], {
      queryParams: { page: 0, size: newSize },
      queryParamsHandling: 'merge'
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
