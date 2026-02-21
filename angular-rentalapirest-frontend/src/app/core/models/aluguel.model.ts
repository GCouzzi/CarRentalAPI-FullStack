export interface AluguelDTO {
  usuarioUsername: string;
  automovelPlaca: string;
}

export interface AluguelResponseDTO {
  usuarioUsername: string;
  automovelMarca: string;
  automovelModelo: string;
  automovelCor: string;
  automovelPlaca: string;
  automovelRecibo: string;
  dataInicio: string;
  dataFim: string | null;
  valor: number | null;
  desconto: number | null;
}
