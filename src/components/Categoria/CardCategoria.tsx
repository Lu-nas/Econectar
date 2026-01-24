import { Link } from 'react-router-dom'
import Categoria from '../../models/Categoria'
import LogoPerry from '../../assets/PerryEconectar.png';

interface CardCategoriaProps {
  categoria: Categoria
  showIcon?: boolean
}

function CardCategoria({ categoria, showIcon = false  }: CardCategoriaProps) {

  return (
    <div className="border-2 border-blue-500 flex flex-col rounded-2xl overflow-hidden">

      {showIcon && (
      <div className="flex  justify-end bg-white p-2">
          <img src={ LogoPerry } alt='Ícone Perry' className='h-10 w-10' />
        </div>
      )}
      
      <h2 className='py-2 px-6 bg-white text-dark font-bold text-2xl text-center uppercase'>
        {categoria.nome}
      </h2>

      <p className='p-6 text-base bg-white flex-1 text-center'>{categoria.descricao}</p>

      <div className="flex">

        <Link to={`/editarCategoria/${categoria.id}`}  aria-label="Editar categoria"
        className="w-full text-slate-100 bg-orange-400 hover:bg-orange-500 flex items-center justify-center py-2"
        > Editar
        </Link>
        
        <Link to={`/deletarCategoria/${categoria.id}`} aria-label="Deletar categoria"
        className="w-full text-slate-100 bg-red-500 hover:bg-red-700 flex items-center justify-center py-2" 
        >Deletar
        </Link>
      </div>
    </div>
  )
}

export default CardCategoria;
