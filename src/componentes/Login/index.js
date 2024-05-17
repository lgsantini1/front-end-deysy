import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Input from '../Input/Index.js';
import { login } from '../../servicos/auth.js';
import loginImage from '../../imagens/login-image.png';
import loginBackground from '../../imagens/fundo-tela-login.jpeg';

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

// Estilos para o formulário de login
const LoginContainer = styled.section`
  background-image: url(${loginBackground}); 
  background-size: cover; 
  background-position: center; 
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const LoginForm = styled.form`
  background-color: rgba(120, 200, 255, 0.5); 
  padding: 20px;
  border-radius: 70px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${slideIn} 0.5s ease forwards;
  width: 25%; 
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const Button = styled.button`
  width: 50%;
  background-color: purple; 
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
`;

const SignUpText = styled.span`
  margin-right: 5px;
  color: white;
`;

const SignUpLink = styled.a`
  text-decoration: none;
  color: white;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

const StyledInput = styled(Input)`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  width: 50%;
  margin-bottom: 10px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
  }
`;

const LoginImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  img {
    mix-blend-mode: multiply;  
  }
`;

const LoginImage = styled.img`
  max-width: 300;
  max-height: 300;
`;

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const userData = await login(phoneNumber, password);
        alert('Login bem-sucedido! Redirecionando...');
        console.log(userData.tipousuario);
        if (userData.tipousuario.toLowerCase() === "cliente") {
            window.location.href = 'http://localhost:3000/cliente';
        } else if (userData.tipousuario.toLowerCase() === "fornecedor") {
            window.location.href = 'http://localhost:3000/fornecedor';
        }
    } catch (error) {
        setError('Falha no login. Tente novamente.');
    }
  };

  return (
    <LoginContainer>
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
    </LoginContainer>
  );
};

export default LoginPage;