import { mockEvents } from '@/lib/mockData';
import type { Event } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays, MapPin, Globe, Users, Tag, ArrowLeft, Ticket, UserCircle } from 'lucide-react';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return mockEvents.map((event) => ({
    slug: event.slug,
  }));
}

async function getEvent(slug: string): Promise<Event | undefined> {
  return mockEvents.find((event) => event.slug === slug);
}

export default async function EventDetailsPage({ params }: { params: { slug: string } }) {
  const event = await getEvent(params.slug);

  if (!event) {
    notFound();
  }

  const formattedDate = new Date(event.date).toLocaleDateString('pt-BR', {
    weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Button variant="outline" asChild className="mb-6">
        <Link href="/discover-events">
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Eventos
        </Link>
      </Button>

      <Card className="overflow-hidden shadow-xl">
        <div className="relative w-full h-72 md:h-96">
          <Image
            src={event.imageUrl}
            alt={event.title}
            layout="fill"
            objectFit="cover"
            priority
            data-ai-hint={`${event.category.toLowerCase()} detail`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-8">
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-white shadow-text">{event.title}</h1>
            <Badge className="mt-2" category={event.category} />
          </div>
        </div>
        
        <CardContent className="p-6 md:p-8 grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <h2 className="font-headline text-2xl font-semibold border-b pb-2">Sobre o Evento</h2>
            <p className="text-foreground/80 leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="font-headline text-2xl font-semibold border-b pb-2">Detalhes</h2>
            <div className="space-y-3 text-sm">
              <InfoItem icon={CalendarDays} label="Data e Hora" value={`${formattedDate} às ${event.time}`} />
              {event.locationType === 'Presencial' ? (
                <InfoItem icon={MapPin} label="Localização" value={event.address || 'A ser definido'} />
              ) : (
                <InfoItem icon={Globe} label="Plataforma Online" value={event.onlineLink ? <Link href={event.onlineLink} target="_blank" className="text-primary hover:underline">{event.onlineLink}</Link> : 'Link a ser divulgado'} />
              )}
              <InfoItem icon={Tag} label="Categoria" value={event.category} />
              <InfoItem icon={UserCircle} label="Organizador" value={event.organizer} />
            </div>
            <Button size="lg" className="w-full mt-6">
              <Ticket className="mr-2 h-5 w-5" /> Inscrever-se no Evento
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface InfoItemProps {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
}

function InfoItem({ icon: Icon, label, value }: InfoItemProps) {
  return (
    <div className="flex">
      <Icon className="mr-3 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
      <div>
        <p className="font-medium text-foreground">{label}</p>
        <div className="text-muted-foreground">{value}</div>
      </div>
    </div>
  );
}

interface BadgeProps {
    category: Event['category'];
    className?: string;
}

function Badge({ category, className }: BadgeProps) {
    let bgColor = 'bg-gray-200';
    let textColor = 'text-gray-800';

    switch (category) {
        case 'Workshop': bgColor = 'bg-blue-100'; textColor = 'text-blue-800'; break;
        case 'Seminário': bgColor = 'bg-green-100'; textColor = 'text-green-800'; break;
        case 'Conferência': bgColor = 'bg-purple-100'; textColor = 'text-purple-800'; break;
        case 'Social': bgColor = 'bg-yellow-100'; textColor = 'text-yellow-800'; break;
        case 'Networking': bgColor = 'bg-indigo-100'; textColor = 'text-indigo-800'; break;
        case 'Outro': bgColor = 'bg-pink-100'; textColor = 'text-pink-800'; break;
    }
    return (
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${bgColor} ${textColor} ${className}`}>
            {category}
        </span>
    );
}

