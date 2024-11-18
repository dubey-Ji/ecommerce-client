import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Card, Steps } from 'antd';
import { ShoppingCartOutlined, HomeOutlined, CreditCardOutlined, CheckOutlined } from '@ant-design/icons';

const { Option } = Select;

const ShippingAddress = ({cartItems, total, handleStepChange, handleShippingAddress}) => {
      const [form] = Form.useForm();
      const [totalPrice, setTotalPrice] = useState(total);
      useEffect(() => {
        setTotalPrice(total);
    }, [total]);

  const onFinish = (values) => {    // Handle form submission
    handleShippingAddress(values);
    localStorage.setItem('shippingAddress', JSON.stringify(values));
    handleStepChange(1);
  };
    const discount = 59;
    const tax = totalPrice * 0.2; // Assuming 20% tax
    const shipping = 30;
    let finalTotal = totalPrice - discount + tax + shipping;
  return (
            <Card className="shadow-sm">
          <h1 className="text-2xl font-semibold mb-6">Shipping Address</h1>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="max-w-2xl"
          >
            <Form.Item
              name="street"
              label="Street Address"
              rules={[{ required: true, message: 'Please enter your street address' }]}
            >
              <Input.TextArea
                rows={2}
                placeholder="Enter your street address"
              />
            </Form.Item>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                name="city"
                label="City"
                rules={[{ required: true, message: 'Please enter your city' }]}
              >
                <Input placeholder="Enter your city" />
              </Form.Item>

              <Form.Item
                name="state"
                label="State/Province"
                rules={[{ required: true, message: 'Please enter your state' }]}
              >
                <Input placeholder="Enter your state" />
              </Form.Item>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                name="zipCode"
                label="ZIP/Postal Code"
                rules={[
                  { required: true, message: 'Please enter your ZIP code' },
                //   { pattern: /^\d{5}(-\d{4})?$/, message: 'Please enter a valid ZIP code' }
                ]}
              >
                <Input placeholder="Enter your ZIP code" />
              </Form.Item>

              <Form.Item
                name="country"
                label="Country"
                rules={[{ required: true, message: 'Please select your country' }]}
              >
                <Select placeholder="Select your country">
                  <Option value="US">United States</Option>
                  <Option value="CA">Canada</Option>
                  <Option value="GB">United Kingdom</Option>
                  <Option value="AU">Australia</Option>
                  {/* Add more countries as needed */}
                </Select>
              </Form.Item>
            </div>

            <Card className="bg-gray-50 mb-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Items Subtotal:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Cost:</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                  <span>Total:</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <Button 
                type="default" 
                size="large"
                className="order-2 sm:order-1"
              >
                Back to Cart
              </Button>
              <Button 
                type="primary" 
                size="large" 
                htmlType="submit"
                className="order-1 sm:order-2"
              >
                Continue to Payment
              </Button>
            </div>
          </Form>
        </Card>
  );
};

export default ShippingAddress;