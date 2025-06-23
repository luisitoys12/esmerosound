"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function PrivacyPage() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('es-ES'));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Política de Privacidad</CardTitle>
          <CardDescription>
            {currentDate ? `Última actualización: ${currentDate}` : <Skeleton className="h-5 w-48" />}
          </CardDescription>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>Tu privacidad es importante para nosotros. Es política de Esmerosound respetar tu privacidad con respecto a cualquier información que podamos recopilar de ti a través de nuestro sitio web.</p>
          
          <p>Solo pedimos información personal cuando realmente la necesitamos para brindarte un servicio. La recopilamos por medios justos y legales, con tu conocimiento y consentimiento. También te informamos por qué la estamos recopilando y cómo se utilizará.</p>

          <h2>Recopilación de datos</h2>
          <p>Solo retenemos la información recopilada durante el tiempo que sea necesario para brindarte el servicio solicitado. Los datos que almacenamos, los protegeremos dentro de medios comercialmente aceptables para evitar pérdidas y robos, así como el acceso, la divulgación, la copia, el uso o la modificación no autorizados.</p>
          
          <p>No compartimos ninguna información de identificación personal públicamente o con terceros, excepto cuando así lo exija la ley.</p>

          <h2>Enlaces a otros sitios</h2>
          <p>Nuestro sitio web puede tener enlaces a sitios externos que no son operados por nosotros. Ten en cuenta que no tenemos control sobre el contenido y las prácticas de estos sitios, y no podemos aceptar responsabilidad alguna por sus respectivas políticas de privacidad.</p>

          <p>Eres libre de rechazar nuestra solicitud de tu información personal, en el entendimiento de que es posible que no podamos brindarte algunos de los servicios que deseas.</p>

          <p>El uso continuado de nuestro sitio web se considerará como la aceptación de nuestras prácticas en torno a la privacidad y la información personal. Si tienes alguna pregunta sobre cómo manejamos los datos del usuario y la información personal, no dudes en contactarnos.</p>
        </CardContent>
      </Card>
    </div>
  );
}
