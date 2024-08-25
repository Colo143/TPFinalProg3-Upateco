import React from 'react';
import useMembers from '../hooks/useMembers';
import Notification from '../components/Notification';

const MemberList = () => {
  const { data: members, error } = useMembers();
  const [notification, setNotification] = React.useState({ message: '', type: '' });

  console.log('MemberList renderizado');

  return (
    <div>
      <h1 className="title">Lista de Miembros</h1>
      <Notification 
        message={notification.message} 
        type={notification.type} 
        onClose={() => setNotification({ message: '', type: '' })} 
      />
      {error && <Notification message={error} type="danger" onClose={() => setNotification({ message: '', type: '' })} />}
      <ul>
        {Array.isArray(members) && members.length > 0 ? (
          members.map((member) => (
            <li key={member.id}>
              <p><strong>ID del Usuario:</strong> {member.user}</p>
              <p><strong>ID del Servidor:</strong> {member.server}</p>
              <p><strong>Onboarded:</strong> {member.is_onboarded ? 'Sí' : 'No'}</p>
              <p><strong>Fecha de creación:</strong> {new Date(member.created_at).toLocaleString()}</p>
              <p><strong>Fecha de actualización:</strong> {new Date(member.updated_at).toLocaleString()}</p>
            </li>
          ))
        ) : (
          <li>No hay miembros disponibles.</li>
        )}
      </ul>
    </div>
  );
};

export default MemberList;