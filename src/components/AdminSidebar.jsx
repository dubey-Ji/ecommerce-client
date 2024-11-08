import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { 
  PlusOutlined, 
  ShoppingOutlined, 
  UserOutlined, 
  FileTextOutlined, 
  ShoppingCartOutlined, 
  FileSearchOutlined, 
  RollbackOutlined, 
  LogoutOutlined
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useLocation();

  const menuItems = [
    { key: 'add-product', icon: <PlusOutlined />, label: 'Add product', to: '/admin/dashboard/add-product' },
    { key: 'products', icon: <ShoppingOutlined />, label: 'Products', to: '/admin/dashboard/products' },
    { key: 'customers', icon: <UserOutlined />, label: 'Customers', to: '/admin/dashboard/customers' },
    { key: 'orders', icon: <ShoppingCartOutlined />, label: 'Orders', to: '/admin/dashboard/orders' },
    { key: 'logout', icon: <LogoutOutlined />, label: 'Logout', to: '/admin/logout' },
    // { key: 'order-details', icon: <FileSearchOutlined />, label: 'Order details', to: '/order-details' },
    // { key: 'refund', icon: <RollbackOutlined />, label: 'Refund', to: '/refund' },
  ];

  return (
    <Sider 
      collapsible 
      collapsed={collapsed} 
      onCollapse={setCollapsed}
      className="min-h-screen bg-white border-r-2 border-gray-200"
    >
      <div className="h-8 m-4 flex items-center justify-center">
         {/* Placeholder for logo */}
         <h1 className='text-2xl font-bold'>Ecommerce</h1>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[router.pathname.slice(1)]}
        className=""
      >
        {menuItems.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.to}>
              {item.label}
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default Sidebar;