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
  CardFooter,
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
import { Music, Send } from "lucide-react";

const formSchema = z.object({
  name: z.string().optional(),
  songTitle: z.string().min(2, { message: "El título de la canción es requerido." }),
  artist: z.string().min(2, { message: "El artista es requerido." }),
  message: z.string().optional(),
});

export default function SongRequestPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      songTitle: "",
      artist: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // Simulate sending the request
    console.log("Song request submitted:", values);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "¡Solicitud Enviada!",
        description: "Gracias por tu sugerencia. ¡La tendremos en cuenta!",
      });
      form.reset();
    }, 1500);
  }

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="font-headline text-3xl flex items-center gap-3">
            <Music className="h-8 w-8 text-primary" />
            Solicita una Canción
          </CardTitle>
          <CardDescription>
            ¿Hay alguna canción que te mueres por escuchar? ¡Pídela aquí y podría sonar en Esmerosound!
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="songTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título de la Canción</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: Bohemian Rhapsody" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="artist"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Artista</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: Queen" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tu Nombre (Opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Para que te saludemos en el aire" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dedicatoria o Mensaje (Opcional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ej: Para mi amigo Juan, que está de cumpleaños."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                {isLoading ? (
                  "Enviando..."
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Enviar Solicitud
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
