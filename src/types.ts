export type ServiceCategory = 'chauffage' | 'climatisation' | 'plomberie' | 'multiple';

export type ProjectType = 'installation' | 'depannage' | 'entretien' | 'renovation' | 'autre';

export type PreferredContact = 'telephone' | 'sms' | 'email';

export type RequestStatus = 'nouveau' | 'contacte' | 'visite_programmee' | 'devis_envoye' | 'termine' | 'archive';

export interface QuoteRequest {
  id: string;
  reference: string;
  customerName: string;
  phone: string;
  email?: string;
  service: ServiceCategory;
  projectType: ProjectType;
  description: string;
  city: string;
  address?: string;
  preferredContact: PreferredContact;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
  notes?: string[];
}

export interface ServiceDetail {
  id: ServiceCategory;
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
  imageUrl: string;
  accentColor: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: ServiceCategory;
  city: string;
  description: string;
  imageUrl: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}
