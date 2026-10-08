import React, { useState } from 'react';
import { 
  X, 
  Store, 
  DollarSign, 
  Calculator, 
  Upload, 
  CheckCircle2, 
  User, 
  Phone, 
  CreditCard, 
  Tag, 
  FileText, 
  Image as ImageIcon,
  Sparkles,
  ArrowLeft,
  ShieldCheck
} from 'lucide-react';

export default function SellWithUsModal({ isOpen, onClose, onAddProduct, categories }) {
  if (!isOpen) return null;

  // Form states
  const [sellerName, setSellerName] = useState('');
  const [sellerPhone, setSellerPhone] = useState('');
  const [payoutMethod, setPayoutMethod] = useState('bank'); // 'bank' | 'wallet'
  const [payoutDetails, setPayoutDetails] = useState('');

  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState(categories[1] || 'إلكترونيات');
  const [sellerPrice, setSellerPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [submitted, setSubmitted] = useState(false);

  // Commission calculation (10%)
  const COMMISSION_RATE = 0.10;
  const numericPrice = parseFloat(sellerPrice) || 0;
  const commissionAmount = Math.round(numericPrice * COMMISSION_RATE);
  // Final price to customer = seller desired price + store commission (or seller price includes commission)
  const finalCustomerPrice = numericPrice > 0 ? numericPrice + commissionAmount : 0;
  const netSellerPayout = numericPrice;

  // Pre-filled placeholder image suggestions
  const sampleImages = [
    { label: "سماعات / أجهزة", url: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80" },
    { label: "ساعة ذكية", url: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80" },
    { label: "إكسسوارات / محفظة", url: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=80" },
    { label: "عطر فاخر", url: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&auto=format&fit=crop&q=80" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalImage = imageUrl.trim() || sampleImages[0].url;

    const newProduct = {
      id: Date.now(),
      name: productName,
      price: finalCustomerPrice,
      originalPrice: Math.round(finalCustomerPrice * 1.2), // show small discount comparison
      category: category,
      image: finalImage,
      rating: 5.0,
      reviewsCount: 1,
      badge: "منتج بائع مستقل",
      description: description || "منتج عالي الجودة معروض بواسطة بائع مستقل موثوق عبر منصة City Store.",
      isIndependentSeller: true,
      sellerName: sellerName,
      sellerPhone: sellerPhone,
      sellerPayoutDetails: payoutDetails,
      netPayout: netSellerPayout,
      sellerNote: "يباع بواسطة بائع مستقل"
    };

    onAddProduct(newProduct);
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setSellerName('');
    setSellerPhone('');
    setPayoutDetails('');
    setProductName('');
    setSellerPrice('');
    setDescription('');
    setImageUrl('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        onClick={submitted ? handleResetAndClose : onClose}
        className="fixed inset-0 bg-gray-900/60 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl z-10 overflow-hidden my-8">
        
        {/* Close Button */}
        <button
          onClick={submitted ? handleResetAndClose : onClose}
          className="absolute top-5 left-5 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Header */}
            <div className="mb-6 border-b border-gray-100 pb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200/60 rounded-full text-xs font-bold mb-2">
                <Store className="w-3.5 h-3.5 text-amber-600" />
                <span>برنامج البائع المستقل • Sell With Us</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
                اعرض منتجك للبيع معنا
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                انضم إلى نخبة البائعين في City Store، واعرض منتجاتك لآلاف العملاء يومياً مع تحويل أرباحك مباشرة لمحفظتك أو حسابك البنكي!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Section 1: Seller Information */}
              <div className="bg-gray-50/80 rounded-2xl p-4 sm:p-5 border border-gray-100 space-y-4">
                <div className="flex items-center gap-2 text-gray-900 font-bold text-sm">
                  <User className="w-4 h-4 text-teal-600" />
                  <span>1. بيانات البائع وحساب استلام الأرباح</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      اسمك الكامل أو اسم متجرك <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: متجر الأناقة / أحمد خالد"
                      value={sellerName}
                      onChange={(e) => setSellerName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-gray-200 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      رقم الهاتف / الواتساب للتواصل <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="05XXXXXXXX"
                      value={sellerPhone}
                      onChange={(e) => setSellerPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-gray-200 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    طريقة تحويل الأرباح <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3 mb-2">
                    <button
                      type="button"
                      onClick={() => setPayoutMethod('bank')}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                        payoutMethod === 'bank'
                          ? 'border-teal-600 bg-teal-50 text-teal-800'
                          : 'border-gray-200 bg-white text-gray-600'
                      }`}
                    >
                      حساب بنكي (IBAN)
                    </button>
                    <button
                      type="button"
                      onClick={() => setPayoutMethod('wallet')}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                        payoutMethod === 'wallet'
                          ? 'border-teal-600 bg-teal-50 text-teal-800'
                          : 'border-gray-200 bg-white text-gray-600'
                      }`}
                    >
                      محفظة إلكترونية (Vodafone / STC / InstaPay)
                    </button>
                  </div>

                  <input
                    type="text"
                    required
                    placeholder={
                      payoutMethod === 'bank'
                        ? 'رقم الآيبان (SAxxxxxxxxxxxxxxxxxxxxxxxx)'
                        : 'رقم المحفظة الإلكترونية أو معرف InstaPay'
                    }
                    value={payoutDetails}
                    onChange={(e) => setPayoutDetails(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-gray-200 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Section 2: Product Details */}
              <div className="bg-gray-50/80 rounded-2xl p-4 sm:p-5 border border-gray-100 space-y-4">
                <div className="flex items-center gap-2 text-gray-900 font-bold text-sm">
                  <Tag className="w-4 h-4 text-teal-600" />
                  <span>2. تفاصيل المنتج</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      اسم المنتج <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: ساعة يد كلاسيكية جلد طبيعي"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-gray-200 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      فئة المنتج <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-gray-200 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none cursor-pointer"
                    >
                      {categories.filter(c => c !== "الكل").map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    وصف المنتج ومميزاته <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="اكتب وصفاً موجزاً وجذاباً للمنتج ومواصفاته..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-gray-200 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    رابط صورة المنتج (URL)
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-gray-200 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                    dir="ltr"
                  />
                  
                  {/* Sample Image Quick Buttons */}
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-gray-500">أو اختر صورة توضيحية سريعة:</span>
                    {sampleImages.map((s, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setImageUrl(s.url)}
                        className="px-2.5 py-1 bg-gray-100 hover:bg-teal-50 hover:text-teal-700 rounded-lg text-[11px] font-medium transition-colors"
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>

                  {/* Image Preview */}
                  {imageUrl && (
                    <div className="mt-3 flex items-center gap-3 p-2 bg-white rounded-xl border border-gray-200">
                      <img 
                        src={imageUrl} 
                        alt="معاينة" 
                        className="w-14 h-14 rounded-lg object-cover bg-gray-50"
                        onError={(e) => { e.target.src = sampleImages[0].url; }}
                      />
                      <span className="text-xs text-gray-500">معاينة صورة المنتج المقترحة</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Section 3: Pricing & Dynamic Commission Calculator */}
              <div className="bg-gradient-to-br from-teal-50/80 via-emerald-50/60 to-white rounded-2xl p-5 border border-teal-200/80 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-teal-900 font-bold text-sm">
                    <Calculator className="w-4 h-4 text-teal-600" />
                    <span>3. حاسبة العمولة والأسعار التلقائية (10% عمولة المنصة)</span>
                  </div>
                  <span className="text-[11px] font-bold bg-teal-600 text-white px-2 py-0.5 rounded-full">
                    حساب فوري
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    السعر المطلوب الذي ترغب في تحصيله (صافي أرباحك) بالريال <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      required
                      min="10"
                      step="5"
                      placeholder="مثال: 300"
                      value={sellerPrice}
                      onChange={(e) => setSellerPrice(e.target.value)}
                      className="w-full pl-12 pr-4 py-2.5 bg-white rounded-xl border border-teal-300 text-base font-bold text-gray-900 focus:border-teal-600 focus:ring-4 focus:ring-teal-500/15 outline-none"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-teal-700">
                      ج.م
                    </span>
                  </div>
                </div>

                {/* Calculation Cards Grid */}
                <div className="grid grid-cols-3 gap-3 pt-1 text-center">
                  
                  {/* Desired Payout */}
                  <div className="bg-white p-3 rounded-xl border border-teal-100 shadow-xs">
                    <div className="text-[11px] text-gray-500 mb-1">صافي أرباحك المحولة لك</div>
                    <div className="text-lg font-black text-emerald-600">
                      {netSellerPayout} <span className="text-xs font-normal">ج.م</span>
                    </div>
                    <div className="text-[10px] text-gray-400 mt-0.5">تحوّل إلى حسابك البنكي/محفظتك</div>
                  </div>

                  {/* Platform Commission */}
                  <div className="bg-white p-3 rounded-xl border border-teal-100 shadow-xs">
                    <div className="text-[11px] text-gray-500 mb-1">عمولة المنصة (10%)</div>
                    <div className="text-lg font-black text-amber-600">
                      {commissionAmount} <span className="text-xs font-normal">ج.م</span>
                    </div>
                    <div className="text-[10px] text-gray-400 mt-0.5">تشمل التسويق وإدارة الطلب</div>
                  </div>

                  {/* Final Price for Customers */}
                  <div className="bg-teal-600 text-white p-3 rounded-xl shadow-sm">
                    <div className="text-[11px] text-teal-100 mb-1">السعر النهائي للزبائن</div>
                    <div className="text-lg font-black text-white">
                      {finalCustomerPrice} <span className="text-xs font-normal text-teal-200">ج.م</span>
                    </div>
                    <div className="text-[10px] text-teal-100 mt-0.5">السعر المعروض في المتجر</div>
                  </div>

                </div>

              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-teal-600/25 transition-all text-sm sm:text-base active:scale-98"
                >
                  <Store className="w-5 h-5" />
                  <span>نشر وعرض المنتج في المتجر الآن</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>سيتم إضافة المنتج فوراً في المتجر مع شارة 'يباع بواسطة بائع مستقل'</span>
                </p>
              </div>

            </form>
          </div>
        ) : (
          /* Confirmation Success Screen */
          <div className="text-center py-8 space-y-5 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                تهانينا! تم نشر منتجك بنجاح
              </span>
              <h2 className="text-2xl font-black text-gray-900 mt-2">
                منتجك معروض الآن للبيع في المتجر
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                شكراً لك يا <span className="font-bold text-gray-800">{sellerName}</span>، أصبح منتجك متاحاً الآن لكافة الزوار مع وسم بائع مستقل.
              </p>
            </div>

            {/* Product Summary */}
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 max-w-md mx-auto text-xs text-gray-700 space-y-2 text-right">
              <div>🏷️ <span className="font-semibold">اسم المنتج:</span> {productName}</div>
              <div>💰 <span className="font-semibold">سعر العرض للزبائن:</span> <span className="font-bold text-teal-700">{finalCustomerPrice} ج.م</span></div>
              <div>💵 <span className="font-semibold">أرباحك الصافية عند البيع:</span> <span className="font-bold text-emerald-600">{netSellerPayout} ج.م</span></div>
              <div>🏦 <span className="font-semibold">بيانات التحويل المسجلة:</span> {payoutDetails}</div>
              <div className="text-amber-700 bg-amber-50 p-2 rounded-lg font-bold text-[11px]">
                ملاحظة: ستظهر عبارة 'يباع بواسطة بائع مستقل ({sellerName})' بجانب بطاقة المنتج.
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl shadow-md shadow-teal-600/25 transition-all"
            >
              مشاهدة المنتج في المتجر
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
