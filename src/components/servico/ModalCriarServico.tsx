import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';
import FormularioServico from './FormularioServico';


const PopupAny = Popup as any;

function ModalCriarServico() {

   return (
    <PopupAny
      modal
      trigger={
        <button
          type="button"
          className="border rounded px-5 py-3 bg-indigo-500 text-white"
        >
          Cadastrar novo serviço
        </button>
      }
    >
      {(close:() => void) => <FormularioServico onClose={close} />}
    </PopupAny>
  );
}

export default ModalCriarServico;