import React, { useState } from 'react';
import { X, Star, MessageSquarePlus, CheckCircle2, User, Sparkles } from 'lucide-react';

export default function AddReviewModal({ isOpen, onClose, onAddReview }) {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [type, setType] = useState('buyer'); // 'buyer' | 'seller'
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [avatarIndex, setAvatarIndex] = useState(0);

  const sampleAvatars = [
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80"
  ];

  const ratingLabels = {
    1: "سيء جداً (1 نجمة)",
    2: "مقبول (2 نجمتان)",
    3: "جيد (3 نجوم)",
    4: "جيد جداً (4 نجوم)",
    5: "ممتاز واستثنائي (5 نجوم ⭐)"
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const newReview = {
      id: Date.now(),
      name: name.trim(),
      role: type === 'seller' ? 'بائع مستقل معتمد' : 'مشتري موثوق',
      type: type,
      avatar: sampleAvatars[avatarIndex],
      rating: rating,
      date: 'الآن',
      badge: type === 'seller' ? 'بائع جديد' : 'تقييم حديث',
      title: title.trim() || (type === 'seller' ? 'تجربة بيع رائعة' : 'تجربة شراء مميزة'),
      comment: comment.trim()
    };

    onAddReview(newReview);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-gray-900/60 backdrop-blur-xs transition-opacity animate-fade-in" 
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl z-10 overflow-hidden my-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6 border-b border-gray-100 pb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-xs font-bold mb-2">
            <MessageSquarePlus className="w-3.5 h-3.5 text-amber-600" />
            <span>شاركنا رأيك وتجربتك</span>
          </div>
          <h2 className="text-2xl font-black text-gray-900">
            إضافة تقييم ورأي جديد
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            رأيك يهمنا ويساعد الآخرين على اتخاذ القرار الصحيح في الشراء والبيع عبر City Store.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Experience Type Toggle */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">
              ما هو نوع تجربتك مع City Store؟ <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setType('buyer')}
                className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-bold transition-all text-center ${
                  type === 'buyer'
                    ? 'border-teal-600 bg-teal-50 text-teal-800 shadow-xs'
                    : 'border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                🛍️ تجربة شراء من المتجر
              </button>
              <button
                type="button"
                onClick={() => setType('seller')}
                className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-bold transition-all text-center ${
                  type === 'seller'
                    ? 'border-amber-600 bg-amber-50 text-amber-800 shadow-xs'
                    : 'border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                🏪 تجربة بيع كبائع مستقل
              </button>
            </div>
          </div>

          {/* Interactive Star Rating */}
          <div className="bg-gray-50/80 p-4 rounded-2xl border border-gray-100 text-center">
            <label className="block text-xs font-bold text-gray-700 mb-2">
              حدد تقييمك العام بالنجوم <span className="text-rose-500">*</span>
            </label>
            
            <div className="flex items-center justify-center gap-2 mb-2">
              {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = (hoverRating || rating) >= star;
                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 transition-transform hover:scale-125 focus:outline-none"
                    aria-label={`${star} نجوم`}
                  >
                    <Star
                      className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                        isFilled
                          ? 'fill-amber-400 text-amber-400 drop-shadow-xs'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="text-xs font-bold text-teal-700">
              {ratingLabels[hoverRating || rating]}
            </div>
          </div>

          {/* Customer Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              اسمك الكريم <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="مثال: عبدالله محمد"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
            />
          </div>

          {/* Review Title */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              عنوان مختصر للتقييم (اختياري)
            </label>
            <input
              type="text"
              placeholder="مثال: خدمة فائقة وسرعة توصيل خيالية!"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
            />
          </div>

          {/* Detailed Comment */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              تفاصيل رأيك وتجربتك <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              required
              placeholder={
                type === 'seller'
                  ? 'شاركنا كيف كانت تجربة عرض منتجاتك، سهولة تحويل الأرباح، والتعامل مع المنصة...'
                  : 'شاركنا رأيك في جودة المنتج المستلم، التوصيل، والتغليف، وطريقة الدفع...'
              }
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none resize-none"
            />
          </div>

          {/* Avatar selector */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              اختر صورة رمزية لتقييمك:
            </label>
            <div className="flex items-center gap-3">
              {sampleAvatars.map((av, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setAvatarIndex(idx)}
                  className={`w-11 h-11 rounded-full overflow-hidden border-2 transition-all ${
                    avatarIndex === idx
                      ? 'border-teal-600 ring-2 ring-teal-500/30 scale-110'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={av} alt="صورة" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl shadow-lg shadow-teal-600/30 transition-all text-sm sm:text-base active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>نشر التقييم في المتجر فوراً</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
