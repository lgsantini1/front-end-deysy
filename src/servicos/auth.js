// auth.js

// Função de login que simula a autenticação com um número de telefone e senha
export const login = async (phoneNumber, password) => {
    // Aqui você pode implementar a lógica de autenticação real, como fazer uma chamada para um servidor
    // Por enquanto, estamos apenas simulando um tempo de espera de 1 segundo antes de resolver a promessa
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulando a verificação de credenciais
    if (phoneNumber === '123456789' && password === 'senha123') {
        // Se as credenciais estiverem corretas, retornamos um objeto de usuário
        return {
            id: 1,
            nome: 'Usuário',
            telefone: phoneNumber
            // Você pode adicionar mais informações do usuário aqui, se necessário
        };
    } else {
        // Se as credenciais estiverem incorretas, lançamos um erro
        throw new Error('Credenciais inválidas');
    }
};
