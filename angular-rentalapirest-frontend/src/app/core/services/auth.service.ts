import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse } from '../models/auth.model';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = 'http://localhost:8080/api/v1/auth';

  constructor(private readonly _http: HttpClient) { }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this._http.post<LoginResponse>(`${this.baseUrl}`, credentials);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  public isAdmin(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payload: any = jwtDecode(token);
      return payload.role === 'ROLE_ADMIN' || payload.role === 'ADMIN';
    } catch (error) {
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
