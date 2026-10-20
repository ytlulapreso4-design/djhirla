import React from 'react';

export const EletrofunkCommand: React.FC = () => {
  return (
    <section
      id="eletrofunk"
      className="relative py-12 sm:py-16 bg-[#050505] text-[#F5F5F5] overflow-hidden border-t border-b border-white/5"
    >
      {/* Background Lighting Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-[#8B2CFF]/10 blur-[150px] pointer-events-none rounded-full" />

      {/* Giant Moving Marquee Rows (GPU Compositor Accelerated, zero jank on mobile) */}
      <div className="py-2 overflow-hidden select-none opacity-85 space-y-2">
        {/* Row 1: Solid & Outline Heavy Text */}
        <div className="animate-marquee gap-8 text-[clamp(3.8rem,9vw,8rem)] font-display uppercase tracking-tight leading-none text-white">
          <span>ELETROFUNK</span>
          <span className="text-stroke-purple">ELETROFUNK</span>
          <span>ELETROFUNK</span>
          <span className="text-stroke-magenta">ELETROFUNK</span>
          <span>ELETROFUNK</span>
          <span className="text-stroke-purple">ELETROFUNK</span>
          <span>ELETROFUNK</span>
          <span className="text-stroke-purple">ELETROFUNK</span>
          <span>ELETROFUNK</span>
          <span className="text-stroke-magenta">ELETROFUNK</span>
          <span>ELETROFUNK</span>
          <span className="text-stroke-purple">ELETROFUNK</span>
        </div>

        {/* Row 2: Reverse Movement with Accent Text */}
        <div className="animate-marquee-reverse gap-8 text-[clamp(2.8rem,7vw,6.5rem)] font-display uppercase tracking-tight leading-none text-zinc-400">
          <span className="text-stroke-light">GRAVE & PRESSÃO</span>
          <span className="text-white">DJ HIRLA</span>
          <span className="text-stroke-light">GRAVE PESADO</span>
          <span className="text-[#F000B8]">ENERGIA TOTAL</span>
          <span className="text-stroke-light">GRAVE & PRESSÃO</span>
          <span className="text-white">DJ HIRLA</span>
          <span className="text-stroke-light">GRAVE PESADO</span>
          <span className="text-[#F000B8]">ENERGIA TOTAL</span>
        </div>
      </div>
    </section>
  );
};
