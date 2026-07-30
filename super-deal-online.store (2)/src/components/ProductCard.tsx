import React from 'react';
import { ShoppingBag, Eye, Heart, Star, CheckCircle } from 'lucide-react';
import { Product } from '../types';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { COMPANY_INFO } from '../data/storeData';
import { StarRating } from './StarRating';
import { useWishlist } from '../context/WishlistContext';
import { useLanguage } from '../context/LanguageContext';
import { useReviews } from '../context/ReviewContext';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, color?: string) => void;
  onOpenQuickView: (product: Product) => void;
  onBuyNow?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onOpenQuickView,
  onBuyNow,
}) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { t, isArabic } = useLanguage();
  const { getItemRatingSummary } = useReviews();

  const isSaved = isInWishlist(product.id);
  const summary = getItemRatingSummary(product.id);

  const whatsappInquiryUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(
    `Hello Super Deal Online.Store! I want to order "${product.name}" for ${product.price} QAR in Qatar.`
  )}`;

  return (
    <div className="bg-white rounded-3xl border border-gray-200/90 overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 relative">
      
      {/* Top Media Container */}
      <div className="relative h-56 overflow-hidden bg-slate-100 p-4 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-2xl"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.badge && (
            <span className="bg-[#0057FF] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs">
              {product.badge}
            </span>
          )}
        </div>

        {/* Discount Badge */}
        {product.discountPercent > 0 && (
          <span className="absolute top-3 right-3 bg-amber-400 text-slate-900 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs">
            {product.discountPercent}% {t('product.off', 'OFF')}
          </span>
        )}

        {/* Wishlist Heart Overlay Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-12 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md ${
            isSaved
              ? 'bg-rose-500 text-white scale-110'
              : 'bg-white/90 backdrop-blur-md text-slate-700 hover:bg-rose-50 hover:text-rose-600'
          }`}
          title={isSaved ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
        </button>

        {/* Quick View Button */}
        <button
          onClick={() => onOpenQuickView(product)}
          className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-slate-900 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all hover:bg-white cursor-pointer"
          title="Quick View"
        >
          <Eye className="w-4 h-4 text-[#0057FF]" />
        </button>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
              {product.categoryLabel}
            </span>
            {product.inStock ? (
              <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-emerald-500" />
                {t('product.inStock', 'In Stock')}
              </span>
            ) : (
              <span className="text-[10px] font-bold text-rose-500">
                {t('product.outOfStock', 'Out of Stock')}
              </span>
            )}
          </div>

          <h3
            onClick={() => onOpenQuickView(product)}
            className="font-bold text-sm sm:text-base text-slate-900 hover:text-[#0057FF] transition-colors cursor-pointer line-clamp-2 leading-snug"
          >
            {isArabic && product.nameArabic ? product.nameArabic : product.name}
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
              {product.price} {t('product.qar', 'QAR')}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs font-bold text-gray-400 line-through">
                {product.originalPrice} {t('product.qar', 'QAR')}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onAddToCart(product)}
              className="py-2.5 bg-[#0057FF] hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              {t('action.addToCart', 'Add to Cart')}
            </button>

            <button
              onClick={() => {
                if (onBuyNow) {
                  onBuyNow(product);
                } else {
                  onAddToCart(product);
                }
              }}
              className="py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold text-xs rounded-xl shadow-xs transition-colors cursor-pointer text-center"
            >
              {t('action.buyNow', 'Buy Now')}
            </button>
          </div>

          <a
            href={whatsappInquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-500 hover:text-white border border-emerald-200 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
            {t('action.orderWhatsApp', 'WhatsApp Order')}
          </a>
        </div>

      </div>

    </div>
  );
};
