import { UsuarioResponseDTO } from './../../../core/models/user.model';
import { ChangeDetectorRef, Component } from '@angular/core';
import { AluguelResponseDTO } from '../../../core/models/aluguel.model';
import { Page } from '../../../core/models/page.model';
import { AluguelService } from '../../../core/services/aluguel.service';
import { UsuarioService } from '../../../core/services/usuario.service';
import { AppApiError } from '../../../core/models/app-api-error.model';

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

  resultadoRecibo: AluguelResponseDTO | null = null;
  alugueis: AluguelResponseDTO[] = [];
  page: Page<AluguelResponseDTO> | null = null;
  usuarios: UsuarioResponseDTO[] = [];

  currentPage = 0;
  pageSize = 10;

  constructor(private readonly _aluguelService: AluguelService,
    private readonly _cdr: ChangeDetectorRef,
    private readonly _usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this._usuarioService.findAllCustom().subscribe({
      next: (response: UsuarioResponseDTO[]) => {
        this.usuarios = response;
        this._cdr.markForCheck();
      },
      error: (err: AppApiError) => {
        this.errorMessage = `Error ${err.status} - ${err.message}`;
        this._cdr.markForCheck();
      }
    });
  }

  onBuscarPorRecibo(): void {
    if (!this.recibo.trim()) return;
    this.limparResultados();

    this._aluguelService.findByRecibo(this.recibo).subscribe({
      next: (response: AluguelResponseDTO) => {
        this.resultadoRecibo = response;
        this._cdr.markForCheck();
      },
      error: (err: AppApiError) => {
        this.errorMessage = `Error ${err.status} - ${err.message}`;
        this._cdr.markForCheck();
      }
    });
  }

  onBuscarPorUsername(pagina: number = 0): void {
    if (!this.username.trim()) return;
    this.currentPage = pagina;
    this.limparResultados();

    this._aluguelService.findAllByUsername(
      this.username,
      this.currentPage,
      this.pageSize
    )
      .subscribe({
        next: (response: Page<AluguelResponseDTO>) => {
          this.page = response;
          this.alugueis = response.content;
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
      this.onBuscarPorUsername(p);
    }
  }

  onPageSizeChange(): void {
    this.currentPage = 0;
    this.onBuscarPorUsername();
  }

  getPageNumbers(): number[] {
    if (!this.page) return [];
    const start = Math.max(0, this.currentPage - 2);
    const end = Math.min(this.page.totalPages - 1, this.currentPage + 2);
    const range: number[] = [];
    for (let i = start; i <= end; i++) range.push(i);
    return range;
  }

  onLimpar(): void {
    this.recibo = '';
    this.username = '';
    this.limparResultados();
  }

  private limparResultados(): void {
    this.errorMessage = '';
    this.resultadoRecibo = null;
    this.alugueis = [];
    this.page = null;
    this._cdr.markForCheck();
  }
}
