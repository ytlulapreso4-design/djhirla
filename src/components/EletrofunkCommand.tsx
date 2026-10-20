import React, { useEffect, useRef, useState } from 'react';

export const EletrofunkCommand: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const translateXRow1 = -(scrollProgress * 250);
  const translateXRow2 = scrollProgress * 250 - 150;

  return (
    <section
      ref={sectionRef}
      id="eletrofunk"
      className="relative py-12 sm:py-16 bg-[#050505] text-[#F5F5F5] overflow-hidden border-t border-b border-white/5"
    >
      {/* Background Lighting Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-[#8B2CFF]/10 blur-[150px] pointer-events-none rounded-full" />

      {/* Giant Moving Marquee Rows (Scroll-Responsive) */}
      <div className="py-2 overflow-hidden select-none opacity-85">
        {/* Row 1: Solid & Outline Heavy Text */}
        <div
          className="flex whitespace-nowrap gap-8 text-[clamp(3.8rem,9vw,8rem)] font-display uppercase tracking-tight leading-none text-white transition-transform duration-100 ease-out"
          style={{ transform: `translateX(${translateXRow1}px)` }}
        >
          <span>ELETROFUNK</span>
          <span className="text-stroke-purple">ELETROFUNK</span>
          <span>ELETROFUNK</span>
          <span className="text-stroke-magenta">ELETROFUNK</span>
          <span>ELETROFUNK</span>
          <span className="text-stroke-purple">ELETROFUNK</span>
        </div>

        {/* Row 2: Reverse Movement with Accent Text */}
        <div
          className="flex whitespace-nowrap gap-8 text-[clamp(2.8rem,7vw,6.5rem)] font-display uppercase tracking-tight leading-none text-zinc-400 mt-2 transition-transform duration-100 ease-out"
          style={{ transform: `translateX(${translateXRow2}px)` }}
        >
          <span className="text-stroke-light">GRAVE & PRESSÃO</span>
          <span className="text-white">DJ HIRLA</span>
          <span className="text-stroke-light">GRAVE PESADO</span>
          <span className="text-[#F000B8]">ENERGIA TOTAL</span>
          <span className="text-stroke-light">GRAVE & PRESSÃO</span>
        </div>
      </div>
    </section>
  );
};
