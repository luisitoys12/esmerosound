import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Schedule, Show } from "@/types";

const schedule: Schedule = {
  lunes: [
    { time: "06:00 - 09:00", name: "Amanecer Esmeralda", host: "DJ Sol" },
    { time: "09:00 - 12:00", name: "Ritmos Latinos", host: "DJ Sabor" },
    { time: "12:00 - 15:00", name: "Clásicos del Rock", host: "Rocker" },
    { time: "15:00 - 18:00", name: "Tarde de Pop", host: "Popstar" },
  ],
  martes: [
    { time: "06:00 - 09:00", name: "Amanecer Esmeralda", host: "DJ Sol" },
    { time: "09:00 - 12:00", name: "Jazz y Más", host: "Blue Note" },
    { time: "12:00 - 15:00", name: "Hits Actuales", host: "DJ Fresh" },
    { time: "15:00 - 18:00", name: "Electrónica Global", host: "Beatmaster" },
  ],
  miercoles: [
    { time: "06:00 - 09:00", name: "Amanecer Esmeralda", host: "DJ Sol" },
    { time: "09:00 - 12:00", name: "Ritmos Latinos", host: "DJ Sabor" },
    { time: "12:00 - 15:00", name: "Clásicos del Rock", host: "Rocker" },
    { time: "15:00 - 18:00", name: "Tarde de Pop", host: "Popstar" },
  ],
  jueves: [
    { time: "06:00 - 09:00", name: "Amanecer Esmeralda", host: "DJ Sol" },
    { time: "09:00 - 12:00", name: "Jazz y Más", host: "Blue Note" },
    { time: "12:00 - 15:00", name: "Hits Actuales", host: "DJ Fresh" },
    { time: "15:00 - 18:00", name: "Electrónica Global", host: "Beatmaster" },
  ],
  viernes: [
    { time: "06:00 - 09:00", name: "Amanecer Esmeralda", host: "DJ Sol" },
    { time: "09:00 - 12:00", name: "Ritmos Latinos", host: "DJ Sabor" },
    { time: "12:00 - 15:00", name: "Clásicos del Rock", host: "Rocker" },
    { time: "15:00 - 20:00", name: "Viernes de Fiesta", host: "Party Mix" },
  ],
  sabado: [
    { time: "08:00 - 11:00", name: "Fin de Semana Relax", host: "DJ Chill" },
    { time: "11:00 - 14:00", name: "Top 40", host: "DJ Hits" },
    { time: "14:00 - 17:00", name: "Recuerdos de Oro", host: "Golden" },
    { time: "17:00 - 20:00", name: "Sábado Noche", host: "DJ Dance" },
  ],
  domingo: [
    { time: "08:00 - 11:00", name: "Domingo Clásico", host: "Maestro" },
    { time: "11:00 - 14:00", name: "Especiales Esmeralda", host: "Varios" },
    { time: "14:00 - 17:00", name: "Mundo Reggae", host: "DJ Roots" },
    { time: "17:00 - 20:00", name: "Cierre de Semana", host: "DJ Sunset" },
  ],
};

const daysOfWeek = [
  "lunes",
  "martes",
  "miercoles",
  "jueves",
  "viernes",
  "sabado",
  "domingo",
];

const ScheduleCard = ({ shows }: { shows: Show[] }) => {
  if (shows.length === 0) {
    return (
      <p className="text-muted-foreground mt-4 text-center">
        No hay programación para este día.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {shows.map((show, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-4 rounded-lg bg-background hover:bg-muted/50 transition-colors"
        >
          <div>
            <p className="font-semibold text-primary">{show.time}</p>
            <h4 className="text-lg font-bold">{show.name}</h4>
            <p className="text-sm text-muted-foreground">con {show.host}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function SchedulePage() {
  const today = new Date()
    .toLocaleString("es-ES", { weekday: "long" })
    .toLowerCase();
  const defaultTab = daysOfWeek.includes(today) ? today : "lunes";

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold font-headline">
            Nuestra Programación
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 sm:grid-cols-7">
              {daysOfWeek.map((day) => (
                <TabsTrigger key={day} value={day} className="capitalize">
                  {day}
                </TabsTrigger>
              ))}
            </TabsList>
            {daysOfWeek.map((day) => (
              <TabsContent key={day} value={day}>
                <ScheduleCard shows={schedule[day as keyof Schedule]} />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}