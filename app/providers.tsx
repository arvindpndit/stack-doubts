'use client';
import React, { useEffect, useState } from 'react';
import { ThemeProvider, useTheme } from 'next-themes';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <SafeClerkProvider>{children}</SafeClerkProvider>
    </ThemeProvider>
  );
}

function SafeClerkProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Ensures it's only rendered on the client
  }, []);

  if (!mounted) return null; // Prevents hydration errors

  return (
    <ClerkProvider
      appearance={{
        baseTheme: theme === 'dark' ? dark : undefined, // Light theme defaults to white
      }}
    >
      {children}
    </ClerkProvider>
  );
}

