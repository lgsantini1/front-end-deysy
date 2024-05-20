import React, { useState } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import Input from '../Input/Index.js';
import { useAuth } from '../../contexts/AuthContext';
import loginImage from '../../imagens/login-image.png';
import loginBackground from '../../imagens/fundo-tela-login.jpeg';
import { login } from '../../servicos/auth.js';

// Defina a animação de entrada
const slideIn = keyframes`
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

// Animação de carregamento
const Loader = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid #fff;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// Global styles to ensure no scroll and proper height handling
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow: hidden;
    background-color: #b356a6; /* Cor de fundo da página */
  }
`;

// Estilos para o formulário de login
const LoginContainer = styled.section`
  background-image: url(${loginBackground}); 
  background-size: cover; 
  background-position: center; 
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box; /* Inclui padding e border na largura e altura totais */
`;

const LoginFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
`;

const LoginForm = styled.form`
  background-color: rgba(255, 255, 255, 0.6); 
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${slideIn} 0.5s ease forwards;
  width: 100%;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #b356a6; /* Cor do título */
`;

const Button = styled.button`
  width: 100%;
  background-color: #b356a6; 
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  transition: filter 0.3s ease;

  &:hover {
    filter: brightness(1.2);
  }
`;

const SignUpContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  flex-wrap: wrap;
`;

const SignUpText = styled.span`
  margin-right: 5px;
  color: #fff;
`;

const SignUpLink = styled.a`
  text-decoration: none;
  color: #fff;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

const StyledInput = styled(Input)`
  border: 1px solid #b356a6; /* Cor da borda do input */
  border-radius: 4px;
  padding: 10px;
  width: 100%;
  margin-bottom: 10px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #b356a6; /* Cor da borda do input quando focado */
  }
`;

const LoginImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
`;

const LoginImage = styled.img`
  max-width: 200px;  /* Aumenta o tamanho máximo da imagem */
  max-height: 200px; /* Aumenta o tamanho máximo da imagem */
  opacity: 0.8;      /* Define a transparência da imagem */
  border-radius: 15px;

  @media (max-width: 768px) {
    max-width: 150px;
    max-height: 150px;
  }
`;

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Estado de carregamento
  const { user, loginContext, logout } = useAuth();

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Inicia o carregamento
    try {
      const userData = await login(phoneNumber, password);
      console.log('User Data:', userData); // Adicione um log para verificar os dados do usuário
      loginContext(userData); // Chama a função login do contexto
      if (userData.tipousuario && userData.tipousuario.toLowerCase() === "cliente") {
        window.location.href = '/cliente';
      } else if (userData.tipousuario && userData.tipousuario.toLowerCase() === "fornecedor") {
        window.location.href = '/fornecedor';
      } else {
        throw new Error('Tipo de usuário inválido');
      }
    } catch (error) {
      console.error('Erro no login:', error); // Adicione um log para verificar o erro
      setError('Falha no login. Tente novamente.');
      setLoading(false); // Termina o carregamento em caso de erro
    }
  };

  return (
    <div>
      <GlobalStyle />
      <LoginContainer>
        <LoginFormWrapper>
          <LoginImageContainer>
            <LoginImage src={loginImage} alt="Login Image" />
          </LoginImageContainer>
          <LoginForm onSubmit={handleSubmit}>
            <Title>Qual o seu número de telefone?</Title>
            <label htmlFor="phone">Telefone</label>
            <StyledInput
              id="phone"
              type="tel"
              placeholder="Telefone"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
            <label htmlFor="password">Senha</label>
            <StyledInput
              id="password"
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit">Entrar</Button>
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </LoginForm>
          <SignUpContainer>
            <SignUpText>Você não tem uma conta? Clique em:</SignUpText>
            <SignUpLink href="/signup">Registre-se Grátis</SignUpLink>
          </SignUpContainer>
        </LoginFormWrapper>
        {loading && (
          <LoadingOverlay>
            <Loader />
          </LoadingOverlay>
        )}
      </LoginContainer>
    </div>
  );
};

export default LoginPage;
