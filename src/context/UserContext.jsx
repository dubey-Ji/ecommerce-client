import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token) {
      setUserData({ token: token, user: JSON.parse(user) });
    }
  }, []);

  const loginUser = (data) => {
    setUserData(data);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  };

  const logoutUser = () => {
    axios.request({
      method: 'GET',
      url: 'http://localhost:8000/api/auth/logout',
      withCredentials: true
    }).then(response => {
      console.log('response', response)
    }).catch(error => {
      console.log('error', error)
    })
    setUserData(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    localStorage.removeItem('wishlist');
  };

  return (
    <UserContext.Provider value={{ userData, setUserData, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};