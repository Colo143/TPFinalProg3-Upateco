import React, { useState, useEffect } from 'react';
import api from '../api';
import Notification from './Notification';

const EditServerModal = ({ isOpen, onClose, server, onServerUpdated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    if (server) {
      setName(server.name);
      setDescription(server.description);
    }
  }, [server]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const serverData = { name, description };

    console.log('Datos del servidor a actualizar:', serverData);

    try {
      const response = await api.put(`/teamhub/servers/${server.id}/`, serverData);
      setNotification({ message: 'Servidor actualizado exitosamente.', type: 'success' });
      onServerUpdated(response.data);
      onClose();
    } catch (error) {
      setNotification({ message: 'Error al actualizar el servidor.', type: 'danger' });
      console.error('Error al actualizar el servidor:', error);
    }
  };

  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">
        <div className="box">
          <h1 className="title">Editar Servidor</h1>
          <Notification 
            message={notification.message} 
            type={notification.type} 
            onClose={() => setNotification({ message: '', type: '' })} 
          />
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Nombre</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Descripción</label>
              <div className="control">
                <textarea
                  className="textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button type="submit" className="button is-primary">Actualizar</button>
                <button type="button" className="button" onClick={onClose}>Cancelar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={onClose}></button>
    </div>
  );
};

export default EditServerModal;