import { Marker } from 'react-leaflet';

import PopUpWithLocation from '../Components/PopUpWithLocation/PopUpWithLocation';
import { deleteEvent, updateAccepted } from '../Database';

import UserMarkerIcon from '../Components/UserMarkerIcon/UserMarkerIcon';
import getEventIcon from '../Utils/GetEventIcon';
import { openNotification } from '../Utils/OpenNotification';

export default function AddMarker({
  event,
  position,
  user,
  currentUser,
  isEvent,
}) {
  /*
	description: string
	position : {
	 	lat: -6.17651,
	 	lng: 106.790108,
	 }
	*/
  const dismissEvent = () => {
    const currentUid = currentUser[0].uid;
    if (currentUid === event.uid) {
      deleteEvent(currentUid);
      openNotification({
        type: 'success',
        message: 'Event dismissed !',
      });
    } else {
      openNotification({
        type: 'error',
        message: 'Cannot dismiss others event',
      });
    }
  };
  const acceptEvent = (e) => {
    e.preventDefault();
    var found = false;
    const currentUid = currentUser[0].uid;
    for (let i = 0; i < event.accepted_uids.length; i++) {
      if (event.accepted_uids[i].uid === currentUid) {
        found = true;
        break;
      }
    }
    let newAccept = { uid: currentUid, photoUrl: currentUser[0].photoUrl };
    if (event) {
      if (currentUid !== event.uid) {
        if (event.accepted_uids && event.accepted_uids.length > 0) {
          if (!found) {
            event.accepted_uids.push(newAccept);
            updateAccepted(event.uid, event.accepted_uids);
            openNotification({
              type: 'success',
              message: 'Event Accepted !',
            });
          } else {
            openNotification({
              type: 'error',
              message: 'You have accepted this event',
            });
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
        openNotification({
          type: 'error',
          message: 'Cannot accept your own event',
        });
      }
    }
  };
  return position === null && user ? null : (
    <Marker
      position={position}
      icon={
        user
          ? UserMarkerIcon({
              url: user.photoUrl,
              isCurrentUser: currentUser ? true : false,
              isEvent: false,
            })
          : UserMarkerIcon({
              url: getEventIcon({
                type: event.type,
              }),
              isEvent: true,
            })
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
