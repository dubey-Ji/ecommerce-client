import React, { useState, useEffect } from 'react';
import { Table, Button, Image, Space, Dropdown, Menu } from 'antd';
import { MoreOutlined, ShoppingCartOutlined, DeleteOutlined } from '@ant-design/icons';
import { message } from 'antd';
import axiosInstance from '../interceptors/axios.http';
import { useUser } from '../context/UserContext';
import { useCart } from '../context/CartContext';

const WishlistTable = () => {
  const [wishlist, setWishlist] = useState([]);
  const { userData } = useUser();
  const { addToCart } = useCart();

  const fetchWishlist = async () => {
    try {
      const response = await axiosInstance.request({
        method: 'GET',
        url: `/wishlist`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        withCredentials: true
      });
      if (response.data.success && response.data.data.length > 0) {
        const wishListData = response.data.data.map(item => item.product);
        setWishlist(wishListData);
      } else {
        setWishlist([]);
      }
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleDelete = async (key) => {
    console.log('key', key);
    try {
      const response = await axiosInstance.request({
        method: 'DELETE',
        url: `/wishlist/${key}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        withCredentials: true
      });
      if (response.data.success) {
        fetchWishlist();
        message.success('Product removed from wishlist');
      } else {
        message.error(response.data.message);
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: '',
      key: 'image',
      render: (_, record) => (
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Image src={record.image} alt={record.name} width={80} />
        </Space>
      ),
      responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    {
      title: 'Product',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    {
      title: 'Category',
      dataIndex: 'categoryName',
      key: 'category',
      sorter: (a, b) => a.category.localeCompare(b.category),
      responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price.toFixed(2)}`,
      sorter: (a, b) => a.price - b.price,
      responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(record._id)}
              >
                Delete
              </Menu.Item>
              <Menu.Item
                icon={<ShoppingCartOutlined />}
                onClick={() => {
                  if (userData?.token) {
                    addToCart(record._id, 1)
                  } else {
                    message.error('Please login to add to cart')
                  }
                }}
              >
                Add to Cart
              </Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
      responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
      <Table
        columns={columns}
        dataSource={wishlist}
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
          showQuickJumper: false,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        }}
        scroll={{ x: true }}
      />
    </div>
  );
};


export default WishlistTable;