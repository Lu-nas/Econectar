import React, { createContext, ReactNode, useState, useEffect } from 'react';
import { UsuarioLogin } from '../Models/UsuarioLogin';
import { LoginDTO } from '../DTO/LoginDTO';
import { toastAlerta } from '../Util/Toastalert';
import { login } from '../Service/Services';


export interface AuthContextProps {
    usuario: UsuarioLogin | null;
    setUsuario: React.Dispatch<React.SetStateAction<UsuarioLogin | null>>;
    handleLogin(loginData: LoginDTO): Promise<void>;
    handleLogout(): void; 
    isLoading: boolean;
} 

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
    const [usuario, setUsuario] = useState<UsuarioLogin | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const usuarioInicial: UsuarioLogin = {
        id: 0, 
        nome: '',
        email: '',
        foto: '',
        token: ''
    };
    /*const [usuario, setUsuario] = useState<UsuarioLogin>(usuarioInicial);*/
   
    async function handleLogin(loginData: LoginDTO) {
        setIsLoading(true);
        try {
            const resposta = await login('/usuarios/logar', loginData);

            setUsuario(resposta);
            localStorage.setItem('token', resposta.token);
            localStorage.setItem('usuario', JSON.stringify(resposta));

            toastAlerta('Login realizado com sucesso', 'info');
        } catch (error) { 
            console.error(error);
            toastAlerta('Erro ao realizar login', 'error'); 
        }finally {
        setIsLoading(false);
        }
    } 

    function handleLogout() {
        setUsuario(null);
        localStorage.removeItem('usuario');
        localStorage.removeItem("token");
        toastAlerta('Logout realizado com sucesso', 'info');
    }

    useEffect(() => {
        const usuarioStorage = localStorage.getItem('usuario');

        if (usuarioStorage) {
            setUsuario(JSON.parse(usuarioStorage));
        }
    }, []);

   return (
        <AuthContext.Provider 
        value={{ usuario, setUsuario, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}
