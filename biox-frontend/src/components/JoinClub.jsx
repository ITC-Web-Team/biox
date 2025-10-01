import React from 'react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import './JoinClub.css';

const JoinClub = () => {
  return (
    <section className="join-club-section">
      <div className="join-club-container">
        <h2 className="join-club-title">Join Our Club</h2>
        <p className="join-club-subtitle">
          Connect with us and become part of the BioX community!
        </p>
        
        <div className="join-links">
          <a 
            href="https://www.instagram.com/biox.iitb?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
            target="_blank" 
            rel="noopener noreferrer"
            className="join-link instagram-link"
          >
            <FaInstagram className="join-icon" />
            <span>Follow us on Instagram</span>
          </a>
          
          <a 
            href="https://chat.whatsapp.com/I56uJ92FlWlEBKkEn9rWA2" 
            className="join-link whatsapp-link"
          >
            <FaWhatsapp className="join-icon" />
            <span>Join WhatsApp Groups</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default JoinClub;