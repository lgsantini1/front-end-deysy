import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components'; // Certifique-se de importar styled-components desta maneira

import Home from './rotas/Home';
import Favoritos from './rotas/Favoritos';
import SignUpPage from './componentes/SignUpPage';
import Header from './componentes/Header';
import Footer from './componentes/Footer';
import Cliente from './componentes/Cliente';

import FaFacebook from './imagens/facebook.png';
import FaTwitter from './imagens/twitter.png';
import FaInstagram from './imagens/instagram.png';

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
    flex-direction: column;
    min-height: 100vh;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  li {
    list-style: none;
  }
`;

const Content = styled.div`
  flex: 1;
  padding-top: 20px; /* Ajuste o espaçamento superior conforme necessário */
  padding-bottom: 20px; /* Ajuste o espaçamento inferior conforme necessário */
  overflow-y: auto; /* Adiciona uma barra de rolagem vertical se o conteúdo for maior que a altura disponível */
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <BrowserRouter>
      <Header />
      <Content>
        <Routes>
          <Route path='/favoritos' element={<Favoritos />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/' element={<Home />} />
          <Route path='/cliente' element={<Cliente />} />
        </Routes>
      </Content>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
