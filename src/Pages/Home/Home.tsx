import React from 'react';
import './Home.css';
import ListaServico from '../../Components/Servico/ListaServico';
import LogoPerry from '../../assets/PerryEconectar.png';
import { useAuth } from '../../Hooks/useAuth';
import { useTypewriter } from '../../Hooks/useTypewriter';

const words = ['vidas!', 'pessoas!', 'serviços!'];

function Home() {
  const { usuario } = useAuth();

  const displayedText = useTypewriter(words);

    return (
    <>
      {/* Hero */}
      <div className="flex justify-center py-8 bghome1">
        <div className='container text-white'>
          <div className="flex flex-col gap-4 items-center justify-center py-4">
            <h2 className='text-5xl font-bold'>
              Conectando <span className='txt-custom'>{displayedText}</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Conteúdo protegido */}
      {usuario?.token && <ListaServico />}


      {/* Sobre */}
      <div className="sobre flex flex-col md:flex-row items-center justify-center py-8 px-4 bg-opacity-75 bg-cover"> 
        <div className="md:w-1/3 w-full flex justify-center md:justify-end mb-4 md:mb-0">
          <img src={LogoPerry} alt="Logo" className="max-w-full h-auto" />
        </div>

        <div className="md:w-2/3 w-full text-center md:text-left px-4">
        <h2 className='text-center txt-sobre'>Sobre</h2>
          <p className='sobretxt text-stroke text-center'>
          A E-conectar é um marketplace inovador que reúne serviços sustentáveis, 
          alinhado ao Objetivo de Desenvolvimento Sustentável (ODS 11) da ONU. 
        </p> 
        <p className="sobretxt text-center">
            Acreditamos que a sustentabilidade é o caminho para o futuro,
            conectando consumidores e prestadores de serviços ecológicos.
          </p>
          <p className="sobretxt text-center">
            Mobilidade sustentável, eficiência e impacto positivo para cidades
            mais humanas.
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;
