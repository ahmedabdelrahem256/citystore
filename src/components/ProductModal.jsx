import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShoppingBag, 
  Heart, 
  ShieldCheck, 
  Truck, 
  Check, 
  Store, 
  RotateCcw, 
  Clock, 
  HelpCircle, 
  Package, 
  ZoomIn, 
  CheckCircle2, 
  MapPin,
  MessageCircle
} from 'lucide-react';
import { useStoreSettings } from '../context/StoreSettingsContext';

export default function ProductModal({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted
}) {
  const { settings } = useStoreSettings();
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(product.image);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleAddToCart = () => {
    onAddToCart({ ...product, quantity });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleDirectWhatsApp = () => {
    const message = `مرحباً ${settings.storeName} 🛍️، أود طلب المنتج التالي مباشرة:\n\n*${product.name}*\n- الحالة: ${product.isUsed ? `مستعمل (${product.condition}) - مدة الاستخدام: ${product.usageDuration}` : 'جديد'}\n- الكمية: ${quantity}\n- السعر: ${product.price * quantity} ج.م\n\nيرجى تأكيد التوفر وترتيب الشحن والتوصيل. شكراً لكم!`;
    const storeWhatsAppNumber = settings.whatsappNumber || "966500000000";
    const url = `https://api.whatsapp.com/send?phone=${storeWhatsAppNumber}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const photos = product.realPhotos && product.realPhotos.length > 0 
    ? product.realPhotos 
    : [product.image];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-gray-900/60 backdrop-blur-xs transition-opacity animate-fade-in" 
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl z-10 overflow-hidden my-6">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors z-20 cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Photos & Zoom Section */}
          <div className="md:col-span-6 space-y-3">
            
            {/* Main Image with Zoom effect */}
            <div 
              className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-square border border-gray-200 group cursor-zoom-in"
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <img 
                src={selectedPhoto || product.image} 
                alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-500 ${
                  isZoomed ? 'scale-150 cursor-zoom-out' : 'group-hover:scale-105'
                }`}
              />
              
              {product.badge && (
                <span className={`absolute top-3 right-3 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm text-white flex items-center gap-1 ${
                  product.isUsed ? 'bg-amber-600' : 'bg-teal-600'
                }`}>
                  {product.isUsed && <RotateCcw className="w-3 h-3" />}
                  <span>{product.badge}</span>
                </span>
              )}

              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded-lg flex items-center gap-1 opacity-80 group-hover:opacity-100">
                <ZoomIn className="w-3.5 h-3.5" />
                <span>{isZoomed ? 'اضغط للتصغير' : 'انقر للتكبير وفحص الحالة'}</span>
              </div>
            </div>

            {/* Real Photos Thumbnails Gallery */}
            {photos.length > 1 && (
              <div>
                <div className="text-[11px] font-bold text-gray-500 mb-1.5 flex items-center gap-1">
                  <span>📸 صور حقيقية للمنتج ({photos.length} صور):</span>
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {photos.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSelectedPhoto(img);
                        setIsZoomed(false);
                      }}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        selectedPhoto === img
                          ? 'border-amber-500 ring-2 ring-amber-500/30 scale-105'
                          : 'border-gray-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`معاينة ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quality check note */}
            {product.isUsed && (
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/70 text-[11px] text-emerald-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>تم فحص هذا الجهاز والتأكد من سلامة أدائه ومطابقة مواصفاته 100%.</span>
              </div>
            )}

          </div>

          {/* Product Info & Condition Box */}
          <div className="md:col-span-6 space-y-4">
            
            {/* Category & Rating */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  product.isUsed ? 'bg-amber-100 text-amber-900 border border-amber-200' : 'bg-teal-50 text-teal-700'
                }`}>
                  {product.isUsed ? 'سوق المستعمل المعتمد' : product.category}
                </span>
                {product.brand && (
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-teal-600 text-white shadow-xs">
                    {product.brand}
                  </span>
                )}
                {product.subCategory && (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
                    {product.subCategory}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
                <span className="text-gray-400 text-xs">({product.reviewsCount} تقييم)</span>
              </div>
            </div>

            {/* Product Title */}
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 leading-snug">
              {product.name}
            </h2>

            {/* Price Section */}
            <div className="flex items-baseline gap-2.5">
              <span className="text-2xl sm:text-3xl font-black text-gray-900">
                {product.price}
              </span>
              <span className="text-sm font-bold text-teal-700">ج.م</span>
              {product.originalPrice && (
                <>
                  <span className="text-sm text-gray-400 line-through">
                    {product.originalPrice} ج.م
                  </span>
                  <span className="text-xs font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-md">
                    وفر {discountPercent}%
                  </span>
                </>
              )}
            </div>

            {/* USED ITEM CONDITION DETAILS BOX */}
            {product.isUsed && (
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-xs text-amber-950 space-y-2.5">
                <div className="font-bold text-sm text-amber-900 flex items-center justify-between border-b border-amber-200/80 pb-2">
                  <span className="flex items-center gap-1.5">
                    <RotateCcw className="w-4 h-4 text-amber-600" />
                    <span>تفاصيل وحالة المنتج المستعمل (Item Condition):</span>
                  </span>
                  <span className="px-2.5 py-0.5 bg-amber-600 text-white rounded-full text-xs font-bold">
                    {product.condition}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span className="font-semibold text-gray-600">مدة الاستخدام:</span>
                    <span className="font-bold text-gray-900">{product.usageDuration}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span className="font-semibold text-gray-600">سبب البيع:</span>
                    <span className="font-bold text-gray-900 truncate">{product.reasonForSelling}</span>
                  </div>
                </div>

                {/* Included Accessories */}
                {product.accessories && product.accessories.length > 0 && (
                  <div className="pt-1">
                    <div className="font-semibold text-gray-700 mb-1 flex items-center gap-1">
                      <Package className="w-3.5 h-3.5 text-amber-700" />
                      <span>الملحقات والمرفقات المتوفرة:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {product.accessories.map((acc, i) => (
                        <span key={i} className="px-2 py-0.5 bg-white rounded-md border border-amber-200 text-[11px] font-bold text-amber-900 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>{acc}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Seller & Location */}
                {product.sellerName && (
                  <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between text-[11px] text-gray-600">
                    <span className="flex items-center gap-1 font-semibold text-gray-800">
                      <Store className="w-3.5 h-3.5 text-amber-600" />
                      <span>البائع: {product.sellerName}</span>
                    </span>
                    {product.sellerCity && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gray-500" />
                        <span>{product.sellerCity}</span>
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Description */}
            <div>
              <div className="text-xs font-bold text-gray-700 mb-1">وصف المنتج:</div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity and Actions */}
            <div className="pt-4 space-y-3 border-t border-gray-100">
              
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-gray-700">الكمية:</span>
                <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:text-teal-600 font-bold cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-sm font-bold text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:text-teal-600 font-bold cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons: Add to Cart + WhatsApp Buy Now */}
              <div className="space-y-2">
                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm transition-all shadow-md active:scale-98 cursor-pointer ${
                      added 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-teal-600 hover:bg-teal-700 text-white shadow-teal-600/25'
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>تمت الإضافة للسلة بنجاح!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>إضافة إلى السلة ({product.price * quantity} ج.م)</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onToggleWishlist(product.id)}
                    className={`p-3 rounded-2xl border transition-colors cursor-pointer ${
                      isWishlisted 
                        ? 'border-rose-300 bg-rose-50 text-rose-500' 
                        : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:text-rose-500'
                    }`}
                    title={isWishlisted ? "إزالة من المفضلة" : "إضافة للمفضلة"}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                  </button>
                </div>

                {/* Direct WhatsApp Ordering Button */}
                <button
                  onClick={handleDirectWhatsApp}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition-all text-xs cursor-pointer active:scale-98"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-white" />
                  <span>طلب مباشر لهذا المنتج عبر الواتساب</span>
                </button>
              </div>

            </div>

            {/* Quick Guarantees */}
            <div className="pt-2 flex items-center gap-6 text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-teal-600" />
                شحن سريع ومعاينة عند الاستلام
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                ضمان فحص ومطابقة 100%
              </span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
