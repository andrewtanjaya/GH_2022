import { useEffect } from 'react';
import './App.css';
import { auth } from './Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import React from 'react';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import { useNavigate, Route, Routes } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    if (!loading) {
      if (user) navigate('/');
      else navigate('/login');
    }
  }, [loading]);

  useEffect(() => {
    if (!loading) {
      if (user) navigate('/');
      else navigate('/login');
    }
  }, [user]);
  const antIcon = <LoadingOutlined style={{ fontSize: 32, color : "black" }} spin />;

  return (
    <>
      {loading ? (
        <div className='loading-spinner'><Spin indicator={antIcon} /></div>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </>
  );
}

export default App;
