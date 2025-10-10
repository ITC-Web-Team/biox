import React, { useState, useEffect } from 'react'
import ImageSlider from './image_slider';
import Events_card from './events_card';
import './events.css'
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch events from backend API
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_ENDPOINTS.events);
        setEvents(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleAddToCalendar = () => {
    console.log("added to calendar");
  };

  const handleRegister = () => {
    console.log("registered");
  };
  
  return (
    <div className='events_container'>
      <div className='events_slider'>
        
        <h1>events</h1>
        
        {loading && <p>Loading events...</p>}
        {error && <p className="error-message">{error}</p>}
        
        <div className='e_cards'>
          {!loading && !error && events.map(event => (
            <Events_card
                key={event.event_id}
                eventDetail={event}
                onAddToCalendar={handleAddToCalendar}
                onRegister={handleRegister} 
            />
          ))}
        </div>
        <ImageSlider/>
      </div>
    </div>
  )
}

export default Events;
