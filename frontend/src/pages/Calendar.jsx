import { useState } from 'react';
import { eachDayOfInterval, endOfMonth, format, getDay, isToday, startOfMonth } from "date-fns";
import "./Calendar.css";
import CircularProgressBar from '../components/CircularProgressBar';
import ButtonAddEvent from '../components/ButtonWithPopup';

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"];
/*
interface Event {
    date: Date;
    title: String;
    description: String;
}

interface CalendarProps {
    events: Event[];
}
*/

const Calendar = () => {

  const currentDate = new Date();
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  const startingDayIndex = getDay(firstDayOfMonth);

  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle = {
    border: '1px solid black',
    backgroundColor: 'white',
    padding: '8px 16px',
    cursor: 'pointer'
  };

  const hoveredButtonStyle = {
    border: '2px solid black',
    backgroundColor: 'lightgrey',
    padding: '8px 16px',
    cursor: 'pointer'
  };

  return (
    <div className="grid_calendar">
      <div className="progress_stats">
        <CircularProgressBar/>
      </div>

      <h2 className="month_and_year">{format(currentDate, "MMMM yyyy")}</h2>

      <div className="grid_weekdays">
        {WEEKDAYS.map((day) => {
          return <div key={day}>{day}</div>;
        })}

        {Array.from({ length: startingDayIndex }).map((_, index) => {
          return <div key={`empty- ${index}`}/>
        })}

        {daysInMonth.map((day, index) => {
          return <div key={index}>
            {format(day, "d")}
          </div>;
        })}
      </div>
      <ButtonAddEvent
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        style={isHovered ? hoveredButtonStyle : buttonStyle}/>
    </div>
  )
}

export default Calendar;