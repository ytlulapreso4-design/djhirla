import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Volume2, VolumeX, ChevronDown } from 'lucide-react';
import { ARTIST_CONFIG } from '../config/media.ts';

export const Hero: React.FC = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const userInteractedRef = useRef(false);
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fadeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Audio start & gradual fade-out after 10 seconds
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = 1.0;

    // Start fade out routine after 18s
    const scheduleFadeOut = () => {
      fadeTimeoutRef.current = setTimeout(() => {
        if (userInteractedRef.current) return;

        const durationMs = 3500;
        const stepMs = 100;
        const totalSteps = durationMs / stepMs;
        let step = 0;

        fadeIntervalRef.current = setInterval(() => {
          step++;
          const nextVolume = Math.max(0, 1.0 - step / totalSteps);
          if (videoRef.current) {
            videoRef.current.volume = nextVolume;
          }
          if (step >= totalSteps) {
            if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
            if (videoRef.current) {
              videoRef.current.muted = true;
            }
            setIsMuted(true);
          }
        }, stepMs);
      }, 18000);
    };

    // Attempt unmuted playback
    video.muted = false;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsMuted(false);
          scheduleFadeOut();
        })
        .catch(() => {
          // Browser prevented unmuted autoplay without prior user interaction
          video.muted = true;
          setIsMuted(true);
          video.play().catch(() => {});

          // Enable on first page interaction if user hasn't explicitly muted
          const handleFirstClick = () => {
            if (!userInteractedRef.current && videoRef.current) {
              videoRef.current.muted = false;
              videoRef.current.volume = 1.0;
              setIsMuted(false);
              scheduleFadeOut();
            }
            window.removeEventListener('pointerdown', handleFirstClick);
          };
          window.addEventListener('pointerdown', handleFirstClick, { once: true });
        });
    }

    return () => {
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, []);

  const toggleMute = () => {
    userInteractedRef.current = true;
    if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.muted = false;
        videoRef.current.volume = 1.0;
        setIsMuted(false);
      } else {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  const scrollToNextSection = () => {
    const el = document.getElementById('momentos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-[100svh] min-h-[640px] flex items-center justify-center overflow-hidden bg-[#050505]">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        {!videoError && (
          <video
            ref={videoRef}
            src={ARTIST_CONFIG.media.heroVideo.path}
            poster={ARTIST_CONFIG.media.heroVideo.fallbackPoster}
            autoPlay
            loop
            playsInline
            preload="metadata"
            onLoadedData={() => setVideoLoaded(true)}
            onError={() => setVideoError(true)}
            className={`w-full h-full object-cover object-center transition-opacity duration-1000 ${
              videoLoaded ? 'opacity-70' : 'opacity-0'
            }`}
          />
        )}

        {/* High-End Dark Atmospheric Stage Fallback */}
        {(!videoLoaded || videoError) && (
          <div className="absolute inset-0 bg-[#050505] overflow-hidden">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
                backgroundSize: '48px 48px',
              }}
            />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] max-w-4xl h-[450px] bg-gradient-to-b from-[#8B2CFF]/20 via-[#F000B8]/10 to-transparent blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 left-1/4 w-96 h-96 bg-[#8B2CFF]/15 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-[#F000B8]/15 blur-[120px] rounded-full pointer-events-none" />
          </div>
        )}

        {/* Contrast Scrims & Dark Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-[#050505]/40 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505] z-10 pointer-events-none" />
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center flex flex-col items-center justify-center pt-16">
        
        {/* Subtitle / Genre Tag */}
        <div className="inline-flex items-center gap-3 px-4 py-1.5 mb-5 sm:mb-6 border border-white/10 bg-white/5 backdrop-blur-md">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-3 bg-[#8B2CFF] animate-wave-1" />
            <span className="w-1.5 h-5 bg-[#F000B8] animate-wave-2" />
            <span className="w-1.5 h-2 bg-[#8B2CFF] animate-wave-3" />
            <span className="w-1.5 h-4 bg-white animate-wave-4" />
          </div>
          <span className="text-[11px] sm:text-xs font-mono tracking-[0.25em] uppercase text-zinc-300">
            {ARTIST_CONFIG.subtagline}
          </span>
        </div>

        {/* Monumental Headline: DJ HIRLA */}
        <div className="relative my-1 select-none">
          <h1
            className="font-display text-[clamp(3.8rem,14vw,10.5rem)] leading-[0.88] uppercase tracking-normal text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
            style={{ textWrap: 'balance' }}
          >
            DJ HIRLA
          </h1>
        </div>

        {/* Impact Phrase */}
        <p className="mt-4 sm:mt-6 font-display text-xl sm:text-2xl md:text-3xl uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400 max-w-2xl">
          {ARTIST_CONFIG.tagline}
        </p>

        {/* Short value statement */}
        <p className="mt-3 text-xs sm:text-sm text-zinc-400 font-mono tracking-wide max-w-lg">
          A fusão explosiva do grave eletrônico e o ritmo do funk brasileiro para transformar a pista do seu evento.
        </p>

        {/* CTA Button Group */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          {/* Primary CTA */}
          <button
            onClick={() => {
              const el = document.getElementById('dados-evento') || document.getElementById('contratacoes');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-widest bg-gradient-to-r from-[#8B2CFF] to-[#F000B8] text-white hover:brightness-110 active:scale-[0.98] transition-all shadow-xl shadow-[#8B2CFF]/30 flex items-center justify-center gap-3 group border border-white/20 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white transition-transform group-hover:scale-110" />
            <span>CONTRATAR SHOW</span>
          </button>

          {/* Secondary CTA */}
          <button
            onClick={scrollToNextSection}
            className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-widest bg-black/50 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/20 hover:border-white/40 active:scale-[0.98] transition-all backdrop-blur-md flex items-center justify-center gap-2"
          >
            <span>VER MOMENTOS & SHOWS</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sound Toggle (Unmute / Mute / Reactivate permanently) */}
      <button
        onClick={toggleMute}
        aria-label={isMuted ? 'Ativar som do show' : 'Mutar som'}
        className="absolute bottom-6 right-6 z-20 flex items-center gap-2 px-3.5 py-2 bg-black/60 hover:bg-black/90 border border-white/20 hover:border-[#F000B8] text-white text-xs font-mono backdrop-blur-md transition-all group cursor-pointer"
      >
        {isMuted ? (
          <>
            <VolumeX className="w-4 h-4 text-zinc-400 group-hover:text-white" />
            <span className="text-zinc-400 group-hover:text-white uppercase tracking-wider text-[11px]">
              Ativar Som
            </span>
          </>
        ) : (
          <>
            <Volume2 className="w-4 h-4 text-[#F000B8] animate-pulse" />
            <span className="text-white uppercase tracking-wider text-[11px]">
              Som Ligado
            </span>
          </>
        )}
      </button>

      {/* Decorative Bottom Gradient Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none" />
    </section>
  );
};
