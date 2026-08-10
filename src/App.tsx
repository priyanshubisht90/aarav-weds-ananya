/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AtmosphericBackground } from './components/AtmosphericBackground';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { Gallery360Section } from './components/Gallery360Section';
import { SaveTheDateSection } from './components/SaveTheDateSection';
import { ClientConversionSection } from './components/ClientConversionSection';
import { FinalScreen } from './components/FinalScreen';
import { PhotoModal } from './components/PhotoModal';
import { PhotoItem } from './types';

export default function App() {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  const handleOpenRsvpModal = () => {
    const rsvpBtn = document.getElementById('open-rsvp-modal-btn');
    if (rsvpBtn) {
      rsvpBtn.click();
    } else {
      const saveTheDateEl = document.getElementById('save-the-date');
      if (saveTheDateEl) {
        saveTheDateEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative min-h-screen text-[#FAF6F0] selection:bg-[#5C152B] selection:text-[#FAF6F0]">
      {/* Glass-like atmospheric background for the ENTIRE page (No glass cards on content!) */}
      <AtmosphericBackground />

      {/* Main Content Layout */}
      <div className="relative z-10">
        <Navbar onOpenRsvp={handleOpenRsvpModal} />

        <main>
          {/* Slide 1: Hero Experience with Cursor Photo Reveal & 3D Circular Orbit */}
          <HeroSection onPhotoClick={(photo) => setSelectedPhoto(photo)} />

          {/* Slide 2: 360° Couple Story Gallery */}
          <Gallery360Section onPhotoClick={(photo) => setSelectedPhoto(photo)} />

          {/* Slide 3: Save The Date Details, Countdown, Calendar & RSVP */}
          <SaveTheDateSection />

          {/* Slide 4: Client Conversion Section ("Loved What You See?") */}
          <ClientConversionSection />

          {/* Slide 5: Final Screen with YOUR STORY. YOUR MOMENTS. YOUR SAVE THE DATE */}
          <FinalScreen />
        </main>
      </div>

      {/* Lightbox Modal for Photo Inspection */}
      <PhotoModal
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </div>
  );
}
