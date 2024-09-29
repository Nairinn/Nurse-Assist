import React, { useEffect, useState } from 'react';
import './App.css';
import AddPatientForm from './AddPatientForm';
import PatientDataTable from './PatientDataTable';

const App = () => {
  return (
    <div>
      <div className='bg-customRed border-3 border-gray'>
        <h1 className="flex items-center justify-center text-white font-bold text-2xl">
             NurseAssist
        </h1>
      </div>
          <AddPatientForm />
          <PatientDataTable />
    </div>
  );
};
export default App;