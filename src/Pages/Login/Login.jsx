import { Button } from 'antd';
import SignInBtn from '../../Components/SignInBtn/SignInBtn';
import { fetchToken } from '../../Firebase';
import './Login.scss';
import SOSForm from '../../Components/SOSForm/SOSForm';

export default function Login() {
  fetchToken();
  return (
    <div className="login">
      <div className="title">
        <h1>HELP ME !</h1>
        <SignInBtn />
        <SOSForm />
        {/* <Button type="primary">Button</Button> */}
      </div>
    </div>
  );
}
