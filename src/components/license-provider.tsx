"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import LicensePage from '@/app/license/page';
import { Skeleton } from './ui/skeleton';
import { ShieldCheck } from 'lucide-react';

// NOTE: In a real application, this should be validated against a backend server.
const VALID_LICENSE_KEY = "ESMEROSOUND-LICENSE-KEY-A1B2-C3D4-E5F6-G7H8";

interface LicenseContextType {
  isLicensed: boolean;
  activateLicense: (key: string) => void;
}

const LicenseContext = createContext<LicenseContextType | undefined>(undefined);

export function LicenseProvider({ children }: { children: ReactNode }) {
  const [isLicensed, setIsLicensed] = useState<boolean | null>(null);

  useEffect(() => {
    // This check must run only on the client.
    const storedKey = localStorage.getItem('license_key');
    if (storedKey === VALID_LICENSE_KEY) {
      setIsLicensed(true);
    } else {
      setIsLicensed(false);
    }
  }, []);

  const activateLicense = (key: string) => {
    if (key === VALID_LICENSE_KEY) {
      localStorage.setItem('license_key', key);
      setIsLicensed(true);
      // We need to reload to re-render the entire app layout
      window.location.reload();
    }
  };

  if (isLicensed === null) {
    // Loading state while checking license on the client
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
         <div className="flex flex-col items-center gap-4 text-muted-foreground">
            <ShieldCheck className="h-10 w-10 animate-pulse" />
            <p className="font-semibold">Verificando licencia...</p>
         </div>
      </div>
    );
  }

  if (!isLicensed) {
    // Since this component wraps the whole app, it needs to provide its own context
    // for the LicensePage to use.
    return (
        <LicenseContext.Provider value={{ isLicensed, activateLicense }}>
            <LicensePage />
        </LicenseContext.Provider>
    );
  }

  return (
    <LicenseContext.Provider value={{ isLicensed, activateLicense }}>
      {children}
    </LicenseContext.Provider>
  );
}

export const useLicense = (): LicenseContextType => {
  const context = useContext(LicenseContext);
  if (context === undefined) {
    throw new Error('useLicense must be used within a LicenseProvider');
  }
  return context;
};
