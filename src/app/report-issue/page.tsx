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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Send } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  issueType: z.string({ required_error: "Debes seleccionar un tipo de problema." }),
  description: z.string().min(10, { message: "Por favor, describe el problema con más detalle." }),
});

export default function ReportIssuePage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log("Issue report submitted:", values);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "¡Reporte Enviado!",
        description: "Gracias por ayudarnos a mejorar. Revisaremos el problema lo antes posible.",
      });
      form.reset();
    }, 1500);
  }

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="font-headline text-3xl flex items-center gap-3">
            <AlertCircle className="h-8 w-8 text-destructive" />
            Reportar un Problema Técnico
          </CardTitle>
          <CardDescription>
            ¿Algo no funciona como debería? Avísanos para que podamos solucionarlo.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
               <FormField
                  control={form.control}
                  name="issueType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Problema</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona el área del problema" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="player">El reproductor no funciona</SelectItem>
                          <SelectItem value="metadata">La información de la canción es incorrecta</SelectItem>
                          <SelectItem value="website">Error en una página del sitio web</SelectItem>
                          <SelectItem value="stream">La transmisión se corta o no se escucha</SelectItem>
                          <SelectItem value="other">Otro tipo de problema</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Describe el Problema</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ej: El reproductor se detiene cada 5 minutos en Chrome desde mi móvil."
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardContent>
              <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                {isLoading ? (
                  "Enviando..."
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Enviar Reporte
                  </>
                )}
              </Button>
            </CardContent>
          </form>
        </Form>
      </Card>
    </div>
  );
}
