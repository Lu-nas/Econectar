import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';

// import './ModalServico.css'
import FormularioServico from './FormularioServico';

import Categoria from '../../Models/Categoria';
import { Usuario } from '../../Models/Usuario';

export interface Servico {
  id?: number;
  nomeServico: string;
  descricao: string;
  valor: number; 
  sobreMim: string;
  status?: string;
  vendedor:  Partial<Usuario>;
  comprador?: Partial<Usuario>;
  categoria: Partial<Categoria>;
}

function ModalServico() {
  return (
    <>
      <Popup 
      trigger={<button className='border rounded px-5 py-3 bg-indigo-500 text-white'>
        Cadastrar novo serviço</button>
      } modal>
        <div>
          <FormularioServico />
        </div>
      </Popup>
    </>
  );
}

export default ModalServico;