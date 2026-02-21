import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AluguelDTO, AluguelResponseDTO } from '../models/aluguel.model';
import { Observable } from 'rxjs';
import { Page } from '../models/page.model';

@Injectable({ providedIn: 'root' })
export class AluguelService {

  private baseUrl = 'http://localhost:8080/api/v1/alugueis'

  constructor(private readonly _http: HttpClient) { }

  checkin(aluguel: AluguelDTO): Observable<AluguelResponseDTO> {
    return this._http.post<AluguelResponseDTO>(`${this.baseUrl}/checkin`, aluguel);
  }

  findByRecibo(recibo: string): Observable<AluguelResponseDTO> {
    const encodedRecibo = encodeURIComponent(recibo);
    return this._http.get<AluguelResponseDTO>(`${this.baseUrl}/${encodedRecibo}`);
  }

  findAllByUsername(
    username: string,
    page: number = 0,
    size: number = 10,
    sortBy: string = 'id',
    direction: string = 'asc'
  ): Observable<Page<AluguelResponseDTO>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('direction', direction);

    return this._http.get<Page<AluguelResponseDTO>>(`${this.baseUrl}/username/${username}`, { params });
  }

  findAllPessoal(
    page: number = 0,
    size: number = 10,
    sortBy: string = 'id',
    direction: string = 'asc'
  ): Observable<Page<AluguelResponseDTO>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('direction', direction);

    return this._http.get<Page<AluguelResponseDTO>>(this.baseUrl, { params });
  }

  findAll(
    page: number = 0,
    size: number = 10,
    sortBy: string = 'id',
    direction: string = 'asc'
  ): Observable<Page<AluguelResponseDTO>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('direction', direction);

    return this._http.get<Page<AluguelResponseDTO>>(`${this.baseUrl}/all`, { params });
  }

  checkout(recibo: string): Observable<AluguelResponseDTO> {
    const encodedRecibo = encodeURIComponent(recibo);
    return this._http.get<AluguelResponseDTO>(`${this.baseUrl}/checkout/${encodedRecibo}`);
  }
}
