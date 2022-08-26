import React from 'react';
import './Home.scss';

import { Icon } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import SignOutBtn from '../../Components/SignOutBtn/SignOutBtn';

export default function Home() {
	return (
		<>
			<MapContainer
				center={[-6.17511, 106.865036]}
				zoom={13}
				scrollWheelZoom={false}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>
			</MapContainer>
			<div>
				<SignOutBtn />
			</div>
		</>
	);
}
