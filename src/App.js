import { useEffect, useState } from 'react';
import './App.css';
import { PAGE_MODE_OFFLINE, PAGE_MODE_ONLINE } from './Constants';
import { auth } from './Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import React from 'react';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import { fetchToken, onMessageListener } from './Firebase';

import {useCollectionData} from 'react-firebase-hooks/firestore'
import { useNavigate, Route, Routes } from 'react-router-dom';

function App() {
	const navigate = useNavigate();
	const [user, loading, error] = useAuthState(auth);
	useEffect(() => {
		if(!loading){
			if(user) navigate("/")
			else navigate("/login")
		}
	}, [loading]);

	useEffect(() => {
		if(!loading){
			if(user) navigate("/")
			else navigate("/login")
		}
	}, [user]);

	return (
		<>
			{loading ? (
				<div>Is loading...</div>
			) : (
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
				</Routes>
			)}
		</>
	);
}

export default App;
