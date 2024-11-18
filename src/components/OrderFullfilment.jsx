import { Layout } from 'antd';
import OrderSteps from './OrderSteps';
import ShippingAddress from './ShippingAddress';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import StripeCheckoutPage from './StripeCheckoutPage';
import OrderConfirmation from './OrderComfirmation';
import { useUser } from '../context/UserContext';

const { Content } = Layout;

const OrderFullfilment = () => {
    const { step } = useParams();
    const location = useLocation();
    const cartItems = location.state?.cartItems || JSON.parse(localStorage.getItem('cartItems') || '[]');
    const total = location.state?.total || parseFloat(localStorage.getItem('total')) || 0;
    if (location.state?.cartItems) {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
    if (location.state?.total) {
        localStorage.setItem('total', total);
    }
    const { userData } = useUser();
    const [currentStep, setCurrentStep] = useState(step ? parseInt(step) : 0);
    const [shippingAddress, setShippingAddress] = useState(null);
    const handleStepChange = (step) => {
        setCurrentStep(step);
    }

    const handleShippingAddress = (address) => {
        setShippingAddress(address);
    }
  return (
    <Content>
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-3xl mx-auto">
                <OrderSteps current={currentStep} />
                {
                    currentStep === 0 && <ShippingAddress cartItems={cartItems} total={total} handleStepChange={handleStepChange} handleShippingAddress={handleShippingAddress} />
                }
                {
                    currentStep === 1 && <StripeCheckoutPage cartItems={cartItems} total={total} shippingAddress={shippingAddress} handleStepChange={handleStepChange} />
                }
                {
                    currentStep === 2 && <OrderConfirmation />
                }
            </div>
        </div>
    </Content>
  );
};

export default OrderFullfilment;