import React from 'react';
import styled from 'styled-components';

import facebookIcon from '../../imagens/facebook.png';
import twitterIcon from '../../imagens/twitter.png';
import instagramIcon from '../../imagens/instagram.png';
import googlePlayIcon from '../../imagens/google-play.png';
import appStoreIcon from '../../imagens/app-store.png';

const FooterContainer = styled.footer`
background-color: #0E3242;
  color: #fff;
  padding: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* Default alignment */
`;

const TextColumn = styled(Column)`
  align-items: flex-start; /* Override for text links column */
`;

const ColumnTitle = styled.h3`
  color: #fff;
  font-size: 16px;
  margin-bottom: 15px;
  text-align: center; /* Default for titles */
`;

const TextColumnTitle = styled(ColumnTitle)`
  text-align: left; /* Override for text links column title */
`;

const TextLink = styled.p`
  color: #fff;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 8px;
  cursor: pointer;
  transition: text-decoration 0.2s ease-in-out;

  &:hover {
    text-decoration: underline;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const SocialIconsContainer = styled.div`
  margin-bottom: 10px;
`;

const SocialIconLink = styled.a`
  display: inline-block;
  margin-right: 10px;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const StoreLink = styled.a`
  display: inline-block;
  margin-bottom: 10px;
`;

const StoreIcon = styled.img`
  width: 120px; /* Tamanho dos ícones de download */
  height: auto;
  margin-right: 10px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <TextColumn>
        <TextColumnTitle>Informações</TextColumnTitle>
        <div>
          <TextLink>Quem Somos</TextLink>
          <TextLink>Relação com Investidores</TextLink>
          <TextLink>Trabalhe Conosco</TextLink>
          <TextLink>Profissionais Verificados</TextLink>
          <TextLink>Mapa do Site</TextLink>
        </div>
      </TextColumn>
      <Column>
        <ColumnTitle>Siga-nos</ColumnTitle>
        <SocialIconsContainer>
          <SocialIconLink href="https://www.facebook.com">
            <Icon src={facebookIcon} alt="Facebook" />
          </SocialIconLink>
          <SocialIconLink href="https://twitter.com">
            <Icon src={twitterIcon} alt="Twitter" />
          </SocialIconLink>
          <SocialIconLink href="https://www.instagram.com">
            <Icon src={instagramIcon} alt="Instagram" />
          </SocialIconLink>
        </SocialIconsContainer>
      </Column>
      <Column>
        <ColumnTitle>Baixe o App</ColumnTitle>
        <StoreLink href="#">
          <StoreIcon src={googlePlayIcon} alt="Google Play" />
        </StoreLink>
        <StoreLink href="#">
          <StoreIcon src={appStoreIcon} alt="App Store" />
        </StoreLink>
      </Column>
    </FooterContainer>
  );
};

export default Footer;
