import { useEffect, useState } from 'react';
import './App.css';
import { PAGE_MODE_OFFLINE, PAGE_MODE_ONLINE } from './Constants';
import { auth, signInWithGoogle } from './Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import { fetchToken, onMessageListener } from './Firebase';
import SignInBtn from './Components/SignInBtn/SignInBtn';

function App() {
	const [user, loading, error] = useAuthState(auth);
	const [mode, setMode] = useState(PAGE_MODE_ONLINE);

	// TODO
	// !! call fetchToken from firebase.js , pass setTokenFound and setToken state !!
	const [isTokenFound, setTokenFound] = useState(false);
	const [token, setToken] = useState('');
	const [notification, setNotification] = useState({ title: '', body: '' });
	const [show, setShow] = useState(false);
	const [deviceTokens, setDeviceTokens] = useState([]);

	useEffect(() => {
		fetchToken(setTokenFound, setToken);
		setDeviceTokens([
			'foKieJh02IxOkhNbdpXQlo:APA91bE1ngY3u29x45fG2t1uqfA7rJTKEI5SzJB1Rx2A77sSK6LBeuSmw33RpzNHNRkhr6oTUmHNk6Sn-MJ05_BIE17o0sV6i3fZY5_qhs3McGixU-_m-jE20DPvWZPUQ9byXo0yz3In',
			'fZX5TdVelcYyopruNl2QWW:APA91bE_MeSozWq1_a9yGkM42K50I3wl89xsgyhSUjJ2p7bxqhMYOOMRRT0_ZC-8gY2oqUMe98ac7englBMKxYec9nYlkRPdYLUwkCnGfuIkkgJS_Q3QScX9MmbO-bqtl1MfGbb5Psno',
		]);
	}, []);

	// TODO
	// !! cache fetched user here !!
	// get user [logged in user] from db, if success set data to LocalStorage + set to Online Mode
	// if failed, get data from localstorage and set data to state + set to Offline Mode

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
		<>
			{/* // !! cache fetched user here !! // get user [logged in user] from db, if
			success set data to LocalStorage + set to Online Mode // if failed, get
			data from localstorage and set data to state + set to Offline Mode */}
			{mode === PAGE_MODE_OFFLINE ? (
				<p>Your are offline</p>
			) : (
				<p>Your are online</p>
			)}
			<div>
				<p>Notif Title : {notification.title}</p>
				<p>Notif Body : {notification.body}</p>
			</div>

			<button onClick={sendPush}>Send Notif</button>
			{loading ? (
				<div>Is loading...</div>
			) : (
				<section>{user ? <Home /> : <Login />}</section>
			)}

			{/* <Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
			</Routes> */}
		</>
	);
}

export default App;
