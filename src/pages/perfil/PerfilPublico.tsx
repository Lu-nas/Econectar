import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { buscar } from '../../service/Services';
import { UsuarioPublico } from '../../models/UsuarioPublico';

function PerfilPublico() {
  const { id } = useParams<{ id: string }>();
  const [usuario, setUsuario] = useState<UsuarioPublico | null>(null);
  const [loading, setLoading] = useState(true);

  const avatar =
  usuario.foto && usuario.foto.startsWith('http')
    ? usuario.foto
    : '/avatarPerfil.jpg';

  useEffect(() => {
    async function carregarPerfil() {
      try {
        const resposta = await buscar<UsuarioPublico>(`/usuarios/perfil/${id}`);
        setUsuario(resposta);
      } catch (error) {
        console.error('Erro ao buscar perfil público', error);
      } finally {
        setLoading(false);
      }
    }

    if (id) carregarPerfil();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto mt-10 text-center">
        <p>Carregando perfil...</p>
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className="container mx-auto mt-10 text-center">
        <p>Perfil não encontrado</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-6 rounded-2xl overflow-hidden">

      <div className="relative bg-sky-500 h-60 flex items-center justify-center text-white">
        <h2 className="text-3xl font-bold">{usuario.nome}</h2>
      </div>

      <img
         src={avatar} alt={`Foto de ${usuario.nome}`}
        className="rounded-full w-52 mx-auto mt-[-6rem] border-8 border-white relative z-10"
      />

      <div className="mt-6 flex flex-col items-center gap-4 px-6 text-center">
        {usuario.sobreMim && (
          <p className="text-lg max-w-2xl">
            {usuario.sobreMim}
          </p>
        )}

        {usuario.endereco && (
          <p className="text-gray-600">
            📍 {usuario.endereco}
          </p>
        )}
      </div>
    </div>
  );
}

export default PerfilPublico;