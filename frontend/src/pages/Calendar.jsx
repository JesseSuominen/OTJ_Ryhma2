
import CircularProgressBar from '../components/CircularProgressBar';
import ButtonAddEvent from '../components/ButtonAddEvent';
import CalendarGrid from '../components/CalendarGrid';

const Calendar = ({eventData}) => {

  return (
    <div>
      <CircularProgressBar />
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <CalendarGrid eventData={eventData}/>
        <ButtonAddEvent />
      </div>
    </div>
  )
}

export default Calendar;