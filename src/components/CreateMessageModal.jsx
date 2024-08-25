// src/components/CreateMessageModal.jsx
import React, { useState } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const CreateMessageModal = ({ isOpen, onClose, channelId, onMessageCreated }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await api.post('/teamhub/messages/', {
        channel: channelId,
        content,
      }, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      onMessageCreated();
      onClose(); // Cierra el modal después de crear el mensaje
    } catch (err) {
      setError('Error al crear el mensaje. Inténtalo de nuevo.');
      console.error('Error al crear el mensaje', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">
        <div className="box">
          <h1 className="title">Crear Mensaje</h1>
          {error && <div className="notification is-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Contenido</label>
              <div className="control">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="textarea"
                  placeholder="Escribe tu mensaje"
                  required
                />
              </div>
            </div>
            <div className="control">
              <button type="submit" className="button is-primary">Enviar Mensaje</button>
              <button type="button" className="button" onClick={onClose}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={onClose}></button>
    </div>
  );
};

export default CreateMessageModal;
