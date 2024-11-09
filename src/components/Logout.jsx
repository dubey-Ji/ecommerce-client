import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axiosInstance from '../interceptors/axios.http';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.request({
            method: 'POST',
            url: '/auth/logout',
            withCredentials: true
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [navigate]);

    return (
        <>
        </>
    )
}

export default Logout