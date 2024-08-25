// src/hooks/useApi.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import api from '../api';

const useApi = (endpoint) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Inicializa useNavigate

  const fetchData = async () => {
    try {
      const response = await api.get(endpoint);
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err.response ? err.response.data : 'Error de red');
      if (err.response && err.response.status === 401) {
        navigate('/login'); // Redirige a la página de inicio de sesión
      }
    }
  };

  const createData = async (newData) => {
    try {
      const response = await api.post(endpoint, newData);
      setData((prevData) => [...prevData, response.data]);
      setError(null);
    } catch (err) {
      setError(err.response ? err.response.data : 'Error de red');
      if (err.response && err.response.status === 401) {
        navigate('/login'); // Redirige a la página de inicio de sesión
      }
    }
  };

  const updateData = async (id, updatedData) => {
    try {
      const response = await api.put(`${endpoint}/${id}`, updatedData);
      setData((prevData) =>
        prevData.map((item) => (item.id === id ? response.data : item))
      );
      setError(null);
    } catch (err) {
      setError(err.response ? err.response.data : 'Error de red');
      if (err.response && err.response.status === 401) {
        navigate('/login'); // Redirige a la página de inicio de sesión
      }
    }
  };

  const deleteData = async (id) => {
    try {
      await api.delete(`${endpoint}/${id}`);
      setData((prevData) => prevData.filter((item) => item.id !== id));
      setError(null);
    } catch (err) {
      setError(err.response ? err.response.data : 'Error de red');
      if (err.response && err.response.status === 401) {
        navigate('/login'); // Redirige a la página de inicio de sesión
      }
    }
  };

  return { data, error, fetchData, createData, updateData, deleteData };
};

export default useApi;
