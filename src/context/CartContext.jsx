import { createContext, useContext, useState, useEffect } from "react";
import { message } from "antd";
import { useUser } from "./UserContext";
import axiosInstance from "../interceptors/axios.http";

const CartContext = createContext();
const WishlistContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { userData } = useUser();
  const fetchCart = async () => {
    try {
      const response = await axiosInstance.request({
        method: 'GET',
        url: `/cart`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.data.success && response.data.data.length > 0) {
        const products = response.data.data.map(product => product.productId);
        setCart(products);
        localStorage.setItem('cart', JSON.stringify(products));
      } else {
        setCart([]);
        localStorage.removeItem('cart');
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const cart = localStorage.getItem('cart');
    if (cart) {
      setCart(JSON.parse(cart));
    } else if (userData?.token) {
      fetchCart();
    } 
  }, [userData?.token]);


  const addToCart = async (productId, quantity) => {
    let newCart;
    if (!cart.includes(productId)) {
      newCart = [...cart, productId];
    } else {
      newCart = cart;
    }
    try {
      const response = await axiosInstance.request({
        method: 'POST',
      url: `/cart`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      withCredentials: true,
      data: { productId, quantity }
    });
    if (response.data.success) {
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
      message.success('Product added to cart successfully');
    } else {
      message.error('Failed to add product to cart');
    }
  } catch (error) {
      console.log(error);
    }
  }

  const removeFromCart = async (productId) => {
    try {
      const response = await axiosInstance.request({
        method: 'DELETE',
        url: `/cart/${productId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        withCredentials: true
      });
      if (response.data.success) {
        const newCart = cart.filter(id => id !== productId);
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
        message.success('Product removed from cart successfully');
      } else {
        message.error('Failed to remove product from cart');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const clearCart = async () => {
    try {
      const response = await axiosInstance.request({
        method: 'DELETE',
        url: `/cart`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.data.success) {
        setCart([]);
        localStorage.removeItem('cart');
        message.success('Cart cleared successfully');
      } else {
        message.error('Failed to clear cart');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, clearCart }}>{children}</CartContext.Provider>
  );
}

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const { userData } = useUser();

    const fetchWishlist = async () => {
    try {
            const response = await axiosInstance.request({
        method: 'GET',
        url: `/wishlist`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(response.data);
      if (response.data.success && response.data.data.length > 0) {
        const products = response.data.data.map(product => product.product);
        const productIds = products.map(product => product._id);
        setWishlist(productIds);
        localStorage.setItem('wishlist', JSON.stringify(productIds));
      } else {
        setWishlist([]);
        localStorage.removeItem('wishlist');
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect( () => {
    const wishlist = localStorage.getItem('wishlist');
    if (wishlist) {
      setWishlist(JSON.parse(wishlist));
    } else if (userData?.token) {
      fetchWishlist();
    }
  }, []);

  const addToWishlist = async (productId) => {
    try {
      const response = await axiosInstance.request({
        method: 'POST',
        url: `/wishlist`,
        headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            data: { productId }
        });
        if (response.data.success) {
          const newWishlist = [...wishlist, productId];
          setWishlist(newWishlist);
          localStorage.setItem('wishlist', JSON.stringify(newWishlist));
          message.success('Product added to wishlist successfully');
      } else {
          message.error('Failed to add product to wishlist');
        }
    } catch (error) {
      console.log(error);
    }
  }

  const removeFromWishlist = async (productId) => {
    try {
      const response = await axiosInstance.request({
        method: 'DELETE',
        url: `/wishlist/${productId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.data.success) {
        const newWishlist = wishlist.filter(id => id !== productId);
        setWishlist(newWishlist);
        localStorage.setItem('wishlist', JSON.stringify(newWishlist));
        message.success('Product removed from wishlist successfully');
      } else {
        message.error('Failed to remove product from wishlist');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const clearWishlist = async () => {
    try {
      const response = await axiosInstance.request({
        method: 'DELETE',
        url: `/wishlist`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.data.success) {
        setWishlist([]);
        localStorage.removeItem('wishlist');
        message.success('Wishlist cleared successfully');
      } else {
        message.error('Failed to clear wishlist');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <WishlistContext.Provider value={{ wishlist, setWishlist, addToWishlist, removeFromWishlist, clearWishlist }}>{children}</WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  return useContext(WishlistContext);
}


export const useCart = () => {
  return useContext(CartContext);
}