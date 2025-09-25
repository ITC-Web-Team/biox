import React from 'react'
import './Hero.css'
import { LiaExternalLinkSquareAltSolid } from "react-icons/lia";

function Hero() {
  return (
    <div className='home-section'>
        <div id='left-section'>
            <h1 className='big-text'>BioX</h1>
            <p className='intro-text'>
                At BioX, we encourage biologists in engineers to explore the fascinating world of biotech. 
                From workshops to discussions, we learn, innovate, and grow together. :)
            </p>
            <div className = 'hero-buttons'>
              <button className='filled-button'>EVENTS<LiaExternalLinkSquareAltSolid size={32} /></button>
              <button className='unfilled-button'>JOIN CLUB</button>
            </div>
        </div>

        <div id='right-section'>
            <h1 className = "X">X</h1>
        </div>
    </div>
  )
}

export default Hero