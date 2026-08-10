import React from 'react';
import { motion } from 'motion/react';
import { weddingData } from '../config/weddingData';
import { Heart, Sparkles, Send, ArrowUp } from 'lucide-react';
import confetti from 'canvas-confetti';

export const FinalScreen: React.FC = () => {
  const handleContactClick = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.7 },
      colors: ['#5C152B', '#E8A89A', '#C98A99', '#FAF6F0'],
    });

    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-24 sm:py-32 w-full text-center border-t border-[#C98A99]/20 overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-radial from-[#3D0F21]/40 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {/* Subtle Icon Badge */}
          <div className="w-12 h-12 rounded-full border border-[#C98A99]/40 bg-[#2A0B16]/60 mx-auto flex items-center justify-center mb-8 shadow-inner">
            <Heart className="w-5 h-5 text-[#E8A89A] fill-[#E8A89A]/30 animate-pulse" />
          </div>

          {/* Core Final Typography */}
          <h2 className="font-display-luxury text-3xl sm:text-5xl md:text-6xl text-[#FAF6F0] tracking-[0.15em] leading-tight mb-8">
            <span className="block mb-2">YOUR STORY.</span>
            <span className="block mb-2 text-[#E8A89A]">YOUR MOMENTS.</span>
            <span className="block text-[#FAF6F0]">YOUR SAVE THE DATE.</span>
          </h2>

          <div className="my-10">
            <p className="text-xs text-[#C98A99] font-sans-clean tracking-[0.3em] uppercase mb-4">
              LET’S CREATE YOURS
            </p>

            {/* Premium Animated CTA Button: CONTACT US */}
            <motion.button
              onClick={handleContactClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              id="final-contact-us-btn"
              className="relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-[#5C152B] via-[#7A1D3A] to-[#3D0A1B] text-[#FAF6F0] text-sm font-sans-clean tracking-[0.25em] uppercase font-bold border-2 border-[#E8A89A] shadow-[0_0_40px_rgba(232,168,154,0.3)] hover:shadow-[0_0_60px_rgba(232,168,154,0.5)] transition-all duration-300 group cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#E8A89A] group-hover:rotate-180 transition-transform duration-500" />
              <span>CONTACT US</span>
              <Send className="w-4 h-4 text-[#E8A89A] group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>

          {/* Footer Metadata */}
          <div className="mt-20 pt-8 border-t border-[#C98A99]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans-clean text-[#C98A99]/80">
            <div>
              <span>© 2026 {weddingData.brideName.split(' ')[0]} & {weddingData.groomName.split(' ')[0]} Wedding • {weddingData.studioName}</span>
            </div>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-[#FAF6F0] transition-colors focus:outline-none"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
