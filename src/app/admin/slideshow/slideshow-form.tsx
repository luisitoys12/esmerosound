"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import type { Slide } from "@/types";
import { useEffect } from "react";

const formSchema = z.object({
  title: z.string().min(3, "El título es muy corto."),
  description: z.string().min(10, "La descripción es muy corta."),
  imageUrl: z.string().url("Debe ser una URL válida."),
  linkUrl: z.string().url("Debe ser una URL válida."),
  dataAiHint: z.string().optional(),
});

type SlideFormValues = z.infer<typeof formSchema>;

interface SlideshowFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: SlideFormValues) => void;
  initialData?: Slide | null;
  isSubmitting: boolean;
}

export function SlideshowForm({ isOpen, onOpenChange, onSubmit, initialData, isSubmitting }: SlideshowFormProps) {
  const form = useForm<SlideFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "https://placehold.co/1200x600.png",
      linkUrl: "https://esmerosound.com",
      dataAiHint: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    } else {
      form.reset({
        title: "",
        description: "",
        imageUrl: "https://placehold.co/1200x600.png",
        linkUrl: "https://esmerosound.com",
        dataAiHint: "",
      });
    }
  }, [initialData, form]);

  const dialogTitle = initialData ? "Editar Slide" : "Añadir Slide";
  const buttonText = isSubmitting ? "Guardando..." : "Guardar";

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="title" render={({ field }) => (
              <FormItem><FormLabel>Título</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
             <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem><FormLabel>Descripción</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
             <FormField control={form.control} name="imageUrl" render={({ field }) => (
              <FormItem><FormLabel>URL de la Imagen (1200x600 recomendado)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
             <FormField control={form.control} name="linkUrl" render={({ field }) => (
              <FormItem><FormLabel>URL de Destino</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
            <FormField control={form.control} name="dataAiHint" render={({ field }) => (
              <FormItem><FormLabel>Pista para IA (imágenes)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancelar</Button>
              <Button type="submit" disabled={isSubmitting}>{buttonText}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
