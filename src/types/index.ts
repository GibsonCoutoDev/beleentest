
export type EventCategory = 'Workshop' | 'Seminário' | 'Conferência' | 'Social' | 'Networking' | 'Outro';

export const eventCategories: EventCategory[] = ['Workshop', 'Seminário', 'Conferência', 'Social', 'Networking', 'Outro'];

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string; 
  time: string; 
  locationType: 'Online' | 'Presencial';
  address?: string; 
  onlineLink?: string; 
  category: EventCategory;
  imageUrl: string;
  organizer: string; 
  slug: string;
}
