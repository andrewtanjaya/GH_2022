import './App.css';
import { auth, signInWithGoogle } from './Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function App() {
	const [user] = useAuthState(auth);

	return (
		<div className='App'>
			<section>{user ? <SignOut /> : <SignIn />}</section>
		</div>
	);
}

function SignIn() {
	return <button onClick={signInWithGoogle}>Sign in with Google</button>;
}

function SignOut() {
	return (
		auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
	);
}

export default App;
