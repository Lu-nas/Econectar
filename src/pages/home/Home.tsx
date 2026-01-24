import './Home.css'; 
import LogoPerry from '../../assets/PerryEconectar.png';
import { useAuth } from '../../hooks/useAuth';
import { useTypewriter } from '../../hooks/useTypewriter';

const words = ['pessoas!', 'serviços!'];

function Home() {
  const { usuario } = useAuth();
  const displayedText = useTypewriter(words);

    return (
    <>
      {/* Hero */}
      <div className="flex justify-center py-8 ">
        <div className='container text-white'>
          <div className="flex flex-col gap-4 items-center justify-center py-4">
            <h1 className='text-5xl font-bold'>
              Conectando <span className='txt-custom'>{displayedText}</span>
            </h1>
            {usuario && (
              <p className="text-center mt-2">
                Bem-vinda, <strong>{usuario.nome}</strong> 👋
              </p>
            )}
          </div>
        </div>
      </div> 

      {/* Sobre */}
      <section className="sobre  flex flex-col md:flex-row items-center 
      justify-center py-8 px-4 bg-opacity-75 bg-cover">  

      <div className="md:w-1/3 w-full flex justify-center md:justify-end mb-4 md:mb-0">
        <img src={LogoPerry} alt="Logo Econectar" className="max-w-full h-auto" />
      </div>
 
      <div className="md:w-2/3 text-center">
          {/* <h2 className="txt-sobre">Sobre</h2> */}

        <p className='sobretxt text-stroke'>
          E-conectar é um marketplace que reúne serviços, 
          ao desenvolvimento sustentável (ODS 11) da ONU. 
        </p> 
        <p className="sobretxt ">
       com sustentabilidade e serviços ecológicos  
        caminhamos para um futuro mais verde.
        </p>
      </div>
    </section>    
    </>
  );
}

export default Home;
