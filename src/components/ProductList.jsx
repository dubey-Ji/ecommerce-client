import React, { useState, useEffect } from 'react';
import { Layout, Table, Input, Button, Select, Space, Tabs, Tag, Tooltip, notification, Dropdown, Menu } from 'antd';
import { SearchOutlined, StarOutlined, ExportOutlined, PlusOutlined, MoreOutlined, StarFilled, DeleteTwoTone } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';
const { Header, Content } = Layout;
const { Search } = Input;
const { Option } = Select;
const { TabPane } = Tabs;
import { Link } from 'react-router-dom';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

const ProductListPage = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [products, setProducts] = useState([]);
  const [publishedProducts, setPublishedProducts] = useState([]);
  const [draftProducts, setDraftProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const [categorySelected, setCategorySelected] = useState('category');
  const showNotification = (type, message) => {
    api[type]({
        message: message,
    })
  }

  const fetchProducts = async () => {
    const response = await axios.request({
      method: 'GET',
      url: 'http://localhost:8000/api/product'
    });
    console.log(response.data.data);
    if (response.data.success) {
      setProducts(response.data.data);
      setPublishedProducts(response.data.data.filter(product => product.status === 'published'));
      setDraftProducts(response.data.data.filter(product => product.status === 'draft'));
      setFilteredProducts(response.data.data);
    } else {
      showNotification('error', response.data.message);
    }
  }

  const fetchCategories = async () => {
    const response = await axios.request({
      method: 'GET',
      url: 'http://localhost:8000/api/category'
    });
    if (response.data.success) {
      setCategories(response.data.data);
    } else {
      showNotification('error', response.data.message);
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleOnStar = async (productId) => {
    console.log(productId);
    const favorite = !products.find(product => product._id === productId).feature;
    const response = await axios.request({
      method: "PUT",
      url: `http://localhost:8000/api/product/${productId}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      data: {
        feature: favorite
      }
    });
    if (response.data.success) {
      showNotification('success', 'Product added to favorites');
      fetchProducts();
    } else {
      showNotification('error', response.data.message);
    }
  }

  const handleOnDelete = async (productId) => {
    console.log(productId);
    const response = await axios.request({
      method: "DELETE",
      url: `http://localhost:8000/api/product/${productId}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (response.data.success) {
      showNotification('success', 'Product deleted successfully');
      fetchProducts();
    } else {
      showNotification('error', response.data.message);
    }
  }

  const columns = [
    {
      title: 'PRODUCT NAME',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <img src={record.image} alt={text} style={{ width: 40, height: 40, objectFit: 'cover' }} />
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: 'PRICE',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price}`,
    },
    {
      title: 'CATEGORY',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'STOCK',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'PUBLISHED ON',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => moment(createdAt).format('MMM DD, YYYY hh:mm A'),
    },
    {
      title: '',
      key: 'action',
      render: (record) => (
        <Space size="middle">
          <Tooltip title="Favorite">
            <Button icon={record.feature ? <StarFilled style={{ color: '#FFD700' }} /> : <StarOutlined />} onClick={() => handleOnStar(record._id)} />
          </Tooltip>
          <Tooltip title="More">
            <Dropdown overlay={<Menu items={[{ key: 'delete', label: <><DeleteTwoTone   /></>, onClick: () => handleOnDelete(record._id) }]} />} trigger={['click']}>
              <Button icon={<MoreOutlined />} />
            </Dropdown>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleExport = () => {
    const csv = Papa.unparse(filteredProducts);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'products.csv');
  }

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleTabChange = (key) => {
    if (key === '2') {
      if (categorySelected === 'category') {
        setFilteredProducts(products.filter(product => product.status === 'published'));
      } else {
        console.log(categorySelected);
        setFilteredProducts(products.filter(product => product.status === 'published' && product.categoryName === categorySelected));
      }
    } else if (key === '3') {
      if (categorySelected === 'category') {
        setFilteredProducts(products.filter(product => product.status === 'draft'));
      } else {
        console.log(categorySelected);
        setFilteredProducts(products.filter(product => product.status === 'draft' && product.categoryName === categorySelected));
      }
    } else if (key === '1') {
      if (categorySelected === 'category') {
        setFilteredProducts(products);
      } else {
        setFilteredProducts(products.filter(product => product.categoryName === categorySelected));
      }
    }
  }

  return (
    <Layout className='bg-gray-100 h-screen'>
      <Header className="bg-gray-100 pt-[1.5rem]">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Products</h1>
        </div>
      </Header>
      <Content className="container mx-auto py-8 px-6">
        <Tabs defaultActiveKey="1" onChange={handleTabChange}>
          <TabPane tab={`All (${filteredProducts.length})`} key="1" />
          <TabPane tab={`Published (${publishedProducts.length})`} key="2" />
          <TabPane tab={`Drafts (${draftProducts.length})`} key="3" />
        </Tabs>
        <div className="flex justify-between items-center my-4">
          <Space>
            <Search
              placeholder="Search products"
              onSearch={value => console.log(value)}
              style={{ width: 300 }}
            />
            <Select defaultValue="Category" style={{ width: 120 }} onChange={(value) => {
              if (value === 'category') {
                setFilteredProducts(products)
                setCategorySelected('category')
              } else {
                setFilteredProducts(products.filter(product => product.categoryName === value))
                setCategorySelected(value)

              }
            }}>
              <Option value="category">Category</Option>
              {categories.map(category => (
                <Option key={category._id} value={category.name}>{category.name}</Option>
              ))}
            </Select>
            <Select defaultValue="vendor" style={{ width: 120 }}>
              <Option value="vendor">Vendor</Option>
            </Select>
            <Button>More filters</Button>
          </Space>
          <Space>
            <Button icon={<ExportOutlined />} onClick={handleExport}>Export</Button>
            <Link to="/admin/dashboard/add-product"><Button type="primary" icon={<PlusOutlined />}>Add product</Button></Link>
          </Space>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredProducts}
          pagination={{
            total: 16,
            showSizeChanger: false,
            showQuickJumper: false,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          }}
        />
      </Content>
    </Layout>
  );
};

export default ProductListPage;