import { eachDayOfInterval, endOfMonth, format, getDay, isToday, startOfMonth } from "date-fns";
import { useState } from "react";
import './CalendarGrid.css';

const CalendarGrid = ({ eventData }) => {

  const [dataBaseEvents, setDataBaseEvents] = useState(false);
  
  const mockEventData = [
    {
      eventTitle: "Sample Event 1",
      eventDescription: "This is a sample event description.",
      startDate: "2024-04-30",
      endDate: "2024-04-30",
    },
    {
      eventTitle: "Sample Event 2",
      eventDescription: "Another sample event.",
      startDate: "2024-04-29",
      endDate: "2024-04-29",
    },
  ];

  const events = eventData || mockEventData;
  console.log(eventData);

  const WEEKDAYS = ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"];
  const currentDate = new Date();
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);
  const startingDayIndex = getDay(firstDayOfMonth);

  const [isHovered, setIsHovered] = useState(false);

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

  // Map events to their corresponding dates
  const eventsByDate = {};
  events.forEach(event => {
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);
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
          return <div key={`empty-${index}`}
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
            style={isHovered ? hoveredBoxStyle : boxStyle} />
        })}

        {daysInMonth.map((day, index) => {
          const formattedDay = format(day, "yyyy-MM-dd");
          const eventsForDay = eventsByDate[formattedDay] || [];

          return (
            <div key={index} style={{ position: "relative" }}>
              {format(day, "d")}
              {eventsForDay.map((event, eventIndex) => {
                return (
                  <div key={`event-${index}-${eventIndex}`} className="event-indicator">
                    {event.eventTitle}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default CalendarGrid;
