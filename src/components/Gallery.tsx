import React, { useState } from 'react';
import { Camera, Film, Grid, Sparkles, Eye, ArrowUpRight } from 'lucide-react';
import { ARTIST_CONFIG, GalleryItem } from '../config/media.ts';
import { MediaSlot } from './MediaSlot.tsx';
import { LightboxModal } from './LightboxModal.tsx';

export const Gallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'image' | 'video'>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems = ARTIST_CONFIG.media.gallery.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.type === activeFilter;
  });

  return (
    <section id="momentos" className="relative py-24 sm:py-32 bg-[#050505] text-[#F5F5F5] border-t border-white/5">
      
      {/* Background Glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#8B2CFF]/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-[#F000B8]/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-8 border-b border-white/10">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white">
              MOMENTOS & SHOWS.
            </h2>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#111114] border border-white/10">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors ${
                activeFilter === 'all'
                  ? 'bg-white text-black font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Todos ({ARTIST_CONFIG.media.gallery.length})
            </button>
            <button
              onClick={() => setActiveFilter('image')}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
                activeFilter === 'image'
                  ? 'bg-white text-black font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Fotos</span>
            </button>
            <button
              onClick={() => setActiveFilter('video')}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
                activeFilter === 'video'
                  ? 'bg-white text-black font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Vídeos</span>
            </button>
          </div>
        </div>

        {/* Media Integration Architecture Notice */}
        <div className="mb-10 p-4 bg-[#111114]/90 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-zinc-300">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#F000B8] animate-pulse" />
            <span className="text-white font-semibold">
              Mídias Oficiais DJ HIRLA • Registros Reais de Palco & Estúdio
            </span>
          </div>
          <span className="text-zinc-400">
            Clique em qualquer foto ou vídeo para reproduzir em tela cheia
          </span>
        </div>

        {/* Asymmetrical Editorial Gallery Grid */}
        <div className="grid grid-cols-12 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`${item.spanClass} transition-transform duration-300 flex flex-col`}
            >
              <MediaSlot
                type={item.type}
                src={item.path}
                poster={item.poster}
                title={item.title}
                subtitle={item.subtitle}
                badge={item.badge}
                aspectRatio={item.aspectRatio}
                showPlayButton={item.type === 'video'}
                onClick={() => setSelectedItem(item)}
                className="shadow-xl"
              />

              {/* Editorial Commentary for each item */}
              {item.commentary && (
                <div className="mt-3 p-4 bg-[#0e0e12] border border-white/10 flex flex-col gap-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F000B8]" />
                    <span className="text-[10px] font-mono text-[#F000B8] uppercase tracking-wider font-semibold">
                      {item.id === 'gallery-festival-video' ? 'DESTAQUE DO FESTIVAL' : item.type === 'video' ? 'COMENTÁRIO DO VÍDEO' : 'REGISTRO DE CABINE'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 font-body leading-relaxed">
                    {item.commentary}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Instagram Callout Strip */}
        <div className="mt-16 pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
              Acompanhe os bastidores e novos lançamentos
            </span>
            <p className="font-display text-2xl text-white uppercase mt-1">
              Instagram Oficial: <span className="text-[#F000B8]">{ARTIST_CONFIG.contacts.instagramHandle}</span>
            </p>
          </div>

          <a
            href={ARTIST_CONFIG.contacts.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-widest bg-white/5 hover:bg-white/10 border border-white/20 text-white hover:border-[#F000B8] transition-all"
          >
            <span>Ver no Instagram</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </section>
  );
};
