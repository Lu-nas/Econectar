import axios from 'axios';
import { toastAlerta } from '../util/Toastalert';

export const api = axios.create({
  baseURL: 'http://localhost:8080',
});


// REQUEST
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;

  },
  (error) => Promise.reject(error)
);

// RESPONSE
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config?.url ?? '';
    const isLogin = url.includes('/usuarios/login');

    if (error.response?.status === 401 && !isLogin) {
      console.warn('401 recebido, token inválido ou expirado');

      toastAlerta(
        'Sua sessão expirou. Faça login novamente',
        'error'
      );
    }

    return Promise.reject(error);
  }
);