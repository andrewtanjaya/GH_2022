import React from 'react';
import './SOSBtn.scss';
import Tooltip from 'antd/es/tooltip';

function SOSBtn({ callback }) {
  return (
    <Tooltip title="SOS">
      <div className="pulsating-circle sos-btn-container">
        <button onClick={callback} className="sos-btn">
          <div className="sos-btn-content"> !</div>
        </button>
      </div>
    </Tooltip>
  );
}

export default SOSBtn;
