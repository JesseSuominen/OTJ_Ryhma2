import React, { useState } from 'react';
import EventPopup from './EventPopup';

const ButtonAddEvent = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [eventData, setEventData] = useState(null);

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

  return (
    <div>
      <button onClick={openPopup}>Add Event</button>
      {showPopup && <EventPopup onClose={handleClose} />}
    </div>
  );
};

export default ButtonAddEvent;