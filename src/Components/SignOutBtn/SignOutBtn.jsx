import { auth } from './Firebase';

export default function SignOutBtn() {
	return (
		auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
	);
}
