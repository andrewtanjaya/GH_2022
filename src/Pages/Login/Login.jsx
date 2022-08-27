import SignInBtn from '../../Components/SignInBtn/SignInBtn';
import { fetchToken } from '../../Firebase';
import './Login.scss';

export default function Login() {
  fetchToken();
  return (
    <div className="login">
		<img className='map-img' src='./asset/shake-hand.png' />
        <h1 className='title'>GOTONG ROYONG</h1>
		<p className='subtitle'>Make help easier to find 🎉</p>
        <SignInBtn />
    </div>
  );
}
