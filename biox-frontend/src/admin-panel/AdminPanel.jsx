import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css';

const AdminPanel = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);

  useEffect(() => {
    console.log('Component mounted, fetching events...');
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      console.log('Fetching events from API...');
      const response = await axios.get('http://127.0.0.1:8000/api/events/');
      console.log('Events API response:', response.data);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
      alert('Error fetching events. Please try again.');
    }
  };

  const fetchRegistrations = async (eventId) => {
    setLoading(true);
    console.log('Fetching registrations for event_id:', eventId);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/registrations/by_event/?event_id=${eventId}`);
      console.log('Registrations API response:', response.data);
      setRegistrations(response.data);
    } catch (error) {
      console.error('Error fetching registrations:', error);
      alert('Error fetching registrations. Please try again.');
      setRegistrations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEventChange = (e) => {
    console.log('Dropdown changed, selected value:', e.target.value);
    const eventId = e.target.value;
    setSelectedEvent(eventId);
    if (eventId) {
      fetchRegistrations(eventId);
    } else {
      setRegistrations([]);
    }
  };

  const exportToExcel = async (eventId) => {
    setExportLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/registrations/export_excel/?event_id=${eventId}`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `registrations_${eventId}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
      alert('Excel file downloaded successfully!');
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      alert('Error exporting data. Please try again.');
    } finally {
      setExportLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin Panel</h1>
      
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