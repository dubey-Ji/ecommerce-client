import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();

    const [api, contextHolder] = notification.useNotification();
    const showNotification = (type, message) => {
        api[type]({
            message: message,
        })
    }
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLogin(true);
        }
    }, []);
    useEffect(() => {
        if (isLogin) {
            navigate('/admin/dashboard');
        }
    }, [isLogin]);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.request({
                method: 'POST',
                url: 'http://localhost:8000/api/auth/admin-login',
                data: { email, password },
                withCredentials: true
            });
            if (response.data.success) {
                localStorage.setItem('token', response.data.data.token);
                localStorage.setItem('isAdmin', response.data.data.isAdmin);
                navigate('/admin/dashboard/add-product');
            } else {
                showNotification('error', 'Invalid email or password');
            }
        } catch (error) {
            showNotification('error', 'Invalid email or password');
        }   
    }

    return (
        <>
            {contextHolder}
            <div className="flex justify-center items-center h-screen">
                <form className="bg-white p-6 rounded shadow-md w-96">
                <h1 className="text-xl font-bold mb-4">Welcome to Ecommerce Admin</h1> 
                <p className="mb-4">Please login to continue</p>
                <input type="text" placeholder="Username" className="border border-gray-300 p-2 mb-4 w-full rounded" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" className="border border-gray-300 p-2 mb-4 w-full rounded" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600" onClick={handleSubmit}>Login</button>
                </form>
            </div>
        </>
    )
}

export default AdminLogin