
import { MagnifyingGlass } from 'react-loader-spinner';
import CardServico from './CardServico'; 
import ModalServico from './ModalServico';
import LogoEconectar from '../../assets/LogoEconectar.png'; 

import { useServicos } from '../../Hooks/useServicos';




function ListaServico() {
  const { servicos, loading } = useServicos();
  

  if (loading) {
    return (
      <div className="flex justify-center my-10">
        <MagnifyingGlass
          visible
          height="140"
          width="140"
          ariaLabel="loading"
          glassColor="#c0efff"
          color="#EA580C"
        />
      </div>
    );
  }
 
  return (
    <>
      <div className="text-center flex justify-center">
        <img src={LogoEconectar} alt="Logo Econectar" />
      </div>
      
      <div className= "text-center flex justify-center my-4">
        <ModalServico />
      </div>
      
      <div className="container mx-auto my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {servicos.map((serv) => (
          <CardServico key={serv.id} serv={serv} />
        ))}
      </div>
    </>
  );
}

export default ListaServico;