import { useContext, useState } from 'react';
import CircularProgressBar from '../components/CircularProgressBar';
import ButtonAddEvent from '../components/ButtonAddEvent';
import CalendarGrid from '../components/CalendarGrid';
import EventDataFetcher from '../components/EventDataFetcher';
import { setTokenContext } from '../contexts/setTokenContext';

const Calendar = () => {
  const [eventData, setEventData] = useState([]);
  const { token } = useContext(setTokenContext);

  const ShowContent = () => {
    if (token)
      return (
        <div>
          <CircularProgressBar />
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <CalendarGrid eventData={eventData} />
            <ButtonAddEvent />
          </div>
        </div>
      )
    else return(<p>Please Login to view Calendar.</p>)
  }

  return (
    <>
      <EventDataFetcher setEventData={setEventData} token={token} />
      <ShowContent />
    </>
  )
}

export default Calendar;
