import Servico from './Servico'; 

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  foto?: string; 
  cpf: string;
  endereco: string;
  dataNascimento:string; //  ISO
  servicosVendidos?: Servico[];
  servicosComprados?: Servico[];
}