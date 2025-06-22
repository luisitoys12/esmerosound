import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { RadioEvent } from "@/types";
import { Calendar, MapPin, Clock } from "lucide-react";

const events: RadioEvent[] = [
  {
    id: "1",
    title: "Concierto Acústico en el Parque",
    description: "Una tarde de música en vivo con artistas locales. Trae tu manta y disfruta del ambiente.",
    imageUrl: "https://placehold.co/600x400.png",
    date: "15 de Agosto, 2024",
    time: "18:00",
    location: "Parque Central",
    dataAiHint: "acoustic concert park",
  },
  {
    id: "2",
    title: "Noche de DJ's: Batalla de Beats",
    description: "Los mejores DJ's de la ciudad compiten por el trofeo de Esmerosound. ¡No te lo pierdas!",
    imageUrl: "https://placehold.co/600x400.png",
    date: "22 de Agosto, 2024",
    time: "21:00",
    location: "Club Nocturno 'El Sótano'",
    dataAiHint: "dj battle nightclub",
  },
  {
    id: "3",
    title: "Feria de Vinilos y Coleccionables",
    description: "Encuentra joyas musicales y conoce a otros coleccionistas. Habrá música y stands de comida.",
    imageUrl: "https://placehold.co/600x400.png",
    date: "05 de Septiembre, 2024",
    time: "11:00 - 19:00",
    location: "Centro de Convenciones",
    dataAiHint: "vinyl records fair",
  },
];

export default function EventsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight font-headline">
          Próximos Eventos
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          No te pierdas los eventos que Esmerosound tiene para ti. ¡Marca tu calendario y únete a la diversión!
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card
            key={event.id}
            className="overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-xl flex flex-col"
          >
            <CardHeader className="p-0">
              <Image
                src={event.imageUrl}
                alt={event.title}
                width={600}
                height={400}
                className="object-cover w-full h-48"
                data-ai-hint={event.dataAiHint}
              />
            </CardHeader>
            <CardContent className="p-6 flex flex-col flex-grow">
              <CardTitle className="font-headline text-xl mb-2">{event.title}</CardTitle>
              <CardDescription className="flex-grow mb-4">{event.description}</CardDescription>
              <div className="space-y-2 text-sm text-muted-foreground mt-auto border-t pt-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{event.location}</span>
                  </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
