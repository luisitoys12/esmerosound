import Image from "next/image";
import Player from "@/components/player";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { TeamMember } from "@/types";
import LiveClock from "@/components/live-clock";
import { newsArticles } from "@/lib/news-data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
      <LiveClock />
      <section className="mb-12">
        <Player />
      </section>

      <section id="noticias" className="mb-12">
        <h2 className="mb-6 text-3xl font-bold tracking-tight text-center font-headline">
          Últimas Noticias
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {newsArticles.map((article) => (
            <Card
              key={article.id}
              className="overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-xl flex flex-col"
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
              <CardContent className="p-6 flex-grow">
                <Badge variant="secondary" className="mb-2">
                  {article.category}
                </Badge>
                <h3 className="mb-2 text-xl font-semibold font-headline">
                  {article.title}
                </h3>
                <p className="text-muted-foreground">{article.excerpt}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0 mt-auto">
                <Button asChild variant="link" className="p-0 h-auto font-semibold">
                  <Link href={`/noticias/${article.id}`}>
                    Ver más
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
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
