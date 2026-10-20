import React, { useEffect } from 'react';
import { X, Play, Volume2, ArrowRight } from 'lucide-react';
import { GalleryItem, ARTIST_CONFIG } from '../config/media.ts';

interface LightboxModalProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-6 md:p-10 animate-fade-in"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 p-2.5 text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
        aria-label="Fechar visualização"
      >
        <X className="w-6 h-6" />
      </button>

      <div
        className="relative max-w-5xl w-full bg-[#111114] border border-white/15 overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Media Container */}
        <div className="relative w-full bg-black min-h-[340px] max-h-[70vh] flex items-center justify-center overflow-hidden">
          {item.type === 'video' ? (
            <video
              src={item.path}
              controls
              autoPlay
              playsInline
              className="w-full max-h-[70vh] object-contain"
            >
              Seu navegador não suporta a reprodução deste vídeo.
            </video>
          ) : (
            <img
              src={item.path}
              alt={item.title}
              referrerPolicy="no-referrer"
              className="w-full max-h-[70vh] object-contain"
              onError={(e) => {
                // If image isn't in public yet, show styled message inside modal
                const target = e.currentTarget;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent && !parent.querySelector('.modal-fallback')) {
                  const fallbackDiv = document.createElement('div');
                  fallbackDiv.className = 'modal-fallback p-12 text-center flex flex-col items-center justify-center';
                  fallbackDiv.innerHTML = `
                    <div class="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-[#8B2CFF]">
                      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    </div>
                    <h3 class="text-xl font-bold font-display uppercase tracking-wider text-white mb-2">${item.title}</h3>
                    <p class="text-sm text-zinc-400 max-w-md mb-4">${item.subtitle}</p>
                    <code class="text-xs font-mono text-[#8B2CFF] bg-black/60 px-3 py-1 border border-white/10">Arquivo aguardado: public${item.path}</code>
                  `;
                  parent.appendChild(fallbackDiv);
                }
              }}
            />
          )}
        </div>

        {/* Modal Info Bar */}
        <div className="p-6 bg-[#0E0E11] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-mono tracking-wider uppercase text-[#F000B8] font-semibold">
                {item.badge}
              </span>
              <span className="text-zinc-500 font-mono text-xs">/</span>
              <span className="text-xs text-zinc-400 font-mono">
                {item.type === 'video' ? 'ÁUDIO & VÍDEO' : 'FOTOGRAFIA DE ALTA RESOLUÇÃO'}
              </span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl text-white uppercase tracking-wide">
              {item.title}
            </h3>
            <p className="text-sm text-zinc-400 mt-0.5">{item.subtitle}</p>
            {item.commentary && (
              <p className="mt-3 text-xs sm:text-sm text-zinc-300 bg-white/5 border border-white/10 p-3 max-w-2xl font-mono">
                <span className="text-[#F000B8] font-semibold">Comentário: </span>
                {item.commentary}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                onClose();
                setTimeout(() => {
                  const el = document.getElementById('dados-evento') || document.getElementById('contratacoes');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }, 120);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#8B2CFF] to-[#F000B8] text-white hover:brightness-110 transition-all shadow-lg shadow-[#8B2CFF]/20 cursor-pointer"
            >
              <span>Contratar DJ Hirla</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
