import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ShoppingBag, 
  CheckCircle, 
  ShieldCheck, 
  Truck, 
  Clock, 
  Star, 
  ArrowRight, 
  Flame, 
  Smartphone, 
  Watch, 
  Headphones, 
  Volume2, 
  Home as HomeIcon, 
  Laptop, 
  Gift, 
  ChevronRight, 
  ChevronDown,
  DollarSign, 
  Award, 
  ThumbsUp, 
  Lock, 
  RotateCcw,
  Zap,
  Eye,
  Mail,
  Crown,
  TrendingUp,
  PackageCheck,
  Headphones as SupportIcon,
  BadgePercent,
  HelpCircle
} from 'lucide-react';
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon';
import { COMPANY_INFO, PRODUCT_CATEGORIES, TESTIMONIALS } from '../data/storeData';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { StarRating } from '../components/StarRating';
import { useReviews } from '../context/ReviewContext';
import { useStore } from '../context/StoreContext';
import { useLanguage } from '../context/LanguageContext';
import dohaHeroBg from '../assets/images/doha_hero_bg_1785072086707.jpg';

interface HomePageProps {
  setCurrentPage: (page: string) => void;
  onAddToCart: (product: Product, color?: string) => void;
  onOpenQuickView: (product: Product) => void;
  onOpenReviews: (product: Product) => void;
  setCategoryFilter: (category: string) => void;
  selectedCategoryFilter: string;
}

