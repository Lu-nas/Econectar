import React, { createContext, ReactNode, useState, useEffect } from 'react';
import { LoginRequest } from '../DTO/LoginRequest';
import { toastAlerta } from '../util/Toastalert';
import { login } from '../service/Services';
import { ENDPOINTS } from '../service/Endpoints'; 
import { useNavigate } from 'react-router-dom';
import { AuthResponse } from '../models/AuthResponse';


export interface AuthContextProps {
    usuario: AuthResponse| null;
    setUsuario: React.Dispatch<React.SetStateAction<AuthResponse| null>>;
    handleLogin(loginData: LoginRequest): Promise<AuthResponse>;
    handleLogout(): void; 
    isLoading: boolean;
} 

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps| null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState<AuthResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true); 

      async function handleLogin(loginData: LoginRequest): Promise<AuthResponse> {

        if (isLoading)  return {} as AuthResponse;
        setIsLoading(true);

        try {
        
        const resposta = await login(ENDPOINTS.LOGIN, loginData);
            setUsuario(resposta); 
            // Converte o array para string JSON e salva com a chave 'meusItems'
            localStorage.setItem('usuario', JSON.stringify(resposta));

            toastAlerta('Login realizado com sucesso', 'info');
            navigate('/home', { replace: true });

            return resposta;
        } catch (error) {
            toastAlerta('Email ou senha inválidos', 'error');
        throw error;
        }finally {
            setIsLoading(false);
        }
    } 

    function handleLogout() {
        setUsuario(null);
        localStorage.removeItem('usuario'); 
        navigate('/login', { replace: true });
        toastAlerta('Logout realizado com sucesso', 'info');
    }

    useEffect(() => {
        const storage = localStorage.getItem('usuario');

        if (storage)  
        try {
        const usuarioParse: AuthResponse = JSON.parse(storage);  
            setUsuario(usuarioParse);
             
        } catch {
            localStorage.removeItem('usuario');
        } 
         setIsLoading(false);   
    },[]);

    return (
        <AuthContext.Provider 
        value={{ usuario, setUsuario, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}
