import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Unlock, 
  Package, 
  PlusCircle, 
  Settings, 
  BarChart3, 
  Search, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  ArrowLeft, 
  ShoppingBag, 
  Phone, 
  MapPin, 
  Clock, 
  Percent, 
  Save, 
  ExternalLink, 
  AlertCircle,
  Sparkles,
  Eye,
  DollarSign,
  Tag,
  RefreshCw,
  CheckCircle2,
  Sliders,
  Store
} from 'lucide-react';
import { useStoreSettings } from '../context/StoreSettingsContext';

export default function AdminDashboard({ 
  products, 
  onAddProduct, 
  onUpdateProductPrice, 
  onDeleteProduct, 
  onBackToStore,
  categories 
}) {
  const { settings, updateSettings, resetSettings } = useStoreSettings();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('rawaa_admin_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Active Tab: 'products' | 'add' | 'settings' | 'stats'
  const [activeTab, setActiveTab] = useState('products');

  // Products Table Filter & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [conditionFilter, setConditionFilter] = useState('all');

  // Inline Price Editing State
  const [editingProductId, setEditingProductId] = useState(null);
  const [editingPriceValue, setEditingPriceValue] = useState('');

  // Toast inside admin
  const [toastMsg, setToastMsg] = useState(null);
  const triggerAdminToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Add Product Form State
  const [newProductForm, setNewProductForm] = useState({
    name: '',
    price: '',
    originalPrice: '',
    category: categories[0] || 'إلكترونيات',
    customCategory: '',
    isUsed: false,
    condition: 'مستعمل - كالجديد',
    usageDuration: '3 أشهر',
    accessories: 'الكرتونة الأصلية، الشاحن، الضمان',
    reasonForSelling: 'الترقية لموديل أحدث',
    description: '',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    badge: 'جديد'
  });

  // Store Settings Form State
  const [settingsForm, setSettingsForm] = useState({
    storeName: settings.storeName,
    tagline: settings.tagline,
    whatsappNumber: settings.whatsappNumber,
    address: settings.address,
    workingHours: settings.workingHours,
    email: settings.email,
    commissionPercent: settings.commissionPercent,
    freeShippingThreshold: settings.freeShippingThreshold,
    adminPassword: settings.adminPassword
  });

  // Contact / Site-Texts Form State (for "نصوص الموقع والاتصال" tab)
  const [contactForm, setContactForm] = useState({
    heroTitle: settings.heroTitle || "تسوق أرقى المنتجات العصرية بأسعار لا تُقاوم",
    heroSubtitle: settings.heroSubtitle || "اكتشف باقة مختارة بعناية من أحدث الإلكترونيات الذكية.",
    announcementText: settings.announcementText || "🚀 شحن مجاني على الطلبات التي تتجاوز 200 ج.م",
    contactAddress: settings.contactAddress || "مصر",
    contactEmail: settings.contactEmail || "info@citystore.com",
    phones: settings.phones ? JSON.parse(JSON.stringify(settings.phones)) : [],
    whatsapp: settings.whatsapp ? JSON.parse(JSON.stringify(settings.whatsapp)) : [],
    facebook: settings.facebook ? JSON.parse(JSON.stringify(settings.facebook)) : [],
  });

  // Preset image recommendations for fast selection
  const presetImages = [
    { label: '📷 كاميرا Bullet خارجية', url: 'https://images.unsplash.com/photo-1557862921-37829c790f19?w=800&auto=format&fit=crop&q=80' },
    { label: '🏠 كاميرا Dome داخلية', url: 'https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&auto=format&fit=crop&q=80' },
    { label: '🌟 كاميرا ColorVu ليلية', url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&auto=format&fit=crop&q=80' },
    { label: '🔄 كاميرا Wi-Fi متحركة', url: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=800&auto=format&fit=crop&q=80' },
    { label: '📟 جهاز تسجيل DVR / NVR', url: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&auto=format&fit=crop&q=80' },
    { label: '💾 هارد مراقبة WD Purple', url: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&auto=format&fit=crop&q=80' },
    { label: '⚡ باور سبلاي مركزي', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80' },
    { label: '🔌 كابلات RG59 وتوصيلات', url: 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?w=800&auto=format&fit=crop&q=80' }
  ];

  // Handle Login Check
  const handleLogin = (e) => {
    if (e) e.preventDefault();
    if (passwordInput === settings.adminPassword || passwordInput === 'admin123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('rawaa_admin_auth', 'true');
      setAuthError('');
      triggerAdminToast('تم تسجيل الدخول للوحة التحكم بنجاح 👋');
    } else {
      setAuthError('كلمة المرور غير صحيحة، يرجى المحاولة مرة أخرى.');
    }
  };

  // Demo 1-Click Login
  const handleDemoLogin = () => {
    setPasswordInput('admin123');
    setIsAuthenticated(true);
    sessionStorage.setItem('rawaa_admin_auth', 'true');
    setAuthError('');
    triggerAdminToast('تم الدخول السريع كمسؤول تجريبي 👋');
  };

  // Logout from Admin
  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('rawaa_admin_auth');
    setPasswordInput('');
  };

  // Filtered Products for Admin
  const adminFilteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = 
        !searchQuery.trim() ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.condition && p.condition.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat = 
        selectedCategoryFilter === 'all' || p.category === selectedCategoryFilter;

      const matchesCond = 
        conditionFilter === 'all' ||
        (conditionFilter === 'new' && !p.isUsed) ||
        (conditionFilter === 'used' && p.isUsed);

      return matchesSearch && matchesCat && matchesCond;
    });
  }, [products, searchQuery, selectedCategoryFilter, conditionFilter]);

  // Handle Save Inline Price
  const handleSavePrice = (productId) => {
    const num = parseFloat(editingPriceValue);
    if (!isNaN(num) && num > 0) {
      onUpdateProductPrice(productId, num);
      setEditingProductId(null);
      triggerAdminToast('تم تحديث سعر المنتج بنجاح ✅');
    } else {
      alert('يرجى إدخال سعر صحيح أكبر من الصفر');
    }
  };

  // Handle Add Product Submit
  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    if (!newProductForm.name || !newProductForm.price) {
      alert('يرجى ملء اسم المنتج والسعر على الأقل');
      return;
    }

    const priceNum = parseFloat(newProductForm.price);
    const origPriceNum = newProductForm.originalPrice ? parseFloat(newProductForm.originalPrice) : null;
    const finalCategory = newProductForm.customCategory ? newProductForm.customCategory : newProductForm.category;

    const newProd = {
      id: Date.now(),
      name: newProductForm.name,
      price: priceNum,
      originalPrice: origPriceNum && origPriceNum > priceNum ? origPriceNum : null,
      category: finalCategory,
      image: newProductForm.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      description: newProductForm.description || 'منتج عالي الجودة متوفر لدى City Store مع ضمان الجودة.',
      rating: 5.0,
      reviewsCount: 1,
      badge: newProductForm.isUsed ? newProductForm.condition : (newProductForm.badge || 'جديد'),
      isUsed: newProductForm.isUsed,
      condition: newProductForm.isUsed ? newProductForm.condition : null,
      usageDuration: newProductForm.isUsed ? newProductForm.usageDuration : null,
      accessories: newProductForm.isUsed ? newProductForm.accessories : null,
      reasonForSelling: newProductForm.isUsed ? newProductForm.reasonForSelling : null,
      realPhotos: newProductForm.isUsed ? [newProductForm.image] : undefined
    };

    onAddProduct(newProd);
    triggerAdminToast(`تمت إضافة منتج "${newProd.name}" إلى المتجر بنجاح 🚀`);
    
    // Reset Form
    setNewProductForm({
      name: '',
      price: '',
      originalPrice: '',
      category: categories[0] || 'إلكترونيات',
      customCategory: '',
      isUsed: false,
      condition: 'مستعمل - كالجديد',
      usageDuration: '3 أشهر',
      accessories: 'الكرتونة الأصلية، الشاحن، الضمان',
      reasonForSelling: 'الترقية لموديل أحدث',
      description: '',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      badge: 'جديد'
    });

    setActiveTab('products');
  };

  // Handle Save Settings
  const handleSaveSettings = (e) => {
    e.preventDefault();
    updateSettings({
      storeName: settingsForm.storeName,
      tagline: settingsForm.tagline,
      whatsappNumber: settingsForm.whatsappNumber.replace(/[^0-9]/g, ''),
      address: settingsForm.address,
      workingHours: settingsForm.workingHours,
      email: settingsForm.email,
      commissionPercent: Number(settingsForm.commissionPercent) || 10,
      freeShippingThreshold: Number(settingsForm.freeShippingThreshold) || 200,
      adminPassword: settingsForm.adminPassword || 'admin123'
    });
    triggerAdminToast('تم حفظ وتحديث إعدادات المتجر بنجاح ⚙️✨');
  };

  // Handle Save Contact / Site Texts Settings
  const handleSaveContactSettings = (e) => {
    e.preventDefault();
    updateSettings({
      heroTitle: contactForm.heroTitle,
      heroSubtitle: contactForm.heroSubtitle,
      announcementText: contactForm.announcementText,
      contactAddress: contactForm.contactAddress,
      contactEmail: contactForm.contactEmail,
      phones: contactForm.phones,
      whatsapp: contactForm.whatsapp,
      facebook: contactForm.facebook,
    });
    triggerAdminToast('تم حفظ نصوص الموقع وبيانات الاتصال بنجاح ✅');
  };

  // Helpers for editing phone/whatsapp/facebook arrays
  const updatePhone = (idx, field, value) => {
    const updated = contactForm.phones.map((p, i) => i === idx ? { ...p, [field]: value } : p);
    setContactForm({ ...contactForm, phones: updated });
  };
  const addPhone = () => setContactForm({ ...contactForm, phones: [...contactForm.phones, { label: '', number: '', raw: '' }] });
  const removePhone = (idx) => setContactForm({ ...contactForm, phones: contactForm.phones.filter((_, i) => i !== idx) });

  const updateWhatsapp = (idx, field, value) => {
    const updated = contactForm.whatsapp.map((w, i) => i === idx ? { ...w, [field]: value } : w);
    setContactForm({ ...contactForm, whatsapp: updated });
  };
  const addWhatsapp = () => setContactForm({ ...contactForm, whatsapp: [...contactForm.whatsapp, { label: '', link: 'https://wa.me/' }] });
  const removeWhatsapp = (idx) => setContactForm({ ...contactForm, whatsapp: contactForm.whatsapp.filter((_, i) => i !== idx) });

  const updateFacebook = (idx, field, value) => {
    const updated = contactForm.facebook.map((f, i) => i === idx ? { ...f, [field]: value } : f);
    setContactForm({ ...contactForm, facebook: updated });
  };
  const addFacebook = () => setContactForm({ ...contactForm, facebook: [...contactForm.facebook, { label: '', link: 'https://facebook.com/' }] });
  const removeFacebook = (idx) => setContactForm({ ...contactForm, facebook: contactForm.facebook.filter((_, i) => i !== idx) });

  // ==========================================
  // VIEW 1: PASSCODE LOCK SCREEN
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-teal-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-2xl text-white relative">
          
          <button 
            onClick={onBackToStore}
            className="absolute top-6 right-6 text-gray-400 hover:text-white flex items-center gap-1.5 text-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>العودة للمتجر</span>
          </button>

          <div className="text-center space-y-3 pt-2">
            <div className="w-16 h-16 rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400 mx-auto shadow-lg shadow-teal-500/10">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-white">لوحة تحكم الإدارة</h1>
            <p className="text-sm text-gray-400">
              يرجى إدخال كلمة المرور للوصول إلى لوحة إدارة متجر <span className="text-teal-400 font-bold">{settings.storeName}</span>
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-2">
                كلمة المرور المشفرة:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (authError) setAuthError('');
                  }}
                  placeholder="أدخل رمز المرور (الافتراضي: admin123)"
                  className="w-full bg-gray-800/80 text-white rounded-2xl px-4 py-3.5 pl-12 border border-gray-700 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all text-sm font-mono text-center tracking-widest"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>

            {authError && (
              <div className="p-3 bg-rose-500/15 border border-rose-500/30 rounded-xl text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-teal-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              <Unlock className="w-4 h-4" />
              <span>تسجيل الدخول للوحة الإدارة</span>
            </button>
          </form>

          {/* Quick Demo Login Shortcut */}
          <div className="mt-6 pt-6 border-t border-gray-800 text-center space-y-3">
            <div className="text-xs text-gray-400">
              💡 الرمز الافتراضي للتجربة: <code className="text-teal-400 font-mono bg-gray-800 px-2 py-0.5 rounded">admin123</code>
            </div>
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-xs font-semibold rounded-xl border border-gray-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>دخول فوري كمسؤول (تجريبي)</span>
            </button>
          </div>

        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: AUTHENTICATED ADMIN DASHBOARD
  // ==========================================
  const totalProductsCount = products.length;
  const usedProductsCount = products.filter((p) => p.isUsed).length;
  const newProductsCount = totalProductsCount - usedProductsCount;
  const totalCatalogValue = products.reduce((acc, p) => acc + p.price, 0);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col font-sans" dir="rtl">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-sm backdrop-blur-md border border-teal-500/40 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="bg-gray-900 text-white sticky top-0 z-30 shadow-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-md">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg text-white">لوحة تحكم الإدارة</span>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-full">
                  Admin v2.0
                </span>
              </div>
              <p className="text-[11px] text-gray-400">{settings.storeName}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onBackToStore}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
            >
              <Store className="w-4 h-4" />
              <span className="hidden sm:inline">معاينة المتجر</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 bg-gray-800 hover:bg-rose-900/40 hover:text-rose-300 text-gray-300 text-xs font-semibold rounded-xl border border-gray-700 transition-all cursor-pointer"
              title="قفل اللوحة وتسجيل الخروج"
            >
              <Lock className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">قفل</span>
            </button>
          </div>

        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="bg-gray-950/80 border-t border-gray-800 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-4 overflow-x-auto py-2 scrollbar-none">
            
            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-teal-500 text-white shadow-md'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>إدارة المنتجات</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-black/25">
                {totalProductsCount}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('add')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'add'
                  ? 'bg-teal-500 text-white shadow-md'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>إضافة منتج جديد</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-teal-500 text-white shadow-md'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>إعدادات المتجر والواتساب</span>
            </button>

            <button
              onClick={() => setActiveTab('contact')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'contact'
                  ? 'bg-teal-500 text-white shadow-md'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span>نصوص الموقع والاتصال</span>
            </button>

            <button
              onClick={() => setActiveTab('stats')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'stats'
                  ? 'bg-teal-500 text-white shadow-md'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>الإحصائيات والملخص</span>
            </button>

          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        
        {/* ========================================================= */}
        {/* TAB 1: MANAGE PRODUCTS (جدول وقائمة المنتجات مع التعديل والحذف) */}
        {/* ========================================================= */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            
            {/* Header with Search and Actions */}
            <div className="bg-white p-5 rounded-3xl shadow-xs border border-gray-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              
              <div>
                <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                  <Package className="w-5 h-5 text-teal-600" />
                  <span>قائمة منتجات المتجر ({products.length})</span>
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  يمكنك البحث وتعديل السعر بضغطة زر أو حذف أي منتج فوراً
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Search */}
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث بالاسم أو القسم..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pr-9 pl-3 py-2 text-xs focus:bg-white focus:border-teal-500 outline-none"
                  />
                </div>

                {/* Condition Filter */}
                <select
                  value={conditionFilter}
                  onChange={(e) => setConditionFilter(e.target.value)}
                  className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold focus:border-teal-500 outline-none"
                >
                  <option value="all">كل الحالات (جديد ومستعمل)</option>
                  <option value="new">منتجات جديدة فقط</option>
                  <option value="used">منتجات مستعملة فقط</option>
                </select>

                {/* Add Product Shortcut */}
                <button
                  onClick={() => setActiveTab('add')}
                  className="flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>إضافة منتج جديد</span>
                </button>
              </div>

            </div>

            {/* Products Table */}
            <div className="bg-white rounded-3xl shadow-xs border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-right border-collapse">
                  <thead>
                    <tr className="bg-gray-50/80 border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase">
                      <th className="py-3.5 px-4">المنتج</th>
                      <th className="py-3.5 px-4">الفئة</th>
                      <th className="py-3.5 px-4">الحالة والنوع</th>
                      <th className="py-3.5 px-4">السعر الحالي</th>
                      <th className="py-3.5 px-4 text-center">إجراءات سريعة</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-xs">
                    {adminFilteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="py-12 text-center text-gray-400">
                          <Package className="w-10 h-10 mx-auto text-gray-300 mb-2" />
                          <p>لا توجد منتجات مطابقة لخيارات البحث الحالية</p>
                        </td>
                      </tr>
                    ) : (
                      adminFilteredProducts.map((prod) => (
                        <tr key={prod.id} className="hover:bg-gray-50/60 transition-colors">
                          
                          {/* Product Info & Thumbnail */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={prod.image}
                                alt={prod.name}
                                className="w-12 h-12 rounded-xl object-cover bg-gray-100 border border-gray-200 shrink-0"
                              />
                              <div className="max-w-xs">
                                <h4 className="font-bold text-gray-900 line-clamp-1">{prod.name}</h4>
                                <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">{prod.description}</p>
                              </div>
                            </div>
                          </td>

                          {/* Category */}
                          <td className="py-3.5 px-4">
                            <span className="px-2.5 py-1 bg-gray-100 text-gray-700 font-semibold rounded-lg text-[11px]">
                              {prod.category}
                            </span>
                          </td>

                          {/* Condition */}
                          <td className="py-3.5 px-4">
                            {prod.isUsed ? (
                              <div className="space-y-0.5">
                                <span className="inline-flex items-center px-2 py-0.5 bg-amber-100 text-amber-800 rounded-md font-bold text-[10px]">
                                  مستعمل ({prod.condition || 'بحالة ممتازة'})
                                </span>
                                {prod.usageDuration && (
                                  <div className="text-[10px] text-gray-400">
                                    المدة: {prod.usageDuration}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <span className="inline-flex items-center px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md font-bold text-[10px]">
                                جديد بالكرتونة ✨
                              </span>
                            )}
                          </td>

                          {/* Price with Inline Edit */}
                          <td className="py-3.5 px-4">
                            {editingProductId === prod.id ? (
                              <div className="flex items-center gap-1.5">
                                <input
                                  type="number"
                                  value={editingPriceValue}
                                  onChange={(e) => setEditingPriceValue(e.target.value)}
                                  className="w-20 px-2 py-1 bg-teal-50 border border-teal-500 rounded-lg text-xs font-bold text-teal-800 outline-none"
                                  autoFocus
                                />
                                <button
                                  onClick={() => handleSavePrice(prod.id)}
                                  className="p-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-colors cursor-pointer"
                                  title="حفظ السعر"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => setEditingProductId(null)}
                                  className="p-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors cursor-pointer"
                                  title="إلغاء"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <div>
                                  <span className="font-black text-gray-900 text-sm">{prod.price} ج.م</span>
                                  {prod.originalPrice && (
                                    <span className="block text-[10px] text-gray-400 line-through">
                                      {prod.originalPrice} ج.م
                                    </span>
                                  )}
                                </div>
                                <button
                                  onClick={() => {
                                    setEditingProductId(prod.id);
                                    setEditingPriceValue(prod.price.toString());
                                  }}
                                  className="p-1 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-md transition-colors cursor-pointer"
                                  title="تعديل السعر"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}
                          </td>

                          {/* Quick Actions (Delete) */}
                          <td className="py-3.5 px-4 text-center">
                            <button
                              onClick={() => {
                                if (window.confirm(`هل أنت متأكد من حذف المنتج "${prod.name}" نهائياً من المتجر؟`)) {
                                  onDeleteProduct(prod.id);
                                }
                              }}
                              className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                              title="حذف المنتج من المتجر"
                            >
                              <Trash2 className="w-4 h-4 inline" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: ADD NEW PRODUCT (نموذج إضافة منتج جديد متكامل) */}
        {/* ========================================================= */}
        {activeTab === 'add' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Form */}
            <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-gray-200">
              
              <div className="flex items-center gap-3 pb-6 border-b border-gray-100 mb-6">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                  <PlusCircle className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-gray-900">إضافة منتج جديد للمتجر</h2>
                  <p className="text-xs text-gray-500">
                    أدخل بيانات المنتج ليظهر فوراً في المتجر وفي السلة والبحث
                  </p>
                </div>
              </div>

              <form onSubmit={handleAddProductSubmit} className="space-y-5">
                
                {/* Product Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    اسم المنتج <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newProductForm.name}
                    onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                    placeholder="مثال: سماعة رأس لاسلكية إلغاء الضوضاء Sony"
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-xs focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 outline-none transition-all"
                  />
                </div>

                {/* Price & Original Price */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      السعر الحالي (ج.م / ج.م) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      step="any"
                      value={newProductForm.price}
                      onChange={(e) => setNewProductForm({ ...newProductForm, price: e.target.value })}
                      placeholder="مثال: 450"
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-xs font-bold text-teal-700 focus:bg-white focus:border-teal-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      السعر قبل الخصم (اختياري)
                    </label>
                    <input
                      type="number"
                      min="1"
                      step="any"
                      value={newProductForm.originalPrice}
                      onChange={(e) => setNewProductForm({ ...newProductForm, originalPrice: e.target.value })}
                      placeholder="مثال: 600"
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-xs text-gray-500 focus:bg-white focus:border-teal-500 outline-none"
                    />
                  </div>
                </div>

                {/* Category & Condition Toggle */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      القسم / الفئة
                    </label>
                    <select
                      value={newProductForm.category}
                      onChange={(e) => setNewProductForm({ ...newProductForm, category: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-xs font-semibold focus:border-teal-500 outline-none"
                    >
                      {categories.filter(c => c !== 'الكل' && c !== 'المنتجات المستعملة').map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                      <option value="أخرى">قسم آخر (تخصيص)</option>
                    </select>
                  </div>

                  {/* Condition Selector (New vs Used) */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      حالة المنتج
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setNewProductForm({ ...newProductForm, isUsed: false })}
                        className={`py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                          !newProductForm.isUsed
                            ? 'bg-teal-50 border-teal-500 text-teal-700'
                            : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'
                        }`}
                      >
                        ✨ منتج جديد
                      </button>

                      <button
                        type="button"
                        onClick={() => setNewProductForm({ ...newProductForm, isUsed: true })}
                        className={`py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                          newProductForm.isUsed
                            ? 'bg-amber-50 border-amber-500 text-amber-800'
                            : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'
                        }`}
                      >
                        🏷️ منتج مستعمل
                      </button>
                    </div>
                  </div>
                </div>

                {/* If Used: Condition Details */}
                {newProductForm.isUsed && (
                  <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-2xl space-y-3 animate-fade-in">
                    <h4 className="text-xs font-black text-amber-900 flex items-center gap-1.5">
                      <Tag className="w-4 h-4 text-amber-600" />
                      <span>تفاصيل ومعاينة المنتج المستعمل:</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-600 mb-1">درجة الاستخدام</label>
                        <select
                          value={newProductForm.condition}
                          onChange={(e) => setNewProductForm({ ...newProductForm, condition: e.target.value })}
                          className="w-full bg-white border border-amber-200 rounded-xl px-3 py-2 text-xs"
                        >
                          <option value="مستعمل - كالجديد">كالجديد تماماً (Like New)</option>
                          <option value="مستعمل - استعمال خفيف">استعمال خفيف جداً</option>
                          <option value="مستعمل - حالة جيدة">مستعمل بحالة جيدة</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-600 mb-1">مدة الاستخدام</label>
                        <input
                          type="text"
                          value={newProductForm.usageDuration}
                          onChange={(e) => setNewProductForm({ ...newProductForm, usageDuration: e.target.value })}
                          placeholder="مثال: 3 أشهر، أسبوعين"
                          className="w-full bg-white border border-amber-200 rounded-xl px-3 py-2 text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-600 mb-1">الملحقات المتوفرة</label>
                        <input
                          type="text"
                          value={newProductForm.accessories}
                          onChange={(e) => setNewProductForm({ ...newProductForm, accessories: e.target.value })}
                          placeholder="مثال: الكرتونة الأصلية، الشاحن، الفاتورة"
                          className="w-full bg-white border border-amber-200 rounded-xl px-3 py-2 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-600 mb-1">سبب البيع</label>
                        <input
                          type="text"
                          value={newProductForm.reasonForSelling}
                          onChange={(e) => setNewProductForm({ ...newProductForm, reasonForSelling: e.target.value })}
                          placeholder="مثال: الترقية لجهاز أحدث"
                          className="w-full bg-white border border-amber-200 rounded-xl px-3 py-2 text-xs"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    وصف المنتج
                  </label>
                  <textarea
                    rows="3"
                    value={newProductForm.description}
                    onChange={(e) => setNewProductForm({ ...newProductForm, description: e.target.value })}
                    placeholder="اكتب نبذة مختصرة عن مواصفات ومميزات هذا المنتج..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-xs focus:bg-white focus:border-teal-500 outline-none"
                  />
                </div>

                {/* Image URL & Preset Selection */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    رابط صورة المنتج (Image URL)
                  </label>
                  <input
                    type="url"
                    value={newProductForm.image}
                    onChange={(e) => setNewProductForm({ ...newProductForm, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-xs focus:bg-white focus:border-teal-500 outline-none"
                  />

                  {/* Preset quick image picks */}
                  <div className="mt-2.5">
                    <span className="text-[11px] text-gray-400 block mb-1.5">أو اختر صورة جاهزة للتجربة السريعة:</span>
                    <div className="flex flex-wrap gap-2">
                      {presetImages.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setNewProductForm({ ...newProductForm, image: preset.url })}
                          className="px-2.5 py-1 bg-gray-100 hover:bg-teal-50 hover:text-teal-700 text-gray-600 rounded-lg text-[10px] font-semibold transition-colors cursor-pointer"
                        >
                          📷 {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold rounded-2xl shadow-md shadow-teal-600/20 active:scale-98 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>حفظ ونشر المنتج فوراً في المتجر</span>
                  </button>
                </div>

              </form>

            </div>

            {/* Live Product Card Preview on Side */}
            <div className="space-y-4">
              <h3 className="text-sm font-black text-gray-900 flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-teal-600" />
                <span>معاينة حية لشكل البطاقة في المتجر</span>
              </h3>

              <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-md max-w-sm mx-auto">
                <div className="relative aspect-square bg-gray-100 overflow-hidden">
                  <img
                    src={newProductForm.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 flex flex-col gap-1.5">
                    {newProductForm.isUsed ? (
                      <span className="bg-amber-600 text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-md">
                        {newProductForm.condition}
                      </span>
                    ) : (
                      <span className="bg-teal-600 text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-md">
                        جديد
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="text-[10px] text-teal-600 font-bold">
                    {newProductForm.category}
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm line-clamp-1">
                    {newProductForm.name || 'اسم المنتج الجديد'}
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {newProductForm.description || 'وصف ومميزات المنتج سوف تظهر هنا للعملاء...'}
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-gray-100">
                    <div>
                      <span className="text-base font-black text-teal-700">
                        {newProductForm.price ? `${newProductForm.price} ج.م` : '0 ج.م'}
                      </span>
                      {newProductForm.originalPrice && (
                        <span className="text-xs text-gray-400 line-through mr-2">
                          {newProductForm.originalPrice} ج.م
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded-lg">
                      معاينة جاهزة
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: STORE SETTINGS (إدارة البيانات الأساسية ورقم الواتساب) */}
        {/* ========================================================= */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-gray-200">
            
            <div className="flex items-center gap-3 pb-6 border-b border-gray-100 mb-6">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-black text-gray-900">إدارة البيانات الأساسية للمتجر</h2>
                <p className="text-xs text-gray-500">
                  تعديل رقم الواتساب الخاص باستلام الطلبات، عنوان المتجر، وساعات العمل
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-6">
              
              {/* WhatsApp Number with direct test */}
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-3">
                <label className="block text-xs font-black text-emerald-900 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>رقم الواتساب الخاص باستلام الطلبات (مع كود الدولة):</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={settingsForm.whatsappNumber}
                    onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                    placeholder="مثال: 966500000000 أو 201000000000"
                    className="flex-1 bg-white border border-emerald-300 rounded-xl px-4 py-2.5 text-xs font-mono font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                  <a
                    href={`https://api.whatsapp.com/send?phone=${settingsForm.whatsappNumber}&text=${encodeURIComponent('رسالة تجريبية من لوحة تحكم City Store')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="اختبار الرابط المباشر"
                  >
                    <span>تجربة</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <p className="text-[11px] text-emerald-700">
                  ⚡ كافة طلبات السلة وزر "طلب عبر واتساب" سيتم توجيهها إلى هذا الرقم مباشرة.
                </p>
              </div>

              {/* Store Physical Address */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-teal-600" />
                  <span>عنوان المتجر الفيزيائي (Physical Address):</span>
                </label>
                <input
                  type="text"
                  required
                  value={settingsForm.address}
                  onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                  placeholder="مثال: القاهرة، مدينة نصر - سيتي سنتر مول"
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-xs focus:bg-white focus:border-teal-500 outline-none"
                />
              </div>

              {/* Working Hours */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-teal-600" />
                  <span>ساعات العمل وأوقات الدوام:</span>
                </label>
                <input
                  type="text"
                  required
                  value={settingsForm.workingHours}
                  onChange={(e) => setSettingsForm({ ...settingsForm, workingHours: e.target.value })}
                  placeholder="مثال: يومياً من 9:00 ص إلى 11:00 م"
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-xs focus:bg-white focus:border-teal-500 outline-none"
                />
              </div>

              {/* Store Name & Tagline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    اسم المتجر
                  </label>
                  <input
                    type="text"
                    required
                    value={settingsForm.storeName}
                    onChange={(e) => setSettingsForm({ ...settingsForm, storeName: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-xs font-bold focus:bg-white focus:border-teal-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    نسبة عمولة المنصة للبائعين (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={settingsForm.commissionPercent}
                    onChange={(e) => setSettingsForm({ ...settingsForm, commissionPercent: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-xs font-bold text-teal-700 focus:bg-white focus:border-teal-500 outline-none"
                  />
                </div>
              </div>

              {/* Admin Password Change */}
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl space-y-2">
                <label className="block text-xs font-bold text-gray-700 flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-gray-600" />
                  <span>رمز مرور لوحة التحكم (Admin Password):</span>
                </label>
                <input
                  type="text"
                  required
                  value={settingsForm.adminPassword}
                  onChange={(e) => setSettingsForm({ ...settingsForm, adminPassword: e.target.value })}
                  placeholder="admin123"
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-xs font-mono font-bold focus:border-teal-500 outline-none"
                />
                <span className="text-[11px] text-gray-400 block">
                  يمكنك تغيير رمز الدخول للوحة التحكم في أي وقت.
                </span>
              </div>

              {/* Save Button */}
              <div className="pt-2 flex items-center justify-between gap-4">
                <button
                  type="submit"
                  className="flex-1 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl shadow-md shadow-teal-600/20 active:scale-98 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>حفظ وتطبيق الإعدادات الآن</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('هل تريد استعادة الإعدادات الافتراضية؟')) {
                      resetSettings();
                      triggerAdminToast('تمت استعادة الإعدادات الافتراضية');
                    }
                  }}
                  className="px-4 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  استعادة الافتراضي
                </button>
              </div>

            </form>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: SITE TEXTS & CONTACT (نصوص الموقع والاتصال) */}
        {/* ========================================================= */}
        {activeTab === 'contact' && (
          <div className="max-w-3xl mx-auto space-y-6">

            {/* Hero / Banner Texts */}
            <form onSubmit={handleSaveContactSettings} className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-gray-200 space-y-5">

              <div className="flex items-center gap-3 pb-5 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-gray-900">نصوص البانر الرئيسي والإعلان</h2>
                  <p className="text-xs text-gray-500">تعديل عنوان ووصف البانر الرئيسي وشريط الإعلان العلوي</p>
                </div>
              </div>

              {/* Announcement Bar */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  📢 نص شريط الإعلان العلوي (Announcement Bar):
                </label>
                <input
                  type="text"
                  value={contactForm.announcementText}
                  onChange={(e) => setContactForm({ ...contactForm, announcementText: e.target.value })}
                  placeholder="مثال: 🚀 شحن مجاني على الطلبات التي تتجاوز 200 ج.م"
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-xs focus:bg-white focus:border-teal-500 outline-none"
                />
              </div>

              {/* Hero Title */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  🏷️ عنوان البانر الرئيسي (Hero Title):
                </label>
                <input
                  type="text"
                  value={contactForm.heroTitle}
                  onChange={(e) => setContactForm({ ...contactForm, heroTitle: e.target.value })}
                  placeholder="مثال: تسوق أرقى المنتجات العصرية بأسعار لا تُقاوم"
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-xs font-bold focus:bg-white focus:border-teal-500 outline-none"
                />
              </div>

              {/* Hero Subtitle */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  📝 وصف البانر الرئيسي (Hero Subtitle):
                </label>
                <textarea
                  rows={3}
                  value={contactForm.heroSubtitle}
                  onChange={(e) => setContactForm({ ...contactForm, heroSubtitle: e.target.value })}
                  placeholder="مثال: اكتشف باقة مختارة من أحدث المنتجات..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-xs focus:bg-white focus:border-teal-500 outline-none resize-none leading-relaxed"
                />
              </div>

              {/* Contact Address & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    📍 عنوان المتجر (للعرض في الفوتر):
                  </label>
                  <input
                    type="text"
                    value={contactForm.contactAddress}
                    onChange={(e) => setContactForm({ ...contactForm, contactAddress: e.target.value })}
                    placeholder="مثال: القاهرة، مصر"
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-xs focus:bg-white focus:border-teal-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    ✉️ البريد الإلكتروني للتواصل:
                  </label>
                  <input
                    type="email"
                    value={contactForm.contactEmail}
                    onChange={(e) => setContactForm({ ...contactForm, contactEmail: e.target.value })}
                    placeholder="مثال: info@citystore.com"
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-xs focus:bg-white focus:border-teal-500 outline-none"
                  />
                </div>
              </div>

              {/* Phones */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-gray-700 flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-teal-600" />
                    أرقام الهاتف (Phone Numbers):
                  </label>
                  <button
                    type="button"
                    onClick={addPhone}
                    className="text-[11px] font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1 cursor-pointer"
                  >
                    <PlusCircle className="w-3.5 h-3.5" /> إضافة رقم
                  </button>
                </div>
                {contactForm.phones.map((phone, idx) => (
                  <div key={idx} className="grid grid-cols-3 gap-2 items-center bg-gray-50 p-3 rounded-2xl border border-gray-200">
                    <input
                      type="text"
                      placeholder="التسمية (مثال: المبيعات)"
                      value={phone.label}
                      onChange={(e) => updatePhone(idx, 'label', e.target.value)}
                      className="col-span-1 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-teal-400"
                    />
                    <input
                      type="text"
                      placeholder="الرقم المعروض (010...)"
                      value={phone.number}
                      onChange={(e) => updatePhone(idx, 'number', e.target.value)}
                      className="col-span-1 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-mono outline-none focus:border-teal-400"
                      dir="ltr"
                    />
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        placeholder="raw (2010...)"
                        value={phone.raw}
                        onChange={(e) => updatePhone(idx, 'raw', e.target.value)}
                        className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-mono outline-none focus:border-teal-400"
                        dir="ltr"
                      />
                      <button
                        type="button"
                        onClick={() => removePhone(idx)}
                        className="p-1.5 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer shrink-0"
                        title="حذف"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-gray-700">📱 روابط الواتساب:</label>
                  <button
                    type="button"
                    onClick={addWhatsapp}
                    className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
                  >
                    <PlusCircle className="w-3.5 h-3.5" /> إضافة رابط
                  </button>
                </div>
                {contactForm.whatsapp.map((wa, idx) => (
                  <div key={idx} className="flex gap-2 items-center bg-emerald-50/60 p-3 rounded-2xl border border-emerald-200">
                    <input
                      type="text"
                      placeholder="التسمية"
                      value={wa.label}
                      onChange={(e) => updateWhatsapp(idx, 'label', e.target.value)}
                      className="w-36 bg-white border border-emerald-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-emerald-500"
                    />
                    <input
                      type="url"
                      placeholder="https://wa.me/20..."
                      value={wa.link}
                      onChange={(e) => updateWhatsapp(idx, 'link', e.target.value)}
                      className="flex-1 bg-white border border-emerald-200 rounded-xl px-3 py-2 text-xs font-mono outline-none focus:border-emerald-500"
                      dir="ltr"
                    />
                    <a
                      href={wa.link}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors shrink-0"
                      title="تجربة الرابط"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      type="button"
                      onClick={() => removeWhatsapp(idx)}
                      className="p-1.5 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer shrink-0"
                      title="حذف"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Facebook */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-gray-700">📘 صفحات الفيسبوك:</label>
                  <button
                    type="button"
                    onClick={addFacebook}
                    className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                  >
                    <PlusCircle className="w-3.5 h-3.5" /> إضافة صفحة
                  </button>
                </div>
                {contactForm.facebook.map((fb, idx) => (
                  <div key={idx} className="flex gap-2 items-center bg-blue-50/60 p-3 rounded-2xl border border-blue-200">
                    <input
                      type="text"
                      placeholder="التسمية"
                      value={fb.label}
                      onChange={(e) => updateFacebook(idx, 'label', e.target.value)}
                      className="w-36 bg-white border border-blue-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-blue-500"
                    />
                    <input
                      type="url"
                      placeholder="https://facebook.com/..."
                      value={fb.link}
                      onChange={(e) => updateFacebook(idx, 'link', e.target.value)}
                      className="flex-1 bg-white border border-blue-200 rounded-xl px-3 py-2 text-xs font-mono outline-none focus:border-blue-500"
                      dir="ltr"
                    />
                    <a
                      href={fb.link}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors shrink-0"
                      title="فتح الصفحة"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      type="button"
                      onClick={() => removeFacebook(idx)}
                      className="p-1.5 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer shrink-0"
                      title="حذف"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Save Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold rounded-2xl shadow-md shadow-teal-600/20 active:scale-98 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>حفظ وتطبيق نصوص الموقع وبيانات الاتصال</span>
                </button>
                <p className="text-center text-[11px] text-gray-400 mt-2">
                  ⚡ التغييرات تُطبَّق فوراً على الهيدر والفوتر والبانر الرئيسي عند الحفظ
                </p>
              </div>

            </form>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: STORE OVERVIEW & STATS (الإحصائيات والملخص) */}
        {/* ========================================================= */}
        {activeTab === 'stats' && (
          <div className="space-y-6">
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400 font-bold block">إجمالي المنتجات</span>
                  <span className="text-2xl font-black text-gray-900 mt-1 block">{totalProductsCount}</span>
                  <span className="text-[10px] text-teal-600 font-semibold">{newProductsCount} جديد | {usedProductsCount} مستعمل</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
                  <Package className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400 font-bold block">القيمة الإجمالية للكتالوج</span>
                  <span className="text-2xl font-black text-teal-700 mt-1 block">{totalCatalogValue.toLocaleString()} ج.م</span>
                  <span className="text-[10px] text-gray-500 font-semibold">متوسط السعر: {Math.round(totalCatalogValue / (totalProductsCount || 1))} ج.م</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400 font-bold block">رقم واتساب الطلبات</span>
                  <span className="text-sm font-mono font-black text-gray-900 mt-1 block">+{settings.whatsappNumber}</span>
                  <span className="text-[10px] text-emerald-600 font-semibold">نشط ومتصل بالمتجر ✅</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Phone className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400 font-bold block">عمولة المنصة المحددة</span>
                  <span className="text-2xl font-black text-indigo-600 mt-1 block">{settings.commissionPercent}%</span>
                  <span className="text-[10px] text-gray-500 font-semibold">تُحسب تلقائياً للبائعين</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Percent className="w-6 h-6" />
                </div>
              </div>

            </div>

            {/* Quick Actions Card */}
            <div className="bg-gradient-to-r from-gray-900 to-teal-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <h3 className="text-lg font-black flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span>المتجر جاهز لاستقبال الطلبات والتحديثات الحية</span>
                </h3>
                <p className="text-xs text-gray-300 max-w-xl">
                  العنوان المعتمد: {settings.address} | ساعات العمل: {settings.workingHours}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveTab('add')}
                  className="px-4 py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl text-xs shadow-md transition-colors cursor-pointer"
                >
                  + إضافة منتج
                </button>
                <button
                  onClick={onBackToStore}
                  className="px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  العودة للواجهة الرئيسية 🛍️
                </button>
              </div>
            </div>

          </div>
        )}

      </main>

    </div>
  );
}
