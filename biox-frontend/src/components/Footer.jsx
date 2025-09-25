import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaLinkedin, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo Section */}
        <div className="footer-section footer-logo">
          <h2 className="footer-brand">BioX</h2>
          <p className="footer-tagline">
            Bridging biology and technology at IIT Bombay
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/symposium">Symposium</Link></li>
            <li><Link to="/resources">Resources</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/team">Team</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-section">
          <h3 className="footer-title">Contact</h3>
          <div className="contact-info">
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <span>biox@iitb.ac.in</span>
            </div>
            <div className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              <span>IIT Bombay, Powai<br />Mumbai - 400076</span>
            </div>
          </div>
        </div>

        {/* Connect Section */}
        <div className="footer-section">
          <h3 className="footer-title">Connect</h3>
          <div className="social-links">
            <a 
              href="https://www.instagram.com/biox.iitb?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link instagram"
            >
              <FaInstagram />
            </a>
            <a 
              href="#linkedin" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link linkedin"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-container">
          <div className="footer-bottom-content">
            <p>&copy; 2025 BioX - IIT Bombay. All rights reserved.</p>
            <p>Made with ❤️ by the BioX team</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;