import Image from "next/image";
import Player from "@/components/player";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { NewsArticle } from "@/types";

const newsArticles: NewsArticle[] = [
  {
    id: "1",
    title: "Nuevo Show de Mañana: 'Amanecer Esmeralda'",
    excerpt: "Sintoniza cada mañana para empezar tu día con la mejor energía y la música que te gusta.",
    imageUrl: "https://placehold.co/600x400.png",
    category: "Novedades",
    date: "2024-07-28",
    dataAiHint: "morning radio",
  },
  {
    id: "2",
    title: "Entrevista Exclusiva con Artista Local",
    excerpt: "Este viernes, no te pierdas nuestra charla con la revelación musical de la ciudad.",
    imageUrl: "https://placehold.co/600x400.png",
    category: "Entrevistas",
    date: "2024-07-27",
    dataAiHint: "musician interview",
  },
  {
    id: "3",
    title: "Top 10: Las canciones más sonadas de la semana",
    excerpt: "Descubre si tu canción favorita llegó a la cima de nuestro ranking semanal.",
    imageUrl: "https://placehold.co/600x400.png",
    category: "Música",
    date: "2024-07-26",
    dataAiHint: "music chart",
  },
];

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <Player />
      </section>

      <section>
        <h2 className="mb-6 text-3xl font-bold tracking-tight text-center font-headline">
          Últimas Noticias
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {newsArticles.map((article) => (
            <Card
              key={article.id}
              className="overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-xl"
            >
              <CardHeader className="p-0">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  width={600}
                  height={400}
                  className="object-cover w-full h-48"
                  data-ai-hint={article.dataAiHint}
                />
              </CardHeader>
              <CardContent className="p-6">
                <Badge variant="secondary" className="mb-2">
                  {article.category}
                </Badge>
                <h3 className="mb-2 text-xl font-semibold font-headline">
                  {article.title}
                </h3>
                <p className="text-muted-foreground">{article.excerpt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}