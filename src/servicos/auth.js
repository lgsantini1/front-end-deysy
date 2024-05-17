import axios from 'axios';

export const login = async (phoneNumber, password) => {
    // Limpa o número de telefone para conter apenas números
    const phoneNumberClean = phoneNumber.replace(/[^0-9]/g, '');

    try {
        // Faz uma solicitação para obter o usuário pelo número de telefone
        const response = await axios.get(`http://localhost:8000/usuarios/telefone/${phoneNumberClean}`);
        
        // Verifica se a resposta contém os dados do usuário e se o telefone coincide
        if (response.data && response.data.telefone === phoneNumberClean) {
            // Verifica se a senha coincide
            if (password === response.data.senha) {
                // Retorna os dados do usuário
                return {
                    idusuario: response.data.idusuario,
                    nome: response.data.nomeusuario, // Ajustado para 'nome' para coincidir com o contexto
                    telefone: response.data.telefone,
                    tipousuario: response.data.tipousuario
                };
            } else {
                throw new Error('Credenciais inválidas');
            }
        } else {
            throw new Error('Credenciais inválidas');
        }
    } catch (err) {
        console.error('Erro ao tentar login:', err);
        throw new Error('Falha ao autenticar usuário');
    }
};
