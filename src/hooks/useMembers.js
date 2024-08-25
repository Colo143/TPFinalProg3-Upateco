// src/hooks/useMembers.js
import { useState, useEffect } from 'react';
import api from '../api'; 

const useMembers = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga

  const fetchMembers = async () => {
    setLoading(true); // Inicia la carga
    try {
      const response = await api.get('/teamhub/members/');
      setData(response.data.results); // Asumiendo que la respuesta tiene la lista de miembros
      setError(null); // Limpia el error si la llamada es exitosa
    } catch (err) {
      setError('Error al obtener la lista de miembros');
    } finally {
      setLoading(false); // Finaliza la carga
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return { data, error, loading, refetch: fetchMembers }; // Devuelve refetch
};

export default useMembers;
