import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, Phone, Sparkles, Heart, ChevronRight, CheckCircle, Tag, ShieldCheck, Truck } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { COMPANY_INFO, PRODUCTS } from '../data/storeData';
import { Product } from '../types';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  cartCount: number;
  wishlistCount?: number;
  setIsCartOpen: (open: boolean) => void;
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
  wishlistCount = 0,
  setIsCartOpen,
  onSelectProduct,
  setCategoryFilter,
  searchQuery = '',
  setSearchQuery,
  onSearchSubmit,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    { id: 'home', label: 'Home' },
    { id: 'categories', label: 'Categories' },
    { id: 'new-arrivals', label: 'New Arrivals' },
    { id: 'best-sellers', label: 'Best Sellers' },
    { id: 'deals', label: 'Deals & Discounts' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (pageId: string, filterCategory?: string) => {
    setCurrentPage(pageId);
    if (filterCategory && setCategoryFilter) {
      setCategoryFilter(filterCategory);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const allMatchingProducts = currentQuery.trim()
    ? PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(currentQuery.toLowerCase().trim()) ||
        p.categoryLabel.toLowerCase().includes(currentQuery.toLowerCase().trim()) ||
        (p.brand && p.brand.toLowerCase().includes(currentQuery.toLowerCase().trim()))
      )
    : [];

  const previewProducts = allMatchingProducts.slice(0, 6);

  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(
    'Hello Super Deal Online.Store! I want to inquire about ordering in Qatar.'
  )}`;

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md border-b border-gray-100 font-sans">
      {/* Top Bar */}
      <div className="bg-[#0057FF] text-white text-xs py-2 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          {/* Top Left Badges */}
          <div className="flex flex-wrap items-center gap-3 text-[11px] sm:text-xs">
            <span className="inline-flex items-center gap-1 font-bold bg-amber-400 text-slate-900 px-2.5 py-0.5 rounded-full shadow-xs">
              🇶🇦 Serving All Qatar
            </span>
            <span className="flex items-center gap-1 font-medium text-blue-50">
              <Truck className="w-3.5 h-3.5 text-amber-300" />
              Free Delivery over <strong className="text-white">150 QAR</strong>
            </span>
            <span className="hidden sm:inline-block text-blue-300">|</span>
            <span className="hidden sm:flex items-center gap-1 font-medium text-blue-50">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              Cash on Delivery Available
            </span>
          </div>

          {/* Top Right Quick Contact */}
          <div className="flex items-center gap-4 text-xs font-semibold">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white px-2.5 py-0.5 rounded-full transition-colors"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
              <span>WhatsApp: {COMPANY_INFO.whatsappDisplay}</span>
            </a>
            <span className="bg-blue-800/60 px-2 py-0.5 rounded text-[11px] font-bold text-amber-300">
              QAR (ر.ق)
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
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
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-[#0057FF] group-hover:text-blue-700 transition-colors font-playfair">
                  SUPER DEAL
                </span>
                <span className="text-xs font-black bg-amber-400 text-slate-900 px-1.5 py-0.5 rounded uppercase tracking-wider">
                  STORE
                </span>
              </div>
              <p className="text-[10px] text-gray-500 font-semibold tracking-wider uppercase flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                Qatar’s Official Online Outlet
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
                placeholder="Search smart watches, AirPods, power banks, beauty..."
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
                  <span>Search Results ({allMatchingProducts.length})</span>
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
                    <p className="text-[11px] text-gray-400">
                      Try searching for "AirPods", "Smart Watch", or "Power Bank"
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
                            {product.name}
                          </p>
                          <p className="text-[10px] text-gray-500 flex items-center gap-1.5 mt-0.5">
                            <span className="bg-blue-50 text-[#0057FF] px-1.5 py-0.2 rounded font-semibold text-[9px]">
                              {product.categoryLabel}
                            </span>
                            {product.brand && <span>• {product.brand}</span>}
                          </p>
                        </div>
                        <span className="text-xs font-black text-[#0057FF] shrink-0">
                          {product.price} QAR
                        </span>
                      </div>
                    ))}
                    {allMatchingProducts.length > previewProducts.length && (
                      <button
                        type="button"
                        onClick={() => handleSearchSubmit()}
                        className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-[#0057FF] font-bold text-xs rounded-xl transition-colors text-center cursor-pointer block mt-1"
                      >
                        View all {allMatchingProducts.length} matching products →
                      </button>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          {/* Action Icons: Wishlist, Cart & Mobile Menu */}
          <div className="flex items-center gap-2.5">
            {/* Wishlist */}
            <button
              onClick={() => handleNavClick('deals')}
              className="relative p-2.5 rounded-2xl bg-gray-50 hover:bg-rose-50 text-slate-700 hover:text-rose-600 transition-colors border border-gray-100 flex items-center gap-1.5 cursor-pointer"
              title="Wishlist & Deals"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2.5 sm:px-4 sm:py-2.5 rounded-2xl bg-[#0057FF] hover:bg-blue-700 text-white transition-all shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer font-bold text-xs"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-400 text-slate-900 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">My Bag</span>
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
              placeholder="Search products in Qatar..."
              className="w-full pl-9 pr-20 py-2.5 text-xs rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#0057FF] focus:outline-none transition-all"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            {currentQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-14 top-3 text-gray-400 hover:text-gray-600 transition-colors p-0.5"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 px-3 bg-[#0057FF] text-white text-[11px] font-bold rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Search
            </button>
          </form>

          {/* Live Search Results Dropdown - Mobile */}
          {showSearchResults && currentQuery.trim().length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 p-3 space-y-2 max-h-80 overflow-y-auto">
              <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2">
                <span>Search Results ({allMatchingProducts.length})</span>
                <button
                  type="button"
                  onClick={() => setShowSearchResults(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  Close
                </button>
              </div>
              {previewProducts.length === 0 ? (
                <p className="text-xs text-gray-500 p-3 text-center">
                  No products found matching "{currentQuery}"
                </p>
              ) : (
                <>
                  {previewProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        if (onSelectProduct) onSelectProduct(product);
                        setShowSearchResults(false);
                      }}
                      className="flex items-center gap-3 p-2 hover:bg-blue-50/80 rounded-xl cursor-pointer transition-colors"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-cover border border-gray-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-800 truncate">
                          {product.name}
                        </p>
                        <p className="text-[10px] text-gray-500">
                          {product.categoryLabel}
                        </p>
                      </div>
                      <span className="text-xs font-extrabold text-[#0057FF] shrink-0">
                        {product.price} QAR
                      </span>
                    </div>
                  ))}
                  {allMatchingProducts.length > previewProducts.length && (
                    <button
                      type="button"
                      onClick={() => handleSearchSubmit()}
                      className="w-full py-2 bg-blue-50 text-[#0057FF] font-bold text-xs rounded-xl text-center block mt-1 cursor-pointer"
                    >
                      View all {allMatchingProducts.length} results →
                    </button>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Navigation Links Bar */}
      <div className="hidden lg:block bg-slate-50 border-t border-gray-200/80 py-1 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <nav className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#0057FF] text-white shadow-xs'
                      : 'text-slate-700 hover:text-[#0057FF] hover:bg-blue-50/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Express Qatar Delivery Badge */}
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-3 py-1 rounded-xl">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Same-Day Express Delivery in Doha & Lusail</span>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 p-4 space-y-2 animate-fadeIn">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                  isActive
                    ? 'bg-[#0057FF] text-white'
                    : 'text-slate-700 hover:bg-gray-100'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 opacity-60" />
              </button>
            );
          })}

          <div className="pt-3 border-t border-gray-100 space-y-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-emerald-500 text-white text-center font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              Direct WhatsApp Order ({COMPANY_INFO.whatsappDisplay})
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
