import { useState, useEffect } from 'react';
import api from '../api'; 

const useMembers = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const response = await api.get('/teamhub/members/');
      setData(response.data.results);
      setError(null);
    } catch (err) {
      setError('Error al obtener la lista de miembros');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return { data, error, loading, refetch: fetchMembers };
};

export default useMembers;