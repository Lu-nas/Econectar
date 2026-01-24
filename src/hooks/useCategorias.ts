import { useEffect, useState } from "react";
import Categoria from "../models/Categoria";
import { buscar } from "../service/Services";
import { useAuth } from "./useAuth";

export function useCategorias() {
  const { usuario, isLoading: authLoading } = useAuth();

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);

  async function carregarCategorias() {
    try {
      setLoading(true);
      const dados = await buscar<Categoria[]>('/categorias');
      setCategorias(dados);
    }catch (error) {
    console.error('Erro ao carregar categorias', error);
    setCategorias([]); // estado seguro 
    }finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!usuario || authLoading) return;

    carregarCategorias();
  }, [usuario, authLoading]);

  return { categorias, loading };
}