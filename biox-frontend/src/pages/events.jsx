import React from 'react'
import ImageSlider from './image_slider';
import Events_card from './events_card';
import './events.css'
import eventDetail from '../data/eventDetails';

function Events() {

  const handleAddToCalendar = () => {
    console.log("added to calendar");
  };

  const handleRegister =() => {
    console.log("registered");
  };
  
  return (
    <div className='events_container'>
      <div className='events_slider'>
        <ImageSlider/>
        <h1>events</h1>
        <div className='e_cards'>
          {eventDetail.map(event => (
            <Events_card
                key={event.event_id}
                eventDetail={event}
                onAddToCalendar={handleAddToCalendar}
                onRegister={handleRegister} 
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Events;
