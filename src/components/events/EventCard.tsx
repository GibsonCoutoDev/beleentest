import Image from 'next/image';
import Link from 'next/link';
import type { Event } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, MapPin, Globe, ArrowRight, Tag, Users, Presentation, DraftingCompass, PartyPopper, Network, HelpCircle } from 'lucide-react';

interface EventCardProps {
  event: Event;
  manageMode?: boolean; // To show edit/delete buttons
}

const categoryIcons: Record<Event['category'], React.ElementType> = {
  'Workshop': DraftingCompass,
  'Seminário': Presentation,
  'Conferência': Users,
  'Social': PartyPopper,
  'Networking': Network,
  'Outro': Tag,
};

export default function EventCard({ event, manageMode = false }: EventCardProps) {
  const IconComponent = categoryIcons[event.category] || HelpCircle;
  
  const formattedDate = new Date(event.date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 h-full">
      <div className="relative w-full h-48">
        <Image
          src={event.imageUrl}
          alt={event.title}
          layout="fill"
          objectFit="cover"
          data-ai-hint={`${event.category.toLowerCase()} event`}
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="font-headline text-xl mb-1">{event.title}</CardTitle>
          <div className="p-2 bg-accent/10 rounded-full">
             <IconComponent className="h-5 w-5 text-accent" />
          </div>
        </div>
        <CardDescription className="text-xs text-muted-foreground">{event.category}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <p className="text-sm text-foreground/80 line-clamp-3">{event.description}</p>
        <div className="space-y-1 text-sm">
          <div className="flex items-center text-muted-foreground">
            <CalendarDays className="mr-2 h-4 w-4 text-primary" />
            <span>{formattedDate} às {event.time}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            {event.locationType === 'Presencial' ? (
              <MapPin className="mr-2 h-4 w-4 text-primary" />
            ) : (
              <Globe className="mr-2 h-4 w-4 text-primary" />
            )}
            <span>{event.locationType === 'Presencial' ? event.address : 'Online'}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        {manageMode ? (
          <div className="flex w-full space-x-2">
            <Button variant="outline" size="sm" className="flex-1">Editar</Button>
            <Button variant="destructive" size="sm" className="flex-1">Excluir</Button>
          </div>
        ) : (
          <Button asChild className="w-full bg-primary hover:bg-primary/90">
            <Link href={`/discover-events/${event.slug}`}>
              Ver Detalhes <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
