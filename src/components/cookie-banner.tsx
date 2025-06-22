"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Cookie } from 'lucide-react';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // This check is to prevent hydration errors
    if (typeof window !== 'undefined') {
        const cookieConsent = localStorage.getItem('cookie_consent');
        if (cookieConsent !== 'true') {
          setShowBanner(true);
        }
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'true');
    setShowBanner(false);
  };
  
  const handleDecline = () => {
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="container mx-auto">
         <div className="bg-secondary text-secondary-foreground p-4 rounded-lg shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
                <Cookie className="h-6 w-6 text-primary flex-shrink-0" />
                <p className="text-sm">
                Usamos cookies para mejorar tu experiencia. Al continuar navegando, aceptas nuestro uso de cookies. Lee nuestra{' '}
                <Link href="/privacy" className="underline hover:text-primary">
                    política de privacidad
                </Link>
                .
                </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
                <Button onClick={handleAccept} size="sm">Aceptar</Button>
                <Button onClick={handleDecline} variant="outline" size="sm">Rechazar</Button>
            </div>
        </div>
      </div>
    </div>
  );
}
