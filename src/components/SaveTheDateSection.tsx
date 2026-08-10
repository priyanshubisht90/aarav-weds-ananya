import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { weddingData } from '../config/weddingData';
import { Calendar, MapPin, Clock, Heart, Download, ExternalLink, CheckCircle, Sparkles, Send } from 'lucide-react';
import { getGoogleCalendarUrl, getOutlookCalendarUrl, getYahooCalendarUrl, downloadIcsFile } from '../utils/calendar';
import confetti from 'canvas-confetti';
import { RSVPData } from '../types';

interface SaveTheDateSectionProps {
  onRsvpSuccess?: () => void;
}

export const SaveTheDateSection: React.FC<SaveTheDateSectionProps> = ({ onRsvpSuccess }) => {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  // Form State
  const [rsvpForm, setRsvpForm] = useState<RSVPData>({
    guestName: '',
    email: '',
    phone: '',
    attendance: 'attending',
    plusOnes: 1,
    dietary: '',
    songRequest: '',
    message: '',
  });

  // Countdown timer logic
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date(weddingData.weddingDateIso).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpForm.guestName || !rsvpForm.email) return;

    // Save to localStorage for persistence
    const savedRsvps = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
    savedRsvps.push({ ...rsvpForm, submittedAt: new Date().toISOString() });
    localStorage.setItem('wedding_rsvps', JSON.stringify(savedRsvps));

    setRsvpSubmitted(true);

    // Fire celebratory confetti!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#5C152B', '#E8A89A', '#C98A99', '#FAF6F0'],
    });

    if (onRsvpSuccess) onRsvpSuccess();
  };

  return (
    <section id="save-the-date" className="relative py-24 sm:py-32 w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Save The Date Highlight Card */}
        <div className="relative rounded-3xl bg-[#2d132c]/80 border border-white/10 p-8 sm:p-12 md:p-16 shadow-2xl overflow-hidden backdrop-blur-sm">
          
          {/* Subtle Corner Accents */}
          <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-[#e8b4b8]/40 rounded-tl-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-[#e8b4b8]/40 rounded-br-3xl pointer-events-none" />

          <div className="text-center max-w-3xl mx-auto relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-[#4a1010]/50 text-[#e8b4b8] text-xs font-sans-clean tracking-[0.3em] uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#e8b4b8]" />
              <span>MARK YOUR CALENDAR</span>
            </div>

            <h2 className="font-display-luxury text-4xl sm:text-6xl text-[#fdf6f0] tracking-wider mb-2 font-light">
              SAVE THE DATE
            </h2>

            <div className="font-serif-luxury italic text-2xl sm:text-3xl text-[#e8b4b8] mb-8 opacity-90">
              {weddingData.brideName} & {weddingData.groomName}
            </div>

            {/* Core Wedding Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-10 py-8 border-y border-white/10 text-center">
              {/* Date */}
              <div className="flex flex-col items-center">
                <Calendar className="w-6 h-6 text-[#e8b4b8] mb-2" />
                <span className="text-xs text-[#e8b4b8]/80 font-sans-clean tracking-widest uppercase">DATE</span>
                <span className="font-display-luxury text-2xl text-[#fdf6f0] mt-1">{weddingData.weddingDate}</span>
                <span className="text-xs text-[#e8b4b8] font-sans-clean mt-0.5">{weddingData.weddingDay}</span>
              </div>

              {/* Time */}
              <div className="flex flex-col items-center border-y sm:border-y-0 sm:border-x border-white/10 py-4 sm:py-0">
                <Clock className="w-6 h-6 text-[#e8b4b8] mb-2" />
                <span className="text-xs text-[#e8b4b8]/80 font-sans-clean tracking-widest uppercase">TIME</span>
                <span className="font-display-luxury text-2xl text-[#fdf6f0] mt-1">{weddingData.weddingTime}</span>
                <span className="text-xs text-[#e8b4b8] font-sans-clean mt-0.5">Evening Celebration</span>
              </div>

              {/* Venue */}
              <div id="venue" className="flex flex-col items-center">
                <MapPin className="w-6 h-6 text-[#e8b4b8] mb-2" />
                <span className="text-xs text-[#e8b4b8]/80 font-sans-clean tracking-widest uppercase">VENUE</span>
                <span className="font-display-luxury text-xl text-[#fdf6f0] mt-1 leading-tight">{weddingData.venue}</span>
                <span className="text-xs text-[#e8b4b8] font-sans-clean mt-0.5">New Delhi, India</span>
              </div>
            </div>

            {/* Live Countdown Timer */}
            <div className="my-10">
              <p className="text-xs text-[#e8b4b8]/80 font-sans-clean tracking-[0.2em] uppercase mb-4">
                COUNTDOWN TO THE CELEBRATION
              </p>
              <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-lg mx-auto">
                <div className="bg-[#150a0a]/80 border border-white/10 rounded-2xl p-3 sm:p-4 text-center">
                  <span className="font-display-luxury text-2xl sm:text-4xl text-[#fdf6f0] block">{timeLeft.days}</span>
                  <span className="text-[10px] sm:text-xs text-[#e8b4b8] font-sans-clean uppercase tracking-wider">Days</span>
                </div>
                <div className="bg-[#150a0a]/80 border border-white/10 rounded-2xl p-3 sm:p-4 text-center">
                  <span className="font-display-luxury text-2xl sm:text-4xl text-[#fdf6f0] block">{timeLeft.hours}</span>
                  <span className="text-[10px] sm:text-xs text-[#e8b4b8] font-sans-clean uppercase tracking-wider">Hours</span>
                </div>
                <div className="bg-[#150a0a]/80 border border-white/10 rounded-2xl p-3 sm:p-4 text-center">
                  <span className="font-display-luxury text-2xl sm:text-4xl text-[#fdf6f0] block">{timeLeft.minutes}</span>
                  <span className="text-[10px] sm:text-xs text-[#e8b4b8] font-sans-clean uppercase tracking-wider">Mins</span>
                </div>
                <div className="bg-[#150a0a]/80 border border-white/10 rounded-2xl p-3 sm:p-4 text-center">
                  <span className="font-display-luxury text-2xl sm:text-4xl text-[#fdf6f0] block">{timeLeft.seconds}</span>
                  <span className="text-[10px] sm:text-xs text-[#e8b4b8] font-sans-clean uppercase tracking-wider">Secs</span>
                </div>
              </div>
            </div>

            {/* Action Buttons: Add To Calendar & RSVP */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8 relative">
              
              {/* ADD TO CALENDAR Dropdown Toggle */}
              <div className="relative">
                <button
                  onClick={() => setCalendarOpen(!calendarOpen)}
                  id="add-to-calendar-btn"
                  className="px-6 py-3.5 rounded-full bg-[#4a1010] hover:bg-[#5e1a1a] text-[#fdf6f0] text-xs font-sans-clean tracking-[0.2em] uppercase font-semibold border border-[#e8b4b8]/30 transition-all duration-300 shadow-lg flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#e8b4b8]" />
                  <span>ADD TO CALENDAR</span>
                </button>

                {/* Calendar Options Dropdown */}
                {calendarOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 bg-[#150a0a] border border-white/15 rounded-2xl p-2 shadow-2xl z-50 flex flex-col gap-1 text-left">
                    <a
                      href={getGoogleCalendarUrl(weddingData)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl hover:bg-[#2d132c] text-xs font-sans-clean text-[#fdf6f0] flex items-center justify-between transition-colors"
                    >
                      <span>Google Calendar</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#e8b4b8]" />
                    </a>
                    <button
                      onClick={() => downloadIcsFile(weddingData)}
                      className="w-full px-4 py-2.5 rounded-xl hover:bg-[#2d132c] text-xs font-sans-clean text-[#fdf6f0] flex items-center justify-between text-left transition-colors"
                    >
                      <span>Apple iCal / Outlook (.ics)</span>
                      <Download className="w-3.5 h-3.5 text-[#e8b4b8]" />
                    </button>
                    <a
                      href={getOutlookCalendarUrl(weddingData)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl hover:bg-[#2d132c] text-xs font-sans-clean text-[#fdf6f0] flex items-center justify-between transition-colors"
                    >
                      <span>Outlook Web</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#e8b4b8]" />
                    </a>
                    <a
                      href={getYahooCalendarUrl(weddingData)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl hover:bg-[#2d132c] text-xs font-sans-clean text-[#fdf6f0] flex items-center justify-between transition-colors"
                    >
                      <span>Yahoo Calendar</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#e8b4b8]" />
                    </a>
                  </div>
                )}
              </div>

              {/* RSVP Button */}
              <button
                onClick={() => setRsvpOpen(true)}
                id="open-rsvp-modal-btn"
                className="px-6 py-3.5 rounded-full border border-white/20 bg-[#2d132c]/60 hover:bg-[#4a1010] text-[#fdf6f0] text-xs font-sans-clean tracking-[0.2em] uppercase font-semibold transition-all duration-300 flex items-center gap-2"
              >
                <Heart className="w-4 h-4 text-[#e8b4b8]" />
                <span>RSVP RESPOND</span>
              </button>

              {/* Get Directions Link */}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${weddingData.venue}, ${weddingData.venueAddress}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full border border-white/10 hover:border-white/30 text-[#e8b4b8] hover:text-[#fdf6f0] text-xs font-sans-clean tracking-[0.2em] uppercase font-medium transition-all duration-300 flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-[#e8b4b8]" />
                <span>MAP & DIRECTIONS</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* RSVP Modal */}
      {rsvpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="bg-[#150a0a] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl">
            <button
              onClick={() => setRsvpOpen(false)}
              className="absolute top-4 right-4 text-[#e8b4b8] hover:text-[#fdf6f0] text-xl font-bold p-2"
            >
              ✕
            </button>

            {!rsvpSubmitted ? (
              <>
                <div className="text-center mb-6">
                  <h3 className="font-display-luxury text-2xl text-[#fdf6f0]">RSVP FOR THE WEDDING</h3>
                  <p className="text-xs text-[#e8b4b8] font-sans-clean mt-1">
                    Kindly respond by 15 September 2026
                  </p>
                </div>

                <form onSubmit={handleRsvpSubmit} className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs font-sans-clean text-[#e8b4b8] mb-1">YOUR FULL NAME *</label>
                    <input
                      type="text"
                      required
                      value={rsvpForm.guestName}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, guestName: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#2d132c]/60 border border-white/10 text-[#fdf6f0] text-sm focus:outline-none focus:border-[#e8b4b8]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-sans-clean text-[#e8b4b8] mb-1">EMAIL ADDRESS *</label>
                      <input
                        type="email"
                        required
                        value={rsvpForm.email}
                        onChange={(e) => setRsvpForm({ ...rsvpForm, email: e.target.value })}
                        placeholder="you@domain.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#2d132c]/60 border border-white/10 text-[#fdf6f0] text-sm focus:outline-none focus:border-[#e8b4b8]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans-clean text-[#e8b4b8] mb-1">PHONE NUMBER</label>
                      <input
                        type="tel"
                        value={rsvpForm.phone}
                        onChange={(e) => setRsvpForm({ ...rsvpForm, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#2d132c]/60 border border-white/10 text-[#fdf6f0] text-sm focus:outline-none focus:border-[#e8b4b8]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-sans-clean text-[#e8b4b8] mb-1">ATTENDANCE STATUS</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setRsvpForm({ ...rsvpForm, attendance: 'attending' })}
                        className={`py-2.5 rounded-xl text-xs font-sans-clean font-medium border transition-all ${
                          rsvpForm.attendance === 'attending'
                            ? 'bg-[#4a1010] border-[#e8b4b8] text-[#fdf6f0]'
                            : 'bg-[#2d132c]/40 border-white/10 text-[#e8b4b8]'
                        }`}
                      >
                        Joyfully Accepts
                      </button>
                      <button
                        type="button"
                        onClick={() => setRsvpForm({ ...rsvpForm, attendance: 'declined' })}
                        className={`py-2.5 rounded-xl text-xs font-sans-clean font-medium border transition-all ${
                          rsvpForm.attendance === 'declined'
                            ? 'bg-[#4a1010] border-[#e8b4b8] text-[#fdf6f0]'
                            : 'bg-[#2d132c]/40 border-white/10 text-[#e8b4b8]'
                        }`}
                      >
                        Regretfully Declines
                      </button>
                    </div>
                  </div>

                  {rsvpForm.attendance === 'attending' && (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-sans-clean text-[#e8b4b8] mb-1">NUMBER OF GUESTS</label>
                        <select
                          value={rsvpForm.plusOnes}
                          onChange={(e) => setRsvpForm({ ...rsvpForm, plusOnes: parseInt(e.target.value) })}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#2d132c]/60 border border-white/10 text-[#fdf6f0] text-sm focus:outline-none focus:border-[#e8b4b8]"
                        >
                          <option value={1}>1 Person</option>
                          <option value={2}>2 Persons</option>
                          <option value={3}>3 Persons</option>
                          <option value={4}>4+ Family</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-sans-clean text-[#e8b4b8] mb-1">SONG REQUEST</label>
                        <input
                          type="text"
                          value={rsvpForm.songRequest}
                          onChange={(e) => setRsvpForm({ ...rsvpForm, songRequest: e.target.value })}
                          placeholder="Your favourite track"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#2d132c]/60 border border-white/10 text-[#fdf6f0] text-sm focus:outline-none focus:border-[#e8b4b8]"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-sans-clean text-[#e8b4b8] mb-1">BLESSINGS / MESSAGE FOR COUPLE</label>
                    <textarea
                      rows={2}
                      value={rsvpForm.message}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, message: e.target.value })}
                      placeholder="Write your wishes..."
                      className="w-full px-4 py-2.5 rounded-xl bg-[#2d132c]/60 border border-white/10 text-[#fdf6f0] text-sm focus:outline-none focus:border-[#e8b4b8]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#4a1010] hover:bg-[#5e1a1a] text-[#fdf6f0] font-sans-clean text-xs tracking-widest uppercase font-semibold border border-[#e8b4b8]/30 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-[#e8b4b8]" />
                    <span>CONFIRM RSVP RESPONSE</span>
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-[#e8b4b8] mx-auto mb-4 animate-bounce" />
                <h3 className="font-display-luxury text-2xl text-[#fdf6f0] mb-2">THANK YOU!</h3>
                <p className="text-sm font-sans-clean text-[#e8b4b8] mb-6">
                  Your RSVP response has been received. Ananya & Aarav look forward to celebrating with you!
                </p>
                <button
                  onClick={() => {
                    setRsvpSubmitted(false);
                    setRsvpOpen(false);
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#4a1010] text-[#fdf6f0] text-xs font-sans-clean tracking-wider uppercase border border-[#e8b4b8]/30"
                >
                  CLOSE
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
