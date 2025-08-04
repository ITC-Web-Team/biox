import React from 'react'
import red from '../static/red.jpeg';
import logo from '../static/logo.png';
import './events_card.css'
function Events_card() {
  return (
    <div className='Events_card_container'>
      <div className='Events_card_container_left'>
      <h3>type of event</h3>
      </div>
      <div className='Events_card_container_middle'>
      <img  className='event_card_image' src ={red} />
    </div>
    <div className='Events_card_container_right'>
      <div className='short_info'><h2>An online competition based mainly on Bioinformatics. Hone and exhibit your coding skills to solve various coding problems based on the theme of "Spideyverse".</h2>
      
        </div>
      <div className='e_btn'>
      <button className='calendar_btn'>add to calendar</button>
      <button className='register_btn'>registernow</button>
    </div>
    </div>
    </div>
  )
}

export default Events_card;
