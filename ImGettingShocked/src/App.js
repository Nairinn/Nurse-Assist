import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import LastMeasured from './LastMeasured';
import SleepForm from './SleepForm';
import Card from './Card';
import AddButton from './AddButton'
import Greeting from './Greeting';

const App = () => {
  return (
    <div>
      <div className='bg-customRed border-full border-gray-500'>
        <h1 className="flex items-center justify-center text-white font-bold text-2xl py-3 ">
             NurseAssist 
             <img src='/doctor.png' alt='health symbol' className='w-7 h-7 object-cover mx-2'></img>
        </h1>
        
      </div>
      <div className="border-2xlS border border-solid border-red-800 w-full"></div>

      <Greeting isLoggedIn={true} name="Norton"></Greeting>
      <AddButton></AddButton>
      
      

      <Card title="RPM"/>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <div className="flex flex-col gap-6">
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <CurrentData />
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <LastMeasured />
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <SleepForm />
        </div>
        
        {/* Navigation Links */}
        <div className="flex justify-center mt-4">
          <Link to="/login" className="text-blue-500 hover:underline">
            Go to Login
          </Link>
        </div>

        {/* Define Routes */}
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
    </div>
    </div>
  );
};
export default App;