import React from 'react';
import { addEvent, deleteEvent } from '../../Database';
import './SOSBtn.scss';

function SOSBtn({ myEvent, className }) {
  const triggerSOS = () => {
    console.log(myEvent);
    addEvent(myEvent);
  };
  return (
    <div className={`pulsating-circle ${className}`}>
      <button onClick={triggerSOS} className="sos-btn">
        <div className="sos-btn-content"> !</div>
      </button>
    </div>
  );
}

export default SOSBtn;
