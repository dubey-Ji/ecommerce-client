import { createContext, useState, useContext, useEffect } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [adminData, setAdminData] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin');
    if (token) {
      setAdminData({
        token: token,
        isAdmin: isAdmin
      });
    }
  }, []);

  const loginAdmin = (data) => {
    setAdminData(data);
    localStorage.setItem('token', data.token);
  };

  const logoutAdmin = () => {
    setAdminData(null);
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
  };

  return (
    <AdminContext.Provider value={{ adminData, loginAdmin, logoutAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  return useContext(AdminContext);
};
