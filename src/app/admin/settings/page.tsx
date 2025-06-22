"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

type StreamingSource = "azuracast" | "zenofm" | "live365";

export default function SettingsPage() {
  const [selectedSource, setSelectedSource] = useState<StreamingSource>("azuracast");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    setIsLoading(true);
    // Simulate saving the setting
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Ajustes Guardados",
        description: `La fuente de streaming ha sido cambiada a ${selectedSource}.`,
      });
    }, 1000);
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Ajustes de Streaming</CardTitle>
        <CardDescription>
          Selecciona la fuente de tu transmisión de audio en vivo.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedSource}
          onValueChange={(value) => setSelectedSource(value as StreamingSource)}
          className="grid gap-4"
        >
          <Label
            htmlFor="azuracast"
            className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
          >
            <div className="flex items-center gap-3">
              <div className="font-semibold">Azuracast</div>
            </div>
            <RadioGroupItem value="azuracast" id="azuracast" />
          </Label>
          <Label
            htmlFor="zenofm"
            className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
          >
            <div className="flex items-center gap-3">
              <div className="font-semibold">Zenofm</div>
            </div>
            <RadioGroupItem value="zenofm" id="zenofm" />
          </Label>
          <Label
            htmlFor="live365"
            className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
          >
            <div className="flex items-center gap-3">
              <div className="font-semibold">Live365</div>
            </div>
            <RadioGroupItem value="live365" id="live365" />
          </Label>
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Guardando..." : "Guardar Cambios"}
        </Button>
      </CardFooter>
    </Card>
  );
}