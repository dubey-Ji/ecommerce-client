import React, { useCallback, useState, useEffect } from "react";
import {loadStripe} from '@stripe/stripe-js';
import axiosInstance from "../interceptors/axios.http";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// This is your test secret API key.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
// ... existing imports ...

const CheckoutForm = ({cartItems, total, shippingAddress, handleStepChange}) => {
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        // Create a Checkout Session as soon as the component loads
        axiosInstance.request({
            method: "POST",
            url: "/orders/create-checkout-session",
            data: {
                lineItems: cartItems.map(item => ({
                    productId: item._id,
                    quantity: item.quantity
                }))
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            withCredentials: true
        })
        .then((res) => {
            setClientSecret(res.data.data.clientSecret);
        })
        .catch((error) => {
            console.error('Error creating checkout session:', error);
        });
    }, [cartItems]);

    return (
        <div id="checkout">
            {clientSecret && (
                <EmbeddedCheckoutProvider
                    stripe={stripePromise}
                    options={{clientSecret}}
                >
                    <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
            )}
        </div>
    );
};

// ... Return component remains the same ...

const StripeCheckoutPage = ({cartItems, total, shippingAddress, handleStepChange}) => {
    return (
        <div className="App">
            <CheckoutForm 
                cartItems={cartItems} 
                total={total} 
                shippingAddress={shippingAddress} 
                handleStepChange={handleStepChange} 
            />
        </div>
    );
}
export default StripeCheckoutPage;