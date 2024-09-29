import React, { useEffect, useState } from 'react';
import CurrentData from './CurrentData'
import './App.css';
import LastMeasured from './LastMeasured';
import SleepForm from './SleepForm';

const App = () => {
  return (
    <div>
      <div className='bg-customRed border-3 border-gray'>
        <h1 className="flex items-center justify-center text-white font-bold text-2xl">
             NurseAssist
        </h1>
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
  );
};
export default App;