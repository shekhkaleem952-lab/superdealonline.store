import React, { useState } from 'react';
import { X, CheckCircle, CreditCard, Truck, MapPin, Phone, ShieldCheck, Sparkles, DollarSign } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { CartItem } from '../types';
import { COMPANY_INFO } from '../data/storeData';
import { useStore } from '../context/StoreContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  discountPercent: number;
  onSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  discountPercent,
  onSuccess,
}) => {
  const { addOrder } = useStore();
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'pos' | 'applepay'>('cod');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Doha',
    zone: '',
    street: '',
    building: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const deliveryFee = subtotal >= COMPANY_INFO.freeDeliveryThreshold ? 0 : COMPANY_INFO.standardDeliveryFee;
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const createdOrder = await addOrder({
        customer: {
          fullName: formData.name,
          phone: formData.phone,
          email: formData.email,
          city: formData.city,
          zoneArea: formData.zone ? `Zone ${formData.zone}` : 'Doha',
          streetAddress: `Street ${formData.street || 'Main'}, Bldg ${formData.building || '1'}`,
          paymentMethod: paymentMethod === 'pos' ? 'card_pos' : 'cod',
          notes: formData.notes,
        },
        items: cart.map((item) => ({
          productId: item.productId || item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        subtotal,
        deliveryFee,
        discount: discountAmount,
        total: grandTotal,
      });

      setOrderNumber(createdOrder.orderNumber);
      setOrderConfirmed(true);
      onSuccess();
    } catch (err) {
      console.error('Failed to submit order:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Pre-fill WhatsApp Confirmation Receipt
  const itemsText = cart
    .map((item) => `• ${item.name} (${item.selectedColor || 'Default'}) x${item.quantity}`)
    .join('%0A');

  const whatsappReceipt = `Hello Super Deal Online.Store! I placed order *#${orderNumber}*%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Address:* Zone ${formData.zone || '39'}, Street ${formData.street || 'Main'}, Building ${formData.building || '1'}, ${formData.city}, Qatar%0A%0A*Items:*%0A${itemsText}%0A%0A*Total Amount (Pay on Delivery):* ${grandTotal} QAR%0A%0APlease confirm my express delivery schedule. Thank you!`;

  const whatsappReceiptUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${whatsappReceipt}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn font-sans">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 flex flex-col">
        {/* Header */}
        <div className="bg-[#0057FF] text-white p-6 rounded-t-3xl flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-400 text-slate-900 rounded-xl font-bold shadow-sm">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-xl flex items-center gap-2">
                Fast Qatar Checkout
              </h3>
              <p className="text-xs text-blue-100">
                Super Deal Online.Store • Express Same-Day Delivery
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {orderConfirmed ? (
            <div className="text-center py-6 space-y-5 animate-fadeIn">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border-4 border-emerald-200 shadow-md">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <span className="text-xs uppercase font-extrabold tracking-wider text-[#0057FF] bg-blue-50 px-3 py-1 rounded-full">
                  Order Successfully Placed!
                </span>
                <h4 className="text-2xl font-black text-slate-900 pt-2">
                  Thank You, {formData.name || 'Valued Customer'}!
                </h4>
                <p className="text-xs text-gray-500">
                  Order Reference ID:{' '}
                  <strong className="text-[#0057FF] font-mono text-sm">
                    #{orderNumber}
                  </strong>
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-gray-200 text-left text-xs space-y-2.5 max-w-md mx-auto">
                <div className="flex justify-between border-b border-gray-200/80 pb-2">
                  <span className="text-gray-500">Delivery Address:</span>
                  <span className="font-bold text-slate-800 text-right">
                    Zone {formData.zone || '39'}, Street {formData.street || 'Main'}, {formData.city}, Qatar
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-200/80 pb-2">
                  <span className="text-gray-500">Estimated Delivery:</span>
                  <span className="font-bold text-emerald-700">
                    Express Same-Day (Within 3-6 Hours)
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-200/80 pb-2">
                  <span className="text-gray-500">Payment Option:</span>
                  <span className="font-bold text-slate-800 uppercase">
                    Cash on Delivery
                  </span>
                </div>
                <div className="flex justify-between font-extrabold text-sm pt-1 text-slate-900">
                  <span>Total Due on Arrival:</span>
                  <span className="text-[#0057FF]">{grandTotal} QAR</span>
                </div>
              </div>

              <div className="space-y-2 max-w-md mx-auto pt-2">
                <a
                  href={whatsappReceiptUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-emerald-500 text-white font-bold text-xs rounded-2xl hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  <WhatsAppIcon className="w-5 h-5 fill-white" />
                  Send Confirmation to WhatsApp
                </a>

                <button
                  onClick={onClose}
                  className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-2xl transition-colors cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              {/* Delivery Notice */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50/50 p-4 rounded-2xl border border-blue-100 flex items-start gap-3">
                <Truck className="w-5 h-5 text-[#0057FF] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Express Qatar Doorstep Delivery
                  </h4>
                  <p className="text-[11px] text-gray-600">
                    We deliver across all Qatar municipalities including Doha, Lusail, The Pearl, Al Rayyan, and Al Wakrah.
                  </p>
                </div>
              </div>

              {/* Customer Contact Details */}
              <div className="space-y-3 bg-slate-50 p-4.5 rounded-2xl border border-gray-200/80">
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                  1. Contact Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Abdullah Al-Kuwari"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 focus:outline-none focus:border-[#0057FF] bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Qatar Mobile / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+974 5511 2233"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 focus:outline-none focus:border-[#0057FF] bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="abdullah@example.qa"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 focus:outline-none focus:border-[#0057FF] bg-white"
                  />
                </div>
              </div>

              {/* Qatar Address Details */}
              <div className="space-y-3 bg-slate-50 p-4.5 rounded-2xl border border-gray-200/80">
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                  2. Qatar Shipping Address
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      City / Area *
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 focus:outline-none focus:border-[#0057FF] bg-white font-medium"
                    >
                      <option value="Doha">Doha (الدوحة)</option>
                      <option value="Lusail">Lusail City (لوسيل)</option>
                      <option value="The Pearl">The Pearl Qatar (اللؤلؤة)</option>
                      <option value="West Bay">West Bay / Diplomatic Area</option>
                      <option value="Al Rayyan">Al Rayyan (الريان)</option>
                      <option value="Al Wakrah">Al Wakrah (الوكرة)</option>
                      <option value="Umm Salal">Umm Salal (أم صلال)</option>
                      <option value="Al Khor">Al Khor (الخور)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Zone Number (رقم المنطقة) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Zone 61 or West Bay"
                      value={formData.zone}
                      onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 focus:outline-none focus:border-[#0057FF] bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Street Name / Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Al Corniche St"
                      value={formData.street}
                      onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 focus:outline-none focus:border-[#0057FF] bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Building / Villa Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Building 14, Apt 502"
                      value={formData.building}
                      onChange={(e) => setFormData({ ...formData, building: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 focus:outline-none focus:border-[#0057FF] bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-2">
                <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                  3. Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'border-[#0057FF] bg-blue-50/80 ring-2 ring-[#0057FF]/20 shadow-xs'
                        : 'border-gray-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <DollarSign className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
                    <span className="text-[11px] font-bold block text-slate-900">
                      Cash on Delivery
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pos')}
                    className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'pos'
                        ? 'border-[#0057FF] bg-blue-50/80 ring-2 ring-[#0057FF]/20 shadow-xs'
                        : 'border-gray-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mx-auto mb-1 text-[#0057FF]" />
                    <span className="text-[11px] font-bold block text-slate-900">
                      Card on Delivery (POS)
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('applepay')}
                    className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'applepay'
                        ? 'border-[#0057FF] bg-blue-50/80 ring-2 ring-[#0057FF]/20 shadow-xs'
                        : 'border-gray-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-sm font-extrabold block text-slate-900 mt-1">
                       Apple Pay
                    </span>
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="p-4 bg-slate-100 rounded-2xl border border-gray-200 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({cart.length} items):</span>
                  <span className="font-bold text-slate-900">{subtotal} QAR</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount:</span>
                    <span>-{discountAmount} QAR</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee:</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <strong className="text-emerald-600">FREE Delivery</strong>
                    ) : (
                      `${deliveryFee} QAR`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-gray-300">
                  <span>Grand Total:</span>
                  <span className="text-[#0057FF]">{grandTotal} QAR</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#0057FF] text-white font-extrabold text-sm rounded-2xl shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Processing Your Qatar Order...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5 text-amber-300" /> Confirm Order ({grandTotal} QAR)
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
