import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Servico from '../../models/Servico'
import { AuthContext } from '../../context/AuthContext'
import { buscar, deletar } from '../../service/Services' 



function ExcluirServico() {
  const [servico, setServico] = useState<Servico>({} as Servico)

  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>() 
  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario?.token

  

 async function buscarPorId(id: string) {
    const dados = await buscar<Servico>(`/servico/${id}`)
    setServico(dados)
  }

  useEffect(() => {
    if (!token) {
      alert('Você precisa estar logado')
      navigate('/login')
    }
  }, [token])

  useEffect(() => {
    if (id) {
      buscarPorId(id)
    }
  }, [id])


  async function deleteServico() {
    try {
      await deletar(`/servico/${id}`)
      alert('Serviço apagado com sucesso')
      navigate('/home')
    } catch {
      alert('Erro ao apagar o serviço')
    }
  }

  return (
    <div className='container w-1/3 mx-auto text-dark'>
      <h1 className='text-4xl text-center my-4'><span>Deletar</span> Servico</h1>

      <p className='text-center font-semibold mb-4'>Você tem certeza de que deseja apagar a Servico a seguir?</p>

      <div className='border-2 border-red-500 border-solid flex flex-col rounded-2xl overflow-hidden justify-between bg-white'>
        <header className='py-2 px-6 bg-white text-dark font-bold text-2xl'>Servico</header>
        <div className="p-4">
          <p className='text-xl h-full'>{servico.nomeServico}</p>
          <p>{servico.descricao}</p>
        </div>
        <div className="flex">
          <button className='w-full text-slate-100 bg-red-500 hover:bg-red-700 flex items-center justify-center border-none rounded-none' onClick={deleteServico}>
            Sim
          </button>
        </div>
      </div>
    </div>
  )
}

export default ExcluirServico