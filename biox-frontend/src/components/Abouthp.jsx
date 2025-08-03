import React from 'react'
import { LiaExternalLinkSquareAltSolid } from "react-icons/lia";
import './Abouthp.css'

function Abouthp() {
  return (
    <div className = "abouthp">
        <div className = "block">
            <div className = "about-text">
                <h1 className = "about-heading">who are we</h1>
                <p className = "about-para">Indian Institute of Technology, Bombay is home to some of the brightest and most innovative minds of the country. Their innovations and support will carry the country forward into the next decade and Interdisciplinary Biology is undoubtedly one of the most trending and hot topic in the development of Ultra Fast India. <br/> <br/>

Consequently, there are many students in the Institute who are highly conscious and interested to create a bright future for the country  in the field of Interdisciplinary Biology, by contributing towards the Research and Developments in various related fields of study. However, such students are separated by virtue of belonging to different disciplines and years.​ <br/> <br/>
The realization of this need, gave rise to a common platform for such students to come together, which brought the Biotech Club into existence. A group of Biology-interested students with the backing of the faculty members decided to start a formal Club that would make advancements into Biotechnology and Interdisciplinary Biology, in the year 2015 and became a part of Institute Technical Council.</p>
                <button className = "filled-button">THE TEAM <LiaExternalLinkSquareAltSolid /></button>
            </div>
                      <div className = "about-image"></div>

        </div>

        <div className = "block">
          <div className = "about-image"></div>
            <div className = "about-text">
                <h1 className = "about-heading">our purpose</h1>
                <p className = "about-para">The Biotech club sees itself as a student platform to foster a community of members with shared interests in biotechnology. We envision ourselves to be a community of bio-enthusiasts which strives towards increasing the level of enthusiasm and knowledge for Biotech and Bioengineering establishing a link between biology and engineering so that engineers can contribute towards biology.</p>
                </div>
        </div>

        <div className = "block">
          
            <div className = "about-text">
                <h1 className = "about-heading">the vision.</h1>
                <p className = "about-para">Our goal is to satiate the curiosity of bio-enthusiasts and let other know about the wide and amazing world of biotechnology and bioengineering.</p>
                </div>

                <div className = "about-image"></div>
        </div>
    </div>
  )
}

export default Abouthp