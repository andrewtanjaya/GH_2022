import SignInBtn from '../../Components/SignInBtn/SignInBtn';
import './Login.scss';

export default function Login() {
	return (
		<div className='login'>
			<div className='title'>
				<h1>HELP ME !</h1>
				<SignInBtn />
			</div>
		</div>
	);
}
