import React from 'react'
import './Hero.css'
import { LiaExternalLinkSquareAltSolid } from "react-icons/lia";

function Hero() {
  return (
    <div className='home-section'>
        <div id='left-section'>
            <h1 className='big-text'>BioX</h1>
            {/* <p className='small-text'>The BioX Club at IIT Bombay was founded in 2015 under the Institute Technical Council to bring together students passionate about Biotechnology and Interdisciplinary Biology. Despite belonging to different disciplines and years, many students share a vision of contributing to India's future through research and innovation in this rapidly evolving field. </p> */}
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