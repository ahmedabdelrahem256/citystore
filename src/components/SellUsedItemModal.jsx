import React, { useState } from 'react';
import { 
  X, 
  RotateCcw, 
  DollarSign, 
  Calculator, 
  CheckCircle2, 
  User, 
  Phone, 
  Tag, 
  Image as ImageIcon,
  Sparkles,
  ArrowLeft,
  ShieldCheck,
  Clock,
  HelpCircle,
  Package,
  CheckSquare
} from 'lucide-react';

export default function SellUsedItemModal({ isOpen, onClose, onAddUsedProduct, categories }) {
  if (!isOpen) return null;

  // Seller info
  const [sellerName, setSellerName] = useState('');
  const [sellerPhone, setSellerPhone] = useState('');
  const [sellerCity, setSellerCity] = useState('الرياض');
  const [payoutDetails, setPayoutDetails] = useState('');

  // Product info
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('إلكترونيات');
  const [condition, setCondition] = useState('كالجديد'); // 'كالجديد' | 'استعمال خفيف' | 'مستعمل بحالة ممتازة' | 'مستعمل بحالة جيدة'
  const [usageDuration, setUsageDuration] = useState('مستعمل لمدة شهرين');
  const [reasonForSelling, setReasonForSelling] = useState('الترقية إلى جهاز أحدث');
  
  // Accessories state
  const [accessoriesList, setAccessoriesList] = useState([
    'العلبة الأصلية',
    'كابل الشاحن الأصلي',
    'الفاتورة والضمان'
  ]);
  const [customAccessory, setCustomAccessory] = useState('');

  const [sellerPrice, setSellerPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Commission calculation (10%)
  const COMMISSION_RATE = 0.10;
  const numericPrice = parseFloat(sellerPrice) || 0;
  const commissionAmount = Math.round(numericPrice * COMMISSION_RATE);
  const finalCustomerPrice = numericPrice > 0 ? numericPrice + commissionAmount : 0;
  const netSellerPayout = numericPrice;

  // Pre-filled sample images for quick fill
  const sampleImages = [
    { label: "هاتف / آيفون", url: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=800&auto=format&fit=crop&q=80" },
    { label: "لابتوب ماك بوك", url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80" },
    { label: "أجهزة ألعاب / بلايستيشن", url: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format&fit=crop&q=80" },
    { label: "كاميرا احترافية", url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80" }
  ];

  const toggleAccessory = (item) => {
    if (accessoriesList.includes(item)) {
      setAccessoriesList(accessoriesList.filter(a => a !== item));
    } else {
      setAccessoriesList([...accessoriesList, item]);
    }
  };

  const handleAddCustomAccessory = (e) => {
    e.preventDefault();
    if (customAccessory.trim() && !accessoriesList.includes(customAccessory.trim())) {
      setAccessoriesList([...accessoriesList, customAccessory.trim()]);
      setCustomAccessory('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalImage = imageUrl.trim() || sampleImages[0].url;

    const newUsedProduct = {
      id: Date.now(),
      name: productName,
      price: finalCustomerPrice,
      originalPrice: Math.round(finalCustomerPrice * 1.35),
      category: category,
      image: finalImage,
      rating: 5.0,
      reviewsCount: 1,
      badge: `مستعمل - ${condition}`,
      description: description || `منتج مستعمل معروض من قبل ${sellerName} بحالة (${condition}) مع ملحقاته وفحصه الفني.`,
      isUsed: true,
      condition: condition,
      usageDuration: usageDuration,
      reasonForSelling: reasonForSelling,
      accessories: accessoriesList.length > 0 ? accessoriesList : ["الجهاز فقط"],
      sellerName: sellerName,
      sellerCity: sellerCity,
      sellerPhone: sellerPhone,
      sellerPayoutDetails: payoutDetails,
      netPayout: netSellerPayout,
      sellerNote: "يباع بواسطة بائع مستقل (منتج مستعمل)",
      realPhotos: [
        finalImage,
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80"
      ]
    };

    onAddUsedProduct(newUsedProduct);
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
      <div className="relative bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl z-10 overflow-hidden my-6">
        
        {/* Close Button */}
        <button
          onClick={submitted ? handleResetAndClose : onClose}
          className="absolute top-5 left-5 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Header */}
            <div className="mb-6 border-b border-gray-100 pb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200/80 rounded-full text-xs font-bold mb-2">
                <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
                <span>سوق المستعمل الموثوق • Sell Used Items</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
                اعرض منتجك المستعمل للبيع
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                تخلص من أجهزتك ومقتنياتك الزائدة واسترجع قيمتها نقداً بأمان، مع شفافية كاملة لحالة المنتج وملحقاته أمام المشترين.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Section 1: Seller Contact & Payout */}
              <div className="bg-gray-50/80 rounded-2xl p-4 sm:p-5 border border-gray-100 space-y-4">
                <div className="flex items-center gap-2 text-gray-900 font-bold text-sm">
                  <User className="w-4 h-4 text-teal-600" />
                  <span>1. بيانات البائع واستلام الأرباح</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      الاسم الكريم <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: فيصل الخالدي"
                      value={sellerName}
                      onChange={(e) => setSellerName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-gray-200 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      رقم الجوال للتواصل <span className="text-rose-500">*</span>
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

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      المدينة <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={sellerCity}
                      onChange={(e) => setSellerCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-gray-200 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none cursor-pointer"
                    >
                      <option value="الرياض">الرياض</option>
                      <option value="جدة">جدة</option>
                      <option value="الدمام">الدمام</option>
                      <option value="مكة المكرمة">مكة المكرمة</option>
                      <option value="المدينة المنورة">المدينة المنورة</option>
                      <option value="الخبر">الخبر</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    رقم الآيبان (IBAN) أو المحفظة الإلكترونية لتحويل أرباحك <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="رقم الآيبان البنكي أو رقم المحفظة (Vodafone / STC / InstaPay)"
                    value={payoutDetails}
                    onChange={(e) => setPayoutDetails(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-gray-200 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Section 2: Used Item Specifics & Condition */}
              <div className="bg-amber-50/50 rounded-2xl p-4 sm:p-5 border border-amber-200/60 space-y-4">
                <div className="flex items-center gap-2 text-amber-950 font-bold text-sm">
                  <RotateCcw className="w-4 h-4 text-amber-600" />
                  <span>2. تفاصيل وحالة المنتج المستعمل (Item Condition Details)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      اسم الجهاز / المنتج المستعمل <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: لابتوب Dell XPS 13 معالج i7"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-gray-200 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      الفئة <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-gray-200 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none cursor-pointer"
                    >
                      {categories.filter(c => c !== "الكل" && c !== "المنتجات المستعملة").map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Condition Selector */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">
                    درجة وحالة المنتج (Condition): <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: 'كالجديد', label: 'كالجديد', desc: 'بدون أي خدوش إطلاقاً' },
                      { id: 'استعمال خفيف', label: 'استعمال خفيف', desc: 'نظيف جداً مع علامات استخدام طفيفة' },
                      { id: 'مستعمل بحالة ممتازة', label: 'بحالة ممتازة', desc: 'يعمل بكفاءة كاملة' },
                      { id: 'مستعمل بحالة جيدة', label: 'بحالة جيدة', desc: 'استخدام يومي طبيعي' }
                    ].map((cond) => (
                      <button
                        key={cond.id}
                        type="button"
                        onClick={() => setCondition(cond.id)}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          condition === cond.id
                            ? 'border-amber-600 bg-amber-100/80 text-amber-950 font-bold shadow-xs'
                            : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <div className="text-xs font-bold">{cond.label}</div>
                        <div className="text-[10px] text-gray-500 mt-0.5">{cond.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Usage Duration */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-teal-600" />
                      <span>مدة الاستخدام التقريبية <span className="text-rose-500">*</span></span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: مستعمل لمدة 3 أشهر / سنة"
                      value={usageDuration}
                      onChange={(e) => setUsageDuration(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-gray-200 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                    />
                  </div>

                  {/* Reason for Selling */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
                      <span>سبب البيع <span className="text-rose-500">*</span></span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: الترقية إلى جهاز أحدث / عدم الحاجة"
                      value={reasonForSelling}
                      onChange={(e) => setReasonForSelling(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-gray-200 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                    />
                  </div>
                </div>

                {/* Included Accessories */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-teal-600" />
                    <span>الملحقات والمرفقات المتوفرة مع المنتج:</span>
                  </label>
                  
                  <div className="flex flex-wrap gap-2 mb-2">
                    {[
                      'العلبة الأصلية',
                      'كابل الشاحن الأصلي',
                      'الفاتورة والضمان',
                      'كتيبات الاستخدام',
                      'حافظة / كفر حماية',
                      'يد تحكم إضافية'
                    ].map((acc) => {
                      const isSelected = accessoriesList.includes(acc);
                      return (
                        <button
                          key={acc}
                          type="button"
                          onClick={() => toggleAccessory(acc)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-teal-600 text-white shadow-xs'
                              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
                          }`}
                        >
                          {isSelected ? '✓ ' : '+ '} {acc}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    وصف تفصيلي لحالة الجهاز ومواصفاته <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="اكتب تفاصيل صحة البطارية، الخدوش إن وجدت، سبب البيع، وطريقة الفحص..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-gray-200 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none resize-none"
                  />
                </div>

                {/* Real Photos Link */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    رابط الصورة الحقيقية للمنتج المستعمل (URL)
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-gray-200 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                    dir="ltr"
                  />

                  {/* Sample images quick selection */}
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-gray-500">أو اختر صورة جاهزة:</span>
                    {sampleImages.map((s, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setImageUrl(s.url)}
                        className="px-2.5 py-1 bg-white hover:bg-amber-100 rounded-lg text-[11px] font-medium border border-gray-200 transition-colors"
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section 3: Pricing & Calculator */}
              <div className="bg-gradient-to-br from-teal-50/80 via-emerald-50/60 to-white rounded-2xl p-5 border border-teal-200/80 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-teal-900 font-bold text-sm">
                    <Calculator className="w-4 h-4 text-teal-600" />
                    <span>3. السعر المطلوب وحاسبة الأرباح (10% عمولة المنصة)</span>
                  </div>
                  <span className="text-[11px] font-bold bg-teal-600 text-white px-2 py-0.5 rounded-full">
                    حساب تلقائي
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    المبلغ الذي ترغب في تحصيله لمنتجك المستعمل (صافي أرباحك) بالريال <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      required
                      min="10"
                      step="10"
                      placeholder="مثال: 1500"
                      value={sellerPrice}
                      onChange={(e) => setSellerPrice(e.target.value)}
                      className="w-full pl-12 pr-4 py-2.5 bg-white rounded-xl border border-teal-300 text-base font-bold text-gray-900 focus:border-teal-600 focus:ring-4 focus:ring-teal-500/15 outline-none"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-teal-700">
                      ج.م
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-1 text-center">
                  <div className="bg-white p-3 rounded-xl border border-teal-100 shadow-xs">
                    <div className="text-[11px] text-gray-500 mb-1">صافي أرباحك المحولة</div>
                    <div className="text-lg font-black text-emerald-600">
                      {netSellerPayout} <span className="text-xs font-normal">ج.م</span>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-teal-100 shadow-xs">
                    <div className="text-[11px] text-gray-500 mb-1">عمولة المنصة (10%)</div>
                    <div className="text-lg font-black text-amber-600">
                      {commissionAmount} <span className="text-xs font-normal">ج.م</span>
                    </div>
                  </div>

                  <div className="bg-teal-600 text-white p-3 rounded-xl shadow-sm">
                    <div className="text-[11px] text-teal-100 mb-1">سعر العرض للزبائن</div>
                    <div className="text-lg font-black text-white">
                      {finalCustomerPrice} <span className="text-xs font-normal text-teal-200">ج.م</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-700 hover:to-amber-700 text-white font-bold rounded-2xl shadow-lg shadow-amber-600/25 transition-all text-sm sm:text-base active:scale-98 cursor-pointer"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>نشر وعرض المنتج المستعمل في قسم المستعمل</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
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
                تم نشر منتجك المستعمل بنجاح!
              </span>
              <h2 className="text-2xl font-black text-gray-900 mt-2">
                أصبح منتجك معروضاً الآن في 'المنتجات المستعملة'
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                شكراً لك يا <span className="font-bold text-gray-800">{sellerName}</span>، سيظهر المنتج بشارة <span className="font-bold text-amber-700">مستعمل - {condition}</span> مع كافة بيانات الحالة والملحقات.
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 max-w-md mx-auto text-xs text-gray-700 space-y-2 text-right">
              <div>🏷️ <span className="font-semibold">اسم الجهاز:</span> {productName}</div>
              <div>⭐ <span className="font-semibold">الحالة:</span> <span className="font-bold text-amber-700">{condition}</span> ({usageDuration})</div>
              <div>📦 <span className="font-semibold">الملحقات:</span> {accessoriesList.join('، ')}</div>
              <div>💰 <span className="font-semibold">سعر العرض للزبائن:</span> <span className="font-bold text-teal-700">{finalCustomerPrice} ج.م</span></div>
              <div>💵 <span className="font-semibold">أرباحك الصافية:</span> <span className="font-bold text-emerald-600">{netSellerPayout} ج.م</span></div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl shadow-md shadow-teal-600/25 transition-all cursor-pointer"
            >
              مشاهدة المنتج في قسم المستعمل
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
