import React from 'react'
import ImageSlider from './image_slider';
import Events_card from './events_card';
import './events.css'
function Events() {
  
  return (
    <div className='events_container'>
      <div className='events_slider'>
     <ImageSlider/>
     <h1>events</h1>
     <div className='e_cards'>
     <Events_card/>
     <Events_card/>
     <Events_card/>
     <Events_card/>
      </div>
      </div>
    </div>
  )
}

export default Events;
