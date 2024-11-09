import React from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import axiosInstance from '../interceptors/axios.http';

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { loginUser } = useUser();
  const onFinish = (values) => {
    console.log('Success:', values);
    // Here you would typically send a request to your authentication API
    handleLogin(values)
  };

  const handleLogin = async (values) => {
    try {
      const response = await axiosInstance.request({
        method: 'POST',
        url: '/auth/login',
        data: values,
        withCredentials: true
      });
      console.log('response', response)
      if (response.data.success) {
        message.success(response.data.message)
        loginUser(response.data.data)
        navigate('/')
      } else {
        message.error(response.data.message)
      }
    } catch (error) {
      message.error(error.response.data.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          className="mt-8 space-y-6"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your Email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a className="float-right text-blue-600 hover:text-blue-800" href="#">
              Forgot password
            </a>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Sign in
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <Link to="/signup" className="text-blue-600 hover:text-blue-800">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;