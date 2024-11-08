import AdminSidebar from './AdminSidebar.jsx';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
    return (
        <div>
            <div className='flex'>
                <AdminSidebar />
                <div className='flex-1'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminLayout