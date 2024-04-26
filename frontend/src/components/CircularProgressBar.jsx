import React, { useState, useEffect, useContext } from 'react';
import { setTokenContext } from '../contexts/setTokenContext';
import { eachDayOfInterval, endOfMonth, format, getDay, isToday, startOfMonth } from "date-fns";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './CircularProgressBar.css';

const CircularProgressBar = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [submittedHours, setSubmittedHours] = useState(0);
  const [submittedMinutes, setSubmittedMinutes] = useState(0);
  const [showInputFields, setShowInputFields] = useState(false);
  const [progressLabel, setProgressLabel] = useState("Current Monthly Progress");

  const currentDate = new Date();
   // Adding 1 because getMonth() returns 0--11
  const currentMonth = (currentDate.getMonth() + 1).toString();
  const currentYear = (currentDate.getFullYear()).toString();

  // Calculate total progress percentage towards the goal (30 hours)
  const totalMinutes = (hours + submittedHours) * 60 + (minutes + submittedMinutes);
  const goalMinutes = 30 * 60;
  const progress = goalMinutes !== 0 ? (totalMinutes / goalMinutes) * 100 : 0;

  const handleAddProgressClick = () => {
    setShowInputFields(true);
  };

  const handleAddProgress = () => {
    setHours(hours + submittedHours);
    setMinutes(minutes + submittedMinutes);
    setSubmittedHours(0);
    setSubmittedMinutes(0);
    setShowInputFields(false);
  };

  const { token, setToken } = useContext(setTokenContext);
  const [dataFetched, setDataFetched] = useState(false);

  // useEffect hook...
  useEffect(() => {
    // Fetch progress data only if it hasn't been fetched already
    if (!dataFetched) {
      const storedData = JSON.parse(localStorage.getItem('token'));
      if (storedData) {
        const userID = storedData.user_id.toString();
        fetch(`http://localhost:5000/api/calendar/monthlyhours?id=${userID}&month=${currentMonth}&year=${currentYear}`, {
          headers: {
            'Authorization': `Bearer ${storedData.token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data && data.length > 0) {
              const totalAmount = data[0].total_amount;
              // total_amount is a decimal number in hours
              setMinutes(Math.floor(minutes + totalAmount * 60));
            }
          })
          .catch((error) => console.error('Error:', error));
      }
    }
  }, [dataFetched, token, currentMonth, currentYear]);

  useEffect(() => {
    // Update the progress label when progress reaches or exceeds 100%
    if (progress >= 100 && progressLabel !== "GOAL REACHED") {
      setProgressLabel("GOAL REACHED");
    }
  }, [progress, progressLabel]);

  return (
    <div className="progress-container">
      <div className="progress-text">{progressLabel}</div>
      <div className="progress-bar-container">
        <CircularProgressbar
          value={progress}
          text={`${Math.round(progress)}%`}
          styles={buildStyles({
            textSize: '16px',
            pathColor: `rgba(62, 152, 199, ${progress / 100})`,
            textColor: '#f88',
            trailColor: '#d6d6d6',
          })}
        />
        {showInputFields && (
          <div className="input-fields">
            <input
              type="number"
              value={submittedHours}
              onChange={(e) => setSubmittedHours(parseInt(e.target.value, 10))}
              style={{ marginRight: '5px' }}
            />
            Hours
            <input
              type="number"
              value={submittedMinutes}
              onChange={(e) => setSubmittedMinutes(parseInt(e.target.value, 10))}
              style={{ marginLeft: '10px', marginRight: '5px' }}
            />
            Minutes
            <br />
            <button onClick={handleAddProgress} style={{ marginTop: '10px' }}>
              Add Progress
            </button>
          </div>
        )}
        {!showInputFields && (
          <button onClick={handleAddProgressClick} style={{ marginTop: '10px' }}>
            Add Progress
          </button>
        )}
      </div>
    </div>
  );
};

export default CircularProgressBar;
