import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  dir: 'ltr' | 'rtl';
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, defaultText?: string) => string;
  isArabic: boolean;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header & Nav
    'nav.home': 'Home',
    'nav.categories': 'Categories',
    'nav.newArrivals': 'New Arrivals',
    'nav.bestSellers': 'Best Sellers',
    'nav.deals': 'Deals & Discounts',
    'nav.about': 'About Us',
    'nav.contact': 'Contact Us',
    'nav.searchPlaceholder': 'Search gadgets, AirPods, watches in Qatar...',
    'nav.freeDelivery': 'Free Delivery over 150 QAR in Qatar',
    'nav.cashOnDelivery': 'Cash on Delivery Available',
    'nav.servingQatar': '🇶🇦 Serving All Qatar Municipalities',
    'nav.whatsappSupport': 'WhatsApp Order',
    'nav.wishlist': 'Wishlist',
    'nav.cart': 'Cart',
    'nav.myAccount': 'Account',

    // Hero
    'hero.badge': '🇶🇦 Qatar’s Premier Online Store • Express Delivery',
    'hero.titleLine1': 'Qatar\'s Trusted Online',
    'hero.titleLine2': 'Shopping Destination',
    'hero.subtitle': 'Shop Premium Electronics, Smart Watches, AirPods, Mobile Accessories, Home Essentials, Beauty Products and Trending Gadgets with Fast Delivery Across Qatar.',
    'hero.ctaShop': 'Shop Now',
    'hero.ctaWhatsApp': 'Order on WhatsApp',
    'hero.trustCOD': 'Cash On Delivery',
    'hero.trustSameDay': 'Same Day Delivery',
    'hero.trustSecure': '100% Genuine',
    'hero.trustFree': 'Free Delivery over 150 QAR',

    // Section Titles
    'section.categoriesTitle': 'Shop By Category',
    'section.categoriesSub': 'Browse our wide range of premium electronics, smart watches, audio gear, and home accessories in Qatar.',
    'section.flashSaleTitle': 'Limited Time Flash Deals in Qatar',
    'section.flashSaleSub': 'Grab top-tier electronics and wearables at unbeatable prices. Express delivery available across Doha!',
    'section.featuredTitle': 'Featured Products',
    'section.featuredSub': 'Top picked gadgets and accessories loved by customers in Qatar.',
    'section.bestSellersTitle': 'Top Best Sellers in Qatar',
    'section.bestSellersSub': 'Most ordered items with 5-star customer ratings across Doha and Lusail.',
    'section.newArrivalsTitle': 'New Arrivals Just Landed',
    'section.newArrivalsSub': 'Discover the latest technology and lifestyle accessories now in Qatar stock.',
    'section.whyChooseUsTitle': 'Qatar\'s Most Reliable E-Commerce Experience',
    'section.whyChooseUsSub': 'Unmatched convenience, authentic products, and 24/7 customer support across Qatar.',
    'section.popularBrandsTitle': 'Popular Brands Available',
    'section.customerReviewsTitle': 'Verified Qatar Customer Reviews',
    'section.customerReviewsSub': 'Real feedback from customers in West Bay, Lusail, Pearl Qatar, and Al Rayyan.',
    'section.faqTitle': 'Frequently Asked Questions (FAQ)',
    'section.newsletterTitle': 'Get 10% Off Your First Qatar Order',
    'section.newsletterSub': 'Subscribe for private discount codes, flash deal alerts, and new product drop announcements.',

    // Buttons & Actions
    'action.addToCart': 'Add to Cart',
    'action.buyNow': 'Buy Now',
    'action.quickView': 'Quick View',
    'action.viewAll': 'View All',
    'action.orderWhatsApp': 'WhatsApp Order',
    'action.subscribe': 'Subscribe Now',
    'action.checkout': 'Proceed to Checkout',
    'action.applyCoupon': 'Apply Code',
    'action.close': 'Close',

    // Product Card & Price
    'product.qar': 'QAR',
    'product.off': 'OFF',
    'product.inStock': 'In Stock',
    'product.outOfStock': 'Out of Stock',
    'product.save': 'SAVE',

    // Footer
    'footer.aboutHeader': 'Super Deal Online.Store Qatar',
    'footer.aboutDesc': 'Qatar’s trusted destination for high quality mobile accessories, smart watches, AirPods, Bluetooth speakers, home essentials, and beauty products with express delivery across Doha and all municipalities.',
    'footer.quickLinks': 'Quick Navigation',
    'footer.categories': 'Top Categories',
    'footer.policies': 'Store Policies',
    'footer.customerSupport': 'Customer Support',
    'footer.rights': 'All rights reserved.',

    // Policies
    'policy.delivery': 'Delivery Information',
    'policy.refund': 'Refund & Return Policy',
    'policy.privacy': 'Privacy Policy',
    'policy.terms': 'Terms & Conditions',
    'policy.faq': 'FAQ & Help Center',
  },
  ar: {
    // Header & Nav
    'nav.home': 'الرئيسية',
    'nav.categories': 'الأقسام',
    'nav.newArrivals': 'وصل حديثاً',
    'nav.bestSellers': 'الأكثر مبيعاً',
    'nav.deals': 'العروض والخصومات',
    'nav.about': 'من نحن',
    'nav.contact': 'اتصل بنا',
    'nav.searchPlaceholder': 'ابحث عن الهواتف، السماعات، الساعات في قطر...',
    'nav.freeDelivery': 'توصيل مجاني للطلبات فوق 150 ر.ق في قطر',
    'nav.cashOnDelivery': 'الدفع عند الاستلام متاح',
    'nav.servingQatar': '🇶🇦 نخدم جميع مناطق وبلديات دولة قطر',
    'nav.whatsappSupport': 'طلب عبر واتساب',
    'nav.wishlist': 'المفضلة',
    'nav.cart': 'السلة',
    'nav.myAccount': 'حسابي',

    // Hero
    'hero.badge': '🇶🇦 المتجر الإلكتروني الأبرز في قطر • توصيل سريع',
    'hero.titleLine1': 'وجهتك الموثوقة للتسوق',
    'hero.titleLine2': 'عبر الإنترنت في قطر',
    'hero.subtitle': 'تسوق أحدث الإلكترونيات والساعات الذكية وسماعات الأيربودز واكسسوارات الهواتف ومستلزمات المنزل والتجميل مع توصيل سريع لجميع مناطق قطر.',
    'hero.ctaShop': 'تسوق الآن',
    'hero.ctaWhatsApp': 'اطلب عبر الواتساب',
    'hero.trustCOD': 'الدفع عند الاستلام',
    'hero.trustSameDay': 'توصيل نفس اليوم',
    'hero.trustSecure': 'منتجات أصلية 100%',
    'hero.trustFree': 'توصيل مجاني فوق 150 ر.ق',

    // Section Titles
    'section.categoriesTitle': 'تسوق حسب القسم',
    'section.categoriesSub': 'استكشف تشكيلتنا الواسعة من الإلكترونيات والساعات الذكية ومستلزمات المنزل في قطر.',
    'section.flashSaleTitle': 'عروض الخصم السريع في قطر',
    'section.flashSaleSub': 'احصل على أفضل الأجهزة الذكية بأسعار لا تُنافس. توصيل سريع لجميع مناطق الدوحة وقطر!',
    'section.featuredTitle': 'المنتجات المميزة',
    'section.featuredSub': 'أفضل الإلكترونيات الموصى بها والتي يفضلها عملاؤنا في قطر.',
    'section.bestSellersTitle': 'الأكثر مبيعاً في قطر',
    'section.bestSellersSub': 'المنتجات الأكثر طلباً بتقييم 5 نجوم في الدوحة ولوسيل واللؤلؤة.',
    'section.newArrivalsTitle': 'وصل حديثاً لمتجرنا',
    'section.newArrivalsSub': 'اكتشف أحدث التقنيات واكسسوارات الهواتف المتوفرة حالياً في قطر.',
    'section.whyChooseUsTitle': 'تجربة التسوق الأكثر موثوقية في قطر',
    'section.whyChooseUsSub': 'راحة لا مثيل لها، منتجات أصلية، وخدمة عملاء على مدار 24 ساعة في جميع مناطق قطر.',
    'section.popularBrandsTitle': 'أبرز العلامات التجارية',
    'section.customerReviewsTitle': 'آراء العملاء في قطر',
    'section.customerReviewsSub': 'تقييمات حقيقية من عملاؤنا في الخليج الغربي، لوسيل، اللؤلؤة والريان.',
    'section.faqTitle': 'الأسئلة الشائعة (FAQ)',
    'section.newsletterTitle': 'احصل على خصم 10% على طلبك الأول',
    'section.newsletterSub': 'اشترك ليصلك أحدث كودات الخصم والتخفيضات الحصرية مباشرة.',

    // Buttons & Actions
    'action.addToCart': 'أضف إلى السلة',
    'action.buyNow': 'شراء الآن',
    'action.quickView': 'نظرة سريعة',
    'action.viewAll': 'عرض الكل',
    'action.orderWhatsApp': 'طلب عبر واتساب',
    'action.subscribe': 'اشترك الآن',
    'action.checkout': 'متابعة الدفع',
    'action.applyCoupon': 'تطبيق الكود',
    'action.close': 'إغلاق',

    // Product Card & Price
    'product.qar': 'ر.ق',
    'product.off': 'خصم',
    'product.inStock': 'متوفر',
    'product.outOfStock': 'نفذت الكمية',
    'product.save': 'وفّر',

    // Footer
    'footer.aboutHeader': 'سوبر ديل أونلاين ستور قطر',
    'footer.aboutDesc': 'وجهتك الموثوقة في قطر لأحدث مستلزمات الهواتف والساعات الذكية والسماعات اللاسلكية والمنتجات المنزلية مع توصيل سريع لجميع مناطق الدوحة والبلديات.',
    'footer.quickLinks': 'روابط السريعة',
    'footer.categories': 'أبرز الأقسام',
    'footer.policies': 'سياسات المتجر',
    'footer.customerSupport': 'خدمة العملاء',
    'footer.rights': 'جميع الحقوق محفوظة.',

    // Policies
    'policy.delivery': 'معلومات التوصيل',
    'policy.refund': 'سياسة الاسترجاع والاستبدال',
    'policy.privacy': 'سياسة الخصوصية',
    'policy.terms': 'الشروط والأحكام',
    'policy.faq': 'مركز المساعدة والأسئلة الشائعة',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('superdeal_lang');
    return (saved === 'ar' || saved === 'en') ? saved : 'en';
  });

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    localStorage.setItem('superdeal_lang', language);
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [language, dir]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const t = (key: string, defaultText?: string): string => {
    if (translations[language] && translations[language][key]) {
      return translations[language][key];
    }
    if (translations['en'][key]) {
      return translations['en'][key];
    }
    return defaultText || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        dir,
        setLanguage,
        toggleLanguage,
        t,
        isArabic: language === 'ar',
      }}
    >
      <div dir={dir} className={language === 'ar' ? 'font-sans-ar' : 'font-sans'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
