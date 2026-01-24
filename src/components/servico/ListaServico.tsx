
import { MagnifyingGlass } from 'react-loader-spinner';
import CardServico from './CardServico'; 
import ModalServico from '../servico/ModalCriarServico';
import LogoEconectar from '../../assets/LogoEconectar.png';
import FiltroCategoria from '../Categoria/FiltroCategoria';

import { useCategorias } from '../../hooks/useCategorias'; 
import { useServicos } from '../../hooks/useServicos'; 
import { useState } from 'react';
import Servico from '../../models/Servico';

function ListaServico() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<number | null>(null);
  const { categorias, loading: loadingCategorias } = useCategorias();
  const { servicos, loading } = useServicos();
  const [busca, setBusca] = useState('');
  
  if (loading) {
    return (
      <div className="flex justify-center my-10" role="status"aria-live="polite">
        <MagnifyingGlass
          visible
          height="140"
          width="140"
          ariaLabel="Carregando serviços"
          glassColor="#c0efff"
          color="#EA580C"
        />
      </div>
    );
  }
  
  const termoBusca = busca.toLowerCase();

  const servicosFiltrados = servicos.filter(filtrarServicos);

  function filtrarServicos(serv:Servico) {
    const matchBusca =
    serv.nomeServico.toLowerCase().includes(termoBusca) ||
    serv.descricao.toLowerCase().includes(termoBusca);
  
    const matchCategoria =
  !categoriaSelecionada || serv.categoria?.id === categoriaSelecionada;

  return matchBusca && matchCategoria;
  }

  return (
    <>
      <div className="text-center flex justify-center">
        <img src={LogoEconectar} alt="Logo Econectar" />
      </div>
      
      {/* Busca */}
      <div className="flex justify-center my-4">
        <input
          type="text"
          placeholder="Buscar serviço..."
          aria-label="Buscar serviço pelo nome ou descrição"
          autoComplete="off"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="border rounded px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Filtro de Categoria */}
      <FiltroCategoria
        categorias={categorias}
        categoriaSelecionada={categoriaSelecionada}
        onChangeCategoria={setCategoriaSelecionada}
      />

      {servicos.length > 0 && (
      <div className= "text-center flex justify-center my-4">
        <ModalServico />
      </div>
      )}

      {servicos.length > 0 && servicosFiltrados.length === 0 && (
      <p className="text-center text-gray-500 my-10">
        Nenhum serviço encontrado para sua busca.
      </p>
      )}

      {servicosFiltrados.length > 0 && (
      <div className="container mx-auto my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {servicosFiltrados.map((serv) => (
          <CardServico key={serv.id} serv={serv} />
        ))}
      </div>
      )}
    </>
  );
}

export default ListaServico;