import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import AddPatientForm from './AddPatientForm';
import PatientDataTable from './PatientDataTable';
import Login from './Login';

const App = () => {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== '/' && ( 
        <div className='bg-customRed border-3 border-gray'>
          <h1 className="flex items-center justify-center text-white font-bold text-2xl">
            NurseAssist
          </h1>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={
          <>
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