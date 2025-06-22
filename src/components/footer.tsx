import Link from "next/link";
import { Radio } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Radio className="h-6 w-6 text-primary" />
            <span className="font-headline text-lg">Esmerosound</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Esmerosound. Todos los
            derechos reservados.
          </p>
          <nav className="flex flex-wrap justify-center gap-4">
             <Link
              href="/report-issue"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Reportar Error
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Términos
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Privacidad
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
