import React from 'react';
import styled from 'styled-components';
import quemSomosBackground from '../../imagens/fundo_quem_somos.jpeg';
import loginImage from '../../imagens/login-image.png'; // Atualize com o caminho correto da imagem

const roxoRosado = '#b356a6';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-image: url(${quemSomosBackground});
    background-size: cover;
    background-position: center;
    color: #fff;
    height: 100vh;
    position: relative;
    text-align: center;
`;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
`;

const ContentWrapper = styled.div`
    position: relative;
    z-index: 2;
    max-width: 800px;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
`;

const Title = styled.h1`
    font-size: 2.5rem;
    color: ${roxoRosado};
    margin-bottom: 20px;
`;

const Content = styled.p`
    font-size: 1.2rem;
    line-height: 1.6;
    color: #333;
`;

const LoginImage = styled.img`
    width: 100px; /* Ajuste o tamanho conforme necessário */
    height: 100px;
    border-radius: 10px;
    margin-bottom: 20px;
`;

export default function QuemSomos() {
    return (
        <Container>
            <Overlay />
            <ContentWrapper>
                <LoginImage src={loginImage} alt="Login" />
                <Title>Quem Somos</Title>
                <Content>
                    Somos uma empresa de serviços de limpeza dedicada à excelência, confiança e qualidade.
                    Nossa equipe altamente treinada oferece soluções personalizadas para espaços comerciais,
                    comprometendo-se com a sustentabilidade e proporcionando ambientes impecáveis que inspiram
                    produtividade e bem-estar.
                </Content>
            </ContentWrapper>
        </Container>
    );
}
