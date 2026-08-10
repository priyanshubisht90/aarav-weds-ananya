import React, { useState } from 'react';
import { PhotoItem } from '../types';
import { X, MapPin, Sparkles, Eye, Download } from 'lucide-react';

interface PhotoModalProps {
  photo: PhotoItem | null;
  onClose: () => void;
}

export const PhotoModal: React.FC<PhotoModalProps> = ({ photo, onClose }) => {
  const [isColor, setIsColor] = useState(true);

  if (!photo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#1A0811] border border-[#C98A99]/40 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#12070D]/80 border border-[#C98A99]/30 text-[#FAF6F0] flex items-center justify-center hover:bg-[#3D0F21] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Photo View Box */}
        <div className="w-full md:w-2/3 aspect-[4/5] md:aspect-auto bg-[#12070D] relative flex items-center justify-center overflow-hidden">
          <img
            src={photo.url}
            alt={photo.caption || 'Wedding moment'}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isColor ? 'filter-none' : 'filter grayscale(100%)'
            }`}
            referrerPolicy="no-referrer"
          />

          {/* Filter Mode Badge */}
          <button
            onClick={() => setIsColor(!isColor)}
            className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-[#12070D]/80 border border-[#C98A99]/30 text-[#E8A89A] text-xs font-sans-clean flex items-center gap-1.5 backdrop-blur-sm"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{isColor ? 'View Grayscale' : 'View Color'}</span>
          </button>
        </div>

        {/* Photo Metadata Details */}
        <div className="w-full md:w-1/3 p-6 sm:p-8 flex flex-col justify-between text-left border-t md:border-t-0 md:border-l border-[#C98A99]/20">
          <div>
            {photo.tag && (
              <span className="inline-block px-3 py-1 rounded-full bg-[#2A0B16] border border-[#C98A99]/30 text-[10px] text-[#E8A89A] font-sans-clean uppercase tracking-widest mb-3">
                {photo.tag}
              </span>
            )}

            <h3 className="font-display-luxury text-2xl text-[#FAF6F0] mb-2 leading-tight">
              {photo.caption || 'A Beautiful Moment'}
            </h3>

            {photo.location && (
              <p className="text-xs text-[#C98A99] font-sans-clean flex items-center gap-1.5 mb-6">
                <MapPin className="w-3.5 h-3.5 text-[#E8A89A]" />
                <span>{photo.location}</span>
              </p>
            )}

            <p className="text-xs text-[#FAF6F0]/80 font-sans-clean leading-relaxed">
              Captured during Ananya & Aarav’s wedding journey. Every moment tells an unforgettable story of two souls uniting.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-[#C98A99]/20 flex items-center justify-between">
            <span className="text-[10px] text-[#C98A99] font-sans-clean uppercase tracking-wider">
              18 • 10 • 2026
            </span>

            <a
              href={photo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-[#C98A99]/30 hover:border-[#E8A89A] text-[#E8A89A] transition-colors"
              title="Open full size"
            >
              <Download className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
