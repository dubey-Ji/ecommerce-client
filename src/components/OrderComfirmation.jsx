import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axiosInstance from '../interceptors/axios.http';
import { Result, Button, Card, Divider, List } from 'antd';

const OrderConfirmation = () => {
    const [status, setStatus] = useState(null);
    const [items, setItems] = useState([]);
    const [customerEmail, setCustomerEmail] = useState('');
    const [orderDetails, setOrderDetails] = useState(null);
    const [orderNumber, setOrderNumber] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const sessionId = params.get('session_id'); 
    const userInfo = localStorage.getItem('user');
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    const total = localStorage.getItem('total');
    const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress'));
    useEffect(() => {
        axiosInstance.request({
            method: "GET",
            url: `/orders/checkout-session/${sessionId}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            withCredentials: true
        })
        .then((res) => {
            if (res.data.data.status === 'complete') {
                setStatus(true);
                localStorage.setItem('cartItems', JSON.stringify([]));
                localStorage.setItem('total', 0);
                localStorage.setItem('shippingAddress', JSON.stringify(null));
                localStorage.setItem('cart', JSON.stringify([]));
                setCustomerEmail(res.data.customer_email);
                setOrderDetails({
                    items: [
                        ...cartItems.map((item) => ({
                            productId: item._id,
                            price: item.price,
                            quantity: item.quantity
                        }))
                    ],
                    totalPrice: total,
                    shippingAddress: shippingAddress,
                    paymentMethod: 'credit card',
                    userId: userInfo ? JSON.parse(userInfo)._id : null
                });
            }
        })
        .catch((error) => {
            console.error('Error fetching checkout session:', error);
        });
    }, [sessionId]);
      const handleContinueShopping = () => {
    navigate('/');  // Navigate to home page
  };

  useEffect(() => {
    if (orderDetails) {
        createOrder();
    }
  }, [orderDetails]);

  const createOrder = async () => {
    const response = await axiosInstance.request({
        method: "POST",
        url: "/orders",
        data: orderDetails,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        withCredentials: true
    })
    if (response.data.success) {
        // setStatus(true);
        setOrderNumber(response.data.data._id);
    }
  }

  const handleViewOrders = () => {
        navigate('/orders');  // Navigate to orders page
    };
    return (
            <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-sm">
          {status && orderNumber ? (
            <Result
              status="success"
              title="Order Placed Successfully!"
              subTitle={`Order number: ${orderNumber}`}
              extra={[
                <Button type="primary" key="continue" onClick={handleContinueShopping}>
                  Continue Shopping
                </Button>,
                <Button key="orders" onClick={handleViewOrders}>View My Orders</Button>,
              ]}
            />
          ) : (
            <Result
              status="error"
              title="Order Placement Failed"
              subTitle="There was an issue processing your order. Please try again or contact customer support."
              extra={[
                <Button type="primary" key="tryAgain" onClick={() => navigate('/checkout')}>
                  Try Again
                </Button>,
                <Button key="support" onClick={() => navigate('/support')}>
                  Contact Support
                </Button>,
              ]}
            />
          )}

          {status && cartItems.length > 0 && (
            <>
              <Divider />
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <List
                  dataSource={cartItems}
                  renderItem={(item) => (
                    <List.Item className="flex justify-between">
                      <span>{item.name} x{item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </List.Item>
                  )}
                />
                <Divider />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span>${total}</span>
                </div>
              </div>
            </>
          )}
        </Card>
        </div>
        </div>
    )
}

export default OrderConfirmation;