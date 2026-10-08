import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowLeft, ShieldCheck, ShoppingCart, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useStoreSettings } from '../context/StoreSettingsContext';

export default function CartDrawer({ onCheckout }) {
  const { settings } = useStoreSettings();
  const {
    cartItems,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    shipping,
    total,
    totalCount,
    remainingForFreeShipping,
    freeShippingThreshold
  } = useCart();

  if (!isCartOpen) return null;

  // WhatsApp Instant Checkout Handler
  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;

    const itemsText = cartItems.map((item, i) => 
      `${i + 1}. *${item.name}* ${item.isUsed ? `(مستعمل - ${item.condition})` : '(جديد)'}\n   - الكمية: ${item.quantity}\n   - السعر: ${item.price * item.quantity} ج.م`
    ).join('\n\n');

    const message = `مرحباً ${settings.storeName} 🛍️، أود إتمام وشراء الطلب التالي:\n\n📦 *قائمة المنتجات (${totalCount} قطع):*\n${itemsText}\n\n--------------------------------\n💰 *المجموع الفرعي:* ${subtotal} ج.م\n🚚 *تكلفة الشحن:* ${shipping === 0 ? 'مجاني 🚀' : `${shipping} ج.م`}\n💵 *المبلغ الإجمالي المطلوب:* ${total} ج.م\n--------------------------------\n\nيرجى تأكيد استلام الطلب وتزويدي بموعد التوصيل وطريقة الدفع. شكراً لكم!`;

    const storeWhatsAppNumber = settings.whatsappNumber || "966500000000";
    const url = `https://api.whatsapp.com/send?phone=${storeWhatsAppNumber}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={closeCart}
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pl-0 pr-0 sm:pr-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-teal-600" />
              <h2 className="text-lg font-bold text-gray-900">سلة المشتريات</h2>
              <span className="text-xs bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded-full">
                {totalCount} عناصر
              </span>
            </div>

            <div className="flex items-center gap-2">
              {cartItems.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-rose-500 hover:text-rose-700 hover:underline px-2 py-1 cursor-pointer"
                  title="إفراغ السلة بالكامل"
                >
                  تفريغ السلة
                </button>
              )}
              <button
                onClick={closeCart}
                className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                aria-label="إغلاق السلة"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Free Shipping Progress Bar */}
          {cartItems.length > 0 && (
            <div className="bg-teal-50/70 p-3.5 border-b border-teal-100 text-xs text-gray-700">
              {remainingForFreeShipping > 0 ? (
                <div>
                  أضف منتجات بقيمة <span className="font-bold text-teal-700">{remainingForFreeShipping} ج.م</span> إضافية للحصول على <span className="font-bold text-teal-700">شحن مجاني!</span>
                  <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="bg-teal-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 font-bold text-teal-800">
                  <span>🎉 تهانينا! لقد حصلت على شحن مجاني لطلبك.</span>
                </div>
              )}
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div 
                  key={item.id}
                  className="flex gap-4 p-3.5 bg-gray-50/70 hover:bg-gray-50 rounded-2xl border border-gray-100/90 relative group transition-colors"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover bg-white shrink-0 shadow-xs"
                  />

                  {/* Info & Quantity controls */}
                  <div className="flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-bold text-gray-900 truncate">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-rose-500 hover:bg-rose-50 p-1.5 rounded-lg transition-colors cursor-pointer"
                          title="حذف المنتج من السلة"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-md font-medium inline-block mt-0.5 ${
                        item.isUsed ? 'text-amber-800 bg-amber-100/80 font-bold' : 'text-teal-700 bg-teal-50'
                      }`}>
                        {item.isUsed ? `مستعمل - ${item.condition}` : item.category}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Increment/Decrement Buttons */}
                      <div className="flex items-center gap-2 bg-white rounded-xl border border-gray-200 px-2 py-1 shadow-xs">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-gray-500 hover:text-teal-600 hover:bg-gray-100 p-1 rounded-md transition-colors cursor-pointer"
                          aria-label="إنقاص الكمية"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold w-6 text-center text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-gray-500 hover:text-teal-600 hover:bg-gray-100 p-1 rounded-md transition-colors cursor-pointer"
                          aria-label="زيادة الكمية"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Product Total Price */}
                      <div className="text-left">
                        <div className="text-sm font-black text-gray-900">
                          {item.price * item.quantity} <span className="text-xs font-bold text-teal-700">ج.م</span>
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-[10px] text-gray-400">
                            ({item.price} ج.م للقطعة)
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20">
                <div className="w-20 h-20 rounded-full bg-teal-50 flex items-center justify-center mx-auto text-teal-600 mb-4">
                  <ShoppingCart className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">سلة التسوق فارغة</h3>
                <p className="text-sm text-gray-500 max-w-xs mx-auto mt-1 mb-6 leading-relaxed">
                  لم تقم بإضافة أي منتج إلى السلة حتى الآن. تصفح أحدث منتجاتنا وأضف ما يناسبك!
                </p>
                <button
                  onClick={closeCart}
                  className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-teal-600/20 cursor-pointer"
                >
                  ابدأ التسوق الآن
                </button>
              </div>
            )}
          </div>

          {/* Footer & Checkout Actions */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-gray-100 bg-white space-y-3 shadow-lg">
              
              {/* Financial Calculation Breakdown */}
              <div className="space-y-1.5 text-xs sm:text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>المجموع الفرعي ({totalCount} منتجات):</span>
                  <span className="font-bold text-gray-900">{subtotal} ج.م</span>
                </div>
                <div className="flex justify-between">
                  <span>تكلفة الشحن والتوصيل:</span>
                  <span className="font-bold text-teal-600">
                    {shipping === 0 ? 'مجاني 🚀' : `${shipping} ج.م`}
                  </span>
                </div>
                <div className="border-t border-gray-100 pt-2 flex justify-between text-base font-black text-gray-900">
                  <span>الإجمالي النهائي:</span>
                  <span className="text-teal-700 text-lg font-black">{total} ج.م</span>
                </div>
              </div>

              {/* Action 1: Standard Checkout */}
              <button 
                onClick={onCheckout}
                className="w-full flex items-center justify-center gap-2 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl shadow-md shadow-teal-600/25 active:scale-98 transition-all text-sm cursor-pointer"
              >
                <span>متابعة إتمام الشراء</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              {/* Action 2: WhatsApp Instant Checkout Button */}
              <button 
                onClick={handleWhatsAppCheckout}
                className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-md shadow-emerald-600/20 active:scale-98 transition-all text-sm cursor-pointer"
                title="إرسال وتأكيد الطلب مباشرة عبر تطبيق الواتساب"
              >
                <MessageCircle className="w-4 h-4 fill-white text-white" />
                <span>إتمام الطلب عبر الواتساب</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>دفع إلكتروني آمن 100% أو عند الاستلام</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}

