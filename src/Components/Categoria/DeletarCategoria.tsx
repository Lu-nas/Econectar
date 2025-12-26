import  { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import Categoria from '../../Models/Categoria'
import { AuthContext } from '../../Context/AuthContext'
import { buscar, deletar } from '../../Service/Services'



function DeletarCategoria() {
    const [categoria, setCategoria] = useState<Categoria>({} as Categoria)

    let navigate = useNavigate()

    const { id } = useParams<{ id: string }>()

    const { usuario, handleLogout } = useContext(AuthContext)
   

    async function buscarPorId(id: String) {
        await buscar(`/categorias/${id}`, setCategoria);
    } 
    
    useEffect(() => {
        if (!usuario.token) {
            alert('Você precisa estar logado')
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
        await deletar(`/categorias/${id}`)
        alert('Categoria apagada com sucesso') 
        retornar()
    }

    return (
        <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center my-4 text-black'>Deletar Categoria</h1>

            <p className='text-center font-semibold mb-4 text-black'>Você tem certeza de que deseja apagar a Categoria a seguir?</p>

            <div className='border flex flex-col rounded-2xl overflow-hidden '>
                <header className='py-2 px-6 bg-indigo-600 text-black font-bold text-2xl'>{categoria.nomeCategoria}</header>
                <p className='p-8 text-3xl bg-slate-200 h-full'>{categoria.descricao}</p>
                <div className="flex">
                    <button className='text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2' 
                    onClick={retornar}>Não</button>
                    <button className='w-full text-slate-100 bg-indigo-400 hover:bg-indigo-600' 
                    onClick={deletarCategoria}>
                        Sim
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletarCategoria