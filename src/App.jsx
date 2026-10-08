import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';
import ProductModal from './components/ProductModal';
import CheckoutModal from './components/CheckoutModal';
import SellWithUsModal from './components/SellWithUsModal';
import SellUsedItemModal from './components/SellUsedItemModal';
import CustomerReviews from './components/CustomerReviews';
import AddReviewModal from './components/AddReviewModal';
import AuthModal from './components/AuthModal';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import { StoreSettingsProvider, useStoreSettings } from './context/StoreSettingsContext';
import { products as initialProducts, categories } from './data/products';
import { initialReviews } from './data/reviews';
import { CheckCircle2 } from 'lucide-react';

function StoreApp() {
  // Products list with localStorage persistence
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('citystore_products_v4');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Error loading products from storage:", e);
    }
    return initialProducts;
  });

  // Current view: 'store' | 'admin'
  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname === '/admin' || window.location.hash === '#admin') {
        return 'admin';
      }
    }
    return 'store';
  });

  const [reviews, setReviews] = useState(initialReviews);
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState("all");
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [isSellUsedModalOpen, setIsSellUsedModalOpen] = useState(false);
  const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync products with localStorage
  const saveProductsToStorage = (updatedProducts) => {
    try {
      localStorage.setItem('citystore_products_v4', JSON.stringify(updatedProducts));
    } catch (e) {
      console.error("Error saving products to localStorage:", e);
    }
  };

  // Listen to browser navigation (hash and popstate)
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin' || window.location.pathname === '/admin') {
        setCurrentView('admin');
      } else {
        setCurrentView('store');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  // Show temporary toast message
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Navigation handlers
  const handleOpenAdmin = () => {
    setCurrentView('admin');
    window.location.hash = 'admin';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToStore = () => {
    setCurrentView('store');
    if (window.location.hash === '#admin') {
      window.location.hash = '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add to cart handler
  const handleAddToCart = (productToAdd, openDrawer = true) => {
    const qtyToAdd = productToAdd.quantity || 1;
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === productToAdd.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + qtyToAdd }
            : item
        );
      }
      return [...prevItems, { ...productToAdd, quantity: qtyToAdd }];
    });

    if (openDrawer) {
      setIsCartOpen(true);
    }
    triggerToast(`تمت إضافة "${productToAdd.name}" إلى السلة`);
  };

  // Update quantity in cart (+ / -)
  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove individual item from cart
  const handleRemoveItem = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    triggerToast('تم حذف المنتج من السلة');
  };

  // Clear entire cart
  const handleClearCart = () => {
    setCartItems([]);
    triggerToast('تم تفريغ السلة بنجاح');
  };

  // Handle proceed to checkout
  const handleOpenCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Handle successful order completion
  const handleOrderSuccess = (orderId) => {
    setCartItems([]);
    triggerToast(`تم تأكيد الطلب بنجاح برقم: ${orderId}`);
  };

  // Handle adding product from Admin or Seller
  const handleAddProduct = (newProduct) => {
    const updated = [newProduct, ...products];
    setProducts(updated);
    saveProductsToStorage(updated);
    setActiveCategory("الكل");
    setSearchQuery("");
    triggerToast(`تمت إضافة ونشر منتج "${newProduct.name}" بنجاح!`);
  };

  // Handle updating product price from Admin
  const handleUpdateProductPrice = (productId, newPrice) => {
    const updated = products.map((p) => 
      p.id === productId ? { ...p, price: newPrice } : p
    );
    setProducts(updated);
    saveProductsToStorage(updated);
    triggerToast('تم تحديث السعر بنجاح');
  };

  // Handle deleting product from Admin
  const handleDeleteProduct = (productId) => {
    const updated = products.filter((p) => p.id !== productId);
    setProducts(updated);
    saveProductsToStorage(updated);
    // Also remove from cart and wishlist if present
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
    setWishlist((prev) => prev.filter((id) => id !== productId));
    triggerToast('تم حذف المنتج من المتجر بنجاح');
  };

  // Handle adding product from independent new seller modal
  const handleAddSellerProduct = (newProduct) => {
    handleAddProduct(newProduct);
    setTimeout(() => {
      const el = document.getElementById('products');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  // Handle adding used product from modal
  const handleAddUsedProduct = (newUsedProduct) => {
    handleAddProduct(newUsedProduct);
    setActiveCategory("المنتجات المستعملة");
    setTimeout(() => {
      const el = document.getElementById('products');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  // Handle adding new customer review
  const handleAddReview = (newReview) => {
    setReviews((prev) => [newReview, ...prev]);
    triggerToast('تمت إضافة ونشر تقييمك بنجاح! شكراً لمشاركتك ❤️');

    setTimeout(() => {
      const el = document.getElementById('reviews');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  // Wishlist toggle handler
  const handleToggleWishlist = (productId) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        triggerToast('تمت الإزالة من المفضلة');
        return prev.filter((id) => id !== productId);
      } else {
        triggerToast('تمت الإضافة إلى المفضلة ❤️');
        return [...prev, productId];
      }
    });
  };

  // Filtered and Sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // 1. Category filter
        let matchesCategory = false;
        if (activeCategory === "الكل") {
          matchesCategory = true;
        } else if (activeCategory === "المنتجات المستعملة") {
          matchesCategory = product.isUsed === true;
        } else {
          const normProduct = (product.category || '').trim().replace(/^ال/, '').replace(/[أإآ]/g, 'ا');
          const normActive = (activeCategory || '').trim().replace(/^ال/, '').replace(/[أإآ]/g, 'ا');
          matchesCategory = product.category === activeCategory || normProduct === normActive;
        }

        // 2. Search query filter
        const cleanQuery = searchQuery.trim().toLowerCase();
        const matchesSearch =
          cleanQuery === "" ||
          product.name.toLowerCase().includes(cleanQuery) ||
          product.category.toLowerCase().includes(cleanQuery) ||
          product.description.toLowerCase().includes(cleanQuery) ||
          (product.brand && product.brand.toLowerCase().includes(cleanQuery)) ||
          (product.subCategory && product.subCategory.toLowerCase().includes(cleanQuery)) ||
          (product.condition && product.condition.toLowerCase().includes(cleanQuery)) ||
          (product.sellerName && product.sellerName.toLowerCase().includes(cleanQuery));

        // 3. Price range filter
        let matchesPrice = true;
        if (priceRange === 'under-300') {
          matchesPrice = product.price < 300;
        } else if (priceRange === '300-1000') {
          matchesPrice = product.price >= 300 && product.price <= 1000;
        } else if (priceRange === '1000-3000') {
          matchesPrice = product.price > 1000 && product.price <= 3000;
        } else if (priceRange === 'above-3000') {
          matchesPrice = product.price > 3000;
        }

        return matchesCategory && matchesSearch && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "discount") {
          const discA = a.originalPrice ? (a.originalPrice - a.price) : 0;
          const discB = b.originalPrice ? (b.originalPrice - b.price) : 0;
          return discB - discA;
        }
        return 0; // "featured" maintains initial priority
      });
  }, [products, activeCategory, searchQuery, priceRange, sortBy]);

  // Financial calculations
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartShipping = cartSubtotal >= 200 || cartSubtotal === 0 ? 0 : 25;
  const cartTotal = cartSubtotal + cartShipping;

  // Scroll to products section smoothly
  const scrollToProducts = () => {
    const el = document.getElementById('products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResetFilters = () => {
    setActiveCategory("الكل");
    setSearchQuery("");
    setPriceRange("all");
    setSortBy("featured");
  };

  // ===============================================
  // VIEW: ADMIN DASHBOARD
  // ===============================================
  if (currentView === 'admin') {
    return (
      <AdminDashboard
        products={products}
        onAddProduct={handleAddProduct}
        onUpdateProductPrice={handleUpdateProductPrice}
        onDeleteProduct={handleDeleteProduct}
        onBackToStore={handleBackToStore}
        categories={categories}
      />
    );
  }

  // ===============================================
  // VIEW: MAIN STOREFRONT
  // ===============================================
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 selection:bg-teal-500 selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-900/95 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-sm backdrop-blur-md border border-gray-700 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header / Navbar */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={totalCartCount}
        setIsCartOpen={setIsCartOpen}
        wishlistCount={wishlist.length}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        onOpenSellModal={() => setIsSellModalOpen(true)}
        onOpenSellUsedModal={() => setIsSellUsedModalOpen(true)}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Banner */}
        <Hero onExploreClick={scrollToProducts} />

        {/* Product Grid Section with advanced search, category & price filters */}
        <ProductGrid
          products={filteredProducts}
          allProducts={products}
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          onAddToCart={handleAddToCart}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={setSelectedProduct}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onResetFilters={handleResetFilters}
          onOpenSellUsedModal={() => setIsSellUsedModalOpen(true)}
        />

        {/* Customer & Seller Reviews Section */}
        <CustomerReviews
          reviews={reviews}
          onOpenAddReview={() => setIsAddReviewOpen(true)}
        />
      </main>

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onCheckout={handleOpenCheckout}
      />

      {/* Checkout Order Form Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        subtotal={cartSubtotal}
        shipping={cartShipping}
        total={cartTotal}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* 'Sell With Us' Modal Form for New Merchants */}
      <SellWithUsModal
        isOpen={isSellModalOpen}
        onClose={() => setIsSellModalOpen(false)}
        onAddProduct={handleAddSellerProduct}
        categories={categories}
      />

      {/* 'Sell Used Item' Modal Form */}
      <SellUsedItemModal
        isOpen={isSellUsedModalOpen}
        onClose={() => setIsSellUsedModalOpen(false)}
        onAddUsedProduct={handleAddUsedProduct}
        categories={categories}
      />

      {/* Add Review Modal Form */}
      <AddReviewModal
        isOpen={isAddReviewOpen}
        onClose={() => setIsAddReviewOpen(false)}
        onAddReview={handleAddReview}
      />

      {/* Login / Register Auth Modal */}
      <AuthModal />

      {/* Quick View Product Modal with Used Item Inspection details */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={selectedProduct ? wishlist.includes(selectedProduct.id) : false}
      />

      {/* Footer */}
      <Footer onOpenAdmin={handleOpenAdmin} />

    </div>
  );
}

export default function App() {
  return (
    <StoreSettingsProvider>
      <AuthProvider>
        <StoreApp />
      </AuthProvider>
    </StoreSettingsProvider>
  );
}
