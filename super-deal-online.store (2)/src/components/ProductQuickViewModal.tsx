import React, { useState } from 'react';
import { X, Star, ShoppingBag, ShieldCheck, Truck, Check, Sparkles, Heart, RefreshCw } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { Product } from '../types';
import { StarRating } from './StarRating';
import { useReviews } from '../context/ReviewContext';
import { COMPANY_INFO } from '../data/storeData';

interface ProductQuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onAddToCart: (product: Product, selectedColor?: string, quantity?: number) => void;
  onOpenReviews?: (product: Product) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  isOpen,
  onClose,
  product,
  onAddToCart,
  onOpenReviews,
}) => {
  const { getItemRatingSummary } = useReviews();

  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!isOpen || !product) return null;

  const currentColor = selectedColor || (product.colors && product.colors[0]) || 'Standard';
  const summary = getItemRatingSummary(product.id);

  const handleAdd = () => {
    onAddToCart(product, currentColor, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1200);
  };

  const whatsappInquiryUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(
    `Hello Super Deal Online.Store! I am interested in ordering "${product.name}" (${currentColor}) for ${product.price} QAR. Is it available for express delivery?`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn font-sans">
      <div
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border border-gray-100 flex flex-col md:flex-row overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Image Section */}
        <div className="md:w-1/2 bg-slate-100 relative min-h-[280px] md:min-h-[420px] flex items-center justify-center p-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full max-h-[380px] object-cover rounded-2xl shadow-md"
          />

          {product.badge && (
            <span className="absolute top-4 left-4 bg-[#0057FF] text-white text-xs font-black px-3 py-1 rounded-full shadow-md">
              {product.badge}
            </span>
          )}

          {product.discountPercent > 0 && (
            <span className="absolute top-4 right-4 bg-amber-400 text-slate-900 text-xs font-black px-3 py-1 rounded-full shadow-md">
              {product.discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Right Info Section */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Header & Close */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0057FF] bg-blue-50 px-2.5 py-0.5 rounded-md">
                  {product.categoryLabel}
                </span>
                <h3 className="font-playfair text-xl md:text-2xl font-bold text-slate-900 mt-1 leading-snug">
                  {product.name}
                </h3>
                {product.nameArabic && (
                  <p className="text-xs text-[#0057FF] font-serif mt-0.5">
                    {product.nameArabic}
                  </p>
                )}
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-slate-100 text-gray-400 hover:text-slate-800 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Rating Bar */}
            <div className="flex items-center gap-3">
              <StarRating rating={summary.average} size="sm" showScore />
              <button
                onClick={() => {
                  if (onOpenReviews) onOpenReviews(product);
                }}
                className="text-xs text-[#0057FF] font-bold hover:underline cursor-pointer"
              >
                ({summary.count} customer reviews)
              </button>
            </div>

            {/* Price Box */}
            <div className="flex items-baseline gap-3 p-3 bg-slate-50 rounded-2xl border border-gray-100">
              <span className="text-2xl font-black text-[#0057FF]">
                {product.price} QAR
              </span>
              {product.originalPrice > product.price && (
                <span className="text-sm font-semibold text-gray-400 line-through">
                  {product.originalPrice} QAR
                </span>
              )}
              <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded ml-auto">
                Save {product.originalPrice - product.price} QAR
              </span>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-600 leading-relaxed">
              {product.description}
            </p>

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2">
                <label className="block text-xs font-extrabold text-slate-900">
                  Select Color Variant:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => {
                    const isSelected = currentColor === color;
                    return (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#0057FF] text-white border-[#0057FF] shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {color}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Specs Bullet Points */}
            <div className="space-y-1.5">
              <label className="block text-xs font-extrabold text-slate-900">
                Key Product Highlights:
              </label>
              <ul className="space-y-1 text-xs text-slate-600">
                {product.specs.map((spec, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Badges Info */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-700 pt-1">
              <div className="flex items-center gap-1.5 bg-blue-50/80 p-2 rounded-xl text-[#0057FF] font-semibold">
                <Truck className="w-3.5 h-3.5" /> Fast Delivery in Qatar
              </div>
              <div className="flex items-center gap-1.5 bg-amber-50 p-2 rounded-xl text-amber-800 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" /> 1 Year Qatar Warranty
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            {addedSuccess ? (
              <div className="py-3 bg-emerald-500 text-white font-bold text-xs rounded-2xl text-center animate-fadeIn flex items-center justify-center gap-2">
                <Check className="w-4 h-4" /> Item Added to Shopping Bag!
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAdd}
                  className="flex-1 py-3.5 bg-[#0057FF] text-white font-extrabold text-xs rounded-2xl shadow-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" /> Add to Shopping Bag
                </button>

                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3.5 bg-emerald-500 text-white font-bold text-xs rounded-2xl hover:bg-emerald-600 transition-colors flex items-center gap-1.5 shadow-sm"
                  title="Inquire on WhatsApp"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-white" />
                  <span className="hidden sm:inline">WhatsApp Order</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
