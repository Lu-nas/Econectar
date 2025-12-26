import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import Categoria from '../../Models/Categoria';
import { atualizar, buscar, cadastrar } from '../../Service/Services';
import { UsuarioLogin } from '../../Models/UsuarioLogin'; // Import the correct type for UsuarioLogin
import { Servico } from './ModalServico';


function FormularioServico() {
  let navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [categoria, setCategoria] = useState<Categoria>({
    id: 0,
    nomeCategoria: '',
    descricao: '',
  });

  
  const [servico, setServico] = useState<Servico>({
    nomeServico: '',
    descricao: '',
    valor: 0 ,
    sobreMim: '', 
    vendedor: {id: usuario.id},
    categoria: {} as Partial<Categoria>
  });

  async function buscarServicoPorId(id: string) {
    await buscar(`/servico/${id}`, setServico);
  }
  

  async function buscarCategoriaPorId(id: string) {
    await buscar(`/categorias/${id}`, setCategoria);
  } 

  async function buscarCategorias() {
    await buscar('/categorias', setCategorias);
  }

  useEffect(() => {
    if (token === '') {
      alert('Você precisa estar logado');
      navigate('/');
    }
  }, [token]);

  useEffect(() => {
    buscarCategorias();
    if (id !== undefined) {
      buscarServicoPorId(id);
    }
  }, [id]); 

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setServico({
      ...servico,
      [name]: name === 'valor' ? Number(value) : value
    });
  }

  function retornar() {
    navigate('/servico');
  }

   async function gerarNovoServico(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
  
    try{
      if (id) {
      await atualizar('/servico/atualizar', servico, setServico);
      alert('Serviço atualizado com sucesso');
    } else {
      await cadastrar('/servico', servico, setServico);
      alert('Serviço cadastrado com sucesso');
    }
    navigate('/servico');
  } catch (error: any) {
    if (error.response?.status === 401) {
      alert('Sessão expirada');
      handleLogout();
    }else {
      alert('Erro ao salvar serviço');
    }
  }
}
    
  const carregandoCategoria = categoria.descricao === '';

  return (
    <div className="container flex flex-col mx-auto items-center">
      <h1 className="text-4xl text-center my-8">{id !== undefined ? 'Editar Servico' : 'Cadastrar Servico'}</h1>

      <form onSubmit={gerarNovoServico} className="flex flex-col w-1/2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="nomeServico">Nome do Servico</label>
          <input
            value={servico.nomeServico}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            type="text"
            placeholder="Nome do Servico"
            name="nomeServico"
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="descricao">Descrição do Servico</label>
          <input
            value={servico.descricao}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            type="text"
            placeholder="Descrição"
            name="descricao"
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="valor">Valor do Servico</label>
          <input
            value={servico.valor}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            type="number"
            placeholder="Valor"
            name="valor"
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="sobreMim">Sobre o mim: </label>
          <input
            value={servico.sobreMim}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            type="text"
            placeholder="Sobre Mim"
            name="sobreMim"
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>
        <div className="border p-2 border-slate-800 rounded">
          <p>Categoria do Servico</p>
          <select 
            onChange={(e) => setServico({...servico,
              categoria: { id: Number(e.target.value) }
            })
            }
             className="border p-2 border-slate-800 rounded">

            <option value="" disabled>Selecione uma categoria</option>
              {categorias.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.nomeCategoria}
                </option>
            ))}
          </select>
        </div>
        <button type="submit" className="rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800 text-white font-bold w-1/2 mx-auto block py-2">
          {carregandoCategoria ? <span className='text-white'>Enviar</span> : id !== undefined ? 'Editar' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
}

export default FormularioServico;
