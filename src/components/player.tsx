"use client";

import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Radio,
  History,
  RefreshCw,
  Download,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { AzuracastNowPlaying, Schedule, Show } from "@/types";
import { schedule, daysOfWeek } from "@/lib/schedule-data";

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.75);
  const [metadata, setMetadata] = useState<AzuracastNowPlaying | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [currentShow, setCurrentShow] = useState<string>("Música sin interrupciones");
  const [nextShow, setNextShow] = useState<string>("Cargando...");
  const [installPrompt, setInstallPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    installPrompt.userChoice.then((choiceResult: { outcome: string }) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      setInstallPrompt(null);
    });
  };

  useEffect(() => {
    const updateShowInfo = () => {
      const now = new Date();
      const dayIndex = now.getDay();
      const dayName = daysOfWeek[dayIndex] as keyof Schedule;
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      const showsForToday = schedule[dayName] || [];
      let currentS: Show | null = null;
      let nextS: Show | null = null;

      for (let i = 0; i < showsForToday.length; i++) {
        const show = showsForToday[i];
        const [startTime, endTime] = show.time.split(" - ");
        
        if (currentTime >= startTime && currentTime < endTime) {
          currentS = show;
          if (i + 1 < showsForToday.length) {
            nextS = showsForToday[i + 1];
          } else {
            const nextDayIndex = (dayIndex + 1) % 7;
            const nextDayName = daysOfWeek[nextDayIndex] as keyof Schedule;
            nextS = schedule[nextDayName][0];
          }
          break;
        }
      }

      setCurrentShow(currentS ? currentS.name : "Música sin interrupciones");
      if (nextS) {
        const [nextStartTime] = nextS.time.split(" - ");
        setNextShow(`${nextStartTime} - ${nextS.name}`);
      } else {
        setNextShow("Programación no disponible");
      }
    };

    updateShowInfo();
    const interval = setInterval(updateShowInfo, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const fetchMetadata = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const response = await fetch(
        `https://radio.trabullnetwork.pro/api/nowplaying/esmerosound?${new Date().getTime()}`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data: AzuracastNowPlaying = await response.json();
      setMetadata(data);
    } catch (error) {
      console.error("Error fetching metadata:", error);
      setMetadata((prev) => {
        const offlineSong = {
          title: "Estación Offline",
          artist: "No se pudo cargar la información.",
          id: "", text: "", album: "", art: ""
        };
        if (prev?.is_online === false) return prev;
        if (prev) return { ...prev, is_online: false, now_playing: { song: offlineSong } };
        return {
          station: { name: "Esmerosound" },
          now_playing: { song: offlineSong },
          song_history: [],
          is_online: false,
        };
      });
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchMetadata();
    const interval = setInterval(fetchMetadata, 10000);
    return () => clearInterval(interval);
  }, [fetchMetadata]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (isMuted && value[0] > 0) {
      setIsMuted(false);
    }
  };

  const songTitle = metadata?.now_playing?.song?.title || "Cargando...";
  const artistName = metadata?.now_playing?.song?.artist || "Esmerosound";
  const albumArt =
    metadata?.now_playing?.song?.art || "https://placehold.co/400x400.png";
  const isOnline = metadata?.is_online ?? false;
  const songHistory = metadata?.song_history?.slice(1, 6) || [];

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-2xl rounded-xl overflow-hidden bg-card/80 backdrop-blur-sm">
      <div className="md:flex">
        <div className="md:w-1/3 relative">
          <Image
            src={albumArt}
            alt={artistName}
            width={400}
            height={400}
            className="object-cover w-full h-full"
            data-ai-hint="radio album"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                {isOnline ? (
                  <div className="flex items-center gap-2 text-primary">
                    <Radio className="h-4 w-4 animate-pulse" />
                    <span>EN VIVO</span>
                  </div>
                ) : (
                  <div className="bg-destructive text-destructive-foreground px-2 py-0.5 rounded-md text-xs font-semibold">
                    OFFLINE
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" disabled={!isOnline || songHistory.length === 0}>
                      <History className="h-5 w-5" />
                      <span className="sr-only">Historial de canciones</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">
                          Reproducidas recientemente
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Las últimas canciones que han sonado.
                        </p>
                      </div>
                      <div className="grid gap-2">
                        {songHistory.length > 0 ? (
                          songHistory.map((item) => (
                            <div key={item.song.id + item.played_at} className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage
                                  src={item.song.art}
                                  alt={item.song.title}
                                />
                                <AvatarFallback>
                                  {item.song.title.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium truncate">
                                  {item.song.title}
                                </p>
                                <p className="text-xs text-muted-foreground truncate">
                                  {item.song.artist}
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            No hay historial disponible.
                          </p>
                        )}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={fetchMetadata}
                  disabled={isRefreshing}
                >
                  <RefreshCw
                    className={`h-5 w-5 ${
                      isRefreshing ? "animate-spin" : ""
                    }`}
                  />
                  <span className="sr-only">Refrescar</span>
                </Button>
                {installPrompt && (
                  <Button variant="ghost" size="icon" onClick={handleInstallClick}>
                    <Download className="h-5 w-5" />
                    <span className="sr-only">Instalar App</span>
                  </Button>
                )}
                <Button variant="ghost" size="icon">
                  <Maximize2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="my-4">
              <p className="text-xs uppercase tracking-wider text-primary font-semibold">AHORA</p>
              <p className="text-base font-medium truncate">{currentShow}</p>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mt-2">SIGUE</p>
              <p className="text-sm text-muted-foreground truncate">{nextShow}</p>
            </div>

            <h2 className="text-3xl font-bold font-headline tracking-tight">
              {songTitle}
            </h2>
            <p className="text-muted-foreground text-lg">{artistName}</p>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="w-16 h-16"
                onClick={togglePlay}
                disabled={!isOnline}
              >
                {isPlaying ? (
                  <Pause className="h-10 w-10" />
                ) : (
                  <Play className="h-10 w-10" />
                )}
              </Button>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <Button variant="ghost" size="icon" onClick={toggleMute}>
                {isMuted || volume === 0 ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </Button>
              <Slider
                value={[isMuted ? 0 : volume]}
                max={1}
                step={0.01}
                onValueChange={handleVolumeChange}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
      <audio
        ref={audioRef}
        src="https://radio.trabullnetwork.pro/listen/esmerosound/radio.mp3"
        preload="none"
        crossOrigin="anonymous"
      />
    </Card>
  );
}
