import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { TopSong } from "@/types";
import { ListOrdered } from "lucide-react";

const topSongs: TopSong[] = [
  { rank: 1, title: "Ritmo Cósmico", artist: "Orion", albumCoverUrl: "https://placehold.co/100x100.png", dataAiHint: "space galaxy", youtubeUrl: "https://www.youtube.com" },
  { rank: 2, title: "Noche de Neón", artist: "Cyberpunkers", albumCoverUrl: "https://placehold.co/100x100.png", dataAiHint: "neon city", youtubeUrl: "https://www.youtube.com" },
  { rank: 3, title: "Corazón de Acero", artist: "La Máquina", albumCoverUrl: "https://placehold.co/100x100.png", dataAiHint: "metal heart", youtubeUrl: "https://www.youtube.com" },
  { rank: 4, title: "Viento del Desierto", artist: "Sol y Arena", albumCoverUrl: "https://placehold.co/100x100.png", dataAiHint: "desert wind", youtubeUrl: "https://www.youtube.com" },
  { rank: 5, title: "Olas de Tranquilidad", artist: "Mar Profundo", albumCoverUrl: "https://placehold.co/100x100.png", dataAiHint: "ocean waves", youtubeUrl: "https://www.youtube.com" },
  { rank: 6, title: "Frecuencia Urbana", artist: "DJ Metro", albumCoverUrl: "https://placehold.co/100x100.png", dataAiHint: "city street", youtubeUrl: "https://www.youtube.com" },
  { rank: 7, title: "Eco en la Montaña", artist: "Cumbres", albumCoverUrl: "https://placehold.co/100x100.png", dataAiHint: "mountain landscape", youtubeUrl: "https://www.youtube.com" },
  { rank: 8, title: "Jardín Secreto", artist: "Flora", albumCoverUrl: "https://placehold.co/100x100.png", dataAiHint: "secret garden", youtubeUrl: "https://www.youtube.com" },
  { rank: 9, title: "Luces del Norte", artist: "Aurora", albumCoverUrl: "https://placehold.co/100x100.png", dataAiHint: "aurora borealis", youtubeUrl: "https://www.youtube.com" },
  { rank: 10, title: "Pulso Eléctrico", artist: "Voltaje", albumCoverUrl: "https://placehold.co/100x100.png", dataAiHint: "electric pulse", youtubeUrl: "https://www.youtube.com" },
];

export default function Top10Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-3xl flex items-center gap-2">
            <ListOrdered className="h-8 w-8 text-primary" />
            Top 10 de la Semana
          </CardTitle>
          <CardDescription>
            Las canciones más populares en Esmerosound esta semana.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Rank</TableHead>
                <TableHead>Canción</TableHead>
                <TableHead className="text-right">Artista</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topSongs.map((song) => (
                <TableRow key={song.rank}>
                  <TableCell className="font-bold text-xl text-muted-foreground">{song.rank}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 rounded-md">
                        <AvatarImage src={song.albumCoverUrl} alt={song.title} data-ai-hint={song.dataAiHint} />
                        <AvatarFallback>{song.title.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <a
                            href={song.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold hover:underline hover:text-primary transition-colors"
                        >
                            {song.title}
                        </a>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">{song.artist}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
