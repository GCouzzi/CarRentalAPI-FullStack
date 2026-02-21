import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRequest } from '../models/auth.model';
import { Observable } from 'rxjs';
import { UsuarioResponseDTO } from '../models/user.model';
import { Page } from '../models/page.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  private baseUrl = 'http://localhost:8080/api/v1/usuarios';

  constructor(private readonly _http: HttpClient) { }

  register(credentials: RegisterRequest): Observable<UsuarioResponseDTO> {
    return this._http.post<UsuarioResponseDTO>(`${this.baseUrl}`, credentials);
  }

  findAll(page: number = 0, size: number = 10, sortBy: string = 'id', direction: string = 'asc'): Observable<Page<UsuarioResponseDTO>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('direction', direction);

    return this._http.get<Page<UsuarioResponseDTO>>(this.baseUrl, { params });
  }

  findAllCustom(): Observable<UsuarioResponseDTO[]> {
    return this._http.get<UsuarioResponseDTO[]>(`${this.baseUrl}/all`);
  }

  findById(id: number): Observable<UsuarioResponseDTO> {
    return this._http.get<UsuarioResponseDTO>(`${this.baseUrl}/id/${id}`);
  }

  findByEmail(email: string): Observable<UsuarioResponseDTO> {
    const encodedEmail = encodeURIComponent(email);
    return this._http.get<UsuarioResponseDTO>(`${this.baseUrl}/email/${encodedEmail}`);
  }

  findByCpf(cpf: string): Observable<UsuarioResponseDTO> {
    const cleanCpf = cpf.replace(/\D/g, '');
    const encodedCpf = encodeURIComponent(cleanCpf)
    return this._http.get<UsuarioResponseDTO>(`${this.baseUrl}/cpf/${encodedCpf}`);
  }

  findByUsername(username: string): Observable<UsuarioResponseDTO> {
    const encodedUsername = encodeURIComponent(username)
    return this._http.get<UsuarioResponseDTO>(`${this.baseUrl}/username/${encodedUsername}`);
  }

  deleteById(id: number): Observable<void>{
    return this._http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
