import React, { useState, useEffect } from 'react';
import {
  Flame,
  Snowflake,
  Wrench,
  Layers,
  MapPin,
  User,
  Phone,
  Mail,
  FileText,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Clock,
  Shield,
  Copy,
  Check,
} from 'lucide-react';
import { ServiceCategory, ProjectType, PreferredContact, QuoteRequest } from '../types';
import { COMPANY_INFO } from '../data/companyData';
import { quoteService } from '../services/quoteService';

interface QuoteFormProps {
  initialService?: ServiceCategory;
  onSuccess?: (request: QuoteRequest) => void;
}

export const QuoteForm: React.FC<QuoteFormProps> = ({
  initialService = 'chauffage',
  onSuccess,
}) => {
  const [step, setStep] = useState<number>(1);
  const [submitting, setSubmitting] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState<QuoteRequest | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  // Form State
  const [service, setService] = useState<ServiceCategory>(initialService);
  const [projectType, setProjectType] = useState<ProjectType>('installation');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('Lyon');
  const [address, setAddress] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredContact, setPreferredContact] = useState<PreferredContact>('telephone');

  // Form Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialService) {
      setService(initialService);
    }
  }, [initialService]);

  const validateStep = (currentStep: number): boolean => {
    const errs: Record<string, string> = {};

    if (currentStep === 1) {
      if (!service) errs.service = 'Veuillez sélectionner un domaine d’intervention.';
      if (!projectType) errs.projectType = 'Veuillez préciser la nature de votre besoin.';
    }

    if (currentStep === 2) {
      if (!description.trim() || description.trim().length < 10) {
        errs.description = 'Veuillez détailler votre projet (au moins 10 caractères).';
      }
      if (!city.trim()) {
        errs.city = 'Veuillez préciser la ville d’intervention.';
      }
    }

    if (currentStep === 3) {
      if (!customerName.trim()) {
        errs.customerName = 'Votre nom et prénom sont obligatoires.';
      }

      // French phone regex: checks for at least 10 digits
      const cleanedPhone = phone.replace(/[\s.-]/g, '');
      if (!cleanedPhone) {
        errs.phone = 'Le numéro de téléphone est obligatoire pour vous recontacter.';
      } else if (!/^(0|\+33)[1-9][0-9]{8}$/.test(cleanedPhone)) {
        errs.phone = 'Veuillez saisir un numéro de téléphone valide (ex : 06 12 34 56 78).';
      }

      if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errs.email = 'Format d’email invalide.';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handleBack = () => {
    setErrors({});
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setSubmitting(true);

    // Simulate reliable persistence with quoteService
    setTimeout(() => {
      const created = quoteService.createRequest({
        customerName: customerName.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        service,
        projectType,
        description: description.trim(),
        city: city.trim(),
        address: address.trim() || undefined,
        preferredContact,
      });

      setSubmitting(false);
      setSubmittedRequest(created);
      if (onSuccess) onSuccess(created);
    }, 600);
  };

  const handleReset = () => {
    setSubmittedRequest(null);
    setStep(1);
    setDescription('');
    setAddress('');
    setCustomerName('');
    setPhone('');
    setEmail('');
    setErrors({});
  };

  const copyReference = () => {
    if (!submittedRequest) return;
    navigator.clipboard.writeText(submittedRequest.reference);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  // SUCCESS VIEW
  if (submittedRequest) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 md:p-10 shadow-xl max-w-2xl mx-auto animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="text-center">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100/80 text-emerald-800 mb-2">
            Demande enregistrée avec succès
          </span>
          <h3 className="text-2xl font-extrabold text-[#0F1E36]">
            Merci {submittedRequest.customerName} !
          </h3>
          <p className="text-slate-600 mt-2 text-sm md:text-base max-w-lg mx-auto">
            Votre demande de devis pour vos travaux de{' '}
            <strong className="text-[#C87D55] capitalize">{submittedRequest.service}</strong> a bien été prise en compte.
          </p>
        </div>

        {/* Reference Banner */}
        <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div>
            <div className="text-xs uppercase font-medium text-slate-500">
              Référence de votre dossier
            </div>
            <div className="text-lg font-mono font-bold text-[#0F1E36]">
              {submittedRequest.reference}
            </div>
          </div>
          <button
            onClick={copyReference}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors shadow-sm"
          >
            {copiedRef ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Copié</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copier</span>
              </>
            )}
          </button>
        </div>

        {/* Mandatory Information Notice */}
        <div className="mt-5 p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3 text-xs md:text-sm text-amber-900 leading-relaxed">
          <AlertCircle className="w-5 h-5 text-[#C87D55] shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold block mb-0.5">Information importante :</strong>
            L’envoi de cette demande ne constitue pas une confirmation automatique de rendez-vous ni un prix définitif. Notre équipe étudie votre projet et vous recontactera rapidement par {submittedRequest.preferredContact === 'sms' ? 'SMS' : submittedRequest.preferredContact === 'email' ? 'email' : 'téléphone'} pour convenir des modalités.
          </div>
        </div>

        {/* Direct Contact shortcuts */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <div className="text-center text-xs text-slate-500 mb-3 font-medium">
            Besoin d'une réponse immédiate ? Contactez directement nos techniciens :
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {COMPANY_INFO.phoneNumbers.map((phone) => (
              <a
                key={phone.raw}
                href={`tel:${phone.raw}`}
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#0F1E36] hover:bg-[#C87D55] text-white font-semibold text-sm transition-colors shadow-sm"
              >
                <Phone className="w-4 h-4 text-[#C87D55]" />
                <span>{phone.display}</span>
              </a>
            ))}
          </div>

          <div className="text-center mt-3">
            <a
              href={`mailto:${COMPANY_INFO.email}?subject=Question devis ${submittedRequest.reference}`}
              className="text-xs text-slate-600 hover:text-[#C87D55] underline inline-flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" /> {COMPANY_INFO.email}
            </a>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handleReset}
            className="text-xs text-slate-500 hover:text-slate-800 underline font-medium"
          >
            Faire une autre demande de devis
          </button>
        </div>
      </div>
    );
  }

  // WIZARD FORM VIEW
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden max-w-3xl mx-auto">
      {/* Header bar */}
      <div className="bg-[#0F1E36] text-white p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C87D55]/15 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#C87D55]/20 text-amber-300 border border-[#C87D55]/40">
              Devis gratuit & sans engagement
            </span>
            <span className="text-xs font-medium text-slate-300">
              Étape {step} sur 3
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-3 text-white">
            Demander votre devis en ligne
          </h3>
          <p className="text-slate-300 text-sm mt-1 max-w-xl">
            Décrivez votre besoin en chauffage, climatisation ou plomberie à Lyon et alentours.
          </p>

          {/* Step Progress Pills */}
          <div className="grid grid-cols-3 gap-2 mt-5">
            {[
              { num: 1, label: 'Prestation' },
              { num: 2, label: 'Détails & Lieu' },
              { num: 3, label: 'Coordonnées' },
            ].map((s) => (
              <div key={s.num} className="flex flex-col gap-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    step >= s.num ? 'bg-[#C87D55]' : 'bg-slate-700'
                  }`}
                />
                <span
                  className={`text-[11px] font-medium hidden sm:inline ${
                    step >= s.num ? 'text-amber-200' : 'text-slate-400'
                  }`}
                >
                  {s.num}. {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-8">
        {/* STEP 1: SERVICE & PROJECT TYPE */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <label className="block text-sm font-bold text-[#0F1E36] mb-3">
                1. Quel domaine concerne votre demande ? <span className="text-rose-500">*</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: 'chauffage' as ServiceCategory,
                    label: 'Chauffage',
                    desc: 'Chaudière, radiateurs, réseau',
                    icon: Flame,
                    activeClass: 'border-[#C87D55] bg-amber-50/50 text-[#0F1E36]',
                    iconColor: 'text-[#C87D55]',
                  },
                  {
                    id: 'climatisation' as ServiceCategory,
                    label: 'Climatisation',
                    desc: 'Mono/multi-split réversible',
                    icon: Snowflake,
                    activeClass: 'border-sky-500 bg-sky-50/50 text-[#0F1E36]',
                    iconColor: 'text-sky-600',
                  },
                  {
                    id: 'plomberie' as ServiceCategory,
                    label: 'Plomberie',
                    desc: 'Fuites, sanitaires, tuyauterie',
                    icon: Wrench,
                    activeClass: 'border-[#B56C45] bg-orange-50/50 text-[#0F1E36]',
                    iconColor: 'text-[#B56C45]',
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = service === item.id;
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => {
                        setService(item.id);
                        setErrors((prev) => ({ ...prev, service: '' }));
                      }}
                      className={`p-4 rounded-xl border-2 text-left transition-all flex flex-col justify-between ${
                        isSelected
                          ? item.activeClass + ' shadow-md'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            isSelected ? 'bg-white shadow-sm' : 'bg-slate-100'
                          }`}
                        >
                          <Icon className={`w-5 h-5 ${item.iconColor}`} />
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            isSelected
                              ? 'border-[#C87D55] bg-[#C87D55]'
                              : 'border-slate-300'
                          }`}
                        >
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                      </div>
                      <div>
                        <div className="font-extrabold text-base text-[#0F1E36]">
                          {item.label}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {item.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {errors.service && (
                <p className="text-xs text-rose-600 mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.service}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-[#0F1E36] mb-3">
                2. Nature de l'intervention <span className="text-rose-500">*</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'installation' as ProjectType, label: 'Installation neuve' },
                  { id: 'depannage' as ProjectType, label: 'Dépannage / Panne' },
                  { id: 'entretien' as ProjectType, label: 'Entretien révision' },
                  { id: 'renovation' as ProjectType, label: 'Rénovation' },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setProjectType(item.id)}
                    className={`py-3 px-3 text-xs sm:text-sm font-semibold rounded-xl border text-center transition-all ${
                      projectType === item.id
                        ? 'border-[#0F1E36] bg-[#0F1E36] text-white shadow-sm'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0F1E36] hover:bg-[#C87D55] text-white font-bold text-sm transition-colors shadow-md"
              >
                <span>Continuer</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PROJECT DESCRIPTION & LOCATION */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <label htmlFor="description" className="block text-sm font-bold text-[#0F1E36] mb-1.5">
                Description de votre projet ou problème <span className="text-rose-500">*</span>
              </label>
              <p className="text-xs text-slate-500 mb-2">
                Précisez l’état actuel, le type de logement (appartement, maison, local), ou les symptômes en cas de panne.
              </p>
              <textarea
                id="description"
                rows={4}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (errors.description) setErrors((prev) => ({ ...prev, description: '' }));
                }}
                placeholder="Ex : Je souhaite installer une climatisation réversible dans mon salon de 30m² au 2ème étage à Lyon, ou faire réparer une fuite sous mon évier..."
                className={`w-full p-3.5 rounded-xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C87D55] transition-all ${
                  errors.description ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200 bg-slate-50/40 focus:bg-white'
                }`}
              />
              {errors.description && (
                <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.description}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-bold text-[#0F1E36] mb-1.5">
                  Ville ou arrondissement <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    id="city"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                      if (errors.city) setErrors((prev) => ({ ...prev, city: '' }));
                    }}
                    placeholder="Ex : Lyon 3e, Villeurbanne, Caluire..."
                    className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C87D55] transition-all ${
                      errors.city ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200 bg-slate-50/40 focus:bg-white'
                    }`}
                  />
                </div>
                {errors.city && (
                  <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.city}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-bold text-[#0F1E36] mb-1.5">
                  Adresse (optionnel)
                </label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Rue, numéro, étage..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/40 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C87D55] focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#C87D55] shrink-0" />
              <span>Intervention garantie à Lyon et dans toutes les communes environnantes.</span>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-sm font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Retour</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0F1E36] hover:bg-[#C87D55] text-white font-bold text-sm transition-colors shadow-md"
              >
                <span>Continuer</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CONTACT DETAILS & SUBMIT */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <label htmlFor="customerName" className="block text-sm font-bold text-[#0F1E36] mb-1.5">
                Nom et Prénom <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  id="customerName"
                  value={customerName}
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                    if (errors.customerName) setErrors((prev) => ({ ...prev, customerName: '' }));
                  }}
                  placeholder="Ex : M. Thomas Martin"
                  className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C87D55] transition-all ${
                    errors.customerName ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200 bg-slate-50/40 focus:bg-white'
                  }`}
                />
              </div>
              {errors.customerName && (
                <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.customerName}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-[#0F1E36] mb-1.5">
                  Numéro de téléphone <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                    }}
                    placeholder="06 12 34 56 78"
                    className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C87D55] transition-all ${
                      errors.phone ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200 bg-slate-50/40 focus:bg-white'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-[#0F1E36] mb-1.5">
                  Adresse email (optionnel)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                    }}
                    placeholder="nom@exemple.fr"
                    className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C87D55] transition-all ${
                      errors.email ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200 bg-slate-50/40 focus:bg-white'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#0F1E36] mb-2">
                Moyen de contact préféré
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'telephone' as PreferredContact, label: 'Appel' },
                  { id: 'sms' as PreferredContact, label: 'SMS' },
                  { id: 'email' as PreferredContact, label: 'Email' },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setPreferredContact(item.id)}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-all ${
                      preferredContact === item.id
                        ? 'border-[#C87D55] bg-amber-50 text-[#0F1E36]'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mandatory Non-binding Disclaimer */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
              <strong className="text-slate-800 font-semibold block mb-0.5">
                Note de transparence :
              </strong>
              L’envoi de votre demande de devis ne constitue pas une confirmation automatique de rendez-vous ni un engagement tarifaire ferme. Nous examinerons votre demande et vous recontacterons dans les meilleurs délais.
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={handleBack}
                disabled={submitting}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-sm font-medium transition-colors disabled:opacity-50"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Retour</span>
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#0F1E36] hover:bg-[#C87D55] text-white font-extrabold text-sm transition-all shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#C87D55]" />
                    <span>Envoi en cours...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#C87D55]" />
                    <span>Envoyer ma demande de devis</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
