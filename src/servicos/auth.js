import axios from 'axios';

export const login = async (phoneNumber, password) => {

    const phoneNumberClean = phoneNumber.replace(/[^0-9]/g, '');

    try {

        const response = await axios.get(`http://localhost:8000/usuarios/telefone/${phoneNumberClean}`);
        

        if (response.data && response.data.telefone === phoneNumberClean) {
            
            if (password === response.data.senha) {

                return {
                    idusuario: response.data.idusuario,
                    nomeusuario: response.data.nomeusuario,
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
