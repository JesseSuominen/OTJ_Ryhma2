import React, { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CircularProgressBar = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [submittedHours, setSubmittedHours] = useState(0);
  const [submittedMinutes, setSubmittedMinutes] = useState(0);
  const [showInputFields, setShowInputFields] = useState(false);

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

  return (
    <div style={{ width: '200px', textAlign: 'center' }}>
      {progress >= 100 ? <div>GOAL REACHED</div> : null}
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
        <div>
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
          <button onClick={handleAddProgress} style={{ marginLeft: '10px' }}>
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
  );
};

export default CircularProgressBar;
