import React from 'react';
import { MapPin, Phone, ShieldCheck, Clock, CheckCircle2, FileText, Compass, Sparkles } from 'lucide-react';

interface ServiceAreaSectionProps {
  onOpenCallModal: () => void;
  onNavigateToQuote?: () => void;
}

export const ServiceAreaSection: React.FC<ServiceAreaSectionProps> = ({
  onOpenCallModal,
  onNavigateToQuote,
}) => {
  return (
    <section
      id="zone-intervention"
      className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200/80 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-[#0F1E36] mb-3 shadow-xs">
            <MapPin className="w-3.5 h-3.5 text-[#C87D55]" /> Couverture Régionale
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F1E36] tracking-tight">
            Zone d'intervention : Rhône-Alpes
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed">
            MN Solution Énergie intervient rapidement dans l'ensemble de la région Rhône-Alpes pour tous vos travaux de chauffage, climatisation et plomberie.
          </p>
        </div>

        {/* Clean, Modern Rhône-Alpes Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-10">
          {/* Feature 1 */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#C87D55] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-[#0F1E36] mb-2.5">
              Mobilité Toute Région
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Déplacements organisés pour les particuliers et professionnels dans l'ensemble des départements et agglomérations de Rhône-Alpes.
            </p>
            <ul className="space-y-2 text-xs font-semibold text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C87D55] shrink-0" />
                <span>Intervention sur chantiers neufs & rénovations</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C87D55] shrink-0" />
                <span>Déplacements ponctuels et planifiés</span>
              </li>
            </ul>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#C87D55] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-[#0F1E36] mb-2.5">
              Réactivité & Disponibilité
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Prise en charge diligente de vos demandes de devis, dépannages techniques et visites de conformité sur site.
            </p>
            <ul className="space-y-2 text-xs font-semibold text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C87D55] shrink-0" />
                <span>Conseils techniques personnalisés</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C87D55] shrink-0" />
                <span>Interventions sous les meilleurs délais</span>
              </li>
            </ul>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#C87D55] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-[#0F1E36] mb-2.5">
              Expertise & Rigueur
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Équipements certifiés, respect scrupuleux des normes thermiques et sanitaires, et garanties professionnelles.
            </p>
            <ul className="space-y-2 text-xs font-semibold text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C87D55] shrink-0" />
                <span>Chauffage, climatisation et sanitaire</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C87D55] shrink-0" />
                <span>Devis clair, transparent et sans engagement</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Clean Regional Action Callout */}
        <div className="bg-gradient-to-br from-[#0F1E36] to-[#162744] text-white rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Votre projet en Rhône-Alpes</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-black text-white">
              Besoin d'une intervention ou d'un devis dans la région ?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Contactez directement notre équipe pour discuter de vos travaux ou demandez votre devis détaillé en ligne sans engagement.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={onOpenCallModal}
              className="w-full sm:w-auto min-h-[48px] px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2 transition-all border border-white/20 focus-visible:ring-2 focus-visible:ring-[#C87D55]"
            >
              <Phone className="w-4 h-4 text-[#C87D55]" />
              <span>Nous appeler</span>
            </button>

            {onNavigateToQuote && (
              <button
                type="button"
                onClick={onNavigateToQuote}
                className="w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-xl bg-[#C87D55] hover:bg-[#b56e47] active:scale-95 text-white text-xs sm:text-sm font-extrabold inline-flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg focus-visible:ring-2 focus-visible:ring-white"
              >
                <FileText className="w-4 h-4" />
                <span>Demander un devis</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
