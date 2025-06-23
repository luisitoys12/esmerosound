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
import type { NewsArticle } from "@/types";
import { useEffect } from "react";

const formSchema = z.object({
  title: z.string().min(3, "El título es muy corto."),
  excerpt: z.string().min(10, "El extracto es muy corto."),
  content: z.string().min(20, "El contenido es muy corto."),
  category: z.string().min(3, "La categoría es muy corta."),
  imageUrl: z.string().url("Debe ser una URL válida.").optional().or(z.literal('')),
  dataAiHint: z.string().optional(),
});

type NewsFormValues = z.infer<typeof formSchema>;

interface NewsFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: NewsFormValues) => void;
  initialData?: NewsArticle | null;
  isSubmitting: boolean;
}

export function NewsForm({ isOpen, onOpenChange, onSubmit, initialData, isSubmitting }: NewsFormProps) {
  const form = useForm<NewsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      category: "",
      imageUrl: "https://placehold.co/600x400.png",
      dataAiHint: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    } else {
      form.reset({
        title: "",
        excerpt: "",
        content: "",
        category: "",
        imageUrl: "https://placehold.co/600x400.png",
        dataAiHint: "",
      });
    }
  }, [initialData, form]);

  const dialogTitle = initialData ? "Editar Noticia" : "Añadir Noticia";
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
             <FormField control={form.control} name="excerpt" render={({ field }) => (
              <FormItem><FormLabel>Extracto</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
             <FormField control={form.control} name="content" render={({ field }) => (
              <FormItem><FormLabel>Contenido</FormLabel><FormControl><Textarea rows={6} {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
             <FormField control={form.control} name="category" render={({ field }) => (
              <FormItem><FormLabel>Categoría</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
             <FormField control={form.control} name="imageUrl" render={({ field }) => (
              <FormItem><FormLabel>URL de la Imagen</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
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
