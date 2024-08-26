import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaSocks, FaHome, FaLock, FaUser } from 'react-icons/fa';

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
      <Link to="/" className="navbar-item">
        <FaSocks size={24} style={{ color: '#fff', marginRight: '8px' }} />
        APP_MENSAJERIA
      </Link>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          <Link to="/dashboard" className="navbar-item">
            <FaHome size={24} style={{ color: '#fff', marginRight: '8px' }} /> Inicio
          </Link>
          {isAuthenticated && <Link to="/profile" className="navbar-item">
            <FaUser size={24} style={{ color: '#fff', marginRight: '8px' }} />Mi Perfil
          </Link>}
        </div>
        <div className="navbar-end">
          {isAuthenticated ? (
            <button onClick={handleLogout} className="navbar-item button is-danger">
              <FaLock size={24} style={{ color: '#fff', marginRight: '8px' }} />
              Cerrar Sesión
            </button>
          ) : (
            <Link to="/login" className="navbar-item">
              <FaUser size={24} style={{ color: '#fff', marginRight: '8px' }} />Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
