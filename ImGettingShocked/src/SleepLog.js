import React from 'react';

const SleepLog = ({ sleepLogs }) => {
  return (
    <div className="sleep-log-container">
      <h2 className="text-2xl font-bold">Past Week Sleep Logs</h2>
      {sleepLogs.length === 0 ? (
        <p>No sleep logs available.</p>
      ) : (
        <ul className="list-none">
          {sleepLogs.map((log) => (
            <li key={log.id} className="border-b py-2">
              <p>
                <strong>Sleep Time:</strong> {new Date(log.sleep_time).toLocaleString()}
              </p>
              <p>
                <strong>Wake Time:</strong> {new Date(log.wake_time).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SleepLog;
