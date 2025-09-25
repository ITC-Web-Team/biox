import React from 'react';
import { Link } from 'react-router-dom';
import { LiaExternalLinkSquareAltSolid } from "react-icons/lia";
import './DiscoverX.css';

const DiscoverX = () => {
  return (
    <section className="discover-section">
      <div className="discover-container">
        <div className="discover-content">
          <Link to="/discover" className="discover-x-link">
            <h2 className="discover-title">DISCOVER THE X</h2>
            <div className="discover-icon">
              <LiaExternalLinkSquareAltSolid />
            </div>
          </Link>
          
          <Link to="/events" className="events-link">
            <span>Check out our events</span>
            <LiaExternalLinkSquareAltSolid className="events-icon" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DiscoverX;