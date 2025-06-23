import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Clapperboard, WifiOff } from "lucide-react";

export default function LiveVideoPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit mb-4">
                <Clapperboard className="h-8 w-8" />
            </div>
            <CardTitle className="font-headline text-3xl">Video en Vivo</CardTitle>
            <CardDescription>
              Disfruta de nuestra transmisión de video en tiempo real.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-black rounded-lg flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                    <WifiOff className="h-16 w-16 mx-auto mb-4"/>
                    <p className="font-semibold">Transmisión no disponible</p>
                    <p className="text-sm">Actualmente no estamos transmitiendo video. Vuelve más tarde.</p>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
