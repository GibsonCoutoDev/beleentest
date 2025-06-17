'use client';

import { useState, useMemo, useEffect } from 'react';
import EventCard from '@/components/events/EventCard';
import { mockEvents } from '@/lib/mockData';
import type { Event, EventCategory } from '@/types';
import { eventCategories } from '@/types';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, X, ListFilter } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function DiscoverEventsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'all'>('all');
  const [isLoading, setIsLoading] = useState(true); // Simulate loading

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredEvents = useMemo(() => {
    return mockEvents.filter((event) => {
      const matchesSearchTerm = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                event.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
      return matchesSearchTerm && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <h1 className="font-headline text-4xl font-bold text-center mb-8">Descobrir Eventos</h1>
        <Card className="p-6 mb-8 shadow-md">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-4 py-1">
              <div className="h-10 bg-muted rounded w-3/4"></div>
            </div>
            <div className="h-10 bg-muted rounded w-1/4"></div>
            <div className="h-10 bg-muted rounded w-1/4"></div>
          </div>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-muted rounded-t-lg"></div>
              <div className="p-4 space-y-3">
                <div className="h-6 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-10 bg-muted rounded w-full mt-4"></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="font-headline text-4xl font-bold mb-4">Descobrir Eventos</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Encontre os próximos workshops, seminários, conferências e muito mais. Use os filtros para refinar sua busca.
        </p>
      </header>

      <Card className="p-6 shadow-md sticky top-16 bg-background/90 backdrop-blur-sm z-10">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Pesquisar eventos por nome ou descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
              aria-label="Pesquisar eventos"
            />
          </div>
          <div className="w-full md:w-auto">
            <Select
              value={selectedCategory}
              onValueChange={(value) => setSelectedCategory(value as EventCategory | 'all')}
            >
              <SelectTrigger className="w-full md:w-[200px]" aria-label="Filtrar por categoria">
                 <ListFilter className="mr-2 h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Categorias</SelectItem>
                {eventCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" onClick={handleClearFilters} className="w-full md:w-auto" aria-label="Limpar filtros">
            <X className="mr-2 h-4 w-4" /> Limpar
          </Button>
        </div>
      </Card>

      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Search className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-xl text-muted-foreground">Nenhum evento encontrado.</p>
          <p className="text-sm text-muted-foreground mt-2">Tente ajustar seus filtros ou termos de pesquisa.</p>
        </div>
      )}
    </div>
  );
}
