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
import type { TeamMember } from "@/types";
import { getTeamMembers, addTeamMember, updateTeamMember, deleteTeamMember } from "@/lib/firebase/team";
import { TeamForm } from "./team-form";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function TeamAdminPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [memberToDelete, setMemberToDelete] = useState<string | null>(null);

  const { toast } = useToast();

  const fetchMembers = async () => {
    setIsLoading(true);
    try {
      const membersData = await getTeamMembers();
      setMembers(membersData);
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "No se pudieron cargar los miembros del equipo." });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleFormSubmit = async (values: any) => {
    setIsSubmitting(true);
    try {
      if (selectedMember) {
        await updateTeamMember(selectedMember.id, values);
        toast({ title: "Éxito", description: "Miembro actualizado correctamente." });
      } else {
        await addTeamMember(values);
        toast({ title: "Éxito", description: "Miembro creado correctamente." });
      }
      setIsFormOpen(false);
      setSelectedMember(null);
      fetchMembers();
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "No se pudo guardar el miembro." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddClick = () => {
    setSelectedMember(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (member: TeamMember) => {
    setSelectedMember(member);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setMemberToDelete(id);
    setIsAlertOpen(true);
  };

  const confirmDelete = async () => {
    if (memberToDelete) {
      try {
        await deleteTeamMember(memberToDelete);
        toast({ title: "Éxito", description: "Miembro eliminado correctamente." });
        setMemberToDelete(null);
        fetchMembers();
      } catch (error) {
        toast({ variant: "destructive", title: "Error", description: "No se pudo eliminar el miembro." });
      }
    }
    setIsAlertOpen(false);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="font-headline text-2xl">Gestionar Equipo</CardTitle>
            <CardDescription>Añade, edita o elimina miembros del equipo de tu sitio web.</CardDescription>
          </div>
          <Button onClick={handleAddClick}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Añadir Miembro
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Foto</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-10 w-10 rounded-full" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : members.length > 0 ? (
                members.map((member) => (
                  <TableRow key={member.id}>
                     <TableCell>
                      <Image
                        src={member.imageUrl || "https://placehold.co/40x40.png"}
                        alt={member.name}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{member.role}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditClick(member)}>
                            <Edit className="mr-2 h-4 w-4" /> Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteClick(member.id)}>
                            <Trash className="mr-2 h-4 w-4" /> Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">No se encontraron miembros del equipo.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <TeamForm
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
        initialData={selectedMember}
        isSubmitting={isSubmitting}
      />

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>Esta acción no se puede deshacer. Esto eliminará permanentemente al miembro del equipo.</AlertDialogDescription>
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
