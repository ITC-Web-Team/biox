// API Configuration for different environments
const getApiBaseUrl = () => {
  // Check if we're in production (deployed frontend)
  if (window.location.hostname === 'biox.tech-iitb.org' || window.location.hostname === 'www.biox.tech-iitb.org') {
    return 'https://bioxb.tech-iitb.org';
  }
  // Local development
  return 'http://127.0.0.1:8000';
};

export const API_BASE_URL = getApiBaseUrl();
export const API_ENDPOINTS = {
  // Event System (Admin Required)
  events: `${API_BASE_URL}/api/events/`,
  eventRegistrations: `${API_BASE_URL}/api/event-registrations/`,
  teams: `${API_BASE_URL}/api/teams/`,
  
  // Project System (Public)
  projects: `${API_BASE_URL}/api/projects/`,
  projectRegistrations: `${API_BASE_URL}/api/project-registrations/`,
  
  // Authentication
  checkAdmin: `${API_BASE_URL}/api/auth/check_admin/`,
  login: `${API_BASE_URL}/api/auth/login/`,
  logout: `${API_BASE_URL}/api/auth/logout/`,
};