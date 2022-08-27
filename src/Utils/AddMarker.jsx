import { Marker } from "react-leaflet";

import PopUpWithLocation from "../Components/PopUpWithLocation/PopUpWithLocation";
import { updateAccepted } from "../Database";

export default function AddMarker({ ev, position }) {
  /*
	description: string
	position : {
	 	lat: -6.17651,
	 	lng: 106.790108,
	 }
	*/
  const acceptEvent = (e) => {
    e.preventDefault();
    const currentUid = sessionStorage.getItem("uid");
    if (currentUid !== ev.uid) {
      if (ev.accepted_uids && ev.accepted_uids.length > 0) {
        if (!ev.accepted_uids.includes(currentUid)) {
          ev.accepted_uids.push(currentUid);
          updateAccepted(ev.uid, currentUid);
        } else {
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
  return position === null ? null : (
    <Marker position={position}>
      <PopUpWithLocation
        ev={ev}
        position={position}
        acceptCallback={acceptEvent}
      />
    </Marker>
  );
}
