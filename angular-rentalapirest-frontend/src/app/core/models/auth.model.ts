export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  nomeCompleto: string;
  cpf: string;
  telefone: string;
  email: string;
}

export interface LoginResponse {
  token: string;
}
