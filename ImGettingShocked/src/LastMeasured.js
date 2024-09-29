import React, { useEffect, useState } from 'react';

const CurrentData = () => {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
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

  }, []);

  return (
    <div className="h-1/2 p-6">
      <h2 className="text-2xl mb-6 font-semibold text-gray-800 text-left">Last Measured Data:</h2>
      
      {loading ? (
        <ul className="text-left space-y-3 animate-pulse">
          <li className="text-lg font-medium text-gray-600">Loading data...</li>
          <li> 
            <p>Time: --</p>
            <p>Blood Oxygen: --</p>
            <p>Heart Rate: --</p>
            <p>Temperature: --</p>
          </li>
        </ul>
      ) : (
        <div>
          {data.length > 0 ? ( 
            <ul className="text-left space-y-6">
              {data.map(entry => ( 
                <li key={entry.id} className="border-b pb-4">
                  <p className="text-gray-700">Time: <span className="font-semibold">{entry.timestamp}</span></p>
                  <p className="text-gray-700">Blood Oxygen: <span className="font-semibold">{entry.blood_oxygen}%</span></p>
                  <p className="text-gray-700">Heart Rate: <span className="font-semibold">{entry.heart_rate} bpm</span></p>
                  <p className="text-gray-700">Temperature: <span className="font-semibold">{entry.temperature} °C</span></p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-red-500">No data available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CurrentData;
