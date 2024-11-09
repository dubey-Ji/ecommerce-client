import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';  
import { useAdmin } from '../context/AdminContext.jsx';
import axiosInstance from '../interceptors/axios.http';

const AdminLogout = () => {
    const navigate = useNavigate();
    const { logoutAdmin } = useAdmin();

    useEffect(() => {
        axiosInstance.request({
            method: 'POST',
            url: '/auth/admin-logout',
            withCredentials: true
        })
        .then(response => {
            // if (response.data.success) {        
                console.log('response.data', response.data);
                console.log('logout success')
                logoutAdmin();
                navigate('/admin');
        })
        .catch(error => {
            if (error.response.data.success === false) {
                logoutAdmin();
                navigate('/admin');
                console.error('Error:', error);
            }
        });
    }, [navigate]);
    return (
        <>
        </>
    )
}

export default AdminLogout