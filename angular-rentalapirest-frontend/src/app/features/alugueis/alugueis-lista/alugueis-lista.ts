import { ChangeDetectorRef, Component } from '@angular/core';
import { AluguelResponseDTO } from '../../../core/models/aluguel.model';
import { Page } from '../../../core/models/page.model';
import { AluguelService } from '../../../core/services/aluguel.service';
import { AppApiError } from '../../../core/models/app-api-error.model';

@Component({
  selector: 'app-alugueis-lista',
  standalone: false,
  templateUrl: './alugueis-lista.html',
  styleUrl: './alugueis-lista.scss',
})
export class AlugueisLista {
  alugueis: AluguelResponseDTO[] = [];
  page: Page<AluguelResponseDTO> | null = null;
  errorMessage = '';
  currentPage = 0;
  pageSize = 10;

  constructor(private readonly _aluguelService: AluguelService,
    private readonly _cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadAlugueis();
  }

  goToPage(p: number): void {
    this.currentPage = p;
    this.loadAlugueis();
  }

  onPageSizeChange(): void {
    this.currentPage = 0;
    this.loadAlugueis();
  }

  getPageNumbers(): number[] {
    if (!this.page) return [];
    const start = Math.max(0, this.currentPage - 2);
    const end = Math.min(this.page.totalPages - 1, this.currentPage + 2);
    const range: number[] = [];
    for (let i = start; i <= end; i++) range.push(i);
    return range;
  }

  loadAlugueis(): void {
    this._aluguelService.findAllPessoal().subscribe({
      next: (response: Page<AluguelResponseDTO>) => {
        this.alugueis = response.content;
        this.page = response;
        this._cdr.markForCheck();
      },
      error: (err: AppApiError) => {
        this.errorMessage = `Error ${err.status} - ${err.message}`
        this._cdr.markForCheck();
      }
    })
  }
}
