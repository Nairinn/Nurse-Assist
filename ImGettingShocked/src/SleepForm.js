import React, { useState } from 'react';

const SleepForm = () => {
  const [sleepTime, setSleepTime] = useState('');
  const [wakeTime, setWakeTime] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dataToSubmit = {
      sleep_time: sleepTime,
      wake_time: wakeTime,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/submitSleepData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage(result.message);
        setSleepTime('');
        setWakeTime('');
      } else {
        const errorResult = await response.json();
        setMessage(errorResult.error);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      setMessage('An error occurred while submitting the data.');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4 font-semibold">Sleep Data Submission</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-gray-700">
          Sleep Time:
          <input 
            type="datetime-local" 
            value={sleepTime} 
            onChange={(e) => setSleepTime(e.target.value)} 
            required 
            className="border border-gray-300 p-2 w-full text-black"
          />
        </label>
        <label className="block text-gray-700">
          Wake Time:
          <input 
            type="datetime-local" 
            value={wakeTime} 
            onChange={(e) => setWakeTime(e.target.value)} 
            required 
            className="border border-gray-300 p-2 w-full text-black"
          />
        </label>
        <button 
          type="submit" 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
      {message && <p className="mt-4 text-gray-700">{message}</p>}
    </div>
  );
};

export default SleepForm;
