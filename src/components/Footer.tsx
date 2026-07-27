import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle, MapPin, Phone, Mail, ShieldCheck, Truck, DollarSign, CreditCard, Share2 } from 'lucide-react';
import { 
  WhatsAppIcon, 
  FacebookIcon, 
  InstagramIcon, 
  TikTokIcon, 
  SnapchatIcon, 
  YouTubeIcon 
} from './icons/SocialIcons';
import { COMPANY_INFO, PRODUCT_CATEGORIES } from '../data/storeData';

interface FooterProps {
  setCurrentPage: (page: string) => void;
  setCategoryFilter?: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage, setCategoryFilter }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const navigate = (page: string, categoryId?: string) => {
    setCurrentPage(page);
    if (categoryId && setCategoryFilter) {
      setCategoryFilter(categoryId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(
    'Hello Super Deal Online.Store! I have a question about ordering in Qatar.'
  )}`;

  return (
    <footer className="bg-[#0B192C] text-white pt-16 pb-8 border-t-4 border-[#0057FF] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Offer Banner */}
        <div className="mb-14 p-8 rounded-3xl bg-gradient-to-r from-[#0057FF] to-blue-900 border border-blue-400/30 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-900 bg-amber-400 px-3 py-1 rounded-full shadow-xs">
                <Sparkles className="w-3.5 h-3.5" /> Exclusive Qatar Offer
              </span>
              <h3 className="font-playfair text-2xl sm:text-3xl font-extrabold text-white">
                Get 10% OFF Your First Online Order
              </h3>
              <p className="text-blue-100 text-xs sm:text-sm max-w-xl leading-relaxed">
                Subscribe to receive instant updates on new arrivals, flash deals in Qatar, and VIP discount coupons delivered to your inbox.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-4 rounded-2xl flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0" />
                  <div>
                    <p className="font-bold text-xs sm:text-sm">You are subscribed!</p>
                    <p className="text-xs text-blue-100">
                      Use promo code{' '}
                      <span className="text-amber-300 font-mono font-black">
                        SUPERQATAR10
                      </span>{' '}
                      at checkout for 10% off.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    required
                    className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:border-amber-400 text-xs"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-amber-400 text-slate-900 font-black text-xs hover:bg-amber-300 transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    Get 10% Code <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ================= PREMIUM FOLLOW US SOCIAL SECTION ================= */}
        <div className="mb-14 p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl relative overflow-hidden text-center sm:text-left">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Social Text */}
            <div className="space-y-1.5 max-w-xl">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-amber-300 bg-amber-400/10 border border-amber-400/30 px-3 py-0.5 rounded-full">
                <Share2 className="w-3.5 h-3.5" /> Connect With Us in Qatar
              </span>
              <h3 className="font-playfair text-xl sm:text-2xl font-black text-white">
                Follow Us On Social Media
              </h3>
              <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed font-medium">
                Follow Super Deal Online.Store for the latest deals, new arrivals, and exclusive offers in Qatar.
              </p>
            </div>

            {/* Circular Glassmorphism Icons Grid */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-5">
              
              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on WhatsApp"
                className="group relative flex flex-col items-center gap-1 cursor-pointer"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-md shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-[#25D366] hover:border-[#25D366] hover:shadow-[0_0_25px_rgba(37,211,102,0.6)]">
                  <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
                </div>
                <span className="text-[10px] font-bold text-gray-400 group-hover:text-amber-300 transition-colors">WhatsApp</span>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com/superdeal.qatar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="group relative flex flex-col items-center gap-1 cursor-pointer"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-md shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-[#1877F2] hover:border-[#1877F2] hover:shadow-[0_0_25px_rgba(24,119,242,0.6)]">
                  <FacebookIcon className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
                </div>
                <span className="text-[10px] font-bold text-gray-400 group-hover:text-amber-300 transition-colors">Facebook</span>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/superdeal.qatar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="group relative flex flex-col items-center gap-1 cursor-pointer"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-md shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:border-pink-500 hover:shadow-[0_0_25px_rgba(225,48,108,0.6)]">
                  <InstagramIcon className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
                </div>
                <span className="text-[10px] font-bold text-gray-400 group-hover:text-amber-300 transition-colors">Instagram</span>
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com/@superdeal.qatar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on TikTok"
                className="group relative flex flex-col items-center gap-1 cursor-pointer"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-md shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-black hover:border-pink-500 hover:text-cyan-400 hover:shadow-[0_0_25px_rgba(0,242,254,0.5)]">
                  <TikTokIcon className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
                </div>
                <span className="text-[10px] font-bold text-gray-400 group-hover:text-amber-300 transition-colors">TikTok</span>
              </a>

              {/* Snapchat */}
              <a
                href="https://snapchat.com/add/superdeal.qatar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Snapchat"
                className="group relative flex flex-col items-center gap-1 cursor-pointer"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-md shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-[#FFFC00] hover:border-[#FFFC00] hover:text-slate-950 hover:shadow-[0_0_25px_rgba(255,252,0,0.6)]">
                  <SnapchatIcon className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
                </div>
                <span className="text-[10px] font-bold text-gray-400 group-hover:text-amber-300 transition-colors">Snapchat</span>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com/@superdeal.qatar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on YouTube"
                className="group relative flex flex-col items-center gap-1 cursor-pointer"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-md shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-[#FF0000] hover:border-[#FF0000] hover:shadow-[0_0_25px_rgba(255,0,0,0.6)]">
                  <YouTubeIcon className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
                </div>
                <span className="text-[10px] font-bold text-gray-400 group-hover:text-amber-300 transition-colors">YouTube</span>
              </a>

            </div>

          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-gray-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#0057FF] flex items-center justify-center text-white font-bold shadow-md">
                <Sparkles className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <h4 className="font-playfair text-xl font-bold text-white tracking-tight">
                  Super Deal Online.Store
                </h4>
                <p className="text-[10px] text-amber-400 font-bold tracking-widest uppercase">
                  Qatar Premier Online Store
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              Qatar’s trusted destination for high quality mobile accessories, smart watches, AirPods, Bluetooth speakers, home essentials, and beauty products with express delivery across Doha and all municipalities.
            </p>

            <div className="space-y-2 text-xs text-gray-300 pt-2">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#0057FF] shrink-0" />
                <span>Free Express Delivery over 150 QAR</span>
              </div>
              <div className="flex items-center gap-2.5">
                <DollarSign className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Cash on Delivery Available Across Qatar</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white transition-all flex items-center gap-2 font-bold text-xs"
                aria-label="WhatsApp Support"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" /> WhatsApp Us
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="font-bold text-sm text-white uppercase tracking-wider border-b border-gray-800 pb-2">
              Quick Links
            </h5>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button onClick={() => navigate('home')} className="hover:text-[#0057FF] transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navigate('categories')} className="hover:text-[#0057FF] transition-colors cursor-pointer">
                  Product Categories
                </button>
              </li>
              <li>
                <button onClick={() => navigate('new-arrivals')} className="hover:text-[#0057FF] transition-colors cursor-pointer">
                  New Arrivals
                </button>
              </li>
              <li>
                <button onClick={() => navigate('best-sellers')} className="hover:text-[#0057FF] transition-colors cursor-pointer">
                  Best Sellers
                </button>
              </li>
              <li>
                <button onClick={() => navigate('deals')} className="hover:text-[#0057FF] transition-colors cursor-pointer">
                  Hot Deals
                </button>
              </li>
              <li>
                <button onClick={() => navigate('about')} className="hover:text-[#0057FF] transition-colors cursor-pointer">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => navigate('contact')} className="hover:text-[#0057FF] transition-colors cursor-pointer">
                  Contact Support
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="font-bold text-sm text-white uppercase tracking-wider border-b border-gray-800 pb-2">
              Top Categories
            </h5>
            <ul className="space-y-2 text-xs text-gray-400">
              {PRODUCT_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => navigate('categories', cat.id)}
                    className="hover:text-[#0057FF] transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>{cat.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="font-bold text-sm text-white uppercase tracking-wider border-b border-gray-800 pb-2">
              Customer Support
            </h5>
            <div className="space-y-2.5 text-xs text-gray-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#0057FF] shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}, West Bay, Doha, Qatar</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#0057FF] shrink-0" />
                <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-[#0057FF]">
                  {COMPANY_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#0057FF] shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-[#0057FF]">
                  {COMPANY_INFO.email}
                </a>
              </div>
            </div>

            <div className="p-3.5 bg-slate-900/90 rounded-2xl border border-gray-800 space-y-1.5">
              <p className="text-[11px] font-bold text-amber-400">
                ⚡ 24/7 Qatar Order Assistance
              </p>
              <p className="text-[10px] text-gray-400">
                Our support team is active on WhatsApp 24 hours a day to assist with orders and inquiries across Qatar.
              </p>
            </div>
          </div>
        </div>

        {/* Payment Icons & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} Super Deal Online.Store (Qatar). All rights reserved.</p>

          {/* Payment Badges */}
          <div className="flex flex-wrap items-center gap-2.5 text-[11px] font-bold text-slate-300">
            <span className="bg-slate-800 px-3 py-1 rounded-lg border border-gray-700 flex items-center gap-1">
              💵 Cash on Delivery
            </span>
            <span className="bg-slate-800 px-3 py-1 rounded-lg border border-gray-700 flex items-center gap-1">
              💳 NAPE / Debit Card
            </span>
            <span className="bg-slate-800 px-3 py-1 rounded-lg border border-gray-700 flex items-center gap-1">
               Apple Pay
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
