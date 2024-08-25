import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useChannel from '../hooks/useChannel';
import Notification from '../components/Notification';
import CreateChannelModal from '../components/CreateChannelModal';
import EditChannelModal from '../components/EditChannelModal';
import api from '../api';

const ChannelList = ({ serverId, onSelectChannel }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const serverIdFromQuery = queryParams.get('server') || serverId;

  const { channels, error, loading, refetchChannels } = useChannel(serverIdFromQuery);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });

  const handleChannelCreated = (newChannel) => {
    refetchChannels();
    setNotification({ message: 'Canal creado exitosamente', type: 'success' });
  };

  const handleChannelUpdated = (updatedChannel) => {
    refetchChannels();
    setNotification({ message: 'Canal actualizado exitosamente', type: 'success' });
  };

  const handleDeleteChannel = async (channelId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este canal?')) {
      try {
        await api.delete(`/teamhub/channels/${channelId}/`);
        refetchChannels();
        setNotification({ message: 'Canal eliminado exitosamente', type: 'success' });
      } catch (err) {
        console.error(err);
        setNotification({ message: 'Error al eliminar el canal', type: 'danger' });
      }
    }
  };

  return (
    <div>
      {loading && <p>Cargando...</p>}
      {error && <Notification message={error} type="danger" onClose={() => setNotification({ message: '', type: '' })} />}
      <Notification 
        message={notification.message} 
        type={notification.type} 
        onClose={() => setNotification({ message: '', type: '' })}
      />
      <button onClick={() => setIsCreateModalOpen(true)} className="button is-primary">Crear Canal</button>
      <ul>
        {channels && channels.length > 0 ? (
          channels.map((channel) => (
            <li key={channel.id}>
              <h2>{channel.name}</h2>
              <p>{channel.description}</p>
              <p>Creado por: {channel.creator}</p>
              <p>Servidor: {channel.server}</p>
              <button onClick={() => { setSelectedChannel(channel); setIsEditModalOpen(true); }} className="button is-info">Editar Canal</button>
              <button onClick={() => handleDeleteChannel(channel.id)} className="button is-danger">Eliminar Canal</button>
              <button onClick={() => onSelectChannel(channel.id)} className="button is-info">Ver Mensajes</button>
            </li>
          ))
        ) : (
          <li>No hay canales disponibles.</li>
        )}
      </ul>

      <CreateChannelModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onChannelCreated={handleChannelCreated}
        serverId={serverIdFromQuery}
      />
      
      <EditChannelModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        channel={selectedChannel} 
        onChannelUpdated={handleChannelUpdated} 
      />
    </div>
  );
};

export default ChannelList;