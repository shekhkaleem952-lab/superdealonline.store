import React, { useState } from 'react';
import { X, ShieldCheck, Truck, RotateCcw, FileText, HelpCircle, Phone, CheckCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/storeData';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

interface PolicyModalProps {
  isOpen: boolean;
  policyType: 'privacy' | 'refund' | 'terms' | 'faq' | 'delivery' | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ isOpen, policyType, onClose }) => {
  if (!isOpen || !policyType) return null;

  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const getPolicyContent = () => {
    switch (policyType) {
      case 'delivery':
        return {
          title: 'Delivery & Shipping Information (Qatar)',
          icon: <Truck className="w-6 h-6 text-[#0057FF]" />,
          content: (
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center gap-3">
                <Truck className="w-6 h-6 text-[#0057FF] shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900">Same Day Delivery Across Qatar</h4>
                  <p className="text-xs text-slate-600">Orders placed before 4:00 PM are delivered the same day in Doha, Lusail, Pearl Qatar, and surrounding municipalities.</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-sm text-slate-900">Delivery Rates & Speed</h4>
                <ul className="list-disc pl-5 space-y-1.5 text-xs">
                  <li><strong>Free Express Delivery:</strong> Available on all orders over 150 QAR.</li>
                  <li><strong>Standard Delivery Fee:</strong> 15 QAR for orders under 150 QAR.</li>
                  <li><strong>Doha, Pearl & Lusail:</strong> 2 to 6 hours same-day express delivery.</li>
                  <li><strong>Al Rayyan, Al Wakrah, Um Salal:</strong> 6 to 12 hours express delivery.</li>
                  <li><strong>Al Khor, Mesaieed & Dukhan:</strong> Within 24 hours guaranteed.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-sm text-slate-900">Payment Options On Delivery</h4>
                <p className="text-xs">You can pay conveniently when your parcel arrives at your doorstep using:</p>
                <div className="flex flex-wrap gap-2 text-xs font-bold pt-1">
                  <span className="bg-slate-100 text-slate-800 px-3 py-1.5 rounded-lg border border-slate-200">💵 Cash on Delivery (COD)</span>
                  <span className="bg-slate-100 text-slate-800 px-3 py-1.5 rounded-lg border border-slate-200">💳 Card Payment on Courier POS</span>
                  <span className="bg-slate-100 text-slate-800 px-3 py-1.5 rounded-lg border border-slate-200">📲 QMP / Instant Transfer</span>
                </div>
              </div>
            </div>
          ),
        };

      case 'refund':
        return {
          title: 'Refund & 7-Day Return Policy',
          icon: <RotateCcw className="w-6 h-6 text-[#0057FF]" />,
          content: (
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900">100% Satisfaction Guarantee</h4>
                  <p className="text-xs text-slate-600">We inspect all gadgets before dispatch. If you receive a defective or incorrect item, we offer hassle-free replacement within 7 days.</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-sm text-slate-900">Return Terms & Conditions</h4>
                <ul className="list-disc pl-5 space-y-1.5 text-xs">
                  <li>Items must be returned within <strong>7 days</strong> of delivery date.</li>
                  <li>Products must be unused, in original condition with intact packaging & accessories.</li>
                  <li>Manufacturer defects are covered by our Qatar replacement warranty.</li>
                  <li>Our courier driver will collect the returned item directly from your location in Qatar.</li>
                </ul>
              </div>

              <div className="p-4 bg-slate-100 rounded-2xl border border-slate-200 space-y-1.5">
                <h4 className="font-bold text-xs text-slate-900">How to initiate a return:</h4>
                <p className="text-xs text-slate-600">Simply message our 24/7 WhatsApp customer care with your order ID and product photo at <strong>+974 7177 3732</strong>.</p>
              </div>
            </div>
          ),
        };

      case 'privacy':
        return {
          title: 'Privacy Policy',
          icon: <ShieldCheck className="w-6 h-6 text-[#0057FF]" />,
          content: (
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>At <strong>Super Deal Online.Store Qatar</strong>, we respect your personal privacy. We collect only necessary details (name, delivery address in Qatar, phone number) to fulfill your orders safely.</p>
              
              <div className="space-y-2">
                <h4 className="font-bold text-sm text-slate-900">Data Protection Commitment</h4>
                <ul className="list-disc pl-5 space-y-1.5 text-xs">
                  <li>We <strong>never sell or share</strong> your contact details with third-party marketers.</li>
                  <li>Your delivery location and phone number are strictly shared with our trusted Qatar delivery team.</li>
                  <li>All payment processing options follow secure, encrypted protocols.</li>
                </ul>
              </div>

              <p className="text-xs text-slate-500">If you have any questions regarding your personal information, please email us at <strong>{COMPANY_INFO.email}</strong>.</p>
            </div>
          ),
        };

      case 'terms':
        return {
          title: 'Terms & Conditions',
          icon: <FileText className="w-6 h-6 text-[#0057FF]" />,
          content: (
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>By browsing and purchasing products from <strong>Super Deal Online.Store</strong> in Qatar, you agree to comply with our terms of service.</p>

              <div className="space-y-2">
                <h4 className="font-bold text-sm text-slate-900">Key Store Policies</h4>
                <ul className="list-disc pl-5 space-y-1.5 text-xs">
                  <li><strong>Pricing:</strong> All prices listed are in Qatari Riyals (QAR).</li>
                  <li><strong>Product Availability:</strong> Stock levels are updated in real-time. In rare cases of high demand, our support team will contact you promptly.</li>
                  <li><strong>Warranty:</strong> Electronic gadgets come with manufacturer and store replacement warranties against technical faults.</li>
                </ul>
              </div>
            </div>
          ),
        };

      case 'faq':
        return {
          title: 'Frequently Asked Questions (FAQ)',
          icon: <HelpCircle className="w-6 h-6 text-[#0057FF]" />,
          content: (
            <div className="space-y-3">
              {[
                {
                  q: 'How fast is delivery in Doha and Qatar?',
                  a: 'We offer same-day delivery in Doha, Lusail, Pearl Qatar, and Al Rayyan for orders placed before 4:00 PM. Orders outside central Doha are delivered within 12–24 hours.',
                },
                {
                  q: 'Can I pay cash on delivery?',
                  a: 'Yes! We support Cash on Delivery (COD) as well as credit/debit card on courier POS machines for all orders across Qatar.',
                },
                {
                  q: 'Are your products genuine and under warranty?',
                  a: '100% Yes! All products sold on Super Deal Online.Store are genuine, authentic items backed by our Qatar replacement warranty.',
                },
                {
                  q: 'Is there a free delivery threshold?',
                  a: 'Yes! Orders over 150 QAR enjoy 100% Free Express Delivery anywhere in Qatar. Orders below 150 QAR have a minimal 15 QAR delivery fee.',
                },
                {
                  q: 'How can I track or modify my order on WhatsApp?',
                  a: 'Simply click the WhatsApp button on our website or text +974 7177 3732. Our Qatar customer care team is online 24/7.',
                },
              ].map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 transition-all cursor-pointer"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                >
                  <div className="flex items-center justify-between font-bold text-xs sm:text-sm text-slate-900">
                    <span>{faq.q}</span>
                    <span className="text-base text-[#0057FF]">{activeFaq === idx ? '−' : '+'}</span>
                  </div>
                  {activeFaq === idx && (
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed border-t border-slate-200 pt-2">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ),
        };

      default:
        return { title: '', icon: null, content: null };
    }
  };

  const policy = getPolicyContent();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 to-[#0057FF] text-white flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              {policy.icon}
            </div>
            <div>
              <h3 className="font-playfair text-lg sm:text-xl font-bold">{policy.title}</h3>
              <p className="text-[10px] text-amber-300 font-bold tracking-wider uppercase">Super Deal Online.Store Qatar</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">{policy.content}</div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-slate-500 font-medium">Need immediate help in Qatar?</span>
          <a
            href="https://wa.me/97471773732"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all"
          >
            <WhatsAppIcon className="w-4 h-4 fill-white" /> 24/7 WhatsApp Support
          </a>
        </div>

      </div>
    </div>
  );
};
