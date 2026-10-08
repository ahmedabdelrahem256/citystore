import React from 'react';
import { ShoppingBag, Mail, Phone, MapPin, Heart, Send, ShieldCheck, Clock, ExternalLink } from 'lucide-react';
import { useStoreSettings } from '../context/StoreSettingsContext';
import { siteConfig } from '../data/siteConfig';

const WhatsAppIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.031 0C5.394 0 0 5.394 0 12.031c0 2.122.553 4.191 1.605 6.012L.055 24l6.155-1.614a12.007 12.007 0 005.821 1.503h.005c6.635 0 12.03-5.395 12.03-12.032 0-3.214-1.252-6.235-3.527-8.51A11.954 11.954 0 0012.031 0zm0 22.012h-.004a10.003 10.003 0 01-5.097-1.391l-.365-.217-3.784.992 1.01-3.689-.238-.378a9.986 9.986 0 01-1.536-5.3C2.017 6.51 6.51 2.017 12.03 2.017c2.677 0 5.193 1.043 7.086 2.936a9.987 9.987 0 012.936 7.087c0 5.522-4.492 10.015-10.021 10.015zm5.49-7.498c-.3-.15-1.776-.877-2.052-.977-.275-.1-.476-.15-.676.15s-.777.977-.952 1.177-.35.225-.65.075a8.196 8.196 0 01-2.413-1.488 9.043 9.043 0 01-1.669-2.079c-.176-.3-.019-.462.132-.612.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525s-.676-1.63-.926-2.233c-.244-.588-.492-.508-.676-.517l-.576-.01c-.2 0-.525.075-.8.375s-1.05 1.026-1.05 2.502c0 1.476 1.076 2.902 1.226 3.102.15.2 2.115 3.23 5.124 4.53 3.01 1.3 3.01.867 3.56.817.55-.05 1.775-.726 2.025-1.427.25-.701.25-1.302.175-1.427-.075-.125-.275-.2-.575-.35z" />
  </svg>
);

const FacebookIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export default function Footer({ onOpenAdmin }) {
  const { settings } = useStoreSettings();

  // Read from context (localStorage) first, fall back to siteConfig
  const contactPhones = (settings.phones && settings.phones.length > 0) ? settings.phones : siteConfig.contact.phones;
  const contactWhatsapp = (settings.whatsapp && settings.whatsapp.length > 0) ? settings.whatsapp : siteConfig.contact.whatsapp;
  const contactFacebook = (settings.facebook && settings.facebook.length > 0) ? settings.facebook : siteConfig.contact.facebook;
  const contactEmail = settings.contactEmail || siteConfig.contact.email;
  const contactAddress = settings.contactAddress || siteConfig.contact.address;

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-gray-800">
          
          {/* Column 1 & 2: Brand info and Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-md">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-white">
                {settings.storeName || siteConfig.name}
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              {settings.tagline}
            </p>
            <div className="space-y-2 text-gray-400 text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-500 shrink-0" />
                <span>{contactAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-500 shrink-0" />
                <a href={`mailto:${contactEmail}`} className="hover:text-teal-400 transition-colors">
                  {contactEmail}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-500 shrink-0" />
                <span>{settings.workingHours}</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="pt-2 max-w-sm">
              <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-1.5">
                النشرة الإخبارية
              </h5>
              <form onSubmit={(e) => { e.preventDefault(); alert('تم اشتراكك بنجاح في النشرة الإخبارية!'); }} className="relative">
                <input
                  type="email"
                  required
                  placeholder="بريدك الإلكتروني للحصول على العروض"
                  className="w-full bg-gray-800 text-white text-xs rounded-xl px-3 py-2.5 pl-10 border border-gray-700 focus:outline-none focus:border-teal-500"
                />
                <button 
                  type="submit"
                  className="absolute left-1.5 top-1/2 -translate-y-1/2 bg-teal-600 hover:bg-teal-500 text-white p-1.5 rounded-lg transition-colors cursor-pointer"
                  title="اشتراك"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              روابط سريعة
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-teal-400 transition-colors">عن المتجر</a></li>
              <li><a href="#products" className="hover:text-teal-400 transition-colors">أحدث المنتجات</a></li>
              <li><a href="#products" className="hover:text-teal-400 transition-colors">كاميرات المراقبة</a></li>
              <li><a href="#products" className="hover:text-teal-400 transition-colors">سوق المستعمل</a></li>
              <li><a href="#reviews" className="hover:text-teal-400 transition-colors">آراء العملاء</a></li>
              <li>
                <button 
                  onClick={() => {
                    if (onOpenAdmin) onOpenAdmin();
                    else window.location.hash = 'admin';
                  }} 
                  className="text-teal-400 hover:text-teal-300 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>لوحة التحكم (Admin)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Customer Service */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              خدمة العملاء
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-teal-400 transition-colors">سياسة الشحن والتوصيل</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">سياسة الاستبدال والاسترجاع</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">الضمان والصيانة</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">طرق الدفع والتقسيط</a></li>
            </ul>
          </div>

          {/* Column 5: Contact Channels (Phones, WhatsApp, Facebook) */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              تواصل معنا
            </h4>

            {/* Direct Phone Numbers */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-gray-400 block">أرقام الهواتف:</span>
              {contactPhones.map((phone, i) => (
                <a
                  key={i}
                  href={`tel:${phone.raw}`}
                  className="flex items-center justify-between p-2 bg-gray-800/80 hover:bg-gray-800 text-gray-200 rounded-xl border border-gray-700/60 transition-colors text-xs group"
                >
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-teal-400 group-hover:scale-110 transition-transform" />
                    <span>{phone.label}</span>
                  </div>
                  <span className="font-mono text-teal-300 font-bold text-[11px]" dir="ltr">{phone.number}</span>
                </a>
              ))}
            </div>

            {/* WhatsApp Chats */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-gray-400 block">واتساب:</span>
              <div className="space-y-1.5">
                {contactWhatsapp.map((wa, i) => (
                  <a
                    key={i}
                    href={wa.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2 bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-200 rounded-xl border border-emerald-800/50 transition-colors text-xs group"
                  >
                    <div className="flex items-center gap-2">
                      <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{wa.label}</span>
                    </div>
                    <ExternalLink className="w-3 h-3 text-emerald-400/70 group-hover:text-emerald-300" />
                  </a>
                ))}
              </div>
            </div>

            {/* Facebook Pages */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-gray-400 block">فيسبوك:</span>
              <div className="space-y-1.5">
                {contactFacebook.map((fb, i) => (
                  <a
                    key={i}
                    href={fb.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2 bg-blue-950/60 hover:bg-blue-900/60 text-blue-200 rounded-xl border border-blue-800/50 transition-colors text-xs group"
                  >
                    <div className="flex items-center gap-2">
                      <FacebookIcon className="w-3.5 h-3.5 text-blue-400" />
                      <span>{fb.label}</span>
                    </div>
                    <ExternalLink className="w-3 h-3 text-blue-400/70 group-hover:text-blue-300" />
                  </a>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Bar: Copyright and Payment methods */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p className="flex items-center gap-1">
            جميع الحقوق محفوظة © {new Date().getFullYear()} City Store | صُنع بكل <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> في العالم العربي
          </p>

          {/* Payment Badges */}
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-gray-800 rounded-md text-gray-300 font-bold text-[11px] border border-gray-700">مدى Mada</span>
            <span className="px-2.5 py-1 bg-gray-800 rounded-md text-gray-300 font-bold text-[11px] border border-gray-700">Apple Pay</span>
            <span className="px-2.5 py-1 bg-gray-800 rounded-md text-gray-300 font-bold text-[11px] border border-gray-700">Visa / Master</span>
            <span className="px-2.5 py-1 bg-gray-800 rounded-md text-teal-400 font-bold text-[11px] border border-gray-700">تمارا Tamara</span>
            <span className="px-2.5 py-1 bg-gray-800 rounded-md text-emerald-400 font-bold text-[11px] border border-gray-700">تابي Tabby</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
