// src/components/Events_card.jsx
import React from 'react';
import './events_card.css';
import eventDetails from '../data/eventDetails';

const Events_card = ({ eventDetail, onAddToCalendar, onRegister }) => {

  if(!eventDetail) return <p>Not found</p>;

  return (
    <div className='Events_card_container'>
      <div className='Events_card_container_left'>
        <h3>{eventDetail.type}</h3>
      </div>

      <div className='Events_card_container_middle'>
        <img className='event_card_image' src={eventDetail.image} alt={eventDetail.title} />
      </div>

      <div className='Events_card_container_right'>
        <div className='short_info'>
          <h2>{eventDetail.title}</h2>
          <p>{eventDetail.description}</p>
        </div>
        <div className='e_btn'>
          <button className='calendar_btn' onClick={onAddToCalendar}>
            Add to Calendar
          </button>
          <button className='register_btn' onClick={onRegister}>
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Events_card;
