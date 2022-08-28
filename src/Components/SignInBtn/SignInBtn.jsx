import { useState } from 'react';
import { signInWithGoogle } from '../../Firebase';
import './SignInBtn.scss';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

export default function SignInBtn() {
  const [loading, setLoading] = useState(false);
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 24, color: 'white' }} spin />
  );

  return loading ? (
    <div className="signin-container">
      <Spin indicator={antIcon} />
    </div>
  ) : (
    <div className="signin-container">
      <img src="./asset/google-icon.png" alt="icon-google" />
      <button
        className="google-btn"
        onClick={() => {
          signInWithGoogle(setLoading);
        }}
      >
        Sign in with Google
      </button>
    </div>
  );
}
