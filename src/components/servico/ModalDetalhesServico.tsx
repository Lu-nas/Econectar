import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';
import Servico from '../../models/Servico';
import { useState } from 'react';

// import './ModalServico.css';

interface ModalDetalhesServicoProps {
  serv: Servico;
}

function ModalDetalhesServico({ serv }: ModalDetalhesServicoProps) {
  const [open, setOpen] = useState(false);
  
  return (
    <> 
      <button  
       type="button"
       aria-label={`Ver mais detalhes sobre o serviço ${serv.nomeServico}`}
       className="border rounded bg-white px-5 py-3 text-dark"
       onClick={() => setOpen(true)}
       >Saber mais
      </button>
      
      <Popup open={open} modal onClose={() => setOpen(false)}>
        <div className="modal-content p-6 max-w-md">
          <h2 className="text-xl font-bold text-center">Sobre o Serviço </h2>
          <div className="flex justify-center">
            <button
              onClick={() => setOpen(false)}
              className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
            >
              Fechar
            </button>
          </div>
      </div> 
      </Popup>
    </>
  );
}

export default ModalDetalhesServico;
