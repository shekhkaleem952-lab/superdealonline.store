import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle, ShieldCheck, HelpCircle, Sparkles, ChevronDown } from 'lucide-react';
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon';
import { COMPANY_INFO } from '../data/storeData';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Order Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const faqs = [
    {
      q: 'How fast is delivery across Qatar?',
      a: 'We offer express same-day delivery in Doha, Lusail, and The Pearl for orders placed before 3:00 PM. Delivery to other areas (Al Rayyan, Al Wakrah, Al Khor) takes 24 hours.',
    },
    {
      q: 'Do you offer Cash on Delivery (COD)?',
      a: 'Yes! We support Cash on Delivery and Card on Delivery (POS) across all Qatar municipalities.',
    },
    {
      q: 'How do I get Free Delivery?',
      a: 'All orders over 150 QAR qualify for 100% FREE delivery anywhere in Qatar. Orders under 150 QAR carry a small flat fee of 15 QAR.',
    },
    {
      q: 'What is your return & warranty policy?',
      a: 'All products come with a 7-day hassle-free replacement guarantee and 1-year Qatar official warranty against manufacturing defects.',
    },
  ];

  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(
    'Hello Super Deal Online.Store! I need assistance with an order in Qatar.'
  )}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0057FF] to-blue-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-2xl">
          <span className="text-xs font-black uppercase tracking-widest text-slate-900 bg-amber-400 px-3 py-1 rounded-full inline-block">
            24/7 Qatar Support
          </span>
          <h1 className="font-playfair text-3xl sm:text-5xl font-black">
            Get In Touch With Us
          </h1>
          <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
            Have a question about a product, order tracking, or bulk corporate purchase in Qatar? Our team is available on WhatsApp and phone.
          </p>
        </div>
      </div>

      {/* Grid Contact Info & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-white rounded-3xl border border-gray-200/80 shadow-xs space-y-4">
            <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#0057FF]" /> Store Details
            </h3>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl border border-gray-100">
                <MapPin className="w-5 h-5 text-[#0057FF] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900">Address:</strong>
                  <span>{COMPANY_INFO.address}, West Bay, Doha, Qatar</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-gray-100">
                <Phone className="w-5 h-5 text-[#0057FF] shrink-0" />
                <div>
                  <strong className="block text-slate-900">Phone Hotline:</strong>
                  <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-[#0057FF]">
                    {COMPANY_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-gray-100">
                <Mail className="w-5 h-5 text-[#0057FF] shrink-0" />
                <div>
                  <strong className="block text-slate-900">Email Address:</strong>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-[#0057FF]">
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-emerald-500 text-white font-bold text-xs rounded-2xl hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <WhatsAppIcon className="w-5 h-5 fill-white" />
                Direct WhatsApp Chat ({COMPANY_INFO.whatsappDisplay})
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-gray-200/80 shadow-xs">
          <h3 className="font-bold text-xl text-slate-900 mb-4">
            Send Us a Message
          </h3>

          {submitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3 animate-fadeIn">
              <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-base text-slate-900">Message Received!</h4>
              <p className="text-xs text-gray-600">
                Thank you for contacting Super Deal Online.Store. Our customer support agent will reply to your mobile/email within 1 hour.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2 bg-[#0057FF] text-white text-xs font-bold rounded-xl"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mohammed Al-Kuwari"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#0057FF]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Qatar Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+974 5511 2233"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#0057FF]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="mohammed@example.qa"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#0057FF]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Message / Inquiry *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can we assist you?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#0057FF]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#0057FF] text-white font-extrabold text-xs rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          )}
        </div>

      </div>

      {/* FAQ Accordion */}
      <div className="bg-slate-100 p-8 rounded-3xl border border-gray-200/80 space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-black uppercase tracking-widest text-[#0057FF]">
            Got Questions?
          </span>
          <h3 className="font-playfair text-2xl font-extrabold text-slate-900">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className="w-full p-4 text-left font-bold text-xs sm:text-sm text-slate-900 flex justify-between items-center cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    activeFaq === i ? 'rotate-180 text-[#0057FF]' : ''
                  }`}
                />
              </button>
              {activeFaq === i && (
                <div className="px-4 pb-4 text-xs text-gray-600 leading-relaxed border-t border-gray-100 pt-2 animate-fadeIn">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
