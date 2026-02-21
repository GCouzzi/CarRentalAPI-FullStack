import { Component, ChangeDetectorRef } from '@angular/core';
import { UsuarioService } from '../../../core/services/usuario.service';
import { UsuarioResponseDTO } from '../../../core/models/user.model';
import { Page } from '../../../core/models/page.model';
import { AppApiError } from '../../../core/models/app-api-error.model';

@Component({
  selector: 'app-usuarios-lista',
  standalone: false,
  templateUrl: './usuarios-lista.html',
  styleUrl: './usuarios-lista.scss',
})
export class UsuariosLista {
  usuarios: UsuarioResponseDTO[] = [];
  page: Page<UsuarioResponseDTO> | null = null;
  errorMessage = '';
  currentPage = 0;
  pageSize = 10;

  constructor(private readonly _usuarioService: UsuarioService,
    private readonly _cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this._usuarioService.findAll(this.currentPage, this.pageSize).subscribe({
      next: (response: Page<UsuarioResponseDTO>) => {
        this.usuarios = response.content;
        this.page = response;
        this._cdr.markForCheck();
      },
      error: (err: AppApiError) => {
        this.errorMessage = `${err.status} - ${err.message}`
        this._cdr.markForCheck();
      }
    })
  }

  onDelete(id: number): void {
    if (!confirm(`Confirma exclusão do usuário id: ${id}?`)) return;

    this._usuarioService.deleteById(id).subscribe({
      next: () => {
        alert('Usuário excluído com sucesso!');
        if (this.usuarios.length === 1 && this.currentPage > 0) {
          this.currentPage--;
        }

        this.loadUsuarios();
        this._cdr.markForCheck();
      },
      error: (err: AppApiError) => {
        this.errorMessage = `Error ${err.status} - ${err.message}`;
        this._cdr.markForCheck();
      }
    });
  }

  goToPage(p: number): void {
    if (p != this.currentPage) {
      this.currentPage = p;
      this.loadUsuarios();
    }
  }

  onPageSizeChange(): void {
    this.currentPage = 0;
    this.loadUsuarios();
  }

  getPageNumbers(): number[] {
    if (!this.page) return [];
    const start = Math.max(0, this.currentPage - 2);
    const end = Math.min(this.page.totalPages - 1, this.currentPage + 2);
    const range: number[] = [];
    for (let i = start; i <= end; i++) range.push(i);
    return range;
  }
}
