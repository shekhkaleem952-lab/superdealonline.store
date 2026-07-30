import React from 'react';
import { Sparkles, Award, Users, Heart, Globe, ShieldCheck, Truck, DollarSign } from 'lucide-react';
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon';
import { COMPANY_INFO } from '../data/storeData';

interface AboutPageProps {
  setCurrentPage: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ setCurrentPage }) => {
  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(
    'Hello Super Deal Online.Store! I would like to learn more about your store in Qatar.'
  )}`;

  return (
    <div className="space-y-16 pb-16 font-sans">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-[#0057FF] to-blue-900 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-900 text-xs font-black px-3 py-1 rounded-full shadow-xs">
            <Sparkles className="w-3.5 h-3.5" /> Founded in Qatar
          </span>
          <h1 className="font-playfair text-4xl sm:text-5xl font-black">
            About Super Deal Online.Store
          </h1>
          <p className="text-blue-100 text-xs sm:text-base leading-relaxed">
            Qatar’s premier online store for authentic smart wearables, mobile accessories, high-fidelity audio, beauty styling gear, and home essentials.
          </p>
        </div>
      </section>

      {/* Main Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-black uppercase tracking-widest text-[#0057FF] bg-blue-50 px-3 py-1 rounded-full">
              Our Vision
            </span>
            <h2 className="font-playfair text-3xl font-extrabold text-slate-900">
              Redefining Modern E-Commerce Shopping in Qatar
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              Super Deal Online.Store was launched to eliminate slow international shipping and hidden fees for tech and lifestyle enthusiasts across Qatar. We stock top-rated, genuine items in our Doha logistics hubs and deliver directly to your doorstep on the exact same day.
            </p>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              Whether you are looking for the latest AMOLED smart watch, active noise cancellation AirPods, high-speed power banks, or professional beauty styling tools, Super Deal ensures competitive wholesale pricing with total Cash on Delivery convenience.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0057FF] flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">10,000+ Customers</h4>
                  <p className="text-[11px] text-gray-500">Delivered in Qatar</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0057FF] flex items-center justify-center font-bold">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">Same-Day Express</h4>
                  <p className="text-[11px] text-gray-500">Doha, Lusail & All Qatar</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white font-bold text-xs rounded-2xl hover:bg-emerald-600 transition-colors shadow-md"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" /> Contact Us on WhatsApp
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&q=80&w=800"
                alt="Super Deal Online Store Tech Accessories"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <p className="text-xs font-extrabold text-amber-300 uppercase tracking-wider">
                  West Bay & Lusail Logistics
                </p>
                <p className="font-playfair text-xl font-extrabold">
                  Fast, Reliable & Always Authentic
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Core Values */}
      <section className="bg-white py-16 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#0057FF] bg-blue-50 px-3 py-1 rounded-full">
              Why Customers Trust Us
            </span>
            <h2 className="font-playfair text-3xl font-extrabold text-slate-900">
              Our Shopping Commitments
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="p-6 rounded-3xl bg-slate-50 border border-gray-200 space-y-3">
              <ShieldCheck className="w-8 h-8 text-[#0057FF]" />
              <h4 className="font-bold text-sm text-slate-900">100% Genuine Quality</h4>
              <p className="text-gray-600 leading-relaxed">
                All products undergo strict quality testing before dispatch. We back every order with a local Qatar warranty.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-gray-200 space-y-3">
              <DollarSign className="w-8 h-8 text-emerald-600" />
              <h4 className="font-bold text-sm text-slate-900">Cash on Delivery Convenience</h4>
              <p className="text-gray-600 leading-relaxed">
                Inspect your items upon arrival before handing cash to the driver. Zero risk, 100% security.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-gray-200 space-y-3">
              <Truck className="w-8 h-8 text-amber-500" />
              <h4 className="font-bold text-sm text-slate-900">Free Delivery Over 150 QAR</h4>
              <p className="text-gray-600 leading-relaxed">
                Enjoy zero delivery fees across all Qatar municipalities on qualifying orders over 150 QAR.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
