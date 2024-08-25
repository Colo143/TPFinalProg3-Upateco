import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = (token, userId) => {
    setToken(token);
    setUserId(userId);
    setIsAuthenticated(true);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  console.log('UserId context:', userId);
  return (
    <AuthContext.Provider value={{ isAuthenticated, token, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};