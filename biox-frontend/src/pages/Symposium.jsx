import React from 'react';
import './Symposium.css';

const Symposium = () => {
  const collaboratingClubs = [
    {
      name: "Biotech Club",
      institution: "IIT Madras"
    },
    {
      name: "Science Club", 
      institution: "IISER Pune"
    },
    {
      name: "BioNexus",
      institution: "SRMIST"
    },
    {
      name: "Genesys",
      institution: "NIT Rourkela"
    }
  ];

  return (
    <div className="symposium-page">
      {/* Hero Section */}
      <section className="symposium-hero">
        <div className="hero-background">
          <div className="hero-content">
            <h1 className="symposium-title">New Frontiers of Biotech</h1>
            <p className="symposium-subtitle">An Online Symposium</p>
            <div className="hero-organizer">
              <p>Organized by <span className="highlight">BioX - IIT Bombay</span></p>
            </div>
          </div>
          <div className="hero-decoration">
            <div className="dna-strand"></div>
            <div className="molecule-structure"></div>
          </div>
        </div>
      </section>

      {/* Theme Section */}
      <section className="theme-section">
        <div className="section-container">
          <h2 className="section-title">Symposium Theme</h2>
          <div className="theme-card">
            <h3 className="theme-name">New Frontiers of Biotech</h3>
            <p className="theme-description">
              Exploring the cutting-edge advances in biotechnology that are reshaping 
              healthcare, agriculture, and industry for a sustainable future.
            </p>
          </div>
        </div>
      </section>

      {/* Collaborating Clubs Section */}
      <section className="collaboration-section">
        <div className="section-container">
          <h2 className="section-title">Collaborating Clubs</h2>
          <div className="clubs-grid">
            {collaboratingClubs.map((club, index) => (
              <div key={index} className="club-card">
                <h3 className="club-name">{club.name}</h3>
                <p className="club-institution">{club.institution}</p>
                <div className="club-connector"></div>
              </div>
            ))}
          </div>
          <div className="collaboration-highlight">
            <p>United in advancing biotechnological innovation</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="section-container">
          <h2 className="section-title">About the Symposium</h2>
          <div className="about-content">
            <div className="about-text">
              <p className="about-intro">
                Biotechnology is rapidly reshaping the future of healthcare, agriculture, and industry. 
                To celebrate and explore these groundbreaking advances, <span className="highlight">BioX</span>, 
                the Biotechnology Club of IIT Bombay, in collaboration with leading student communities 
                from IIT Madras, IISER Pune, and SRMIST, proudly presents:
              </p>
              <div className="event-highlight">
                <h3>New Frontiers of Biotech</h3>
                <p>An Online Symposium</p>
              </div>
              <p className="about-description">
                Join us as we delve into revolutionary biotechnological innovations, featuring 
                expert speakers, research presentations, and interactive discussions that will 
                shape the future of biological sciences and technology.
              </p>
            </div>
            <div className="about-features">
              <div className="feature-item">
                <div className="feature-icon">🧬</div>
                <h4>Expert Speakers</h4>
                <p>Leading researchers and industry professionals</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🧬</div>
                <h4>Cutting-edge Research</h4>
                <p>Latest breakthroughs in biotechnology</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🧬</div>
                <h4>Online Platform</h4>
                <p>Accessible from anywhere in the world</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🧬</div>
                <h4>Collaborative Learning</h4>
                <p>Interactive discussions and networking</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration CTA Section */}
      <section className="cta-section">
        <div className="section-container">
          <div className="cta-content">
            <h2>Ready to Explore the Future?</h2>
            <p>Join us in this exciting journey through the new frontiers of biotechnology</p>
            <button className="cta-button">Register Now</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Symposium;