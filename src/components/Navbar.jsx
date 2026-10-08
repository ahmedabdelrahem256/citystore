import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Heart, 
  User, 
  Menu, 
  X, 
  Sparkles,
  PhoneCall,
  Phone,
  ShieldCheck,
  Truck,
  Store,
  RotateCcw,
  LogOut,
  ChevronDown,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useStoreSettings } from '../context/StoreSettingsContext';
import { siteConfig } from '../data/siteConfig';

const WhatsAppIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.031 0C5.394 0 0 5.394 0 12.031c0 2.122.553 4.191 1.605 6.012L.055 24l6.155-1.614a12.007 12.007 0 005.821 1.503h.005c6.635 0 12.03-5.395 12.03-12.032 0-3.214-1.252-6.235-3.527-8.51A11.954 11.954 0 0012.031 0zm0 22.012h-.004a10.003 10.003 0 01-5.097-1.391l-.365-.217-3.784.992 1.01-3.689-.238-.378a9.986 9.986 0 01-1.536-5.3C2.017 6.51 6.51 2.017 12.03 2.017c2.677 0 5.193 1.043 7.086 2.936a9.987 9.987 0 012.936 7.087c0 5.522-4.492 10.015-10.021 10.015zm5.49-7.498c-.3-.15-1.776-.877-2.052-.977-.275-.1-.476-.15-.676.15s-.777.977-.952 1.177-.35.225-.65.075a8.196 8.196 0 01-2.413-1.488 9.043 9.043 0 01-1.669-2.079c-.176-.3-.019-.462.132-.612.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525s-.676-1.63-.926-2.233c-.244-.588-.492-.508-.676-.517l-.576-.01c-.2 0-.525.075-.8.375s-1.05 1.026-1.05 2.502c0 1.476 1.076 2.902 1.226 3.102.15.2 2.115 3.23 5.124 4.53 3.01 1.3 3.01.867 3.56.817.55-.05 1.775-.726 2.025-1.427.25-.701.25-1.302.175-1.427-.075-.125-.275-.2-.575-.35z" />
  </svg>
);

const FacebookIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export default function Navbar({ 
  searchQuery, 
  setSearchQuery, 
  cartCount, 
  setIsCartOpen, 
  wishlistCount, 
  activeCategory, 
  onSelectCategory, 
  onOpenSellModal, 
  onOpenSellUsedModal, 
  onOpenAdmin 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [activeContactDropdown, setActiveContactDropdown] = useState(null);

  const { user, isAuthenticated, openLogin, logout } = useAuth();
  const { settings } = useStoreSettings();

  // Use localStorage settings first, fall back to siteConfig defaults
  const contactPhones = (settings.phones && settings.phones.length > 0) ? settings.phones : siteConfig.contact.phones;
  const contactWhatsapp = (settings.whatsapp && settings.whatsapp.length > 0) ? settings.whatsapp : siteConfig.contact.whatsapp;
  const contactFacebook = (settings.facebook && settings.facebook.length > 0) ? settings.facebook : siteConfig.contact.facebook;
  const announcementText = settings.announcementText || "🚀 شحن مجاني على الطلبات فوق 200 ج.م | كاميرات المراقبة | سوق المستعمل بضمان الفحص!";

  const navLinks = [
    { name: "الرئيسية", id: "home" },
    { name: "جميع المنتجات", id: "products" },
    { name: "كاميرات المراقبة 📷", id: "cameras", isCamerasTab: true },
    { name: "المنتجات المستعملة 🏷️", id: "used", isUsedTab: true },
    { name: "العروض الخاصة", id: "offers" },
    { name: "آراء العملاء", id: "reviews" },
    { name: "من نحن", id: "about" }
  ];

  const handleNavLinkClick = (link, e) => {
    if (link.isUsedTab) {
      e.preventDefault();
      onSelectCategory("المنتجات المستعملة");
      const el = document.getElementById('products');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (link.isCamerasTab) {
      e.preventDefault();
      onSelectCategory("كاميرات المراقبة");
      const el = document.getElementById('products');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 text-white text-xs md:text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>{announcementText}</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 text-xs text-teal-100 relative">
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 px-2.5 py-0.5 bg-black/25 hover:bg-black/40 text-amber-200 hover:text-white rounded-full font-bold transition-all border border-amber-300/30 cursor-pointer shadow-xs"
              title="لوحة تحكم الإدارة"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              <span>لوحة التحكم</span>
            </button>

            {/* Backdrop to close dropdowns */}
            {activeContactDropdown && (
              <div 
                className="fixed inset-0 z-40 bg-transparent"
                onClick={() => setActiveContactDropdown(null)} 
              />
            )}

            {/* Phone dropdown button */}
            <div className="relative z-50">
              <button
                type="button"
                onClick={() => setActiveContactDropdown(activeContactDropdown === 'phones' ? null : 'phones')}
                className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full transition-all cursor-pointer font-medium ${
                  activeContactDropdown === 'phones' ? 'bg-white text-teal-800 shadow-sm' : 'hover:bg-black/20 text-white'
                }`}
                title="أرقام هواتف التواصل"
              >
                <Phone className="w-3 h-3 text-teal-200" />
                <span className="hidden sm:inline">اتصل بنا</span>
                <ChevronDown className="w-3 h-3 opacity-80" />
              </button>

              {activeContactDropdown === 'phones' && (
                <div className="absolute left-0 sm:right-0 sm:left-auto top-full mt-2 w-60 bg-white text-gray-800 rounded-2xl shadow-2xl border border-gray-100 p-2.5 z-50 animate-scale-in">
                  <div className="text-[10px] font-bold text-gray-400 px-2 pb-1.5 mb-1 border-b border-gray-100">
                    أرقام الاتصال المباشر
                  </div>
                  <div className="space-y-1">
                    {contactPhones.map((phone, i) => (
                      <a
                        key={i}
                        href={`tel:${phone.raw}`}
                        className="flex items-center justify-between p-2 hover:bg-teal-50 rounded-xl transition-colors text-xs font-semibold text-gray-800 group"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-teal-100 group-hover:bg-teal-600 group-hover:text-white text-teal-700 flex items-center justify-center transition-colors">
                            <Phone className="w-3.5 h-3.5" />
                          </div>
                          <span>{phone.label}</span>
                        </div>
                        <span className="font-mono text-teal-700 font-bold text-xs" dir="ltr">{phone.number}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* WhatsApp dropdown button */}
            <div className="relative z-50">
              <button
                type="button"
                onClick={() => setActiveContactDropdown(activeContactDropdown === 'whatsapp' ? null : 'whatsapp')}
                className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full transition-all cursor-pointer font-medium ${
                  activeContactDropdown === 'whatsapp' ? 'bg-emerald-500 text-white shadow-sm' : 'bg-emerald-600/80 hover:bg-emerald-600 text-white'
                }`}
                title="محادثة واتساب"
              >
                <WhatsAppIcon className="w-3 h-3" />
                <span className="hidden sm:inline">واتساب</span>
                <ChevronDown className="w-3 h-3 opacity-80" />
              </button>

              {activeContactDropdown === 'whatsapp' && (
                <div className="absolute left-0 sm:right-0 sm:left-auto top-full mt-2 w-60 bg-white text-gray-800 rounded-2xl shadow-2xl border border-gray-100 p-2.5 z-50 animate-scale-in">
                  <div className="text-[10px] font-bold text-gray-400 px-2 pb-1.5 mb-1 border-b border-gray-100">
                    محادثات الواتساب الفورية
                  </div>
                  <div className="space-y-1">
                    {contactWhatsapp.map((wa, i) => (
                      <a
                        key={i}
                        href={wa.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2 hover:bg-emerald-50 rounded-xl transition-colors text-xs font-semibold text-gray-800 group"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-emerald-100 group-hover:bg-emerald-600 group-hover:text-white text-emerald-600 flex items-center justify-center transition-colors">
                            <WhatsAppIcon className="w-3.5 h-3.5" />
                          </div>
                          <span>{wa.label}</span>
                        </div>
                        <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-emerald-600" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Facebook dropdown button */}
            <div className="relative z-50">
              <button
                type="button"
                onClick={() => setActiveContactDropdown(activeContactDropdown === 'facebook' ? null : 'facebook')}
                className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full transition-all cursor-pointer font-medium ${
                  activeContactDropdown === 'facebook' ? 'bg-blue-600 text-white shadow-sm' : 'bg-blue-700/80 hover:bg-blue-700 text-white'
                }`}
                title="صفحات الفيسبوك"
              >
                <FacebookIcon className="w-3 h-3" />
                <span className="hidden sm:inline">فيسبوك</span>
                <ChevronDown className="w-3 h-3 opacity-80" />
              </button>

              {activeContactDropdown === 'facebook' && (
                <div className="absolute left-0 sm:right-0 sm:left-auto top-full mt-2 w-60 bg-white text-gray-800 rounded-2xl shadow-2xl border border-gray-100 p-2.5 z-50 animate-scale-in">
                  <div className="text-[10px] font-bold text-gray-400 px-2 pb-1.5 mb-1 border-b border-gray-100">
                    صفحاتنا الرسمية على فيسبوك
                  </div>
                  <div className="space-y-1">
                    {contactFacebook.map((fb, i) => (
                      <a
                        key={i}
                        href={fb.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2 hover:bg-blue-50 rounded-xl transition-colors text-xs font-semibold text-gray-800 group"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-blue-100 group-hover:bg-blue-600 group-hover:text-white text-blue-600 flex items-center justify-center transition-colors">
                            <FacebookIcon className="w-3.5 h-3.5" />
                          </div>
                          <span>{fb.label}</span>
                        </div>
                        <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-blue-600" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          
          {/* Logo & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="القائمة الرئيسية"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <a href="#" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform duration-300">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-black bg-gradient-to-l from-teal-700 to-emerald-600 bg-clip-text text-transparent">
                  City Store
                </span>
                <span className="text-[10px] text-gray-500 font-medium -mt-1 tracking-wider">
                  سيتي ستور
                </span>
              </div>
            </a>
          </div>

          {/* Search Bar */}
          <div className="hidden sm:flex flex-1 max-w-md mx-2 lg:mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="ابحث عن أجهزة جديدة أو مستعملة، ماركات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-11 py-2 bg-gray-100 hover:bg-gray-50 focus:bg-white text-sm rounded-full border border-transparent focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all outline-none"
              />
              <Search className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs px-1.5 py-0.5 rounded-full bg-gray-200 cursor-pointer"
                >
                  مسح
                </button>
              )}
            </div>
          </div>

          {/* Action CTAs: 'بيع منتجك المستعمل' + Auth User + Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* 'بيع منتجك المستعمل' Button */}
            <button
              onClick={onOpenSellUsedModal}
              className="flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-amber-600/20 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
              title="اعرض جهازك المستعمل للبيع"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>بيع مستعمل</span>
            </button>

            {/* 'بيع كتاجر' Button */}
            <button
              onClick={onOpenSellModal}
              className="hidden xl:flex items-center gap-1.5 px-3 py-2 rounded-full bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200 text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
              title="انضم كتاجر أو بائع"
            >
              <Store className="w-3.5 h-3.5 text-teal-600" />
              <span>بيع كتاجر</span>
            </button>

            {/* Wishlist */}
            <button 
              className="relative p-2 text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-full transition-colors cursor-pointer"
              title="المفضلة"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-rose-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* User Auth Profile / Login Button */}
            <div className="relative">
              {isAuthenticated && user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 pr-2.5 rounded-full border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer text-xs font-bold text-gray-800"
                  >
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-7 h-7 rounded-full object-cover border border-teal-500/30"
                    />
                    <span className="hidden md:inline max-w-[90px] truncate">{user.name}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                  </button>

                  {/* User Dropdown Menu */}
                  {userDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-fade-in text-xs">
                      <div className="px-3.5 py-2 border-b border-gray-100">
                        <div className="font-bold text-gray-900 text-sm truncate">{user.name}</div>
                        <div className="text-gray-500 truncate text-[11px]">{user.email}</div>
                        <span className="mt-1 inline-block px-2 py-0.5 rounded-md bg-teal-50 text-teal-700 text-[10px] font-bold">
                          {user.role === 'seller' ? 'حساب بائع مستقل' : 'حساب مشتري موثوق'}
                        </span>
                      </div>

                      <div className="py-1">
                        <button 
                          onClick={() => {
                            setUserDropdownOpen(false);
                            if (onOpenAdmin) onOpenAdmin();
                          }}
                          className="w-full text-right px-3.5 py-2 hover:bg-teal-50 text-teal-700 font-bold transition-colors flex items-center gap-1.5"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                          <span>لوحة تحكم الإدارة (Admin)</span>
                        </button>
                        <button 
                          onClick={() => {
                            setUserDropdownOpen(false);
                            alert(`مرحباً ${user.name}، طلباتك قيد التجهيز والشحن.`);
                          }}
                          className="w-full text-right px-3.5 py-2 hover:bg-teal-50 text-gray-700 transition-colors"
                        >
                          📦 طلباتي السابقة
                        </button>
                        <button 
                          onClick={() => {
                            setUserDropdownOpen(false);
                            onOpenSellUsedModal();
                          }}
                          className="w-full text-right px-3.5 py-2 hover:bg-teal-50 text-gray-700 transition-colors"
                        >
                          🏷️ منتجاتي المعروضة للبيع
                        </button>
                      </div>

                      <div className="border-t border-gray-100 pt-1">
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            logout();
                          }}
                          className="w-full text-right px-3.5 py-2 hover:bg-rose-50 text-rose-600 font-bold transition-colors flex items-center gap-1.5"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>تسجيل الخروج</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={openLogin}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-full border border-gray-200 transition-all cursor-pointer"
                >
                  <User className="w-4 h-4 text-teal-600" />
                  <span className="hidden sm:inline">تسجيل الدخول</span>
                </button>
              )}
            </div>

            {/* Cart Button */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-teal-600 hover:bg-teal-700 active:scale-95 text-white px-3.5 sm:px-4 py-2 rounded-full shadow-md shadow-teal-600/25 transition-all cursor-pointer"
              title="سلة التسوق"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm font-bold hidden sm:inline">السلة</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 bg-amber-400 text-gray-900 text-xs font-black rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Mobile Search input */}
        <div className="sm:hidden mt-2.5 pt-2 border-t border-gray-100">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="ابحث عن أجهزة جديدة أو مستعملة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2 bg-gray-100 text-sm rounded-xl border border-transparent focus:border-teal-500 outline-none"
            />
            <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Secondary Navigation Bar (Desktop) */}
      <nav className="hidden lg:block border-t border-gray-100 bg-gray-50/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <ul className="flex items-center justify-start gap-8 py-2.5 text-sm font-semibold text-gray-600">
            {navLinks.map((link) => {
              const isActive = link.isUsedTab && activeCategory === "المنتجات المستعملة";
              return (
                <li key={link.id}>
                  <a 
                    href={`#${link.id}`}
                    onClick={(e) => handleNavLinkClick(link, e)}
                    className={`transition-colors py-1 inline-block border-b-2 cursor-pointer ${
                      isActive
                        ? 'text-amber-700 font-bold border-amber-600'
                        : 'hover:text-teal-600 border-transparent hover:border-teal-600'
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="text-xs text-amber-800 font-bold flex items-center gap-3">
            <button 
              onClick={onOpenSellUsedModal}
              className="hover:underline flex items-center gap-1 text-amber-700 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>عندك جهاز تبي تبيعه؟ اعرضه الآن</span>
            </button>
            <span className="text-gray-300">|</span>
            <button 
              onClick={onOpenSellModal}
              className="hover:underline flex items-center gap-1 text-teal-700 cursor-pointer"
            >
              <Store className="w-3.5 h-3.5" />
              <span>انضمام كتاجر</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-fade-in space-y-3">
          
          {/* User Status Banner on Mobile */}
          {isAuthenticated && user ? (
            <div className="p-3 bg-teal-50 rounded-2xl border border-teal-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <div className="text-xs font-bold text-gray-900">{user.name}</div>
                  <div className="text-[10px] text-teal-700">{user.email}</div>
                </div>
              </div>
              <button 
                onClick={logout}
                className="text-xs text-rose-600 font-bold hover:underline"
              >
                خروج
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openLogin();
              }}
              className="w-full py-2.5 bg-teal-600 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>تسجيل الدخول / إنشاء حساب</span>
            </button>
          )}

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSellUsedModal();
              }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold rounded-xl text-xs shadow-md cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>بيع منتجك المستعمل</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSellModal();
              }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-teal-600 text-white font-bold rounded-xl text-xs shadow-md cursor-pointer"
            >
              <Store className="w-3.5 h-3.5" />
              <span>بيع كتاجر مستقل</span>
            </button>
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              if (onOpenAdmin) onOpenAdmin();
            }}
            className="w-full py-2.5 bg-gray-900 text-amber-300 font-bold rounded-xl text-xs flex items-center justify-center gap-2 border border-gray-800 shadow-sm cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>لوحة تحكم الإدارة (Admin Dashboard)</span>
          </button>

          <ul className="space-y-1 pt-2">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a 
                  href={`#${link.id}`}
                  onClick={(e) => {
                    handleNavLinkClick(link, e);
                    setMobileMenuOpen(false);
                  }}
                  className={`block px-3 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                    link.isUsedTab && activeCategory === "المنتجات المستعملة"
                      ? 'bg-amber-50 text-amber-800 font-bold'
                      : 'text-gray-700 hover:bg-teal-50 hover:text-teal-600'
                  }`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Contact Channels Section */}
          <div className="mt-4 pt-3 border-t border-gray-100 bg-gray-50/80 rounded-2xl p-3 space-y-3">
            <div className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-teal-600" />
              <span>تواصل مع City Store مباشرة:</span>
            </div>

            {/* Direct Phone Calls */}
            <div className="space-y-1">
              <div className="text-[10px] font-bold text-gray-400">أرقام الاتصال الهاتفي:</div>
              <div className="grid grid-cols-2 gap-2">
                {siteConfig.contact.phones.map((phone, i) => (
                  <a
                    key={i}
                    href={`tel:${phone.raw}`}
                    className="flex flex-col items-center justify-center p-2 bg-white hover:bg-teal-50 text-gray-800 rounded-xl border border-gray-200 text-center shadow-2xs"
                  >
                    <span className="text-[11px] font-bold text-teal-800">{phone.label}</span>
                    <span className="text-[10px] font-mono text-gray-500" dir="ltr">{phone.number}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Direct WhatsApp Chats */}
            <div className="space-y-1">
              <div className="text-[10px] font-bold text-gray-400">محادثات الواتساب:</div>
              <div className="grid grid-cols-2 gap-2">
                {siteConfig.contact.whatsapp.map((wa, i) => (
                  <a
                    key={i}
                    href={wa.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2 px-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs text-center"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5" />
                    <span className="truncate">{wa.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Facebook Pages */}
            <div className="space-y-1">
              <div className="text-[10px] font-bold text-gray-400">صفحات الفيسبوك:</div>
              <div className="grid grid-cols-2 gap-2">
                {siteConfig.contact.facebook.map((fb, i) => (
                  <a
                    key={i}
                    href={fb.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2 px-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs text-center"
                  >
                    <FacebookIcon className="w-3.5 h-3.5" />
                    <span className="truncate">{fb.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
