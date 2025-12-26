import { useEffect, useState } from 'react';
import Servico from '../Models/Servico';
import { buscar } from '../Service/Services';
import { toastAlerta } from '../Util/Toastalert';
import { useAuth } from './useAuth';

export function useServicos() {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [loading, setLoading] = useState(true);

  const { usuario } = useAuth();

  async function carregarServicos() {
    try {
      setLoading(true);
      await buscar('/servico', setServicos);
    } catch (error) {
      toastAlerta('Erro ao carregar serviços', 'erro');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!usuario?.token) return;
    carregarServicos();
  }, [usuario?.token]);

  return {
    servicos,
    loading
  };
}