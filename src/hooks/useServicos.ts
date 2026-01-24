import { useEffect, useState } from 'react'; 
import Servico from '../models/Servico';
import { buscarServicos } from '../service/Services';
import { toastAlerta } from '../util/Toastalert';
import { useAuth } from './useAuth';


export function useServicos() {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [loading, setLoading] = useState(false);

  const { usuario } = useAuth();

  async function carregarServicos() {
    try {
      setLoading(true);
      const dados = await buscarServicos();
      setServicos(dados);
    } catch {
      toastAlerta('Erro ao carregar serviços', 'erro');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!usuario?.token){
      carregarServicos();
    }  
  }, [usuario?.token]);

  /*let mounted = true;

  if (mounted) setServicos();

  return () => {
    mounted = false;
  };*/

  return {
    servicos,
    loading,
    recarregar: carregarServicos,
  };

  
}