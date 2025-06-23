"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { getSlides } from "@/lib/firebase/slideshow";
import type { Slide } from "@/types";
import { Skeleton } from "./ui/skeleton";
import Autoplay from "embla-carousel-autoplay"

export default function Slideshow() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const autoplay = useRef(Autoplay({ delay: 5000 }));

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const slidesData = await getSlides();
        setSlides(slidesData);
      } catch (error) {
        console.error("Failed to fetch slides:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSlides();
  }, []);

  if (isLoading) {
    return <Skeleton className="w-full aspect-[2/1] rounded-xl" />;
  }

  return (
    <Carousel 
      className="w-full"
      plugins={[
        autoplay.current
      ]}
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        {slides.map((slide) => (
          <CarouselItem key={slide.id}>
            <Link href={slide.linkUrl} target="_blank" rel="noopener noreferrer">
              <Card className="overflow-hidden relative">
                <CardContent className="flex aspect-[2/1] items-center justify-center p-0">
                  <Image
                    src={slide.imageUrl}
                    alt={slide.title}
                    width={1200}
                    height={600}
                    className="object-cover w-full h-full"
                    data-ai-hint={slide.dataAiHint}
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-8 text-white">
                    <h2 className="text-4xl font-bold font-headline">{slide.title}</h2>
                    <p className="mt-2 text-lg max-w-2xl">{slide.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4" />
      <CarouselNext className="absolute right-4" />
    </Carousel>
  );
}
