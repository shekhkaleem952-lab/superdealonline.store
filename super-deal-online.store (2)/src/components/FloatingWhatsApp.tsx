import React from 'react';
import { Sparkles } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { COMPANY_INFO } from '../data/storeData';

export const FloatingWhatsApp: React.FC = () => {
  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(
    'Hello Super Deal Online.Store! I am contacting you from Qatar regarding your products.'
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 group">
      {/* Tooltip Popup */}
      <div className="hidden sm:flex items-center gap-2 bg-white text-[#0B192C] px-3.5 py-2 rounded-2xl shadow-xl border border-blue-100 text-xs font-bold transition-all group-hover:scale-105">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
        <div>
          <p className="text-[11px] text-gray-500 font-normal leading-tight">Fast Qatar Support</p>
          <p className="text-[#0057FF] font-extrabold flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" /> Order on WhatsApp
          </p>
        </div>
      </div>

      {/* Main Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-2xl hover:bg-emerald-600 hover:scale-110 active:scale-95 transition-all duration-300 ring-4 ring-emerald-400/30 cursor-pointer"
        aria-label="Order on WhatsApp"
      >
        <WhatsAppIcon className="w-7 h-7 sm:w-8 sm:h-8 fill-white" />
        <span className="absolute top-0 right-0 w-4 h-4 bg-amber-400 border-2 border-white rounded-full flex items-center justify-center shadow-sm" />
      </a>
    </div>
  );
};
