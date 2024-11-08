import React, { useState } from 'react';
import { Dropdown, Menu, Input, Avatar, Button } from 'antd';
import { UserOutlined, DashboardOutlined, FileTextOutlined, SettingOutlined, QuestionCircleOutlined, UserAddOutlined, LogoutOutlined } from '@ant-design/icons';
import { useUser } from '../context/UserContext';

const ProfileDropdown = ({handleLogout}) => {
  const [visible, setVisible] = useState(false);
  const { user } = useUser()?.userData;
  console.log(user);
  const handleVisibleChange = (flag) => {
    setVisible(flag);
  };

  const menu = (
    <div className="bg-white rounded-lg shadow-lg p-4 w-80">
      <div className="flex flex-col items-center mb-4">
        <Avatar size={64} src="/placeholder.svg?height=64&width=64">{user?.name?.charAt(0)}</Avatar>
        <h2 className="mt-2 text-lg font-semibold">{user?.name}</h2>
      </div>
      <Menu className="border-none">
        <Menu.Item key="profile" icon={<UserOutlined />}>
          Profile
        </Menu.Item>
        <Menu.Item key="help" icon={<QuestionCircleOutlined />}>
          Help Center
        </Menu.Item>
      </Menu>
      <Button 
        type="default" 
        icon={<LogoutOutlined />} 
        className="w-full mt-4"
        onClick={handleLogout}
      >
        Sign out
      </Button>
      <div className="mt-4 text-center text-xs text-gray-500">
        <a href="#" className="mx-2">Privacy policy</a>
        <span>•</span>
        <a href="#" className="mx-2">Terms</a>
      </div>
    </div>
  );

  return (
    <Dropdown 
      overlay={menu} 
      trigger={['click']} 
      visible={visible}
      onVisibleChange={handleVisibleChange}
    >
      <Button className="border-none shadow-none bg-inherit" >
        <UserOutlined />
      </Button>
    </Dropdown>
  );
};

export default ProfileDropdown;