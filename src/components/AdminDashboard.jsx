import { useAdmin } from '../context/AdminContext.jsx';
import { useEffect } from 'react';
import useGetCookie from './useGetCookie.jsx';
import AdminSidebar from './AdminSidebar.jsx';
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
    const { loginAdmin } = useAdmin();
    const isAdmin = useGetCookie('isAdmin');
    useEffect(() => {
        const token = localStorage.getItem('token');
        loginAdmin({
            token: token,
            isAdmin: isAdmin
        });
    }, [])
    
    return (
        <div>
            <AdminSidebar />
            <Outlet />
        </div>
    )
}

export default AdminDashboard