import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  // Load initial cart from localStorage if available
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('citystore_cart_items') || localStorage.getItem('rawaa_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync cart items to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('citystore_cart_items', JSON.stringify(cartItems));
    } catch (e) {
      // Ignore storage errors
    }
  }, [cartItems]);

  // Show temporary toast message
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Add item to cart
  const addToCart = (product, quantity = 1, openDrawer = true) => {
    const qty = quantity || 1;
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: qty }];
    });

    if (openDrawer) {
      setIsCartOpen(true);
    }
    triggerToast(`تمت إضافة "${product.name}" إلى السلة`);
  };

  // Update item quantity (+ / -)
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove individual item from cart
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    triggerToast('تم حذف المنتج من السلة');
  };

  // Clear all items from cart
  const clearCart = () => {
    setCartItems([]);
    triggerToast('تم تفريغ السلة بنجاح');
  };

  // Drawer helpers
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Automatic real-time calculations
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 200;
  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 25;
  const total = subtotal + shipping;
  const remainingForFreeShipping = freeShippingThreshold - subtotal;

  const value = {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    openCart,
    closeCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalCount,
    subtotal,
    shipping,
    total,
    freeShippingThreshold,
    remainingForFreeShipping,
    toastMessage,
    triggerToast
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to consume CartContext conveniently
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
