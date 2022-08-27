import React from 'react';
import './SOSBtn.scss';

function SOSBtn({ callback }) {
  return (
    <div className="pulsating-circle sos-btn-container">
      <button onClick={callback} className="sos-btn">
        <div className="sos-btn-content"> !</div>
      </button>
    </div>
  );
}

export default SOSBtn;
