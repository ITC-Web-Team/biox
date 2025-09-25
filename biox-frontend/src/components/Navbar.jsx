import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <nav id="navbar">
        {/* <img alt="biox logo" src=""></img> */}
        <h1 className="logo">BIOX</h1>
        <ul id="navitems">
            <li><NavLink to="/">HOME</NavLink></li>
            <li><NavLink to="/events">EVENTS</NavLink></li>
            <li><NavLink to="/blog">BLOG</NavLink></li>
            <li><NavLink to="/resources">RESOURCES</NavLink></li>
            <li><NavLink to="/team">TEAM</NavLink></li>
            <li><NavLink to="/contact">CONATCT</NavLink></li>
            <li><NavLink to="/BSP">BSP</NavLink></li>
            <button className = "symposium-button">SYMPOSIUM</button>
        </ul>
    </nav>
  )
}

export default Navbar