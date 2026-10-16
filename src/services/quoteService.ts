import { QuoteRequest, RequestStatus } from '../types';

const STORAGE_KEY = 'mn_solution_energie_quotes_v1';

// Seed demo quote for testing initial admin view if empty
const INITIAL_DEMO_REQUESTS: QuoteRequest[] = [
  {
    id: 'req_demo_01',
    reference: 'MN-2026-4821',
    customerName: 'Jean-Marc Dupont',
    phone: '06 12 34 56 78',
    email: 'jm.dupont@example.fr',
    service: 'chauffage',
    projectType: 'entretien',
    description: 'Entretien annuel d’une chaudière à condensation et contrôle des radiateurs dans appartement.',
    city: 'Lyon 6e',
    address: 'Cours Vitton',
    preferredContact: 'telephone',
    status: 'visite_programmee',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    notes: ['Appel passé le 14/10, rdv convenu pour vendredi matin 9h.'],
  },
  {
    id: 'req_demo_02',
    reference: 'MN-2026-7290',
    customerName: 'Sarah Belkacem',
    phone: '06 98 76 54 32',
    email: 'sarah.b@example.fr',
    service: 'climatisation',
    projectType: 'installation',
    description: 'Installation d’un climatiseur bi-split (salon + chambre parentale) en maison de ville.',
    city: 'Villeurbanne',
    address: 'Avenue Roger Salengro',
    preferredContact: 'sms',
    status: 'nouveau',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    notes: [],
  },
];

export const quoteService = {
  getRequests(): QuoteRequest[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_REQUESTS));
        return INITIAL_DEMO_REQUESTS;
      }
      return JSON.parse(stored);
    } catch {
      return INITIAL_DEMO_REQUESTS;
    }
  },

  createRequest(data: Omit<QuoteRequest, 'id' | 'reference' | 'status' | 'createdAt' | 'updatedAt' | 'notes'>): QuoteRequest {
    const requests = this.getRequests();

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const reference = `MN-${new Date().getFullYear()}-${randomSuffix}`;
    const id = `req_${Date.now()}_${randomSuffix}`;
    const now = new Date().toISOString();

    const newRequest: QuoteRequest = {
      ...data,
      id,
      reference,
      status: 'nouveau',
      createdAt: now,
      updatedAt: now,
      notes: [],
    };

    const updated = [newRequest, ...requests];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    return newRequest;
  },

  updateStatus(id: string, status: RequestStatus): boolean {
    const requests = this.getRequests();
    const index = requests.findIndex((r) => r.id === id);
    if (index === -1) return false;

    requests[index].status = status;
    requests[index].updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
    return true;
  },

  addNote(id: string, note: string): boolean {
    const requests = this.getRequests();
    const index = requests.findIndex((r) => r.id === id);
    if (index === -1) return false;

    if (!requests[index].notes) {
      requests[index].notes = [];
    }
    requests[index].notes!.push(`[${new Date().toLocaleDateString('fr-FR')}] ${note}`);
    requests[index].updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
    return true;
  },

  deleteRequest(id: string): boolean {
    const requests = this.getRequests();
    const filtered = requests.filter((r) => r.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  },

  // Inspect Firebase status
  isFirebaseConfigured(): boolean {
    // Check if cloud Firebase config or service worker exists
    return false;
  },
};
