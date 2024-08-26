import React, { useEffect, useState } from 'react';
import api from '../api';
import Notification from '../components/Notification';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await api.get('/users/profiles/profile_data/', {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        });
        setProfileData(response.data);
        setFormData({
          username: response.data.username,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          email: response.data.email,
        });
      } catch (error) {
        setNotification({ message: 'Error al cargar los datos del perfil', type: 'danger' });
        console.error('Error al cargar los datos del perfil', error);
      }
    };

    fetchProfileData();
  }, []);

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ message: '', type: '' });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/users/profiles/${profileData.user__id}/`, formData, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });
      setProfileData(response.data);
      setNotification({ message: 'Perfil actualizado exitosamente', type: 'success' });
      setIsEditing(false);
    } catch (error) {
      setNotification({ message: 'Error al actualizar el perfil', type: 'danger' });
      console.error('Error al actualizar el perfil', error);
    }
  };

  if (!profileData) return <div>Cargando...</div>;

  return (
    <div>
      <h1 className="title">Hola {profileData.first_name}!</h1>
      <Notification message={notification.message} type={notification.type} />
      
      <div>
        <p><strong>ID:</strong> {profileData.user__id}</p>
        <p><strong>Nombre de usuario:</strong> {profileData.username}</p>
        <p><strong>Apellido:</strong> {profileData.last_name}</p>
        <p><strong>Email:</strong> {profileData.email}</p>
      </div>

      <button className="button is-primary" onClick={() => setIsEditing(true)}>
        Editar Perfil
      </button>

      {isEditing && (
        <form onSubmit={handleSubmit} className="box">
          <div className="field">
            <label className="label">Nombre de usuario</label>
            <div className="control">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Nombre</label>
            <div className="control">
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Apellido</label>
            <div className="control">
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </div>
          <div className="control">
            <button type="submit" className="button is-primary">Actualizar Perfil</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;