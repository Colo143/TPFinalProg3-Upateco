import React from 'react';
import '../styles/NotFound.css'

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404 - Página No Encontrada</h1>
      <br></br>
      <img src="https://cdn-icons-png.freepik.com/512/1698/1698558.png" alt="Página no encontrada" className="not-found-image" />
      <br></br>
      <p className="not-found-message">¡Vaya! Has llegado a una página que ni siquiera nosotros conocíamos.</p>
    </div>
  );
};

export default NotFound;
