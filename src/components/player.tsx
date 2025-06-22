"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Radio,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import type { AzuracastNowPlaying } from "@/types";

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.75);
  const [metadata, setMetadata] = useState<AzuracastNowPlaying | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const songIdRef = useRef<string | undefined>();

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await fetch(`https://radio.trabullnetwork.pro/api/nowplaying/esmerosound?${new Date().getTime()}`);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data: AzuracastNowPlaying = await response.json();
        
        if (data.now_playing.song.id !== songIdRef.current || data.is_online !== (metadata?.is_online ?? data.is_online)) {
          setMetadata(data);
          songIdRef.current = data.now_playing.song.id;
        }
      } catch (error) {
        console.error("Error fetching metadata:", error);
        setMetadata(prev => {
            if (prev?.is_online === false) return prev;
            if (prev) return { ...prev, is_online: false };
            return {
              station: { name: "Esmerosound" },
              now_playing: { song: { title: "Estación Offline", artist: "No se pudo cargar la información.", id: "", text: "", album: "", art: "" } },
              is_online: false,
            };
        });
      }
    };

    fetchMetadata();
    const interval = setInterval(fetchMetadata, 5000);

    return () => clearInterval(interval);
  }, [metadata]);

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
  const albumArt = metadata?.now_playing?.song?.art || "https://placehold.co/400x400.png";
  const isOnline = metadata?.is_online ?? false;


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
              <Button variant="ghost" size="icon">
                <Maximize2 className="h-5 w-5" />
              </Button>
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
      <audio ref={audioRef} src="https://radio.trabullnetwork.pro/listen/esmerosound/radio.mp3" preload="none" crossOrigin="anonymous" />
    </Card>
  );
}
