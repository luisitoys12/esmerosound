"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CheckCircle, Clock, Star } from "lucide-react";

interface WhatsNewDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const newFeatures = [
  "¡NUEVO! Perfiles de locutores con biografías.",
  "Sección de 'Equipo' para conocer a las voces de la radio.",
  "Slideshow interactivo en la página de inicio.",
  "Sección de 'Video en Vivo' añadida.",
  "Pop-up de Novedades para mantenerte informado.",
];

const upcomingFeatures = [
  "Chat en vivo con moderación para interactuar durante los programas.",
  "Integración con Spotify para guardar y ver las playlists del día.",
  "Sistema de puntos y fidelización por escuchar e interactuar.",
  "Horarios de programas en los perfiles de los locutores.",
  "Llamadas en vivo a la cabina usando tu propia voz.",
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
                <Star className="h-5 w-5 text-yellow-500" />
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
                <Clock className="h-5 w-5 text-primary" />
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
