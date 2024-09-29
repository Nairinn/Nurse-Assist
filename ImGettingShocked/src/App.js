import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import CurrentData from './CurrentData';
import LastMeasured from './LastMeasured';
import SleepForm from './SleepForm';
import Login from './Login';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={
        <div>
          <div className='bg-customRed border-3 border-gray'>
            <h1 className="flex items-center justify-center text-white font-bold text-2xl">
              NurseAssist
            </h1>
          </div>

          {/* Add the Login link here */}
          <div className="flex justify-center mt-4">
            <Link to="/login" className="text-blue-500 hover:underline">
              Go to Login
            </Link>
          </div>

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
              <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h1 className="text-3xl text-center">Sleep Logs</h1>
              </div>
            </div>
          </div>
        </div>
      } />
    </Routes>
  );
};

export default App;
