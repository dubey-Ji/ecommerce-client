import { Steps } from 'antd';
import { ShoppingCartOutlined, HomeOutlined, CreditCardOutlined, CheckOutlined } from '@ant-design/icons';

const OrderSteps = ({current}) => {
    const items = [
        { title: 'Shipping Address', icon: <HomeOutlined /> },
        { title: 'Payment', icon: <CreditCardOutlined /> },
        { title: 'Order Confirmation', icon: <CheckOutlined /> },
    ]
  return (
    <div className="mb-8">
        <Steps current={current} items={items} />
    </div>
  );
};

export default OrderSteps;