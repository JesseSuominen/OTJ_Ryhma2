import { eachDayOfInterval, endOfMonth, format, getDay, isToday, startOfMonth } from "date-fns";
import { useState } from "react";
const CalendarGrid = () => {

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

  return (
    <div>
      <h2 className="month_and_year">{format(currentDate, "MMMM yyyy")}</h2>

      <div className="grid_weekdays">
        {WEEKDAYS.map((day) => {
          return <div key={day}>{day}</div>;
        })}

        {Array.from({ length: startingDayIndex }).map((_, index) => {
          return <div key={`empty- ${index}`}
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
            style={isHovered ? hoveredBoxStyle : boxStyle} />
        })}

        {daysInMonth.map((day, index) => {
          return <div key={index}>
            {format(day, "d")}
          </div>;
        })}
      </div>
    </div>
  )
}

export default CalendarGrid;