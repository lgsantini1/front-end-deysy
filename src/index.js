import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';

import Home from './rotas/Home.js';
import SignUpPage from './componentes/SignUpPage/index.js';
import Header from './componentes/Header/index.js';
import Footer from './componentes/Footer/index.js';
import Cliente from './componentes/Cliente/index.js';
import Fornecedor from './componentes/Fornecedor/index.js';
import ChatContainer from './componentes/ChatContainer/index.js'; 
import LoginPage from './componentes/Login/index.js'; 

import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './componentes/ProtectedRoute';

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
  padding-top: 60px; /* Ajuste o espaçamento superior para acomodar o header fixo */
  padding-bottom: 20px; /* Ajuste o espaçamento inferior conforme necessário */
  overflow-y: auto; /* Adiciona uma barra de rolagem vertical se o conteúdo for maior que a altura disponível */
`;

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <Content>
          <Routes>
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/' element={<Home />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/cliente' element={<Cliente />} />
              <Route path='/fornecedor' element={<Fornecedor />} />
              <Route path='/chat' element={<ChatContainer />} />
            </Route>
          </Routes>
        </Content>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
