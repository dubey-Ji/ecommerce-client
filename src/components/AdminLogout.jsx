import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';  
import { useAdmin } from '../context/AdminContext.jsx';

const AdminLogout = () => {
    const navigate = useNavigate();
    const { logoutAdmin } = useAdmin();

    useEffect(() => {
        // axios.post('http://localhost:8000/api/auth/admin-logout')
        //     .then(response => {
        //         console.log(response.data);
        //     })
        //     .catch(error => {
        //         console.error('Error:', error);
        //     });
        axios.request({
            method: 'POST',
            url: 'http://localhost:8000/api/auth/admin-logout',
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