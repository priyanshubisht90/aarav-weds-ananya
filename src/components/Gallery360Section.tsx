import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { weddingData } from '../config/weddingData';
import { PhotoItem } from '../types';
import { RotateCw, Play, Pause, ZoomIn, Filter, Sparkles, SlidersHorizontal, Grid, Compass } from 'lucide-react';

interface Gallery360SectionProps {
  onPhotoClick: (photo: PhotoItem) => void;
}

export const Gallery360Section: React.FC<Gallery360SectionProps> = ({ onPhotoClick }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Rotation angles
  const [rotationY, setRotationY] = useState(0);
  const [rotationX, setRotationX] = useState(-5);
  
  // Controls state
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState(0.25);
  const [activeTag, setActiveTag] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'360' | 'grid'>('360');

  // Drag tracking refs
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const lastXRef = useRef(0);
  const lastYRef = useRef(0);
  const velocityYRef = useRef(0);

  // Extract unique tags for filtering
  const tags = ['All', ...Array.from(new Set(weddingData.gallery360Photos.map((p) => p.tag).filter(Boolean)))];

  // Filtered photos
  const filteredPhotos = activeTag === 'All'
    ? weddingData.gallery360Photos
    : weddingData.gallery360Photos.filter((p) => p.tag === activeTag);

  // Auto rotation loop
  useEffect(() => {
    let animId: number;
    const animate = () => {
      if (isAutoRotating && !isDraggingRef.current) {
        setRotationY((prev) => (prev + rotationSpeed) % 360);
      }
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isAutoRotating, rotationSpeed]);

  // Pointer/Touch Drag handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    lastXRef.current = e.clientX;
    lastYRef.current = e.clientY;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastXRef.current;
    const dy = e.clientY - lastYRef.current;

    setRotationY((prev) => (prev + dx * 0.4) % 360);
    setRotationX((prev) => Math.max(-25, Math.min(25, prev - dy * 0.2)));

    velocityYRef.current = dx * 0.4;
    lastXRef.current = e.clientX;
    lastYRef.current = e.clientY;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  // Wheel listener for smooth rotational control
  const handleWheel = (e: React.WheelEvent) => {
    if (viewMode === '360') {
      setRotationY((prev) => (prev + e.deltaY * 0.15) % 360);
    }
  };

  // 3D Cylinder geometry calculations
  const totalPhotos = filteredPhotos.length;
  // Radius of cylinder stage
  const radius = Math.max(450, totalPhotos * 22);

  return (
    <section id="story-360" className="relative py-24 sm:py-32 w-full overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center relative z-20">
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C98A99]/35 bg-[#2A0B16]/60 text-[#E8A89A] text-xs font-sans-clean tracking-[0.3em] uppercase mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#E8A89A]" />
          <span>IMMERSIVE STORYTELLING</span>
        </div>

        <h2 className="font-display-luxury text-3xl sm:text-5xl md:text-6xl text-[#FAF6F0] tracking-wider mb-4">
          OUR STORY IN 360°
        </h2>

        <p className="font-serif-luxury italic text-xl sm:text-2xl text-[#C98A99] max-w-xl mx-auto font-light">
          “Every angle. Every moment. Every memory.”
        </p>

        {/* Category Tag Filter & Mode Toggle */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {tags.slice(0, 7).map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-sans-clean tracking-wider uppercase transition-all duration-300 ${
                activeTag === tag
                  ? 'bg-[#4a1010] text-[#fdf6f0] border border-[#e8b4b8] shadow-md'
                  : 'bg-[#2d132c]/40 text-[#e8b4b8] border border-white/10 hover:border-[#e8b4b8]/50 hover:text-[#fdf6f0]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Toolbar: Auto-Rotate, Speed, View Switcher */}
        <div className="mt-6 flex items-center justify-center gap-4 text-xs font-sans-clean text-[#e8b4b8]">
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-[#2d132c]/50 hover:bg-[#4a1010]/80 text-[#fdf6f0] transition-all"
          >
            {isAutoRotating ? <Pause className="w-3.5 h-3.5 text-[#e8b4b8]" /> : <Play className="w-3.5 h-3.5 text-[#e8b4b8]" />}
            <span>{isAutoRotating ? 'Pause Rotation' : 'Auto Rotate'}</span>
          </button>

          <button
            onClick={() => setViewMode(viewMode === '360' ? 'grid' : '360')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-[#2d132c]/50 hover:bg-[#4a1010]/80 text-[#fdf6f0] transition-all"
          >
            {viewMode === '360' ? <Grid className="w-3.5 h-3.5 text-[#e8b4b8]" /> : <Compass className="w-3.5 h-3.5 text-[#e8b4b8]" />}
            <span>{viewMode === '360' ? 'Grid View' : '360° Cylinder'}</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 border border-white/10 rounded-lg px-3 py-1 bg-[#2d132c]/30">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#e8b4b8]" />
            <span>Speed:</span>
            <input
              type="range"
              min="0.05"
              max="0.8"
              step="0.05"
              value={rotationSpeed}
              onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
              className="w-16 accent-[#e8b4b8] cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* 360° Interactive 3D Cylindrical Stage View */}
      {viewMode === '360' ? (
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onWheel={handleWheel}
          className="relative w-full h-[550px] sm:h-[650px] perspective-stage cursor-grab active:cursor-grabbing flex items-center justify-center overflow-hidden"
        >
          {/* Instructions Overlay Banner */}
          <div className="absolute top-4 z-30 pointer-events-none flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#150a0a]/80 border border-white/10 text-[11px] text-[#e8b4b8] tracking-wider uppercase font-sans-clean">
            <RotateCw className="w-3 h-3 text-[#e8b4b8] animate-spin" />
            <span>Drag horizontally to rotate 360° gallery</span>
          </div>

          {/* 3D Rotating Container */}
          <div
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              transformStyle: 'preserve-3d',
              transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
              transition: isDraggingRef.current ? 'none' : 'transform 0.1s ease-out',
            }}
            className="flex items-center justify-center"
          >
            {filteredPhotos.map((photo, index) => {
              const photoAngle = index * (360 / totalPhotos);
              // Calculate depth orientation
              const normalizedAngle = (photoAngle + rotationY) % 360;
              const rad = (normalizedAngle * Math.PI) / 180;
              const zVal = Math.cos(rad) * radius;

              // Opacity and scale based on depth distance
              const opacity = Math.max(0.2, (zVal + radius) / (radius * 1.8));

              return (
                <div
                  key={photo.id}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '160px',
                    height: '220px',
                    margin: '-110px 0 0 -80px',
                    transformStyle: 'preserve-3d',
                    transform: `rotateY(${photoAngle}deg) translateZ(${radius}px)`,
                    opacity,
                  }}
                  className="group cursor-pointer pointer-events-auto"
                  onClick={() => onPhotoClick(photo)}
                >
                  <div className="w-full h-full p-2 bg-[#2d132c]/90 border border-white/10 rounded-xl shadow-2xl backdrop-blur-xs transition-all duration-700 ease-out hover:scale-115 hover:border-[#e8b4b8] hover:z-50">
                    <div className="w-full h-full overflow-hidden rounded-lg relative">
                      {/* Black & White to Color transition */}
                      <img
                        src={photo.url}
                        alt={photo.caption || 'Couple moment'}
                        className="w-full h-full object-cover bw-to-color group-hover:scale-105"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      
                      {/* Caption & Tag Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#150a0a]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2 text-left">
                        <span className="text-[9px] font-sans-clean text-[#e8b4b8] uppercase tracking-wider">
                          {photo.tag}
                        </span>
                        <p className="text-xs font-sans-clean text-[#fdf6f0] font-medium leading-tight truncate">
                          {photo.caption}
                        </p>
                      </div>

                      <div className="absolute top-2 right-2 p-1 rounded-full bg-[#150a0a]/70 text-[#fdf6f0] opacity-0 group-hover:opacity-100 transition-opacity">
                        <ZoomIn className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Alternative Matrix Grid View */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredPhotos.map((photo) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              onClick={() => onPhotoClick(photo)}
              className="group cursor-pointer aspect-[3/4] p-1.5 bg-[#2d132c]/70 border border-white/10 rounded-xl hover:border-[#e8b4b8] hover:scale-102 transition-all duration-500"
            >
              <div className="w-full h-full overflow-hidden rounded-lg relative">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover bw-to-color group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#150a0a]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2.5">
                  <span className="text-[10px] text-[#e8b4b8] tracking-wider uppercase font-sans-clean">
                    {photo.tag}
                  </span>
                  <p className="text-xs font-sans-clean text-[#fdf6f0] font-medium truncate">
                    {photo.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};
