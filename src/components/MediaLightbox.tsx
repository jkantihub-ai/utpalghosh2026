import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryPhoto } from '../data/siteContent';

interface MediaLightboxProps {
  photos: GalleryPhoto[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}

export const MediaLightbox: React.FC<MediaLightboxProps> = ({
  photos,
  activeIndex,
  onClose,
  onNavigate,
}) => {
  const isOpen = activeIndex !== null && photos[activeIndex] !== undefined;

  useEffect(() => {
    if (!isOpen || activeIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((activeIndex + 1) % photos.length);
      if (e.key === 'ArrowLeft') onNavigate((activeIndex - 1 + photos.length) % photos.length);
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, activeIndex, photos.length, onClose, onNavigate]);

  if (!isOpen || activeIndex === null) return null;

  const current = photos[activeIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={current.title}
      className="fixed inset-0 z-50 bg-[#0B0B0A]/94 backdrop-blur-sm flex flex-col justify-between p-4 sm:p-8"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex items-center justify-between text-[#F9F9F8] max-w-[1280px] w-full mx-auto">
        <div className="text-xs text-white/70 tabular-nums">
          {String(activeIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
          <span aria-hidden="true" className="mx-2">·</span>
          <span>{current.category}</span>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close lightbox"
          className="w-11 h-11 rounded-md inline-flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="relative flex-1 flex items-center justify-center my-4 max-w-[1200px] w-full mx-auto min-h-0">
        {photos.length > 1 && (
          <button
            type="button"
            onClick={() => onNavigate((activeIndex - 1 + photos.length) % photos.length)}
            aria-label="Previous image"
            className="hidden sm:inline-flex items-center justify-center w-11 h-11 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors mr-4 shrink-0 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <div className="max-h-[72vh] flex items-center justify-center overflow-hidden rounded-xl bg-black/40 border border-white/10">
          <img
            src={current.src}
            alt={current.title}
            referrerPolicy="no-referrer"
            className="max-h-[72vh] max-w-full object-contain"
          />
        </div>

        {photos.length > 1 && (
          <button
            type="button"
            onClick={() => onNavigate((activeIndex + 1) % photos.length)}
            aria-label="Next image"
            className="hidden sm:inline-flex items-center justify-center w-11 h-11 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors ml-4 shrink-0 cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      <div className="max-w-[780px] w-full mx-auto text-center">
        <h3 className="font-editorial text-2xl text-white font-medium">{current.title}</h3>
        <p className="mt-1.5 text-sm text-white/75 leading-relaxed">{current.caption}</p>
        {photos.length > 1 && (
          <div className="mt-4 flex sm:hidden items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate((activeIndex - 1 + photos.length) % photos.length)}
              className="px-4 py-2 text-xs text-white border border-white/20 rounded-md cursor-pointer"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => onNavigate((activeIndex + 1) % photos.length)}
              className="px-4 py-2 text-xs text-white border border-white/20 rounded-md cursor-pointer"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
