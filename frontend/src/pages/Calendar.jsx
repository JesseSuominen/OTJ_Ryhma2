import { useContext, useEffect, useState } from 'react';
import CircularProgressBar from '../components/CircularProgressBar';
import ButtonAddEvent from '../components/ButtonAddEvent';
import CalendarGrid from '../components/CalendarGrid';
import { setTokenContext } from '../contexts/setTokenContext';

const Calendar = ({ eventData }) => {

  const [eventDataDB, setEventDataDB] = useState([]);
  const { token, setToken } = useContext(setTokenContext);
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('token'));
    if (storedData) {
      const userID = storedData.user_id;
      console.log(storedData.token);
      fetch(`http://localhost:5000/api/calendar/events?id=${userID}`, {
        headers: {
          'Authorization': `Bearer ${storedData.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setEventDataDB(data))
        .catch((error) => console.error('Error:', error));
    } else setEventDataDB([])
  }, [token]);

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
    <ShowContent />
  )
}

export default Calendar;