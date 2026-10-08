import React from 'react';
import { Sparkles, ArrowLeft, ShieldCheck, Truck, RotateCcw, Clock } from 'lucide-react';
import { useStoreSettings } from '../context/StoreSettingsContext';

export default function Hero({ onExploreClick }) {
  const { settings } = useStoreSettings();

  const heroTitle = settings.heroTitle || "تسوق أرقى المنتجات العصرية بأسعار لا تُقاوم";
  const heroSubtitle = settings.heroSubtitle || "اكتشف باقة مختارة بعناية من أحدث الإلكترونيات الذكية، الساعات، والأزياء والإكسسوارات الفاخرة بجودة عالمية وضمان حقيقي وتوصيل سريع حتى باب منزلك.";

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-teal-50/60 via-white to-gray-50 pt-8 pb-12 sm:pb-16 border-b border-gray-100">
      
      {/* Decorative background glow elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute -bottom-10 left-1/4 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Hero Content */}
          <div className="lg:col-span-7 text-center lg:text-right space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/70 border border-teal-200/80 text-teal-800 text-xs sm:text-sm font-semibold shadow-xs">
              <Sparkles className="w-4 h-4 text-teal-600 animate-spin" style={{ animationDuration: '6s' }} />
              <span>موسم التخفيضات الكبرى لعام 2026</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.25] tracking-tight">
              {heroTitle}
            </h1>

            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {heroSubtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button 
                onClick={onExploreClick}
                className="flex items-center gap-2 px-6 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm sm:text-base rounded-2xl shadow-lg shadow-teal-600/30 hover:shadow-teal-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <span>تصفح المنتجات الآن</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <a 
                href="#offers"
                className="flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-gray-50 text-gray-800 font-bold text-sm sm:text-base rounded-2xl border border-gray-200 shadow-xs hover:border-gray-300 transition-all duration-200"
              >
                <span>أحدث العروض الحصرية</span>
              </a>
            </div>

          </div>

          {/* Hero Visual Card Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main highlighted image card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] group">
                <img 
                  src="https://images.unsplash.com/photo-1557862921-37829c790f19?w=800&auto=format&fit=crop&q=80" 
                  alt="كاميرات مراقبة خارجية ذكية" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/85 via-gray-900/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-xs font-semibold px-2.5 py-1 bg-amber-500 text-gray-900 rounded-full w-fit mb-2">
                    الأكثر مبيعاً في مصر 📷
                  </span>
                  <h3 className="text-lg font-bold">منظومة كاميرات Hikvision & Dahua الذكية</h3>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xl font-extrabold text-teal-300">بدءاً من 520 ج.م</span>
                    <span className="text-xs bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                      رؤية ليلية + مايك مدمج
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 sm:-right-6 bg-white p-3 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 font-black text-lg">
                  ★
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">4.9 / 5.0</div>
                  <div className="text-xs text-gray-500">أكثر من 10,000 عميل سعيد</div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 sm:-left-6 bg-white p-3 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-teal-600">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">توصيل سريع مجاني</div>
                  <div className="text-xs text-gray-500">خلال 24-48 ساعة فقط</div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Feature stats & trust bar */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 sm:p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
          
          <div className="flex items-center gap-3.5 p-2">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">شحن سريع ومجاني</h4>
              <p className="text-xs text-gray-500 mt-0.5">للطلبات المؤهلة فوق 200 ج.م</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">منتجات أصلية 100%</h4>
              <p className="text-xs text-gray-500 mt-0.5">ضمان ذهبي معتمد للسلع</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">استرجاع مرن وسهل</h4>
              <p className="text-xs text-gray-500 mt-0.5">إرجاع واستبدال خلال 14 يوم</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">دعم متواصل 24/7</h4>
              <p className="text-xs text-gray-500 mt-0.5">فريق متخصص لخدمتك دائماً</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
