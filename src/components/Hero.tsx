import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, Volume2, VolumeX, ChevronDown } from 'lucide-react';
import { ARTIST_CONFIG } from '../config/media.ts';

export const Hero: React.FC = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const userInteractedRef = useRef(false);
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fadeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Smooth fade-out after 18 seconds of audible playback
  const scheduleFadeOut = useCallback(() => {
    if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

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
  }, []);

  // Synchronous audio unlock function
  const triggerAudioPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = 1.0;
    video.muted = false;
    const p = video.play();
    if (p !== undefined) {
      p.then(() => {
        setIsMuted(false);
        scheduleFadeOut();
      }).catch(() => {
        // Fallback: browser strictly insists on direct tap on button
      });
    }
  }, [scheduleFadeOut]);

  // Audio start on mount + unlock on ANY touch/interaction
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = 1.0;

    // 1. Attempt unmuted play on mount
    video.muted = false;
    const initialPlay = video.play();

    if (initialPlay !== undefined) {
      initialPlay
        .then(() => {
          setIsMuted(false);
          scheduleFadeOut();
        })
        .catch(() => {
          // Autoplay policy prevented sound before user gesture
          video.muted = true;
          setIsMuted(true);
          video.play().catch(() => {});
        });
    }

    // 2. Global gesture listeners to unlock sound immediately on first touch/click/scroll
    const unlockOnGesture = () => {
      if (!userInteractedRef.current && videoRef.current && videoRef.current.muted) {
        triggerAudioPlay();
      }
      removeGestureListeners();
    };

    const removeGestureListeners = () => {
      window.removeEventListener('touchstart', unlockOnGesture);
      window.removeEventListener('touchend', unlockOnGesture);
      window.removeEventListener('click', unlockOnGesture);
      window.removeEventListener('pointerdown', unlockOnGesture);
      window.removeEventListener('scroll', unlockOnGesture);
      document.removeEventListener('click', unlockOnGesture);
    };

    window.addEventListener('touchstart', unlockOnGesture, { passive: true, once: true });
    window.addEventListener('touchend', unlockOnGesture, { passive: true, once: true });
    window.addEventListener('click', unlockOnGesture, { passive: true, once: true });
    window.addEventListener('pointerdown', unlockOnGesture, { passive: true, once: true });
    window.addEventListener('scroll', unlockOnGesture, { passive: true, once: true });
    document.addEventListener('click', unlockOnGesture, { passive: true, once: true });

    return () => {
      removeGestureListeners();
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, [scheduleFadeOut, triggerAudioPlay]);

  const toggleMute = () => {
    userInteractedRef.current = true;
    if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.muted = false;
        videoRef.current.volume = 1.0;
        videoRef.current.play().catch(() => {});
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
    <section className="relative w-full max-w-[100vw] h-[100svh] min-h-[640px] flex items-center justify-center overflow-hidden bg-[#050505]">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
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
            className={`w-full h-full object-cover object-center transition-opacity duration-700 ${
              videoLoaded ? 'opacity-70' : 'opacity-0'
            }`}
          />
        )}

        {/* Dark Stage Fallback & Lighting with strict viewport bounds */}
        {(!videoLoaded || videoError) && (
          <div className="absolute inset-0 bg-[#050505] overflow-hidden w-full h-full">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
                backgroundSize: '48px 48px',
              }}
            />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[450px] bg-gradient-to-b from-[#8B2CFF]/20 via-[#F000B8]/10 to-transparent blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-[#8B2CFF]/15 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-[#F000B8]/15 blur-[100px] rounded-full pointer-events-none" />
          </div>
        )}

        {/* Contrast Scrims & Dark Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-[#050505]/40 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505] z-10 pointer-events-none" />
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center flex flex-col items-center justify-center pt-14 sm:pt-16">
        
        {/* Animated Sound Equalizer Waves Only (No Text, As Requested) */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-2 mb-5 sm:mb-6 border border-white/10 bg-white/5 backdrop-blur-md">
          <span className="w-1.5 h-3 bg-[#8B2CFF] animate-wave-1" />
          <span className="w-1.5 h-5 bg-[#F000B8] animate-wave-2" />
          <span className="w-1.5 h-2.5 bg-[#8B2CFF] animate-wave-3" />
          <span className="w-1.5 h-4 bg-white animate-wave-4" />
          <span className="w-1.5 h-5 bg-[#F000B8] animate-wave-5" />
        </div>

        {/* Monumental Headline: DJ HIRLA */}
        <div className="relative my-1 select-none w-full max-w-full overflow-hidden">
          <h1
            className="font-display text-[clamp(3.5rem,13vw,9.5rem)] leading-[0.9] uppercase tracking-normal text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
            style={{ textWrap: 'balance' }}
          >
            DJ HIRLA
          </h1>
        </div>

        {/* Impact Phrase */}
        <p className="mt-4 sm:mt-5 font-display text-xl sm:text-2xl md:text-3xl uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400 max-w-2xl px-2">
          {ARTIST_CONFIG.tagline}
        </p>

        {/* Short value statement */}
        <p className="mt-3 text-xs sm:text-sm text-zinc-400 font-mono tracking-wide max-w-lg px-4">
          A fusão explosiva do grave eletrônico e o ritmo do funk brasileiro para transformar a pista do seu evento.
        </p>

        {/* CTA Button Group */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto px-4 sm:px-0">
          {/* Primary CTA: Scrolls straight to Event Data Builder Form */}
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
            className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-widest bg-black/50 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/20 hover:border-white/40 active:scale-[0.98] transition-all backdrop-blur-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>VER MOMENTOS & SHOWS</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Unmissable audio toggle prompt if muted on entry */}
        {isMuted && (
          <button
            onClick={() => {
              userInteractedRef.current = true;
              triggerAudioPlay();
            }}
            className="mt-6 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#8B2CFF] to-[#F000B8] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#8B2CFF]/40 animate-pulse hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/20"
          >
            <Volume2 className="w-4 h-4 fill-white" />
            <span>Ativar Som do Beat (18s)</span>
          </button>
        )}
      </div>

      {/* Persistent Corner Sound Toggle */}
      <button
        onClick={toggleMute}
        aria-label={isMuted ? 'Ativar som do show' : 'Mutar som'}
        className="absolute bottom-6 right-6 z-20 flex items-center gap-2 px-3.5 py-2 bg-black/70 hover:bg-black/90 border border-white/20 hover:border-[#F000B8] text-white text-xs font-mono backdrop-blur-md transition-all group cursor-pointer shadow-lg"
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
