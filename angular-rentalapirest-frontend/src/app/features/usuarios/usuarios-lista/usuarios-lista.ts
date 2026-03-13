import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../core/services/usuario.service';
import { UsuarioResponseDTO } from '../../../core/models/user.model';
import { Page } from '../../../core/models/page.model';
import { AppApiError } from '../../../core/models/app-api-error.model';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuarios-lista',
  standalone: false,
  templateUrl: './usuarios-lista.html',
  styleUrl: './usuarios-lista.scss',
})
export class UsuariosLista implements OnInit{
  errorMessage = '';
  page$!: Observable<Page<UsuarioResponseDTO> | null>;

  constructor(
    private readonly _usuarioService: UsuarioService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.page$ = this.route.queryParams.pipe(
      switchMap(params => {
        const page = params['page'] ? +params['page'] : 0;
        const size = params['size'] ? +params['size'] : 10;
        return this._usuarioService.findAll(page, size).pipe(
          catchError((err: AppApiError) => {
            this.errorMessage = `${err.status} - ${err.message}`;
            return of(null);
          })
        );
      })
    );
  }

  onDelete(id: number, totalInPage: number, page: number, size: number): void {
    if (!confirm(`Confirma exclusão do usuário id: ${id}?`)) return;

    this._usuarioService.deleteById(id).subscribe({
      next: () => {
        alert('Usuário excluído com sucesso!');
        const newPage = totalInPage === 1 && page > 0 ? page - 1 : page;
        this.router.navigate([], {
          queryParams: { page: newPage, size },
          queryParamsHandling: 'merge'
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
      queryParamsHandling: 'merge'
    });
  }

  onPageSizeChange(newSize: number): void {
    this.router.navigate([], {
      queryParams: { page: 0, size: newSize },
      queryParamsHandling: 'merge'
    });
  }

  getPageNumbers(pageData: Page<UsuarioResponseDTO>): number[] {
    const start = Math.max(0, pageData.number - 2);
    const end = Math.min(pageData.totalPages - 1, pageData.number + 2);
    const range: number[] = [];
    for (let i = start; i <= end; i++) range.push(i);
    return range;
  }
}
