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
    <div className="h-screen p-6">
      <h2 className="text-4xl mb-6 font-semibold text-gray-800">Patient Data</h2>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Priority Level</th>
              <th className="border border-gray-300 p-2">Heart Rate</th>
              <th className="border border-gray-300 p-2">Blood Oxygen</th>
              <th className="border border-gray-300 p-2">Temperature</th>
              <th className="border border-gray-300 p-2">Timestamp</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedPatients.map(patient => (
              <tr key={patient.id}>
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
                  <button
                    onClick={() => handleUpdateVitals(patient.id)}
                    className="mr-2 bg-blue-500 text-white p-1 rounded"
                  >
                    Update Vitals
                  </button>
                  <button
                    onClick={() => handleDeletePatient(patient.id)}
                    className="bg-red-500 text-white p-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PatientDataTable;
