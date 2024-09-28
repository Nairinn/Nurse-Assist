import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState({ temperature: null, redLED: null, irLED: null });
  const [sleepTime, setSleepTime] = useState('');
  const [wakeTime, setWakeTime] = useState('');
  const [message, setMessage] = useState('');

  // Fetch Raspberry Pi Sensor Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://<REPLACEWITHPIRASBERRYIPADRESS>:5000/data');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  // Handle Sleep Data Submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const dataToSubmit = {
      sleep_time: sleepTime,
      wake_time: wakeTime,
    };

    try {
      const response = await fetch('http://<YOUR_FLASK_SERVER_IP>:5000/submitSleepData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage(result.message);
      } else {
        const errorResult = await response.json();
        setMessage(errorResult.error);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      setMessage('An error occurred while submitting the data.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sensor Data</h1>
        <p>Temperature: {data.temperature !== null ? `${data.temperature} °C` : 'Loading...'}</p>
        <p>Red LED: {data.redLED !== null ? data.redLED : 'Loading...'}</p>
        <p>IR LED: {data.irLED !== null ? data.irLED : 'Loading...'}</p>

        <h2>Sleep Data Submission</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Sleep Time:
            <input 
              type="datetime-local" 
              value={sleepTime} 
              onChange={(e) => setSleepTime(e.target.value)} 
              required 
            />
          </label>
          <br />
          <label>
            Wake Time:
            <input 
              type="datetime-local" 
              value={wakeTime} 
              onChange={(e) => setWakeTime(e.target.value)} 
              required 
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
        {message && <p>{message}</p>}
      </header>
    </div>
  );
}

export default App;
