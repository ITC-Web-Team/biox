import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

const ProtectedRoute = ({ children, requiredRole = 'admin' }) => {
  const [authStatus, setAuthStatus] = useState({
    isAuthenticated: null,
    isAuthorized: null,
    isLoading: true,
    user: null
  });

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.checkAdmin, {
        withCredentials: true
      });
      
      setAuthStatus({
        isAuthenticated: true,
        isAuthorized: response.data.is_admin,
        isLoading: false,
        user: response.data
      });
    } catch (error) {
      console.error('Auth check failed:', error);
      setAuthStatus({
        isAuthenticated: false,
        isAuthorized: false,
        isLoading: false,
        user: null
      });
    }
  };

  if (authStatus.isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Checking authentication...</p>
      </div>
    );
  }

  if (!authStatus.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!authStatus.isAuthorized) {
    return (
      <div className="unauthorized-container">
        <h2>Access Denied</h2>
        <p>You don't have permission to access this page.</p>
        <p>Required: Admin privileges</p>
        <button onClick={() => window.history.back()}>Go Back</button>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;