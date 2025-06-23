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
import type { TeamMember } from "@/types";
import { useEffect } from "react";

const formSchema = z.object({
  name: z.string().min(3, "El nombre es muy corto."),
  role: z.string().min(3, "El rol es muy corto."),
  imageUrl: z.string().url("Debe ser una URL válida."),
  bio: z.string().min(10, "La biografía es muy corta.").optional().or(z.literal('')),
  dataAiHint: z.string().optional(),
  twitterUrl: z.string().url("URL de Twitter no válida.").optional().or(z.literal('')),
  instagramUrl: z.string().url("URL de Instagram no válida.").optional().or(z.literal('')),
});

type TeamFormValues = z.infer<typeof formSchema>;

interface TeamFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: TeamFormValues) => void;
  initialData?: TeamMember | null;
  isSubmitting: boolean;
}

export function TeamForm({ isOpen, onOpenChange, onSubmit, initialData, isSubmitting }: TeamFormProps) {
  const form = useForm<TeamFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      role: "",
      imageUrl: "https://placehold.co/400x400.png",
      bio: "",
      dataAiHint: "",
      twitterUrl: "",
      instagramUrl: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    } else {
      form.reset({
        name: "",
        role: "",
        imageUrl: "https://placehold.co/400x400.png",
        bio: "",
        dataAiHint: "",
        twitterUrl: "",
        instagramUrl: "",
      });
    }
  }, [initialData, form]);

  const dialogTitle = initialData ? "Editar Miembro" : "Añadir Miembro";
  const buttonText = isSubmitting ? "Guardando..." : "Guardar";

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem><FormLabel>Nombre</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
             <FormField control={form.control} name="role" render={({ field }) => (
              <FormItem><FormLabel>Rol</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
             <FormField control={form.control} name="imageUrl" render={({ field }) => (
              <FormItem><FormLabel>URL de la Imagen</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
            <FormField control={form.control} name="bio" render={({ field }) => (
              <FormItem><FormLabel>Biografía</FormLabel><FormControl><Textarea placeholder="Una breve descripción del miembro del equipo..." {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
            <FormField control={form.control} name="dataAiHint" render={({ field }) => (
              <FormItem><FormLabel>Pista para IA (imágenes)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
            <FormField control={form.control} name="twitterUrl" render={({ field }) => (
              <FormItem><FormLabel>URL de Twitter</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
            <FormField control={form.control} name="instagramUrl" render={({ field }) => (
              <FormItem><FormLabel>URL de Instagram</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
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
