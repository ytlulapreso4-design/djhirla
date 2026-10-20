import React, { useState } from 'react';
import { Play, Image as ImageIcon, Video as VideoIcon, Sparkles } from 'lucide-react';

interface MediaSlotProps {
  type: 'image' | 'video';
  src: string;
  alt?: string;
  poster?: string;
  title: string;
  subtitle?: string;
  badge?: string;
  className?: string;
  aspectRatio?: string;
  onClick?: () => void;
  showPlayButton?: boolean;
  objectFit?: 'cover' | 'contain';
  imgClassName?: string;
  hideOverlayInfo?: boolean;
}

export const MediaSlot: React.FC<MediaSlotProps> = ({
  type,
  src,
  alt,
  poster,
  title,
  subtitle,
  badge,
  className = '',
  aspectRatio = 'aspect-[16/9]',
  onClick,
  showPlayButton = false,
  objectFit = 'cover',
  imgClassName = '',
  hideOverlayInfo = false,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden bg-[#111114] border border-white/10 transition-all duration-300 hover:border-[#8B2CFF]/60 ${aspectRatio} ${className} ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      {/* Real Media Rendering when available */}
      {!hasError && (
        <>
          {type === 'image' ? (
            <img
              src={src}
              alt={alt || title}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onLoad={() => setIsLoaded(true)}
              onError={() => setHasError(true)}
              className={`w-full h-full ${
                objectFit === 'contain' ? 'object-contain p-4' : 'object-cover'
              } transition-transform duration-700 ease-out group-hover:scale-105 ${imgClassName} ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ) : poster ? (
            <img
              src={poster}
              alt={alt || title}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onLoad={() => setIsLoaded(true)}
              onError={() => setHasError(true)}
              className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ) : (
            <video
              src={src}
              poster={poster}
              preload="none"
              muted
              playsInline
              loop
              onLoadedData={() => setIsLoaded(true)}
              onError={() => setHasError(true)}
              className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}
        </>
      )}

      {/* Elegant Fallback Slot when media is not yet placed in public/ or loading */}
      {(hasError || !isLoaded) && (
        <div className="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-b from-[#151518] to-[#0A0A0C]">
          {/* Subtle Festival Stage Grid Pattern */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)`,
              backgroundSize: '24px 24px',
            }}
          />

          {/* Electric Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 bg-[#8B2CFF]/15 blur-3xl rounded-full pointer-events-none group-hover:bg-[#F000B8]/20 transition-all duration-500" />

          {/* Top Info */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="text-[11px] font-mono tracking-wider uppercase text-zinc-400 flex items-center gap-2">
              {type === 'video' ? (
                <VideoIcon className="w-3.5 h-3.5 text-[#F000B8]" />
              ) : (
                <ImageIcon className="w-3.5 h-3.5 text-[#8B2CFF]" />
              )}
              {badge || (type === 'video' ? 'VÍDEO SHOW' : 'FOTOGRAFIA')}
            </span>
            <span className="text-[10px] font-mono text-zinc-400 bg-white/5 px-2 py-0.5 border border-white/5">
              SLOT PREPARADO
            </span>
          </div>

          {/* Center Graphic */}
          <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center px-4">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-3 group-hover:border-[#8B2CFF] group-hover:scale-110 transition-all duration-300">
              {type === 'video' ? (
                <Play className="w-5 h-5 text-white ml-0.5 fill-white/20 group-hover:fill-white transition-colors" />
              ) : (
                <Sparkles className="w-5 h-5 text-zinc-300 group-hover:text-[#F000B8] transition-colors" />
              )}
            </div>
            <p className="font-display text-lg tracking-wide text-white uppercase group-hover:text-[#F000B8] transition-colors">
              {title}
            </p>
            {subtitle && (
              <p className="text-xs text-zinc-400 mt-1 max-w-[280px]">
                {subtitle}
              </p>
            )}
          </div>

          {/* Target Path Indicator for Production Prep */}
          <div className="relative z-10 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <span className="truncate max-w-[200px]" title={src}>
              public{src}
            </span>
            <span className="text-[#8B2CFF] group-hover:text-[#F000B8] transition-colors">
              {type === 'video' ? '.mp4' : '.jpg'}
            </span>
          </div>
        </div>
      )}

      {/* Scrim Overlay & Content on real media hover */}
      {isLoaded && !hasError && !hideOverlayInfo && (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

          {/* Top Badge */}
          {badge !== '' && (
            <div className="absolute top-4 left-4 z-10">
              <span className="text-[10px] font-mono tracking-wider uppercase text-zinc-300 bg-black/60 backdrop-blur-md px-2.5 py-1 border border-white/10">
                {badge || (type === 'video' ? 'VÍDEO' : 'FOTO')}
              </span>
            </div>
          )}

          {/* Play Icon for Videos */}
          {(showPlayButton || type === 'video') && (
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-black/60 border border-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:border-[#F000B8] group-hover:bg-[#F000B8]/20 transition-all duration-300">
                <Play className="w-6 h-6 text-white ml-1 fill-white" />
              </div>
            </div>
          )}

          {/* Bottom Captions */}
          {(title || subtitle) && (
            <div className="absolute bottom-4 left-4 right-4 z-10">
              {title && (
                <h4 className="font-display text-lg text-white uppercase tracking-wide">
                  {title}
                </h4>
              )}
              {subtitle && (
                <p className="text-xs text-zinc-300 mt-0.5">{subtitle}</p>
              )}
            </div>
          )}
        </>
      )}

      {/* Subtle Electric Border Hover Accent */}
      <div className="absolute inset-0 border border-[#8B2CFF] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
};
