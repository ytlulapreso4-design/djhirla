import React, { useState } from 'react';
import { MessageCircle, Calendar, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { ARTIST_CONFIG } from '../config/media.ts';

export const Booking: React.FC = () => {
  const [eventType, setEventType] = useState('Festival');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [producerName, setProducerName] = useState('');
  const [copied, setCopied] = useState(false);

  const eventTypes = [
    'Festival',
    'Casa Noturna / Club',
    'Sunset / Day Party',
    'Formatura / Universitária',
    'Evento Privado',
  ];

  const handleCustomWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();
    let text = `Olá! Gostaria de consultar a disponibilidade da DJ HIRLA para um evento.`;
    if (eventType) text += `\n- Tipo: ${eventType}`;
    if (location.trim()) text += `\n- Cidade/Estado: ${location.trim()}`;
    if (date.trim()) text += `\n- Data pretendida: ${date.trim()}`;
    if (producerName.trim()) text += `\n- Responsável/Produtora: ${producerName.trim()}`;

    window.open(ARTIST_CONFIG.getWhatsappBookingUrl(text), '_blank');
  };

  const copyPhoneNumber = () => {
    navigator.clipboard.writeText(ARTIST_CONFIG.contacts.whatsappNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contratacoes" className="relative py-24 sm:py-32 bg-[#08080a] text-[#F5F5F5] border-t border-white/5">
      
      {/* Background Stage Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-r from-[#8B2CFF]/15 to-[#F000B8]/15 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Strategic Booking Headline */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1 bg-white/5 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-[#F000B8]" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#8B2CFF]">
              Booking & Contratações
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white leading-tight">
            LEVE A ENERGIA DA DJ HIRLA PARA O SEU EVENTO.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-zinc-300 font-normal">
            Shows, festas, eventos e experiências com a intensidade do eletrofunk.
          </p>
        </div>

        {/* 2-Column Booking Section: 1º ATENDIMENTO (Formulário) -> 2º ATENDIMENTO DIRETO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* 1º BLOCO: ATENDIMENTO / MONTE OS DADOS DO SEU EVENTO */}
          <div className="lg:col-span-7">
            <div id="dados-evento" className="p-8 sm:p-10 bg-[#111114] border border-white/10 relative scroll-mt-24">
              
              <div className="mb-6">
                <span className="text-xs font-mono uppercase tracking-widest text-[#F000B8]">
                  Atendimento & Cotação
                </span>
                <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-wide text-white mt-1">
                  Monte os Dados do Seu Evento
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                  Selecione os detalhes abaixo para agilizar a proposta no WhatsApp oficial da artista.
                </p>
              </div>

              <form onSubmit={handleCustomWhatsAppSend} className="space-y-6">
                
                {/* Event Type Selector */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2.5">
                    Tipo de Evento:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {eventTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setEventType(type)}
                        className={`px-3.5 py-2 text-xs font-mono uppercase transition-all border ${
                          eventType === type
                            ? 'bg-white text-black border-white font-semibold'
                            : 'bg-white/5 text-zinc-400 border-white/10 hover:border-white/30 hover:text-white'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grid Inputs: Location & Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2">
                      Cidade / Estado:
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        placeholder="Ex: Goiânia - GO"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full bg-[#08080a] border border-white/10 focus:border-[#8B2CFF] text-sm text-white px-3 py-2.5 pl-9 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2">
                      Data Prevista:
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        placeholder="Ex: 15 de Novembro"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-[#08080a] border border-white/10 focus:border-[#8B2CFF] text-sm text-white px-3 py-2.5 pl-9 outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Producer / Contractor Name */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2">
                    Seu Nome ou Produtora (Opcional):
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Lucas / Produtora X"
                    value={producerName}
                    onChange={(e) => setProducerName(e.target.value)}
                    className="w-full bg-[#08080a] border border-white/10 focus:border-[#8B2CFF] text-sm text-white px-3 py-2.5 outline-none transition-colors"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full py-4 text-xs sm:text-sm font-bold uppercase tracking-widest bg-gradient-to-r from-[#8B2CFF] to-[#F000B8] text-white hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#8B2CFF]/20 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Consulta via WhatsApp Oficial</span>
                </button>

                <p className="text-[11px] font-mono text-center text-zinc-400">
                  Você será redirecionado para a conversa oficial no WhatsApp com os dados preenchidos.
                </p>

              </form>

            </div>
          </div>

          {/* 2º BLOCO: ATENDIMENTO DIRETO (Canais e Informações Oficiais) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            <div className="p-8 bg-[#111114] border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#8B2CFF]/10 blur-2xl pointer-events-none" />

              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                Canal Oficial de Booking
              </span>
              <h3 className="font-display text-2xl uppercase tracking-wide text-white mt-1 mb-4">
                Atendimento Direto
              </h3>

              <p className="text-sm text-zinc-300 leading-relaxed mb-6 font-body">
                Comunicação rápida e assertiva para produtores de eventos, diretores artísticos e contratantes em todo o Brasil.
              </p>

              <div className="space-y-4 pt-4 border-t border-white/10 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">WHATSAPP:</span>
                  <button
                    onClick={copyPhoneNumber}
                    className="text-white hover:text-[#8B2CFF] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{ARTIST_CONFIG.contacts.whatsappNumber}</span>
                    <span className="text-[10px] text-[#F000B8] border border-[#F000B8]/40 px-1 py-0.2">
                      {copied ? 'Copiado!' : 'Copiar'}
                    </span>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">INSTAGRAM:</span>
                  <a
                    href={ARTIST_CONFIG.contacts.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[#F000B8] transition-colors"
                  >
                    {ARTIST_CONFIG.contacts.instagramHandle}
                  </a>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">ESTILO:</span>
                  <span className="text-white">Eletrofunk / Som de Pista</span>
                </div>
              </div>

              {/* Button scrolling to the event data form */}
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('dados-evento') || document.getElementById('contratacoes');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="mt-8 w-full py-4 text-xs font-bold uppercase tracking-widest bg-white text-black hover:bg-[#F000B8] hover:text-white transition-all flex items-center justify-center gap-2 group shadow-lg cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>SOLICITAR CONTRATAÇÃO</span>
              </button>
            </div>

            {/* Contractor Assurance Points */}
            <div className="p-6 bg-white/[0.02] border border-white/5 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#8B2CFF] shrink-0 mt-0.5" />
                <p className="text-xs text-zinc-300">
                  <strong className="text-white">Rider Técnico Disponível:</strong> Especificações de cabine de som e iluminação para a melhor performance.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#8B2CFF] shrink-0 mt-0.5" />
                <p className="text-xs text-zinc-300">
                  <strong className="text-white">Logística Dinâmica:</strong> Atendimento para capitais e cidades do interior com facilidade de deslocamento.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#8B2CFF] shrink-0 mt-0.5" />
                <p className="text-xs text-zinc-300">
                  <strong className="text-white">Set Personalizado:</strong> Adaptação de dinâmica de palco de acordo com o perfil e horário da sua festa.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
