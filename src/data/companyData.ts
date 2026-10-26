import { FAQItem, GalleryItem, ServiceDetail } from '../types';

export const COMPANY_INFO = {
  name: 'MN Solution Énergie',
  tagline: 'Votre confort, notre priorité !',
  description:
    'MN Solution Énergie vous accompagne pour tous vos travaux et installations de chauffage, climatisation et systèmes d’énergie thermique en région Rhône-Alpes.',
  phoneNumbers: [
    { display: '07 58 71 82 29', raw: '+33758718229', whatsapp: 'https://wa.me/33758718229' },
    { display: '07 87 05 28 33', raw: '+33787052833', whatsapp: 'https://wa.me/33787052833' },
  ],
  whatsappUrl: 'https://wa.me/33758718229',
  email: 'mohamednefzaoui09@gmail.com',
  city: 'Lyon et agglomération',
  region: 'Auvergne-Rhône-Alpes, France',
  servicesList: ['Chauffage', 'Climatisation', 'Énergie & Pompes à chaleur'],
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
    // High quality heating / boiler / Thermador installation
    imageUrl: '/IMG_20261020_232234_524.jpg',
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
    // Real project photo: Unité murale climatisation
    imageUrl: '/IMG_20261020_225040_603.jpg',
    accentColor: '#0F1E36',
  },
  {
    id: 'plomberie',
    title: 'Énergie & Pompes à Chaleur',
    tagline: 'Pompes à chaleur, ballons thermodynamiques et solutions thermiques durables',
    description:
      'MN Solution Énergie installe, optimise et entretient vos équipements thermiques innovants : pompes à chaleur (PAC air-eau / air-air), chauffe-eau thermodynamiques et réseaux hydrauliques de haute performance.',
    bullets: [
      'Installation et remplacement de pompes à chaleur (PAC) toutes marques',
      'Pose et raccordement de chauffe-eau thermodynamiques et ballons Eco Environnement',
      'Raccordements hydrauliques soignés et tuyauteries cuivre de distribution',
      'Optimisation des rendements thermiques et économies d’énergie',
      'Entretien, régulation et mise en conformité de vos installations thermiques',
    ],
    // Real project photo: Installation ballon Eco Environnement / Pompe à chaleur
    imageUrl: '/IMG_20261020_225034_480.jpg',
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
    title: 'Installation unité extérieure Gree',
    category: 'climatisation',
    city: 'Région Rhône-Alpes',
    description: 'Pose soignée et raccordement frigorifique d’une unité extérieure de climatisation Gree avec support antivibratile.',
    imageUrl: '/IMG_20261020_225040_600.jpg',
  },
  {
    id: 'gal-2',
    title: 'Installation pompe à chaleur Viessmann',
    category: 'chauffage',
    city: 'Région Rhône-Alpes',
    description: 'Mise en place d’une pompe à chaleur Viessmann dernière génération pour un rendement énergétique et thermique optimal.',
    imageUrl: '/IMG_20261020_232234_527.jpg',
  },
  {
    id: 'gal-3',
    title: 'Installation chaufferie et tuyauterie cuivre',
    category: 'chauffage',
    city: 'Région Rhône-Alpes',
    description: 'Raccordement hydraulique complet en tuyauterie cuivre soignée avec chaufferie et ballon d’eau chaude Thermador.',
    imageUrl: '/IMG_20261020_232234_524.jpg',
  },
  {
    id: 'gal-4',
    title: 'Unité extérieure climatisation',
    category: 'climatisation',
    city: 'Région Rhône-Alpes',
    description: 'Fixation et raccordement technique d’une unité extérieure pour climatisation réversible silencieuse et performante.',
    imageUrl: '/IMG_20261020_232234_528.jpg',
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Comment se passe une demande de devis chez MN Solution Énergie ?',
    answer:
      'Vous pouvez remplir notre formulaire de devis en ligne ou nous contacter directement au 07 58 71 82 29 ou au 07 87 05 28 33 (ou par WhatsApp au 07 58 71 82 29). Nous échangeons sur votre besoin, convenons au besoin d’un diagnostic sur place à Lyon et ses environs, puis nous vous remettons une proposition détaillée.',
  },
  {
    question: 'Quels sont vos numéros de téléphone officiels pour vous joindre ?',
    answer:
      'Vous pouvez joindre notre équipe directement à deux numéros : le 07 58 71 82 29 (disponible aussi sur WhatsApp) et le 07 87 05 28 33. Vous pouvez également nous écrire à mohamednefzaoui09@gmail.com.',
  },
  {
    question: 'Dans quel secteur géographique intervenez-vous ?',
    answer:
      'MN Solution Énergie intervient rapidement dans l\'ensemble de la région Rhône-Alpes (Rhône, Isère, Ain, Loire, Drôme, Savoie, etc.) pour tous vos travaux et dépannages de chauffage, climatisation et plomberie. N\'hésitez pas à nous contacter pour confirmer la prise en charge de votre localité.',
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
