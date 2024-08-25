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
        params: channelId ? { channel: channelId } : {},
      });
      setData(response.data.results);
      setError(null);
    } catch (err) {
      setError('Error al obtener la lista de mensajes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [channelId]);

  const refetchMessages = () => {
    fetchMessages();
  };

  return { data, error, loading, refetchMessages };
};

export default useMessages;