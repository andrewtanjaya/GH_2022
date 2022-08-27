import { signInWithGoogle } from '../../Firebase';
import './SignInBtn.scss'

export default function SignInBtn() {
  return <div className="signin-container">
	<img src="./asset/google-icon.png" alt="icon-google" />
	<button className='google-btn' onClick={signInWithGoogle}>Sign in with Google</button>
  </div>
}
