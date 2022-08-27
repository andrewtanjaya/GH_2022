import { useEffect } from 'react';
import { Marker } from 'react-leaflet';

import { renderToStaticMarkup } from 'react-dom/server';

import PopUpWithLocation from '../Components/PopUpWithLocation/PopUpWithLocation';
import { updateAccepted } from '../Database';

import { Icon, divIcon } from 'leaflet';
import './AddMarker.scss';

// function GetIcon({user}) {
//   if (user){
//       user.
//   }
//   reutn user ? user.photoUrl : './MarkerAsset/event.png',
// }

// const icon = L.divIcon({
//   className: 'custom-icon',
//   html: ReactDOMServer.renderToString(<Icon perc={this.state.key} />),
// });

const iconMarkup = (url) =>
  renderToStaticMarkup(
    <div className="markeruser-icon-marker">
      <img src={url} className="markeruser-icon-marker-img" alt="" />
    </div>,
  );

const customMarkerIcon = (url) =>
  divIcon({
    html: iconMarkup(url),
  });

export default function AddMarker({ event, position, user }) {
  /*
	description: string
	position : {
	 	lat: -6.17651,
	 	lng: 106.790108,
	 }
	*/

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
    <Marker position={position} icon={customMarkerIcon(user.photoUrl)}>
      <PopUpWithLocation
        user={user}
        event={event}
        position={position}
        acceptCallback={acceptEvent}
      />
    </Marker>
  );
}
