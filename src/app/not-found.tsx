import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { AlertTriangle, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-16rem)] items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto w-fit rounded-full bg-destructive/10 p-3 text-destructive">
            <AlertTriangle className="h-10 w-10" />
          </div>
          <CardTitle className="mt-4 text-3xl font-bold">Error 404</CardTitle>
          <CardDescription>Página No Encontrada</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Lo sentimos, la página que estás buscando no existe o ha sido movida.
          </p>
          <Button asChild className="mt-6">
            <Link href="/inicio">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al Inicio
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
