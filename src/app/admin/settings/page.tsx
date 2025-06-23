"use client";

import { useState, useEffect } from "react";
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
import type { SiteSettings } from "@/types";
import { getSettings, updateSettings } from "@/lib/firebase/settings";
import { Loader2 } from "lucide-react";

type StreamingSource = "azuracast" | "zenofm" | "live365";

export default function SettingsPage() {
  const [selectedSource, setSelectedSource] = useState<StreamingSource>("azuracast");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchSettings() {
      try {
        setIsFetching(true);
        const settings = await getSettings();
        setSelectedSource(settings.streamingSource);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudieron cargar los ajustes de streaming."
        });
      } finally {
        setIsFetching(false);
      }
    }
    fetchSettings();
  }, [toast]);


  const handleSave = async () => {
    setIsLoading(true);
    try {
      await updateSettings({ streamingSource: selectedSource });
      toast({
        title: "Ajustes Guardados",
        description: `La fuente de streaming ha sido cambiada a ${selectedSource}.`,
      });
    } catch (error) {
      toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudieron guardar los ajustes."
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isFetching) {
    return (
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Ajustes de Streaming</CardTitle>
          <CardDescription>
            Selecciona la fuente de tu transmisión de audio en vivo.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
           <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

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
