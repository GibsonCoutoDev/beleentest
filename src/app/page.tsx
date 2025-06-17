import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockEvents } from '@/lib/mockData';
import type { Event } from '@/types';
import { ArrowRight, CalendarDays, Search, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

function FeaturedEventCard({ event }: { event: Event }) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Image 
        src={event.imageUrl} 
        alt={event.title} 
        width={400} 
        height={250} 
        className="w-full h-48 object-cover"
        data-ai-hint="event cover" 
      />
      <CardHeader>
        <CardTitle className="font-headline text-xl">{event.title}</CardTitle>
        <CardDescription className="flex items-center text-sm">
          <CalendarDays className="mr-2 h-4 w-4" />
          {new Date(event.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
        <Button asChild className="mt-4 w-full" variant="outline">
          <Link href={`/discover-events/${event.slug}`}>
            Ver Detalhes <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default function HomePage() {
  const featuredEvents = mockEvents.slice(0, 3);

  return (
    <div className="space-y-12">
      <section className="text-center py-16 bg-gradient-to-br from-primary/10 via-background to-accent/10 rounded-lg shadow-inner">
        <h1 className="font-headline text-5xl md:text-6xl font-bold mb-6">
          Bem-vindo ao <span className="text-primary">Beleen Hub</span>
        </h1>
        <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
          Sua plataforma completa para descobrir, criar e gerenciar eventos incríveis. Conecte-se, aprenda e divirta-se!
        </p>
        <div className="space-x-4">
          <Button asChild size="lg" className="shadow-lg hover:shadow-primary/30 transition-shadow">
            <Link href="/discover-events">
              <Search className="mr-2 h-5 w-5" /> Explorar Eventos
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="shadow-lg hover:shadow-accent/30 transition-shadow">
            <Link href="/create-event">
              <CalendarDays className="mr-2 h-5 w-5" /> Criar um Evento
            </Link>
          </Button>
        </div>
      </section>

      <section>
        <h2 className="font-headline text-3xl font-semibold mb-8 text-center">Eventos em Destaque</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredEvents.map((event) => (
            <FeaturedEventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      <section className="py-12">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-lg">
            <Search className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-headline text-2xl font-semibold mb-2">Descubra</h3>
            <p className="text-foreground/70">Encontre workshops, seminários, conferências e eventos sociais perto de você ou online.</p>
          </div>
          <div className="p-6 rounded-lg">
            <CalendarDays className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-headline text-2xl font-semibold mb-2">Crie</h3>
            <p className="text-foreground/70">Organize seus próprios eventos com facilidade, sejam eles digitais ou presenciais.</p>
          </div>
          <div className="p-6 rounded-lg">
            <Users className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-headline text-2xl font-semibold mb-2">Conecte-se</h3>
            <p className="text-foreground/70">Junte-se a uma comunidade vibrante de organizadores e participantes de eventos.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
