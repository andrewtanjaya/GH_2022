import React from "react";
import { addEvent, deleteEvent } from "../../Database";

function SOSBtn({ myEvent }) {
  const triggerSOS = () => {
    console.log(myEvent);
    addEvent(myEvent);

    var waitTime = 20000;
    var executionTime;
    var initialTime = localStorage.getItem("initialTime");
    if (initialTime === null) {
      localStorage.setItem("initialTime", new Date().getTime());
      executionTime = waitTime;
    } else {
      executionTime =
        parseInt(initialTime, 10) + waitTime - new Date().getTime();
      if (executionTime < 0) executionTime = 0;
    }
    console.log(executionTime);
    setTimeout(function () {
      deleteEvent(sessionStorage.getItem("uid"));
      localStorage.removeItem("initialTime");
    }, executionTime);
  };
  return (
    <div>
      <button onClick={triggerSOS}>SOS</button>
    </div>
  );
}

export default SOSBtn;
