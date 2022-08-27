import React, { useState, useEffect } from 'react';
import './Home.scss';
import { useMapEvents, useMap } from 'react-leaflet/hooks';

import { Icon } from 'leaflet';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

import SignOutBtn from '../../Components/SignOutBtn/SignOutBtn';

import AddMarker from '../../Utils/AddMarker';

import GetCurrentLocation from '../../Utils/GetCurrentPosition';

import {
	auth,
	db,
	eventRef,
	fetchToken,
	onMessageListener,
	usersRef,
} from '../../Firebase';
import { PAGE_MODE_OFFLINE, PAGE_MODE_ONLINE } from '../../Constants';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, orderBy, query, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import SOSBtn from '../../Components/SOSBtn/SOSBtn';
import { Event } from '../../Model/Event';
import EventMarker from '../../Components/EventMarker/EventMarker';
import { updatePosition } from '../../Database';

function LocationMarker({eventMarker}) {
	const [position, setPosition] = useState(null);
	const map = useMapEvents({
		click() {
			map.locate();
		},
		locationfound(e) {
			setPosition(e.latlng);
			console.log("found", e.latlng)
			map.flyTo(e.latlng, map.getZoom());

			// updatePosition(sessionStorage.getItem("uid"), e.latlng)
		},
	});

	useEffect(()=>{
		map.locate();
		console.log("duar", position)
	},[])

	return position === null ? <></> : <AddMarker ev={eventMarker} position={position} />;
}

export default function Home() {
	const [mode, setMode] = useState(PAGE_MODE_ONLINE);
	const [googleUser, loadingAuth] = useAuthState(auth);

	const [notification, setNotification] = useState({ title: '', body: '' });
	const [show, setShow] = useState(false);
	const [deviceTokens, setDeviceTokens] = useState([]);
	const [cachedUser, setCachedUser] = useState({});

	const [mockEvent, setMockEvent] = useState(
		new Event(
			sessionStorage.getItem('uid'),
			'SOS',
			'SOS nih butuh bantuan!',
			0,
			0,
			[]
		)
	);
	// TODO
	// !! cache fetched user here !!
	// get user [logged in user] from db, if success set data to LocalStorage + set to Online Mode
	// if failed, get data from localstorage and set data to state + set to Offline Mode

	const q = query(usersRef, where('uid', '==', sessionStorage.getItem('uid')));
	const [currentUser, loading, error] = useCollectionData(q, {
		idField: 'uid',
	});
	const [events, loadingEvents, errorEvents] = useCollectionData(eventRef, {
		idField: 'uid',
	});

	useEffect(() => {
		if (error) {
			setMode(PAGE_MODE_OFFLINE);
			setCachedUser(localStorage.getItem('user'));
		}
	}, [error]);

	useEffect(() => {
		if (currentUser) localStorage.setItem('user', currentUser);
	}, [currentUser]);

	onMessageListener()
		.then((payload) => {
			setShow(true);
			setNotification({
				title: payload.notification.title,
				body: payload.notification.body,
			});
			console.log(payload);
		})
		.catch((err) => console.log('failed: ', err));

	const sendPush = () => {
		console.log(process.env.REACT_APP_FIREBASE_CLOUD_MESSAGING_KEY_API);

		const url = 'https://fcm.googleapis.com/fcm/send';

		fetch(url, {
			method: 'POST',
			body: JSON.stringify({
				registration_ids: deviceTokens,
				notification: {
					title: 'Test Notif From App',
					body: 'Test Notif From App',
				},
			}),
			headers: {
				'Content-Type': 'application/json',
				Connection: 'keep-alive',
				'Accept-Encoding': 'gzip, deflate, br',
				Host: '<calculated when request is sent>',
				'Content-Length': '<calculated when request is sent>',
				Accept: '*/*',
				Authorization:
					'key=' + process.env.REACT_APP_FIREBASE_CLOUD_MESSAGING_KEY_API,
			},
		})
			.then((response) => response.text())
			.then((html) => console.log(html));
	};

	return (
		<div>
			{mode === PAGE_MODE_OFFLINE ? (
				<p>Your are offline</p>
			) : (
				<p>Your are online</p>
			)}
			<div>
				<p>Notif Title : {notification.title}</p>
				<p>Notif Body : {notification.body}</p>
			</div>
			{loading ? (
				<pre>loading please wait...</pre>
			) : error ? (
				<pre>{cachedUser}</pre>
			) : (
				<pre>{JSON.stringify(currentUser)}</pre>
			)}

			<button onClick={sendPush}>Send Notif</button>

			<SOSBtn myEvent={mockEvent} />
			<SignOutBtn currentUser={currentUser} />

			{loadingEvents ? (
				<pre>loading Event please wait...</pre>
			) : (
				events.map((event) => {
					return event ? <EventMarker key={event.uid} ev={event} /> : <></>;
				})
			)}

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

				{/* loop data user then add marker */}
				{/* <AddMarker
					description={'testing'}
					position={{
						lat: -6.27651,
						lng: 106.890108,
					}}
				/> */}
			</MapContainer>

			<SignOutBtn />
			<button onClick={GetCurrentLocation}>Get Current Location</button>
		</div>
	);
}
