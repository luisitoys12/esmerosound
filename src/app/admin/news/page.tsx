
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
import type { NewsArticle } from "@/types";
import { getNewsArticles, addNewsArticle, updateNewsArticle, deleteNewsArticle } from "@/lib/firebase/news";
import { NewsForm } from "./news-form";
import { Skeleton } from "@/components/ui/skeleton";

export default function NewsAdminPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null);

  const { toast } = useToast();

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const newsData = await getNewsArticles();
      setArticles(newsData);
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "No se pudieron cargar las noticias." });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleFormSubmit = async (values: any) => {
    setIsSubmitting(true);
    try {
      if (selectedArticle) {
        await updateNewsArticle(selectedArticle.id, values);
        toast({ title: "Éxito", description: "Noticia actualizada correctamente." });
      } else {
        await addNewsArticle(values);
        toast({ title: "Éxito", description: "Noticia creada correctamente." });
      }
      setIsFormOpen(false);
      setSelectedArticle(null);
      fetchArticles();
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "No se pudo guardar la noticia." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddClick = () => {
    setSelectedArticle(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (article: NewsArticle) => {
    setSelectedArticle(article);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setArticleToDelete(id);
    setIsAlertOpen(true);
  };

  const confirmDelete = async () => {
    if (articleToDelete) {
      try {
        await deleteNewsArticle(articleToDelete);
        toast({ title: "Éxito", description: "Noticia eliminada correctamente." });
        setArticleToDelete(null);
        fetchArticles();
      } catch (error) {
        toast({ variant: "destructive", title: "Error", description: "No se pudo eliminar la noticia." });
      }
    }
    setIsAlertOpen(false);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="font-headline text-2xl">Gestionar Noticias</CardTitle>
            <CardDescription>Añade, edita o elimina artículos de noticias de tu sitio web.</CardDescription>
          </div>
          <Button onClick={handleAddClick}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Añadir Noticia
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : articles.length > 0 ? (
                articles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell className="font-medium">{article.title}</TableCell>
                    <TableCell>{article.category}</TableCell>
                    <TableCell>{new Date(article.createdAt || 0).toLocaleDateString('es-ES')}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditClick(article)}>
                            <Edit className="mr-2 h-4 w-4" /> Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteClick(article.id)}>
                            <Trash className="mr-2 h-4 w-4" /> Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">No se encontraron noticias.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <NewsForm
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
        initialData={selectedArticle}
        isSubmitting={isSubmitting}
      />

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>Esta acción no se puede deshacer. Esto eliminará permanentemente el artículo.</AlertDialogDescription>
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
