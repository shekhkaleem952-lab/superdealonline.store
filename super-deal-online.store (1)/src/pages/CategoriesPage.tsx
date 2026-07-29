import React from 'react';
import { PRODUCT_CATEGORIES } from '../data/storeData';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../context/StoreContext';
import { useLanguage } from '../context/LanguageContext';
import { Search, RotateCcw } from 'lucide-react';

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
  searchQuery = '',
  setSearchQuery,
}) => {
  const { products } = useStore();
  const { isArabic } = useLanguage();

  const activeCategory = PRODUCT_CATEGORIES.find((c) => c.id === selectedCategoryFilter) || null;

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategoryFilter === 'all' || p.category === selectedCategoryFilter;
    const matchesSearch =
      !normalizedQuery ||
      p.name.toLowerCase().includes(normalizedQuery) ||
      (p.nameArabic && p.nameArabic.includes(normalizedQuery)) ||
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
            {normalizedQuery ? 'Search Results' : 'Explore Categories'}
          </span>
          <h1 className="font-playfair text-3xl sm:text-5xl font-black">
            {normalizedQuery
              ? `Results for "${searchQuery.trim()}"`
              : activeCategory
              ? (isArabic && activeCategory.nameArabic ? activeCategory.nameArabic : activeCategory.name)
              : 'All Product Categories'}
          </h1>
          <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
            {activeCategory
              ? activeCategory.description
              : 'Shop top quality smart watches, AirPods, fast chargers, mobile cases, and lifestyle electronics with same day delivery in Qatar.'}
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 pb-2 overflow-x-auto">
        <button
          onClick={() => {
            setCategoryFilter('all');
            if (setSearchQuery) setSearchQuery('');
          }}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            selectedCategoryFilter === 'all' && !normalizedQuery
              ? 'bg-[#0057FF] text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          All Products ({products.length})
        </button>

        {PRODUCT_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setCategoryFilter(cat.id);
              if (setSearchQuery) setSearchQuery('');
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedCategoryFilter === cat.id && !normalizedQuery
                ? 'bg-[#0057FF] text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {isArabic && cat.nameArabic ? cat.nameArabic : cat.name} ({cat.count})
          </button>
        ))}
      </div>

      {/* Active Search/Category Clear Indicator */}
      {(normalizedQuery || selectedCategoryFilter !== 'all') && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center justify-between text-xs font-bold text-slate-800">
          <div className="flex items-center gap-2">
            <span>Showing filtered catalog</span>
            {normalizedQuery && (
              <span className="bg-white px-2.5 py-1 rounded-xl text-[#0057FF] border border-blue-200">
                "{searchQuery}"
              </span>
            )}
          </div>
          <button
            onClick={() => {
              setCategoryFilter('all');
              if (setSearchQuery) setSearchQuery('');
            }}
            className="flex items-center gap-1 text-[#0057FF] hover:underline cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Clear Filters
          </button>
        </div>
      )}

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center space-y-4 border border-slate-200">
          <div className="w-16 h-16 rounded-3xl bg-blue-50 text-[#0057FF] flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-lg text-slate-800">No products found</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Try resetting your search query or selecting a different category above.
          </p>
          <button
            onClick={() => {
              setCategoryFilter('all');
              if (setSearchQuery) setSearchQuery('');
            }}
            className="px-6 py-2.5 bg-[#0057FF] text-white text-xs font-bold rounded-xl cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onOpenQuickView={onOpenQuickView}
            />
          ))}
        </div>
      )}
    </div>
  );
};
