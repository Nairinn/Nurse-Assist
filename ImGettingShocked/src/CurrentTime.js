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
    <div className='flex items-center justify-center'>
       <div className="text-center p-4 bg-white shadow-lg rounded-lg text-center">
      <p className="text-2xl">
        <strong>{`${getGreeting(currentTime)}!`}</strong> It is currently {formatDate(currentTime)}.
      </p>
      </div>
    </div>
   
  );
};

export default CurrentTime;
