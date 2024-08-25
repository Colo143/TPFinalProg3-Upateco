// src/services/authService.js
import axios from 'axios';

const API_URL = 'https://sandbox.academiadevelopers.com/api-auth/';

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}`, credentials);
  return response.data; 
};

