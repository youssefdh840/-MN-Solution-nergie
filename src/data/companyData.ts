import { FAQItem, GalleryItem, ServiceDetail } from '../types';

export const COMPANY_INFO = {
  name: 'MN Solution Énergie',
  tagline: 'Votre confort, notre priorité !',
  description:
    'MN Solution Énergie vous accompagne dans vos besoins en chauffage, climatisation et plomberie à Lyon et dans les environs.',
  phoneNumbers: [
    { display: '07 58 78 22 29', raw: '+33758782229' },
    { display: '07 87 05 28 33', raw: '+33787052833' },
  ],
  email: 'mohamednefzaoui09@gmail.com',
  city: 'Lyon et agglomération',
  region: 'Auvergne-Rhône-Alpes, France',
  servicesList: ['Chauffage', 'Climatisation', 'Plomberie'],
};

export const SERVICES_DATA: ServiceDetail[] = [
  {
    id: 'chauffage',
    title: 'Chauffage',
    tagline: 'Installation, entretien et dépannage de vos installations thermiques',
    description:
      'MN Solution Énergie intervient sur vos équipements de chauffage pour assurer la performance thermique et le confort de votre intérieur à Lyon et ses alentours.',
    bullets: [
      'Installation et remplacement de chaudières et radiateurs',
      'Entretien régulier et contrôle de bon fonctionnement',
      'Dépannage sur pannes de chauffe et circuits défaillants',
      'Purge, équilibrage et désembouage des circuits d’eau chaude',
      'Raccordements hydrauliques et réglages thermiques précis',
    ],
    // High quality heating / boiler / radiator image
    imageUrl:
      'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#C87D55',
  },
  {
    id: 'climatisation',
    title: 'Climatisation',
    tagline: 'Fraîcheur en été, douceur en hiver pour un climat intérieur maîtrisé',
    description:
      'Nous prenons en charge la pose, la révision et le dépannage de vos systèmes de climatisation pour les appartements, maisons et locaux professionnels.',
    bullets: [
      'Installation de climatiseurs réversibles mono-split et multi-split',
      'Nettoyage approfondi des filtres et désinfection des échangeurs',
      'Diagnostic technique de flux d’air et contrôle des pressions',
      'Dépannage d’unités intérieures et blocs extérieurs',
      'Conseils d’utilisation pour optimiser votre consommation',
    ],
    // High quality air conditioning unit modern wall split image
    imageUrl:
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#0F1E36',
  },
  {
    id: 'plomberie',
    title: 'Plomberie',
    tagline: 'Interventions soignées sur réseaux d’eau, sanitaires et tuyauterie',
    description:
      'De la réparation de fuite au remplacement de vos équipements sanitaires, MN Solution Énergie répond à vos besoins de plomberie avec rigueur et propreté.',
    bullets: [
      'Recherche et réparation de fuites apparentes ou encastrées',
      'Remplacement et pose de robinetterie, mitigeurs et vannes',
      'Installation, détartrage et remplacement de chauffe-eau / cumulus',
      'Création et rénovation de tuyauteries cuivre, multicouche et PER',
      'Raccordement de sanitaires, éviers, douches et évacuations',
    ],
    // High quality plumbing / pipes / fittings image
    imageUrl:
      'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#B56C45',
  },
];

