import React, { useState } from 'react'
import axios from 'axios';
import './contact.css'
import { API_ENDPOINTS } from "../config/api";
import { getCSRFToken } from "../config/csrf";
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage("");

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

            // Submit form to backend
            const response = await axios.post(API_ENDPOINTS.contact, formData, config);
            setSubmitMessage("Message sent successfully! We'll get back to you soon.");
            setFormData({ name: "", email: "", subject: "", message: "" });
        } catch (error) {
            console.error("Error sending message:", error);
            if (error.response) {
                console.error("Backend response:", error.response.data);
                setSubmitMessage(`Failed to send message: ${error.response.data.message || 'Server error'}`);
            } else {
                setSubmitMessage("Failed to send message. Please check your connection and try again.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='contact-container'>
            <div className='contact-hero'>
                <h1 className='contact-title'>Get In Touch</h1>
                <p className='contact-subtitle'>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
            </div>

            <div className='contact-content'>
                <div className='contact-left'>
                    <div className='contact-info'>
                        <h2>Contact Information</h2>
                        
                        <div className='info-item'>
                            <LocationOnIcon className='info-icon' />
                            <div>
                                <h3>Location</h3>
                                <p>Indian Institute of Technology Bombay<br />Powai, Mumbai - 400076</p>
                            </div>
                        </div>

                        <div className='map-container'>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.6257074450726!2d72.86629411485311!3d19.133430687027956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c92e62f1f7d1%3A0x6a92c9b108fa2b24!2sIIT%20Bombay!5e0!3m2!1sen!2sin!4v1691825419216!5m2!1sen!2sin"
                                width="100%"
                                height="250"
                                style={{ border: 0, borderRadius: '12px' }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="IIT Bombay Location"
                            />
                        </div>

                        <div className='social-section'>
                            <h3>Connect With Us</h3>
                            <div className='social-icons'>
                                <a
                                    href="https://www.instagram.com/biox.iitb?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className='social-link'
                                >
                                    <InstagramIcon />
                                </a>
                                <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className='social-link'
                                >
                                    <LinkedInIcon />
                                </a>
                                <a
                                    href="mailto:biox@iitb.ac.in"
                                    className='social-link'
                                >
                                    <EmailIcon />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="contact-right">
                    <div className="contact-form">
                        <h2>Send Us a Message</h2>
                        
                        {submitMessage && (
                            <div className={`message ${submitMessage.includes('successfully') ? 'success' : 'error'}`}>
                                {submitMessage}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="form-input"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="form-input"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="text"
                                    name="subject"
                                    placeholder="Subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <textarea
                                    name="message"
                                    placeholder="Your Message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="form-textarea"
                                    rows="6"
                                    required
                                />
                            </div>

                            <div className="form-submit">
                                <button 
                                    type="submit" 
                                    className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact;