import React from 'react';
import { ShieldCheck, MapPin, PhoneCall, Sparkles, UserCheck, Layers, MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface CompanyIntroProps {
  onOpenCallModal: () => void;
}

export const CompanyIntro: React.FC<CompanyIntroProps> = ({ onOpenCallModal }) => {
  return (
    <section id="a-propos" className="py-14 sm:py-20 lg:py-24 bg-slate-50 border-b border-slate-200/80 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Visual column */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-white p-2">
                <img
                  src="/IMG_20261020_232234_527.jpg"
                  alt="MN Solution Énergie - Installation pompe à chaleur Viessmann, chauffage et climatisation"
                  className="w-full h-72 sm:h-80 lg:h-96 object-cover rounded-2xl shadow-sm"
                  loading="lazy"
                />
              </div>

              {/* Inset badge */}
              <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-6 sm:-right-4 lg:right-4 bg-[#0F1E36] text-white p-4 sm:p-5 rounded-2xl shadow-xl border border-white/10 max-w-xs">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#C87D55]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    Secteur d'activité
                  </span>
                </div>
                <div className="text-sm font-bold leading-snug">
                  Rhône-Alpes & Métropole
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  Chauffage • Climatisation • Énergie
                </div>
              </div>
            </div>
          </div>

          {/* Text column */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-5 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-[#0F1E36]">
              <Sparkles className="w-3.5 h-3.5 text-[#C87D55]" />
              <span>À propos de l'entreprise</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F1E36] tracking-tight">
              MN Solution Énergie, votre expert en solutions thermiques & climatiques
            </h2>

            <div className="text-sm sm:text-base lg:text-lg text-slate-700 leading-relaxed space-y-3 sm:space-y-4">
              <p>
                <strong>{COMPANY_INFO.name}</strong> est une entreprise spécialisée dans l'installation, le dépannage et l'optimisation de vos systèmes de <strong>chauffage, climatisation et énergies thermiques</strong> en région Rhône-Alpes. Guidés par notre devise, <em className="text-[#C87D55] font-semibold">« {COMPANY_INFO.tagline} »</em>, nous mettons notre rigueur technique au service de votre confort intérieur.
              </p>
              <p className="text-slate-600 text-xs sm:text-sm lg:text-base">
                Qu’il s’agisse de l’installation d’une pompe à chaleur haute performance, de la pose d’une climatisation réversible dernière génération, ou de la mise en place de ballons thermodynamiques et réseaux hydrauliques soignés, notre équipe vous accompagne avec réactivité et professionnalisme.
              </p>
            </div>

            {/* Grounded commitments without invented guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-sm">
                <div className="w-9 h-9 rounded-lg bg-amber-50 text-[#C87D55] flex items-center justify-center font-bold mb-2">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-[#0F1E36] text-sm">
                  Interlocuteur direct
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Vous échangez directement avec les professionnels intervenant sur votre chantier, sans plateforme intermédiaire.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-sm">
                <div className="w-9 h-9 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center font-bold mb-2">
                  <MapPin className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-[#0F1E36] text-sm">
                  Ancrage à Lyon & alentours
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Une proximité géographique garantissant disponibilité et réactivité sur l'ensemble du bassin lyonnais.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-sm">
                <div className="w-9 h-9 rounded-lg bg-orange-50 text-[#C87D55] flex items-center justify-center font-bold mb-2">
                  <Layers className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-[#0F1E36] text-sm">
                  Chauffage, Climatisation & Énergie
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Une expertise complète pour la maîtrise de vos consommations, le confort toutes saisons et la durabilité de vos équipements thermiques.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-sm">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-2">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-[#0F1E36] text-sm">
                  Devis clair & sans engagement
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Une transparence totale sur les travaux proposés et les fournitures nécessaires avant toute intervention.
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenCallModal}
                className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F1E36] hover:bg-[#C87D55] active:scale-95 text-white text-xs sm:text-sm font-bold transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-[#C87D55]"
              >
                <PhoneCall className="w-4 h-4 text-[#C87D55]" />
                <span>Nous contacter par téléphone</span>
              </button>

              <a
                href="https://wa.me/33758718229?text=Bonjour%20MN%20Solution%20%C3%89nergie%2C%20je%20souhaite%20des%20informations%20pour%20mon%20projet%20de%20chauffage%20%2F%20climatisation%20%2F%20%C3%A9nergie."
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs sm:text-sm font-bold transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-emerald-400"
                aria-label="Contacter MN Solution Énergie sur WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp (07 58 71 82 29)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
