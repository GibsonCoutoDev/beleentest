'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { CalendarIcon, PlusCircle } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { eventCategories, type EventCategory } from '@/types';
import { useState } from 'react';

const eventFormSchema = z.object({
  title: z.string().min(3, { message: 'O título deve ter pelo menos 3 caracteres.' }).max(100, { message: 'O título não pode exceder 100 caracteres.' }),
  description: z.string().min(10, { message: 'A descrição deve ter pelo menos 10 caracteres.' }).max(1000, { message: 'A descrição não pode exceder 1000 caracteres.' }),
  date: z.date({ required_error: 'A data do evento é obrigatória.' }),
  time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Formato de hora inválido (HH:MM).' }),
  locationType: z.enum(['Online', 'Presencial'], { required_error: 'Selecione o tipo de local.' }),
  address: z.string().optional(),
  onlineLink: z.string().url({ message: 'Por favor, insira uma URL válida.' }).optional(),
  category: z.enum(eventCategories, { required_error: 'Selecione uma categoria.' }),
  imageUrl: z.string().url({ message: 'URL da imagem inválida.'}).optional(),
}).refine(data => {
  if (data.locationType === 'Presencial' && !data.address) {
    return false;
  }
  return true;
}, {
  message: 'O endereço é obrigatório para eventos presenciais.',
  path: ['address'],
}).refine(data => {
  if (data.locationType === 'Online' && !data.onlineLink) {
    return false;
  }
  return true;
}, {
  message: 'O link online é obrigatório para eventos online.',
  path: ['onlineLink'],
});

type EventFormValues = z.infer<typeof eventFormSchema>;

export default function EventForm() {
  const { toast } = useToast();
  const [locationType, setLocationType] = useState<'Online' | 'Presencial' | undefined>();

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: '',
      description: '',
      time: '10:00',
      locationType: undefined,
      category: undefined,
      imageUrl: 'https://placehold.co/600x400',
    },
  });

  const onSubmit = async (data: EventFormValues) => {
    // Mock event creation
    console.log('Event data:', data);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: 'Evento Criado!',
      description: `O evento "${data.title}" foi criado com sucesso.`,
    });
    form.reset();
    setLocationType(undefined);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título do Evento</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Workshop de Culinária Vegana" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea placeholder="Detalhe o que acontecerá no evento, público-alvo, etc." className="min-h-[100px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data do Evento</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP", { locale: ptBR }) : <span>Escolha uma data</span>}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))} // Disable past dates
                      initialFocus
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Horário (HH:MM)</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria para o evento" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {eventCategories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="locationType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Tipo de Local</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    field.onChange(value);
                    setLocationType(value as 'Online' | 'Presencial');
                  }}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1 md:flex-row md:space-y-0 md:space-x-4"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Presencial" />
                    </FormControl>
                    <FormLabel className="font-normal">Presencial</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Online" />
                    </FormControl>
                    <FormLabel className="font-normal">Online</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {locationType === 'Presencial' && (
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Endereço Completo</FormLabel>
                <FormControl>
                  <Input placeholder="Rua, Número, Bairro, Cidade, Estado" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {locationType === 'Online' && (
          <FormField
            control={form.control}
            name="onlineLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link do Evento Online</FormLabel>
                <FormControl>
                  <Input placeholder="https://zoom.us/j/seu-evento" {...field} />
                </FormControl>
                <FormDescription>
                  Pode ser um link do Zoom, Google Meet, YouTube, etc.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL da Imagem de Capa (Opcional)</FormLabel>
              <FormControl>
                <Input placeholder="https://exemplo.com/imagem.png" {...field} />
              </FormControl>
               <FormDescription>
                  Use https://placehold.co/600x400 para uma imagem provisória.
                </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />


        <Button type="submit" className="w-full md:w-auto" disabled={form.formState.isSubmitting}>
           {form.formState.isSubmitting ? 'Criando Evento...' : <> <PlusCircle className="mr-2 h-4 w-4" /> Criar Evento </>}
        </Button>
      </form>
    </Form>
  );
}
