import React, { useState } from "react";
import axios from 'axios';
import './EventRegistration.css';

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

      console.log('Sending data: ', registrationData);

      const response = await axios.post('http://localhost:8000/api/registrations/', registrationData);
      alert('Registration Successful!');
      onRegister();
      onClose();
    } catch(error) {
      console.error('Registration error', error);
      alert('Registration failed. Please try again.');
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