import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (course) => {
    const existingItem = cartItems.find(item => item._id === course._id);

    if (existingItem) {
      toast.info('Course already in cart');
      return;
    }

    setCartItems([...cartItems, course]);
    toast.success('Course added to cart!');
  };

  const removeFromCart = (courseId) => {
    setCartItems(cartItems.filter(item => item._id !== courseId));
    toast.success('Course removed from cart');
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.discount > 0
        ? item.price - (item.price * item.discount / 100)
        : item.price;
      return total + price;
    }, 0);
  };

  const getTotalItems = () => {
    return cartItems.length;
  };

  const isInCart = (courseId) => {
    return cartItems.some(item => item._id === courseId);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalPrice,
    getTotalItems,
    isInCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
