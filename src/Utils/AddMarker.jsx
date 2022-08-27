import { useEffect } from 'react';
import { Marker } from 'react-leaflet';

import PopUpWithLocation from '../Components/PopUpWithLocation/PopUpWithLocation';
import { updateAccepted } from '../Database';

export default function AddMarker({ event, position, user }) {
	/*
	description: string
	position : {
	 	lat: -6.17651,
	 	lng: 106.790108,
	 }
	*/
	useEffect(() => {
		console.log('user 1', user);
	}, []);
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
	return position === null ? null : (
		<Marker position={position}>
			<PopUpWithLocation
				user={user}
				ev={event}
				position={position}
				acceptCallback={acceptEvent}
			/>
		</Marker>
	);
}
