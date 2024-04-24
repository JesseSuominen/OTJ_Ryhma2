import "./Calendar.css";
import CircularProgressBar from '../components/CircularProgressBar';
import ButtonAddEvent from '../components/ButtonAddEvent';
import CalendarGrid from '../components/CalendarGrid';

const Calendar = () => {

  return (
    <div>
      <CircularProgressBar/>

      <CalendarGrid/>

      <ButtonAddEvent/>
    </div>
  )
}

export default Calendar;