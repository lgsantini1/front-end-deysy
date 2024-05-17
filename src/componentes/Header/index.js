import React from 'react';
import OpcoesHeader from '../OpcoesHeader/index.js';
import Logo from '../Logo/index.js';
import IconesHeader from '../IconesHeader/index.js';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { RiLogoutCircleRLine } from 'react-icons/ri'; // Importar o ícone de logout

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

export default function Header() {
    const handleLogout = () => {
        // Implemente a lógica de logout aqui
    }

    return (
        <>
            <HeaderContainer>
                <LogoutIcon onClick={handleLogout}>
                    <RiLogoutCircleRLine size={24} color="#fff" />
                </LogoutIcon>
                <Link to='/'>
                    <Logo />
                </Link>
                <OpcoesHeader />
                <IconesHeader />
            </HeaderContainer>
            <PageContent>
                {/* Conteúdo da página aqui */}
            </PageContent>
        </>
    )
}
