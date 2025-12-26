import { ChangeEvent, useContext, useEffect, useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import { AuthContext } from '../../Context/AuthContext';
import { UsuarioLogin } from '../../Models/UsuarioLogin';
import { LoginDTO } from '../../DTO/LoginDTO';


function Login() {
 const navigate = useNavigate();
  
  const [usuarioLogin, setUsuarioLogin] = useState<LoginDTO>({ 
    email: '',
    senha: '', 
  });

  const { usuario, handleLogin, isLoading } = useContext(AuthContext);

  useEffect(() => {
    if (usuario?.token) {
      navigate('/home');
    }
  }, [usuario, navigate]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value
    });
  }

  function realizarlogin(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    handleLogin(usuarioLogin);
  }

  return (
    <div className="grid grid-cols-1 h-screen place-items-center font-bold bg-custom">

      <form className="flex flex-col w-full max-w-md gap-6 bg-login border-2 border-blue-500 
      rounded-lg p-6" onSubmit={realizarlogin}>

      <h2 className="text-4xl text-blue-600 text-center">Login</h2>
        <div className="flex flex-col w-full">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={usuarioLogin.email}
            onChange={atualizarEstado}
            required
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="senha">Senha</label>
          <input
            type="password" 
            name="senha" 
            value={usuarioLogin.senha}
            onChange={ atualizarEstado}
            required
          />
        </div>
        <button type="submit" className="rounded bg-indigo-600 text-white py-2">
          {isLoading ? 'Entrando...' : 'Entrar'}
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
