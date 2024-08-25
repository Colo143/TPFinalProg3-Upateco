// src/hooks/useServers.js
import { useState, useEffect } from 'react';
import api from '../api';

const useServers = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [nextPage, setNextPage] = useState(null); 
  const [prevPage, setPrevPage] = useState(null); 
  const [currentPage, setCurrentPage] = useState(1); 

  const fetchServers = async (page = 1) => {
    setLoading(true); // Inicia la carga
    try {
      const response = await api.get(`/teamhub/servers/?page=${page}`);
      setData(response.data.results);
      setNextPage(response.data.next); // Guarda el enlace a la siguiente página
      setPrevPage(response.data.previous); // Guarda el enlace a la página anterior
      setCurrentPage(page); // Guarda la página actual
      setError(null); 
    } catch (err) {
      setError('Error al obtener la lista de servidores');
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchServers();
  }, []);

  const refetch = () => {
    fetchServers(currentPage); 
  };

  return { data, error, loading, nextPage, prevPage, currentPage, fetchServers, refetch }; 
};

export default useServers;

