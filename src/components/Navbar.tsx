import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Calendar, Sparkles } from 'lucide-react';
import { romanticAudio } from '../utils/audioSynthesizer';
import { weddingData } from '../config/weddingData';

interface NavbarProps {
  onOpenRsvp?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRsvp }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleMusic = () => {
    const state = romanticAudio.toggle();
    setIsPlayingMusic(state);
  };

  const navLinks = [
    { name: 'HOME', href: '#hero' },
    { name: 'SAVE THE DATE', href: '#save-the-date' },
    { name: '360° STORY', href: '#story-360' },
    { name: 'VENUE', href: '#venue' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#150a0a]/90 backdrop-blur-md border-b border-[#e8b4b8]/15 py-3 shadow-lg shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Monogram Logo */}
        <a
          href="#hero"
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-full border border-[#e8b4b8]/30 flex items-center justify-center bg-[#2d132c]/50 group-hover:border-[#e8b4b8] transition-colors duration-300">
            <span className="font-display-luxury text-[#fdf6f0] text-sm font-semibold tracking-wider">
              A&A
            </span>
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="font-display-luxury text-xs text-[#fdf6f0] tracking-[0.25em] font-medium">
              {weddingData.brideName.split(' ')[0]} & {weddingData.groomName.split(' ')[0]}
            </span>
            <span className="text-[10px] text-[#e8b4b8] tracking-widest uppercase font-sans-clean">
              18 • 10 • 2026
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs tracking-[0.25em] font-sans-clean text-[#e8b4b8]/80 hover:text-[#fdf6f0] transition-colors duration-300 relative group py-1 uppercase"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#e8b4b8] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Actions: Audio Toggle & RSVP Button */}
        <div className="flex items-center gap-3">
          {/* Ambient Music Toggle Button */}
          <button
            onClick={handleToggleMusic}
            id="audio-music-toggle-btn"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#e8b4b8]/20 bg-[#2d132c]/40 hover:bg-[#4a1010]/60 text-[#fdf6f0] text-xs font-sans-clean transition-all duration-300 focus:outline-none"
            title={isPlayingMusic ? 'Mute Music' : 'Play Ambient Music'}
          >
            {isPlayingMusic ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#e8b4b8] animate-pulse" />
                <span className="hidden sm:inline text-[11px] text-[#e8b4b8] tracking-wider">
                  MUSIC ON
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#e8b4b8]/60" />
                <span className="hidden sm:inline text-[11px] text-[#e8b4b8]/70 tracking-wider">
                  MUSIC
                </span>
              </>
            )}
          </button>

          {/* Quick RSVP Action Button */}
          <button
            onClick={onOpenRsvp}
            id="nav-rsvp-quick-btn"
            className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#4a1010] hover:bg-[#5e1a1a] text-[#fdf6f0] text-xs font-sans-clean tracking-widest uppercase border border-[#e8b4b8]/30 transition-all duration-300 shadow-sm"
          >
            <Sparkles className="w-3 h-3 text-[#e8b4b8]" />
            <span>RSVP</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle-btn"
            className="md:hidden p-2 text-[#fdf6f0] hover:text-[#e8b4b8] focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#150a0a]/98 border-b border-[#e8b4b8]/20 px-6 py-6 transition-all duration-300">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-sans-clean tracking-[0.2em] text-[#fdf6f0]/90 hover:text-[#e8b4b8] py-2 border-b border-[#2d132c]/50"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenRsvp) onOpenRsvp();
              }}
              className="mt-2 w-full py-2.5 rounded-lg bg-[#4a1010] text-[#fdf6f0] text-xs font-sans-clean tracking-widest uppercase border border-[#e8b4b8]/30 flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#e8b4b8]" />
              <span>RSVP NOW</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
