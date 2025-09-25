import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav id="navbar">
        {/* <img alt="biox logo" src=""></img> */}
        <h1 className="logo">BIOX</h1>
        
        {/* Hamburger Menu Button */}
        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        <ul id="navitems" className={isMenuOpen ? 'active' : ''}>
            <li><NavLink to="/" onClick={closeMenu}>HOME</NavLink></li>
            <li><NavLink to="/events" onClick={closeMenu}>EVENTS</NavLink></li>
            <li><NavLink to="/blog" onClick={closeMenu}>BLOG</NavLink></li>
            <li><NavLink to="/resources" onClick={closeMenu}>RESOURCES</NavLink></li>
            <li><NavLink to="/team" onClick={closeMenu}>TEAM</NavLink></li>
            <li><NavLink to="/contact" onClick={closeMenu}>CONTACT</NavLink></li>
            <li><NavLink to="/BSP" onClick={closeMenu}>BSP</NavLink></li>
            <button className="symposium-button" onClick={closeMenu}>SYMPOSIUM</button>
        </ul>

        {/* Overlay to close menu when clicking outside */}
        {isMenuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
    </nav>
  )
}

export default Navbar