export const SERVICE_AREAS = [
  'Lyon 1er',
  'Lyon 2e',
  'Lyon 3e',
  'Lyon 4e',
  'Lyon 5e',
  'Lyon 6e',
  'Lyon 7e',
  'Lyon 8e',
  'Lyon 9e',
  'Villeurbanne',
  'Caluire-et-Cuire',
  'Bron',
  'Vénissieux',
  'Oullins-Pierre-Bénite',
  'Écully',
  'Tassin-la-Demi-Lune',
  'Saint-Priest',
  'Vaulx-en-Velin',
  'Décines-Charpieu',
  'Sainte-Foy-lès-Lyon',
  'Meyzieu',
  'Champagne-au-Mont-d’Or',
  'Rillieux-la-Pape',
  'Chassieu',
  'Saint-Fons',
  'Saint-Genis-Laval',
  'Francheville',
  'Dardilly',
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Pose de climatiseur réversible mural',
    category: 'climatisation',
    city: 'Lyon 6e',
    description: 'Installation soignée d’un split mural dans un salon avec passage de goulottes discret.',
    imageUrl:
      'https://images.unsplash.com/photo-1590756254933-2873d72a83b6?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'gal-2',
    title: 'Raccordement de collecteur hydraulique cuivre',
    category: 'chauffage',
    city: 'Villeurbanne',
    description: 'Distribution de réseau de chauffage central avec soudures soignées et purgeurs d’air.',
    imageUrl:
      'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'gal-3',
    title: 'Remplacement de robinetterie et étanchéité',
    category: 'plomberie',
    city: 'Caluire-et-Cuire',
    description: 'Pose d’un mitigeur haute précision et reprise des arrivées d’eau chaude/froide.',
    imageUrl:
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'gal-4',
    title: 'Unité extérieure de climatisation sur support',
    category: 'climatisation',
    city: 'Écully',
    description: 'Fixation antivibratile et raccordement frigorifique sécurisé pour un fonctionnement silencieux.',
    imageUrl:
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'gal-5',
    title: 'Contrôle et purge de radiateurs à eau chaude',
    category: 'chauffage',
    city: 'Lyon 3e',
    description: 'Vérification de la montée en température et équilibrage des vannes thermostatiques.',
    imageUrl:
      'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'gal-6',
    title: 'Réfection de tuyauterie d’alimentation et vidange',
    category: 'plomberie',
    city: 'Bron',
    description: 'Reprise complète de la tuyauterie sous évier avec vannes d’arrêt quart de tour.',
    imageUrl:
      'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80',
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Comment se passe une demande de devis chez MN Solution Énergie ?',
    answer:
      'Vous pouvez remplir notre formulaire de devis en ligne ou nous contacter directement au 07 58 78 22 29 ou au 07 87 05 28 33. Nous échangeons sur votre besoin, convenons au besoin d’un diagnostic sur place à Lyon et ses environs, puis nous vous remettons une proposition détaillée.',
  },
  {
    question: 'Quels sont vos numéros de téléphone officiels pour vous joindre ?',
    answer:
      'Vous pouvez joindre notre équipe directement à deux numéros : le 07 58 78 22 29 et le 07 87 05 28 33. Vous pouvez également nous écrire à mohamednefzaoui09@gmail.com.',
  },
  {
    question: 'Dans quel secteur géographique intervenez-vous ?',
    answer:
      'Nous intervenons dans tous les arrondissements de Lyon (du 1er au 9e) ainsi que dans les communes de la métropole lyonnaise (Villeurbanne, Caluire-et-Cuire, Vénissieux, Bron, Oullins, Écully, Tassin-la-Demi-Lune, Saint-Priest, etc.). N’hésitez pas à nous appeler si votre commune est limitrophe.',
  },
  {
    question: 'La demande de devis sur le site confirme-t-elle automatiquement un rendez-vous ?',
    answer:
      'Non. La transmission du formulaire ne constitue pas une confirmation automatique de rendez-vous ni un tarif définitif. Elle permet à notre équipe d’étudier la faisabilité technique de votre projet et de vous recontacter rapidement pour fixer les détails.',
  },
  {
    question: 'Quelles informations préparer pour faciliter votre réponse ?',
    answer:
      'Pour traiter au mieux votre demande, indiquez la nature des travaux (chauffage, climatisation ou plomberie), une description précise de la situation (panne, projet neuf, remplacement), votre ville et votre numéro de téléphone afin que nous puissions vous rappeler.',
  },
];
