import React, { useState } from 'react';
import { motion } from 'motion/react';
import { weddingData } from '../config/weddingData';
import { MessageSquare, Phone, Mail, Sparkles, ArrowRight, CheckCircle2, Send, Star } from 'lucide-react';
import { ContactFormState } from '../types';

export const ClientConversionSection: React.FC = () => {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [form, setForm] = useState<ContactFormState>({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    message: '',
  });

  const whatsappMessage = encodeURIComponent(
    `Hi ${weddingData.studioName}! I loved the Ananya & Aarav interactive Save the Date experience and would love to create a custom interactive invitation for my upcoming wedding!`
  );

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;

    setDemoSubmitted(true);
  };

  const features = [
    '3D Interactive Photo Experience',
    'Dynamic Cursor Photo Reveal Engine',
    '360° Story Gallery & Depth Effects',
    '1-Click Add To Calendar Integration',
    'Custom Music & Audio Synthesis',
    'Instant Digital RSVP Tracking System',
  ];

  return (
    <section id="contact" className="relative py-24 sm:py-32 w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main High-Impact Conversion Container */}
        <div className="relative rounded-3xl bg-[#2d132c]/80 border border-white/10 p-8 sm:p-12 md:p-16 text-center shadow-2xl overflow-hidden backdrop-blur-sm">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#4a1010]/40 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-[#4a1010]/50 text-[#e8b4b8] text-xs font-sans-clean tracking-[0.3em] uppercase mb-6 shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-[#e8b4b8]" />
              <span>CUSTOM INVITATION STUDIO</span>
            </div>

            {/* Headline */}
            <h2 className="font-display-luxury text-3xl sm:text-5xl md:text-6xl text-[#fdf6f0] tracking-wider mb-4 leading-tight font-light">
              LOVED WHAT YOU SEE?
            </h2>

            {/* Subtitles */}
            <p className="font-serif-luxury italic text-xl sm:text-3xl text-[#e8b4b8] mb-3 opacity-90">
              “Your wedding deserves an invitation as unforgettable as your story.”
            </p>

            <p className="text-sm sm:text-base font-sans-clean text-[#fdf6f0]/90 mb-10 tracking-wide font-light">
              Create your own interactive Save the Date with us.
            </p>

            {/* Features Checklist Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto mb-10 text-left">
              {features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#150a0a]/70 border border-white/10 text-xs text-[#fdf6f0] font-sans-clean">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#e8b4b8] shrink-0" />
                  <span className="truncate">{feat}</span>
                </div>
              ))}
            </div>

            {/* Functional Contact CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              {/* WhatsApp Button */}
              <a
                href={`https://wa.me/${weddingData.whatsapp.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                id="whatsapp-contact-btn"
                className="px-6 py-3.5 rounded-full bg-[#4a1010] hover:bg-[#5e1a1a] text-[#fdf6f0] text-xs font-sans-clean tracking-widest uppercase font-semibold border border-white/10 transition-all duration-300 shadow-lg flex items-center gap-2.5"
              >
                <MessageSquare className="w-4 h-4 text-[#e8b4b8]" />
                <span>+91 98765 43210</span>
              </a>

              {/* Call Button */}
              <a
                href={`tel:${weddingData.phone.replace(/[^0-9+]/g, '')}`}
                id="phone-call-btn"
                className="px-6 py-3.5 rounded-full bg-white/5 border border-white/20 hover:bg-white/10 text-[#fdf6f0] text-xs font-sans-clean tracking-widest uppercase font-semibold transition-all duration-300 shadow-lg flex items-center gap-2.5"
              >
                <Phone className="w-4 h-4 text-[#e8b4b8]" />
                <span>CALL STUDIO</span>
              </a>

              {/* Email Button */}
              <a
                href={`mailto:${weddingData.email}?subject=Save%20the%20Date%20Inquiry`}
                id="email-contact-btn"
                className="px-6 py-3.5 rounded-full border border-white/10 bg-[#2d132c]/60 hover:bg-[#4a1010] text-[#fdf6f0] text-xs font-sans-clean tracking-widest uppercase font-semibold transition-all duration-300 flex items-center gap-2.5"
              >
                <Mail className="w-4 h-4 text-[#e8b4b8]" />
                <span>EMAIL US</span>
              </a>
            </div>

            {/* Request Demo Trigger */}
            <button
              onClick={() => setDemoModalOpen(true)}
              id="request-custom-demo-btn"
              className="inline-flex items-center gap-2 text-xs text-[#e8b4b8] hover:text-[#fdf6f0] font-sans-clean tracking-widest uppercase border-b border-[#e8b4b8]/40 pb-1 hover:border-[#fdf6f0] transition-colors"
            >
              <span>REQUEST CUSTOM WEDDING DEMO</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Demo Request Modal */}
      {demoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="bg-[#150a0a] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl">
            <button
              onClick={() => setDemoModalOpen(false)}
              className="absolute top-4 right-4 text-[#e8b4b8] hover:text-[#fdf6f0] text-xl font-bold p-2"
            >
              ✕
            </button>

            {!demoSubmitted ? (
              <>
                <div className="text-center mb-6">
                  <span className="text-[10px] text-[#e8b4b8] font-sans-clean uppercase tracking-[0.2em] block mb-1">
                    {weddingData.studioName}
                  </span>
                  <h3 className="font-display-luxury text-2xl text-[#fdf6f0]">CREATE YOUR INTERACTIVE INVITE</h3>
                  <p className="text-xs text-[#e8b4b8] font-sans-clean mt-1">
                    Enter details below to receive a personalized sample demo & quote
                  </p>
                </div>

                <form onSubmit={handleDemoSubmit} className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs font-sans-clean text-[#e8b4b8] mb-1">COUPLE / CONTACT NAME *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Priya & Rohan"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#2d132c]/60 border border-white/10 text-[#fdf6f0] text-sm focus:outline-none focus:border-[#e8b4b8]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-sans-clean text-[#e8b4b8] mb-1">EMAIL ADDRESS *</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="name@domain.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#2d132c]/60 border border-white/10 text-[#fdf6f0] text-sm focus:outline-none focus:border-[#e8b4b8]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans-clean text-[#e8b4b8] mb-1">PHONE / WHATSAPP</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#2d132c]/60 border border-white/10 text-[#fdf6f0] text-sm focus:outline-none focus:border-[#e8b4b8]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-sans-clean text-[#e8b4b8] mb-1">TENTATIVE WEDDING DATE</label>
                    <input
                      type="date"
                      value={form.eventDate}
                      onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#2d132c]/60 border border-white/10 text-[#fdf6f0] text-sm focus:outline-none focus:border-[#e8b4b8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-sans-clean text-[#e8b4b8] mb-1">SPECIAL REQUIREMENTS</label>
                    <textarea
                      rows={2}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="e.g. 3D music effects, custom theme colors, venue map..."
                      className="w-full px-4 py-2.5 rounded-xl bg-[#2d132c]/60 border border-white/10 text-[#fdf6f0] text-sm focus:outline-none focus:border-[#e8b4b8]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#4a1010] hover:bg-[#5e1a1a] text-[#fdf6f0] font-sans-clean text-xs tracking-widest uppercase font-semibold border border-[#e8b4b8]/30 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-[#e8b4b8]" />
                    <span>SUBMIT DEMO REQUEST</span>
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <Star className="w-16 h-16 text-[#e8b4b8] mx-auto mb-4 animate-spin" />
                <h3 className="font-display-luxury text-2xl text-[#fdf6f0] mb-2">DEMO REQUEST RECEIVED</h3>
                <p className="text-sm font-sans-clean text-[#e8b4b8] mb-6">
                  Thank you! Our studio team will reach out via WhatsApp & Email within 2 hours with a custom interactive preview.
                </p>
                <button
                  onClick={() => {
                    setDemoSubmitted(false);
                    setDemoModalOpen(false);
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#4a1010] text-[#fdf6f0] text-xs font-sans-clean tracking-wider uppercase border border-[#e8b4b8]/30"
                >
                  DONE
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
