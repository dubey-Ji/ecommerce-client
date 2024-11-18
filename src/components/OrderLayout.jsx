import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const OrderLayout = () => {
    return (
        <Layout>
            <Outlet />
        </Layout>
    )
}

export default OrderLayout;