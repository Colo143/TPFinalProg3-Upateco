// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import ServerList from './ServerList'; // Asegúrate de que este componente esté implementado
import ChannelList from './ChannelList'; // Asegúrate de que este componente esté implementado
import MessageList from './MessageList'; // Asegúrate de que este componente esté implementado

const Dashboard = () => {
  const [selectedServer, setSelectedServer] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState(null);

  return (
    <div className="columns">
      {/* Columna de la izquierda: Lista de Servidores */}
      <div className="column is-one-third">
        <h2 className="title">Servidores</h2>
        <ServerList onSelectServer={setSelectedServer} />
      </div>

      {/* Columna del medio: Lista de Canales */}
      <div className="column is-one-third">
        <h2 className="title">Canales</h2>
        {selectedServer ? (
          <ChannelList serverId={selectedServer} onSelectChannel={setSelectedChannel} />
        ) : (
          <p>Selecciona un servidor para ver los canales.</p>
        )}
      </div>

      {/* Columna de la derecha: Mensajes del Canal */}
      <div className="column is-one-third">
        <h2 className="title">Mensajes</h2>
        {selectedChannel ? (
          <MessageList channelId={selectedChannel} />
        ) : (
          <p>Selecciona un canal para ver los mensajes.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
