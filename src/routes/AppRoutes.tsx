import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/home/Home' ;
import Login from '../pages/login/Login';
import Cadastro from '../pages/cadastro/Cadastro';
import Perfil from '../pages/perfil/Perfil';

import PrivateRoute from '../util/PrivateRoute';

import ListaCategorias from '../components/Categoria/ListaCategoria';
import FormularioCategoria from '../components/Categoria/FormularioCategoria';
import DeletarCategoria from '../components/Categoria/DeletarCategoria';

import ListaServico from '../components/servico/ListaServico';
import FormularioServico from '../components/servico/FormularioServico';
import DeletarServico from '../components/servico/DeleteServico';
import PerfilPublico from '../pages/perfil/PerfilPublico';

export default function AppRoutes() {
  return (
  <Routes>

    {/* públicas */}
    <Route path="/login" element={<Login />} />
    <Route path="/cadastro" element={<Cadastro />} /> 
    

    {/* protegidas */}
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/perfil/:id" element={<PerfilPublico />} />

        <Route path="/categoria" element={<ListaCategorias />} />
        <Route path="/cadastrocategoria" element={<FormularioCategoria />} />
        <Route path="/editarcategoria/:id" element={<FormularioCategoria />} />
        <Route path="/deletarcategoria/:id" element={<DeletarCategoria />} />

        <Route path="/servico" element={<ListaServico />} />
        <Route path="/cadastroservico" element={<FormularioServico />} />
        <Route path="/editarservico/:id" element={<FormularioServico />} />
        <Route path="/deletarservico/:id" element={<DeletarServico />} />
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  );
}