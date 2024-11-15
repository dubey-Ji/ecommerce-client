import React, { useState, useEffect } from 'react';
import { Layout, Table, Button, InputNumber, Space, Typography, Divider, Select, Empty } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axiosInstance from '../interceptors/axios.http';
import { useCart } from '../context/CartContext';


const { Content } = Layout;
const { Title, Text } = Typography;

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const { removeFromCart } = useCart();

  const fetchCartItems = async () => {
    try {
      const response = await axiosInstance.request({
        method: 'GET',
        url: '/cart',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        withCredentials: true
      });
      if (response.data.success && response.data.data.length > 0) {
        let data = [];
        response.data.data.forEach(item => {
          data.push({
            category: item.categoryName,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })
        })
        setCartItems(data);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCartItems();
  }, []);

  const dynamicColumns = Object.keys(cartItems[0] || {}).filter(key => key !== '_id').map(key => ({
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
            <Button onClick={() => handleQuantityChange(record._id, text - 1)}>-</Button>
            <InputNumber min={1} max={10} value={text} onChange={(value) => handleQuantityChange(record._id, value)} />
            <Button onClick={() => handleQuantityChange(record._id, text + 1)}>+</Button>
          </Space>
        );
      } else if (key === 'total') {
        return `$${(record.price * record.quantity).toFixed(2)}`;
      } else if (key === 'description') {
        return <div dangerouslySetInnerHTML={{ __html: text }} />;
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
      <Button icon={<DeleteOutlined />} onClick={() => handleRemoveItem(record._id)} />
    ),
  });

  const handleQuantityChange = (id, newQuantity) => {
    setCartItems(cartItems.map(item => 
      item._id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleRemoveItem = async (productId) => {
    try {
      await removeFromCart(productId);
      fetchCartItems();
    } catch (error) {
      console.log(error);
    }
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
            {
              cartItems.length > 0 ? (
                <Table
                  columns={dynamicColumns}
                  dataSource={cartItems}
                  pagination={false}
                  rowKey="_id"
                  scroll={{ x: true }}
                />
              ) : (
                <Empty />
              )
            }
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