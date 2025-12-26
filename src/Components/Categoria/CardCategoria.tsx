import { Link } from 'react-router-dom'
import Categoria from '../../Models/Categoria'
import LogoPerry from '../../assets/PerryEconectar.png';

interface CardCategoriaProps {
  categoria: Categoria
}

function CardCategoria({ categoria }: CardCategoriaProps) {
  return (
    <div className="border-2 border-blue-500 flex flex-col rounded-2xl overflow-hidden justify-between">

      <div className="flex  justify-end bg-white p-2">
          <img src={ LogoPerry } alt='Ícone Perry' className='h-10 w-10' />
        </div>

      <header className='py-2 px-6 bg-white text-dark font-bold text-2xl text-center uppercase'>
        {categoria.nomeCategoria}
      </header>

      <p className='p-8 text-2xl bg-white h-full text-center'>{categoria.descricao}</p>

      <div className="flex">
        <Link to={`/editarCategoria/${categoria.id}`} 
        className="w-full text-slate-100 bg-orange-400 hover:bg-orange-500 flex items-center justify-center py-2"
        > Editar
        </Link>
        
        <Link to={`/deletarCategoria/${categoria.id}`} 
        className="text-slate-100 bg-red-500 hover:bg-red-700 w-full flex items-center justify-center"
        >Deletar
        </Link>
      </div>
    </div>
  )
}

export default CardCategoria;
