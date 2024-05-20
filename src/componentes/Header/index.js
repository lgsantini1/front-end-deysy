import React, { useState } from 'react';
import OpcoesHeader from '../OpcoesHeader/index.js';
import Logo from '../Logo/index.js';
import IconesHeader from '../IconesHeader/index.js';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { RiLogoutCircleRLine } from 'react-icons/ri'; // Importar o ícone de logout
import { useAuth } from '../../contexts/AuthContext';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

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
`;

const LogoutIcon = styled.div`
    cursor: pointer;
    color: white;
    margin-right: 20px; /* Adicionando margem à direita para espaçar o ícone do restante dos elementos */
`;

const PageContent = styled.div`
    margin-top: 70px; /* Ajuste conforme a altura do cabeçalho */
    /* Adicione outros estilos de layout conforme necessário */
`;

const WelcomeMessage = styled.div`
    font-size: 20px;
    color: white;
    margin-left: auto; /* Empurra a mensagem para o lado direito */
    margin-right: 50px; /* Espaçamento à direita */
`;

const MenuLink = styled(Link)`
    color: white;
    text-decoration: none;
    &:hover {
        color: #f5f5f5;
    }
`;

const StyledIconButton = styled(IconButton)`
    color: #f5f5f5 !important; /* Define a cor para o ícone do menu */
`;

export default function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <HeaderContainer>
                <LogoutIcon onClick={handleLogout}>
                    <RiLogoutCircleRLine size={35} color="#fff" />
                </LogoutIcon>
                <Link to='/'>
                    <Logo />
                </Link>
                <StyledIconButton edge="end" aria-label="menu" onClick={handleMenuClick}>
                    <MenuIcon />
                </StyledIconButton>
                {user && <WelcomeMessage>Olá, {user.nome}. Seja Bem-vindo!</WelcomeMessage>}
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    PaperProps={{
                        style: {
                            backgroundColor: '#b356a6',
                            color: 'white',
                            boxShadow: '0px 3px 5px rgba(0,0,0,0.2)',
                            borderRadius: '8px',
                        },
                    }}
                >   <MenuItem onClick={handleMenuClose}>
                    <MenuLink to="/quem-somos">Quem Somos</MenuLink>
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                        <MenuLink to="/mapa-do-site">Mapa do Site</MenuLink>
                    </MenuItem>
                </Menu>
            </HeaderContainer>
            <PageContent>
                {/* Conteúdo da página aqui */}
            </PageContent>
        </>
    );
}
