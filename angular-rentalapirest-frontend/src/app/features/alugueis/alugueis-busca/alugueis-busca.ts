import { UsuarioResponseDTO } from './../../../core/models/user.model';
import { Component } from '@angular/core';
import { AluguelResponseDTO } from '../../../core/models/aluguel.model';
import { Page } from '../../../core/models/page.model';
import { AluguelService } from '../../../core/services/aluguel.service';
import { UsuarioService } from '../../../core/services/usuario.service';
import { AppApiError } from '../../../core/models/app-api-error.model';
import { catchError, EMPTY, Observable, of, switchMap, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-alugueis-busca',
  standalone: false,
  templateUrl: './alugueis-busca.html',
  styleUrl: './alugueis-busca.scss',
})
export class AlugueisBusca {
  recibo = '';
  username = '';
  errorMessage = '';

  resultadoRecibo$!: Observable<AluguelResponseDTO | null>;
  resultadoUsername$!: Observable<Page<AluguelResponseDTO> | null>;
  loadUsuarios$!: Observable<UsuarioResponseDTO[]>;

  constructor(
    private readonly _aluguelService: AluguelService,
    private readonly _usuarioService: UsuarioService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.loadUsuarios$ = this._usuarioService.findAllCustom().pipe(
      catchError((err: AppApiError) => {
        this.errorMessage = `Error ${err.status} - ${err.message}`;
        return of([]);
      })
    )

    this.resultadoRecibo$ = this.route.queryParams.pipe(
      tap(params => {
        if (params['recibo']) this.recibo = params['recibo'];
      }),
      switchMap(params => {
        if (!params['recibo']) return of(null);
        return this._aluguelService.findByRecibo(params['recibo']).pipe(
          catchError((err: AppApiError) => {
            this.errorMessage = `${err.status} - ${err.message}`;
            return of(null);
          }),
        );
      }),
    );

    this.resultadoUsername$ = this.route.queryParams.pipe(
      tap(params => {
        if (params['username']) this.username = params['username'];
      }),
      switchMap(params => {
        if (!params['username']) return of(null);
        const page = params['page'] ? +params['page'] : 0;
        const size = params['size'] ? +params['size'] : 10;
        return this._aluguelService.findAllByUsername(params['username'], page, size).pipe(
          catchError((err: AppApiError) => {
            this.errorMessage = `${err.status} - ${err.message}`;
            return of(null);
          })
        );
      })
    );
  }

  onBuscarPorRecibo(): void {
    if (!this.recibo.trim()) return;
    this.router.navigate([], {
      queryParams: { recibo: this.recibo }
    });
  }

  onBuscarPorUsername(pagina: number = 0): void {
    if (!this.username.trim()) return;
    this.errorMessage = '';
    this.router.navigate([], {
      queryParams: { username: this.username, page: 0, size: 10 }
    });
  }

  goToPage(p: number): void {
    this.router.navigate([], {
      queryParams: { username: this.username, page: p },
      queryParamsHandling: 'merge'
    });
  }

  onPageSizeChange(newSize: number): void {
    this.router.navigate([], {
      queryParams: { username: this.username, page: 0, size: newSize },
      queryParamsHandling: 'merge'
    });
  }

  getPageNumbers(page: Page<AluguelResponseDTO>): number[] {
    const start = Math.max(0, page.number - 2);
    const end = Math.min(page.totalPages - 1, page.number + 2);
    const range: number[] = [];
    for (let i = start; i <= end; i++) range.push(i);
    return range;
  }

  onLimpar(): void {
    this.recibo = '';
    this.username = '';
    this.errorMessage = '';
    this.router.navigate([], { queryParams: {} });
  }
}
