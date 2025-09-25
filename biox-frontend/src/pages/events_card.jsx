import React, { useState } from 'react';
import './events_card.css';
import EventRegistration from '../components/EventRegistration';
import TeamRegistration from '../components/TeamRegistration';

const Events_card = ({ eventDetail, onAddToCalendar }) => {
  const [showRegistration, setShowRegistration] = useState(false);
  const [showTeamRegistration, setShowTeamRegistration] = useState(false);

  if(!eventDetail) return <p>Not found</p>;

  const handleRegister = () => {
    if(eventDetail.has_teams) {
      setShowTeamRegistration(true);
    } else {
      setShowRegistration(true);
    }
  };

  const handleCloseRegistration = () => {
    setShowRegistration(false);
  };

  const handleRegistrationSuccess = () => {
    // You might want to update some state here if needed
    console.log("Registration successful");
  };

  return (
    <>
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
            <button className='register_btn' onClick={handleRegister}>
              Register Now
            </button>
          </div>
        </div>
      </div>
      
      {showRegistration && (
        <EventRegistration
          event={eventDetail}
          onClose={() => setShowRegistration(false)}
          onRegister={handleRegistrationSuccess}
        />
      )}

      {showTeamRegistration && (
        <TeamRegistration
          event={eventDetail}
          onClose={() => setShowTeamRegistration(false)}
          onRegister={handleRegistrationSuccess}
        />
      )}
    </>
  );
};

export default Events_card;