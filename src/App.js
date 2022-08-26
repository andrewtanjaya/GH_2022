import './App.css';
import { auth, signInWithGoogle } from './Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';

function App() {
	const [user] = useAuthState(auth);

	return (
		<>
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
