export interface UsuarioDTO {
  username: string;
  password: string;
  nomeCompleto: string;
  cpf: string;
  telefone: string;
  email: string;
}

export interface UsuarioResponseDTO {
  id: number;
  username: string;
  role: string;
  nomeCompleto: string;
  cpf: string;
  telefone: string;
  email: string;
}
