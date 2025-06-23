"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { KeyRound, Server, ExternalLink, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function InstallPage() {
  return (
    <div className="container mx-auto px-4 py-8 flex justify-center">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="font-headline text-3xl flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-primary" />
            Instalación de Esmerosound
          </CardTitle>
          <CardDescription>
            Guía de activación y despliegue para tu nueva instancia de la aplicación.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
             <h3 className="font-semibold flex items-center gap-2">
                <KeyRound className="h-5 w-5 text-accent" />
                Paso 1: Obtener una Licencia
             </h3>
             <p className="text-sm text-muted-foreground">
                Esmerosound es un software con licencia. Para utilizarlo en producción, necesitas una clave de licencia válida. Este proyecto tiene código privado y su uso está restringido.
             </p>
             <p className="text-sm text-muted-foreground">
                Por favor, contacta a nuestro equipo para solicitar tu licencia. Encontrarás un ejemplo de clave en el archivo <code>licencias.txt</code> de tu proyecto.
             </p>
             <Button asChild>
                <a href="mailto:cushmediagroup@gmail.com">
                    Contactar para obtener licencia
                </a>
             </Button>
          </div>

          <div className="space-y-4 p-4 border rounded-lg">
             <h3 className="font-semibold flex items-center gap-2">
                <Server className="h-5 w-5 text-destructive" />
                Paso 2: Despliegue en un Hosting
             </h3>
              <p className="text-sm text-muted-foreground">
                Esta aplicación está construida con Next.js y requiere un entorno Node.js para funcionar. No es compatible con hostings tradicionales como cPanel o Plesk a menos que ofrezcan soporte específico para Node.js.
              </p>
              <p className="text-sm text-muted-foreground">
                Te recomendamos encarecidamente utilizar una de las plataformas modernas optimizadas para Next.js. Consulta nuestra guía completa para ver las instrucciones detalladas de despliegue.
              </p>
               <Button asChild variant="outline">
                <Link href="/docs/index.html" target="_blank">
                  Ver Guía de Instalación y Despliegue
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
