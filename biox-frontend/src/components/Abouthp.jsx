import React from 'react'
import { LiaExternalLinkSquareAltSolid } from "react-icons/lia";
import './Abouthp.css'

function Abouthp() {
  return (
    <div className = "abouthp">
        <div className = "block">
            <div className = "about-text">
                <h1 className = "about-heading">who are we?</h1>
                <p className = "about-para">We are BioX, a student club at IIT Bombay that unites the fields of engineering and biology. We are a community who enjoy investigating the fascinating connection between biology, tech, and innovation—all while maintaining an engaging and enjoyable environment.</p>
                <button className = "filled-button">THE TEAM <LiaExternalLinkSquareAltSolid /></button>
            </div>
            <div className = "about-image">
                <img src='./home-images/brain.JPG' alt='brain'>
                </img>
            </div>
        </div>

        <div className = "block">
          <div className = "about-image">
                <img src='./home-images/dna.JPG' alt='dna'>
                </img>
          </div>
            <div className = "about-text">
                <h1 className = "about-heading">our purpose?</h1>
                <p className = "about-para">Our purpose is to make biotechnology accessible, engaging, and collaborative. Through talks, workshops, projects, and events, we create a platform where students from every background can dive into the life sciences and discover how it connects with engineering and technology.</p>
            </div>
            {/* <div className = "about-image">
                <img src='./home-images/dna.JPG' alt='dna'>
                </img>
            </div> */}
        </div>

        <div className = "block">
            <div className = "about-text">
                <h1 className = "about-heading">our vision?</h1>
                <p className = "about-para">Our vision is a community of bio-enthusiast engineers. By fostering curiosity and collaboration, we aim to nurture the next generation of innovators who will push the boundaries of biotechnology.</p>
            </div>
            <div className = "about-image">
                <img src='./home-images/microscope.JPG' alt='microscope'></img>
            </div>
        </div>
    </div>
  )
}

export default Abouthp