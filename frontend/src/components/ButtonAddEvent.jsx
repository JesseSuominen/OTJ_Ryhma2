import React, { useState } from 'react';
import EventPopup from './EventPopup';
import EventDataFetcher from './EventDataFetcher';

const ButtonAddEvent = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const openPopup = () => {
    setShowPopup(true);
  };

  const handleClose = async (data) => {
    setShowPopup(false);
    if (data) {
      console.log(data);
      try {
        const storedData = JSON.parse(localStorage.getItem('token'));
        const userId = storedData.user_id;

        const eventData = {
          name: data.eventTitle,
          description: data.eventDescription,
          start_date: data.startDate,
          end_date: data.endDate,
        };

        const response = await fetch(`http://localhost:5000/api/calendar/event?id=${userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${storedData.token}`
          },
          body: JSON.stringify(eventData)
        });

        if (!response.ok) {
          console.error('Failed to submit event:', response.statusText);
        } else {
          console.log('Event submitted successfully');
        }
      } catch (error) {
        console.error('Error submitting event:', error.message);
      }
    }
  };


  const containerStyle = {
    width: '200px',
    height: '50px',
    padding: '50px',
  };

  const buttonStyle = {
    backgroundColor: 'blue',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const hoveredButtonStyle = {
    backgroundColor: 'lightblue',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <button
        onClick={openPopup}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        style={isHovered ? hoveredButtonStyle : buttonStyle}
      >
        Add Event
      </button>
      {showPopup && <EventPopup onClose={handleClose} />}
      <EventDataFetcher setEventData={() => {}} />
    </div>
  );
};

export default ButtonAddEvent;