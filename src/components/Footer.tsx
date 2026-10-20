import React from 'react';
import { ArrowUp, Instagram, MessageCircle } from 'lucide-react';
import { ARTIST_CONFIG } from '../config/media.ts';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#050505] text-[#F5F5F5] border-t border-white/10 pt-16 sm:pt-20 pb-12 overflow-hidden">
      
      {/* Subtle Bottom Ambient Aura */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-36 bg-[#8B2CFF]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Area: Giant Signature & Direct Contact Links */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-white/10">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#8B2CFF] block mb-2">
              Site Oficial da Artista
            </span>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl uppercase tracking-normal text-white">
              DJ HIRLA
            </h2>
            <p className="font-mono text-xs sm:text-sm text-zinc-400 uppercase tracking-widest mt-1">
              Eletrofunk • Graves & Experiência Ao Vivo
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={ARTIST_CONFIG.contacts.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 text-xs font-mono uppercase tracking-wider bg-white/5 hover:bg-white/10 border border-white/10 text-white hover:border-[#F000B8] transition-all"
            >
              <Instagram className="w-4 h-4 text-[#F000B8]" />
              <span>Instagram</span>
            </a>

            <a
              href={ARTIST_CONFIG.getWhatsappBookingUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 text-xs font-mono uppercase tracking-wider bg-white/5 hover:bg-white/10 border border-white/10 text-white hover:border-[#8B2CFF] transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#8B2CFF]" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={scrollToTop}
              className="p-3 text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              aria-label="Voltar ao topo da página"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div>
            © {currentYear} DJ HIRLA. Todos os direitos reservados.
          </div>

          <div className="flex items-center gap-4 text-zinc-400">
            <span>Goiás / Brasil</span>
            <span>•</span>
            <span className="text-zinc-300">O grave não pede licença.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
