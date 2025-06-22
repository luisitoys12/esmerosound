import Image from "next/image";
import Player from "@/components/player";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { NewsArticle, TeamMember } from "@/types";

const newsArticles: NewsArticle[] = [
  {
    id: "1",
    title: "Nuevo Show de Mañana: 'Amanecer Esmerosound'",
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

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "DJ Sol",
    role: "Anfitrión de 'Amanecer Esmerosound'",
    imageUrl: "https://placehold.co/200x200.png",
    dataAiHint: "dj portrait",
  },
  {
    id: "2",
    name: "Rocker",
    role: "Experto en 'Clásicos del Rock'",
    imageUrl: "https://placehold.co/200x200.png",
    dataAiHint: "rocker portrait",
  },
  {
    id: "3",
    name: "Blue Note",
    role: "La voz del Jazz y Blues",
    imageUrl: "https://placehold.co/200x200.png",
    dataAiHint: "jazz musician",
  },
    {
    id: "4",
    name: "Party Mix",
    role: "DJ de 'Viernes de Fiesta'",
    imageUrl: "https://placehold.co/200x200.png",
    dataAiHint: "club dj",
  },
]

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <Player />
      </section>

      <section className="mb-12">
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
      
      <section>
        <h2 className="mb-6 text-3xl font-bold tracking-tight text-center font-headline">
          Nuestro Equipo
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <Card key={member.id} className="text-center border-0 bg-transparent shadow-none">
              <CardContent className="p-0">
                  <Avatar className="h-32 w-32 mx-auto mb-4 rounded-full">
                    <AvatarImage src={member.imageUrl} alt={member.name} data-ai-hint={member.dataAiHint} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                <h3 className="mb-1 text-lg font-semibold font-headline">
                  {member.name}
                </h3>
                <p className="text-muted-foreground">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

    </div>
  );
}
