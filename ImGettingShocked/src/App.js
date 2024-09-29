import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import AddPatientForm from './AddPatientForm';
import PatientDataTable from './PatientDataTable';
import Login from './Login';
import CurrentTime from './CurrentTime';

const App = () => {
  const location = useLocation();
  return (
    <div>
      {location.pathname !== '/' && ( 
        <div className='bg-customGreen border-3 border-gray pb-4 mb-4'>
          <h1 className="flex items-center justify-center text-white font-bold text-2xl pt-3">
            NurseAssist
            <img src="./doctor.png" alt="health icon" className="w-6 h-6 mx-2"></img>
          </h1>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={
          <>

            <CurrentTime />
            <h2 className="text-4xl mb-6 font-semibold text-gray-800 mx-6 underline pt-3">Patient Data:</h2>
            <AddPatientForm />
            <PatientDataTable />
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