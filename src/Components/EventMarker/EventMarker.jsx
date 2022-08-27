import React from "react";
import { updateAccepted } from "../../Database";

function EventMarker({ ev }) {
  const acceptEvent = () => {
    const currentUid = sessionStorage.getItem("uid");
    if (currentUid !== ev.uid) {
      if (ev.accepted_uids && ev.accepted_uids.length > 0) {
        if (!ev.accepted_uids.includes(currentUid)) {
          ev.accepted_uids.push(currentUid);
          updateAccepted(ev.uid, currentUid);
        } else {
          //TODO : disable the accept button if already accepted
          alert("You have accepted this event");
        }
      } else {
        const uids = ev.accepted_uids
          ? (ev.accepted_uids[0] = currentUid)
          : [currentUid];
        updateAccepted(ev.uid, uids);
      }
    } else {
      alert("Cannot accept your own event");
    }
  };

  return (
    <div>
      <p>Description : {ev.description}</p>
      <ul>
        Accepted UIDs :
        {ev.accepted_uids && ev.accepted_uids.length > 0 ? (
          ev.accepted_uids.map((uid) => {
            return <li key={uid}>{uid}</li>;
          })
        ) : (
          <li>-</li>
        )}
      </ul>
      <button onClick={acceptEvent}>Accept</button>
    </div>
  );
}

export default EventMarker;
