import React, { useState, useEffect } from 'react';
import './Home.scss';
import { useMapEvents, useMap } from 'react-leaflet/hooks';

import { Icon } from 'leaflet';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

import SignOutBtn from '../../Components/SignOutBtn/SignOutBtn';
import AddMarker from '../../Utils/AddMarker';

import GetCurrentLocation from '../../Utils/GetCurrentPosition';

function LocationMarker() {
	const [position, setPosition] = useState(null);
	const map = useMapEvents({
		click() {
			map.locate();
		},
		locationfound(e) {
			setPosition(e.latlng);
			map.flyTo(e.latlng, map.getZoom());

			// bisa dipasang UPDATE current user location (lat, ltg)
		},
	});

	const description = 'You are here';
	return <AddMarker description={description} position={position} />;
}

function MyComponent() {
	const map = useMap();
	console.log('map center:', map.getCenter());
	return null;
}

export default function Home() {
	return (
		<>
			<MapContainer
				id='map'
				center={[-6.17511, 106.865036]}
				zoom={13}
				scrollWheelZoom={false}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>
				<LocationMarker />
				<AddMarker
					description={'testing'}
					position={{
						lat: -6.27651,
						lng: 106.890108,
					}}
				/>
				<MyComponent />
			</MapContainer>

			<SignOutBtn />
			<button onClick={GetCurrentLocation}>Get Current Location</button>
		</>
	);
}
