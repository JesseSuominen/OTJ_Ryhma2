import { useEffect } from 'react';

const EventDataFetcher = ({ setEventData, token }) => {

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        if (token) {
          const storedData = JSON.parse(localStorage.getItem('token'));
          if (storedData) {
            const userID = storedData.user_id.toString();
            const response = await fetch(`http://localhost:5000/api/calendar/events?id=${userID}`, {
              headers: {
                'Authorization': `Bearer ${storedData.token}`,
              },
            });
            if (response.ok) {
              const data = await response.json();
              setEventData(data);
            } else {
              console.error('Failed to fetch event data:', response.statusText);
            }
          } else {
            setEventData([]);
          }
        }
      } catch (error) {
        console.error('Error fetching event data:', error.message);
      }
    };

    fetchEventData();
  }, [token, setEventData]);

  return null;
};

export default EventDataFetcher;
