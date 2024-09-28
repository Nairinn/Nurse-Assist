import React, { useEffect, useState } from 'react';

const CurrentData = () => {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://127.0.0.1:5000/currentData'); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result); 
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p> 
      ) : (
        <div>
          <h2 className="text-6xl">Current Data:</h2>
          {data.length > 0 ? ( 
            <ul style={{ listStyleType: 'none' }}>
              {data.map(entry => ( 
                <li key={entry.id}> 
                  <p>Blood Oxygen: {entry.blood_oxygen}%</p>
                  <p>Heart Rate: {entry.heart_rate} bpm</p>
                  <p>Temperature: {entry.temperature} °C</p>
                  <p>Timestamp: {entry.timestamp}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No data available.</p> 
          )}
        </div>
      )}
    </div>
  );
};

export default CurrentData;
