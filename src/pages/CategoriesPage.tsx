import React from 'react';
import { PRODUCT_CATEGORIES, PRODUCTS } from '../data/storeData';
import { Product } from '../types';
import { StarRating } from '../components/StarRating';
import { useReviews } from '../context/ReviewContext';
import { ShoppingBag, Search, X, RotateCcw } from 'lucide-react';
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon';
import { COMPANY_INFO } from '../data/storeData';

interface CategoriesPageProps {
  onAddToCart: (product: Product) => void;
  onOpenQuickView: (product: Product) => void;
  selectedCategoryFilter: string;
  setCategoryFilter: (category: string) => void;
  setCurrentPage: (page: string) => void;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({
  onAddToCart,
  onOpenQuickView,
  selectedCategoryFilter,
  setCategoryFilter,
  setCurrentPage,
  searchQuery = '',
  setSearchQuery,
}) => {
  const { getItemRatingSummary } = useReviews();

  const activeCategory = PRODUCT_CATEGORIES.find((c) => c.id === selectedCategoryFilter) || null;

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesCategory =
      selectedCategoryFilter === 'all' || p.category === selectedCategoryFilter;
    const matchesSearch =
      !normalizedQuery ||
      p.name.toLowerCase().includes(normalizedQuery) ||
      p.categoryLabel.toLowerCase().includes(normalizedQuery) ||
      (p.brand && p.brand.toLowerCase().includes(normalizedQuery));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0057FF] to-blue-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-2xl">
          <span className="text-xs font-black uppercase tracking-widest text-slate-900 bg-amber-400 px-3 py-1 rounded-full inline-block">
            {normalizedQuery ? 'Search Mode' : 'Explore Categories'}
          </span>
          <h1 className="font-playfair text-3xl sm:text-5xl font-black">
            {normalizedQuery
              ? `Results for "${searchQuery.trim()}"`
              : activeCategory
              ? activeCategory.name
              : 'All Product Categories'}
          </h1>
          <p className="text-blue-100 text-xs sm:text-sm">
            {normalizedQuery
              ? `Found ${filteredProducts.length} matching products across all categories in Qatar.`
              : activeCategory
              ? activeCategory.description
              : 'Browse through our full catalog of premium mobile accessories, smart watches, sound systems, beauty products, and electronics in Qatar.'}
          </p>
        </div>
      </div>

      {/* Active Search Query Bar */}
      {normalizedQuery && (
        <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <Search className="w-4 h-4 text-[#0057FF]" />
              Search Filter Active:
            </span>
            <span className="bg-[#0057FF] text-white px-3 py-1 rounded-full font-black">
              "{searchQuery.trim()}"
            </span>
            <span className="text-gray-500 font-semibold">
              ({filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'} found)
            </span>
          </div>
          <button
            onClick={() => setSearchQuery && setSearchQuery('')}
            className="text-xs font-bold text-rose-600 hover:text-white hover:bg-rose-600 bg-white border border-rose-200 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" /> Clear Search
          </button>
        </div>
      )}

      {/* Category Pills Selector */}
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 pb-4">
        <button
          onClick={() => setCategoryFilter('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            selectedCategoryFilter === 'all'
              ? 'bg-[#0057FF] text-white shadow-md'
              : 'bg-white text-slate-700 border border-gray-200 hover:bg-slate-50'
          }`}
        >
          All Categories ({PRODUCTS.length})
        </button>

        {PRODUCT_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategoryFilter(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategoryFilter === cat.id
                ? 'bg-[#0057FF] text-white shadow-md'
                : 'bg-white text-slate-700 border border-gray-200 hover:bg-slate-50'
            }`}
          >
            {cat.name} ({PRODUCTS.filter((p) => p.category === cat.id).length})
          </button>
        ))}
      </div>

      {/* Empty Search Results */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-200/80 p-12 text-center max-w-lg mx-auto space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-blue-50 text-[#0057FF] flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            No products found for "{searchQuery}"
          </h2>
          <p className="text-xs text-gray-500 max-w-xs mx-auto">
            We couldn't find any items matching your search term. Try searching for popular items like "AirPods", "Smart Watch", or "Power Bank".
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setSearchQuery && setSearchQuery('AirPods')}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors"
            >
              AirPods
            </button>
            <button
              onClick={() => setSearchQuery && setSearchQuery('Watch')}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors"
            >
              Smart Watch
            </button>
            <button
              onClick={() => setSearchQuery && setSearchQuery('Anker')}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors"
            >
              Anker
            </button>
          </div>
          <div className="pt-4 border-t border-gray-100">
            <button
              onClick={() => {
                if (setSearchQuery) setSearchQuery('');
                setCategoryFilter('all');
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0057FF] text-white font-bold text-xs rounded-xl shadow-xs hover:bg-blue-700 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" /> Reset Filters & View All
            </button>
          </div>
        </div>
      ) : (
        /* Products Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const summary = getItemRatingSummary(product.id);
            const whatsappInquiryUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(
              `Hello Super Deal Online.Store! I am inquiring about "${product.name}" (${product.price} QAR).`
            )}`;

            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl border border-gray-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div className="relative h-52 overflow-hidden bg-slate-100 p-4 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-2xl"
                  />
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-[#0057FF] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs">
                      {product.badge}
                    </span>
                  )}
                  {product.discountPercent > 0 && (
                    <span className="absolute top-3 right-3 bg-amber-400 text-slate-900 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs">
                      {product.discountPercent}% OFF
                    </span>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      {product.categoryLabel}
                    </span>

                    <h3
                      onClick={() => onOpenQuickView(product)}
                      className="font-bold text-sm text-slate-900 hover:text-[#0057FF] transition-colors cursor-pointer line-clamp-2"
                    >
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-2 pt-1">
                      <StarRating rating={summary.average} size="xs" />
                      <span className="text-[11px] font-bold text-slate-700">
                        {summary.average}
                      </span>
                    </div>

                    <div className="flex items-baseline gap-2 pt-1">
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
                    <button
                      onClick={() => onAddToCart(product)}
                      className="w-full py-2.5 bg-[#0057FF] text-white font-extrabold text-xs rounded-xl shadow-xs hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> Add to Shopping Bag
                    </button>

                    <a
                      href={whatsappInquiryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-500 hover:text-white border border-emerald-200 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 fill-current" /> WhatsApp Inquiry
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
