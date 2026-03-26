import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AutomovelDTO, AutomovelResponseDTO } from '../models/automovel.model';
import { Page } from '../models/page.model';

@Injectable({ providedIn: 'root' })
export class AutomovelService {
  private baseUrl = 'http://localhost:8080/api/v1/automoveis';

  constructor(private readonly _http: HttpClient) {}

  register(automovel: AutomovelDTO): Observable<AutomovelResponseDTO> {
    return this._http.post<AutomovelResponseDTO>(`${this.baseUrl}`, automovel);
  }

  findByPlaca(placa: string): Observable<AutomovelResponseDTO> {
    const encodedPlaca = encodeURIComponent(placa);
    return this._http.get<AutomovelResponseDTO>(
      `${this.baseUrl}/placa/${encodedPlaca}`,
    );
  }

  findAll(
    page: number = 0,
    size: number = 10,
    sortBy: string = 'id',
    direction: string = 'asc',
    status?: string,
    marca?: string,
    modelo?: string,
  ): Observable<Page<AutomovelResponseDTO>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('direction', direction);

    if (status) params = params.set('status', status);
    if (marca) params = params.set('marca', marca);
    if (modelo) params = params.set('modelo', modelo);

    return this._http.get<Page<AutomovelResponseDTO>>(`${this.baseUrl}`, {
      params,
    });
  }

  updateStatusByPlaca(
    placa: string,
    status: string,
  ): Observable<AutomovelResponseDTO> {
    return this._http.patch<AutomovelResponseDTO>(
      `${this.baseUrl}/placa/${placa}`,
      { status },
    );
  }

  deleteByPlaca(placa: string): Observable<void> {
    const encodedPlaca = encodeURIComponent(placa);
    return this._http.delete<void>(`${this.baseUrl}/placa/${encodedPlaca}`);
  }

  findAllCustom(): Observable<AutomovelResponseDTO[]> {
    return this._http.get<AutomovelResponseDTO[]>(`${this.baseUrl}/livres`);
  }
}
