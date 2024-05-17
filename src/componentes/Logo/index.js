import React from 'react';
import styled from 'styled-components';
import logo from '../../imagens/icone_header.png';

const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    font-size: 30px;
`;

const LogoImage = styled.img`
    max-width: 100px;
    max-height: 100px;
    margin-right: 10px;
`;

const LogoText = styled.p`
    color: #ffffff; /* Defina a cor do texto como branco */
    font-size: 24px; /* Reduza ligeiramente o tamanho da fonte para um visual mais equilibrado */
    font-weight: bold; /* Use negrito para enfatizar o texto */
    font-family: 'Arial', sans-serif; /* Escolha uma fonte moderna e digital, como Arial */
    letter-spacing: 2px; /* Adicione um espaçamento entre as letras para um visual mais arejado */
`;

export default function Logo() {
    return (
        <LogoContainer>
            <LogoImage src={logo} alt='logo' />
        </LogoContainer>
    );
}
