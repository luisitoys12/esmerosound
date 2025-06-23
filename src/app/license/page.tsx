"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { KeyRound, ShieldCheck } from 'lucide-react';
import { useLicense } from '@/components/license-provider';

// NOTE: In a real application, this should be validated against a backend server.
const VALID_LICENSE_KEY = "ESMEROSOUND-LICENSE-KEY-A1B2-C3D4-E5F6-G7H8";

export default function LicensePage() {
  const [key, setKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { activateLicense } = useLicense();

  const handleActivate = () => {
    setIsLoading(true);
    if (key.trim() === VALID_LICENSE_KEY) {
      toast({
        title: '¡Licencia Activada!',
        description: 'La aplicación ha sido activada correctamente. Recargando...',
      });
      activateLicense(key.trim());
    } else {
      toast({
        variant: 'destructive',
        title: 'Error de Licencia',
        description: 'La clave de licencia no es válida. Por favor, inténtalo de nuevo.',
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
           <div className="mx-auto w-fit rounded-full bg-primary/10 p-3 text-primary">
            <ShieldCheck className="h-10 w-10" />
          </div>
          <CardTitle className="mt-4 text-2xl font-bold">Activación Requerida</CardTitle>
          <CardDescription>
            Por favor, introduce tu clave de licencia para continuar.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="license-key">Clave de Licencia</Label>
            <Input
              id="license-key"
              placeholder="ESMEROSOUND-LICENSE-KEY-XXXX-XXXX"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <Button onClick={handleActivate} disabled={isLoading || !key} className="w-full">
            {isLoading ? "Activando..." : (
              <>
                <KeyRound className="mr-2 h-4 w-4" />
                Activar Aplicación
              </>
            )}
          </Button>
           <p className="text-xs text-muted-foreground text-center pt-2">
            Si no tienes una licencia, por favor contacta a <a href="mailto:cushmediagroup@gmail.com" className="underline">cushmediagroup@gmail.com</a>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
