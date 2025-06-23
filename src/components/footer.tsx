"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Radio, Facebook, Instagram, Twitter } from "lucide-react";
import { getSettings } from "@/lib/firebase/settings";
import type { SiteSettings } from "@/types";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const defaultSettings: SiteSettings = {
  title: "Esmerosound",
  description: "Radio online con la mejor programación.",
  facebookUrl: "https://facebook.com",
  instagramUrl: "https://instagram.com",
  twitterUrl: "https://twitter.com",
  streamingSource: "azuracast",
};

export default function Footer() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const fetchedSettings = await getSettings();
        setSettings(fetchedSettings);
      } catch (error) {
        console.error("Failed to fetch footer settings:", error);
        setSettings(defaultSettings); // Fallback to default on error
      } finally {
        setIsLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const displaySettings = settings || defaultSettings;

  if (isLoading) {
    return (
      <footer className="border-t bg-background/80">
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8 text-center md:grid-cols-3 md:text-left">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-2 font-bold">
                <Radio className="h-6 w-6 text-primary" />
                <Skeleton className="h-6 w-32" />
              </div>
              <Skeleton className="h-4 w-48 mt-2" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <h3 className="font-semibold uppercase text-muted-foreground text-sm tracking-wider">Enlaces</h3>
            </div>
            <div className="flex flex-col items-center md:items-end gap-2">
              <h3 className="font-semibold uppercase text-muted-foreground text-sm tracking-wider">Síguenos</h3>
            </div>
          </div>
          <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
            <Skeleton className="h-4 w-64 mx-auto" />
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t bg-background/80">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 text-center md:grid-cols-3 md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/inicio" className="flex items-center gap-2 font-bold">
              <Radio className="h-6 w-6 text-primary" />
              <span className="font-headline text-lg">{displaySettings.title}</span>
            </Link>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              {displaySettings.description}
            </p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <h3 className="font-semibold uppercase text-muted-foreground text-sm tracking-wider">Enlaces</h3>
            <nav className="flex flex-col gap-1">
              <Link href="/contact" className="text-sm hover:text-primary transition-colors">Contacto</Link>
              <Link href="/report-issue" className="text-sm hover:text-primary transition-colors">Reportar Error</Link>
              <Link href="/terms" className="text-sm hover:text-primary transition-colors">Términos</Link>
              <Link href="/privacy" className="text-sm hover:text-primary transition-colors">Privacidad</Link>
            </nav>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <h3 className="font-semibold uppercase text-muted-foreground text-sm tracking-wider">Síguenos</h3>
            <div className="flex gap-1">
              {displaySettings.facebookUrl && (
                <Button asChild variant="ghost" size="icon">
                  <Link href={displaySettings.facebookUrl} target="_blank" rel="noopener noreferrer">
                    <Facebook className="h-5 w-5" />
                  </Link>
                </Button>
              )}
              {displaySettings.instagramUrl && (
                <Button asChild variant="ghost" size="icon">
                  <Link href={displaySettings.instagramUrl} target="_blank" rel="noopener noreferrer">
                    <Instagram className="h-5 w-5" />
                  </Link>
                </Button>
              )}
              {displaySettings.twitterUrl && (
                <Button asChild variant="ghost" size="icon">
                  <Link href={displaySettings.twitterUrl} target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-5 w-5" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {displaySettings.title}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
