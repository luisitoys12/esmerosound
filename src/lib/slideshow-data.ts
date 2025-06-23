import type { Slide } from "@/types";

export const slides: Slide[] = [
  {
    id: "1",
    title: "¡Nuevo Show de Rock!",
    description: "Sintoniza 'Clásicos del Rock' todos los lunes a las 12:00.",
    imageUrl: "https://placehold.co/1200x600.png",
    linkUrl: "/schedule",
    dataAiHint: "rock music guitar",
  },
  {
    id: "2",
    title: "Pide tu Canción Favorita",
    description: "Ve a nuestra sección de solicitudes y haz que tu música suene.",
    imageUrl: "https://placehold.co/1200x600.png",
    linkUrl: "/requests",
    dataAiHint: "music requests headphones",
  },
  {
    id: "3",
    title: "Escucha Nuestros Podcasts",
    description: "No te pierdas los programas grabados, disponibles on-demand.",
    imageUrl: "https://placehold.co/1200x600.png",
    linkUrl: "/podcasts",
    dataAiHint: "podcast microphone",
  },
];
