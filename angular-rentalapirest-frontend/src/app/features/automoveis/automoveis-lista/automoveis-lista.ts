import { ChangeDetectorRef, Component } from '@angular/core';
import { AutomovelResponseDTO } from '../../../core/models/automovel.model';
import { Page } from '../../../core/models/page.model';
import { AutomovelService } from '../../../core/services/automovel.service';
import { AppApiError } from '../../../core/models/app-api-error.model';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-automoveis-lista',
  standalone: false,
  templateUrl: './automoveis-lista.html',
  styleUrl: './automoveis-lista.scss',
})
export class AutomoveisLista {
  automoveis: AutomovelResponseDTO[] = [];
  page: Page<AutomovelResponseDTO> | null = null;
  isAdmin: boolean = false
  currentPage = 0;
  pageSize = 10;
  errorMessage: string = '';

  constructor(private readonly _automovelService: AutomovelService,
    private readonly _cdr: ChangeDetectorRef,
    private readonly _authService: AuthService) { }

  ngOnInit(): void {
    this.loadAutomoveis();
    this.isAdmin = this._authService.isAdmin();
  }

  onDelete(placa: string): void {
    if (!confirm(`Confirma exclusão do veículo placa ${placa}?`)) return;

    this._automovelService.deleteByPlaca(placa).subscribe({
      next: () => {
        alert('Veículo excluído com sucesso!');
        if (this.automoveis.length === 1 && this.currentPage > 0) {
          this.currentPage--;
        }

        this.loadAutomoveis();
        this._cdr.markForCheck();
      },
      error: (err: AppApiError) => {
        this.errorMessage = `Error ${err.status} - ${err.message}`;
        this._cdr.markForCheck();
      }
    });
  }

  goToPage(p: number): void {
    if (p !== this.currentPage) {
      this.currentPage = p;
      this.loadAutomoveis();
    }
  }

  onPageSizeChange(): void {
    this.currentPage = 0;
    this.loadAutomoveis();
  }

  getPageNumbers(): number[] {
    if (!this.page) return [];
    const start = Math.max(0, this.currentPage - 2);
    const end = Math.min(this.page.totalPages - 1, this.currentPage + 2);
    const range: number[] = [];
    for (let i = start; i <= end; i++) range.push(i);
    return range;
  }

  loadAutomoveis(): void {
    this._automovelService.findAll(this.currentPage, this.pageSize).subscribe({
      next: (response: Page<AutomovelResponseDTO>) => {
        this.page = response;
        this.automoveis = response.content;
        this._cdr.markForCheck();
      },
      error: (err: AppApiError) => {
        this.errorMessage = `Error ${err.status} - ${err.message}`;
        this._cdr.markForCheck();
      }
    });
  }
}
