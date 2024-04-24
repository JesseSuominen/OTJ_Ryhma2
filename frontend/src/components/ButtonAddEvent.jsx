import React, { useState } from 'react';
import EventPopup from './EventPopup';

const ButtonAddEvent = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [eventData, setEventData] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const openPopup = () => {
    setShowPopup(true);
  };

  const handleClose = (data) => {
    setShowPopup(false);
    if (data) {
      // Oletettavasti tällä pitäis saada data DB:lle
      setEventData(data);
      console.log('Event data:', data);
    }
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
    <div>
      <button
        onClick={openPopup}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        style={isHovered ? hoveredButtonStyle : buttonStyle}
      >
        Add Event
      </button>
      {showPopup && <EventPopup onClose={handleClose} />}
    </div>
  );
};

export default ButtonAddEvent;
