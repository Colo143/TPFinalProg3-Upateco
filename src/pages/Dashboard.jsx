import React, { useState } from 'react';
import ServerList from './ServerList';
import ChannelList from './ChannelList';
import MessageList from './MessageList';

const Dashboard = () => {
  const [selectedServer, setSelectedServer] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState(null);

  return (
    <div className="columns">
      <div className="column is-one-third">
        <h2 className="title">Servidores</h2>
        <ServerList onSelectServer={setSelectedServer} />
      </div>

      <div className="column is-one-third">
        <h2 className="title">Canales</h2>
        {selectedServer ? (
          <ChannelList serverId={selectedServer} onSelectChannel={setSelectedChannel} />
        ) : (
          <p>Selecciona un servidor para ver los canales.</p>
        )}
      </div>

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