import { Link } from 'react-router-dom'
import Servico from '../../models/Servico'
import ModalSabermais from './ModalDetalhesServico';
import LogoPerry from '../../assets/PerryEconectar.png';

interface CardServicoProps {
  serv: Servico
}

function CardServico({ serv }: CardServicoProps) {
  return (
    <div className='card-servico'>
      <div className="flex w-full gap-4 justify-end">
        <img src={ LogoPerry } alt="Identidade visual do serviço" className='h-10 w-10' />
      </div>

      <div className='card-servico-content flex flex-col'>
        <h4 className='text-lg font-semibold uppercase'>
          {serv.nomeServico}
        </h4>
        
        <p>{serv.descricao}</p>

        <p className='font-bold'>Valor:{' '}{serv.valor.toLocaleString('pt-BR',{
          style: 'currency',currency: 'BRL',})}
        </p>

        <div className="mt-auto text-center">
          <ModalSabermais serv={serv}/>
        </div>
      </div>

      { /* Exemplo: só mostra ações se for dono */ }
      {serv.vendedor && (
      <div className="card-servico-footer">
        <Link to={`/editarServico/${serv.id}`} className='edit-button'>
          Editar
        </Link>
        <Link to={`/deletarServico/${serv.id}`} className='delete-button'>
          Deletar
        </Link>
      </div>
      )}
    </div>
  )
}

export default CardServico
