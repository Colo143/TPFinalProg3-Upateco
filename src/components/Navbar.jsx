// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, UserId } = useAuth();
 console.log('isAuthenticated:', isAuthenticated);
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">Mi Aplicación de Mensajería</Link>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          <Link to="/dashboard" className="navbar-item">Inicio</Link>
          {isAuthenticated && <Link to="/profile" className="navbar-item">Perfil</Link>}
          {/*{isAuthenticated && <Link to="/channels" className="navbar-item">Canales</Link>}
          {isAuthenticated && <Link to="/servers" className="navbar-item">Servidores</Link>}
          {isAuthenticated && <Link to="/messages" className="navbar-item">Mensajes</Link>} 
          {isAuthenticated && <Link to="/members" className="navbar-item">Miembros</Link>} */}
        </div>
        <div className="navbar-end">
          {isAuthenticated ? (
            <button onClick={handleLogout} className="navbar-item button is-danger">Cerrar Sesión</button>
          ) : (
            <Link to="/login" className="navbar-item">Iniciar Sesión</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
