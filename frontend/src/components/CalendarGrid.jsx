import { eachDayOfInterval, endOfMonth, format, getDay, startOfMonth } from "date-fns";
import { useState } from "react";
import './CalendarGrid.css';

const CalendarGrid = ({ eventData }) => {
  const events = eventData;

  const WEEKDAYS = ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"];
  const currentDate = new Date();
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);
  const startingDayIndex = getDay(firstDayOfMonth);

  const [selectedDay, setSelectedDay] = useState(null);
  const [eventsState, setEvents] = useState(events);

  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  const boxStyle = {
    border: '1px solid black',
    backgroundColor: 'white',
    padding: '8px 16px',
    cursor: 'pointer'
  };

  const hoveredBoxStyle = {
    border: '2px solid black',
    backgroundColor: 'lightgrey',
    padding: '8px 16px',
    cursor: 'pointer'
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const handleRemoveEvent = async (eventToRemove) => {
    try {
      const storedData = JSON.parse(localStorage.getItem('token'));
      const response = await fetch(`http://localhost:5000/api/calendar/event/delete/${eventToRemove.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedData.token}`
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete event');
      }
      // Update events state to remove the deleted event
      setEvents(prevEvents => prevEvents.filter(event => event.id !== eventToRemove.id));
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error('Error deleting event:', error.message);
    }
  };

  const eventsByDate = {};
  eventsState.forEach(event => {
    const startDate = new Date(event.start_date);
    const endDate = new Date(event.end_date);
    const eventDates = eachDayOfInterval({ start: startDate, end: endDate });
    eventDates.forEach(date => {
      const formattedDate = format(date, "yyyy-MM-dd");
      if (!eventsByDate[formattedDate]) {
        eventsByDate[formattedDate] = [];
      }
      eventsByDate[formattedDate].push(event);
    });
  });

  return (
    <div className="grid_position">
      <h2 className="month_and_year">{format(currentDate, "MMMM yyyy")}</h2>
      <div className="grid_element">
        {WEEKDAYS.map((day) => {
          return <div key={day}>{day}</div>;
        })}

        {Array.from({ length: startingDayIndex }).map((_, index) => {
          return <div key={`empty-${index}`} style={boxStyle} />
        })}

        {daysInMonth.map((day, index) => {
          const formattedDay = format(day, "yyyy-MM-dd");
          const eventsForDay = eventsByDate[formattedDay] || [];

          return (
            <div key={index} style={{ position: "relative" }}>
              <div 
                onClick={() => handleDayClick(day)} 
                style={selectedDay === day ? hoveredBoxStyle : boxStyle}>
                {format(day, "d")}
              </div>
              {eventsForDay.map((event, eventIndex) => {
                return (
                  <div key={`event-${index}-${eventIndex}`} className="event-indicator">
                    {event.name}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      {selectedDay && (
        <div className="information-panel">
          <h3>{format(selectedDay, "MMMM d, yyyy")}</h3>
          <p>{format(selectedDay, "EEEE")}</p>
          {eventsByDate[format(selectedDay, "yyyy-MM-dd")] &&
            <div>
              <h4>Events:</h4>
              <ul>
                {eventsByDate[format(selectedDay, "yyyy-MM-dd")].map((event, index) => (
                  <li key={index}>
                    {event.name}
                    <button onClick={() => handleRemoveEvent(event)}>Remove</button>
                  </li>
                ))}
              </ul>
            </div>
          }
        </div>
      )}
    </div>
  )
}

export default CalendarGrid;
