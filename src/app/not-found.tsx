import { Button } from '@/components/ui/button';
import { TriangleAlert } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-15rem)] text-center px-4">
      <TriangleAlert className="w-24 h-24 text-primary mb-6" />
      <h1 className="font-headline text-5xl font-bold mb-4">404 - Página Não Encontrada</h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-md">
        Oops! Parece que a página que você está procurando não existe ou foi movida.
      </p>
      <div className="space-x-4">
        <Button asChild size="lg">
          <Link href="/">Voltar para o Início</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/discover-events">Explorar Eventos</Link>
        </Button>
      </div>
    </div>
  );
}
