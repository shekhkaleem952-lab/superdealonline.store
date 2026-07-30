import React from 'react';
import { Order } from '../types';
import { useStore } from '../context/StoreContext';
import { COMPANY_INFO } from '../data/storeData';
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon';
import {
  X,
  Printer,
  CheckCircle,
  Clock,
  TrendingUp,
  Truck,
  AlertCircle,
  MapPin,
  Phone,
  CreditCard,
  User,
  ShoppingBag
} from 'lucide-react';

interface AdminOrderDetailsModalProps {
  order: Order | null;
  onClose: () => void;
}

export const AdminOrderDetailsModal: React.FC<AdminOrderDetailsModalProps> = ({ order, onClose }) => {
  const { updateOrderStatus } = useStore();

  if (!order) return null;

  const handleStatusChange = (newStatus: Order['status']) => {
    if (newStatus === 'cancelled') {
      const reason = window.prompt('Please specify the reason for order cancellation:', 'Customer requested cancellation / Out of stock');
      if (reason !== null) {
        updateOrderStatus(order.id, newStatus, reason);
      }
    } else {
      updateOrderStatus(order.id, newStatus);
    }
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const whatsappText = encodeURIComponent(
    `Hello ${order.customer.fullName}! Your Super Deal Qatar Order #${order.orderNumber} status has been updated to: ${order.status.toUpperCase().replace(/_/g, ' ')}. Total Amount: ${order.total} QAR. Thank you for shopping with us!`
  );

  const whatsappUrl = `https://wa.me/${order.customer.phone.replace(/[^0-9]/g, '')}?text=${whatsappText}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex justify-center items-center p-3 sm:p-6 font-sans">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-fade-in print:shadow-none print:border-none print:max-h-none">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0057FF]/20 text-[#0057FF] border border-[#0057FF]/40 flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg">Order Details #{order.orderNumber}</h2>
              <p className="text-[11px] text-slate-400">Placed on {order.date}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Status Switcher Bar */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 print:hidden">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Current Status</span>
              <div className="text-xs font-bold text-slate-900 uppercase">{order.status.replace(/_/g, ' ')}</div>
              {order.cancellationReason && (
                <div className="text-[11px] text-red-600 font-semibold mt-0.5">
                  Reason: {order.cancellationReason}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-700">Update Status:</label>
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(e.target.value as Order['status'])}
                className="bg-white border border-slate-300 text-xs font-bold rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-[#0057FF]"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="out_for_delivery">Out for Delivery</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Customer & Address Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
              <h3 className="text-xs font-black uppercase text-[#0057FF] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" /> Customer Profile
              </h3>
              <div className="space-y-1 text-xs text-slate-800 font-medium">
                <div className="font-bold text-slate-900 text-sm">{order.customer.fullName}</div>
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{order.customer.phone}</span>
                </div>
                {order.customer.email && (
                  <div className="text-slate-500">{order.customer.email}</div>
                )}
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
              <h3 className="text-xs font-black uppercase text-[#0057FF] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> Qatar Delivery Address
              </h3>
              <div className="space-y-1 text-xs text-slate-800 font-medium">
                <div className="font-bold text-slate-900">{order.customer.city} - {order.customer.zoneArea}</div>
                <div>{order.customer.streetAddress}</div>
                {order.customer.buildingNum && <div>Building/Villa: {order.customer.buildingNum}</div>}
              </div>
            </div>
          </div>

          {/* Payment Method & Notes */}
          <div className="bg-blue-50/60 border border-blue-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 font-bold text-slate-800">
              <CreditCard className="w-4 h-4 text-[#0057FF]" />
              <span>Payment Method:</span>
              <span className="uppercase text-[#0057FF] bg-white px-2.5 py-1 rounded-lg border border-blue-200">
                {order.customer.paymentMethod === 'cod'
                  ? 'Cash on Delivery (COD)'
                  : order.customer.paymentMethod === 'card_pos'
                  ? 'Card POS Terminal on Delivery'
                  : 'QMP Mobile Wallet'}
              </span>
            </div>

            {order.customer.notes && (
              <div className="text-slate-600 italic text-[11px]">
                Note: "{order.customer.notes}"
              </div>
            )}
          </div>

          {/* Ordered Items List Table */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase text-slate-900">Order Items</h3>
            <div className="border border-slate-200 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Item</th>
                    <th className="py-2.5 px-3 text-center">Qty</th>
                    <th className="py-2.5 px-3 text-right">Price</th>
                    <th className="py-2.5 px-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {order.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-3">
                          <img src={item.image} alt={item.name} className="w-10 h-10 rounded-xl object-cover border border-slate-200" />
                          <div>
                            <div className="font-bold text-slate-900 line-clamp-1">{item.name}</div>
                            {item.color && <div className="text-[11px] text-slate-400">Color: {item.color}</div>}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-center font-bold">{item.quantity}</td>
                      <td className="py-3 px-3 text-right">{item.price} QAR</td>
                      <td className="py-3 px-3 text-right font-black text-slate-900">
                        {item.price * item.quantity} QAR
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals Summary */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 text-xs font-medium">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>{order.subtotal} QAR</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Delivery Fee (Qatar)</span>
              <span>{order.deliveryFee === 0 ? 'FREE' : `${order.deliveryFee} QAR`}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Discount</span>
                <span>-{order.discount} QAR</span>
              </div>
            )}
            <div className="border-t border-slate-200 pt-2 flex justify-between font-black text-base text-slate-900">
              <span>Total Payable</span>
              <span className="text-[#0057FF]">{order.total} QAR</span>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer transition-colors shadow-xs"
          >
            <WhatsAppIcon className="w-4 h-4 fill-current" />
            <span>Notify Customer on WhatsApp</span>
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintReceipt}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Invoice</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
