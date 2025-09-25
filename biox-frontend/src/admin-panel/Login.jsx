import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_ENDPOINTS.login, formData, {
        withCredentials: true
      });
      
      // Check if user is admin
      const checkResponse = await axios.get(API_ENDPOINTS.checkAdmin, {
        withCredentials: true
      });
      
      if (checkResponse.data.is_admin) {
        navigate('/admin');
      } else {
        setError('Admin access required');
      }
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({...formData, username: e.target.value})}
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />
        <button type="submit" style={ {width:'100px',
          padding: '200px'
        } }>Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;