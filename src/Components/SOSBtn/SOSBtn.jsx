import React from 'react';
import { addEvent, deleteEvent } from '../../Database';

function SOSBtn({ myEvent }) {
  const triggerSOS = () => {
    console.log(myEvent);
    addEvent(myEvent);
  };
  return (
    <div>
      <button onClick={triggerSOS}>SOS</button>
    </div>
  );
}

export default SOSBtn;
