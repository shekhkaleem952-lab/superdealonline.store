import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useStore } from '../context/StoreContext';
import { useLanguage } from '../context/LanguageContext';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onOpenQuickView: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  onOpenQuickView,
}) => {
  const { wishlistIds, toggleWishlist, clearWishlist } = useWishlist();
  const { products } = useStore();
  const { t, isArabic } = useLanguage();

  if (!isOpen) return null;

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className={`fixed inset-y-0 ${isArabic ? 'left-0' : 'right-0'} max-w-full flex pl-10`}>
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-slate-200">
          
          {/* Header */}
          <div className="p-5 bg-slate-900 text-white flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30">
                <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
              </div>
              <div>
                <h3 className="font-playfair text-lg font-bold">
                  {isArabic ? 'قائمة المفضلة' : 'My Saved Wishlist'}
                </h3>
                <p className="text-[11px] text-gray-400">
                  {wishlistProducts.length} {isArabic ? 'منتجات محفوطة' : 'items saved for later'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-16">
                <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-500 flex items-center justify-center border border-rose-100">
                  <Heart className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-slate-800 text-base">
                  {isArabic ? 'قائمة المفضلة فارغة' : 'Your wishlist is empty'}
                </h4>
                <p className="text-xs text-gray-500 max-w-xs">
                  {isArabic
                    ? 'انقر على أيقونة القلب على أي منتج لحفظه وإيجاده بسهولة لاحقاً.'
                    : 'Click the heart icon on any product to save it here for quick access later.'}
                </p>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex gap-3 items-center group hover:border-[#0057FF] transition-all"
                >
                  <div
                    onClick={() => {
                      onOpenQuickView(product);
                      onClose();
                    }}
                    className="w-16 h-16 rounded-xl overflow-hidden bg-white shrink-0 cursor-pointer border border-slate-200"
                  >
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <h4
                      onClick={() => {
                        onOpenQuickView(product);
                        onClose();
                      }}
                      className="font-bold text-xs text-slate-900 truncate hover:text-[#0057FF] cursor-pointer"
                    >
                      {product.name}
                    </h4>
                    <div className="text-xs font-black text-[#0057FF]">
                      {product.price} QAR
                      {product.originalPrice > product.price && (
                        <span className="text-[10px] text-gray-400 line-through ml-2 font-normal">
                          {product.originalPrice} QAR
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => onAddToCart(product)}
                      className="p-2 bg-[#0057FF] hover:bg-blue-700 text-white rounded-xl shadow-xs transition-colors cursor-pointer"
                      title={isArabic ? 'أضف إلى السلة' : 'Add to Cart'}
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="p-2 bg-slate-200 hover:bg-rose-100 hover:text-rose-600 text-slate-600 rounded-xl transition-colors cursor-pointer"
                      title={isArabic ? 'إزالة' : 'Remove'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlistProducts.length > 0 && (
            <div className="p-5 bg-slate-50 border-t border-slate-200 space-y-3">
              <button
                onClick={clearWishlist}
                className="w-full py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl transition-colors cursor-pointer text-center"
              >
                {isArabic ? 'مسح كافة المفضلة' : 'Clear Wishlist'}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
