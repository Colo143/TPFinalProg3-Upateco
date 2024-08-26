import React, { useState } from 'react';
import useMessages from '../hooks/useMessages';
import Notification from '../components/Notification';
import CreateMessageModal from '../components/CreateMessageModal';
import EditMessageModal from '../components/EditMessageModal';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { FaEnvelope,FaPen, FaTimes } from 'react-icons/fa';


const MessageList = ({ channelId }) => {
  const { data: messages, error, loading, refetchMessages } = useMessages(channelId);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const { userId } = useAuth();

  const [isCreateMessageOpen, setCreateMessageOpen] = useState(false);
  const [isEditMessageOpen, setEditMessageOpen] = useState(false);
  const [messageToEdit, setMessageToEdit] = useState(null);

  const openCreateMessageModal = () => setCreateMessageOpen(true);
  const closeCreateMessageModal = () => setCreateMessageOpen(false);

  const openEditMessageModal = (message) => {
    setMessageToEdit(message);
    setEditMessageOpen(true);
  };
  const closeEditMessageModal = () => {
    setMessageToEdit(null);
    setEditMessageOpen(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este mensaje?')) {
      try {
        await api.delete(`/teamhub/messages/${id}/`);
        setNotification({ message: 'Mensaje eliminado con éxito.', type: 'success' });
        refetchMessages();
      } catch (err) {
        setNotification({ message: 'Error al eliminar el mensaje.', type: 'danger' });
        console.error('Error al eliminar el mensaje', err);
      }
    }
  };

  return (
    <div>
      <Notification 
        message={notification.message} 
        type={notification.type} 
        onClose={() => setNotification({ message: '', type: '' })}
      />
      {error && <Notification message={error} type="danger" onClose={() => setNotification({ message: '', type: '' })} />}
      <button onClick={openCreateMessageModal} className="button is-primary">
        <FaEnvelope size={14} style={{ color: '#fff', marginRight: '8px' }} />Crear Mensaje
      </button>
      {loading ? (
        <p>Cargando mensajes...</p>
      ) : (
        <ul>
          {Array.isArray(messages) && messages.length > 0 ? (
            messages.map((message) => (
              <li key={message.id}>
                <p><strong>Contenido:</strong> {message.content}</p>
                <p><strong>Autor ID:</strong> {message.author}</p>
                <button 
                  onClick={() => handleDelete(message.id)} 
                  className="button is-danger" 
                  disabled={message.author !== userId}
                >
                   <FaTimes size={14} style={{ color: '#fff', marginRight: '8px' }} />Eliminar
                </button>
                <button 
                  onClick={() => openEditMessageModal(message)} 
                  className="button is-info" 
                  disabled={message.author !== userId}
                >
                  <FaPen size={14} style={{ color: '#fff', marginRight: '8px' }} />Editar
                </button>
              </li>
            ))
          ) : (
            <li>No hay mensajes disponibles.</li>
          )}
        </ul>
      )}
      <CreateMessageModal 
        isOpen={isCreateMessageOpen} 
        onClose={closeCreateMessageModal} 
        channelId={channelId}
        onMessageCreated={refetchMessages}
      />
      <EditMessageModal 
        isOpen={isEditMessageOpen} 
        onClose={closeEditMessageModal} 
        message={messageToEdit}
        onMessageEdited={refetchMessages}
      />
    </div>
  );
};

export default MessageList;