export const HomePage: React.FC<HomePageProps> = ({
  setCurrentPage,
  onAddToCart,
  onOpenQuickView,
  onOpenReviews,
  setCategoryFilter,
}) => {
  const { products } = useStore();
  const { t, isArabic } = useLanguage();
  const { getItemRatingSummary } = useReviews();

  const [activeTab, setActiveTab] = useState<'all' | 'bestsellers' | 'new' | 'deals'>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Flash Sale Countdown Timer State
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 42, seconds: 19 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribedToast, setSubscribedToast] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribedToast(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribedToast(false), 4000);
    }
  };

  // Filter products for the Featured Products tab
  const displayedProducts = products.filter((p) => {
    if (activeTab === 'bestsellers') return p.isBestSeller || p.popular;
    if (activeTab === 'new') return p.isNew;
    if (activeTab === 'deals') return p.isDeal || p.discountPercent >= 35;
    return true;
  });

  // Best Sellers (Top 4)
  const bestSellersList = products.filter((p) => p.isBestSeller || p.popular || p.rating >= 4.8).slice(0, 4);

  // New Arrivals (Top 4)
  const newArrivalsList = products.filter((p) => p.isNew || p.badge?.includes('NEW')).slice(0, 4);

  // Flash Sale Items (High discount items)
  const flashSaleItems = products.filter((p) => p.discountPercent >= 30 || p.isDeal).slice(0, 4);

  const whatsappHeroUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(
    'Hello Super Deal Online.Store! I would like to place an order in Qatar.'
  )}`;

  // Category Icon Resolver
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone': return <Smartphone className="w-6 h-6" />;
      case 'Watch': return <Watch className="w-6 h-6" />;
      case 'Headphones': return <Headphones className="w-6 h-6" />;
      case 'Volume2': return <Volume2 className="w-6 h-6" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6" />;
      case 'Home': return <HomeIcon className="w-6 h-6" />;
      case 'Laptop': return <Laptop className="w-6 h-6" />;
      case 'Flame': return <Flame className="w-6 h-6" />;
      default: return <Gift className="w-6 h-6" />;
    }
  };

  // FAQ Items
  const faqList = [
    {
      q: 'How fast is delivery in Qatar?',
      a: 'We offer Same Day Delivery across Doha, Lusail, West Bay, and Pearl Qatar. Orders placed before 4:00 PM are delivered same evening. Standard delivery takes 24 hours across all Qatar municipalities. Free delivery applies for orders over 150 QAR.'
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We support Cash on Delivery (COD), POS Card Terminal on Delivery, and QMP Mobile Wallet Transfers so you can inspect your item upon arrival.'
    },
    {
      q: 'Are all products genuine with warranty in Qatar?',
      a: 'Yes! 100% of our smart watches, AirPods, power banks, and accessories are original and come with local Qatar warranty coverage.'
    },
    {
      q: 'How do I place an order via WhatsApp?',
      a: 'Simply click the "WhatsApp Order" button on any product card or in the header. It automatically sends your requested item and address details to our support number at +974 7177 3732.'
    }
  ];

  // Popular Brands List
  const popularBrands = [
    { name: 'Apple', logo: ' Apple', category: 'AirPods & Accessories', tagline: 'Official Grade Gear' },
    { name: 'Samsung', logo: 'SAMSUNG', category: 'Watches & Chargers', tagline: 'Galaxy Ecosystem' },
    { name: 'Anker', logo: 'ANKER', category: 'Power Banks & Cables', tagline: 'Fast Charge Tech' },
    { name: 'JBL', logo: 'JBL', category: 'Party Speakers & Earbuds', tagline: 'Pure Bass Audio' },
    { name: 'Xiaomi', logo: 'Xiaomi', category: 'Smart Home & Wearables', tagline: 'Smart Innovation' },
    { name: 'Dyson', logo: 'Dyson', category: 'Beauty & Hair Care', tagline: 'Luxury Styling' },
  ];

  return (
    <div className="space-y-16 pb-16 font-sans bg-slate-50 text-slate-900">
      
      {/* ================= 1. PREMIUM HERO BANNER ================= */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-[#071325] text-white overflow-hidden py-12 lg:py-20">
        {/* Doha Golden Hour Skyline & Lusail Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={dohaHeroBg}
            alt="Doha West Bay Skyline and Lusail Marina Towers Qatar Golden Hour"
            className="w-full h-full object-cover object-center filter saturate-[1.1] contrast-[1.05]"
            referrerPolicy="no-referrer"
          />
          {/* Blue Gradient Overlay for Contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#050D1A]/95 via-[#0057FF]/60 to-[#071325]/90 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071325] via-transparent to-black/50" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-400/25 via-transparent to-transparent" />

          {/* Floating Light Particles */}
          <div className="absolute top-1/4 left-10 w-72 h-72 bg-amber-400/15 rounded-full blur-3xl animate-pulse pointer-events-none" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Side - Text & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Country Trust Pill */}
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-amber-300 text-xs font-black px-4 py-2 rounded-full backdrop-blur-xl shadow-xl">
                <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
                <span>🇶🇦 Qatar’s Premier Online Store • Express Delivery Across Qatar</span>
              </div>

              {/* Main Heading */}
              <h1 className="font-playfair text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15] drop-shadow-lg">
                Qatar's Trusted Online <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-400">
                  Shopping Destination
                </span>
              </h1>

              {/* Sub Heading */}
              <p className="text-sm sm:text-base lg:text-lg font-medium text-blue-100/90 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Shop Premium Electronics, Smart Watches, AirPods, Mobile Accessories, Home Essentials, Beauty Products and Trending Gadgets with Fast Delivery Across Qatar.
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => {
                    const el = document.getElementById('featured-products');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-4 bg-[#2563EB] text-white font-black text-sm sm:text-base rounded-2xl shadow-2xl hover:bg-[#1D4ED8] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2.5 cursor-pointer ring-4 ring-[#2563EB]/20"
                >
                  <ShoppingBag className="w-5 h-5 text-white" />
                  Shop Now
                </button>

                <a
                  href={whatsappHeroUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-emerald-500 text-white font-black text-sm sm:text-base rounded-2xl shadow-2xl hover:bg-emerald-600 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2.5 cursor-pointer ring-4 ring-emerald-500/20"
                >
                  <WhatsAppIcon className="w-5 h-5 fill-white" />
                  Order on WhatsApp
                </a>
              </div>

              {/* Trust Badges */}
              <div className="pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-bold text-white/95">
                <div className="bg-white/10 backdrop-blur-md px-3 py-2.5 rounded-xl border border-white/15 flex items-center justify-center lg:justify-start gap-2 shadow-xs hover:bg-white/15 transition-colors">
                  <CheckCircle className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Cash On Delivery</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md px-3 py-2.5 rounded-xl border border-white/15 flex items-center justify-center lg:justify-start gap-2 shadow-xs hover:bg-white/15 transition-colors">
                  <CheckCircle className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Same Day Delivery</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md px-3 py-2.5 rounded-xl border border-white/15 flex items-center justify-center lg:justify-start gap-2 shadow-xs hover:bg-white/15 transition-colors">
                  <CheckCircle className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Secure Payment</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md px-3 py-2.5 rounded-xl border border-white/15 flex items-center justify-center lg:justify-start gap-2 shadow-xs hover:bg-white/15 transition-colors">
                  <CheckCircle className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Free Over 150 QAR</span>
                </div>
              </div>

            </div>

            {/* Right Side - Floating Showcase */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative space-y-3">
                <div className="flex items-center justify-between text-xs font-black tracking-wider text-amber-300 uppercase px-1">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Top Qatar Deals
                  </span>
                  <span className="bg-blue-600/60 text-white px-2.5 py-0.5 rounded-full text-[10px] border border-blue-400/30">
                    Hot Items
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {products.slice(0, 4).map((p) => (
                    <div
                      key={p.id}
                      onClick={() => onOpenQuickView(p)}
                      className="bg-white/10 backdrop-blur-xl border border-white/20 hover:border-amber-400/60 p-3 rounded-2xl shadow-2xl hover:bg-white/15 transition-all duration-300 cursor-pointer group hover:-translate-y-1 relative overflow-hidden"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-white/20 group-hover:scale-105 transition-transform bg-white/20">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block truncate">
                            {p.categoryLabel}
                          </span>
                          <h4 className="text-xs font-extrabold text-white truncate group-hover:text-amber-300 transition-colors">
                            {p.name}
                          </h4>
                          <span className="text-xs font-black text-amber-300 block mt-0.5">
                            {p.price} QAR
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-amber-400/20 via-blue-500/20 to-emerald-400/20 backdrop-blur-xl border border-white/20 rounded-2xl p-3 flex items-center justify-between text-[11px] font-bold text-white">
                  <span className="flex items-center gap-1.5 text-amber-300">
                    <CheckCircle className="w-4 h-4 text-amber-300" />
                    100% Genuine Warranty
                  </span>
                  <span className="text-blue-200">Express Delivery 🚀</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 2. MODERN CATEGORY CARDS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-[#0057FF] bg-blue-50 px-3 py-1 rounded-full">
            Explore Collection
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl font-extrabold text-slate-900">
            Shop By Category
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto">
            Browse our wide range of premium electronics, smart watches, audio gear, and home accessories in Qatar.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {PRODUCT_CATEGORIES.map((category) => (
            <div
              key={category.id}
              onClick={() => {
                setCategoryFilter(category.id);
                setCurrentPage('categories');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group relative bg-white rounded-3xl p-5 border border-gray-200/80 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between hover:-translate-y-1.5"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0057FF] flex items-center justify-center font-bold group-hover:bg-[#0057FF] group-hover:text-white transition-colors duration-300 shadow-2xs">
                  {getCategoryIcon(category.iconName)}
                </div>
                <span className="text-[10px] font-black text-gray-400 group-hover:text-[#0057FF] transition-colors">
                  {category.count}+ ITEMS
                </span>
              </div>

              <div className="relative h-28 rounded-2xl overflow-hidden mb-4 bg-slate-100">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
              </div>

              <div>
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-[#0057FF] transition-colors flex items-center justify-between">
                  <span>{category.name}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 group-hover:text-[#0057FF] transition-all" />
                </h3>
                {category.nameArabic && (
                  <p className="text-[11px] text-[#0057FF] font-serif mt-0.5">
                    {category.nameArabic}
                  </p>
                )}
                <p className="text-[11px] text-gray-500 line-clamp-1 mt-1">
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 3. FLASH SALE SECTION WITH COUNTDOWN ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-red-600 via-rose-700 to-amber-600 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/20 pb-8 mb-8">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-amber-300 bg-white/10 px-3.5 py-1 rounded-full border border-white/20">
                <Zap className="w-4 h-4 text-amber-300 animate-bounce" /> Flash Sale in Qatar
              </span>
              <h2 className="font-playfair text-2xl sm:text-4xl font-extrabold text-white">
                Limited Time Deals – Up to 40% OFF
              </h2>
              <p className="text-xs sm:text-sm text-rose-100 max-w-xl">
                Grab top-tier electronics and wearables at unbeatable prices. Express delivery available across Doha!
              </p>
            </div>

            {/* Countdown Clock */}
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md p-3.5 rounded-2xl border border-white/20">
              <Clock className="w-5 h-5 text-amber-300 shrink-0" />
              <div className="flex items-center gap-1.5 text-xs font-black">
                <div className="bg-white text-slate-900 px-2.5 py-1.5 rounded-lg min-w-[36px] text-center">
                  {String(timeLeft.hours).padStart(2, '0')}h
                </div>
                <span>:</span>
                <div className="bg-white text-slate-900 px-2.5 py-1.5 rounded-lg min-w-[36px] text-center">
                  {String(timeLeft.minutes).padStart(2, '0')}m
                </div>
                <span>:</span>
                <div className="bg-white text-amber-600 px-2.5 py-1.5 rounded-lg min-w-[36px] text-center">
                  {String(timeLeft.seconds).padStart(2, '0')}s
                </div>
              </div>
            </div>
          </div>

          {/* Flash Sale Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {flashSaleItems.map((item) => (
              <div
                key={item.id}
                className="bg-white text-slate-900 rounded-2xl p-4 shadow-lg border border-white/20 flex flex-col justify-between group hover:-translate-y-1 transition-all"
              >
                <div className="space-y-3">
                  <div className="relative h-44 rounded-xl overflow-hidden bg-slate-100">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <span className="absolute top-2 left-2 bg-red-600 text-white font-black text-[10px] px-2.5 py-1 rounded-full shadow-xs">
                      SAVE {item.discountPercent}%
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm text-slate-900 line-clamp-1">{item.name}</h3>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-lg font-black text-[#0057FF]">{item.price} QAR</span>
                      <span className="text-xs text-gray-400 line-through">{item.originalPrice} QAR</span>
                    </div>
                  </div>

                  {/* Urgency Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold text-gray-500">
                      <span>Stock Status</span>
                      <span className="text-red-600">Only 3 units left in Doha</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-amber-500 to-red-600 h-full w-4/5 rounded-full" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-3 mt-3 border-t border-slate-100">
                  <button
                    onClick={() => onAddToCart(item)}
                    className="py-2 bg-[#0057FF] hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" /> Claim Deal
                  </button>
                  <button
                    onClick={() => onOpenQuickView(item)}
                    className="py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" /> Quick View
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= 4. FEATURED PRODUCTS SECTION ================= */}
      <section id="featured-products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-gray-200 pb-5">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#0057FF] bg-blue-50 px-3 py-1 rounded-full">
              Trending in Qatar
            </span>
            <h2 className="font-playfair text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">
              Featured Products
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Products' },
              { id: 'bestsellers', label: '⭐ Best Sellers' },
              { id: 'new', label: '🔥 New Arrivals' },
              { id: 'deals', label: '⚡ Flash Deals' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#0057FF] text-white shadow-md'
                    : 'bg-white text-slate-700 border border-gray-200 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedProducts.map((product) => {
            const summary = getItemRatingSummary(product.id);
            const whatsappInquiryUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(
              `Hello Super Deal Online.Store! I want to order "${product.name}" for ${product.price} QAR. Is cash on delivery available?`
            )}`;

            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl border border-gray-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div className="relative h-56 overflow-hidden bg-slate-100 p-4 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-2xl"
                  />

                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                    {product.badge && (
                      <span className="bg-[#0057FF] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {product.discountPercent > 0 && (
                    <span className="absolute top-3 right-3 bg-amber-400 text-slate-900 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs">
                      {product.discountPercent}% OFF
                    </span>
                  )}

                  <button
                    onClick={() => onOpenQuickView(product)}
                    className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-slate-900 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white cursor-pointer"
                    title="Quick View"
                  >
                    <Eye className="w-4 h-4 text-[#0057FF]" />
                  </button>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      {product.categoryLabel}
                    </span>

                    <h3
                      onClick={() => onOpenQuickView(product)}
                      className="font-bold text-sm sm:text-base text-slate-900 hover:text-[#0057FF] transition-colors cursor-pointer line-clamp-2 leading-snug"
                    >
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-2 pt-1">
                      <StarRating rating={summary.average} size="xs" />
                      <span className="text-[11px] font-bold text-slate-700">
                        {summary.average}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        ({summary.count || product.reviewCount})
                      </span>
                    </div>

                    <div className="flex items-baseline gap-2 pt-2">
                      <span className="text-xl font-black text-[#0057FF]">
                        {product.price} QAR
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-xs font-bold text-gray-400 line-through">
                          {product.originalPrice} QAR
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-gray-100">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onAddToCart(product)}
                        className="py-2.5 bg-[#0057FF] text-white font-extrabold text-xs rounded-xl shadow-xs hover:bg-blue-700 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Add to Cart
                      </button>

                      <button
                        onClick={() => {
                          onAddToCart(product);
                          setCurrentPage('cart');
                        }}
                        className="py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold text-xs rounded-xl shadow-xs transition-colors cursor-pointer text-center"
                      >
                        Buy Now
                      </button>
                    </div>

                    <a
                      href={whatsappInquiryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-500 hover:text-white border border-emerald-200 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                      WhatsApp Order
                    </a>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= 5. BEST SELLERS SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-4">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full inline-flex items-center gap-1">
              <Crown className="w-3.5 h-3.5 text-amber-500" /> Qatar Customer Favorites
            </span>
            <h2 className="font-playfair text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Top Best Sellers in Qatar
            </h2>
          </div>
          <button
            onClick={() => {
              setCategoryFilter('all');
              setCurrentPage('categories');
            }}
            className="text-xs font-extrabold text-[#0057FF] hover:underline flex items-center gap-1 cursor-pointer"
          >
            View All <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellersList.map((product, idx) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl border border-gray-200 p-4 shadow-xs hover:shadow-xl transition-all relative flex flex-col justify-between group"
            >
              <div className="absolute top-3 left-3 bg-amber-400 text-slate-900 font-black text-[10px] px-2.5 py-1 rounded-full z-10 flex items-center gap-1 shadow-xs">
                <Crown className="w-3 h-3 text-slate-900" /> #{idx + 1} Best Seller
              </div>

              <div className="relative h-48 rounded-2xl overflow-hidden bg-slate-100 mb-4">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>

              <div className="space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center gap-1 pt-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-slate-800">{product.rating}</span>
                    <span className="text-[10px] text-gray-400">({product.reviewCount} reviews)</span>
                  </div>
                  <div className="text-lg font-black text-[#0057FF] mt-2">{product.price} QAR</div>
                </div>

                <button
                  onClick={() => onAddToCart(product)}
                  className="w-full py-2.5 bg-[#0057FF] text-white font-bold text-xs rounded-xl shadow-xs hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer mt-3"
                >
                  <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 6. NEW ARRIVALS SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-4">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full inline-flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" /> Fresh In Stock
            </span>
            <h2 className="font-playfair text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              New Arrivals Just Landed
            </h2>
          </div>
          <button
            onClick={() => {
              setCategoryFilter('trending');
              setCurrentPage('categories');
            }}
            className="text-xs font-extrabold text-[#0057FF] hover:underline flex items-center gap-1 cursor-pointer"
          >
            Browse New <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivalsList.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl border border-gray-200 p-4 shadow-xs hover:shadow-xl transition-all relative flex flex-col justify-between group"
            >
              <div className="absolute top-3 left-3 bg-emerald-500 text-white font-black text-[10px] px-2.5 py-1 rounded-full z-10 shadow-xs">
                NEW IN QATAR
              </div>

              <div className="relative h-48 rounded-2xl overflow-hidden bg-slate-100 mb-4">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>

              <div className="space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 line-clamp-2">{product.name}</h3>
                  <p className="text-[11px] text-emerald-700 font-bold mt-1">🚚 Express Same Day Delivery</p>
                  <div className="text-lg font-black text-[#0057FF] mt-2">{product.price} QAR</div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={() => onAddToCart(product)}
                    className="py-2 bg-[#0057FF] text-white font-bold text-xs rounded-xl hover:bg-blue-700 transition-colors cursor-pointer text-center"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => onOpenQuickView(product)}
                    className="py-2 bg-slate-100 text-slate-800 font-bold text-xs rounded-xl hover:bg-slate-200 transition-colors cursor-pointer text-center"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 7. WHY CHOOSE US SECTION ================= */}
      <section className="bg-gradient-to-r from-[#0057FF] to-blue-900 text-white py-14 my-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-amber-300 bg-white/10 px-3 py-1 rounded-full border border-white/20">
              Why Super Deal Online.Store
            </span>
            <h2 className="font-playfair text-3xl sm:text-4xl font-extrabold text-white">
              Qatar's Most Reliable E-Commerce Experience
            </h2>
            <p className="text-xs sm:text-sm text-blue-100/90">
              We provide unmatched convenience, authentic products, and customer service across Doha and all Qatar municipalities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                title: '100% Genuine Products',
                desc: 'Authentic tech & lifestyle essentials with local manufacturer warranty.',
                icon: <PackageCheck className="w-6 h-6 text-slate-900" />,
              },
              {
                title: 'Same Day Express Delivery',
                desc: 'Delivered to your doorstep in Doha, Pearl Qatar, and Lusail.',
                icon: <Truck className="w-6 h-6 text-slate-900" />,
              },
              {
                title: 'Cash On Delivery',
                desc: 'Pay safely upon receiving your order at home or office.',
                icon: <DollarSign className="w-6 h-6 text-slate-900" />,
              },
              {
                title: '100% Secure Checkout',
                desc: 'Encrypted order processing and safe transaction privacy.',
                icon: <Lock className="w-6 h-6 text-slate-900" />,
              },
              {
                title: '24/7 WhatsApp Support',
                desc: 'Instant order assistance and inquiry answers on WhatsApp.',
                icon: <SupportIcon className="w-6 h-6 text-slate-900" />,
              },
            ].map((pillar, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/15 text-center space-y-3 hover:bg-white/20 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-400 flex items-center justify-center mx-auto shadow-md">
                  {pillar.icon}
                </div>
                <h3 className="font-extrabold text-sm text-white">{pillar.title}</h3>
                <p className="text-xs text-blue-100/80 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= 8. POPULAR BRANDS SHOWCASE ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-black uppercase tracking-widest text-[#0057FF] bg-blue-50 px-3 py-1 rounded-full">
            Official Quality Brands
          </span>
          <h2 className="font-playfair text-2xl sm:text-3xl font-extrabold text-slate-900">
            Popular Brands Available
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {popularBrands.map((brand, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-2xl border border-gray-200 text-center hover:border-[#0057FF] hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="font-black text-lg text-slate-800 group-hover:text-[#0057FF] transition-colors">
                {brand.logo}
              </div>
              <p className="text-[11px] font-bold text-gray-500 mt-1">{brand.category}</p>
              <span className="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full inline-block mt-2">
                {brand.tagline}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 9. CUSTOMER REVIEWS SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-4">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-black uppercase tracking-widest text-[#0057FF] bg-blue-50 px-3 py-1 rounded-full">
            Verified Feedback
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl font-extrabold text-slate-900">
            Customer Reviews in Qatar
          </h2>
          <p className="text-xs text-gray-500">
            See what our customers from West Bay, Lusail, and Pearl Qatar say about Super Deal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-6 bg-white rounded-3xl border border-gray-200/80 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-600" /> Verified Buyer
                  </span>
                </div>

                <p className="text-xs text-slate-700 italic leading-relaxed">
                  "{t.comment}"
                </p>

                <p className="text-[11px] font-bold text-[#0057FF]">
                  Item: {t.productName}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-10 h-10 rounded-full object-cover border border-gray-200"
                />
                <div>
                  <h4 className="font-bold text-xs text-slate-900">{t.author}</h4>
                  <p className="text-[10px] text-gray-500">📍 {t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-[#0057FF] bg-blue-50 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" /> FAQ & Help Center
          </span>
          <h2 className="font-playfair text-2xl sm:text-3xl font-extrabold text-slate-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqList.map((item, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full text-left p-4 sm:p-5 font-bold text-xs sm:text-sm text-slate-900 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50"
                >
                  <span>{item.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#0057FF] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/50">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= 10. NEWSLETTER SUBSCRIPTION SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-[#071325] to-[#0057FF] rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden border border-white/10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-amber-300 bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full">
                <BadgePercent className="w-4 h-4" /> Exclusive Qatar VIP Deals
              </span>
              <h2 className="font-playfair text-2xl sm:text-4xl font-extrabold text-white">
                Get 10% Off Your First Order
              </h2>
              <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Subscribe to receive private discount codes, flash deal alerts, and new product drop announcements directly to your email.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribedToast ? (
                <div className="bg-emerald-500 text-white p-5 rounded-2xl text-center font-bold text-sm shadow-xl flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5 text-white" />
                  Thank you for subscribing! Your 10% discount code is <strong>SUPER10</strong>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Mail className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address..."
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 bg-white text-slate-900 placeholder-gray-400 rounded-2xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-lg transition-all cursor-pointer whitespace-nowrap"
                  >
                    Subscribe Now
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
