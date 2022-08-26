import { Marker } from 'react-leaflet';

import PopUpWithLocation from '../Components/PopUpWithLocation/PopUpWithLocation';

export default function AddMarker({ description, position }) {
	/*
	description: string
	position : {
	 	lat: -6.17651,
	 	lng: 106.790108,
	 }
	*/
	return position === null ? null : (
		<Marker position={position}>
			<PopUpWithLocation description={description} position={position} />
		</Marker>
	);
}
