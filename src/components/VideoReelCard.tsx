import React, { useRef, useState } from 'react';
import { Play } from 'lucide-react';
import type { FounderReel } from '../data/siteContent';

interface VideoReelCardProps {
  reel: FounderReel;
  index: number;
}

export const VideoReelCard: React.FC<VideoReelCardProps> = ({ reel, index }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const handleStartPlayback = () => {
    setHasStarted(true);
    window.requestAnimationFrame(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {
          // User can trigger native playback controls if autoplay is restricted
        });
      }
    });
  };

  return (
    <article className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start pt-8 border-t border-black/[0.08]">
      <div className="sm:col-span-5">
        <div className="relative aspect-[9/16] max-h-[460px] w-full rounded-xl overflow-hidden bg-[#111110] border border-black/[0.08]">
          {hasStarted ? (
            <video
              ref={videoRef}
              src={reel.videoSrc}
              poster={reel.posterSrc}
              controls
              playsInline
              preload="metadata"
              className="w-full h-full object-cover bg-[#111110]"
            />
          ) : (
            <button
              type="button"
              onClick={handleStartPlayback}
              aria-label={`Play video: ${reel.title}`}
              className="group relative w-full h-full block text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705]"
            >
              <img
                src={reel.posterSrc}
                alt={reel.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="w-14 h-14 rounded-full bg-[#F2B705] text-[#111110] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90">
                <span>Play Reel</span>
                <span className="tabular-nums">{reel.duration}</span>
              </div>
            </button>
          )}
        </div>
      </div>

      <div className="sm:col-span-7 flex flex-col justify-between h-full py-1">
        <div>
          <p className="text-xs text-[#6E6D68] tabular-nums">
            Reel {String(index + 1).padStart(2, '0')}
            <span aria-hidden="true" className="mx-1.5">·</span>
            {reel.context}
            <span aria-hidden="true" className="mx-1.5">·</span>
            {reel.duration}
          </p>

          <h3 className="mt-3 font-editorial text-2xl md:text-[30px] leading-[1.15] font-medium text-[#141413]">
            {reel.title}
          </h3>

          <p className="mt-4 text-sm md:text-[15px] leading-[1.7] text-[#4A4945] max-w-[46ch]">
            {reel.summary}
          </p>
        </div>

        <div className="mt-6 pt-5 border-t border-black/[0.06] flex items-center gap-5">
          {!hasStarted && (
            <button
              type="button"
              onClick={handleStartPlayback}
              className="text-xs font-medium text-[#141413] underline underline-offset-4 hover:text-[#8A6200] transition-colors cursor-pointer"
            >
              Watch Video
            </button>
          )}
          <a
            href={reel.videoSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#575652] hover:text-[#141413] transition-colors"
          >
            Open video file
          </a>
        </div>
      </div>
    </article>
  );
};
