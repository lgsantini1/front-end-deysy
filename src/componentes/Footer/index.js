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
  align-items: center;
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
      <Column>
        <div>
          <p>Quem Somos</p>
          <p>Relação com Investidores</p>
          <p>Trabalhe Conosco</p>
          <p>Profissionais Verificados</p>
          <p>Mapa do Site</p>
        </div>
      </Column>
      <Column>
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
