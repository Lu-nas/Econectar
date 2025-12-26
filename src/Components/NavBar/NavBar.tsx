import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { AuthContext } from '../../Context/AuthContext';
import { toastAlerta } from '../../Util/Toastalert';
import logo from '../../assets/logo.png';
import './NavBar.css';

function Navbar() {
  const { usuario, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    handleLogout(); // Chama a função de logout do contexto
    toastAlerta('Logout realizado com sucesso!', 'info'); // Exibe uma mensagem de sucesso
    navigate('/login'); 
  };

  return (
    <nav className='w-full bg-orange-600 text-white'>
      <div className='container mx-auto flex justify-between items-center py-4 px-6'>
        
        {/* Logo */} 
          <Link to="/" className="text-2xl font-bold uppercase">
            <img src={logo} alt='Logo' className='h-10' />
          </Link>
       
        {/* Links */}
        <div className='flex gap-6 items-center fontcustom'>

          {/* Links públicos */}
          {!usuario?.token && (
            <>
              <Link to="/" className="hover:bg-indigo-700 px-4 py-2 rounded"> Home</Link>
              <Link to="/login" className="hover:bg-indigo-700 px-4 py-2 rounded"> Login</Link>
              <Link to="/cadastro" className="hover:bg-indigo-700 px-4 py-2 rounded">Cadastro</Link>
            </>
          )}
          {/* Links privados */}
          {usuario?.token && (
            <>
              <Link to="/home' className='hover:bg-indigo-700 px-4 py-2">Home</Link>
              <Link to="/servico' className='hover:bg-indigo-700 px-4 py-2">Serviços</Link>
              <Link to="/categoria' className='hover:bg-indigo-700 px-4 py-2">Categoria</Link>
              <Link to="/cadastrocategoria' className='hover:bg-indigo-700 px-4 py-2">Cadastrar Categoria</Link>
              <Link to="/perfil' className='hover:bg-indigo-700 px-4 py-2">Perfil</Link>
            </>
          )}
        </div>

        {/* Icons */}
        <div className="flex gap-4 items-center text-lg">
          {usuario?.token && (
            <> 
          <Link to="/cart" className="hover:text-gray-300">
            <FaShoppingCart />
          </Link> 
          <button onClick={logout} className='hover:text-gray-300'>
            <FaSignOutAlt />
          </button>
          </>
          )}
          {!usuario?.token && (
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
