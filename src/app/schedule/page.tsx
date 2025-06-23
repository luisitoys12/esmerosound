import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Schedule, Show } from "@/types";
import { schedule, daysOfWeek } from "@/lib/schedule-data";

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
  const todayKey = new Date()
    .toLocaleString("es-ES", { weekday: "long" })
    .toLowerCase();
  
  const today = daysOfWeek.find(d => d.toLowerCase() === todayKey) || "lunes";

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold font-headline">
            Nuestra Programación
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={today} className="w-full">
            <TabsList className="grid w-full grid-cols-3 sm:grid-cols-7">
              {daysOfWeek.map((day) => (
                <TabsTrigger key={day} value={day} className="capitalize">
                  {day.substring(0,3)}
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
