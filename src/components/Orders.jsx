import React, { useState } from 'react';
import { Layout, Table, Input, Button, Select, Space, Tabs, Tag, Avatar } from 'antd';
import { SearchOutlined, ExportOutlined, PlusOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;
const { Search } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

const OrderListPage = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const columns = [
    {
      title: 'ORDER',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      render: (text) => <a href="#">{text}</a>,
    },
    {
      title: 'TOTAL',
      dataIndex: 'total',
      key: 'total',
      render: (value) => `$${value}`,
      sorter: (a, b) => a.total - b.total,
    },
    {
      title: 'CUSTOMER',
      dataIndex: 'customer',
      key: 'customer',
      render: (text, record) => (
        <Space>
          <Avatar src={record.avatar} />
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: 'PAYMENT STATUS',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (status) => {
        let color = 'default';
        if (status === 'COMPLETE') color = 'success';
        if (status === 'PENDING') color = 'warning';
        if (status === 'FAILED') color = 'error';
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'FULFILLMENT STATUS',
      dataIndex: 'fulfillmentStatus',
      key: 'fulfillmentStatus',
      render: (status) => {
        let color = 'default';
        if (status === 'COMPLETED') color = 'success';
        if (status === 'PARTIALLY FULFILLED') color = 'warning';
        if (status === 'UNFULFILLED') color = 'error';
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'DELIVERY TYPE',
      dataIndex: 'deliveryType',
      key: 'deliveryType',
    },
    {
      title: 'DATE',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
  ];

  const data = [
    {
      key: '1',
      orderNumber: '#2453',
      total: 87,
      customer: 'Carry Anna',
      avatar: '/placeholder.svg?height=32&width=32',
      paymentStatus: 'COMPLETE',
      fulfillmentStatus: 'CANCELLED',
      deliveryType: 'Cash on delivery',
      date: 'Dec 12, 12:56 PM',
    },
    {
      key: '2',
      orderNumber: '#2452',
      total: 7264,
      customer: 'Milind Mikuja',
      avatar: '/placeholder.svg?height=32&width=32',
      paymentStatus: 'CANCELLED',
      fulfillmentStatus: 'READY TO PICKUP',
      deliveryType: 'Free shipping',
      date: 'Dec 9, 2:28PM',
    },
    // Add more order data here...
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
          <h1 className="text-2xl font-bold">Orders</h1>
        </div>
      </Header>
      <Content className="container mx-auto py-8 px-6">
        <Tabs defaultActiveKey="1">
          <TabPane tab="All (68817)" key="1" />
          <TabPane tab="Pending payment (6)" key="2" />
          <TabPane tab="Unfulfilled (17)" key="3" />
          <TabPane tab="Completed (6,810)" key="4" />
          <TabPane tab="Refunded (8)" key="5" />
          <TabPane tab="Failed (2)" key="6" />
        </Tabs>
        <div className="flex justify-between items-center my-4">
          <Space>
            <Search
              placeholder="Search orders"
              onSearch={value => console.log(value)}
              style={{ width: 300 }}
            />
            <Select defaultValue="paymentStatus" style={{ width: 150 }}>
              <Option value="paymentStatus">Payment status</Option>
            </Select>
            <Select defaultValue="fulfillmentStatus" style={{ width: 150 }}>
              <Option value="fulfillmentStatus">Fulfillment status</Option>
            </Select>
            <Button>More filters</Button>
          </Space>
          <Space>
            <Button type='primary' icon={<ExportOutlined />}>Export</Button>
            {/* <Button type="primary" icon={<PlusOutlined />}>Add order</Button> */}
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

export default OrderListPage;