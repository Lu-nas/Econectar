import Footer from './Components/Footer/Footer';
import NavBar from './Components/NavBar/NavBar';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; 
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import Cadastro from './Pages/Cadastro/Cadastro';

import ListaCategorias from './Components/Categoria/ListaCategoria';
import FormularioCategoria from './Components/Categoria/FormularioCategoria';
import DeletarCategoria from './Components/Categoria/DeletarCategoria';
import { AuthProvider } from './Context/AuthContext';
import Perfil from './Pages/Perfil/Perfil';
import DeletarServico from './Components/Servico/DeletarServico';
import FormularioServico from './Components/Servico/FormularioServico';
import ListaServico from './Components/Servico/ListaServico';
import PrivateRoute from '../src/Util/PrivateRoute'

function App() {
  return (
    <>
     <AuthProvider>
    <BrowserRouter>
    <ToastContainer />
        <NavBar />

          <div className='min-h-[80vh]'>
            <Routes>

              {/* Rotas públicas */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} /> 

              {/* Rotas protegidas */}
            <Route element={<PrivateRoute />}>
              <Route path="/home" element={<Home />} />
              <Route path="/perfil" element={<Perfil />} />

              <Route path="/categoria" element={<ListaCategorias />} />
              <Route path="/cadastrocategoria" element={<FormularioCategoria />} />
              <Route path="/editarcategoria/:id" element={<FormularioCategoria />} />
              <Route path="/deletarcategoria/:id" element={<DeletarCategoria />} />

              <Route path="/servico" element={<ListaServico />} />
              <Route path="/cadastroservico" element={<FormularioServico />} />
              <Route path="/editarservico/:id" element={<FormularioServico />} />
              <Route path="/deletarservico/:id" element={<DeletarServico />} />
            </Route>
            </Routes>
          </div>

          <Footer />
        </BrowserRouter>
        </AuthProvider>
    
    </>
);
}
export default App;