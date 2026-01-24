import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Categoria from '../../models/Categoria';
import Servico, { StatusServico } from '../../models/Servico';
import { atualizar, buscar, cadastrar } from '../../service/Services'; 


interface FormularioServicoProps {
    onClose?: () => void;
  }

function FormularioServico({ onClose }: FormularioServicoProps){ 
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); 

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const { usuario, handleLogout } = useContext(AuthContext); 
  const [servico, setServico] = useState<Servico>({
    id: 0,
    nomeServico: '',
    descricao: '',
    valor: 0,
    categoria: null,
    status: StatusServico.DISPONIVEL,
    vendedor: usuario ? { id: usuario.id, nome: usuario.nome } : null,
    comprador: null
  }); 

  /*BUSCAS*/

  async function carregarCategorias() {
    const dados = await buscar<Categoria[]>('/categorias');
    setCategorias(dados);
  } 

  async function carregarServico(id: string) {
    const dados = await buscar<Servico>(`/servico/${id}`);
    setServico({
    ...dados,
    categoria: dados.categoria ?? null
  });
  }

  /* EFFECTS*/

  useEffect(() => {
    if (!usuario?.token) {
      alert('Você precisa estar logado');
      navigate('/login');
    }
  }, [usuario?.token]);

  useEffect(() => {
    carregarCategorias();
    if (id) {
      carregarServico(id);
    }
  }, [id]);

  /*HANDLERS*/

  function atualizarEstado(
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setServico(prev => ({
      ...prev,
      [name]: name === 'valor' ? Number(value) : value
    }));
  }

  async function gerarNovoServico(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (id) {
        await atualizar('/servico', servico);
        alert('Serviço atualizado com sucesso');
      } else {
        await cadastrar('/servico', servico);
        alert('Serviço cadastrado com sucesso');
      }

      if (onClose) {
        onClose();
      } else {
        navigate('/home');
      }
    
    } catch (error: any) {
      if (error.response?.status === 401) {
        alert('Sessão expirada');
        handleLogout();
      } else {
        alert('Erro ao salvar serviço');
      }
    }
  } 
  
  /* RENDER*/ 

  return (
    <div className="container flex flex-col mx-auto items-center">
      <h1 className="text-4xl text-center my-8">
        {id? 'Editar Servico' : 'Cadastrar Serviço'}</h1>

      <form onSubmit={gerarNovoServico} className="flex flex-col w-1/2 gap-4">

        <label>Nome do Servico <input name="nomeServico" value={servico.nomeServico}
          onChange={atualizarEstado}required className="border rounded p-2"/>
        </label>
        
        <label>Descrição <input name="descricao" value={servico.descricao}
          onChange={atualizarEstado}required className="border rounded p-2"/>
        </label>

        <label>Valor <input  name="valor" type="number" value={servico.valor}
            onChange={atualizarEstado} required className="border rounded p-2"/>
        </label>

        <label> Categoria
         <select 
            value={servico.categoria?.id ?? ''}
            onChange={(e) => setServico(prev => ({
                ...prev,
                categoria: { id: Number(e.target.value) } as Categoria
              }))
            }
            required
            className="border rounded p-2">

            <option value="">Selecione uma categoria</option>
              {categorias.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.nomeCat}
                </option>
            ))}
          </select>
        </label>
     
        <button className="bg-indigo-600 text-white rounded py-2">
          { id  ? 'Editar' : 'Cadastrar'} 
        </button>
      </form>
    </div>
  );
} 
export default FormularioServico; 