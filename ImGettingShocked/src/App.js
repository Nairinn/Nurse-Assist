import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
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
        
        <div className="flex justify-center mt-4">
          <Link to="/login" className="text-blue-500 hover:underline">
            Go to Login
          </Link>
        </div>

        <Routes>
          <Route path="/" element={
            <>
              <AddPatientForm />
              <PatientDataTable />
            </>
          } />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
