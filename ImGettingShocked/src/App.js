import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AddPatientForm from './AddPatientForm';
import PatientDataTable from './PatientDataTable';
import Login from './Login'; // Import your Login component

const App = () => {
  return (
    <Router>
      <div>
        <div className='bg-customRed border-3 border-gray'>
          <h1 className="flex items-center justify-center text-white font-bold text-2xl">
            NurseAssist
          </h1>
        </div>

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<Login />} /> {/* Set Login as the home page */}
          <Route path="/main" element={
            <>
              <AddPatientForm />
              <PatientDataTable />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
