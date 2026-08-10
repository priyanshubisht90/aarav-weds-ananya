import React from 'react';
import { motion } from 'motion/react';
import { weddingData } from '../config/weddingData';

export const AtmosphericBackground: React.FC = () => {
  // Select a few background ambient photos with low opacity
  const bgPhotos = weddingData.heroPhotos.slice(0, 4);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Base deep cinematic background gradient */}
      <div className="absolute inset-0 cinematic-bg opacity-90" />

      {/* Atmospheric light diffusion blur orbs from design theme */}
      <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] bg-[#4a1010] rounded-full mix-blend-screen pulse-light" />
      <div className="absolute -bottom-[20%] -right-[10%] w-[600px] h-[600px] bg-[#2d132c] rounded-full mix-blend-screen pulse-light" style={{ animationDirection: 'reverse', animationDuration: '12s' }} />

      {/* Orbit Rings from design theme */}
      <div className="orbit-ring w-[500px] h-[500px] md:w-[700px] md:h-[700px]" />
      <div className="orbit-ring w-[700px] h-[700px] md:w-[1000px] md:h-[1000px]" />

      {/* Slow moving ambient background photo layers with soft blur & low opacity */}
      <div className="absolute inset-0 opacity-[0.07] mix-blend-screen overflow-hidden">
        {bgPhotos.map((photo, i) => (
          <motion.div
            key={photo.id}
            animate={{
              rotate: [i * 90, i * 90 + 360],
              scale: [1, 1.1, 1],
              x: [Math.sin(i) * 30, Math.cos(i) * -30, Math.sin(i) * 30],
              y: [Math.cos(i) * 30, Math.sin(i) * -30, Math.cos(i) * 30],
            }}
            transition={{
              rotate: { duration: 120 + i * 20, repeat: Infinity, ease: 'linear' },
              scale: { duration: 25 + i * 5, repeat: Infinity, ease: 'easeInOut' },
              x: { duration: 30, repeat: Infinity, ease: 'easeInOut' },
              y: { duration: 30, repeat: Infinity, ease: 'easeInOut' },
            }}
            style={{
              top: `${(i % 2) * 45}%`,
              left: `${Math.floor(i / 2) * 45}%`,
              width: '55vw',
              height: '55vh',
            }}
            className="absolute rounded-full blur-[60px] filter grayscale"
          >
            <img
              src={photo.url}
              alt=""
              className="w-full h-full object-cover rounded-full"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        ))}
      </div>

      {/* Subtle light diffusion grain grid for cinematic depth */}
      <div className="absolute inset-0 bg-[radial-gradient(#e8b4b8_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03]" />

      {/* Vignette border frame for cinematic focus */}
      <div className="absolute inset-0 ring-1 ring-inset ring-[#e8b4b8]/10 pointer-events-none shadow-[inset_0_0_120px_rgba(21,10,10,0.85)]" />
    </div>
  );
};
