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
      alert('Patient added successfully');
    } else {
      alert('Error adding patient');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Patient Name"
        required
      />
      <input
        type="number"
        value={priorityLevel}
        onChange={(e) => setPriorityLevel(e.target.value)}
        placeholder="Priority Level"
        required
      />
      <button type="submit">Add Patient</button>
    </form>
  );
};

export default AddPatientForm;
