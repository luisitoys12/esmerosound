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
import { Globe } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(3, { message: "El título debe tener al menos 3 caracteres." }),
  description: z.string().min(10, { message: "La descripción debe tener al menos 10 caracteres." }),
  facebookUrl: z.string().url({ message: "URL de Facebook no válida." }).optional().or(z.literal('')),
  instagramUrl: z.string().url({ message: "URL de Instagram no válida." }).optional().or(z.literal('')),
  twitterUrl: z.string().url({ message: "URL de Twitter/X no válida." }).optional().or(z.literal('')),
});

export default function WebSettingsPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "Esmerosound",
      description: "Radio online con la mejor programación.",
      facebookUrl: "",
      instagramUrl: "",
      twitterUrl: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // Simulate saving settings
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "¡Ajustes Guardados!",
        description: "La información de tu página web ha sido actualizada.",
      });
      // Here you would typically save the values to a database or a config file
      console.log(values);
    }, 1000);
  }

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2">
          <Globe className="h-6 w-6" />
          Ajustes de la Página Web
        </CardTitle>
        <CardDescription>
          Personaliza la información principal y las redes sociales de tu sitio web.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título del Sitio Web</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Mi Radio Online" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción del Sitio Web</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ej: La mejor música 24/7."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <h3 className="text-lg font-semibold pt-4 border-t">Redes Sociales</h3>

            <FormField
              control={form.control}
              name="facebookUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL de Facebook</FormLabel>
                  <FormControl>
                    <Input placeholder="https://facebook.com/turadio" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instagramUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL de Instagram</FormLabel>
                  <FormControl>
                    <Input placeholder="https://instagram.com/turadio" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="twitterUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL de Twitter / X</FormLabel>
                  <FormControl>
                    <Input placeholder="https://x.com/turadio" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
