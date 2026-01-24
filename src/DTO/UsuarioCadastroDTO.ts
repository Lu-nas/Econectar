export interface UsuarioCadastroDTO {
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  endereco: string;
  dataNascimento: string;
  foto?: string;
}