import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';

const AdminPanel = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      // Check if user is authenticated and is admin/staff
      const response = await axios.get('http://127.0.0.1:8000/api/auth/check_admin/', {
        withCredentials: true // Important for session/cookie auth
      });
      
      if (response.data.is_admin) {
        setIsAuthenticated(true);
        fetchEvents();
      } else {
        navigate('/login'); // Redirect to login
      }
    } catch (error) {
      console.error('Authentication error:', error);
      navigate('/login'); // Redirect to login
    } finally {
      setAuthLoading(false);
    }
  };

  // Add authentication headers to all requests
  const authAxios = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    withCredentials: true,
  });

  const fetchEvents = async () => {
    try {
      const response = await authAxios.get('events/');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
      if (error.response?.status === 403) {
        alert('Admin access required');
        navigate('/login');
      }
    }
  };

  const fetchRegistrations = async (eventId) => {
    setLoading(true);
    try {
      const response = await authAxios.get(`registrations/by_event/?event_id=${eventId}`);
      setRegistrations(response.data);
    } catch (error) {
      console.error('Error fetching registrations:', error);
      if (error.response?.status === 403) {
        alert('Admin access required');
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const exportToExcel = async (eventId) => {
    setExportLoading(true);
    try {
      const response = await authAxios.get(`registrations/export_excel/?event_id=${eventId}`, {
        responseType: 'blob'
      });
      // ... rest of export code
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      if (error.response?.status === 403) {
        alert('Admin access required');
        navigate('/login');
      }
    } finally {
      setExportLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/auth/logout/', {}, {
        withCredentials: true
      });
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (authLoading) {
    return <div className="admin-container">Checking authentication...</div>;
  }

  if (!isAuthenticated) {
    return <div className="admin-container">Access denied. Redirecting...</div>;
  }

  return (
    <div className="admin-container">
      <div className='admin-header'>
        <h1>Admin Panel</h1>
        <button onClick={handleLogout} className='logout-btn'>Logout</button>
      </div>
      <div className="event-selector">
        <label htmlFor="event-select">Select Event: </label>
        <select
          id="event-select"
          value={selectedEvent}
          onChange={handleEventChange}
          disabled={loading}
        >
          <option value="">-- Select an event --</option>
          {events.map(event => (
            <option key={event.event_id} value={event.event_id}>
              {event.title}
            </option>
          ))}
        </select>

        {selectedEvent && (
          <button 
            className="export-btn"
            onClick={() => exportToExcel(selectedEvent)}
            disabled={exportLoading || registrations.length === 0}
          >
            {exportLoading ? 'Exporting...' : 'Export to Excel'}
          </button>
        )}
      </div>
      
      <div className="registrations-table">
        <h2>Registrations</h2>
        {loading ? (
          <p>Loading registrations...</p>
        ) : registrations.length > 0 ? (
          <>
            <p>Total registrations: {registrations.length}</p>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>LDAP ID</th>
                  <th>Registration Date</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map(reg => (
                  <tr key={reg.id}>
                    <td>{reg.name}</td>
                    <td>{reg.email}</td>
                    <td>{reg.phone}</td>
                    <td>{reg.ldap_id || 'N/A'}</td>
                    <td>{new Date(reg.registration_date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          selectedEvent && !loading && <p>No registrations found for the selected event.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;