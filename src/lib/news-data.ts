import type { NewsArticle } from "@/types";

export const newsArticles: NewsArticle[] = [
  {
    id: "1",
    title: "Nuevo Show de Mañana: 'Amanecer Esmerosound'",
    excerpt: "Sintoniza cada mañana para empezar tu día con la mejor energía y la música que te gusta.",
    content: "Prepárate para una dosis diaria de optimismo y buena música. 'Amanecer Esmerosound' es nuestro nuevo programa matutino, diseñado para acompañarte desde que suena el despertador. Con la conducción de DJ Sol, disfrutarás de una selección musical vibrante, noticias positivas, y segmentos interactivos para que empieces el día con el pie derecho. ¡Te esperamos de lunes a viernes de 6:00 a 9:00!",
    imageUrl: "https://placehold.co/600x400.png",
    category: "Novedades",
    date: "2024-07-28",
    dataAiHint: "morning radio",
  },
  {
    id: "2",
    title: "Entrevista Exclusiva con Artista Local",
    excerpt: "Este viernes, no te pierdas nuestra charla con la revelación musical de la ciudad.",
    content: "Este viernes en 'Nuevas Olas', tendremos el placer de conversar con 'Luna Carmesí', la banda local que está revolucionando la escena indie. Hablaremos sobre su proceso creativo, su nuevo EP y sus planes a futuro. Además, nos regalarán una versión acústica de su último sencillo. Una oportunidad única para conocer de cerca a los talentos de nuestra ciudad. ¡No te lo puedes perder!",
    imageUrl: "https://placehold.co/600x400.png",
    category: "Entrevistas",
    date: "2024-07-27",
    dataAiHint: "musician interview",
  },
  {
    id: "3",
    title: "Top 10: Las canciones más sonadas de la semana",
    excerpt: "Descubre si tu canción favorita llegó a la cima de nuestro ranking semanal.",
    content: "Como cada semana, te traemos el recuento de las canciones que más han sonado en Esmerosound y que ustedes más han pedido. ¿Habrá nuevo número uno? ¿Se mantendrá el hit de la semana pasada en la cima? Acompáñanos en este recorrido musical y descubre las tendencias que están marcando el ritmo. ¡Participa en nuestras redes sociales y dinos cuál es tu favorita!",
    imageUrl: "https://placehold.co/600x400.png",
    category: "Música",
    date: "2024-07-26",
    dataAiHint: "music chart",
  },
];
