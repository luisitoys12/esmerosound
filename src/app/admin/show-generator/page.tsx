"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Sparkles } from "lucide-react";

const formSchema = z.object({
  showName: z
    .string()
    .min(2, { message: "El nombre del show debe tener al menos 2 caracteres." }),
  musicLibraryDescription: z.string().min(10, {
    message: "La descripción de la librería debe tener al menos 10 caracteres.",
  }),
  programmingSchedule: z.string().min(10, {
    message: "El horario de programación debe tener al menos 10 caracteres.",
  }),
});

function generateDescription(values: z.infer<typeof formSchema>): string {
  return `${values.showName} es un espacio radial único donde la música cobra vida. Con una librería musical conformada por ${values.musicLibraryDescription.toLowerCase()}, este programa ofrece una experiencia auditiva inigualable. Sintonízanos ${values.programmingSchedule} y déjate llevar por los mejores ritmos seleccionados especialmente para ti. ¡No te pierdas ningún episodio de ${values.showName}, tu programa favorito en Esmero Sound!`;
}

export default function ShowGeneratorPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [generatedDescription, setGeneratedDescription] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      showName: "",
      musicLibraryDescription: "",
      programmingSchedule: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneratedDescription("");
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const description = generateDescription(values);
      setGeneratedDescription(description);
      toast({
        title: "¡Descripción Generada!",
        description: "Tu nueva descripción de show está lista.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error de Generación",
        description: "No se pudo generar la descripción. Inténtalo de nuevo.",
      });
      console.error("Generation failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">
            Generador de Descripciones
          </CardTitle>
          <CardDescription>
            Completa los detalles para crear una descripción para tu show.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="showName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del Show</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Noches de Jazz" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="musicLibraryDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción de la Librería Musical</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ej: Una colección de rock clásico de los 80s y 90s."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="programmingSchedule"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Horario de Programación</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ej: Lunes a Viernes de 20:00 a 22:00"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  "Generando..."
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generar Descripción
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">
            Descripción Generada
          </CardTitle>
          <CardDescription>
            Aquí aparecerá la descripción lista para usar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="space-y-2">
              <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
              <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
              <div className="h-4 w-3/4 animate-pulse rounded-md bg-muted" />
            </div>
          )}
          {generatedDescription && (
            <div className="prose prose-sm max-w-none text-foreground">
              <p>{generatedDescription}</p>
            </div>
          )}
          {!isLoading && !generatedDescription && (
            <p className="text-sm text-muted-foreground">
              La descripción aparecerá aquí.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
