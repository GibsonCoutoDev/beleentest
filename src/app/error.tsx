'use client';

import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html lang="pt-BR">
      <body className="font-body antialiased">
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center px-4">
          <AlertTriangle className="w-24 h-24 text-destructive mb-6" />
          <h1 className="font-headline text-4xl font-bold mb-4 text-destructive-foreground">Algo deu errado!</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-md">
            Pedimos desculpas pelo inconveniente. Por favor, tente novamente.
          </p>
          <pre className="text-xs text-muted-foreground bg-muted p-4 rounded-md overflow-auto max-w-full mb-6">
            {error.message}
            {error.digest && ` (Digest: ${error.digest})`}
          </pre>
          <Button
            onClick={() => reset()}
            size="lg"
            variant="destructive"
          >
            Tentar Novamente
          </Button>
        </div>
      </body>
    </html>
  );
}
