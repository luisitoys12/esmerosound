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

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.75);
  const audioRef = useRef<HTMLAudioElement>(null);

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

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-2xl rounded-xl overflow-hidden bg-card/80 backdrop-blur-sm">
      <div className="md:flex">
        <div className="md:w-1/3 relative">
          <Image
            src="https://placehold.co/400x400.png"
            alt="Album Art"
            width={400}
            height={400}
            className="object-cover w-full h-full"
            data-ai-hint="radio album"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <Radio className="h-4 w-4 animate-pulse" />
                <span>EN VIVO</span>
              </div>
              <Button variant="ghost" size="icon">
                <Maximize2 className="h-5 w-5" />
              </Button>
            </div>
            <h2 className="text-3xl font-bold font-headline tracking-tight">
              Canción Actual
            </h2>
            <p className="text-muted-foreground text-lg">Nombre del Artista</p>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="w-16 h-16"
                onClick={togglePlay}
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
      <audio ref={audioRef} src="/placeholder-audio.mp3" preload="none" />
    </Card>
  );
}