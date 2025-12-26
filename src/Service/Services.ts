import axios, { AxiosHeaders } from "axios";
import { UsuarioLogin } from "../Models/UsuarioLogin";
import { LoginDTO } from '../DTO/LoginDTO';

const api = axios.create({
  baseURL: "http://localhost:8080"
  /*baseURL: import.meta.env.VITE_API_URL*/
}); 

// INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

     if (token && !config.url?.includes('/usuarios/logar')) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const cadastrarUsuario = async(url: string, dados: Object, setUsuarioResposta: unknown) => {
  const resposta = await api.post(url, dados)
  return resposta.data
}

export const login = async(url: string, dados: LoginDTO): Promise<UsuarioLogin> => {
  const resposta = await api.post(url, dados)
  return resposta.data;
}

export const buscar = async(url: string, setDados: Function) => {
  const resposta = await api.get(url)
  setDados(resposta.data)
}

export const cadastrar = async(url: string, dados: Object, setDados: Function) => {
  const resposta = await api.post(url, dados)
  return resposta.data
}

export const atualizar = async(url: string, dados: Object, setDados: Function) => {
  const resposta = await api.put(url, dados)
  return resposta.data
}

export const deletar = async(url: string) => {
  await api.delete(url)
}

export const buscarServicos = async (setDados: Function) => {
  const resposta = await api.get('/servico')
  setDados(resposta.data)
} 