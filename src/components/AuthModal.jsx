import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  ShoppingBag, 
  Store, 
  Sparkles, 
  ArrowLeft,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal() {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    authMode, 
    setAuthMode, 
    login, 
    register, 
    loginAsDemo 
  } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('buyer'); // 'buyer' | 'seller'
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (authMode === 'login') {
        if (!email.trim() || !password.trim()) {
          setErrorMsg('يرجى ملء جميع الحقول المطلوبة');
          setLoading(false);
          return;
        }
        await login(email, password);
      } else {
        if (!name.trim() || !email.trim() || !password.trim()) {
          setErrorMsg('يرجى ملء كافة البيانات المطلوبة');
          setLoading(false);
          return;
        }
        await register({ name, email, password, phone, role });
      }
    } catch (err) {
      setErrorMsg('حدث خطأ أثناء المعالجة، يرجى المحاولة ثانية');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        onClick={closeAuthModal} 
        className="fixed inset-0 bg-gray-900/60 backdrop-blur-xs transition-opacity animate-fade-in" 
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl z-10 overflow-hidden my-6">
        
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 left-5 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-400 flex items-center justify-center text-white shadow-md mx-auto mb-3">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-gray-900">
            {authMode === 'login' ? 'مرحباً بعودتك إلى City Store' : 'إنشاء حساب جديد'}
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            {authMode === 'login' 
              ? 'سجل دخولك لمتابعة طلباتك أو إدارة منتجاتك المعروضة' 
              : 'انضم لآلاف المتسوقين والبائعين المستقلين في City Store'}
          </p>
        </div>

        {/* Login / Register Tab Switcher */}
        <div className="flex rounded-2xl bg-gray-100 p-1 mb-6">
          <button
            type="button"
            onClick={() => {
              setAuthMode('login');
              setErrorMsg('');
            }}
            className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              authMode === 'login'
                ? 'bg-white text-gray-900 shadow-xs'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            تسجيل الدخول
          </button>
          
          <button
            type="button"
            onClick={() => {
              setAuthMode('register');
              setErrorMsg('');
            }}
            className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              authMode === 'register'
                ? 'bg-white text-gray-900 shadow-xs'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            حساب جديد
          </button>
        </div>

        {/* Quick Demo Logins Banner */}
        <div className="mb-6 p-3 bg-teal-50/70 rounded-2xl border border-teal-100 text-xs">
          <div className="font-bold text-teal-900 mb-1.5 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>تسجيل دخول سريع للتجربة (بنقرة واحدة):</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => loginAsDemo('buyer')}
              className="py-1.5 px-2.5 bg-white hover:bg-teal-600 hover:text-white border border-teal-200 text-teal-800 rounded-lg font-semibold transition-all text-[11px] cursor-pointer"
            >
              🛍️ حساب مشتري تجريبي
            </button>
            <button
              type="button"
              onClick={() => loginAsDemo('seller')}
              className="py-1.5 px-2.5 bg-white hover:bg-amber-600 hover:text-white border border-amber-200 text-amber-800 rounded-lg font-semibold transition-all text-[11px] cursor-pointer"
            >
              🏪 حساب بائع تجريبي
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-bold text-center animate-fade-in">
            {errorMsg}
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {authMode === 'register' && (
            <>
              {/* Account Type Selector */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  نوع الحساب:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('buyer')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                      role === 'buyer'
                        ? 'border-teal-600 bg-teal-50 text-teal-800'
                        : 'border-gray-200 text-gray-600'
                    }`}
                  >
                    مشتري (للتسوق)
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('seller')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                      role === 'seller'
                        ? 'border-amber-600 bg-amber-50 text-amber-800'
                        : 'border-gray-200 text-gray-600'
                    }`}
                  >
                    بائع مستقل (للبيع)
                  </button>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  الاسم الكامل <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="مثال: يوسف أحمد"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-4 pr-10 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                  />
                  <User className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  رقم الجوال
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="05XXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-4 pr-10 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                    dir="ltr"
                  />
                  <Phone className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </>
          )}

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              البريد الإلكتروني <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                dir="ltr"
              />
              <Mail className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-semibold text-gray-700">
                كلمة المرور <span className="text-rose-500">*</span>
              </label>
              {authMode === 'login' && (
                <button
                  type="button"
                  onClick={() => alert('تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني.')}
                  className="text-[11px] text-teal-600 hover:underline"
                >
                  نسيت كلمة المرور؟
                </button>
              )}
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none font-mono"
                dir="ltr"
              />
              <Lock className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white font-bold rounded-xl shadow-md shadow-teal-600/25 transition-all text-sm active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{authMode === 'login' ? 'دخول إلى حسابي' : 'إنشاء حساب والبدء'}</span>
                  <ArrowLeft className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </form>

        {/* Security Footer */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-center gap-2 text-[11px] text-gray-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>حماية وتشفير عالي للبيانات وفق معايير الأمان</span>
        </div>

      </div>
    </div>
  );
}
