import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Cadastro.css'; 
import { cadastrar } from '../../service/Services';
import { toastAlerta } from '../../util/Toastalert';
import { Usuario } from '../../models/Usuario';
import {UsuarioCadastroDTO} from '../../DTO/UsuarioCadastroDTO'



function Cadastro() {
    let navigate = useNavigate();

    const [confirmaSenha, setConfirmaSenha] = useState<string>("");
     const [senha, setSenha] = useState('');

    const [usuario, setUsuario] = useState<Usuario>({
        id: 0,
        nome: '',
        email: '',
        foto: '',
        cpf: '',
        endereco: '',
        dataNascimento: '',
        servicosVendidos: [],
        servicosComprados: []
    }); 
   


    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuario({
        ...usuario,
        [e.target.name]: e.target.value
        });
    }
    function atualizarData(e: ChangeEvent<HTMLInputElement>) {
        setUsuario({
        ...usuario,
        dataNascimento: e.target.value
        });
    }

    async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (senha.length < 8) {
            toastAlerta('A senha deve ter no mínimo 8 caracteres', 'error');
            return;
            }

            if (senha !== confirmaSenha) {
                toastAlerta('As senhas não conferem', 'error');
            return;
        }
        const payload: UsuarioCadastroDTO = {
            nome: usuario.nome,
            email: usuario.email,
            senha,
            cpf: usuario.cpf,
            endereco: usuario.endereco,
            dataNascimento: usuario.dataNascimento,
            foto: usuario.foto || undefined
        };

        try {
            await cadastrar('/usuarios/cadastrar', payload);
            toastAlerta('Usuário cadastrado com sucesso', 'success');
            navigate('/login');
        } catch (error) {
            toastAlerta('Erro ao cadastrar o Usuário', 'Erro');   
        } 
    }

    return (
        <>
        <div className="grid grid-cols-1 h-screen place-items-center font-bold bg-custom flex justify-center items-center min-h-screen">
            <div className="bg-cadastro box-cadastro p-8 rounded-lg shadow-lg">
                <form id="cadastroForm" onSubmit={cadastrarNovoUsuario}>
                <h2 className="text-2xl font-bold text-center text-indigo-700 mb-8">Cadastro</h2>
                <div className="columns-2 gap-10">
                <div className="mb-4">
                    <label htmlFor="userEmail">Email:</label>
                    <input id="userEmail" name="email" autoComplete="email" 
                    required className="w-full ring-2 ring-gray-300 px-3 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={usuario.email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}/>
                </div>
                <div className="mb-4">
                    <label htmlFor="nome" className="block text-gray-700 mb-2">Nome:</label>
                    <input type="text" id="nome" name="nome" autoComplete="nome"
                    required className="w-full px-3 ring-2 ring-gray-300 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={usuario.nome}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}/>
                </div>
                <div className="mb-4">
                    <label htmlFor="cpf" className="block text-gray-700 mb-2">CPF:</label>
                    <input type="text" id="cpf" name="cpf" 
                    required className="w-full px-3 ring-2 ring-gray-300 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={usuario.cpf}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}/>
                </div>
                <div className="mb-4">
                    <label htmlFor="endereco" className="block text-gray-700 mb-2">Endereço:</label>
                    <input type="text" id="endereco" name="endereco" autoComplete="endereco"
                    required className="w-full px-3 ring-2 ring-gray-300 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={usuario.endereco}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}/>
                </div>
                <div className="mb-4">
                    <label htmlFor="dataNascimento" className="block text-gray-700 mb-2">Data Nascimento:</label>
                    <input type="date" id="dataNascimento" name="dataNascimento" 
                    required className="w-full px-3 ring-2 ring-gray-300 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={usuario.dataNascimento}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarData(e)}
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="foto" className="block text-gray-700 mb-2">Link de Foto:</label>
                    <input type="text" id="foto" name="foto" className="w-full px-3 ring-2 ring-gray-300 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                   value={usuario.foto}
                   onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}/>
                </div>
                <div className="mb-4">
                    <label htmlFor="senha" className="block text-gray-700 mb-2">Senha:</label>
                    <input type="password" id="senha" required autoComplete="new-password"
                    className="w-full px-3 ring-2 ring-gray-300 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={senha}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}/>
                </div>
                <div className="mb-6">
                    <label htmlFor="confirmaSenha" className="block text-gray-700 mb-2">Confirmar senha:</label>
                    <input type="password" id="confirmaSenha"  required autoComplete="new-password"
                    className="w-full px-3 ring-2 ring-gray-300 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={confirmaSenha}
                    onChange={(e) => setConfirmaSenha(e.target.value)}/>
                </div>
                </div>
                <div className='grid justify-items-end'>
                <button type="submit" className="w-2/4 bg-azul-padrao text-white py-2 rounded-full hover:bg-amber-600 transition-colors">Enviar</button>
                <Link to="/login" className="block text-center text-indigo-600 mt-4 hover:underline">Já tem login? Entre</Link>
                </div>
                </form>
                </div>
            </div>
            
        </> 
    );
} 

export default Cadastro; 
