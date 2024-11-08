import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        axios.post('http://localhost:8000/api/auth/logout')
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