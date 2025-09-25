import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';
import { configureCSRF, createCSRFAxios } from '../config/csrf';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Configure CSRF when component mounts
    configureCSRF();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Create axios instance with CSRF
      const csrfAxios = createCSRFAxios();
      
      // First get CSRF token
      await axios.get(API_ENDPOINTS.checkAdmin, { withCredentials: true });
      
      // Then attempt login
      await csrfAxios.post('/auth/login/', formData, {
        withCredentials: true
      });
      
      // Check if user is admin
      const checkResponse = await csrfAxios.get('/auth/check_admin/', {
        withCredentials: true
      });
      
      if (checkResponse.data.is_admin) {
        navigate('/admin');
      } else {
        setError('Admin access required');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid credentials or server error');
    } finally {
      setLoading(false);
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
        <button type="submit" disabled={loading} style={ {width:'100px',
          padding: '200px'
        } }>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;