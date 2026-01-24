import { ChangeEvent, useEffect, useState } from 'react';
import './Login.css';
import { Link, useNavigate, useLocation } from 'react-router-dom'; 
import { LoginRequest } from '../../DTO/LoginRequest';
import { useAuth } from '../../hooks/useAuth';

import { toastAlerta } from '../../util/Toastalert';


function Login() {
 const navigate = useNavigate();
 const location = useLocation();
  
  const from = location.state?.from?.pathname || '/home';

  const [usuarioLogin, setUsuarioLogin] = useState<LoginRequest>({ 
    email: 'luana@teste.com',
    senha: '12345678', 
  });

  const { usuario, handleLogin, isLoading } = useAuth();
  

  useEffect(() => {
  if (usuario?.token && usuario.token !== undefined) {
    navigate(from, { replace: true });
  }
}, [usuario?.token, navigate, from]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value
    });
  }

 async function realizarLogin(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const logado = await handleLogin(usuarioLogin);
      if (logado?.token) {
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.error('Erro no login', err);
      toastAlerta('Falha no login. Verifique email e senha.', 'error');
  
    }
  }
  
  return (
    <div className="grid grid-cols-1 h-screen place-items-center font-bold bg-custom">

      <form onSubmit={realizarLogin} className="w-full max-w-md p-6 bg-white rounded shadow">
        <h2 className="text-4xl text-blue-600 text-center mb-6">Login</h2>

        <div className="flex flex-col w-full">
          <label htmlFor="email">Email</label>
          <input
            disabled={isLoading}
            type="email"
            name="email"
            autoComplete="email"
            value={usuarioLogin.email}
            onChange={atualizarEstado}
            required
            className="border p-2 rounded"
          />
        </div> 

        <div className="flex flex-col w-full">
          <label htmlFor="senha">Senha</label>
          <input 
            disabled={isLoading}
            type="password" 
            name="senha" 
            autoComplete="current-password"
            value={usuarioLogin.senha}
            onChange={ atualizarEstado}
            required
            className="border p-2 rounded"
          />
        </div>

        <button type="submit" disabled={isLoading} 
        className="rounded bg-indigo-600 text-white py-2 w-full">
        {isLoading ?'Carregando...' :'Entrar'}
        </button>

        <hr className="my-4 border-slate-300 w-full" /> 

        <p className='text-dark text-center'>
          Ainda não tem uma conta?{' '}
          <Link to="/cadastro" className="text-indigo-800 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
