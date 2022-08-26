import { useState } from 'react';
import './App.css';
import { PAGE_MODE_OFFLINE, PAGE_MODE_ONLINE } from './Constants';
import { auth, signInWithGoogle } from './Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';

function App() {
	const [user] = useAuthState(auth);
	const [mode, setMode] = useState(PAGE_MODE_ONLINE);

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
			<section>
				{user ? <Navigate to='/' replace /> : <Navigate to='/login' replace />}
			</section>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
			</Routes>
		</>
	);
}

export default App;
