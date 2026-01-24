import { useContext, useRef } from 'react';
import { AuthContext } from '../../context/AuthContext';


function Perfil() {
    
    const { usuario, setUsuario } = useContext(AuthContext);
    const fileInputRef = useRef<HTMLInputElement>(null);
   
    
        if (!usuario) {
            return null;
        }
    
        const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];

            if (!file) return;

            const reader = new FileReader();
            reader.onloadend = () => {
                setUsuario({   
                    ...usuario,
                    foto: reader.result as string,        
                });
            };
            reader.readAsDataURL(file);
        };
        
        const handleButtonClick = () => {
            fileInputRef.current?.click();
        };
    

        return (
        <div className='container mx-auto mt-4 rounded-2xl overflow-hidden'>
            <div className='relative bg-sky-500 h-72 flex items-center justify-center text-white'>
                <h2 className='text-3xl font-bold'>Perfil</h2>
            </div>
            <img
            src={usuario.foto || '/avatarPerfil.jpg'}
            alt={`Foto de perfil de ${usuario.nome}`}
            className='rounded-full w-56 mx-auto mt-[-8rem] border-8 border-white relative z-10'/>

            <input
                type='file'
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleImageChange}
            />
            <div className='mt-6 flex flex-col items-center gap-2 text-xl'>
                <p><strong>Nome:</strong> {usuario.nome}</p>
                <p><strong>Email:</strong> {usuario.email}</p>
            </div>

            
            <div className='flex justify-center mt-4'>
        <button
          className='bg-blue-500 text-white p-2 rounded hover:bg-blue-700'
          onClick={handleButtonClick}
        >
          Alterar imagem de perfil
        </button>
        </div>
    </div>
  );
}

export default Perfil;
