import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Store,
  Truck,
  CreditCard,
  Save,
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  Bell
} from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { companyInfo, updateCompanyInfo, resetToDefaults } = useStore();

  const [formData, setFormData] = useState({ ...companyInfo });
  const [savedNotice, setSavedNotice] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompanyInfo(formData);
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
    }, 2000);
  };

  const handleResetConfirm = () => {
    resetToDefaults();
    setShowResetDialog(false);
    window.location.reload();
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-[#0057FF]">System Preferences</span>
          <h1 className="text-2xl font-extrabold text-slate-900 font-playfair">
            Store & Commerce Settings
          </h1>
          <p className="text-xs text-slate-500">
            Configure contact details, delivery fee rules, payment options, and store data
          </p>
        </div>
      </div>

      {savedNotice && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold p-4 rounded-2xl flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          <span>Store settings updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Store Profile */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-black uppercase text-[#0057FF] flex items-center gap-2">
            <Store className="w-4 h-4" /> 1. Store Identity & Contact Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700">Store Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 mt-1"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700">Store Slogan / Tagline</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 mt-1"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700">WhatsApp Order Number</label>
              <input
                type="text"
                value={formData.whatsappDisplay}
                onChange={(e) => setFormData({ ...formData, whatsappDisplay: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 mt-1"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700">Support Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 mt-1"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700">Physical Address / Building</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 mt-1"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700">City & Country</label>
              <input
                type="text"
                value={`${formData.city}, ${formData.country}`}
                onChange={(e) => setFormData({ ...formData, city: e.target.value.split(',')[0] || 'Doha' })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 mt-1"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Delivery & Shipping Rules */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-black uppercase text-[#0057FF] flex items-center gap-2">
            <Truck className="w-4 h-4" /> 2. Delivery & Fulfillment Rules (Qatar)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700">Free Delivery Minimum Order (QAR)</label>
              <input
                type="number"
                value={formData.freeDeliveryThreshold}
                onChange={(e) => setFormData({ ...formData, freeDeliveryThreshold: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 mt-1"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Orders equal or above this QAR threshold receive free express shipping.
              </p>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700">Standard Delivery Fee (QAR)</label>
              <input
                type="number"
                value={formData.standardDeliveryFee}
                onChange={(e) => setFormData({ ...formData, standardDeliveryFee: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 mt-1"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Flat shipping fee for orders below free delivery threshold.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Save Button */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => setShowResetDialog(true)}
            className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs rounded-2xl flex items-center gap-2 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Demo Store Data</span>
          </button>

          <button
            type="submit"
            className="px-6 py-3 bg-[#0057FF] hover:bg-blue-600 text-white font-bold text-xs rounded-2xl shadow-md flex items-center gap-2 cursor-pointer transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Store Preferences</span>
          </button>
        </div>
      </form>

      {/* Reset Confirmation Modal */}
      {showResetDialog && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center font-bold mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-bold text-base text-slate-900">Reset Demo Data?</h3>
              <p className="text-xs text-slate-500">
                This will restore initial sample products, categories, and settings.
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowResetDialog(false)}
                className="flex-1 py-2.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleResetConfirm}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
