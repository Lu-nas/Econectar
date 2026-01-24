import { api } from './Api';
import { LoginRequest } from '../DTO/LoginRequest';
import { AuthResponse } from '../models/AuthResponse';


/* AUTH */
export async function login(url: string, dados: LoginRequest
): Promise<AuthResponse>{
  const resposta = await api.post<AuthResponse>(url, dados);
  return resposta.data;
};

/* CATEGORIAS */
export async function buscarCategorias() {
  const resposta = await api.get('/categorias');
  return resposta.data;
}

// SERVIÇOS
export const buscarServicos = async () => {
  const resposta = await api.get('/servico');
  return resposta.data;

};

/* GENÉRICOS */
export const buscar = async<T>(url: string): Promise<T> => {
  const resposta = await api.get<T>(url);
  return resposta.data;
};

export const cadastrar = async<T>(url: string, dados: T) => {
  const resposta = await api.post(url, dados);
  return resposta.data;
};

export const atualizar = async<T>(url: string, dados: T) => {
  const resposta = await api.put(url, dados);
  return resposta.data
};

export const deletar = async(url: string) => {
  await api.delete(url);
};