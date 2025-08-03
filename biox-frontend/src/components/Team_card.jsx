import React from 'react'
import { Link } from 'react-router';
import './team_card.css';
// import red from '../static/red.jpeg';
// import InstagramIcon from '@mui/icons-material/Instagram';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
function Team_card() {
  return (
    <div className='team_card'>
      <div className='card_image_cont'>
      <img src=''  className='team_card_image'/>
      </div>
      <div className='team_card_bottom'>
      <h2>member name</h2>
      <h3>designation</h3>
      <h3> department</h3>
      {/* <Link to=''><InstagramIcon style={{ fontSize:'80px'}}/></Link>
      <Link to=''><LinkedInIcon style={{ fontSize:'80px'}}/></Link> */}
      </div>
    </div>
  )
}

export default Team_card 
