import { Button } from 'antd';
import SignInBtn from '../../Components/SignInBtn/SignInBtn';
import { fetchToken } from '../../Firebase';
import './Login.scss';
import SOSForm from '../../Components/SOSForm/SOSForm';

export default function Login() {
  fetchToken();
  return (
    <div className="login">
		<img className='map-img' src='./asset/hand-img.png' />
        <h1 className='title'>GOTONG ROYONG</h1>
		<p className='subtitle'>Make help easier to find 🎉</p>
        <SignInBtn />
    </div>
  );
}
