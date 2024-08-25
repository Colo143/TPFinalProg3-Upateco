import React, { useState } from 'react';
import api from '../api';
import Notification from './Notification';
import { useAuth } from '../context/AuthContext';

const CreateChannelModal = ({ isOpen, onClose, onChannelCreated, serverId }) => {
  const { userId } = useAuth();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const channelData = { 
      name, 
      description,
      server: serverId,
      creator: userId
    };

    console.log('Datos del canal a enviar:', channelData);

    try {
      const response = await api.post('/teamhub/channels/', channelData);
      setNotification({ message: 'Canal creado exitosamente.', type: 'success' });
      onChannelCreated(response.data);
      onClose();
    } catch (error) {
      setNotification({ message: 'Error al crear el canal.', type: 'danger' });
      console.error('Error al crear el canal:', error);
    }
  };

  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">
        <div className="box">
          <h1 className="title">Crear Canal</h1>
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
                <button type="submit" className="button is-primary">Crear</button>
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

export default CreateChannelModal;