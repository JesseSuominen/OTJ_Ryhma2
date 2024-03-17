import React from 'react';
import { Link } from 'react-router-dom';

const CalendarButton = () => {
  return (
    <Link to="/CalendarPage">
      <button>Go to the Calendar page</button>
    </Link>
  );
}

export default CalendarButton;