import React, { useState, useEffect, useRef } from 'react';
import {
  Flame,
  Snowflake,
  Wrench,
  MapPin,
  User,
  Phone,
  Mail,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Loader2,
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
  const formTopRef = useRef<HTMLDivElement>(null);

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

  const scrollToFormTop = () => {
    if (formTopRef.current) {
      formTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

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

      // French phone regex: checks for valid phone format
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
      scrollToFormTop();
    }
  };

  const handleBack = () => {
    setErrors({});
    setStep((prev) => Math.max(prev - 1, 1));
    scrollToFormTop();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setSubmitting(true);
    setErrors({});

    try {
      const created = await quoteService.createRequest({
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
      scrollToFormTop();
    } catch (err) {
      console.error('Erreur de soumission Firestore :', err);
      setSubmitting(false);
      setErrors({
        form: 'Une erreur est survenue lors de l’enregistrement de votre demande. Veuillez vérifier votre connexion ou nous contacter par téléphone au 07 58 71 82 29.',
      });
    }
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
    scrollToFormTop();
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
      <div ref={formTopRef} className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-8 md:p-10 shadow-xl max-w-2xl mx-auto animate-in zoom-in-95 duration-200">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 sm:w-9 sm:h-9" />
        </div>

        <div className="text-center">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100/80 text-emerald-800 mb-2">
            Demande enregistrée avec succès
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F1E36]">
            Merci {submittedRequest.customerName} !
          </h3>
          <p className="text-slate-600 mt-2 text-xs sm:text-sm md:text-base max-w-lg mx-auto">
            Votre demande de devis pour vos travaux de{' '}
            <strong className="text-[#C87D55] capitalize">{submittedRequest.service}</strong> a bien été prise en compte.
          </p>
        </div>

        {/* Reference Banner */}
        <div className="mt-5 sm:mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3">
          <div>
            <div className="text-[11px] uppercase font-medium text-slate-500">
              Référence de votre dossier
            </div>
            <div className="text-base sm:text-lg font-mono font-bold text-[#0F1E36]">
              {submittedRequest.reference}
            </div>
          </div>
          <button
            type="button"
            onClick={copyReference}
            className="min-h-[44px] flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 active:bg-slate-200 transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-[#C87D55]"
            aria-label="Copier la référence de devis"
          >
            {copiedRef ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Copié</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copier la référence</span>
              </>
            )}
          </button>
        </div>

        {/* Mandatory Information Notice */}
        <div className="mt-4 sm:mt-5 p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3 text-xs sm:text-sm text-amber-900 leading-relaxed">
          <AlertCircle className="w-5 h-5 text-[#C87D55] shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold block mb-0.5">Information importante :</strong>
            L’envoi de cette demande ne constitue pas une confirmation automatique de rendez-vous ni un prix définitif. Notre équipe étudie votre projet et vous recontactera rapidement par {submittedRequest.preferredContact === 'sms' ? 'SMS' : submittedRequest.preferredContact === 'email' ? 'email' : 'téléphone'} pour convenir des modalités.
          </div>
        </div>

        {/* Direct Contact shortcuts */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <div className="text-center text-xs text-slate-500 mb-3 font-medium">
            Besoin d'une réponse immédiate ? Contactez directement nos techniciens :
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {COMPANY_INFO.phoneNumbers.map((phone) => (
              <a
                key={phone.raw}
                href={`tel:${phone.raw}`}
                className="min-h-[44px] flex items-center justify-center gap-2 p-3 rounded-xl bg-[#0F1E36] hover:bg-[#C87D55] active:scale-95 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-[#C87D55]"
              >
                <Phone className="w-4 h-4 text-[#C87D55]" />
                <span>{phone.display}</span>
              </a>
            ))}
          </div>

          <div className="text-center mt-3">
            <a
              href={`mailto:${COMPANY_INFO.email}?subject=Question devis ${submittedRequest.reference}`}
              className="min-h-[36px] text-xs text-slate-600 hover:text-[#C87D55] underline inline-flex items-center gap-1.5 focus-visible:ring-1 focus-visible:ring-[#C87D55] rounded px-2"
            >
              <Mail className="w-3.5 h-3.5" /> {COMPANY_INFO.email}
            </a>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={handleReset}
            className="min-h-[44px] text-xs text-slate-500 hover:text-slate-800 underline font-medium px-4 focus-visible:ring-2 focus-visible:ring-[#C87D55] rounded-lg"
          >
            Faire une autre demande de devis
          </button>
        </div>
      </div>
    );
  }

  // WIZARD FORM VIEW
  return (
    <div ref={formTopRef} className="bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden max-w-3xl mx-auto">
      {/* Header bar */}
      <div className="bg-[#0F1E36] text-white p-5 sm:p-7 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C87D55]/15 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" aria-hidden="true" />

        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-[#C87D55]/20 text-amber-300 border border-[#C87D55]/40">
              Devis gratuit & sans engagement
            </span>
            <span className="text-xs font-medium text-slate-300">
              Étape {step} sur 3
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight mt-2.5 text-white">
            Demander votre devis en ligne
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
            Décrivez votre besoin en chauffage, climatisation ou plomberie à Lyon et alentours.
          </p>

          {/* Step Progress Pills */}
          <div className="grid grid-cols-3 gap-2 mt-4 sm:mt-5" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={3}>
            {[
              { num: 1, label: 'Prestation' },
              { num: 2, label: 'Détails & Lieu' },
              { num: 3, label: 'Coordonnées' },
            ].map((s) => (
              <div key={s.num} className="flex flex-col gap-1">
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    step >= s.num ? 'bg-[#C87D55]' : 'bg-slate-700'
                  }`}
                />
                <span
                  className={`text-[10px] sm:text-[11px] font-medium hidden sm:inline ${
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

      <form onSubmit={handleSubmit} className="p-5 sm:p-7 md:p-8" noValidate>
        {errors.form && (
          <div className="p-3.5 mb-5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2" role="alert">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errors.form}</span>
          </div>
        )}

        {/* STEP 1: SERVICE & PROJECT TYPE */}
        {step === 1 && (
          <div className="space-y-5 sm:space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="block text-xs sm:text-sm font-bold text-[#0F1E36] mb-3">
                1. Quel domaine concerne votre demande ? <span className="text-rose-500">*</span>
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
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
                    label: 'Énergie & PAC',
                    desc: 'Pompe à chaleur, ballon, thermique',
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
                      className={`min-h-[90px] p-3.5 sm:p-4 rounded-xl border-2 text-left transition-all flex flex-col justify-between focus-visible:ring-2 focus-visible:ring-[#C87D55] ${
                        isSelected
                          ? item.activeClass + ' shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                      }`}
                      aria-pressed={isSelected}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center ${
                            isSelected ? 'bg-white shadow-xs' : 'bg-slate-100'
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
                        <div className="font-extrabold text-sm sm:text-base text-[#0F1E36]">
                          {item.label}
                        </div>
                        <div className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                          {item.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {errors.service && (
                <p className="text-xs text-rose-600 mt-2 flex items-center gap-1" role="alert">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.service}
                </p>
              )}
            </div>

            <div>
              <span className="block text-xs sm:text-sm font-bold text-[#0F1E36] mb-3">
                2. Nature de l'intervention <span className="text-rose-500">*</span>
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
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
                    className={`min-h-[44px] py-2.5 px-3 text-xs sm:text-sm font-semibold rounded-xl border text-center transition-all focus-visible:ring-2 focus-visible:ring-[#C87D55] ${
                      projectType === item.id
                        ? 'border-[#0F1E36] bg-[#0F1E36] text-white shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                    aria-pressed={projectType === item.id}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="min-h-[48px] w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0F1E36] hover:bg-[#C87D55] active:scale-95 text-white font-bold text-sm transition-all shadow-md focus-visible:ring-2 focus-visible:ring-[#C87D55]"
              >
                <span>Continuer</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PROJECT DESCRIPTION & LOCATION */}
        {step === 2 && (
          <div className="space-y-5 sm:space-y-6 animate-in fade-in duration-200">
            <div>
              <label htmlFor="description" className="block text-xs sm:text-sm font-bold text-[#0F1E36] mb-1.5">
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
                className={`w-full p-3.5 rounded-xl border text-base sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C87D55] transition-all ${
                  errors.description ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200 bg-slate-50/40 focus:bg-white'
                }`}
                aria-invalid={!!errors.description}
              />
              {errors.description && (
                <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1" role="alert">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.description}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              <div>
                <label htmlFor="city" className="block text-xs sm:text-sm font-bold text-[#0F1E36] mb-1.5">
                  Ville ou arrondissement <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" aria-hidden="true" />
                  <input
                    type="text"
                    id="city"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                      if (errors.city) setErrors((prev) => ({ ...prev, city: '' }));
                    }}
                    placeholder="Ex : Lyon 3e, Villeurbanne, Caluire..."
                    autoComplete="address-level2"
                    className={`w-full min-h-[44px] pl-10 pr-3.5 py-2.5 rounded-xl border text-base sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C87D55] transition-all ${
                      errors.city ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200 bg-slate-50/40 focus:bg-white'
                    }`}
                    aria-invalid={!!errors.city}
                  />
                </div>
                {errors.city && (
                  <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1" role="alert">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.city}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="address" className="block text-xs sm:text-sm font-bold text-[#0F1E36] mb-1.5">
                  Adresse (optionnel)
                </label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Rue, numéro, étage..."
                  autoComplete="street-address"
                  className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/40 text-base sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C87D55] focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#C87D55] shrink-0" />
              <span>Intervention garantie dans l'ensemble de la région Rhône-Alpes.</span>
            </div>

            <div className="pt-3 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              <button
                type="button"
                onClick={handleBack}
                className="min-h-[48px] inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 active:bg-slate-200 text-xs sm:text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-[#C87D55]"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Retour</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0F1E36] hover:bg-[#C87D55] active:scale-95 text-white font-bold text-sm transition-all shadow-md focus-visible:ring-2 focus-visible:ring-[#C87D55]"
              >
                <span>Continuer</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CONTACT DETAILS & SUBMIT */}
        {step === 3 && (
          <div className="space-y-5 sm:space-y-6 animate-in fade-in duration-200">
            <div>
              <label htmlFor="customerName" className="block text-xs sm:text-sm font-bold text-[#0F1E36] mb-1.5">
                Nom et Prénom <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" aria-hidden="true" />
                <input
                  type="text"
                  id="customerName"
                  value={customerName}
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                    if (errors.customerName) setErrors((prev) => ({ ...prev, customerName: '' }));
                  }}
                  placeholder="Ex : M. Thomas Martin"
                  autoComplete="name"
                  className={`w-full min-h-[44px] pl-10 pr-3.5 py-2.5 rounded-xl border text-base sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C87D55] transition-all ${
                    errors.customerName ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200 bg-slate-50/40 focus:bg-white'
                  }`}
                  aria-invalid={!!errors.customerName}
                />
              </div>
              {errors.customerName && (
                <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1" role="alert">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.customerName}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              <div>
                <label htmlFor="phone" className="block text-xs sm:text-sm font-bold text-[#0F1E36] mb-1.5">
                  Numéro de téléphone <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" aria-hidden="true" />
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                    }}
                    placeholder="06 12 34 56 78"
                    inputMode="tel"
                    autoComplete="tel"
                    className={`w-full min-h-[44px] pl-10 pr-3.5 py-2.5 rounded-xl border text-base sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C87D55] transition-all ${
                      errors.phone ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200 bg-slate-50/40 focus:bg-white'
                    }`}
                    aria-invalid={!!errors.phone}
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1" role="alert">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-bold text-[#0F1E36] mb-1.5">
                  Adresse email (optionnel)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" aria-hidden="true" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                    }}
                    placeholder="nom@exemple.fr"
                    inputMode="email"
                    autoComplete="email"
                    className={`w-full min-h-[44px] pl-10 pr-3.5 py-2.5 rounded-xl border text-base sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C87D55] transition-all ${
                      errors.email ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200 bg-slate-50/40 focus:bg-white'
                    }`}
                    aria-invalid={!!errors.email}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1" role="alert">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <span className="block text-xs sm:text-sm font-bold text-[#0F1E36] mb-2">
                Moyen de contact préféré
              </span>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {[
                  { id: 'telephone' as PreferredContact, label: 'Appel' },
                  { id: 'sms' as PreferredContact, label: 'SMS' },
                  { id: 'email' as PreferredContact, label: 'Email' },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setPreferredContact(item.id)}
                    className={`min-h-[44px] py-2 px-3 text-xs sm:text-sm font-semibold rounded-xl border text-center transition-all focus-visible:ring-2 focus-visible:ring-[#C87D55] ${
                      preferredContact === item.id
                        ? 'border-[#C87D55] bg-amber-50 text-[#0F1E36]'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                    aria-pressed={preferredContact === item.id}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mandatory Non-binding Disclaimer */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
              <strong className="text-slate-800 font-semibold block mb-0.5">
                Note de transparence :
              </strong>
              L’envoi de votre demande de devis ne constitue pas une confirmation automatique de rendez-vous ni un engagement tarifaire ferme. Nous examinerons votre demande et vous recontacterons dans les meilleurs délais.
            </div>

            <div className="pt-3 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleBack}
                disabled={submitting}
                className="min-h-[48px] inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 active:bg-slate-200 text-xs sm:text-sm font-medium transition-colors disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-[#C87D55]"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Retour</span>
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="min-h-[48px] inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-xl bg-[#0F1E36] hover:bg-[#C87D55] active:scale-95 text-white font-extrabold text-xs sm:text-sm transition-all shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-[#C87D55]"
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
