"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CheckCircle, Clock } from "lucide-react";

interface WhatsNewDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const newFeatures = [
  "Slideshow interactivo en la página de inicio.",
  "Sección de 'Video en Vivo' añadida.",
  "Banners de publicidad integrados.",
  "Pop-up de Novedades para mantenerte informado.",
];

const upcomingFeatures = [
  "Perfiles de locutores con biografías y horarios.",
  "Chat en vivo con moderación.",
  "Integración con Spotify para playlists.",
  "Sistema de puntos y fidelización.",
];

export default function WhatsNewDialog({ isOpen, onOpenChange }: WhatsNewDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">¡Novedades en Esmerosound!</DialogTitle>
          <DialogDescription>
            Siempre estamos mejorando. Aquí tienes un vistazo a lo último y a lo que viene.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-semibold flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Agregado Recientemente
            </h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              {newFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
           <div>
            <h3 className="font-semibold flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-yellow-500" />
                Próximamente
            </h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                {upcomingFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
