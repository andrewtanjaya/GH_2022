import { useEffect } from 'react';
import { Marker } from 'react-leaflet';

import PopUpWithLocation from '../Components/PopUpWithLocation/PopUpWithLocation';
import { updateAccepted } from '../Database';

import { Icon } from 'leaflet';

// export const icon = new Icon({
//   iconUrl: '/skateboarding.svg',
//   iconSize: [25, 25],
// });

export default function AddMarker({ event, position, user }) {
  /*
	description: string
	position : {
	 	lat: -6.17651,
	 	lng: 106.790108,
	 }
	*/
	 useEffect(()=>{
		console.log("event", event)
	 },[])
  const acceptEvent = (e) => {
    e.preventDefault();
    const currentUid = sessionStorage.getItem('uid');
    if (currentUid !== event.uid) {
      if (event.accepted_uids && event.accepted_uids.length > 0) {
        if (!event.accepted_uids.includes(currentUid)) {
          event.accepted_uids.push(currentUid);
          updateAccepted(event.uid, currentUid);
        } else {
          alert('You have accepted this event');
        }
      } else {
        const uids = event.accepted_uids
          ? (event.accepted_uids[0] = currentUid)
          : [currentUid];
        updateAccepted(event.uid, uids);
      }
    } else {
      alert('Cannot accept your own event');
    }
  };

  return position === null && user ? null : (
    <Marker
      position={position}
      icon={
        new Icon({
          iconUrl: user
            ? 'https://cdn.icon-icons.com/icons2/2596/PNG/512/thinking_problem_icon_154732.png'
            : 'https://cdn.icon-icons.com/icons2/2596/PNG/512/check_one_icon_155665.png',
          iconSize: [25, 25],
        })
      }
    >
      <PopUpWithLocation
        user={user}
        ev={event}
        position={position}
        acceptCallback={acceptEvent}
      />
    </Marker>
  );
}
