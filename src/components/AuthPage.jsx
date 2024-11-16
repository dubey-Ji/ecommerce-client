import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
// import Login from './Login';
// import Signup from './Signup';
import Login from './Login';
import Signup from './Signup';
import { useUser } from '../context/UserContext';

const AuthPages = ({login}) => {
  const [isLogin, setIsLogin] = useState(login);
  const { userData } = useUser();

  useEffect(() => {
    setIsLogin(login);
  }, [login]);

  return (
    <div>
      {isLogin && userData?.token ? (
        <Navigate to="/" />
      ) : (
        isLogin ? (
          <Login />
        ) : userData?.token ? (
          <Navigate to="/" />
        ) : (
          <Signup />
        )
      )}
    </div>
  );
};

export default AuthPages;