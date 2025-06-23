"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, MoreHorizontal, Trash, Edit } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import type { Slide } from "@/types";
import { getSlides, addSlide, updateSlide, deleteSlide } from "@/lib/firebase/slideshow";
import { SlideshowForm } from "./slideshow-form";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function SlideshowAdminPage() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState<Slide | null>(null);
  const [slideToDelete, setSlideToDelete] = useState<string | null>(null);

  const { toast } = useToast();

  const fetchSlides = async () => {
    setIsLoading(true);
    try {
      const slidesData = await getSlides();
      setSlides(slidesData);
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "No se pudieron cargar los slides." });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleFormSubmit = async (values: any) => {
    setIsSubmitting(true);
    try {
      if (selectedSlide) {
        await updateSlide(selectedSlide.id, values);
        toast({ title: "Éxito", description: "Slide actualizado correctamente." });
      } else {
        await addSlide(values);
        toast({ title: "Éxito", description: "Slide creado correctamente." });
      }
      setIsFormOpen(false);
      setSelectedSlide(null);
      fetchSlides();
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "No se pudo guardar el slide." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddClick = () => {
    setSelectedSlide(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (slide: Slide) => {
    setSelectedSlide(slide);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setSlideToDelete(id);
    setIsAlertOpen(true);
  };

  const confirmDelete = async () => {
    if (slideToDelete) {
      try {
        await deleteSlide(slideToDelete);
        toast({ title: "Éxito", description: "Slide eliminado correctamente." });
        setSlideToDelete(null);
        fetchSlides();
      } catch (error) {
        toast({ variant: "destructive", title: "Error", description: "No se pudo eliminar el slide." });
      }
    }
    setIsAlertOpen(false);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Gestionar Slideshow</CardTitle>
            <CardDescription>Añade, edita o elimina los banners de la página principal.</CardDescription>
          </div>
          <Button onClick={handleAddClick}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Añadir Slide
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Imagen</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Enlace</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-10 w-20 rounded-md" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : slides.length > 0 ? (
                slides.map((slide) => (
                  <TableRow key={slide.id}>
                    <TableCell>
                      <Image
                        src={slide.imageUrl || "https://placehold.co/120x60.png"}
                        alt={slide.title}
                        width={120}
                        height={60}
                        className="rounded-md object-cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{slide.title}</TableCell>
                    <TableCell>{slide.linkUrl}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditClick(slide)}>
                            <Edit className="mr-2 h-4 w-4" /> Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteClick(slide.id)}>
                            <Trash className="mr-2 h-4 w-4" /> Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">No se encontraron slides.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <SlideshowForm
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
        initialData={selectedSlide}
        isSubmitting={isSubmitting}
      />

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>Esta acción no se puede deshacer. Esto eliminará permanentemente el slide.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Continuar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
