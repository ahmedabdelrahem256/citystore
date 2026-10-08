import React, { useState } from 'react';
import { ShoppingBag, Heart, Star, Eye, Check, Store, RotateCcw, Clock, PackageCheck, HelpCircle } from 'lucide-react';

export default function ProductCard({ 
  product, 
  onAddToCart, 
  onToggleWishlist, 
  isWishlisted,
  onQuickView
}) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div 
      onClick={() => onQuickView(product)}
      className="group relative bg-white rounded-3xl border border-gray-100/80 shadow-xs hover:shadow-xl hover:border-teal-100 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Product Image Section */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
        />

        {/* Badge (Top-Right in RTL) */}
        {product.badge && (
          <div className="absolute top-3.5 right-3.5 z-10">
            <span className={`text-xs font-bold px-3 py-1.5 rounded-full shadow-sm text-white backdrop-blur-md flex items-center gap-1 ${
              product.isUsed || product.badge.includes('مستعمل')
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 ring-2 ring-white/40'
                : product.badge.includes('بائع مستقل')
                ? 'bg-amber-600/95'
                : product.badge.includes('خصم')
                ? 'bg-rose-500/95'
                : product.badge === 'الأكثر مبيعاً'
                ? 'bg-amber-500/95'
                : product.badge === 'جديد'
                ? 'bg-emerald-600/95'
                : 'bg-teal-600/95'
            }`}>
              {product.isUsed && <RotateCcw className="w-3 h-3" />}
              <span>{product.badge}</span>
            </span>
          </div>
        )}

        {/* Wishlist Button (Top-Left in RTL) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className={`absolute top-3.5 left-3.5 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer ${
            isWishlisted 
              ? 'bg-rose-50 text-rose-500 border border-rose-200 scale-105' 
              : 'bg-white/90 text-gray-500 hover:text-rose-500 hover:bg-white backdrop-blur-md'
          }`}
          title={isWishlisted ? "إزالة من المفضلة" : "إضافة للمفضلة"}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Quick View Button (overlay on hover) */}
        <div className="absolute inset-0 bg-gray-900/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-white/95 text-gray-900 text-xs font-bold rounded-full shadow-lg hover:bg-white transition-all transform translate-y-2 group-hover:translate-y-0 duration-300 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>نظرة سريعة وتفاصيل الحالة</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-2 text-xs mb-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className={`font-semibold px-2 py-0.5 rounded-md ${
                product.isUsed ? 'text-amber-800 bg-amber-50 border border-amber-200/50' : 'text-teal-700 bg-teal-50'
              }`}>
                {product.isUsed ? 'منتج مستعمل معتمد' : product.category}
              </span>
              {product.brand && (
                <span className="font-bold text-[10px] text-teal-800 bg-teal-100/90 px-1.5 py-0.5 rounded-md border border-teal-200/50">
                  {product.brand}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-amber-500 font-bold shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-gray-400 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="text-sm sm:text-base font-bold text-gray-800 line-clamp-2 leading-snug group-hover:text-teal-600 transition-colors">
            {product.name}
          </h3>

          {/* Used Item Specific Badge/Card Details: (الحالة، مدة الاستخدام، سبب البيع) */}
          {product.isUsed && (
            <div className="mt-2.5 p-2.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-[11px] text-amber-950 space-y-1.5 shadow-2xs">
              
              <div className="flex items-center justify-between border-b border-amber-200/60 pb-1">
                <span className="font-bold flex items-center gap-1 text-amber-900">
                  <RotateCcw className="w-3 h-3 text-amber-600" />
                  <span>الحالة: {product.condition}</span>
                </span>
                <span className="text-[10px] bg-amber-200/70 text-amber-900 px-1.5 py-0.2 rounded font-semibold">
                  مفحوص
                </span>
              </div>

              <div className="flex items-center gap-1 text-gray-700">
                <Clock className="w-3 h-3 text-amber-600 shrink-0" />
                <span><span className="font-semibold text-gray-500">مدة الاستخدام:</span> {product.usageDuration}</span>
              </div>

              {product.reasonForSelling && (
                <div className="flex items-center gap-1 text-gray-700 truncate">
                  <HelpCircle className="w-3 h-3 text-amber-600 shrink-0" />
                  <span className="truncate"><span className="font-semibold text-gray-500">سبب البيع:</span> {product.reasonForSelling}</span>
                </div>
              )}

              {product.accessories && (
                <div className="flex items-center gap-1 text-[10px] text-emerald-800 bg-white/70 p-1 rounded-md truncate">
                  <PackageCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span className="truncate font-medium">{product.accessories.join(' • ')}</span>
                </div>
              )}
            </div>
          )}

          {/* Seller Note */}
          {product.sellerNote && !product.isUsed && (
            <div className="mt-2 text-[11px] font-bold text-amber-800 bg-amber-50/90 border border-amber-200/70 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
              <Store className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>{product.sellerNote} {product.sellerName ? `(${product.sellerName})` : ''}</span>
            </div>
          )}

          {/* Brief description snippet */}
          <p className="text-xs text-gray-500 line-clamp-1 mt-1.5">
            {product.description}
          </p>
        </div>

        {/* Price & Action Button */}
        <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between gap-3">
          
          {/* Price */}
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg sm:text-xl font-black text-gray-900">
                {product.price}
              </span>
              <span className="text-xs font-bold text-teal-700">ج.م</span>
            </div>
            {product.originalPrice && (
              <div className="flex items-center gap-1.5 -mt-0.5">
                <span className="text-xs text-gray-400 line-through">
                  {product.originalPrice} ج.م
                </span>
                {discountPercent > 0 && (
                  <span className="text-[10px] font-bold text-rose-500">
                    -{discountPercent}%
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 active:scale-95 shadow-sm cursor-pointer ${
              isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-teal-600 hover:bg-teal-700 text-white shadow-teal-600/20 hover:shadow-teal-600/30'
            }`}
            title="إضافة إلى السلة"
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4 animate-scale-in" />
                <span className="hidden sm:inline">تمت الإضافة!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">أضف للسلة</span>
              </>
            )}
          </button>

        </div>

      </div>
    </div>
  );
}

