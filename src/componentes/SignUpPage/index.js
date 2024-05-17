// SignUpPage/index.js

import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import 'jquery-ui/themes/base/all.css';
import 'jquery-ui/ui/widgets/datepicker.js';
import $ from 'jquery';

const SignUpPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  background-color: #f4f4f4;
`;

const SignUpForm = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  background-color: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 800px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  grid-column: span 2;
`;

const inputStyles = css`
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;

  ${({ hasError }) =>
    hasError &&
    css`
      border-color: red;
    `}
`;

const Input = styled.input`
  ${inputStyles}
`;

const Select = styled.select`
  ${inputStyles}
`;

const Button = styled.button`
  grid-column: span 2;
  background-color: #007bff;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: -20px;
  margin-bottom: 10px;
`;

const Spacer = styled.div`
  grid-column: span 2;
`;

const DateOfBirthInput = styled.input`
  ${inputStyles}
`;

const PasswordContainer = styled.div`
  grid-column: span 2;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SignUpPage = () => {
  const [userData, setUserData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    tipoUsuario: '',
    telefone: '',
    informacoesContato: '',
    cep: '',
    endereco: '',
    cidade: '',
    estado: '',
    cpf: '',
    dataNascimento: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    $('#dataNascimento').datepicker({
      dateFormat: 'dd/mm/yy',
      changeMonth: true,
      changeYear: true,
    });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleCEPChange = async (event) => {
    const cep = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    setUserData({ ...userData, cep }); // Atualiza o CEP em tempo real
  
    if (cep.length === 8) {
      if (!/^[0-9]{8}$/.test(cep)) {
        setErrors({ ...errors, cep: 'Formato de CEP inválido.' });
        return;
      }
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const { data } = response;
        if (data.erro) {
          setErrors({ ...errors, cep: 'CEP não encontrado.' });
          return;
        }
        const { logradouro, localidade, uf } = data;
        if (logradouro && localidade && uf) {
          setUserData({
            ...userData,
            endereco: logradouro,
            cidade: localidade,
            estado: uf
          });
          setErrors({ ...errors, cep: null }); // Clear the error on success
        } else {
          setErrors({ ...errors, cep: 'Dados de endereço incompletos.' });
        }
      } catch (error) {
        setErrors({ ...errors, cep: 'Erro ao consultar o CEP.' });
      }
    } else {
      // Se o CEP ainda não tem 8 dígitos, pode-se limpar possíveis erros anteriores.
      setErrors({ ...errors, cep: null });
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const requestBody = {
        nomeusuario: userData.nome,
        Telefone: userData.telefone,
        Email: userData.email,
        Cpf: userData.cpf,
        Senha: userData.senha,
        TipoUsuario: userData.tipoUsuario,
        InformacoesContato: userData.informacoesContato,
        CEP: userData.cep,
        Endereco: userData.endereco,
        Cidade: userData.cidade,
        Estado: userData.estado,
        DataDeNascimento: formatData(userData.dataNascimento) // Formate conforme necessário
      };
      try {
        const response = await axios.post('http://localhost:8000/usuarios', requestBody);
        console.log('Cadastro realizado com sucesso:', response.data);
        window.location.href = 'http://localhost:3000/';
      } catch (error) {
        // Verifica se a resposta e os dados estão disponíveis
        const errorMessage = error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : 'Erro desconhecido ao enviar dados. Por favor, tente novamente.';
        alert(errorMessage); // Substitua pelo método de exibição de erro que preferir
      }
    }
  };
  
  

  const validateForm = () => {
    const { nome, email, senha, confirmarSenha, tipoUsuario, cpf, dataNascimento } = userData;
    const errors = {};
    let isValid = true;

    if (!nome) {
      errors.nome = 'Por favor, insira o nome.';
      isValid = false;
    }

    if (!email) {
      errors.email = 'Por favor, insira o e-mail.';
      isValid = false;
    }

    if (!senha) {
      errors.senha = 'Por favor, insira a senha.';
      isValid = false;
    }

    if (senha !== confirmarSenha) {
      errors.confirmarSenha = 'As senhas não correspondem.';
      isValid = false;
    }

    if (!tipoUsuario) {
      errors.tipoUsuario = 'Por favor, selecione o tipo de usuário.';
      isValid = false;
    }

    if (!cpf) {
      errors.cpf = 'Por favor, insira o CPF.';
      isValid = false;
    }

    if (!dataNascimento) {
      errors.dataNascimento = 'Por favor, insira a data de nascimento.';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };
  // Função para formatar a data para o formato ISO yyyy-mm-dd
  const formatData = (data) => {
    const parts = data.split('/');
    return `${parts[2]}-${parts[1]}-${parts[0]}`; // Converte dd/mm/yyyy para yyyy-mm-dd
  };
  return (
    <SignUpPageContainer>
      <SignUpForm onSubmit={handleSubmit}>
        <Title>Cadastre-se</Title>
        <Input
          type="text"
          name="nome"
          placeholder="Nome"
          value={userData.nome}
          onChange={handleChange}
          hasError={!!errors.nome}
        />
        {errors.nome && <ErrorMessage>{errors.nome}</ErrorMessage>}
        <Input
          type="email"
          name="email"
          placeholder="E-mail"
          value={userData.email}
          onChange={handleChange}
          hasError={!!errors.email}
        />
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        <Input
          type="tel"
          name="telefone"
          placeholder="Telefone"
          value={userData.telefone}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="cpf"
          placeholder="CPF"
          value={userData.cpf}
          onChange={handleChange}
          hasError={!!errors.cpf}
        />
        {errors.cpf && <ErrorMessage>{errors.cpf}</ErrorMessage>}
        <PasswordContainer>
          <Input
            type="password"
            name="senha"
            placeholder="Senha"
            value={userData.senha}
            onChange={handleChange}
            hasError={!!errors.senha}
          />
          {errors.senha && <ErrorMessage>{errors.senha}</ErrorMessage>}
          <Input
            type="password"
            name="confirmarSenha"
            placeholder="Confirmar Senha"
            value={userData.confirmarSenha}
            onChange={handleChange}
            hasError={!!errors.confirmarSenha}
          />
          {errors.confirmarSenha && <ErrorMessage>{errors.confirmarSenha}</ErrorMessage>}
        </PasswordContainer>
        <Select
          name="tipoUsuario"
          value={userData.tipoUsuario}
          onChange={handleChange}
          hasError={!!errors.tipoUsuario}
        >
          <option value="">Selecione o tipo de usuário</option>
          <option value="cliente">Cliente</option>
          <option value="fornecedor">Fornecedor</option>
        </Select>
        {errors.tipoUsuario && <ErrorMessage>{errors.tipoUsuario}</ErrorMessage>}
        <Input
          type="text"
          name="informacoesContato"
          placeholder="Informações de contato (opcional)"
          value={userData.informacoesContato}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="cep"
          placeholder="CEP"
          value={userData.cep}
          onChange={handleCEPChange}
          hasError={!!errors.cep}
        />
        {errors.cep && <ErrorMessage>{errors.cep}</ErrorMessage>}
        <Input
          type="text"
          name="endereco"
          placeholder="Endereço"
          value={userData.endereco}
          onChange={handleChange}
        />
        <Input type="text" name="cidade" placeholder="Cidade" value={userData.cidade} onChange={handleChange} />
        <Input type="text" name="estado" placeholder="Estado" value={userData.estado} onChange={handleChange} />
        <DateOfBirthInput
          type="text"
          id="dataNascimento"
          name="dataNascimento"
          placeholder="Data de Nascimento"
          value={userData.dataNascimento}
          onChange={handleChange}
          hasError={!!errors.dataNascimento}
        />
        {errors.dataNascimento && <ErrorMessage>{errors.dataNascimento}</ErrorMessage>}
        <Spacer />
        <Button type="submit">Cadastrar</Button>
      </SignUpForm>
    </SignUpPageContainer>
  );
};

export default SignUpPage;
