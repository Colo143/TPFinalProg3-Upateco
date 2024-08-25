import React, {useEffect} from 'react';
import '../styles/Notification.css';

const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message, onClose]);
  
  if (!message) return null;

  return (
    <div className={`notification is-${type}`}>
      {message}
    </div>
  );
};

export default Notification;