import React from 'react';

const EventPopup = ({ onClose }) => {
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const eventData = {
      eventTitle: event.target.eventTitle.value,
      eventDescription: event.target.eventDescription.value,
      startDate: event.target.startDate.value,
      endDate: event.target.endDate.value
    };
    // Tallentaa eventin tiedot
    onClose(eventData);
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div>
      <h2>Add Event</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="eventTitle">Event Title:</label><br />
        <input type="text" id="eventTitle" name="eventTitle" required /><br />
        <label htmlFor="eventDescription">Event Description:</label><br />
        <textarea id="eventDescription" name="eventDescription" rows="4" required /><br />
        <label htmlFor="startDate">Start Date:</label><br />
        <input type="date" id="startDate" name="startDate" required /><br />
        <label htmlFor="endDate">End Date:</label><br />
        <input type="date" id="endDate" name="endDate" required /><br /><br />
        <button type="submit">Submit Event</button>
        <button type="button" onClick={handleCancel} style={{ marginLeft: '10px' }}>Cancel</button>
      </form>
    </div>
  );
};

export default EventPopup;
