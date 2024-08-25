// src/components/Notification.jsx
import React, {useEffect} from 'react';
import '../styles/Notification.css'; // Importa los estilos

const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose(); // Llama a la función para cerrar la notificación después de 3 segundos
      }, 5000); // 5000 milisegundos = 5 segundos

      return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta o si se actualiza la notificación
    }
  }, [message, onClose]);
  
  if (!message) return null;

  return (
    <div className={`notification is-${type}`}>
      {message}
    </div>
  );
};

export default Notification;
