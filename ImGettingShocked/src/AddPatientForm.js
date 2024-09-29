import React, { useState } from 'react';

const AddPatientForm = () => {
  const [name, setName] = useState('');
  const [priorityLevel, setPriorityLevel] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch('http://127.0.0.1:5000/addPatient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        name, 
        priority_level: priorityLevel, 
        heart_rate: null, 
        blood_oxygen: null, 
        temperature: null 
      }),
    });

    if (response.ok) {
      console.log('Patient added successfully');
      setName('');
      setPriorityLevel('');
    } else {
      console.log('Error adding patient');
    }
  };

  return (
    <div className="mx-6">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Patient Name"
          required
          className="px-3 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          value={priorityLevel}
          onChange={(e) => setPriorityLevel(e.target.value)}
          placeholder="Priority Lvl"
          required
          h1
          min = '1'
          max = '5'
          className="px-3 py-1 border w-28 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-1 bg-lightBlue text-white rounded-md text-sm hover:bg-darkBlue transition"
        >
          Add Patient
        </button>
      </form>
    </div>
  );
};

export default AddPatientForm;
