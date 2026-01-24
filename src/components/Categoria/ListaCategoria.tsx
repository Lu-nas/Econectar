import { useEffect, useState } from 'react';
import { Dna } from 'react-loader-spinner';
import Categoria from '../../models/Categoria';
import CardCategoria from './CardCategoria';
import FiltroCategoria from './FiltroCategoria';
import { buscar } from '../../service/Services';
import { toastAlerta } from '../../util/Toastalert';
import LogoEconectar from '../../assets/LogoEconectar.png';



function ListaCategoria() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<number | null>(null);

  async function buscarCategorias() {
    try {
    setIsLoading(true);
    const dados = await buscar<Categoria[]>('/categorias');
      setCategorias(dados);
    } catch (error) {
      toastAlerta('Erro ao carregar categorias', 'erro');
    } finally {
      setIsLoading(false);
    } 
  }

  useEffect(() => {
    buscarCategorias();
  }, []);

  const categoriasFiltradas = categoriaSelecionada
    ? categorias.filter(c => c.id === categoriaSelecionada)
    : categorias; 

  return (
    <>
      {isLoading && (
        <Dna
          visible={true}
          height="200"
          width="200"
          ariaLabel="carregando-categorias"
          wrapperClass="mx-auto" 
        />
      )}

      {!isLoading && (
        <>
          <div className="flex justify-center my-4">
            <img src={LogoEconectar} alt="Econectar" />
          </div>

          <FiltroCategoria
            categorias={categorias}
            categoriaSelecionada={categoriaSelecionada}
            onChangeCategoria={setCategoriaSelecionada}
          />

          {categoriasFiltradas.length === 0 ? (
          <p className="text-center text-gray-500">
            Nenhuma categoria cadastrada.
          </p>
          ) : (
      
            <div className="flex justify-center w-full my-4">
              <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  { categoriasFiltradas.map(categoria => (
                    <CardCategoria key={categoria.id} categoria={categoria}
                    showIcon/>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
  

} export default ListaCategoria;
