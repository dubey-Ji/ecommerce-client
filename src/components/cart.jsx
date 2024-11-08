import React, { useState } from 'react';
import { Layout, Table, Button, Input, InputNumber, Space, Typography, Divider, Select } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Text } = Typography;

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Fitbit Sense Advanced Smartwatch with Tools for Heart Health, Stress...', category: 'Glossy black', size: 'XL', price: 199, quantity: 2, image: '/placeholder.svg?height=80&width=80' },
    { id: 2, name: 'iPhone 13 pro max-Pacific Blue-128GB storage', category: 'Glossy black', size: 'XL', price: 150, quantity: 2, image: '/placeholder.svg?height=80&width=80' },
    { id: 3, name: 'Apple MacBook Pro 13 inch-M1-8/256GB-space', category: 'Glossy Golden', size: '34mm', price: 65, quantity: 2, image: '/placeholder.svg?height=80&width=80' },
  ]);

  const dynamicColumns = Object.keys(cartItems[0]).filter(key => key !== 'id').map(key => ({
    title: key.charAt(0).toUpperCase() + key.slice(1),
    dataIndex: key,
    key: key,
    render: (text, record) => {
      if (key === 'image') {
        return (
          <Space>
            <img src={record.image}  style={{ width: 80, height: 80, objectFit: 'cover' }} />
          </Space>
        );
      } else if (key === 'price') {
        return `$${text}`;
      } else if (key === 'quantity') {
        return (
          <Space>
            <Button onClick={() => handleQuantityChange(record.id, text - 1)}>-</Button>
            <InputNumber min={1} max={10} value={text} onChange={(value) => handleQuantityChange(record.id, value)} />
            <Button onClick={() => handleQuantityChange(record.id, text + 1)}>+</Button>
          </Space>
        );
      } else if (key === 'total') {
        return `$${(record.price * record.quantity).toFixed(2)}`;
      } else {
        return text;
      }
    },
  })).sort((a, b) => a.dataIndex === 'image' ? -1 : b.dataIndex === 'image' ? 1 : 0);
  dynamicColumns.push({
    title: '',
    dataIndex: 'action',
    key: 'action',
    render: (_, record) => (
      <Button icon={<DeleteOutlined />} onClick={() => handleRemoveItem(record.id)} />
    ),
  });

  const handleQuantityChange = (id, newQuantity) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const itemsSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = 59;
  const tax = itemsSubtotal * 0.2; // Assuming 20% tax
  const shipping = 30;
  const total = itemsSubtotal - discount + tax + shipping;

  return (
    <Layout className="min-h-screen bg-gray-100">

      <Content className="container mx-auto py-8 px-4">

        <Title level={2}>Cart</Title>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <Table
              columns={dynamicColumns}
              dataSource={cartItems}
              pagination={false}
              rowKey="id"
              scroll={{ x: true }}
            />
            <div className="mt-4 text-right">
              <Text strong>Items subtotal : ${itemsSubtotal.toFixed(2)}</Text>
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <Title level={4}>Summary</Title>
                <Button type="link" icon={<EditOutlined />}>
                  Edit cart
                </Button>
              </div>
              <Select defaultValue="cash" style={{ width: '100%' }} className="mb-4">
                <Select.Option value="cash">Cash on Delivery</Select.Option>
                <Select.Option value="card">Credit Card</Select.Option>
              </Select>
              <Space direction="vertical" className="w-full">
                <div className="flex justify-between">
                  <Text>Items subtotal :</Text>
                  <Text>${itemsSubtotal.toFixed(2)}</Text>
                </div>
                <div className="flex justify-between">
                  <Text>Discount :</Text>
                  <Text className="text-red-500">-${discount.toFixed(2)}</Text>
                </div>
                <div className="flex justify-between">
                  <Text>Tax :</Text>
                  <Text>${tax.toFixed(2)}</Text>
                </div>
                <div className="flex justify-between">
                  <Text>Subtotal :</Text>
                  <Text>${(itemsSubtotal - discount + tax).toFixed(2)}</Text>
                </div>
                <div className="flex justify-between">
                  <Text>Shipping Cost :</Text>
                  <Text>${shipping.toFixed(2)}</Text>
                </div>
                <Divider />
                <div className="flex justify-between">
                  <Text strong>Total :</Text>
                  <Text strong>${total.toFixed(2)}</Text>
                </div>
              </Space>
              <Button type="primary" block className="mt-4">
                Proceed to check out
              </Button>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default CartPage;