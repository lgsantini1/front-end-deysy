import React, { createContext, useState, useContext } from 'react';

// Cria o contexto de autenticação
const AuthContext = createContext();

// Hook para usar o contexto de autenticação
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Tenta recuperar o usuário do localStorage
    const storedUser = localStorage.getItem('user');
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error('Erro ao analisar JSON do localStorage', error);
      return null;
    }
  });

  const loginContext = (userData) => {
    setUser(userData);
    console.log(JSON.stringify(userData.nome));
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  return (
    <AuthContext.Provider value={{ user, loginContext, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
