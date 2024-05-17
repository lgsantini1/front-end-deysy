import React from 'react';
import OpcoesHeader from '../OpcoesHeader/index.js';
import Logo from '../Logo/index.js';
import IconesHeader from '../IconesHeader/index.js';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { RiLogoutCircleRLine } from 'react-icons/ri'; // Importar o ícone de logout
import { useAuth } from '../../contexts/AuthContext';

const HeaderContainer = styled.header`
    background-color: #0E3242;
    display: flex;
    justify-content: flex-start; /* Alinha os elementos à esquerda */
    align-items: center; /* Para alinhar verticalmente */
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999; /* Certifique-se de que o cabeçalho esteja acima de outros elementos */
    padding: 0 20px; /* Adicionando espaço ao redor dos elementos */
`

const LogoutIcon = styled.div`
    cursor: pointer;
    color: white;
    margin-right: 20px; /* Adicionando margem à direita para espaçar o ícone do restante dos elementos */
`

const PageContent = styled.div`
    margin-top: 70px; /* Ajuste conforme a altura do cabeçalho */
    /* Adicione outros estilos de layout conforme necessário */
`
const WelcomeMessage = styled.div`
  font-size: 16px;
  color: white;
  margin-left: auto; /* Empurra a mensagem para o lado direito */
  margin-right: 20px; /* Espaçamento à direita */
`;

export default function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <>
            <HeaderContainer>
                <LogoutIcon onClick={handleLogout}>
                    <RiLogoutCircleRLine size={35} color="#fff" />
                </LogoutIcon>
                <Link to='/'>
                    <Logo />
                </Link>
                <OpcoesHeader />
                <IconesHeader />
                {user && <WelcomeMessage>Olá, {user.nome}. Seja Bem-vindo!</WelcomeMessage>}
            </HeaderContainer>
            <PageContent>
                {/* Conteúdo da página aqui */}
            </PageContent>
        </>
    )
}
