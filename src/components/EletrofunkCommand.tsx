import React from 'react';

export const EletrofunkCommand: React.FC = () => {
  return (
    <section
      id="eletrofunk"
      className="marquee-container py-10 sm:py-14 bg-[#050505] text-[#F5F5F5] border-t border-b border-white/5"
      style={{ contain: 'paint', overflow: 'hidden', width: '100%', maxWidth: '100vw' }}
    >
      {/* Background Lighting Elements with strictly clamped bounds */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[500px] max-w-full h-[160px] bg-[#8B2CFF]/10 blur-[100px] pointer-events-none rounded-full" />

      {/* Giant Moving Marquee Rows (GPU Compositor Accelerated, strictly contained to prevent mobile overflow) */}
      <div
        className="py-2 w-full max-w-full overflow-hidden select-none opacity-85 space-y-2"
        style={{ contain: 'paint', width: '100%', maxWidth: '100vw' }}
      >
        {/* Row 1: Solid & Outline Heavy Text */}
        <div className="animate-marquee gap-8 text-[clamp(3.2rem,8vw,7rem)] font-display uppercase tracking-tight leading-none text-white">
          <span>ELETROFUNK</span>
          <span className="text-stroke-purple">ELETROFUNK</span>
          <span>ELETROFUNK</span>
          <span className="text-stroke-magenta">ELETROFUNK</span>
          <span>ELETROFUNK</span>
          <span className="text-stroke-purple">ELETROFUNK</span>
        </div>

        {/* Row 2: Reverse Movement with Accent Text */}
        <div className="animate-marquee-reverse gap-8 text-[clamp(2.4rem,6vw,5.5rem)] font-display uppercase tracking-tight leading-none text-zinc-400">
          <span className="text-stroke-light">GRAVE & PRESSÃO</span>
          <span className="text-white">DJ HIRLA</span>
          <span className="text-stroke-light">GRAVE PESADO</span>
          <span className="text-[#F000B8]">ENERGIA TOTAL</span>
          <span className="text-stroke-light">GRAVE & PRESSÃO</span>
          <span className="text-white">DJ HIRLA</span>
        </div>
      </div>
    </section>
  );
};
