import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserDashboard.css';
import { API_ENDPOINTS } from "../config/api";

const UserDashboard = () => {
  const [registrations, setRegistrations] = useState([]);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Use proper API endpoint to search registrations by email
      const response = await axios.get(`${API_ENDPOINTS.eventRegistrations}?email=${email}`);
      setRegistrations(response.data);
    } catch (error) {
      console.error('Error fetching registrations:', error);
      if (error.response) {
        console.error('Backend response:', error.response.data);
        alert(`Error fetching registrations: ${error.response.data.message || 'Server error'}`);
      } else {
        alert('Error fetching your registrations. Please check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Your Event Registrations</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="email"
          placeholder="Enter your email to view registrations"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>
      
      <div className="registrations-list">
        {registrations.length > 0 ? (
          registrations.map(reg => (
            <div key={reg.id} className="registration-card">
              <h3>{reg.event_title}</h3>
              <p><strong>Registered on:</strong> {new Date(reg.registration_date).toLocaleDateString()}</p>
              <p><strong>Registration ID:</strong> {reg.id}</p>
            </div>
          ))
        ) : (
          <p>No registrations found for this email.</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;