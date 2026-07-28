import React, { useState } from 'react';
import { X, User, Package, Shield, Key, CheckCircle, LogOut, Phone, Mail, MapPin } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useLanguage } from '../context/LanguageContext';

interface UserAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAdmin?: () => void;
}

export const UserAccountModal: React.FC<UserAccountModalProps> = ({ isOpen, onClose, onOpenAdmin }) => {
  const { orders } = useStore();
  const { isArabic } = useLanguage();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'admin'>('profile');

  // Simulated guest user state
  const [userProfile, setUserProfile] = useState({
    name: 'Customer in Qatar',
    phone: '+974 7177 3732',
    email: 'info@superdealonline.store',
    city: 'Doha',
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 to-[#0057FF] text-white flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <User className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-playfair text-lg font-bold">
                {isArabic ? 'حساب العميل' : 'Customer Account Center'}
              </h3>
              <p className="text-[11px] text-amber-300 font-bold uppercase tracking-wider">
                Super Deal Qatar
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

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 p-2 gap-1">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-white text-[#0057FF] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-4 h-4" />
            {isArabic ? 'الملف الشخصي' : 'Profile Info'}
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-white text-[#0057FF] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Package className="w-4 h-4" />
            {isArabic ? 'طلباتي' : 'Recent Orders'} ({orders.length})
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'admin'
                ? 'bg-white text-[#0057FF] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Shield className="w-4 h-4" />
            {isArabic ? 'بوابة الإدارة' : 'Admin Portal'}
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-[#0057FF] shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                    {isArabic ? 'أهلاً بك في متجر سوبر ديل قطر' : 'Welcome to Super Deal Qatar'}
                  </h4>
                  <p className="text-[11px] text-slate-600">
                    {isArabic
                      ? 'تمتع بتجربة تسوق سريعة مع خيار الدفع عند الاستلام والتوصيل في نفس اليوم.'
                      : 'Enjoy express delivery, local Qatar warranty, and cash on delivery.'}
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-2 text-xs">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <User className="w-4 h-4 text-[#0057FF]" />
                  <div>
                    <span className="text-[10px] text-gray-400 block">{isArabic ? 'الاسم' : 'Name'}</span>
                    <span className="font-bold text-slate-800">{userProfile.name}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <Phone className="w-4 h-4 text-[#0057FF]" />
                  <div>
                    <span className="text-[10px] text-gray-400 block">{isArabic ? 'الهاتف' : 'Phone'}</span>
                    <span className="font-bold text-slate-800">{userProfile.phone}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <Mail className="w-4 h-4 text-[#0057FF]" />
                  <div>
                    <span className="text-[10px] text-gray-400 block">{isArabic ? 'البريد الإلكتروني' : 'Email'}</span>
                    <span className="font-bold text-slate-800">{userProfile.email}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <MapPin className="w-4 h-4 text-[#0057FF]" />
                  <div>
                    <span className="text-[10px] text-gray-400 block">{isArabic ? 'المنطقة' : 'Location'}</span>
                    <span className="font-bold text-slate-800">Doha, West Bay, Qatar</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-3">
              {orders.length === 0 ? (
                <p className="text-xs text-gray-500 text-center py-8">
                  {isArabic ? 'لا توجد طلبات سابقة بعد.' : 'No recent orders placed yet.'}
                </p>
              ) : (
                orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between font-bold border-b border-slate-200 pb-2">
                      <span className="text-[#0057FF]">Order #{ord.orderNumber}</span>
                      <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full text-[10px] uppercase">
                        {ord.status.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="space-y-1 text-slate-700">
                      <p>
                        <strong>{isArabic ? 'المستلم:' : 'Customer:'}</strong> {ord.customer.fullName} ({ord.customer.phone})
                      </p>
                      <p>
                        <strong>{isArabic ? 'الموقع:' : 'Address:'}</strong> {ord.customer.zoneArea}, {ord.customer.city}
                      </p>
                    </div>

                    <div className="flex items-center justify-between font-black text-slate-900 pt-2 border-t border-slate-200">
                      <span>{isArabic ? 'الإجمالي:' : 'Total Amount:'}</span>
                      <span className="text-[#0057FF]">{ord.total} QAR</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'admin' && (
            <div className="p-5 bg-amber-50 border border-amber-200 rounded-2xl space-y-4 text-xs text-slate-800">
              <div className="flex items-center gap-2 font-black text-amber-900 text-sm">
                <Shield className="w-5 h-5 text-[#0057FF]" />
                <span>{isArabic ? 'بوابة إدارة المتجر' : 'Store Admin Control Panel'}</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                {isArabic
                  ? 'يمكن لمدير المتجر إضافة وتعديل المنتجات، متابعة الطلبات، وتعديل إعدادات التوصيل والأسعار.'
                  : 'Manage store products, update order fulfillment status, edit categories, and configure delivery fees.'}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    onClose();
                    if (onOpenAdmin) onOpenAdmin();
                  }}
                  className="w-full py-3 bg-[#0057FF] hover:bg-blue-600 text-white font-bold rounded-2xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Key className="w-4 h-4 text-amber-300" />
                  <span>{isArabic ? 'الدخول إلى لوحة التحكم' : 'Open Admin Panel Console'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
