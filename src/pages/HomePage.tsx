import React, { useState } from 'react';
import { 
  Sparkles, 
  ShoppingBag, 
  CheckCircle, 
  ShieldCheck, 
  Truck, 
  Clock, 
  Star, 
  ArrowRight, 
  Heart, 
  Flame, 
  Smartphone, 
  Watch, 
  Headphones, 
  Volume2, 
  Home as HomeIcon, 
  Laptop, 
  Gift, 
  ChevronRight, 
  DollarSign, 
  RefreshCw, 
  Award, 
  ThumbsUp, 
  Users, 
  Check, 
  Lock, 
  RotateCcw,
  Zap,
  BatteryCharging,
  Sparkles as BeautyIcon,
  Gamepad2
} from 'lucide-react';
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon';
import { COMPANY_INFO, PRODUCT_CATEGORIES, PRODUCTS, TESTIMONIALS } from '../data/storeData';
import { Product, ProductCategory } from '../types';
import { StarRating } from '../components/StarRating';
import { useReviews } from '../context/ReviewContext';
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
  selectedCategoryFilter,
}) => {
  const { getItemRatingSummary } = useReviews();
  const [activeTab, setActiveTab] = useState<'all' | 'bestsellers' | 'new' | 'deals'>('all');

  // Filter products for the Featured Products tab
  const displayedProducts = PRODUCTS.filter((p) => {
    if (activeTab === 'bestsellers') return p.isBestSeller || p.popular;
    if (activeTab === 'new') return p.isNew;
    if (activeTab === 'deals') return p.isDeal || p.discountPercent >= 35;
    return true;
  });

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

  return (
    <div className="space-y-16 pb-16 font-sans bg-slate-50">
      
      {/* ================= HERO BANNER ================= */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-[#071325] text-white overflow-hidden py-12 lg:py-20">
        {/* Doha Golden Hour Skyline & Lusail Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={dohaHeroBg}
            alt="Doha West Bay Skyline and Lusail Marina Towers Qatar Golden Hour"
            className="w-full h-full object-cover object-center filter saturate-[1.1] contrast-[1.05]"
            referrerPolicy="no-referrer"
          />
          {/* 60% Premium Blue Gradient Overlay for Optimal Contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#050D1A]/95 via-[#0057FF]/60 to-[#071325]/90 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071325] via-transparent to-black/50" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-400/25 via-transparent to-transparent" />

          {/* Elegant Floating Light Particles Effect */}
          <div className="absolute top-1/4 left-10 w-72 h-72 bg-amber-400/15 rounded-full blur-3xl animate-pulse pointer-events-none" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
          <div className="absolute top-1/3 right-10 w-64 h-64 bg-emerald-400/15 rounded-full blur-3xl animate-pulse pointer-events-none" />
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
                  className="px-8 py-4 bg-amber-400 text-slate-950 font-black text-sm sm:text-base rounded-2xl shadow-2xl hover:bg-amber-300 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2.5 cursor-pointer ring-4 ring-amber-400/20"
                >
                  <ShoppingBag className="w-5 h-5 text-slate-950" />
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

            {/* Right Side - Floating Premium Product Showcase */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              
              {/* Outer Glow Halo */}
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

              {/* Product Showcase Container */}
              <div className="relative space-y-4">
                
                {/* Header Tag above floating products */}
                <div className="flex items-center justify-between text-xs font-black tracking-wider text-amber-300 uppercase px-2">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Featured Trending Collection
                  </span>
                  <span className="bg-blue-600/60 text-white px-2.5 py-0.5 rounded-full text-[10px] border border-blue-400/30">
                    7 Hot Categories
                  </span>
                </div>

                {/* Grid of 7 Floating Glass Cards */}
                <div className="grid grid-cols-2 gap-3.5 sm:gap-4">
                  
                  {/* 1. Premium Smart Watch */}
                  <div
                    onClick={() => {
                      const item = PRODUCTS.find((p) => p.category === 'smart-watches') || PRODUCTS[0];
                      onOpenQuickView(item);
                    }}
                    className="col-span-2 sm:col-span-1 bg-white/10 backdrop-blur-xl border border-white/20 hover:border-amber-400/60 p-3.5 rounded-2xl shadow-2xl hover:bg-white/15 transition-all duration-300 cursor-pointer group hover:-translate-y-1 relative overflow-hidden"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400/30 to-blue-600/30 p-1 flex items-center justify-center shrink-0 border border-white/20 group-hover:scale-105 transition-transform">
                        <img
                          src="https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=400"
                          alt="Premium Smart Watch"
                          className="w-full h-full object-cover rounded-lg"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">Smart Watch</span>
                        <h4 className="text-xs font-extrabold text-white truncate group-hover:text-amber-300 transition-colors">Ultra AMOLED Watch</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-black text-amber-300">299 QAR</span>
                          <span className="text-[9px] bg-emerald-500/80 text-white font-bold px-1.5 py-0.2 rounded">In Stock</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. Wireless AirPods */}
                  <div
                    onClick={() => {
                      const item = PRODUCTS.find((p) => p.category === 'airpods') || PRODUCTS[1];
                      onOpenQuickView(item);
                    }}
                    className="bg-white/10 backdrop-blur-xl border border-white/20 hover:border-amber-400/60 p-3.5 rounded-2xl shadow-2xl hover:bg-white/15 transition-all duration-300 cursor-pointer group hover:-translate-y-1 relative overflow-hidden"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/30 to-blue-600/30 p-1 flex items-center justify-center shrink-0 border border-white/20 group-hover:scale-105 transition-transform">
                        <img
                          src="https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&q=80&w=400"
                          alt="Wireless AirPods"
                          className="w-full h-full object-cover rounded-lg"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider block">AirPods</span>
                        <h4 className="text-xs font-extrabold text-white truncate group-hover:text-amber-300 transition-colors">Pro ANC Earbuds</h4>
                        <span className="text-xs font-black text-amber-300 block mt-0.5">249 QAR</span>
                      </div>
                    </div>
                  </div>

                  {/* 3. Latest Smartphone */}
                  <div
                    onClick={() => {
                      const item = PRODUCTS.find((p) => p.category === 'mobile-acc') || PRODUCTS[2];
                      onOpenQuickView(item);
                    }}
                    className="bg-white/10 backdrop-blur-xl border border-white/20 hover:border-amber-400/60 p-3.5 rounded-2xl shadow-2xl hover:bg-white/15 transition-all duration-300 cursor-pointer group hover:-translate-y-1 relative overflow-hidden"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400/30 to-purple-600/30 p-1 flex items-center justify-center shrink-0 border border-white/20 group-hover:scale-105 transition-transform">
                        <img
                          src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=400"
                          alt="Latest Smartphone"
                          className="w-full h-full object-cover rounded-lg"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold text-blue-300 uppercase tracking-wider block">Smartphone</span>
                        <h4 className="text-xs font-extrabold text-white truncate group-hover:text-amber-300 transition-colors">Flagship 5G Phone</h4>
                        <span className="text-xs font-black text-amber-300 block mt-0.5">3,499 QAR</span>
                      </div>
                    </div>
                  </div>

                  {/* 4. Bluetooth Speaker */}
                  <div
                    onClick={() => {
                      const item = PRODUCTS.find((p) => p.category === 'speakers') || PRODUCTS[3];
                      onOpenQuickView(item);
                    }}
                    className="bg-white/10 backdrop-blur-xl border border-white/20 hover:border-amber-400/60 p-3.5 rounded-2xl shadow-2xl hover:bg-white/15 transition-all duration-300 cursor-pointer group hover:-translate-y-1 relative overflow-hidden"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400/30 to-pink-600/30 p-1 flex items-center justify-center shrink-0 border border-white/20 group-hover:scale-105 transition-transform">
                        <img
                          src="https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=400"
                          alt="Bluetooth Speaker"
                          className="w-full h-full object-cover rounded-lg"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider block">Speaker</span>
                        <h4 className="text-xs font-extrabold text-white truncate group-hover:text-amber-300 transition-colors">360° Party Speaker</h4>
                        <span className="text-xs font-black text-amber-300 block mt-0.5">189 QAR</span>
                      </div>
                    </div>
                  </div>

                  {/* 5. Power Bank */}
                  <div
                    onClick={() => {
                      const item = PRODUCTS.find((p) => p.name.includes('Power Bank') || p.category === 'mobile-acc') || PRODUCTS[0];
                      onOpenQuickView(item);
                    }}
                    className="bg-white/10 backdrop-blur-xl border border-white/20 hover:border-amber-400/60 p-3.5 rounded-2xl shadow-2xl hover:bg-white/15 transition-all duration-300 cursor-pointer group hover:-translate-y-1 relative overflow-hidden"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400/30 to-emerald-600/30 p-1 flex items-center justify-center shrink-0 border border-white/20 group-hover:scale-105 transition-transform">
                        <img
                          src="https://images.unsplash.com/photo-1609592807982-f542a20b0fa7?auto=format&fit=crop&q=80&w=400"
                          alt="Power Bank"
                          className="w-full h-full object-cover rounded-lg"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider block">Power Bank</span>
                        <h4 className="text-xs font-extrabold text-white truncate group-hover:text-amber-300 transition-colors">20,000mAh 65W Fast</h4>
                        <span className="text-xs font-black text-amber-300 block mt-0.5">149 QAR</span>
                      </div>
                    </div>
                  </div>

                  {/* 6. Beauty Product */}
                  <div
                    onClick={() => {
                      const item = PRODUCTS.find((p) => p.category === 'beauty') || PRODUCTS[0];
                      onOpenQuickView(item);
                    }}
                    className="bg-white/10 backdrop-blur-xl border border-white/20 hover:border-amber-400/60 p-3.5 rounded-2xl shadow-2xl hover:bg-white/15 transition-all duration-300 cursor-pointer group hover:-translate-y-1 relative overflow-hidden"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-400/30 to-rose-600/30 p-1 flex items-center justify-center shrink-0 border border-white/20 group-hover:scale-105 transition-transform">
                        <img
                          src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400"
                          alt="Beauty Product"
                          className="w-full h-full object-cover rounded-lg"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold text-pink-300 uppercase tracking-wider block">Beauty</span>
                        <h4 className="text-xs font-extrabold text-white truncate group-hover:text-amber-300 transition-colors">Salon Pro Styler Kit</h4>
                        <span className="text-xs font-black text-amber-300 block mt-0.5">229 QAR</span>
                      </div>
                    </div>
                  </div>

                  {/* 7. Gaming Accessories */}
                  <div
                    onClick={() => {
                      const item = PRODUCTS.find((p) => p.category === 'trending') || PRODUCTS[0];
                      onOpenQuickView(item);
                    }}
                    className="bg-white/10 backdrop-blur-xl border border-white/20 hover:border-amber-400/60 p-3.5 rounded-2xl shadow-2xl hover:bg-white/15 transition-all duration-300 cursor-pointer group hover:-translate-y-1 relative overflow-hidden"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-400/30 to-blue-700/30 p-1 flex items-center justify-center shrink-0 border border-white/20 group-hover:scale-105 transition-transform">
                        <img
                          src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=400"
                          alt="Gaming Accessories"
                          className="w-full h-full object-cover rounded-lg"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider block">Gaming</span>
                        <h4 className="text-xs font-extrabold text-white truncate group-hover:text-amber-300 transition-colors">RGB Wireless Controller</h4>
                        <span className="text-xs font-black text-amber-300 block mt-0.5">179 QAR</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Bottom Trust Banner in Showcase */}
                <div className="bg-gradient-to-r from-amber-400/20 via-blue-500/20 to-emerald-400/20 backdrop-blur-xl border border-white/20 rounded-2xl p-3 flex items-center justify-between text-[11px] font-bold text-white">
                  <span className="flex items-center gap-1.5 text-amber-300">
                    <CheckCircle className="w-4 h-4 text-amber-300" />
                    100% Genuine Warranty in Qatar
                  </span>
                  <span className="text-blue-200">Doorstep Delivery 🚀</span>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ================= PRODUCT CATEGORIES SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-[#0057FF] bg-blue-50 px-3 py-1 rounded-full">
            Explore Collection
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl font-extrabold text-slate-900">
            Shop By Product Category
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto">
            Discover thousands of authentic electronics, smart wearables, audio devices, and home essentials with Qatar warranty.
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
              {/* Top Card Decor */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0057FF] flex items-center justify-center font-bold group-hover:bg-[#0057FF] group-hover:text-white transition-colors duration-300 shadow-2xs">
                  {getCategoryIcon(category.iconName)}
                </div>
                <span className="text-[10px] font-black text-gray-400 group-hover:text-[#0057FF] transition-colors">
                  {category.count}+ ITEMS
                </span>
              </div>

              {/* Thumbnail Image */}
              <div className="relative h-28 rounded-2xl overflow-hidden mb-4 bg-slate-100">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
              </div>

              {/* Title & Arrow */}
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

      {/* ================= FEATURED PRODUCTS SECTION ================= */}
      <section id="featured-products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-gray-200 pb-5">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#0057FF] bg-blue-50 px-3 py-1 rounded-full">
              Trending in Qatar
            </span>
            <h2 className="font-playfair text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">
              Featured Products
            </h2>
          </div>

          {/* Filter Tabs */}
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

        {/* Product Grid */}
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
                {/* Product Image & Badges */}
                <div className="relative h-56 overflow-hidden bg-slate-100 p-4 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-2xl"
                  />

                  {/* Badges */}
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
                </div>

                {/* Product Body Details */}
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

                    {/* Ratings */}
                    <div className="flex items-center gap-2 pt-1">
                      <StarRating rating={summary.average} size="xs" />
                      <span className="text-[11px] font-bold text-slate-700">
                        {summary.average}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        ({summary.count || product.reviewCount})
                      </span>
                    </div>

                    {/* Pricing */}
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

                  {/* Buttons */}
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
                      WhatsApp Inquiry
                    </a>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= TRUST SECTION ================= */}
      <section className="bg-gradient-to-r from-[#0057FF] to-blue-900 text-white py-12 my-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 shadow-md">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-900 flex items-center justify-center font-bold shrink-0">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm sm:text-base text-white">Cash On Delivery</h4>
                <p className="text-xs text-blue-100">Pay at doorstep across Qatar</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 shadow-md">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-900 flex items-center justify-center font-bold shrink-0">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm sm:text-base text-white">100% Secure Checkout</h4>
                <p className="text-xs text-blue-100">Encrypted payment protection</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 shadow-md">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-900 flex items-center justify-center font-bold shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm sm:text-base text-white">Fast Delivery Across Qatar</h4>
                <p className="text-xs text-blue-100">Same-day in Doha & Lusail</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 shadow-md">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-900 flex items-center justify-center font-bold shrink-0">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm sm:text-base text-white">Easy Returns</h4>
                <p className="text-xs text-blue-100">7 Days return & Qatar warranty</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-black uppercase tracking-widest text-[#0057FF] bg-blue-50 px-3 py-1 rounded-full">
            Our Guarantee
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl font-extrabold text-slate-900">
            Why Choose Super Deal Online.Store?
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            We are committed to delivering genuine products, unmatched prices, and premier shopping experience in Qatar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[
            {
              title: 'Premium Quality Products',
              desc: '100% genuine electronics & accessories with local manufacturer warranty.',
              icon: <Award className="w-6 h-6 text-[#0057FF]" />,
            },
            {
              title: 'Best Prices in Qatar',
              desc: 'Direct wholesale deals passed straight to online shoppers in Qatar.',
              icon: <DollarSign className="w-6 h-6 text-[#0057FF]" />,
            },
            {
              title: 'Fast Customer Support',
              desc: '24/7 dedicated WhatsApp support for order tracking & inquiries.',
              icon: <WhatsAppIcon className="w-6 h-6 text-[#0057FF]" />,
            },
            {
              title: 'Trusted Online Store',
              desc: 'Over 10,000 satisfied shoppers across Doha, Lusail, and all areas.',
              icon: <ThumbsUp className="w-6 h-6 text-[#0057FF]" />,
            },
            {
              title: 'Quick Express Delivery',
              desc: 'Receive your order on the same day with friendly courier drivers.',
              icon: <Zap className="w-6 h-6 text-[#0057FF]" />,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 bg-white rounded-3xl border border-gray-200/80 shadow-xs hover:shadow-md transition-all text-center space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto border border-blue-100">
                {item.icon}
              </div>
              <h3 className="font-bold text-sm text-slate-900">{item.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CUSTOMER REVIEWS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-6">
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

    </div>
  );
};
