import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom'; // Import Navigate
import './App.css';
import AddPatientForm from './AddPatientForm';
import PatientDataTable from './PatientDataTable';
import Login from './Login';

const App = () => {
  return (
    <Router>
      <div>
        <div className='bg-customRed border-3 border-gray'>
          <h1 className="flex items-center justify-center text-white font-bold text-2xl">
            NurseAssist
          </h1>
        </div>
        
        {/* Navigation Links */}
        <div className="flex justify-center mt-4">
          <Link to="/login" className="text-blue-500 hover:underline">
            Go to Login
          </Link>
        </div>

        {/* Define Routes */}
        <Routes>
          <Route path="/login" element={<Login />} /> {/* Login page route */}
          <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect root to login */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
