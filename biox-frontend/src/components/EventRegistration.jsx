import React, { useState } from "react";
import axios from 'axios';
import './EventRegistration.css';
import { API_ENDPOINTS } from "../config/api";
import { getCSRFToken } from "../config/csrf";

const EventRegistration = ({ event, onClose, onRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    ldap_id: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const registrationData = {
        ...formData,
        event_id: event.event_id
      };

      console.log('Sending registration data: ', registrationData);

      // Get CSRF token for secure submission
      const csrfToken = await getCSRFToken();
      
      // Configure headers for Django backend
      const config = {
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken && { 'X-CSRFToken': csrfToken })
        }
      };

      // Use proper API endpoint from configuration
      const response = await axios.post(API_ENDPOINTS.eventRegistrations, registrationData, config);
      alert('Registration Successful!');
      onRegister();
      onClose();
    } catch(error) {
      console.error('Registration error:', error);
      if (error.response) {
        console.error('Backend response:', error.response.data);
        alert(`Registration failed: ${error.response.data.message || 'Server error'}`);
      } else {
        alert('Registration failed. Please check your connection and try again.');
      }
    }
  };

  return (
    <div className="model-overlay">
      <div className="registration-model">
        <div className="model-header">
          <h2>Register for {event.title}</h2>
          <button className="close-btn" onClick={onClose}>✖</button>
        </div>
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label className='form-label' htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className='form-label' htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className='form-label' htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className='form-label' htmlFor="ldap_id">LDAP ID</label>
            <input
              type="text"
              id="ldap_id"
              name="ldap_id"
              value={formData.ldap_id}
              onChange={handleChange}
            />
          </div>
          <div className="form-actions">
            <button className="cancel-btn" type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventRegistration;