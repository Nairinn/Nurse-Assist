import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import AddPatientForm from './AddPatientForm';
import PatientDataTable from './PatientDataTable';
import Login from './Login'; 

const App = () => {
  const [data, setData] = useState({ temperature: null, redLED: null, irLED: null });
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://<Raspberry_Pi_IP>:5000/sensor-data');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData({
          temperature: result.temperature_c,
          redLED: result.red_led,
          irLED: result.ir_led
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Conditionally render the header only if not on the login page */}
      {location.pathname !== '/' && (
        <div className='bg-customRed border-3 border-gray'>
          <h1 className="flex items-center justify-center text-white font-bold text-2xl">
            NurseAssist
          </h1>
        </div>
      )}

      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<Login />} /> {/* Set Login as the home page */}
        <Route path="/main" element={
          <>
            <AddPatientForm />
            <PatientDataTable sensorData={data} />
          </>
        } />
      </Routes>
    </div>
  );
};

const MainApp = () => (
  <Router>
    <App />
  </Router>
);

export default MainApp;
