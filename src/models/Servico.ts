import Categoria from './Categoria'; 

interface UsuarioResumo {
  id: number;
  nome: string;
  foto?: string;
}

export default class Servico {
  id: number;
  nomeServico: string;
  descricao: string;
  valor: number;
  status: StatusServico;


  categoria: Categoria | null;
  
  vendedor: UsuarioResumo | null;
  comprador: UsuarioResumo| null;
}

export enum StatusServico {
  DISPONIVEL = 'DISPONIVEL',
  CONTRATADO = 'CONTRATADO',
  CONCLUIDO = 'CONCLUIDO',
}