import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Categoria from '../../models/Categoria';
// import { AuthContext } from '../../context/AuthContext';
import { atualizar, buscar, cadastrar } from '../../service/Services';
import { toastAlerta } from '../../util/Toastalert';
import { useAuth } from '../../hooks/useAuth';

function FormularioCategoria() {
  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const {usuario} = useAuth();


  async function buscarPorId(id: string) {
    try {
      const resposta = await buscar<Categoria>(`/categorias/${id}`);
      setCategoria(resposta);
    } catch (error) {
      toastAlerta('Erro ao buscar categoria', 'erro');
    }
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>){ 
    setCategoria({ ...categoria, [e.target.name]: e.target.value, }); 
  }

  async function gerarNovaCategoria(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); 

    try {
      if (id !== undefined) { 
        await cadastrar(`/categorias`, categoria);
        toastAlerta('Categoria cadastrada com sucesso', 'sucesso');
      } else {
        await atualizar(`/categorias`, categoria);
        toastAlerta('Categoria atualizado com sucesso', 'sucesso');  
      }
      retornar(); 
    } catch (error) {
    toastAlerta('Erro ao salvar categoria', 'erro');
    }
  } 

  function retornar() {
    navigate('/categoria');
  } 

  useEffect(() => {
    if (!usuario?.token) {
      toastAlerta('Faça login para acessar esta funcionalidade.', 'erro')
      navigate('/login');
    }
  }, [usuario?.token]);

  useEffect(() => {
    if (id) {
      buscarPorId(id);
    }
  }, [id]);
  
  return (
    <div className="container flex flex-col items-center justify-center mx-auto">
      <h1 className="text-4xl text-center my-8 text-dark">
        {id ? 'Editar categoria' : 'Cadastrar nova categoria'}
      </h1>

      <form className="w-full  max-w-xl flex flex-col gap-4" 
      onSubmit={gerarNovaCategoria}>

        <div className="flex flex-col gap-2 text-dark">
          <label htmlFor="nomeCat">Nome da categoria</label>
          <input
            type="text"
            placeholder="NomeCat"
            name="nomeCat"
            className="border-2 border-slate-700 rounded p-2 text-black"
            value={categoria.nomeCat ?? ''}
            onChange={atualizarEstado} 
            required 
          />
        </div> 
         
        <div className="flex flex-col gap-2 text-dark">
          <label htmlFor="descricao">Descrição da categoria</label>
          <input
            type="text"
            placeholder="Descrição"
            name="descricao"
            className="border-2 border-slate-700 rounded p-2 text-black"
            value={categoria.descricao ?? ''}
            onChange={atualizarEstado} 
            required 
          />
        </div> 

        <button
          className="rounded text-slate-100 bg-indigo-400 hover:bg-indigo-800 w-1/2 py-2 mx-auto"
          type="submit"
        >
          {id ? 'Cadastrar' : 'Editar'}
        </button>
      </form>
    </div>
  );

} 
export default FormularioCategoria;
