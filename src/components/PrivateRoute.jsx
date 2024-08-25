// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Asegúrate de que la ruta sea correcta

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Obtén el estado de autenticación

  return isAuthenticated ? children : <Navigate to="/login" />; // Redirige a /login si no está autenticado
};

export default PrivateRoute;
