import React, { useState } from 'react';
import { Layout, Table, Input, Button, Select, Space, Tabs, Avatar } from 'antd';
import { SearchOutlined, ExportOutlined, PlusOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;
const { Search } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

const CustomerListPage = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const columns = [
    {
      title: 'CUSTOMER',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <Avatar src={record.avatar} />
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: 'EMAIL',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'ORDERS',
      dataIndex: 'orders',
      key: 'orders',
      sorter: (a, b) => a.orders - b.orders,
    },
    {
      title: 'TOTAL SPENT',
      dataIndex: 'totalSpent',
      key: 'totalSpent',
      render: (value) => `$ ${value}`,
      sorter: (a, b) => a.totalSpent - b.totalSpent,
    },
    {
      title: 'CITY',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'LAST SEEN',
      dataIndex: 'lastSeen',
      key: 'lastSeen',
    },
    {
      title: 'LAST ORDER',
      dataIndex: 'lastOrder',
      key: 'lastOrder',
    },
  ];

  const data = [
    {
      key: '1',
      name: 'Carry Anna',
      avatar: '/placeholder.svg?height=32&width=32',
      email: 'anna34@gmail.com',
      orders: 89,
      totalSpent: 23987,
      city: 'Budapest',
      lastSeen: '34 min ago',
      lastOrder: 'Dec 12, 12:56 PM',
    },
    {
      key: '2',
      name: 'Milind Mikuja',
      avatar: '/placeholder.svg?height=32&width=32',
      email: 'mimiku@yahoo.com',
      orders: 76,
      totalSpent: 21567,
      city: 'Manchester',
      lastSeen: '6 hours ago',
      lastOrder: 'Dec 9, 2:28 PM',
    },
    // Add more customer data here...
  ];

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <Layout className='bg-gray-100 h-screen'>
      <Header className="bg-gray-100 pt-[1.5rem]">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Customers</h1>
        </div>
      </Header>
      <Content className="container mx-auto py-8 px-6">
        <Tabs defaultActiveKey="1">
          <TabPane tab="All (68817)" key="1" />
          <TabPane tab="New (6)" key="2" />
          <TabPane tab="Abandoned checkouts (17)" key="3" />
          <TabPane tab="Locals (6,810)" key="4" />
          <TabPane tab="Email subscribers (8)" key="5" />
          <TabPane tab="Top reviews (2)" key="6" />
        </Tabs>
        <div className="flex justify-between items-center my-4">
          <Space>
            <Search
              placeholder="Search customers"
              onSearch={value => console.log(value)}
              style={{ width: 300 }}
            />
            <Select defaultValue="country" style={{ width: 120 }}>
              <Option value="country">Country</Option>
            </Select>
            <Select defaultValue="vip" style={{ width: 120 }}>
              <Option value="vip">VIP</Option>
            </Select>
            <Button>More filters</Button>
          </Space>
          <Space>
            <Button type='primary' icon={<ExportOutlined />}>Export</Button>
            {/* <Button type="primary" icon={<PlusOutlined />}>Add customer</Button> */}
          </Space>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          pagination={{
            total: 15,
            showSizeChanger: false,
            showQuickJumper: false,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          }}
        />
      </Content>
    </Layout>
  );
};

export default CustomerListPage;