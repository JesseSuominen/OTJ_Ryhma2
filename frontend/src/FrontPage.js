import React from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import CalendarButton from './CalendarButton';
import CalendarPage from './CalendarPage';

function FrontPage() {
  return (
    <div>
      <header>
        <h1>Welcome to the Front Page</h1>
      </header>
      <Router>
        <Routes>
          <Route path="/CalendarPage" component={CalendarButton} />
        </Routes>
      </Router>
    </div>
  );
}

export default FrontPage;
