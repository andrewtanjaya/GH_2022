import { Marker } from 'react-leaflet';

import PopUpWithLocation from '../Components/PopUpWithLocation/PopUpWithLocation';
import { deleteEvent, updateAccepted } from '../Database';

import UserMarkerIcon from '../Components/UserMarkerIcon/UserMarkerIcon';

export default function AddMarker({ currentUser, event, position, user }) {
  /*
	description: string
	position : {
	 	lat: -6.17651,
	 	lng: 106.790108,
	 }
	*/

	const dismissEvent = () =>{
		const currentUid = currentUser[0].uid;
		if(currentUid === event.uid){
			deleteEvent(currentUid)
		}else{
			alert("Cannot dismiss others event")
		}
	}

  const acceptEvent = (e) => {
    e.preventDefault();
	var found = false;
	const currentUid = currentUser[0].uid;
	for(let i = 0; i< event.accepted_uids;i++){
		if(event.accepted_uids[i] === currentUid){
			found = true
			break
		}
	}
    let newAccept = { uid: currentUid, photoUrl: currentUser[0].photoUrl };
    if(event){
		if (currentUid !== event.uid) {
			if (event.accepted_uids && event.accepted_uids.length > 0) {
			  if (!found) {
				event.accepted_uids.push(newAccept);
				updateAccepted(event.uid, event.accepted_uids);
			  } else {
				alert('You have accepted this event');
			  }
			} else {
			  if (event.accepted_uids) {
				event.accepted_uids[0] = newAccept;
			  } else {
				event.accepted_uids = [];
				event.accepted_uids.push(newAccept);
			  }
			  updateAccepted(event.uid, event.accepted_uids);
			}
		  } else {
			alert('Cannot accept your own event');
		  }
	}
  };

  return position === null && user ? null : (
    <Marker
      position={position}
      icon={
        user
          ? UserMarkerIcon({ url: user.photoUrl })
          : UserMarkerIcon({ url: './asset/event.png' })
      }
    >
      <PopUpWithLocation
        user={user}
        event={event}
        position={position}
        acceptCallback={acceptEvent}
		dismissCallback={dismissEvent}
      />
    </Marker>
  );
}
