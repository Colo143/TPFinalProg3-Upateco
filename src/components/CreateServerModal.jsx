import React, { useState } from 'react';
import api from '../api';
import Notification from './Notification';

const CreateServerModal = ({ isOpen, onClose, onServerCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const serverData = { name, description };

    // Imprimir los datos en la consola
    console.log('Datos del servidor a enviar:', serverData);

    try {
      const response = await api.post('/teamhub/servers/', serverData);
      setNotification({ message: 'Servidor creado exitosamente.', type: 'success' });
      onServerCreated(response.data); // Llama a la función para actualizar la lista de servidores
      onClose(); // Cierra el modal
    } catch (error) {
      setNotification({ message: 'Error al crear el servidor.', type: 'danger' });
      console.error('Error al crear el servidor:', error);
    }
  };

  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">
        <div className="box">
          <h1 className="title">Crear Servidor</h1>
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

export default CreateServerModal;