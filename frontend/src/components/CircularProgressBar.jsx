import React, { useState, useEffect, useContext } from 'react';
import { setTokenContext } from '../contexts/setTokenContext';
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
  const [errorMessage, setErrorMessage] = useState('');
  const [progressText, setProgressText] = useState('0%');

  const currentDate = new Date();
  const currentMonth = (currentDate.getMonth() + 1).toString();
  const currentYear = (currentDate.getFullYear()).toString();

  const goalMinutes = 30 * 60 * 4;
  const [progress, setProgress] = useState(0);

  const calculateProgress = () => {
    const total = (hours + submittedHours) * 60 + (minutes + submittedMinutes);
    const newProgress = goalMinutes !== 0 ? (total / goalMinutes) * 100 : 0;
    setProgress(newProgress);
    setProgressText(`${Math.round(newProgress)}%`);
  };

  function handleKeyDown(event) {
    // Check if the key pressed is "Enter"
    if (event.key === 'Enter') {
      handleAddProgress();
    }
  }

  const handleAddProgress = () => {
    setHours(hours + submittedHours);
    setMinutes(minutes + submittedMinutes);
    setSubmittedHours(0);
    setSubmittedMinutes(0);
    setShowInputFields(false);

    calculateProgress();

    const currentDate = new Date().toISOString().split('T')[0];

    const storedData = JSON.parse(localStorage.getItem('token'));
    if (storedData) {
      const userID = storedData.user_id.toString();
      const requestBody = JSON.stringify({
        amount: submittedHours + submittedMinutes / 60,
        name: "Work",
        date: currentDate
      });

      fetch(`http://localhost:5000/api/calendar/hour?id=${userID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedData.token}`,
        },
        body: requestBody,
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add progress');
        }
        setErrorMessage('');
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrorMessage('Please enter hours and/or minutes to be added.');
      });
    }
  };

  useEffect(() => {
    if (progress >= 100 && progressLabel !== "GOAL REACHED") {
      setProgressLabel("GOAL REACHED");
    }
  }, [progress, progressLabel]);

  const { token } = useContext(setTokenContext);

  useEffect(() => {
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
            const totalMinutes = Math.floor(totalAmount * 60);
            setMinutes(totalMinutes);
            const newProgress = goalMinutes !== 0 ? (totalMinutes / goalMinutes) * 100 : 0;
            setProgress(newProgress);
            setProgressText(`${Math.round(newProgress)}%`);
          }
        })
        .catch((error) => console.error('Error:', error));
    }
  }, [goalMinutes, token, currentMonth, currentYear]);

  return (
    <div className="progress-container">
      <div className="progress-text">{progressLabel}</div>
      <div className="progress-bar-container">
        <CircularProgressbar
          value={progress}
          text={progressText}
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
              value={submittedHours || ''}
              onChange={(e) => setSubmittedHours(parseInt(e.target.value, 10))}
              onKeyDown={handleKeyDown}
              style={{ maxWidth: '60px', marginLeft: '10px', marginRight: '10px', marginTop: '10px' }}
            />
            Hours
            <input
              type="number"
              value={submittedMinutes || ''}
              onChange={(e) => setSubmittedMinutes(parseInt(e.target.value, 10))}
              onKeyDown={handleKeyDown}
              style={{ maxWidth: '60px', marginLeft: '10px', marginRight: '10px', marginTop: '10px' }}
            />
            Minutes
            <br />
            <button
              onClick={handleAddProgress}
              style={{ marginTop: '10px' }}
            >
              Add Progress
            </button>
          </div>
        )}
        {!showInputFields && (
          <button onClick={() => setShowInputFields(true)} style={{ marginTop: '10px' }}>
            Add Progress
          </button>
        )}
        <br />
            {/* Display error message */}
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      </div>
    </div>
  );
};

export default CircularProgressBar;
