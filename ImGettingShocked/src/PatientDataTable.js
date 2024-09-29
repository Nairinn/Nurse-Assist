import React, { useEffect, useState } from 'react';

const PatientDataTable = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPatients = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/patients');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateVitals = async (patientId) => {
    const response = await fetch(`http://127.0.0.1:5000/updateVitals/${patientId}`, {
      method: 'POST',
    });

    if (response.ok) {
      fetchPatients();
      console.log(`Vitals updated for patient ID: ${patientId}`);
    } else {
      console.log('Error updating vitals');
    }
  };

  const handleDeletePatient = async (patientId) => {
    const response = await fetch(`http://127.0.0.1:5000/deletePatient/${patientId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      fetchPatients();
      console.log(`Patient ID: ${patientId} deleted successfully.`);
    } else {
      console.log('Error deleting patient');
    }
  };

  const updatePriority = async (patientId, newPriority) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/updatePatientPriority/${patientId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priority_level: newPriority }),
      });

      if (!response.ok) {
        throw new Error('Failed to update priority');
      }

      fetchPatients();
    } catch (error) {
      console.error('Error updating priority:', error);
    }
  };

  useEffect(() => {
    fetchPatients();
    const interval = setInterval(fetchPatients, 1000);
    return () => clearInterval(interval);
  }, []);

  const sortedPatients = [...patients].sort((a, b) => a.priority_level - b.priority_level);

  return (
    <div className="h-screen p-6 overflow-x-auto bg-white rounded-lg shadow-md">

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div className="max-h-full overflow-y-auto border border-gray-300">
        <table className="min-w-full border">
          <thead className="border-bold bg-customGreen sticky top-0 z-10">
            <tr>
              <th className="border border-gray-300 p-2 sticky top-0 z-10">ID</th>
              <th className="border border-gray-300 p-2 sticky top-0 z-10">Name</th>
              <th className="border border-gray-300 p-2 sticky top-0 z-10">Priority Level</th>
              <th className="border border-gray-300 p-2 sticky top-0 z-10">Heart Rate</th>
              <th className="border border-gray-300 p-2 sticky top-0 z-10">Blood Oxygen</th>
              <th className="border border-gray-300 p-2 sticky top-0 z-10">Temperature (F)</th>
              <th className="border border-gray-300 p-2 sticky top-0 z-10">Timestamp</th>
              <th className="border border-gray-300 p-2 sticky top-0 z-10">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedPatients.map((patient, index) => (
              <tr key={patient.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className="border border-gray-300 p-2">{patient.id}</td>
                <td className="border border-gray-300 p-2">{patient.name}</td>
                <td className="border border-gray-300 p-2">
                  <select
                    value={patient.priority_level}
                    onChange={(e) => updatePriority(patient.id, Number(e.target.value))}
                    className="border border-gray-300 p-1"
                  >
                    {[1, 2, 3, 4, 5].map((priority) => (
                      <option key={priority} value={priority}>
                        {priority}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="border border-gray-300 p-2">{patient.heart_rate}</td>
                <td className="border border-gray-300 p-2">{patient.blood_oxygen}</td>
                <td className="border border-gray-300 p-2">{patient.temperature}</td>
                <td className="border border-gray-300 p-2">{patient.timestamp}</td>
                <td className="border border-gray-300 p-2">
                  <div className = "flex items-center justify-center h-full space-x-2">
                  <button
                    onClick={() => handleUpdateVitals(patient.id)}
                    className="mr-2 bg-lightBlue text-white p-1 rounded w-20 flex"
                  >
                    Update Vitals
                  </button>
                  <button
                    onClick={() => handleDeletePatient(patient.id)}
                    className="mr-2 bg-customRed text-white p-1 rounded w-m flex justify-center h-full"
                  >
                    Delete
                  </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
};

export default PatientDataTable;
