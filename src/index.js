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
import QuemSomos from './componentes/QuemSomos/index.js'; 

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
    background-color: #f8f9fa;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  li {
    list-style: none;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  padding-top: 30px;
  padding-bottom: 0px;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding-top: 15px;
  }
`;

const App = () => (
  <React.StrictMode>
    <AuthProvider>
      <GlobalStyle />
      <BrowserRouter>
        <Container>
          <Header />
          <Content>
            <Routes>
              <Route path='/signup' element={<SignUpPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path="/quem-somos" element={<QuemSomos />} />
              <Route path='/' element={<Home />} />
              <Route element={<ProtectedRoute />}>
                <Route path='/cliente' element={<Cliente />} />
                <Route path='/fornecedor' element={<Fornecedor />} />
                <Route path='/chat' element={<ChatContainer />} />
              </Route>
            </Routes>
          </Content>
        </Container>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

ReactDOM.render(<App />, document.getElementById('root'));
