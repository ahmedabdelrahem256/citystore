import React, { useState } from 'react';
import { 
  Star, 
  MessageSquarePlus, 
  CheckCircle, 
  Quote, 
  Store, 
  ShoppingBag, 
  Sparkles, 
  ThumbsUp, 
  ShieldCheck,
  HeartHandshake
} from 'lucide-react';

export default function CustomerReviews({ reviews, onOpenAddReview }) {
  const [filterType, setFilterType] = useState('all'); // 'all' | 'buyer' | 'seller'
  const [helpfulMap, setHelpfulMap] = useState({});

  const filteredReviews = reviews.filter((r) => {
    if (filterType === 'all') return true;
    return r.type === filterType;
  });

  const handleHelpfulClick = (id) => {
    setHelpfulMap((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const buyerCount = reviews.filter(r => r.type === 'buyer').length;
  const sellerCount = reviews.filter(r => r.type === 'seller').length;

  return (
    <section id="reviews" className="py-16 bg-gradient-to-b from-gray-50 via-teal-50/20 to-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100/70 border border-amber-200 text-amber-800 text-xs font-bold rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>تقييمات وشهادات حقيقية 100%</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-black text-gray-900 leading-tight">
              ماذا يقول <span className="bg-gradient-to-l from-teal-600 to-emerald-600 bg-clip-text text-transparent">عملاؤنا وبائعونا</span> عن تجربة City Store؟
            </h2>

            <p className="text-sm sm:text-base text-gray-600 max-w-2xl font-normal leading-relaxed">
              نفخر بثقة أكثر من 10,000 متسوق وبائع مستقل في العالم العربي. إليكم بعض الآراء الصادقة حول سرعة التوصيل، وجودة المنتجات، ومرونة تحويل الأرباح.
            </p>
          </div>

          {/* Add Review CTA Button */}
          <div className="shrink-0">
            <button
              onClick={onOpenAddReview}
              className="flex items-center gap-2 px-6 py-3.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold rounded-2xl shadow-lg shadow-teal-600/25 hover:shadow-teal-600/35 active:scale-95 transition-all cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>أضف تقييمك وتجربتك معنا</span>
            </button>
          </div>

        </div>

        {/* Stats & Trust Summary Card */}
        <div className="mb-10 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
          
          <div className="text-center md:border-l md:border-gray-100 last:border-0 p-2">
            <div className="flex items-center justify-center gap-1 text-2xl sm:text-3xl font-black text-gray-900">
              <span>4.95</span>
              <span className="text-base text-amber-500 font-bold">/ 5.0</span>
            </div>
            <div className="flex items-center justify-center gap-1 my-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className="text-xs text-gray-500">متوسط تقييمات العملاء</div>
          </div>

          <div className="text-center md:border-l md:border-gray-100 p-2">
            <div className="text-2xl sm:text-3xl font-black text-teal-600">99.4%</div>
            <div className="text-xs font-bold text-gray-800 mt-1">توصيل في الموعد المحدد</div>
            <div className="text-[11px] text-gray-400">خلال 24 إلى 48 ساعة فقط</div>
          </div>

          <div className="text-center md:border-l md:border-gray-100 p-2">
            <div className="text-2xl sm:text-3xl font-black text-emerald-600">نفس اليوم</div>
            <div className="text-xs font-bold text-gray-800 mt-1">تحويل أرباح البائعين</div>
            <div className="text-[11px] text-gray-400">إلى الحسابات البنكية والمحافظ</div>
          </div>

          <div className="text-center p-2">
            <div className="text-2xl sm:text-3xl font-black text-amber-500">100%</div>
            <div className="text-xs font-bold text-gray-800 mt-1">ضمان استرجاع وجودة</div>
            <div className="text-[11px] text-gray-400">سياسة مرنة ومريحة للجميع</div>
          </div>

        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              filterType === 'all'
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            جميع التقييمات ({reviews.length})
          </button>

          <button
            onClick={() => setFilterType('buyer')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              filterType === 'buyer'
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>تجارب المشترين ({buyerCount})</span>
          </button>

          <button
            onClick={() => setFilterType('seller')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              filterType === 'seller'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>تجارب البائعين المستقلين ({sellerCount})</span>
          </button>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-100/90 shadow-xs hover:shadow-xl hover:border-teal-100 transition-all duration-300 flex flex-col justify-between group relative"
            >
              <div>
                
                {/* Top User Info & Type Tag */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-teal-500/20 shadow-xs"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 group-hover:text-teal-600 transition-colors">
                        {rev.name}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 ${
                          rev.type === 'seller'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200/50'
                            : 'bg-teal-50 text-teal-700 border border-teal-200/50'
                        }`}>
                          {rev.type === 'seller' ? <Store className="w-2.5 h-2.5" /> : <ShieldCheck className="w-2.5 h-2.5" />}
                          <span>{rev.role}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[11px] text-gray-400 font-medium">
                    {rev.date}
                  </span>
                </div>

                {/* Stars Rating */}
                <div className="flex items-center gap-1 mb-2.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(rev.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-gray-200 text-gray-200'
                      }`}
                    />
                  ))}
                  <span className="text-xs font-bold text-gray-700 mr-1.5">
                    {rev.rating}
                  </span>
                </div>

                {/* Review Title */}
                {rev.title && (
                  <h5 className="text-sm font-bold text-gray-900 mb-2 leading-snug">
                    "{rev.title}"
                  </h5>
                )}

                {/* Comment Text */}
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                  {rev.comment}
                </p>

              </div>

              {/* Card Footer: Helpful button & Badge */}
              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                  rev.badge === 'بائع متميز' || rev.badge === 'بائع نشط'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-emerald-50 text-emerald-700'
                }`}>
                  ✓ {rev.badge}
                </span>

                <button
                  onClick={() => handleHelpfulClick(rev.id)}
                  className="flex items-center gap-1.5 text-gray-400 hover:text-teal-600 transition-colors p-1"
                  title="مفيد"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span className="text-[11px]">
                    مفيد ({helpfulMap[rev.id] || 0})
                  </span>
                </button>

              </div>

            </div>
          ))}
        </div>

        {/* Bottom Banner Invitation */}
        <div className="mt-12 p-6 sm:p-8 bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 rounded-3xl text-white text-center sm:text-right flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-teal-700/15">
          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-black">
              هل قمت بتجربة الشراء أو البيع معنا مؤخراً؟
            </h3>
            <p className="text-xs sm:text-sm text-teal-100 max-w-xl">
              رأيك يبني مجتمعنا! شارك تجربتك الصادقة لمساعدة آلاف الزوار والبائعين الجدد.
            </p>
          </div>

          <button
            onClick={onOpenAddReview}
            className="px-6 py-3 bg-white hover:bg-gray-50 text-teal-800 font-bold text-sm rounded-xl shadow-md transition-all active:scale-95 whitespace-nowrap cursor-pointer"
          >
            اكتب تقييمك الآن ⭐
          </button>
        </div>

      </div>
    </section>
  );
}
