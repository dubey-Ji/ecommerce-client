import React, { useState, useEffect } from 'react';
import { Table, Button, Image, Space, Dropdown, Menu } from 'antd';
import { MoreOutlined, ShoppingCartOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import { message } from 'antd';

const WishlistTable = () => {
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
    try {
      const response = await axios.request({
        method: 'GET',
        url: `http://localhost:8000/api/wishlist`,
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
      const response = await axios.request({
        method: 'DELETE',
        url: `http://localhost:8000/api/wishlist/${key}`,
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
                onClick={() => console.log('Add to cart clicked')}
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