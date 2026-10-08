import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Truck, 
  CreditCard, 
  Banknote, 
  Phone, 
  MapPin, 
  User, 
  ArrowLeft, 
  ShieldCheck,
  Smartphone,
  Lock,
  Calendar,
  Sparkles,
  Info,
  Printer,
  FileText,
  Tag,
  Clock,
  PackageCheck,
  MessageCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function CheckoutModal({ 
  isOpen, 
  onClose, 
  cartItems, 
  subtotal, 
  shipping, 
  total, 
  onOrderSuccess 
}) {
  if (!isOpen) return null;

  const { user } = useAuth();

  // 1. Shipping Address & Phone State
  const [formData, setFormData] = useState({
    fullName: user ? user.name : '',
    phone: user ? user.phone : '',
    city: 'الرياض',
    district: '',
    address: '',
    notes: '',
    saveAddress: true
  });

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  // 2. Typical Payment Methods State ('card' | 'cod')
  const [paymentMethod, setPaymentMethod] = useState('card');

  // Mock Credit Card Form State
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState(user ? user.name.toUpperCase() : '');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  // Submission & Confirmation State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  
  // Generated Reference Numbers
  const [orderId, setOrderId] = useState('');
  const [financialRef, setFinancialRef] = useState('');
  const [orderDate, setOrderDate] = useState('');

  const cities = [
    'الرياض',
    'جدة',
    'مكة المكرمة',
    'المدينة المنورة',
    'الدمام',
    'الخبر',
    'القاهرة',
    'الإسكندرية',
    'أبها',
    'بريدة',
    'تبوك'
  ];

  // Auto-fill Demo Card (بطاقة وهمية للعرض بنقرة واحدة)
  const handleFillDemoCard = () => {
    setCardNumber('4242 4242 4242 4242');
    setCardHolder(user ? user.name.toUpperCase() : 'MOHAMMED AL-SAUD');
    setCardExpiry('12/28');
    setCardCvc('884');
  };

  // Format Card Number (grouped by 4 digits)
  const handleCardNumberChange = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 16) val = val.slice(0, 16);
    const formatted = val.match(/.{1,4}/g)?.join(' ') || val;
    setCardNumber(formatted);
  };

  // Format Expiry (MM/YY)
  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 4) val = val.slice(0, 4);
    if (val.length >= 3) {
      val = val.slice(0, 2) + '/' + val.slice(2);
    }
    setCardExpiry(val);
  };

  // Apply Coupon
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (code === 'CITY15' || code === 'RAWAA15') {
      setDiscountPercent(15);
      setCouponApplied(true);
    } else {
      setCouponError('كود الخصم غير صالح أو منتهي الصلاحية');
    }
  };

  // Financial Calculations
  const discountAmount = couponApplied ? Math.round((subtotal * discountPercent) / 100) : 0;
  const discountedSubtotal = subtotal - discountAmount;
  const finalTotal = discountedSubtotal + shipping;

  // 3. Submit & Generate Order Confirmation + Financial Reference
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedOrderId = 'RAW-' + Math.floor(100000 + Math.random() * 900000);
      const generatedFinancialRef = 'TXN-REF-SAR-' + Math.floor(10000000 + Math.random() * 90000000);
      const nowFormatted = new Date().toLocaleDateString('ar-SA', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      });

      setOrderId(generatedOrderId);
      setFinancialRef(generatedFinancialRef);
      setOrderDate(nowFormatted);
      setIsSubmitting(false);
      setOrderCompleted(true);

      if (onOrderSuccess) {
        onOrderSuccess(generatedOrderId);
      }
    }, 1200);
  };

  // WhatsApp Order Checkout from form
  const handleWhatsAppOrderForm = () => {
    const itemsText = cartItems.map((item, i) => 
      `${i + 1}. *${item.name}* ${item.isUsed ? `(مستعمل - ${item.condition})` : '(جديد)'} - الكمية: ${item.quantity} - السعر: ${item.price * item.quantity} ج.م`
    ).join('\n');

    const message = `مرحباً City Store 🛍️، أود تأكيد الطلب التالي:\n\n📦 *قائمة المنتجات:*\n${itemsText}\n\n--------------------------------\n📍 *بيانات المستلم والتوصيل:*\n- الاسم: ${formData.fullName || 'غير محدد'}\n- الجوال: ${formData.phone || 'غير محدد'}\n- العنوان: ${formData.city}، ${formData.district}، ${formData.address}\n--------------------------------\n💰 *المجموع الفرعي:* ${subtotal} ج.م\n🚚 *الشحن:* ${shipping === 0 ? 'مجاني 🚀' : `${shipping} ج.م`}\n💵 *الإجمالي النهائي:* ${finalTotal} ج.م\n💳 *طريقة الدفع:* ${paymentMethod === 'card' ? 'بطاقة بنكية' : 'الدفع عند الاستلام'}\n--------------------------------\nيرجى تأكيد استلام الطلب وموعد التوصيل. شكراً لكم!`;

    const storeWhatsAppNumber = "966500000000";
    const url = `https://api.whatsapp.com/send?phone=${storeWhatsAppNumber}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // WhatsApp Share Invoice from Confirmation Screen
  const handleWhatsAppShareInvoice = () => {
    const itemsText = cartItems.map((item, i) => 
      `${i + 1}. ${item.name} ×${item.quantity} = ${item.price * item.quantity} ج.م`
    ).join('\n');

    const message = `فاتورة تأكيد طلب City Store 🧾\n--------------------------------\n📦 *رقم الطلب:* ${orderId}\n💳 *الرقم المالي المرجعي:* ${financialRef}\n📅 *التاريخ:* ${orderDate}\n--------------------------------\n👤 *المستلم:* ${formData.fullName}\n📍 *العنوان:* ${formData.city}، ${formData.district}، ${formData.address}\n📱 *الجوال:* ${formData.phone}\n--------------------------------\n📋 *المنتجات:*\n${itemsText}\n--------------------------------\n💰 *المبلغ الإجمالي:* ${finalTotal} ج.م (${paymentMethod === 'card' ? 'مدفوع ومعتمد ✓' : 'مستحق عند الاستلام'})\n--------------------------------\nشكراً لتسوقكم معنا!`;

    const storeWhatsAppNumber = "966500000000";
    const url = `https://api.whatsapp.com/send?phone=${storeWhatsAppNumber}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleFinish = () => {
    setOrderCompleted(false);
    onClose();
  };

  const handlePrint = () => {
    window.print();
  };

  const isVisa = cardNumber.startsWith('4');
  const isMaster = cardNumber.startsWith('5');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-3 sm:p-4 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        onClick={orderCompleted ? handleFinish : onClose} 
        className="fixed inset-0 bg-gray-900/60 backdrop-blur-xs transition-opacity animate-fade-in" 
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl max-w-3xl w-full p-5 sm:p-8 shadow-2xl z-10 overflow-hidden my-4 max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={orderCompleted ? handleFinish : onClose}
          className="absolute top-5 left-5 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!orderCompleted ? (
          <div>
            {/* Header */}
            <div className="mb-6 border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2 text-teal-600 font-bold text-xs mb-1">
                <Truck className="w-4 h-4" />
                <span>صفحة إتمام الشراء الآمن (Checkout)</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
                بيانات الشحن والدفع
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                أدخل عنوان التوصيل ورقم الجوال واختر طريقة الدفع لتأكيد طلبك أو أرسله مباشرة عبر الواتساب.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* 1. SHIPPING ADDRESS & PHONE FORM */}
              <div className="bg-gray-50/80 rounded-2xl p-4 sm:p-5 border border-gray-100 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-teal-600" />
                    <span>1. عنوان الشحن ورقم الهاتف</span>
                  </h3>
                  <span className="text-[11px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full font-bold">
                    توصيل سريع 24-48 ساعة
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      الاسم الكامل للمستلم <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: يوسف أحمد السبيعي"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-gray-200 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      رقم الجوال للتواصل والتوصيل <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        placeholder="05XXXXXXXX / 01XXXXXXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-gray-200 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none font-mono"
                        dir="ltr"
                      />
                      <Phone className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* City */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      المدينة <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-gray-200 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none cursor-pointer"
                    >
                      {cities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>

                  {/* District / Street */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      الحي واسم الشارع <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: حي النخيل، شارع الملك عبدالعزيز"
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-gray-200 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                    />
                  </div>
                </div>

                {/* Detailed Address */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    العنوان بالتفصيل ورقم المبنى / الشقة <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: عمارة رقم 14، الدور الثاني، شقة 5"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-gray-200 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                  />
                </div>

                {/* Delivery Notes */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    ملاحظات التوصيل لمندوب الشحن (اختياري)
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: يرجى الاتصال قبل الوصول بنصف ساعة"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3.5 py-2 bg-white rounded-xl border border-gray-200 text-sm focus:border-teal-500 outline-none"
                  />
                </div>
              </div>

              {/* 2. TYPICAL PAYMENT OPTIONS */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-teal-600" />
                    <span>2. خيارات الدفع المتاحة</span>
                  </h3>
                  <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    <span>تشفير 256-bit SSL آمن</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* Option A: Mock Credit Card */}
                  <label 
                    className={`flex flex-col justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      paymentMethod === 'card' 
                        ? 'border-teal-600 bg-teal-50/60 shadow-xs' 
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-teal-600" />
                        <span className="text-xs font-bold text-gray-900">بطاقة ائتمان / مدى (تجريبية)</span>
                      </div>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="text-teal-600 focus:ring-teal-500"
                      />
                    </div>
                    <div className="text-[11px] text-gray-500 flex items-center justify-between">
                      <span>Visa / MasterCard / Mada</span>
                      <span className="text-[10px] bg-teal-100 text-teal-800 font-bold px-1.5 py-0.5 rounded">بطاقة تجريبية</span>
                    </div>
                  </label>

                  {/* Option B: Cash on Delivery */}
                  <label 
                    className={`flex flex-col justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      paymentMethod === 'cod' 
                        ? 'border-teal-600 bg-teal-50/60 shadow-xs' 
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Banknote className="w-5 h-5 text-teal-600" />
                        <span className="text-xs font-bold text-gray-900">الدفع عند الاستلام (COD)</span>
                      </div>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="text-teal-600 focus:ring-teal-500"
                      />
                    </div>
                    <div className="text-[11px] text-gray-500 flex items-center justify-between">
                      <span>نقداً أو بالبطاقة عند وصول المندوب</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">بدون رسوم</span>
                    </div>
                  </label>

                </div>

                {/* Subform: Mock Credit Card Interactive Form */}
                {paymentMethod === 'card' && (
                  <div className="p-5 bg-gradient-to-b from-gray-50 to-gray-100/80 rounded-2xl border border-gray-200 space-y-4 animate-fade-in">
                    
                    {/* Auto-fill Mock Card button */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-teal-600" />
                        بيانات البطاقة الائتمانية الوهمية:
                      </span>

                      <button
                        type="button"
                        onClick={handleFillDemoCard}
                        className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-xs rounded-lg shadow-xs transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
                        title="تعبئة بطاقة فيزا وهمية جاهزة للاختبار"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>⚡ تعبئة بيانات بطاقة تجريبية</span>
                      </button>
                    </div>

                    {/* Interactive 3D Visual Card Preview */}
                    <div className="relative mx-auto max-w-sm rounded-2xl p-5 bg-gradient-to-tr from-gray-900 via-teal-950 to-gray-800 text-white shadow-xl overflow-hidden border border-gray-700/60">
                      <div className="flex justify-between items-start mb-5">
                        <div className="w-10 h-7 bg-amber-400/90 rounded-md shadow-inner" />
                        <span className="text-xs font-black tracking-widest text-teal-300">
                          {isVisa ? 'VISA DEMO' : isMaster ? 'MasterCard' : 'MADA / CREDIT'}
                        </span>
                      </div>
                      
                      <div className="font-mono text-base sm:text-lg tracking-widest mb-4 dir-ltr text-center font-bold">
                        {cardNumber || '•••• •••• •••• ••••'}
                      </div>

                      <div className="flex justify-between items-end text-xs">
                        <div>
                          <div className="text-[9px] text-gray-400">حامل البطاقة</div>
                          <div className="font-semibold uppercase tracking-wider truncate max-w-[140px]">
                            {cardHolder || 'CARDHOLDER NAME'}
                          </div>
                        </div>
                        <div className="text-left">
                          <div className="text-[9px] text-gray-400">تنتهي في</div>
                          <div className="font-semibold font-mono">{cardExpiry || 'MM/YY'}</div>
                        </div>
                      </div>
                    </div>

                    {/* Card input fields */}
                    <div className="space-y-3 pt-1">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          رقم البطاقة (16 رقماً) <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required={paymentMethod === 'card'}
                          placeholder="4242 4242 4242 4242"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          maxLength={19}
                          className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-gray-300 text-sm font-mono tracking-wider focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                          dir="ltr"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          الاسم كما يظهر على البطاقة <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required={paymentMethod === 'card'}
                          placeholder="MOHAMMED AHMED"
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                          className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-gray-300 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            تاريخ الانتهاء <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            required={paymentMethod === 'card'}
                            placeholder="MM/YY"
                            value={cardExpiry}
                            onChange={handleExpiryChange}
                            maxLength={5}
                            className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-gray-300 text-sm font-mono text-center focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                            dir="ltr"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            رمز الأمان (CVC / CVV) <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="password"
                            required={paymentMethod === 'card'}
                            placeholder="•••"
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                            maxLength={4}
                            className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-gray-300 text-sm font-mono text-center focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                            dir="ltr"
                          />
                        </div>
                      </div>
                    </div>

                  </div>
                )}

                {/* Subform: COD Note */}
                {paymentMethod === 'cod' && (
                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200/80 text-xs text-emerald-950 space-y-1.5 animate-fade-in">
                    <div className="font-bold flex items-center gap-1.5 text-emerald-900">
                      <Banknote className="w-4 h-4 text-emerald-600" />
                      <span>طريقة الدفع عند الاستلام:</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      يمكنك فحص مشترياتك والتأكد من مطابقتها قبل السداد لمندوب شركة الشحن، نقداً أو ببطاقتك البنكية عبر جهاز نقاط البيع المحمول POS.
                    </p>
                  </div>
                )}
              </div>

              {/* Promo Coupon Box */}
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="أدخل كود الخصم (جرب: CITY15)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={couponApplied}
                      className="w-full px-3.5 py-2 bg-white rounded-xl border border-gray-300 text-xs focus:border-teal-500 outline-none uppercase font-bold"
                      dir="ltr"
                    />
                    <Tag className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={couponApplied}
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-700 disabled:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap"
                  >
                    {couponApplied ? 'تم التفعيل ✓' : 'تطبيق الخصم'}
                  </button>
                </div>
                {couponApplied && (
                  <div className="text-[11px] text-emerald-700 font-bold mt-1.5">
                    🎉 تم تطبيق خصم {discountPercent}% بقيمة {discountAmount} ج.م!
                  </div>
                )}
                {couponError && (
                  <div className="text-[11px] text-rose-600 font-bold mt-1.5">
                    {couponError}
                  </div>
                )}
              </div>

              {/* Order Total Breakdown */}
              <div className="bg-gray-900 text-white rounded-2xl p-4 sm:p-5 space-y-2.5">
                <div className="flex justify-between text-xs text-gray-300">
                  <span>المجموع الفرعي ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} عناصر):</span>
                  <span className="font-bold text-white">{subtotal} ج.م</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-xs text-emerald-400">
                    <span>خصم الكوبون ({discountPercent}%):</span>
                    <span className="font-bold">-{discountAmount} ج.م</span>
                  </div>
                )}
                <div className="flex justify-between text-xs text-gray-300">
                  <span>تكلفة الشحن والتوصيل:</span>
                  <span className="font-bold text-teal-400">
                    {shipping === 0 ? 'مجاني 🚀' : `${shipping} ج.م`}
                  </span>
                </div>
                <div className="border-t border-gray-800 pt-2.5 flex justify-between text-base sm:text-lg font-black text-white">
                  <span>المبلغ الإجمالي المطلوب:</span>
                  <span className="text-teal-300 text-xl font-black">{finalTotal} ج.م</span>
                </div>
              </div>

              {/* 3. 'إتمام الطلب' SUBMISSION BUTTONS */}
              <div className="space-y-2.5 pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 disabled:bg-gray-400 text-white font-black rounded-2xl shadow-xl shadow-teal-600/30 transition-all text-base active:scale-98 cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>جاري معالجة وتأكيد طلبك...</span>
                    </div>
                  ) : (
                    <>
                      <span>إتمام الطلب وتأكيد الشراء ({finalTotal} ج.م)</span>
                      <ArrowLeft className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* WhatsApp Direct Order Button from Checkout Form */}
                <button
                  type="button"
                  onClick={handleWhatsAppOrderForm}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-md shadow-emerald-600/20 active:scale-98 transition-all text-sm cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-white" />
                  <span>إرسال وتأكيد الطلب مباشرة عبر الواتساب</span>
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>ضمان City Store الذهبي: فحص ومعاينة عند الاستلام واسترجاع مجاني 14 يوم</span>
                </div>
              </div>

            </form>
          </div>
        ) : (
          /* 3. ORDER CONFIRMATION & FINANCIAL REFERENCE NUMBER SCREEN */
          <div className="py-4 sm:py-6 space-y-6 animate-fade-in" id="printable-receipt">
            
            {/* Success Badge & Header */}
            <div className="text-center space-y-2">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
                ✓ تم استلام وتأكيد طلبك بنجاح
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">
                شكراً لتسوقك معنا، {formData.fullName}!
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
                تم تسجيل طلبك في النظام وجاري تجهيز الشحنة لتسليمها لشركة التوصيل.
              </p>
            </div>

            {/* FINANCIAL REFERENCE & ORDER IDS BOX */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl border border-teal-200/80 text-xs">
              <div className="space-y-1">
                <span className="text-gray-500 font-semibold">رقم الطلب (Order ID):</span>
                <div className="text-base font-black text-teal-800 font-mono">
                  {orderId}
                </div>
              </div>

              <div className="space-y-1 sm:text-left">
                <span className="text-gray-500 font-semibold">الرقم المالي المرجعي (Financial Ref):</span>
                <div className="text-sm font-black text-emerald-700 font-mono">
                  {financialRef}
                </div>
              </div>
            </div>

            {/* Delivery Timeline Indicator */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs space-y-3">
              <div className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-teal-600" />
                <span>حالة تتبع الشحنة:</span>
              </div>
              
              <div className="grid grid-cols-4 gap-2 text-center text-[10px] sm:text-xs">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                  <div className="w-2 h-2 rounded-full bg-emerald-600 mx-auto mb-1" />
                  <span>تم التأكيد ✓</span>
                </div>
                <div className="p-2 rounded-xl bg-teal-50 text-teal-800 font-bold border border-teal-200">
                  <div className="w-2 h-2 rounded-full bg-teal-600 mx-auto mb-1 animate-ping" />
                  <span>قيد التجهيز</span>
                </div>
                <div className="p-2 rounded-xl bg-gray-50 text-gray-400 font-medium">
                  <div className="w-2 h-2 rounded-full bg-gray-300 mx-auto mb-1" />
                  <span>مع المندوب</span>
                </div>
                <div className="p-2 rounded-xl bg-gray-50 text-gray-400 font-medium">
                  <div className="w-2 h-2 rounded-full bg-gray-300 mx-auto mb-1" />
                  <span>تم التسليم</span>
                </div>
              </div>
            </div>

            {/* Order Invoice Summary Details */}
            <div className="bg-gray-50 p-4 sm:p-5 rounded-2xl border border-gray-200 text-xs text-gray-700 space-y-3">
              <div className="font-bold text-sm text-gray-900 border-b border-gray-200 pb-2 flex items-center justify-between">
                <span>ملخص الفاتورة الضريبية المبسطة:</span>
                <span className="text-[11px] text-gray-500 font-normal">{orderDate}</span>
              </div>

              {/* Products List */}
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-2 py-1 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-2 truncate">
                      <img src={item.image} alt={item.name} className="w-8 h-8 rounded-lg object-cover bg-white shrink-0" />
                      <span className="font-semibold text-gray-900 truncate">{item.name}</span>
                      <span className="text-gray-500">×{item.quantity}</span>
                    </div>
                    <span className="font-bold text-gray-900 whitespace-nowrap">{item.price * item.quantity} ج.م</span>
                  </div>
                ))}
              </div>

              {/* Delivery and Payment Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-gray-200 text-[11px]">
                <div>
                  <span className="text-gray-500">عنوان الشحن: </span>
                  <span className="font-semibold text-gray-900">{formData.city}، {formData.district}، {formData.address}</span>
                </div>
                <div>
                  <span className="text-gray-500">رقم الهاتف: </span>
                  <span className="font-semibold text-gray-900 font-mono">{formData.phone}</span>
                </div>
                <div>
                  <span className="text-gray-500">طريقة الدفع: </span>
                  <span className="font-semibold text-teal-700">
                    {paymentMethod === 'card' ? 'بطاقة بنكية (Visa / Mada)' : 'الدفع عند الاستلام (COD)'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">حالة السداد: </span>
                  <span className="font-semibold text-emerald-600">
                    {paymentMethod === 'card' ? 'مدفوع ومعتمد ✓' : 'مستحق عند التسليم'}
                  </span>
                </div>
              </div>

              {/* Grand Total Breakdown */}
              <div className="pt-2 border-t border-gray-200 flex justify-between items-center text-sm font-black text-gray-900">
                <span>المبلغ الإجمالي المسجل:</span>
                <span className="text-teal-700 text-base">{finalTotal} ج.م</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
              <button
                onClick={handleWhatsAppShareInvoice}
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white text-white" />
                <span>إرسال الفاتورة عبر الواتساب</span>
              </button>

              <button
                onClick={handlePrint}
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3 bg-white hover:bg-gray-50 text-gray-800 font-bold text-xs rounded-xl border border-gray-300 shadow-xs transition-all cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>طباعة الفاتورة</span>
              </button>

              <button
                onClick={handleFinish}
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md shadow-teal-600/25 transition-all cursor-pointer"
              >
                <span>متابعة التسوق</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
