"use client";

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";

export default function LiveClock() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    // Set initial time on client-side to avoid hydration mismatch.
    setTime(new Date()); 
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId); // Cleanup interval on component unmount
  }, []);

  if (!time) {
    return (
      <div className="flex items-center justify-center gap-2 bg-muted/50 p-3 rounded-lg mb-8">
        <Clock className="h-5 w-5" />
        <Skeleton className="h-5 w-48" />
      </div>
    );
  }

  const timeZone = 'America/Mexico_City';
  
  const formattedDate = new Intl.DateTimeFormat('es-MX', {
    dateStyle: 'full',
    timeZone,
  }).format(time);

  const formattedTime = new Intl.DateTimeFormat('es-MX', {
    timeStyle: 'medium',
    hour12: true,
    timeZone,
  }).format(time);

  return (
    <div className="flex items-center justify-center gap-3 bg-muted/50 text-muted-foreground p-3 rounded-lg mb-8 text-center">
      <Clock className="h-5 w-5 text-primary" />
      <p className="font-semibold text-sm">
        <span className="capitalize">{formattedDate}</span>
        <span className="mx-2">|</span>
        <span>{`${formattedTime} (Hora Central)`}</span>
      </p>
    </div>
  );
}
