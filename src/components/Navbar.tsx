import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { ARTIST_CONFIG } from '../config/media.ts';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const next = window.scrollY > 40;
          setIsScrolled((prev) => (prev !== next ? next : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Momentos', href: '#momentos' },
    { label: 'Contratar', href: '#contratacoes' },
    { label: 'Sobre a DJ', href: '#experiencia' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#050505]/90 backdrop-blur-md border-b border-white/10 py-3.5 shadow-2xl'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="flex items-center gap-3 group whitespace-nowrap shrink-0"
            aria-label="DJ HIRLA Início"
          >
            <span className="font-display text-2xl sm:text-3xl tracking-wider text-white uppercase group-hover:text-[#F000B8] transition-colors">
              DJ HIRLA
            </span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 bg-[#8B2CFF]" />
            <span className="hidden sm:inline-block text-[11px] font-mono tracking-widest uppercase text-zinc-400">
              ELETROFUNK
            </span>
          </a>

          {/* Zone 2: 4 Clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-mono text-zinc-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-white transition-colors relative py-1 group whitespace-nowrap shrink-0"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#F000B8] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 Primary action */}
          <div className="hidden sm:flex items-center gap-4 shrink-0">
            <button
              onClick={() => {
                const el = document.getElementById('dados-evento') || document.getElementById('contratacoes');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-widest bg-white text-black hover:bg-[#F000B8] hover:text-white transition-all duration-200 whitespace-nowrap shrink-0 shadow-md group cursor-pointer"
            >
              <span>Contratar Show</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Hamburger Trigger */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 text-zinc-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B2CFF]"
            aria-label={isMobileOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-30 bg-[#050505]/98 backdrop-blur-2xl md:hidden flex flex-col justify-between p-6 pt-24 animate-fade-in">
          <div className="flex flex-col gap-6 text-center">
            <span className="text-xs font-mono tracking-widest text-[#8B2CFF] uppercase">
              Menu de Navegação
            </span>
            <div className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="font-display text-3xl uppercase tracking-wider text-white hover:text-[#F000B8] transition-colors py-1"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-6 border-t border-white/10">
            <button
              onClick={() => {
                setIsMobileOpen(false);
                const el = document.getElementById('dados-evento') || document.getElementById('contratacoes');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full py-3.5 text-center font-bold text-xs uppercase tracking-widest bg-gradient-to-r from-[#8B2CFF] to-[#F000B8] text-white shadow-lg shadow-[#8B2CFF]/25 cursor-pointer"
            >
              Contratar Show
            </button>
            <div className="flex justify-center gap-6 text-xs font-mono text-zinc-400">
              <a
                href={ARTIST_CONFIG.contacts.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Instagram {ARTIST_CONFIG.contacts.instagramHandle}
              </a>
              <span>•</span>
              <span>{ARTIST_CONFIG.contacts.whatsappNumber}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
