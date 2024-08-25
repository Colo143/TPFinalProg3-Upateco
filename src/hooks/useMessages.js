// src/hooks/useMessages.js
import { useState, useEffect } from 'react';
import api from '../api';

const useMessages = (channelId) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await api.get('/teamhub/messages/', {
        params: channelId ? { channel: channelId } : {}, // Filtrar por ID de canal si se proporciona
      });
      setData(response.data.results); // Asumiendo que la respuesta tiene la lista de mensajes
      setError(null);
    } catch (err) {
      setError('Error al obtener la lista de mensajes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [channelId]); // Dependencia de channelId

  // Exponer la función refetch
  const refetchMessages = () => {
    fetchMessages();
  };

  return { data, error, loading, refetchMessages }; // Devuelve refetchMessages
};

export default useMessages;
