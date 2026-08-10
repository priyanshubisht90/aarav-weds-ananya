import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { weddingData } from '../config/weddingData';
import { TrailPhoto, PhotoItem } from '../types';
import { Sparkles, MousePointer, ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onPhotoClick?: (photo: PhotoItem) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onPhotoClick }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  // Trail photos state
  const [trail, setTrail] = useState<TrailPhoto[]>([]);
  
  // Cursor tracking refs
  const prevPosRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const velocityRef = useRef<number>(0);
  const photoIndexRef = useRef<number>(0);
  const lastSpawnTimeRef = useRef<number>(0);
  const isHoveredRef = useRef<boolean>(false);
  const activeHoverPhotoId = useRef<string | null>(null);

  // Orbit rotation angle ref
  const [orbitAngle, setOrbitAngle] = useState(0);

  // 10 couple photos for orbiting
  const orbitPhotos = weddingData.heroPhotos.slice(0, 10);

  // Continuous 3D orbit animation loop
  useEffect(() => {
    let animId: number;
    const animateOrbit = () => {
      setOrbitAngle((prev) => (prev + 0.15) % 360);
      animId = requestAnimationFrame(animateOrbit);
    };
    animId = requestAnimationFrame(animateOrbit);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Spawn a photo at cursor position based on velocity & direction
  const spawnPhoto = useCallback((x: number, y: number, velocity: number, dx: number, dy: number) => {
    const photos = weddingData.heroPhotos;
    const currentPhoto = photos[photoIndexRef.current % photos.length];
    photoIndexRef.current += 1;

    // Determine size based on velocity & random variation
    const sizes = [120, 160, 210, 270]; // Small, Medium, Large, XL
    const sizeIndex = Math.floor(Math.random() * sizes.length);
    const size = sizes[sizeIndex];

    // Calculate rotation and slight direction offset
    const rotation = (Math.random() - 0.5) * 24; // -12 to +12 deg
    const blur = Math.max(0, 3 - velocity * 1.5);
    const scale = 0.85 + Math.random() * 0.3;

    // Offset slightly so photos don't spawn directly beneath cursor point
    const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.8;
    const offsetDist = 20 + Math.random() * 50;
    const spawnX = x + Math.cos(angle) * offsetDist;
    const spawnY = y + Math.sin(angle) * offsetDist;

    const newTrailPhoto: TrailPhoto = {
      id: `trail-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      photo: currentPhoto,
      x: spawnX,
      y: spawnY,
      size,
      rotation,
      blur,
      scale,
      opacity: 0.95,
      createdAt: Date.now(),
      vx: dx * 0.05,
      vy: dy * 0.05,
    };

    setTrail((prev) => {
      // Keep maximum 16 trail items active at once for crisp performance
      const updated = [...prev, newTrailPhoto];
      if (updated.length > 16) {
        return updated.slice(updated.length - 16);
      }
      return updated;
    });
  }, []);

  // Clean up old trail photos automatically
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setTrail((prev) => prev.filter((item) => now - item.createdAt < 1800));
    }, 150);
    return () => clearInterval(interval);
  }, []);

  // Handle Mouse/Touch movement inside Hero
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    isHoveredRef.current = true;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const now = Date.now();

    if (prevPosRef.current) {
      const dt = Math.max(1, now - prevPosRef.current.time);
      const dx = x - prevPosRef.current.x;
      const dy = y - prevPosRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const speed = dist / dt; // pixels per ms

      velocityRef.current = speed;

      // Speed threshold: Fast movement -> spawn interval ~50ms; Slow movement -> spawn interval ~180ms
      const minSpawnInterval = speed > 1.2 ? 50 : speed > 0.4 ? 100 : 180;

      if (now - lastSpawnTimeRef.current > minSpawnInterval && dist > 12) {
        spawnPhoto(x, y, speed, dx, dy);
        lastSpawnTimeRef.current = now;
      }
    }

    prevPosRef.current = { x, y, time: now };
  }, [spawnPhoto]);

  const handlePointerLeave = () => {
    isHoveredRef.current = false;
    prevPosRef.current = null;
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden cursor-crosshair select-none pt-20 pb-16"
    >
      {/* Dynamic Cursor Photo Reveal Trail Layer */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <AnimatePresence>
          {trail.map((item) => (
            <motion.div
              key={item.id}
              initial={{
                opacity: 0,
                scale: 0.6,
                x: item.x - item.size / 2,
                y: item.y - item.size / 2,
                rotate: item.rotation - 10,
              }}
              animate={{
                opacity: item.opacity,
                scale: item.scale,
                x: item.x - item.size / 2 + item.vx * 15,
                y: item.y - item.size / 2 + item.vy * 15,
                rotate: item.rotation,
              }}
              exit={{
                opacity: 0,
                scale: 0.4,
                filter: 'blur(8px)',
                transition: { duration: 0.6, ease: 'easeOut' },
              }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                position: 'absolute',
                width: item.size,
                height: item.size * 1.25,
              }}
              className="pointer-events-auto group cursor-pointer"
              onClick={() => onPhotoClick && onPhotoClick(item.photo)}
            >
              <div className="w-full h-full p-2 bg-[#2d132c]/90 border border-white/10 rounded-xl shadow-2xl backdrop-blur-sm transform transition-all duration-700 ease-out hover:scale-110 hover:border-[#e8b4b8] hover:z-30">
                {/* Image with smooth Grayscale -> Full Color transition */}
                <div className="w-full h-full overflow-hidden rounded-lg relative">
                  <img
                    src={item.photo.url}
                    alt={item.photo.caption || 'Wedding Photo'}
                    className="w-full h-full object-cover bw-to-color group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {item.photo.caption && (
                    <div className="absolute bottom-0 inset-x-0 p-1.5 bg-gradient-to-t from-[#150a0a]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-[10px] text-[#fdf6f0] font-sans-clean text-center truncate">
                        {item.photo.caption}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 3D Circular Orbit Photo System traveling continuously around names */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 preserve-3d">
        <div className="relative w-[340px] h-[340px] sm:w-[500px] sm:h-[500px] md:w-[680px] md:h-[680px] preserve-3d">
          {orbitPhotos.map((photo, index) => {
            const photoAngle = (orbitAngle + index * (360 / orbitPhotos.length)) % 360;
            const rad = (photoAngle * Math.PI) / 180;
            const radius = typeof window !== 'undefined' && window.innerWidth < 640 ? 170 : 310;
            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius * 0.45; // Elliptical 3D tilt
            const z = Math.sin(rad) * 120; // 3D depth translateZ
            const scale = 0.75 + (z + 120) / 480; // Scale larger when in front
            const opacity = 0.4 + (z + 120) / 380; // Crisper when in front

            return (
              <div
                key={photo.id}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: `translate3d(${x}px, ${y}px, ${z}px) scale(${scale}) translate(-50%, -50%)`,
                  zIndex: Math.round(z + 200),
                  opacity,
                }}
                className="pointer-events-auto group cursor-pointer transition-transform duration-300"
                onClick={() => onPhotoClick && onPhotoClick(photo)}
              >
                <div className="w-20 h-28 sm:w-28 sm:h-36 md:w-36 md:h-48 p-1.5 bg-[#4a1010]/80 border border-white/10 rounded-xl shadow-xl hover:border-[#e8b4b8] hover:scale-110 hover:shadow-2xl transition-all duration-700">
                  <div className="w-full h-full overflow-hidden rounded-lg relative">
                    <img
                      src={photo.url}
                      alt={photo.caption || 'Couple moment'}
                      className="w-full h-full object-cover bw-to-color group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#150a0a]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-1.5">
                      <span className="text-[9px] sm:text-[11px] font-sans-clean text-[#fdf6f0] font-medium truncate">
                        {photo.caption}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Visual Center — Clean & Sharp Content */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-4 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          {/* Save The Date Eyebrow Label matching theme */}
          <div className="text-[12px] tracking-[0.8em] uppercase mb-4 text-[#e8b4b8] opacity-85 font-sans-clean flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#e8b4b8]" />
            <span>SAVE THE DATE</span>
          </div>

          {/* Couple's Names — Atmospheric Theme Display */}
          <h1 className="font-display-luxury text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#fdf6f0] font-light leading-[0.85] mb-4 text-center">
            {weddingData.brideName.split(' ')[0]}
            <span className="italic text-[36px] sm:text-[48px] md:text-[56px] align-middle inline-block mx-3 text-[#e8b4b8] opacity-75 font-serif-luxury">
              &
            </span>
            {weddingData.groomName.split(' ')[0]}
          </h1>

          {/* Wedding Date Display */}
          <div className="text-[28px] sm:text-[36px] md:text-[42px] tracking-[0.4em] text-[#fdf6f0] font-light my-2">
            18 • 10 • 2026
          </div>

          {/* Tagline */}
          <div className="text-[12px] sm:text-[14px] tracking-[0.2em] italic text-[#e8b4b8] opacity-80 mt-4 mb-6 font-sans-clean max-w-xl">
            “Two hearts, one beautiful journey.”
          </div>

          {/* Cursor Interaction Prompt Indicator */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="mt-6 inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-[#2d132c]/50 text-[#e8b4b8] text-xs font-sans-clean tracking-widest uppercase shadow-md backdrop-blur-sm"
          >
            <MousePointer className="w-3.5 h-3.5 text-[#e8b4b8] animate-bounce" />
            <span>Move cursor to reveal moments</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#save-the-date"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-[#e8b4b8]/80 hover:text-[#fdf6f0] transition-colors duration-300 focus:outline-none"
      >
        <span className="text-[10px] tracking-[0.3em] font-sans-clean uppercase">
          EXPLORE
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce text-[#e8b4b8]" />
      </a>
    </section>
  );
};
