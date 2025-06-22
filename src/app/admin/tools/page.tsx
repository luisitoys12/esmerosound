import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { List, Mic, Music, BarChart2, Radio, Clapperboard, Share2 } from "lucide-react";

const toolCategories = [
  {
    category: "Plataformas de Automatización",
    description: "Software para programar y automatizar la transmisión de tu radio.",
    tools: ["RadioBOSS", "SAM Broadcaster", "Mixxx (Open Source)"],
    icon: <Radio className="w-6 h-6 text-primary" />
  },
  {
    category: "Procesamiento de Audio",
    description: "Herramientas para mejorar la calidad del sonido de tu transmisión.",
    tools: ["Stereo Tool", "Orban Optimod", "Thimeo Stereo Tool"],
    icon: <Mic className="w-6 h-6 text-accent" />
  },
  {
    category: "Librerías de Música y Sonidos",
    description: "Fuentes para obtener música, jingles y efectos de sonido libres de derechos.",
    tools: ["Epidemic Sound", "Artlist.io", "AudioJungle"],
    icon: <Music className="w-6 h-6 text-destructive" />
  },
  {
    category: "Análisis y Estadísticas",
    description: "Plataformas para medir tu audiencia y entender su comportamiento.",
    tools: ["Triton Digital", "Radio.co Analytics", "Google Analytics"],
    icon: <BarChart2 className="w-6 h-6 text-yellow-500" />
  },
  {
    category: "Gestión de Redes Sociales",
    description: "Herramientas para programar publicaciones y gestionar tu comunidad.",
    tools: ["Buffer", "Hootsuite", "Later"],
    icon: <Share2 className="w-6 h-6 text-green-500" />
  },
  {
    category: "Producción de Video",
    description: "Software para crear visuales para tus shows o transmisiones en vivo.",
    tools: ["OBS Studio", "StreamYard", "Headliner.app"],
    icon: <Clapperboard className="w-6 h-6 text-purple-500" />
  }
];

export default function ToolsPage() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">
            Herramientas para Web Radio Online
          </CardTitle>
          <CardDescription>
            Una lista curada de herramientas y recursos para llevar tu radio al siguiente nivel.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {toolCategories.map((category, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="p-3 bg-muted rounded-full">
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{category.category}</h3>
                  <p className="text-muted-foreground mt-1">{category.description}</p>
                  <ul className="mt-2 list-disc list-inside text-sm">
                    {category.tools.map((tool, toolIndex) => (
                      <li key={toolIndex}>{tool}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}