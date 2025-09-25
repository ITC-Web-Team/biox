// CSRF Token utilities for Django integration
import axios from 'axios';
import { API_BASE_URL } from './api';

// Configure axios defaults for CSRF
axios.defaults.withCredentials = true;

// Function to get CSRF token from Django
export const getCSRFToken = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/csrf/`);
    return response.data.csrfToken;
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    return null;
  }
};

// Function to get CSRF token from cookies (alternative method)
export const getCSRFTokenFromCookie = () => {
  const name = 'csrftoken';
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

// Configure axios to include CSRF token in headers
export const configureCSRF = async () => {
  const csrfToken = getCSRFTokenFromCookie();
  if (csrfToken) {
    axios.defaults.headers.common['X-CSRFToken'] = csrfToken;
  }
  return csrfToken;
};

// Create axios instance with CSRF configuration
export const createCSRFAxios = () => {
  const instance = axios.create({
    baseURL: `${API_BASE_URL}/api/`,
    withCredentials: true,
  });

  // Add CSRF token to requests
  instance.interceptors.request.use(async (config) => {
    const csrfToken = getCSRFTokenFromCookie();
    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
    }
    return config;
  });

  return instance;
};