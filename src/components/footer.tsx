import Link from "next/link";
import { Radio, Facebook, Instagram, Twitter } from "lucide-react";
import { getSettings } from "@/lib/firebase/settings";
import { Button } from "@/components/ui/button";

export default async function Footer() {
  const settings = await getSettings();

  return (
    <footer className="border-t bg-background/80">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 text-center md:grid-cols-3 md:text-left">
          <div className="flex flex-col items-center md:items-start">
             <Link href="/" className="flex items-center gap-2 font-bold">
                <Radio className="h-6 w-6 text-primary" />
                <span className="font-headline text-lg">{settings.title}</span>
              </Link>
              <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                {settings.description}
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
              {settings.facebookUrl && (
                 <Button asChild variant="ghost" size="icon">
                    <Link href={settings.facebookUrl} target="_blank" rel="noopener noreferrer">
                      <Facebook className="h-5 w-5" />
                    </Link>
                </Button>
              )}
              {settings.instagramUrl && (
                <Button asChild variant="ghost" size="icon">
                    <Link href={settings.instagramUrl} target="_blank" rel="noopener noreferrer">
                        <Instagram className="h-5 w-5" />
                    </Link>
                </Button>
              )}
               {settings.twitterUrl && (
                <Button asChild variant="ghost" size="icon">
                    <Link href={settings.twitterUrl} target="_blank" rel="noopener noreferrer">
                        <Twitter className="h-5 w-5" />
                    </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
         <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {settings.title}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
