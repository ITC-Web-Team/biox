import React from 'react'
import { Link } from 'react-router-dom';
import './team_card.css';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

function Team_card({ member }) {
  return (
    <div className='team_card'>
      <div className='card_image_cont'>
        <img src={member.image} alt={member.name} className='team_card_image'/>
      </div>
      <div className='team_card_bottom'>
        <h2 className='member_name'>{member.name}</h2>
        <h3 className='member_position'>{member.position}</h3>
        <h3 className='member_department'>{member.department}</h3>
        <div className='social_links'>
          {member.instagram && (
            <Link to={member.instagram} target="_blank" rel="noopener noreferrer" className='social_link'>
              <InstagramIcon style={{ fontSize:'30px'}}/>
            </Link>
          )}
          {member.linkedin && (
            <Link to={member.linkedin} target="_blank" rel="noopener noreferrer" className='social_link'>
              <LinkedInIcon style={{ fontSize:'30px'}}/>
            </Link>
          )}
          {member.email && (
            <a href={`mailto:${member.email}`} className='social_link'>
              <EmailIcon style={{ fontSize:'30px'}}/>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default Team_card
