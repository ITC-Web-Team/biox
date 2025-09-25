import React, { useState } from "react";
import axios from 'axios';
import './TeamRegistration.css';
import { API_ENDPOINTS } from "../config/api";
import { getCSRFToken } from "../config/csrf";

const TeamRegistration = ({ event, onClose, onRegister }) => {
  const [teamName, setTeamName] = useState("");
  const [teamMembers, setTeamMembers] = useState([
    { name: '', email: '', phone: '', ldap_id: '', is_leader: true }
  ]);
  const [currentStep, setCurrentStep] = useState(1);

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, { name: '', email: '', phone: '', ldap_id: '', is_leader: false }]);
  };

  const removeTeamMember = (index) => {
    if (teamMembers.length > 1) {
      const updated = [...teamMembers];
      updated.splice(index, 1);
      setTeamMembers(updated);
    }
  };

  const updateTeamMember = (index, field, value) => {
    const updated = [...teamMembers];
    updated[index][field] = value;
    
    // If setting as leader, ensure only one leader
    if (field === 'is_leader' && value) {
      updated.forEach((member, i) => {
        if (i !== index) member.is_leader = false;
      });
    }
    
    setTeamMembers(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Get CSRF token for secure submission
      const csrfToken = await getCSRFToken();
      
      // Configure headers for Django backend
      const config = {
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken && { 'X-CSRFToken': csrfToken })
        }
      };

      // Create team first
      const teamResponse = await axios.post(`${API_ENDPOINTS.teams}create_team/`, {
        team_name: teamName,
        event_id: event.event_id
      }, config);

      const teamId = teamResponse.data.team_id;

      // Register all team members
      for (const member of teamMembers) {
        await axios.post(API_ENDPOINTS.eventRegistrations, {
          name: member.name,
          email: member.email,
          phone: member.phone,
          ldap_id: member.ldap_id,
          is_team_leader: member.is_leader,
          event_id: event.event_id,
          team_id: teamId
        }, config);
      }
      
      alert('Team registration successful!');
      onRegister();
      onClose();
    } catch (error) {
      console.error('Team registration error:', error);
      
      if (error.response) {
        console.error('Backend response:', error.response.data);
        alert(`Registration failed: ${error.response.data.error || error.response.data.message || 'Server error'}`);
      } else {
        alert('Registration failed. Please check your connection and try again.');
      }
    }
  };

  if (currentStep === 1) {
    return (
      <div className="modal-overlay">
        <div className="registration-modal">
          <div className="modal-header">
            <h2>Create Team for {event.title}</h2>
            <button className="close-btn" onClick={onClose}>×</button>
          </div>
          
          <form onSubmit={(e) => { e.preventDefault(); setCurrentStep(2); }}>
            <div className="form-group">
              <label htmlFor="teamName">Team Name *</label>
              <input
                type="text"
                id="teamName"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                required
              />
            </div>
            
            <div className="form-actions">
              <button type="button" onClick={onClose}>Cancel</button>
              <button type="submit">Next →</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="registration-modal team-registration">
        <div className="modal-header">
          <h2>Add Team Members for {teamName}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member-form">
              <h4>Team Member {index + 1}</h4>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Name *</label>
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    value={member.email}
                    onChange={(e) => updateTeamMember(index, 'email', e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Phone *</label>
                  <input
                    type="tel"
                    value={member.phone}
                    onChange={(e) => updateTeamMember(index, 'phone', e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>LDAP ID</label>
                  <input
                    type="text"
                    value={member.ldap_id}
                    onChange={(e) => updateTeamMember(index, 'ldap_id', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={member.is_leader}
                    onChange={(e) => updateTeamMember(index, 'is_leader', e.target.checked)}
                  />
                  Team Leader
                </label>
              </div>
              
              {teamMembers.length > 1 && (
                <button
                  type="button"
                  className="remove-member-btn"
                  onClick={() => removeTeamMember(index)}
                >
                  Remove Member
                </button>
              )}
            </div>
          ))}
          
          <button type="button" onClick={addTeamMember} className="add-member-btn">
            + Add Another Member
          </button>
          
          <div className="form-actions">
            <button type="button" onClick={() => setCurrentStep(1)}>← Back</button>
            <button type="submit">Complete Registration</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeamRegistration;