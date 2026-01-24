import  { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import Categoria from '../../models/Categoria'
import { AuthContext } from '../../context/AuthContext'
import { buscar, deletar } from '../../service/Services' 
import { toastAlerta } from '../../util/Toastalert'


function DeletarCategoria() {
    const [categoria, setCategoria] = useState<Categoria>({} as Categoria)

    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()
    const { usuario } = useContext(AuthContext)
   

    async function buscarPorId(id: string) {
        try {
        const resposta = await buscar<Categoria>(`/categorias/${id}`);
            setCategoria(resposta);
        } catch (error) {
            toastAlerta('Erro ao buscar categoria', 'erro');
        }
    } 
    
    useEffect(() => {
        if (!usuario.token) {
            toastAlerta('Faça login para acessar esta funcionalidade.', 'erro');
            navigate('/login')
        }
    }, [usuario.token])

    useEffect(() => {
        if (id) {
            buscarPorId(id)
        }
    }, [id])

    function retornar() {
        navigate("/categoria")
    }

    async function deletarCategoria() { 
        try {
            await deletar(`/categorias/${id}`);
            toastAlerta('Categoria apagada com sucesso', 'sucesso');
            retornar();
        } catch (error) {
            toastAlerta('Erro ao apagar categoria', 'erro');
        }
    }

    return (
        <div className='container max-w-md mx-auto'>
            <h1 className='text-4xl text-center my-4 text-black'>Deletar Categoria</h1>

            <p className='text-center font-semibold mb-4 text-black'>
                Você tem certeza de que deseja apagar {categoria.nomeCat}  a seguir? ?</p>

            <div className='border flex flex-col rounded-2xl overflow-hidden '>
                <header className='py-2 px-6 bg-indigo-600 text-white font-bold text-xl'>
                    {categoria.nomeCat}</header>

                <p className='p-6 text-base bg-slate-200 flex-1'>{categoria.descricao}</p>

                <div className="flex">
                    <button className="w-full text-slate-100 bg-red-400 hover:bg-red-600 py-2"
                    onClick={retornar}>Não</button>
                    <button className="w-full text-slate-100 bg-indigo-400 hover:bg-indigo-600 py-2" 
                    onClick={deletarCategoria}>
                        Sim
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletarCategoria