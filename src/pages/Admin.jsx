import React, { useState } from 'react';
import AdminDashboard from '../components/AdminDashboard';
import { products as initialProducts, categories } from '../data/products';

export default function Admin() {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('citystore_products_v4');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return initialProducts;
  });

  const handleAddProduct = (newProduct) => {
    const updated = [newProduct, ...products];
    setProducts(updated);
    try {
      localStorage.setItem('citystore_products_v4', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdatePrice = (id, newPrice) => {
    const updated = products.map((p) => (p.id === id ? { ...p, price: newPrice } : p));
    setProducts(updated);
    try {
      localStorage.setItem('citystore_products_v4', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = (id) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    try {
      localStorage.setItem('citystore_products_v4', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleBack = () => {
    if (window.location.hash === '#admin') {
      window.location.hash = '';
    } else {
      window.location.pathname = '/';
    }
  };

  return (
    <AdminDashboard
      products={products}
      onAddProduct={handleAddProduct}
      onUpdateProductPrice={handleUpdatePrice}
      onDeleteProduct={handleDelete}
      onBackToStore={handleBack}
      categories={categories}
    />
  );
}