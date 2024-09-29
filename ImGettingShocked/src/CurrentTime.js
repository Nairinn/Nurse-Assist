import React, { useEffect, useState } from 'react';

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); 

    return () => clearInterval(timer); 
  }, []);

  const getGreeting = (date) => {
    const hours = date.getHours();
    if (hours < 12) {
      return "Good morning";
    } else if (hours < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };

  const formatDate = (date) => {
    return date.toLocaleString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  return (
    <div className="text-center p-4">
      <p className="text-2xl">
        <strong>{`${getGreeting(currentTime)}!`}</strong> It is currently {formatDate(currentTime)}.
      </p>
    </div>
  );
};

export default CurrentTime;
