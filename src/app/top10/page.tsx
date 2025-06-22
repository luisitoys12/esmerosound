"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { TopSong } from "@/types";
import { ListOrdered } from "lucide-react";
import { Button } from "@/components/ui/button";

const topSongs: TopSong[] = [
  { rank: 1, title: "Ritmo Cósmico", artist: "Orion", albumCoverUrl: "https://placehold.co/100x100.png", dataAiHint: "space galaxy", youtubeVideoId: "dQw4w9WgXcQ" },
  { rank: 2, title: "Noche de Neón", artist: "Cyberpunkers", albumCoverUrl: "https://placehold.co/100x100.png", dataAiHint: "neon city", youtubeVideoId: "dQw4w9WgXcQ" },
  { rank: 3, title: "Corazón de Acero", artist: "La Máquina", albumCoverUrl: "https://placehold.co/100x100.png", dataAiHint: "metal heart", youtubeVideoId: "dQw4w9WgXcQ" },
  { rank: 4, title: "Viento del Desierto", artist: "Sol y Arena", albumCoverUrl: "https://placehold.co/100x100.png", dataAiHint: "desert wind", youtubeVideoId: "dQw4w9WgXcQ" },
  { rank: 5, title: "Olas de Tranquilidad", artist: "Mar Profundo", albumCoverUrl: "https://placehold.co/100x100.png", dataAiHint: "ocean waves", youtubeVideoId: "dQw4w9WgXcQ" },
  { rank: 6, title: "Frecuencia Urbana", artist: "DJ Metro", albumCoverUrl: "https://placehold.co/100x100.png", dataAiHint: "city street", youtubeVideoId: "dQw4w9WgXcQ" },
  { rank: 7, title: "Eco en la Montaña", artist: "Cumbres", albumCoverUrl: "https://placehold.co/100x100.png", dataAiHint: "mountain landscape", youtubeVideoId: "dQw4w9WgXcQ" },
  { rank: 8, title: "Jardín Secreto", artist: "Flora", albumCoverUrl: "https://placehold.co/100x100.png", dataAiHint: "secret garden", youtubeVideoId: "dQw4w9WgXcQ" },
  { rank: 9, title: "Luces del Norte", artist: "Aurora", albumCoverUrl: "https://placehold.co/100x100.png", dataAiHint: "aurora borealis", youtubeVideoId: "dQw4w9WgXcQ" },
  { rank: 10, title: "Pulso Eléctrico", artist: "Voltaje", albumCoverUrl: "https://placehold.co/100x100.png", dataAiHint: "electric pulse", youtubeVideoId: "dQw4w9WgXcQ" },
];

export default function Top10Page() {
  const [selectedSong, setSelectedSong] = useState<TopSong | null>(null);

  return (
    <>
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
                    <TableCell className="font-bold text-xl text-muted-foreground">
                      {song.rank}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 rounded-md">
                          <AvatarImage
                            src={song.albumCoverUrl}
                            alt={song.title}
                            data-ai-hint={song.dataAiHint}
                          />
                          <AvatarFallback>{song.title.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <Button
                            variant="link"
                            onClick={() => setSelectedSong(song)}
                            className="p-0 h-auto font-semibold text-current hover:text-primary transition-colors"
                          >
                            {song.title}
                          </Button>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {song.artist}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog
        open={!!selectedSong}
        onOpenChange={(isOpen) => {
          if (!isOpen) setSelectedSong(null);
        }}
      >
        <DialogContent className="max-w-2xl p-4">
          {selectedSong && (
            <>
              <DialogHeader>
                <DialogTitle>
                  {selectedSong.title} - {selectedSong.artist}
                </DialogTitle>
              </DialogHeader>
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${selectedSong.youtubeVideoId}?autoplay=1`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
