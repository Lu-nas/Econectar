import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './NavBar.css';


function Navbar() {
  const { usuario, handleLogout } = useAuth();
  const navigate = useNavigate();
  const isLogged = Boolean(usuario?.id);

  const avatar = usuario?.foto?.startsWith('http')
    ? usuario.foto
    : undefined;

  function logout() {
  handleLogout();
  navigate('/login', { replace: true });
  };
  
  useEffect(() => {
  if (usuario) {
      console.log('NavBar usuario', usuario);
    }
  }, [usuario]);


  return (
    <nav className='w-full bg-orange-600 text-white navibar'>
      <div className='container mx-auto flex justify-between items-center py-4 px-6'>
        
        {/* Logo */} 
          <Link to={isLogged ? '/home' : '/login'}>
           <img src={logo} alt='Logo' className='h-10' />
          </Link>
       
       {/* Menu */}
        <div className='flex gap-6 items-center fontcustom'>
          {!isLogged && (
            <>
              <Link to="/login" className="hover:bg-indigo-700 px-4 py-2 rounded">Login</Link>
              <Link to="/cadastro" className="hover:bg-indigo-700 px-4 py-2 rounded"> Cadastro</Link>
            </>
          )}

          {/* privados */}
          {isLogged &&  (
            <>
              <Link to="/home" className="hover:bg-indigo-700 px-4 py-2 rounded">Home</Link>
              <Link to="/servico" className="hover:bg-indigo-700 px-4 py-2 rounded">Serviços</Link>
              <Link to="/categoria" className="hover:bg-indigo-700 px-4 py-2 rounded">Categorias</Link>
              <Link to="/cadastrocategoria" className="hover:bg-indigo-700 px-4 py-2 rounded">Nova Categoria</Link>
              <Link to="/perfil" className="hover:bg-indigo-700 px-4 py-2 rounded">Perfil</Link>
            </>
          )}
        </div>

         {/* Área do usuário */}
        <div className="flex gap-4 items-center text-lg">
          {isLogged ? (
            <div className="flex items-center gap-2">

              {/* Foto segura */}
              {avatar ? (
                <img src={avatar} alt={usuario?.nome}
                className="h-8 w-8 rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.remove();
                }}
                />
              ) : (
                <FaUser className='h-8 w-8' />
              )}

              {/* Botão logout */}
              <button onClick={logout} className='hover:text-gray-300'>
                <FaSignOutAlt />
              </button>
            </div>
          ) : (
            <Link to="/login" className="hover:text-gray-300">
              <FaUser />
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar; 