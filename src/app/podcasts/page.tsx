import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Podcast } from "@/types";
import { PlayCircle, Calendar, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";

const podcasts: Podcast[] = [
  {
    id: "1",
    title: "Clásicos del Rock - Episodio 12",
    description: "Un viaje por las mejores baladas de los 80s con Rocker. Incluye entrevistas y datos curiosos.",
    imageUrl: "https://placehold.co/600x400.png",
    date: "25 de Julio, 2024",
    audioUrl: "#",
    dataAiHint: "rock music podcast",
  },
  {
    id: "2",
    title: "Noches de Jazz - Especial Miles Davis",
    description: "Blue Note nos sumerge en la discografía de uno de los grandes del jazz. Un programa imperdible.",
    imageUrl: "https://placehold.co/600x400.png",
    date: "24 de Julio, 2024",
    audioUrl: "#",
    dataAiHint: "jazz music trumpet",
  },
  {
    id: "3",
    title: "Amanecer Esmerosound - Lo mejor de la semana",
    description: "DJ Sol recopila los momentos más divertidos y la mejor música de la semana para empezar el finde con energía.",
    imageUrl: "https://placehold.co/600x400.png",
    date: "26 de Julio, 2024",
    audioUrl: "#",
    dataAiHint: "morning show radio",
  },
];

export default function PodcastsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight font-headline">
          Podcasts y Programas On-Demand
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          ¿Te perdiste tu programa favorito? Escúchalo de nuevo cuando quieras.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {podcasts.map((podcast) => (
          <Card
            key={podcast.id}
            className="overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-xl flex flex-col"
          >
            <CardHeader className="p-0 relative">
              <Image
                src={podcast.imageUrl}
                alt={podcast.title}
                width={600}
                height={400}
                className="object-cover w-full h-48"
                data-ai-hint={podcast.dataAiHint}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
               <Button size="icon" className="absolute bottom-4 right-4 h-12 w-12 rounded-full">
                  <PlayCircle className="h-6 w-6" />
                </Button>
            </CardHeader>
            <CardContent className="p-6 flex flex-col flex-grow">
              <CardTitle className="font-headline text-xl mb-2">{podcast.title}</CardTitle>
              <CardDescription className="flex-grow mb-4">{podcast.description}</CardDescription>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-auto border-t pt-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{podcast.date}</span>
                  </div>
                   <div className="flex items-center gap-2">
                    <Headphones className="h-4 w-4 text-primary" />
                    <span>Escuchar ahora</span>
                  </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
