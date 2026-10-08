import React, { createContext, useContext, useState, useEffect } from 'react';
import { siteConfig } from '../data/siteConfig';

const StoreSettingsContext = createContext();

const DEFAULT_SETTINGS = {
  storeName: "City Store",
  tagline: "وجهتكم الأولى لكبرى منظومات كاميرات المراقبة (هيكفجن، داهوا، هاي لوك، يونيفيو، يس أوريجينال) والإلكترونيات بأفضل سعر في مصر",
  whatsappNumber: "201000000000",
  address: "القاهرة، جمهورية مصر العربية",
  workingHours: "يومياً من 9:00 ص إلى 11:00 م (طوال أيام الأسبوع)",
  email: "support@citystore.com",
  commissionPercent: 10,
  freeShippingThreshold: 200,
  adminPassword: "admin123",
  // Contact channels (editable from Admin Panel)
  phones: siteConfig.contact.phones,
  whatsapp: siteConfig.contact.whatsapp,
  facebook: siteConfig.contact.facebook,
  contactEmail: siteConfig.contact.email,
  contactAddress: siteConfig.contact.address,
  // Hero / Banner texts
  heroTitle: "أقوى عروض كاميرات المراقبة والأنظمة الأمنية في مصر",
  heroSubtitle: "تشكيلة متكاملة من كبرى الماركات العالمية المعتمدة (Hikvision, Dahua, HiLook, Uniview, Yes Original) بكفالة أصلية وأسعار تنافسية بالجنيه المصري وشحن سريع لكافة المحافظات.",
  announcementText: "📷 عروض كبرى على كاميرات المراقبة (هيكفجن • داهوا • هاي لوك • يونيفيو • يس أوريجينال) | شحن سريع وضمان معتمد",
};

export function StoreSettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('citystore_settings');
      if (saved) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error("Error loading store settings from localStorage:", e);
    }
    return DEFAULT_SETTINGS;
  });

  const updateSettings = (newSettings) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem('citystore_settings', JSON.stringify(updated));
      } catch (e) {
        console.error("Error saving store settings:", e);
      }
      return updated;
    });
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    try {
      localStorage.removeItem('citystore_settings');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <StoreSettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </StoreSettingsContext.Provider>
  );
}

export const useStoreSettings = () => useContext(StoreSettingsContext);
