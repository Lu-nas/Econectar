import Servico from "./Servico";

export interface UsuarioPerfil {
  id: number;
  nome: string;
  foto?: string;
  sobreMim?: string;
  servicosVendidos: Servico[];
}