import React, { useEffect, useState } from 'react';
import CurrentData from './CurrentData'
import './App.css';
import LastMeasured from './LastMeasured';
import SleepForm from './SleepForm';


function App() {
  return (
    <div className="App">
      <SleepForm />
      <CurrentData />
      <LastMeasured />
    </div>
  );
}

export default App;