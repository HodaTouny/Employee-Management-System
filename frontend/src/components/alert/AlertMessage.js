import React, { useState, useEffect } from 'react';
import '../../libraries/bootstrap.min.css';

const AlertMessage = ({ message, alertClass }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  
  if (!isVisible) return null;

  return (
    <div className={`alert ${alertClass}`} role="alert">
      {message}
    </div>
  );
};

export default AlertMessage;
