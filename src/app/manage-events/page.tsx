'use client';
import EventCard from '@/components/events/EventCard';
import { Button } from '@/components/ui/button';
import { mockEvents } from '@/lib/mockData'; // Assuming user's events are a subset for now
import { PlusCircle, Settings } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// In a real app, these would be fetched for the logged-in user
const userCreatedEvents = mockEvents.slice(0, 2); 

export default function ManageEventsPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Here you would check if the user is logged in.
    // If not, redirect to login page.
    // const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    // if (!isLoggedIn) {
    //   router.push('/login');
    // }
  }, []);

  if (!isClient) {
     return (
       <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="font-headline text-4xl font-bold">Gerenciar Meus Eventos</h1>
          <div className="h-10 w-40 bg-muted rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(2)].map((_, i) => (
             <div key={i} className="animate-pulse bg-card shadow-lg rounded-lg p-4 space-y-3 h-96">
                <div className="h-40 bg-muted rounded"></div>
                <div className="h-6 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-10 bg-muted rounded w-full mt-4"></div>
              </div>
          ))}
        </div>
      </div>
     );
  }


  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex items-center gap-3">
            <Settings className="h-10 w-10 text-primary" />
            <h1 className="font-headline text-4xl font-bold">Gerenciar Eventos</h1>
        </div>
        <Button asChild>
          <Link href="/create-event">
            <PlusCircle className="mr-2 h-4 w-4" /> Criar Novo Evento
          </Link>
        </Button>
      </div>

      {userCreatedEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {userCreatedEvents.map((event) => (
            <EventCard key={event.id} event={event} manageMode={true} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed border-muted-foreground/30 rounded-lg">
          <Settings className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
          <h2 className="text-2xl font-semibold text-muted-foreground mb-2">Você ainda não criou nenhum evento.</h2>
          <p className="text-muted-foreground mb-6">Comece a organizar e compartilhar suas ideias com o mundo!</p>
          <Button asChild size="lg">
            <Link href="/create-event">
              <PlusCircle className="mr-2 h-5 w-5" /> Criar Meu Primeiro Evento
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
