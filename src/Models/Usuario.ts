

import Servico from './Servico';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  foto?: string;
  senha: string;
  cpf: string;
  endereco: string;
  dataNascimento: Date;
  servicosVendidos: Servico[];
  servicosComprados: Servico[];
}