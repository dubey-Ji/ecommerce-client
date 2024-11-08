import React, { useState, useEffect } from 'react';
import { Layout, Form, Input, Button, Upload, Select, Space, Tabs, InputNumber, notification } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import RichTextEditor from './RichTextEditor.jsx';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

const { Content, Sider } = Layout;
const { Option } = Select;
const { TabPane } = Tabs;

const AddProductPage = () => {
  const [api, contextHolder] = notification.useNotification();
  const showNotification = (type, message) => {
    api[type]({
        message: message,
    })
  }
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    image: '',
    categoryName: '',
    status: '',
  });

  const fetchCategories = async () => {
    try {
        const response = await axios.request({
            method: 'GET',
            url: 'http://localhost:8000/api/category'
        });
        setCategories(response.data.data)
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    fetchCategories()
    setProduct({
      ...product,
      stock: 10
    })
  }, [])

  const onFinish = (values) => {
    console.log('Form values:', values);
    // Handle form submission
  };

  const handleEditorChange = (content) => {
    setProduct((prevValue) => ({
      ...prevValue,
      description: content,
    }));
  };

  const handlePublish = async () => {
    const updatedProduct = {
      ...product,
      status: 'published',
      stock: 10
    };
    console.log(updatedProduct);
    setProduct(updatedProduct);
    const response = await axios.request({
      method: 'POST',
      url: 'http://localhost:8000/api/product',
      data: updatedProduct,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (response.data.success) {
      showNotification('success', 'Product published successfully');
      form.resetFields();
    } else {
      showNotification('error', 'Failed to publish product');
    }
  }

  const handleDiscard = () => {
    setProduct({
      ...product,
      name: '',
      description: '',
      price: '',
      stock: '',
      image: '',
      categoryName: '',
      status: '',
    })
  }

  const handleSaveDraft = async () => {
    const updatedProduct = {
      ...product,
      status: 'draft',
      stock: 10
    };
    setProduct(updatedProduct);
    const response = await axios.request({
      method: 'POST',
      url: 'http://localhost:8000/api/product',
      data: updatedProduct,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (response.data.success) {
      showNotification('success', 'Product saved successfully')
    } else {
      showNotification('error', 'Failed to save product')
    }
  }

  return (
    <>
      {contextHolder}
      <Layout className='h-screen'>
        <Content className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Add a product</h1>
            <p className="text-gray-500">Orders placed across your store</p>
          </div>
          <Space>
            <Button type='default' onClick={handleDiscard}>Discard</Button>
            <Button type="primary" ghost onClick={handleSaveDraft}>Save draft</Button>
            <Button type="primary" onClick={handlePublish}>Publish product</Button>
          </Space>
        </div>

        <Layout>
          <Content className="p-6 mr-6">
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item name="title" label="Product Title" rules={[{ required: true }]}>
                <Input placeholder="Write title here..." onChange={(e) => setProduct({ ...product, name: e.target.value })} />
              </Form.Item>

              <Form.Item name="description" label="Product Description" style={{ marginBottom: '0px' }} className='pb-[1.5rem]'>
                {/* <ReactQuill value={description} onChange={setDescription} style={{ backgroundColor: 'white', marginBottom: '0px' }} /> */}
                
                <RichTextEditor handleEditorChange={handleEditorChange} product={product} className="h-[15rem] w-[100%] py-[0.5rem] px-[1rem] text-[0.8rem] font-[400] whitespace-pre-wrap border-[1px] border-[#cbd0dd] rounded-[0.375rem] focus:border-[#cbd0dd] focus:outline-none active:border-[#cbd0dd]" />
              </Form.Item>

              <Form.Item name="images" label="Display images">
                <Upload.Dragger
                action="http://localhost:8000/api/product/image"
                headers={{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }}
                onChange={(info) => {
                    if (info.file.status === 'done') {
                      console.log(info);
                      setProduct({ ...product, image: info.file.response.data.url })
                      showNotification('success', 'Image uploaded successfully')
                    } else if (info.file.status === 'error') {
                      showNotification('error', 'Failed to upload image')
                    }
                }}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Drag your photo here or Browse from device</p>
                </Upload.Dragger>
              </Form.Item>

              <Form.Item label="Inventory">
                <Tabs defaultActiveKey="pricing">
                  <TabPane tab="Pricing" key="pricing">
                    <Space>
                      <Form.Item name="regularPrice" label="Regular price">
                        <InputNumber prefix="$" onChange={(value) => setProduct({ ...product, price: value })} />
                      </Form.Item>
                      <Form.Item name="salePrice" label="Sale price">
                        <InputNumber prefix="$" onChange={(value) => setProduct({ ...product, salePrice: value })} />
                      </Form.Item>
                    </Space>
                  </TabPane>
                  <TabPane tab="Restock" key="restock">
                    {/* Restock content */}
                  </TabPane>
                  <TabPane tab="Shipping" key="shipping">
                    {/* Shipping content */}
                  </TabPane>
                  <TabPane tab="Global Delivery" key="globalDelivery">
                    {/* Global Delivery content */}
                  </TabPane>
                  <TabPane tab="Attributes" key="attributes">
                    {/* Attributes content */}
                  </TabPane>
                  <TabPane tab="Advanced" key="advanced">
                    {/* Advanced content */}
                  </TabPane>
                </Tabs>
              </Form.Item>
            </Form>
          </Content>

          <Sider width={300} className="bg-white p-6">
            <h2 className="text-lg font-semibold mb-4">Organize</h2>
            <Form form={form} layout="vertical">
              <Form.Item name="category" label="Category">
                <Select placeholder="Select category " onChange={(value) => setProduct({ ...product, categoryName: value })}>
                    {categories.map((category) => (
                        <Option key={category.id} value={category.name}>{category.name}</Option>
                    ))}
                  {/* Add more categories */}
                </Select>
              </Form.Item>
              <Form.Item name="vendor" label="Vendor">
                <Select placeholder="Select vendor">
                  <Option value="mensClothing">Men's Clothing</Option>
                  {/* Add more vendors */}
                </Select>
              </Form.Item>
              <Form.Item name="collection" label="Collection">
                <Input placeholder="Collection" />
              </Form.Item>
              <Form.Item name="tags" label="Tags">
                <Select mode="tags" placeholder="Select tags">
                  <Option value="mensClothing">Men's Clothing</Option>
                  {/* Add more tags */}
                </Select>
              </Form.Item>
            </Form>

            <h2 className="text-lg font-semibold mt-6 mb-4">Variants</h2>
            <Form form={form} layout="vertical">
              <Form.Item label="Option 1">
                <Select placeholder="Size">
                  <Option value="small">Small</Option>
                  <Option value="medium">Medium</Option>
                  <Option value="large">Large</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Option 2">
                <Select placeholder="Size">
                  <Option value="small">Small</Option>
                  <Option value="medium">Medium</Option>
                  <Option value="large">Large</Option>
                </Select>
              </Form.Item>
              <Button type="link" className="p-0">Add another option</Button>
            </Form>
          </Sider>
        </Layout>
      </Content>
    </Layout>
    </>
  );
};

export default AddProductPage;