import React, { useState } from 'react';
import { X, User, Package, Shield, Key, CheckCircle, LogOut, Phone, Mail, MapPin, Clock, ArrowRight, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

interface UserAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAdmin?: () => void;
}

export const UserAccountModal: React.FC<UserAccountModalProps> = ({ isOpen, onClose, onOpenAdmin }) => {
  const { orders } = useStore();
  const { isArabic } = useLanguage();
  const { userProfile, signIn, signUp, signOut, resetPassword } = useAuth();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'admin'>('profile');
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'forgot'>('signin');

  // Auth form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Expanded order timeline state
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);
    setIsSubmitting(true);
    try {
      const { error } = await signIn(email, password);
      if (error) {
        setAuthError(error.message || 'Failed to sign in.');
      } else {
        setAuthSuccess('Successfully signed in!');
      }
    } catch (err: any) {
      setAuthError('An error occurred during sign in.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);
    setIsSubmitting(true);
    try {
      const { error } = await signUp(email, password, fullName, phone);
      if (error) {
        setAuthError(error.message || 'Failed to create account.');
      } else {
        setAuthSuccess('Account created successfully! You are now logged in.');
      }
    } catch (err: any) {
      setAuthError('An error occurred during account registration.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);
    setIsSubmitting(true);
    try {
      const { error } = await resetPassword(email);
      if (error) {
        setAuthError(error.message);
      } else {
        setAuthSuccess('Password reset link sent to your email address.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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
              {userProfile ? (
                /* Logged In View */
                <div className="space-y-4">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                        {isArabic ? 'مرحباً بك مجدداً!' : `Welcome Back, ${userProfile.full_name || 'Customer'}!`}
                      </h4>
                      <p className="text-[11px] text-slate-600">
                        {isArabic
                          ? 'أنت مسجل الدخول بحسابك وتستمتع بالتوصيل السريع والدعم الفوري.'
                          : 'You are signed in. Your orders and address info are synced.'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2 text-xs">
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <User className="w-4 h-4 text-[#0057FF]" />
                      <div>
                        <span className="text-[10px] text-gray-400 block">{isArabic ? 'الاسم' : 'Name'}</span>
                        <span className="font-bold text-slate-800">{userProfile.full_name || 'Customer in Qatar'}</span>
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
                      <Phone className="w-4 h-4 text-[#0057FF]" />
                      <div>
                        <span className="text-[10px] text-gray-400 block">{isArabic ? 'الهاتف' : 'Phone'}</span>
                        <span className="font-bold text-slate-800">{userProfile.phone || '+974 5512 3456'}</span>
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

                  <button
                    onClick={() => signOut()}
                    className="w-full py-3 bg-slate-100 hover:bg-red-50 text-red-600 font-bold rounded-2xl border border-slate-200 flex items-center justify-center gap-2 cursor-pointer transition-colors text-xs"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{isArabic ? 'تسجيل الخروج' : 'Sign Out'}</span>
                  </button>
                </div>
              ) : (
                /* Auth Form View (Sign In / Sign Up) */
                <div className="space-y-4">
                  {authError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-semibold rounded-xl flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{authError}</span>
                    </div>
                  )}

                  {authSuccess && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-xl flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 shrink-0" />
                      <span>{authSuccess}</span>
                    </div>
                  )}

                  {authMode === 'signin' && (
                    <form onSubmit={handleSignIn} className="space-y-3">
                      <h4 className="font-bold text-sm text-slate-900">
                        {isArabic ? 'تسجيل الدخول' : 'Sign In to Your Account'}
                      </h4>

                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="customer@example.com"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#0057FF]"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">Password</label>
                        <input
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#0057FF]"
                        />
                      </div>

                      <div className="flex justify-between items-center text-xs pt-1">
                        <button
                          type="button"
                          onClick={() => setAuthMode('forgot')}
                          className="text-[#0057FF] hover:underline"
                        >
                          Forgot Password?
                        </button>
                        <button
                          type="button"
                          onClick={() => setAuthMode('signup')}
                          className="text-[#0057FF] font-bold hover:underline"
                        >
                          Create New Account
                        </button>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-[#0057FF] hover:bg-blue-600 text-white font-bold rounded-2xl shadow-md text-xs cursor-pointer transition-all disabled:opacity-50 mt-2"
                      >
                        {isSubmitting ? 'Signing In...' : 'Sign In'}
                      </button>
                    </form>
                  )}

                  {authMode === 'signup' && (
                    <form onSubmit={handleSignUp} className="space-y-3">
                      <h4 className="font-bold text-sm text-slate-900">
                        {isArabic ? 'إنشاء حساب جديد' : 'Create Customer Account'}
                      </h4>

                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">Full Name</label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Jassim Al-Thani"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#0057FF]"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">Phone Number (Qatar)</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+974 5512 3456"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#0057FF]"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="customer@example.com"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#0057FF]"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">Password</label>
                        <input
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#0057FF]"
                        />
                      </div>

                      <div className="text-xs pt-1">
                        <button
                          type="button"
                          onClick={() => setAuthMode('signin')}
                          className="text-[#0057FF] font-bold hover:underline"
                        >
                          Already have an account? Sign In
                        </button>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-[#0057FF] hover:bg-blue-600 text-white font-bold rounded-2xl shadow-md text-xs cursor-pointer transition-all disabled:opacity-50 mt-2"
                      >
                        {isSubmitting ? 'Creating Account...' : 'Register Account'}
                      </button>
                    </form>
                  )}

                  {authMode === 'forgot' && (
                    <form onSubmit={handleResetPassword} className="space-y-3">
                      <h4 className="font-bold text-sm text-slate-900">Reset Password</h4>
                      <p className="text-xs text-slate-600">
                        Enter your email address and we will send you a password reset link.
                      </p>

                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="customer@example.com"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#0057FF]"
                        />
                      </div>

                      <div className="text-xs pt-1">
                        <button
                          type="button"
                          onClick={() => setAuthMode('signin')}
                          className="text-[#0057FF] font-bold hover:underline"
                        >
                          Back to Sign In
                        </button>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-[#0057FF] hover:bg-blue-600 text-white font-bold rounded-2xl shadow-md text-xs cursor-pointer transition-all disabled:opacity-50 mt-2"
                      >
                        {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-3">
              {orders.length === 0 ? (
                <p className="text-xs text-gray-500 text-center py-8">
                  {isArabic ? 'لا توجد طلبات سابقة بعد.' : 'No recent orders placed yet.'}
                </p>
              ) : (
                orders.map((ord) => {
                  const isExpanded = expandedOrderId === ord.id;
                  return (
                    <div
                      key={ord.id}
                      className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 text-xs"
                    >
                      <div className="flex items-center justify-between font-bold border-b border-slate-200 pb-2">
                        <div>
                          <span className="text-[#0057FF]">Order #{ord.orderNumber}</span>
                          <span className="text-[10px] text-slate-500 block font-normal">{ord.date}</span>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                          ord.status === 'delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : ord.status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
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
                        <p>
                          <strong>{isArabic ? 'طريقة الدفع:' : 'Payment:'}</strong> Cash on Delivery (COD)
                        </p>
                      </div>

                      {/* Items summary */}
                      <div className="bg-white p-2.5 rounded-xl border border-slate-200 space-y-1.5">
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Ordered Items</span>
                        {ord.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between items-center text-[11px]">
                            <span className="truncate max-w-[240px] font-medium text-slate-800">• {it.name} x{it.quantity}</span>
                            <span className="font-bold text-slate-900">{it.price * it.quantity} QAR</span>
                          </div>
                        ))}
                      </div>

                      {/* Timeline Collapsible Expander */}
                      <div className="border-t border-slate-200 pt-2">
                        <button
                          onClick={() => setExpandedOrderId(isExpanded ? null : ord.id)}
                          className="flex items-center justify-between w-full text-[11px] font-bold text-[#0057FF] hover:underline cursor-pointer"
                        >
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-amber-500" />
                            <span>{isExpanded ? 'Hide Delivery Timeline' : 'View Order Tracking Timeline'}</span>
                          </span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>

                        {isExpanded && (
                          <div className="mt-3 bg-white p-3.5 rounded-xl border border-slate-200 space-y-3">
                            <h5 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                              <CheckCircle className="w-4 h-4 text-emerald-500" />
                              <span>Live Status History</span>
                            </h5>

                            <div className="relative pl-4 border-l-2 border-blue-500/30 space-y-3 text-xs">
                              {ord.statusHistory && ord.statusHistory.length > 0 ? (
                                ord.statusHistory.map((h, index) => (
                                  <div key={h.id || index} className="relative group">
                                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#0057FF] ring-4 ring-blue-100"></div>
                                    <div className="space-y-0.5">
                                      <div className="flex justify-between items-center">
                                        <span className="font-bold text-slate-900">{h.title}</span>
                                        <span className="text-[9px] text-slate-400">
                                          {h.createdAt ? new Date(h.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                        </span>
                                      </div>
                                      {h.description && (
                                        <p className="text-[11px] text-slate-600 leading-snug">{h.description}</p>
                                      )}
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="relative">
                                  <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#0057FF]"></div>
                                  <span className="font-bold text-slate-900">Order Placed</span>
                                  <p className="text-[11px] text-slate-600">Order received via COD.</p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between font-black text-slate-900 pt-2 border-t border-slate-200">
                        <span>{isArabic ? 'الإجمالي:' : 'Total Amount:'}</span>
                        <span className="text-[#0057FF]">{ord.total} QAR</span>
                      </div>
                    </div>
                  );
                })
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
