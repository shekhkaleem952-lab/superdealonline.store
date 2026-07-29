import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { CartItem } from '../types';
import { COMPANY_INFO } from '../data/storeData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  onProceedToCheckout: (appliedDiscount: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  updateQuantity,
  removeFromCart,
  clearCart,
  onProceedToCheckout,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const deliveryFee = subtotal >= COMPANY_INFO.freeDeliveryThreshold || subtotal === 0 ? 0 : COMPANY_INFO.standardDeliveryFee;
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    const code = promoCode.trim().toUpperCase();
    if (code === 'SUPERQATAR10' || code === 'SUPER10' || code === 'WELCOME10') {
      setDiscountPercent(10);
      setPromoSuccess('10% discount applied successfully!');
    } else if (code === 'QATAR15' || code === 'VIP15') {
      setDiscountPercent(15);
      setPromoSuccess('15% VIP discount applied successfully!');
    } else {
      setPromoError('Invalid promo code. Use "SUPERQATAR10" for 10% off.');
    }
  };

  // Generate WhatsApp Order Message
  const whatsappItemsList = cart
    .map((item, i) => `${i + 1}. ${item.name} (${item.selectedColor || 'Default'}) x${item.quantity} = ${item.price * item.quantity} QAR`)
    .join('%0A');

  const whatsappMessage = `Hello Super Deal Online.Store! I would like to order the following in Qatar:%0A%0A${whatsappItemsList}%0A%0A*Subtotal:* ${subtotal} QAR%0A*Delivery Fee:* ${
    deliveryFee === 0 ? 'FREE' : `${deliveryFee} QAR`
  }%0A*Total Amount:* ${grandTotal} QAR%0A%0APlease process my Cash on Delivery order.`;

  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${whatsappMessage}`;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn"
      />

      <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="pointer-events-auto w-screen max-w-md bg-slate-50 text-slate-800 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="bg-[#0057FF] text-white p-5 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-400 text-slate-900 rounded-2xl shadow-sm">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg flex items-center gap-1.5">
                  Your Shopping Bag
                </h3>
                <p className="text-xs text-blue-100">
                  {cart.length} product{cart.length !== 1 ? 's' : ''} added
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-20 h-20 bg-blue-50 text-[#0057FF] rounded-full flex items-center justify-center mx-auto border border-blue-100 shadow-inner">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h4 className="font-bold text-lg text-slate-900">Your bag is currently empty</h4>
                <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
                  Discover top-rated smart watches, AirPods, power banks, and home essentials with fast delivery across Qatar!
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#0057FF] text-white font-bold text-xs rounded-xl shadow-md hover:bg-blue-700 transition-colors"
                >
                  Start Shopping Now
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center text-xs text-gray-500 pb-2 border-b border-gray-200">
                  <span className="font-semibold text-slate-700">Selected Products</span>
                  <button
                    onClick={clearCart}
                    className="text-rose-600 hover:underline cursor-pointer font-bold"
                  >
                    Clear Bag
                  </button>
                </div>

                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 bg-white rounded-2xl border border-gray-200/80 shadow-2xs flex gap-3 items-center"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 border border-gray-100"
                      />

                      <div className="flex-1 min-w-0">
                        <h5 className="font-bold text-xs text-slate-900 truncate">
                          {item.name}
                        </h5>

                        {item.selectedColor && (
                          <p className="text-[11px] text-[#0057FF] font-semibold mt-0.5">
                            Color: {item.selectedColor}
                          </p>
                        )}

                        <p className="text-xs font-extrabold text-[#0057FF] mt-1">
                          {item.price * item.quantity} QAR
                        </p>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-rose-500 p-1 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1 border border-gray-200">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 hover:bg-white rounded text-slate-700 transition-colors cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 hover:bg-white rounded text-slate-700 transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code Form */}
                <div className="pt-3">
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Promo Code (e.g. SUPERQATAR10)"
                        className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#0057FF]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-[#0057FF] transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                  {promoSuccess && <p className="text-xs text-emerald-600 font-bold mt-1.5">{promoSuccess}</p>}
                  {promoError && <p className="text-xs text-rose-500 font-bold mt-1.5">{promoError}</p>}
                </div>
              </>
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 bg-white border-t border-gray-200 space-y-3.5 shadow-lg">
              {/* Delivery Progress Bar */}
              <div className="bg-blue-50/80 p-3 rounded-2xl border border-blue-100 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#0057FF]" />
                    Qatar Free Express Delivery
                  </span>
                  <span>
                    {subtotal >= COMPANY_INFO.freeDeliveryThreshold
                      ? 'FREE'
                      : `${subtotal} / ${COMPANY_INFO.freeDeliveryThreshold} QAR`}
                  </span>
                </div>

                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#0057FF] transition-all duration-500 rounded-full"
                    style={{
                      width: `${Math.min(
                        100,
                        (subtotal / COMPANY_INFO.freeDeliveryThreshold) * 100
                      )}%`,
                    }}
                  />
                </div>

                <p className="text-[11px] text-gray-600">
                  {subtotal >= COMPANY_INFO.freeDeliveryThreshold ? (
                    <span className="text-emerald-700 font-bold">
                      🎉 Congratulations! You unlocked FREE Delivery across Qatar.
                    </span>
                  ) : (
                    <span>
                      Add <strong>{(COMPANY_INFO.freeDeliveryThreshold - subtotal).toFixed(0)} QAR</strong> more to get FREE Delivery!
                    </span>
                  )}
                </p>
              </div>

              {/* Price Totals */}
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">{subtotal} QAR</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-{discountAmount} QAR</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Delivery Fee (All Qatar)</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <strong className="text-emerald-600">FREE</strong>
                    ) : (
                      `${deliveryFee} QAR`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-gray-100">
                  <span>Total (Pay on Delivery)</span>
                  <span className="text-[#0057FF]">{grandTotal} QAR</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={() => onProceedToCheckout(discountPercent)}
                  className="w-full py-3.5 bg-[#0057FF] text-white font-bold text-xs rounded-2xl shadow-md hover:bg-blue-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-500 text-white font-bold text-xs rounded-2xl hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-white" /> Quick Order via WhatsApp
                </a>
              </div>

              <p className="text-[10px] text-gray-400 text-center flex items-center justify-center gap-1 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Cash on Delivery • 100% Satisfaction Guaranteed
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
