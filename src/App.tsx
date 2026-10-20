/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { EletrofunkCommand } from './components/EletrofunkCommand.tsx';
import { Gallery } from './components/Gallery.tsx';
import { Booking } from './components/Booking.tsx';
import { Experience } from './components/Experience.tsx';
import { Footer } from './components/Footer.tsx';
import { ARTIST_CONFIG } from './config/media.ts';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] selection:bg-[#F000B8] selection:text-white flex flex-col font-body">
      {/* Fixed Header */}
      <Navbar />

      {/* Main Landing Page Sections */}
      <main className="flex-1">
        {/* 1. HERO / DJ HIRLA (Vídeo com áudio inicial + 10s fade-out suave) */}
        <Hero />

        {/* TRANSIÇÃO COM LETRAS INTERATIVAS ELETROFUNK */}
        <EletrofunkCommand />

        {/* 2. MOMENTOS & SHOWS (Segunda página principal) */}
        <Gallery />

        {/* 3. CONTRATAÇÕES (Entrar em contato: Atendimento 1º -> Atendimento Direto 2º) */}
        <Booking />

        {/* 4. SOBRE A DJ HIRLA / A EXPERIÊNCIA (Por último) */}
        <Experience />
      </main>

      {/* 5. RODAPÉ */}
      <Footer />

      {/* Mobile Floating Quick Message Button (< 50px, unobtrusive) */}
      <aside aria-label="Acesso rápido para contratar" className="sm:hidden fixed bottom-5 right-5 z-30">
        <button
          onClick={() => {
            const el = document.getElementById('dados-evento') || document.getElementById('contratacoes');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-[#8B2CFF] to-[#F000B8] text-white flex items-center justify-center shadow-2xl shadow-[#8B2CFF]/40 border border-white/20 active:scale-95 transition-transform cursor-pointer"
          aria-label="Montar dados do evento para contratar DJ Hirla"
        >
          <MessageCircle className="w-6 h-6 fill-white" />
        </button>
      </aside>
    </div>
  );
}
