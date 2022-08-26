import { useState } from 'react';
import './App.css';
import { PAGE_MODE_OFFLINE, PAGE_MODE_ONLINE } from './Constants';

function App() {
	const [mode, setMode] = useState(PAGE_MODE_ONLINE)

	// !! cache fetched user here !!
	// get user [logged in user] from db, if success set data to LocalStorage + set to Online Mode
	// if failed, get data from localstorage and set data to state + set to Offline Mode
	
	return (
		<div className='App'>
			{
				mode === PAGE_MODE_OFFLINE ? <p>Your are offline</p> :
				<p>Your are online</p>
			}
		</div>
	);
}

export default App;
