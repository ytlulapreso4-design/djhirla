import React from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { ARTIST_CONFIG } from '../config/media.ts';
import { MediaSlot } from './MediaSlot.tsx';

export const Experience: React.FC = () => {
  return (
    <section id="experiencia" className="relative py-20 sm:py-28 bg-[#050505] text-[#F5F5F5] overflow-hidden border-t border-white/5">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#8B2CFF]/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-[#F000B8]/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 2-Column Split: Pure Artist Visual + Editorial Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: DJ Hirla Visual */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Frame Accent Lines */}
              <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-[#8B2CFF] pointer-events-none" />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-[#F000B8] pointer-events-none" />

              {/* Clean Media Slot for DJ Hirla without any 'Foto Oficial' tags or labels */}
              <MediaSlot
                type="image"
                src={ARTIST_CONFIG.media.experiencePhoto.path}
                alt="DJ HIRLA"
                title=""
                subtitle=""
                badge=""
                hideOverlayInfo={true}
                aspectRatio="aspect-[4/5]"
                objectFit="contain"
                className="w-full shadow-2xl bg-gradient-to-b from-[#1c0a15] via-[#111114] to-[#0a0a0c]"
              />
            </div>
          </div>

          {/* Right Column: Editorial Message & Booking Hook */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-8">
            <div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white leading-[1.05]">
                NÃO É SÓ MÚSICA.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-[#F000B8]">
                  É EXPERIÊNCIA.
                </span>
              </h2>

              <p className="mt-6 text-base sm:text-lg text-zinc-300 font-normal leading-relaxed">
                {ARTIST_CONFIG.bio}
              </p>

              <p className="mt-4 text-xs sm:text-sm font-mono text-zinc-400 leading-relaxed uppercase tracking-wider">
                A fusão autêntica da pressão eletrônica de festival com o ritmo do funk brasileiro para incendiar a sua pista.
              </p>
            </div>

            {/* Direct Booking Hook */}
            <div className="p-6 bg-gradient-to-r from-[#111114] to-[#181124] border border-[#8B2CFF]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-[#F000B8]">
                  Disponibilidade para Shows
                </p>
                <p className="font-display text-lg text-white uppercase mt-0.5">
                  Consulte datas para seu evento ou festival
                </p>
              </div>

              <button
                onClick={() => {
                  const el = document.getElementById('dados-evento') || document.getElementById('contratacoes');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider bg-white text-black hover:bg-[#8B2CFF] hover:text-white transition-all whitespace-nowrap shrink-0 shadow-lg cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Montar Proposta de Evento</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
