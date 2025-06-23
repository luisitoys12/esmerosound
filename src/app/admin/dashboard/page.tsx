"use client";

import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Settings, Sparkles, Wrench, Globe, Newspaper, PictureInPicture, Users } from "lucide-react";

const adminFeatures = [
    {
        title: "Generador IA de Shows",
        description: "Crea descripciones de programas atractivas usando inteligencia artificial.",
        href: "/admin/show-generator",
        icon: <Sparkles className="h-8 w-8 text-accent"/>
    },
    {
        title: "Gestionar Noticias",
        description: "Añade, edita y elimina artículos de noticias de tu sitio web.",
        href: "/admin/news",
        icon: <Newspaper className="h-8 w-8 text-destructive"/>
    },
    {
        title: "Gestionar Slideshow",
        description: "Añade o edita los banners promocionales de la página de inicio.",
        href: "/admin/slideshow",
        icon: <PictureInPicture className="h-8 w-8 text-green-500"/>
    },
    {
        title: "Gestionar Equipo",
        description: "Añade o edita los miembros del equipo que aparecen en tu sitio.",
        href: "/admin/team",
        icon: <Users className="h-8 w-8 text-blue-500"/>
    },
    {
        title: "Ajustes de Streaming",
        description: "Configura tu fuente de streaming: Azuracast, Zenofm, o Live365.",
        href: "/admin/settings",
        icon: <Settings className="h-8 w-8 text-primary"/>
    },
    {
        title: "Herramientas para Radio",
        description: "Descubre una lista de herramientas útiles para potenciar tu radio online.",
        href: "/admin/tools",
        icon: <Wrench className="h-8 w-8 text-secondary-foreground"/>
    },
    {
        title: "Página Web",
        description: "Personaliza el título, descripción y redes sociales de tu sitio.",
        href: "/admin/web",
        icon: <Globe className="h-8 w-8 text-chart-3" />
    }
]

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight font-headline">
        ¡Bienvenido, {user?.displayName || user?.email}!
      </h1>
      <p className="text-muted-foreground mt-2">
        Desde aquí puedes gestionar todos los aspectos de Esmerosound.
      </p>

      <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
        {adminFeatures.sort((a, b) => a.title.localeCompare(b.title)).map((feature) => (
             <Card key={feature.href} className="hover:shadow-lg transition-shadow">
                <Link href={feature.href} className="block h-full">
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                        <div className="p-3 rounded-full bg-muted">
                            {feature.icon}
                        </div>
                        <CardTitle className="text-xl font-headline">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                </Link>
            </Card>
        ))}
      </div>
    </div>
  );
}
