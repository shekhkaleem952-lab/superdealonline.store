import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  Sparkles, 
  Heart, 
  ChevronRight, 
  ShieldCheck, 
  Truck, 
  User, 
  Globe, 
  Layers,
  Flame,
  Award,
  Tag,
  Phone
} from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { COMPANY_INFO, PRODUCT_CATEGORIES } from '../data/storeData';
import { Product } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useWishlist } from '../context/WishlistContext';
import { useStore } from '../context/StoreContext';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  cartCount: number;
  setIsCartOpen: (open: boolean) => void;
  onOpenWishlist: () => void;
  onOpenAccount: () => void;
  onSelectProduct?: (product: Product) => void;
  categoryFilter?: string;
  setCategoryFilter?: (category: string) => void;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  onSearchSubmit?: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setCurrentPage,
  cartCount,
  setIsCartOpen,
  onOpenWishlist,
  onOpenAccount,
  onSelectProduct,
  setCategoryFilter,
  searchQuery = '',
  setSearchQuery,
  onSearchSubmit,
}) => {
  const { language, toggleLanguage, t, isArabic } = useLanguage();
  const { wishlistCount } = useWishlist();
  const { products } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesMenuOpen, setCategoriesMenuOpen] = useState(false);
  const [localQuery, setLocalQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  const currentQuery = setSearchQuery ? searchQuery : localQuery;

  const handleQueryChange = (val: string) => {
    if (setSearchQuery) {
      setSearchQuery(val);
    } else {
      setLocalQuery(val);
    }
    setShowSearchResults(true);
  };

  const handleClearSearch = () => {
    if (setSearchQuery) {
      setSearchQuery('');
    } else {
      setLocalQuery('');
    }
    setShowSearchResults(false);
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!currentQuery.trim()) return;

    if (onSearchSubmit) {
      onSearchSubmit(currentQuery);
    } else {
      if (setCategoryFilter) setCategoryFilter('all');
      setCurrentPage('categories');
    }
    setShowSearchResults(false);
  };

  const navLinks = [
    { id: 'home', label: t('nav.home', 'Home') },
    { id: 'categories', label: t('nav.categories', 'Categories') },
    { id: 'new-arrivals', label: t('nav.newArrivals', 'New Arrivals'), filter: 'trending' },
    { id: 'best-sellers', label: t('nav.bestSellers', 'Best Sellers'), filter: 'smart-watches' },
    { id: 'deals', label: t('nav.deals', 'Deals & Discounts'), filter: 'all' },
    { id: 'about', label: t('nav.about', 'About Us') },
    { id: 'contact', label: t('nav.contact', 'Contact Us') },
  ];

  const handleNavClick = (pageId: string, filterCategory?: string) => {
    setCurrentPage(pageId);
    if (filterCategory && setCategoryFilter) {
      setCategoryFilter(filterCategory);
    }
    setMobileMenuOpen(false);
    setCategoriesMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const allMatchingProducts = currentQuery.trim()
    ? products.filter((p) =>
        p.name.toLowerCase().includes(currentQuery.toLowerCase().trim()) ||
        (p.nameArabic && p.nameArabic.includes(currentQuery.trim())) ||
        p.categoryLabel.toLowerCase().includes(currentQuery.toLowerCase().trim()) ||
        (p.brand && p.brand.toLowerCase().includes(currentQuery.toLowerCase().trim()))
      )
    : [];

  const previewProducts = allMatchingProducts.slice(0, 6);

  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(
    'Hello Super Deal Online.Store! I want to order in Qatar.'
  )}`;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100 font-sans">
      
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#0057FF] text-white text-xs py-2 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          
          {/* Top Left Badges */}
          <div className="flex flex-wrap items-center gap-3 text-[11px] sm:text-xs">
            <span className="inline-flex items-center gap-1 font-bold bg-amber-400 text-slate-900 px-2.5 py-0.5 rounded-full shadow-xs">
              {t('nav.servingQatar', '🇶🇦 Serving All Qatar Municipalities')}
            </span>
            <span className="flex items-center gap-1 font-medium text-blue-50">
              <Truck className="w-3.5 h-3.5 text-amber-300" />
              {t('nav.freeDelivery', 'Free Delivery over 150 QAR')}
            </span>
            <span className="hidden sm:inline-block text-blue-300">|</span>
            <span className="hidden sm:flex items-center gap-1 font-medium text-blue-50">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              {t('nav.cashOnDelivery', 'Cash on Delivery Available')}
            </span>
          </div>

          {/* Top Right Quick Actions & Language Switcher */}
          <div className="flex items-center gap-3 text-xs font-semibold">
            
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white px-3 py-1 rounded-full transition-all cursor-pointer border border-white/20 text-xs font-bold"
              title="Switch Language / تغيير اللغة"
            >
              <Globe className="w-3.5 h-3.5 text-amber-300" />
              <span>{isArabic ? 'English' : 'العربية'}</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 rounded-full transition-colors shadow-xs"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
              <span>{COMPANY_INFO.whatsappDisplay}</span>
            </a>

            <span className="bg-blue-800/80 px-2.5 py-1 rounded-full text-[11px] font-bold text-amber-300 border border-blue-400/30">
              QAR (ر.ق)
            </span>
          </div>

        </div>
      </div>

      {/* 2. MAIN HEADER NAVBAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none shrink-0"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-[#0057FF] to-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300 relative border border-blue-400/30">
              <Sparkles className="w-6 h-6 text-amber-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-extrabold text-lg sm:text-2xl tracking-tight text-[#0057FF] group-hover:text-blue-700 transition-colors font-playfair">
                  SUPER DEAL
                </span>
                <span className="text-[10px] sm:text-xs font-black bg-amber-400 text-slate-900 px-1.5 py-0.5 rounded uppercase tracking-wider">
                  STORE
                </span>
              </div>
              <p className="text-[10px] text-gray-500 font-semibold tracking-wider uppercase flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                Qatar’s Official Online Store
              </p>
            </div>
          </button>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg relative">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                value={currentQuery}
                onChange={(e) => handleQueryChange(e.target.value)}
                onFocus={() => setShowSearchResults(true)}
                placeholder={t('nav.searchPlaceholder', 'Search gadgets, AirPods, watches in Qatar...')}
                className="w-full pl-10 pr-24 py-2.5 text-xs rounded-2xl border-2 border-blue-100 focus:border-[#0057FF] focus:outline-none bg-slate-50 focus:bg-white transition-all shadow-2xs"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              {currentQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-20 top-3 text-gray-400 hover:text-gray-600 transition-colors p-0.5 cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-[#0057FF] text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Search
              </button>
            </form>

            {/* Live Search Results Dropdown - Desktop */}
            {showSearchResults && currentQuery.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 p-3 space-y-2 max-h-96 overflow-y-auto">
                <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2">
                  <span>Results ({allMatchingProducts.length})</span>
                  <button
                    type="button"
                    onClick={() => setShowSearchResults(false)}
                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    Close
                  </button>
                </div>
                {previewProducts.length === 0 ? (
                  <div className="p-4 text-center space-y-1">
                    <p className="text-xs font-bold text-slate-700">
                      No products found matching "{currentQuery}"
                    </p>
                  </div>
                ) : (
                  <>
                    {previewProducts.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => {
                          if (onSelectProduct) onSelectProduct(product);
                          setShowSearchResults(false);
                        }}
                        className="flex items-center gap-3 p-2.5 hover:bg-blue-50/80 rounded-xl cursor-pointer transition-colors group"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-11 h-11 rounded-lg object-cover border border-gray-200 shrink-0 group-hover:scale-105 transition-transform"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-800 truncate group-hover:text-[#0057FF] transition-colors">
                            {isArabic && product.nameArabic ? product.nameArabic : product.name}
                          </p>
                          <span className="text-[10px] text-[#0057FF] font-semibold">
                            {product.categoryLabel}
                          </span>
                        </div>
                        <span className="text-xs font-black text-[#0057FF] shrink-0">
                          {product.price} QAR
                        </span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>

          {/* Action Icons: Account, Wishlist, Cart & Mobile Toggle */}
          <div className="flex items-center gap-2">
            
            {/* Account Button */}
            <button
              onClick={onOpenAccount}
              className="p-2.5 rounded-2xl bg-gray-50 hover:bg-blue-50 text-slate-700 hover:text-[#0057FF] transition-colors border border-gray-100 flex items-center gap-1.5 cursor-pointer"
              title="My Account"
            >
              <User className="w-5 h-5" />
              <span className="hidden lg:inline text-xs font-bold">{t('nav.myAccount', 'Account')}</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2.5 rounded-2xl bg-gray-50 hover:bg-rose-50 text-slate-700 hover:text-rose-600 transition-colors border border-gray-100 flex items-center gap-1.5 cursor-pointer"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2.5 sm:px-4 sm:py-2.5 rounded-2xl bg-[#0057FF] hover:bg-blue-700 text-white transition-all shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer font-bold text-xs"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-400 text-slate-900 text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">{t('nav.cart', 'Cart')}</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-2xl bg-gray-100 text-slate-800 hover:bg-gray-200 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="mt-3 md:hidden relative">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={currentQuery}
              onChange={(e) => handleQueryChange(e.target.value)}
              onFocus={() => setShowSearchResults(true)}
              placeholder={t('nav.searchPlaceholder', 'Search products in Qatar...')}
              className="w-full pl-10 pr-20 py-2 text-xs rounded-xl border border-gray-200 bg-slate-50 focus:bg-white focus:outline-none"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 px-3 bg-[#0057FF] text-white text-xs font-bold rounded-lg"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* 3. NAVIGATION BAR LINKS (Desktop) */}
      <nav className="hidden lg:block bg-slate-50/90 border-t border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-11">
            
            <div className="flex items-center gap-6">
              
              {/* Categories Mega Dropdown Button */}
              <div className="relative">
                <button
                  onClick={() => setCategoriesMenuOpen(!categoriesMenuOpen)}
                  className="flex items-center gap-2 bg-[#0057FF] text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  <Layers className="w-4 h-4" />
                  <span>{t('nav.categories', 'Categories')}</span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${categoriesMenuOpen ? 'rotate-90' : ''}`} />
                </button>

                {/* Categories Dropdown Menu */}
                {categoriesMenuOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 p-2 space-y-1 animate-fade-in">
                    {PRODUCT_CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleNavClick('categories', cat.id)}
                        className="w-full text-left px-3 py-2 text-xs font-bold text-slate-800 hover:bg-blue-50 hover:text-[#0057FF] rounded-xl transition-colors flex items-center justify-between cursor-pointer"
                      >
                        <span>{isArabic && cat.nameArabic ? cat.nameArabic : cat.name}</span>
                        <span className="text-[10px] text-gray-400 font-normal">{cat.count}+</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Navigation Links */}
              <div className="flex items-center gap-5">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id === 'categories' ? 'categories' : link.id, link.filter)}
                    className={`text-xs font-bold transition-colors cursor-pointer relative py-2 ${
                      currentPage === link.id
                        ? 'text-[#0057FF]'
                        : 'text-slate-700 hover:text-[#0057FF]'
                    }`}
                  >
                    {link.label}
                    {currentPage === link.id && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0057FF] rounded-full" />
                    )}
                  </button>
                ))}
              </div>

            </div>

            {/* Hotline Callout */}
            <div className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#0057FF]" />
              <span>Doha Support: <strong className="text-slate-900">{COMPANY_INFO.phone}</strong></span>
            </div>

          </div>
        </div>
      </nav>

      {/* 4. MOBILE MENU DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 p-4 space-y-4 shadow-2xl animate-fade-in">
          
          <div className="flex items-center justify-between border-b pb-3 border-gray-100">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 bg-blue-50 text-[#0057FF] px-3 py-1.5 rounded-xl text-xs font-bold border border-blue-100"
            >
              <Globe className="w-4 h-4" />
              <span>{isArabic ? 'English' : 'العربية'}</span>
            </button>

            <button
              onClick={onOpenAccount}
              className="flex items-center gap-1.5 bg-slate-100 text-slate-800 px-3 py-1.5 rounded-xl text-xs font-bold"
            >
              <User className="w-4 h-4 text-[#0057FF]" />
              <span>{t('nav.myAccount', 'Account')}</span>
            </button>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id, link.filter)}
                className="w-full text-left py-2.5 px-3 rounded-xl text-xs font-bold text-slate-800 hover:bg-blue-50 hover:text-[#0057FF] transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-gray-100">
            <p className="text-[11px] font-bold text-gray-400 uppercase mb-2">Categories</p>
            <div className="grid grid-cols-2 gap-2">
              {PRODUCT_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleNavClick('categories', cat.id)}
                  className="text-left p-2 bg-slate-50 rounded-xl text-[11px] font-bold text-slate-700 hover:bg-blue-50 hover:text-[#0057FF]"
                >
                  {isArabic && cat.nameArabic ? cat.nameArabic : cat.name}
                </button>
              ))}
            </div>
          </div>

        </div>
      )}

    </header>
  );
};
