import React, { useState, useEffect } from 'react';
// import Login from './Login';
// import Signup from './Signup';
import Login from './Login';
import Signup from './Signup';

const AuthPages = ({login}) => {
  const [isLogin, setIsLogin] = useState(login);

  useEffect(() => {
    setIsLogin(login);
  }, [login]);

  return (
    <div>
      {isLogin ? (
        <Login />
      ) : (
        <Signup />
      )}
    </div>
  );
};

export default AuthPages;