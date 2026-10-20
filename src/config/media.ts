/**
 * Central Media and Artist Configuration for DJ HIRLA
 * 
 * To integrate real photos and videos:
 * Place the corresponding files in the /public folder matching the paths below.
 * Components will automatically detect and render the real media.
 */

export interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  path: string;
  title: string;
  subtitle: string;
  badge: string;
  aspectRatio: string;
  spanClass: string;
  commentary?: string;
}

export const ARTIST_CONFIG = {
  name: 'DJ HIRLA',
  genre: 'Eletrofunk',
  tagline: 'O GRAVE NÃO PEDE LICENÇA.',
  subtagline: 'ELETROFUNK • ENERGIA • PRESENÇA',
  bio: 'Batidas intensas, energia contagiante e a identidade do eletrofunk em cada apresentação. DJ HIRLA leva uma atmosfera única para a pista.',
  
  contacts: {
    whatsappNumber: '+55 62 99262-7671',
    whatsappRaw: '5562992627671',
    instagramHandle: '@djhirla_',
    instagramUrl: 'https://www.instagram.com/djhirla_/',
    defaultBookingMessage: 'Olá! Gostaria de consultar a disponibilidade da DJ HIRLA para um evento.',
  },

  getWhatsappBookingUrl: (customMessage?: string) => {
    const message = customMessage || ARTIST_CONFIG.contacts.defaultBookingMessage;
    return `https://wa.me/${ARTIST_CONFIG.contacts.whatsappRaw}?text=${encodeURIComponent(message)}`;
  },

  media: {
    heroVideo: {
      path: '/videos/video.MP4',
      label: 'Hero Background Video',
      fallbackPoster: '/images/Hirla.png',
      format: 'MP4 HD Ao Vivo • DJ Hirla',
      targetLocation: 'public/videos/video.MP4',
    },
    
    experiencePhoto: {
      path: '/images/Hirla.png',
      title: 'DJ HIRLA — Oficial',
      format: 'Foto Oficial • Alta Definição',
      targetLocation: 'public/images/Hirla.png',
    },

    gallery: [
      {
        id: 'gallery-festival-video',
        type: 'video',
        path: '/videos/DJ_HIRLA_video_5MB.mp4',
        title: 'Aftermovie Oficial — Festival & Pirotecnia',
        subtitle: 'Palco principal, efeitos visuais, fumaça, chamas e multidão cantando com a DJ Hirla',
        commentary: 'Apresentação histórica em festival com estrutura de grande porte, canhões de fumaça, pirotecnia no drop e milhares de pessoas cantando junto em coro com a DJ Hirla.',
        badge: 'VÍDEO DE FESTIVAL',
        aspectRatio: 'aspect-[16/9]',
        spanClass: 'col-span-12 lg:col-span-7',
      },
      {
        id: 'gallery-live-01',
        type: 'image',
        path: '/images/tocando-1.PNG',
        title: 'DJ Hirla no Comando dos Decks',
        subtitle: 'Performance ao vivo e mixagem na cabine Pioneer',
        commentary: 'Foco, técnica e postura de palco conduzindo a pista com mixagens rápidas.',
        badge: 'FOTO AO VIVO',
        aspectRatio: 'aspect-[4/5]',
        spanClass: 'col-span-12 md:col-span-6 lg:col-span-5',
      },
      {
        id: 'gallery-video-01',
        type: 'video',
        path: '/videos/video.MP4',
        title: 'Show Ao Vivo — Drop do Grave',
        subtitle: 'A energia da pista no clímax da apresentação',
        commentary: 'O grave no comando e o público vibrando em sintonia com as viradas de eletrofunk.',
        badge: 'SHOW AO VIVO',
        aspectRatio: 'aspect-[16/9]',
        spanClass: 'col-span-12 md:col-span-6 lg:col-span-12',
      },
    ] as GalleryItem[],
  },
};
