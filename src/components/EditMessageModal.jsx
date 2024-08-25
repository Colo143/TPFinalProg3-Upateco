// src/components/EditMessageModal.jsx
import React, { useState, useEffect } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const EditMessageModal = ({ isOpen, onClose, message, onMessageEdited }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    if (message) {
      setContent(message.content);
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await api.patch(`/teamhub/messages/${message.id}/`, { content }, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      onMessageEdited();
      onClose(); // Cierra el modal después de editar el mensaje
    } catch (err) {
      setError('Error al editar el mensaje. Inténtalo de nuevo.');
      console.error('Error al editar el mensaje', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">
        <div className="box">
          <h1 className="title">Editar Mensaje</h1>
          {error && <div className="notification is-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Contenido</label>
              <div className="control">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="textarea"
                  placeholder="Escribe el nuevo contenido del mensaje"
                  required
                />
              </div>
            </div>
            <div className="control">
              <button type="submit" className="button is-primary">Guardar Cambios</button>
              <button type="button" className="button" onClick={onClose}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={onClose}></button>
    </div>
  );
};

export default EditMessageModal;
