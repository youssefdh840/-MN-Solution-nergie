import React from 'react';
import { ShieldCheck, MapPin, PhoneCall, Sparkles, UserCheck, Layers } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { Logo } from './Logo';

interface CompanyIntroProps {
  onOpenCallModal: () => void;
}

export const CompanyIntro: React.FC<CompanyIntroProps> = ({ onOpenCallModal }) => {
  return (
    <section id="a-propos" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual column */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-white p-2">
                <img
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
                  alt="MN Solution Énergie - Artisan chauffage, climatisation et plomberie à Lyon"
                  className="w-full h-80 sm:h-96 object-cover rounded-2xl"
                />
              </div>

              {/* Inset badge */}
              <div className="absolute -bottom-6 -right-4 sm:right-6 bg-[#0F1E36] text-white p-5 rounded-2xl shadow-xl border border-white/10 max-w-xs">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#C87D55]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    Secteur d'activité
                  </span>
                </div>
                <div className="text-sm font-bold leading-snug">
                  Lyon & métropole environnante
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  Chauffage • Climatisation • Plomberie
                </div>
              </div>
            </div>
          </div>

          {/* Text column */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-[#0F1E36]">
              <Sparkles className="w-3.5 h-3.5 text-[#C87D55]" />
              <span>À propos de l'entreprise</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F1E36] tracking-tight">
              MN Solution Énergie, votre artisan de confiance à Lyon
            </h2>

            <div className="text-base sm:text-lg text-slate-700 leading-relaxed space-y-4">
              <p>
                <strong>{COMPANY_INFO.name}</strong> est une entreprise dédiée à vos installations thermiques et sanitaires. Guidés par notre devise, <em className="text-[#C87D55] font-semibold">« {COMPANY_INFO.tagline} »</em>, nous mettons notre savoir-faire au service de votre bien-être au quotidien.
              </p>
              <p className="text-slate-600 text-sm sm:text-base">
                {COMPANY_INFO.description} Que vous ayez besoin d'un dépannage sur vos installations de chauffage, de l'installation d'une climatisation pour faire face aux étés lyonnais, ou de travaux de plomberie pour votre cuisine ou salle d'eau, nous vous accompagnons avec rigueur et écoute.
              </p>
            </div>

            {/* Grounded commitments without invented guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
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
                  3 métiers complémentaires
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  La synergie entre le chauffage, la climatisation et la plomberie pour une vision globale de vos réseaux d'énergie et d'eau.
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

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={onOpenCallModal}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0F1E36] hover:bg-[#C87D55] text-white text-xs sm:text-sm font-bold transition-colors shadow-sm"
              >
                <PhoneCall className="w-4 h-4 text-[#C87D55]" />
                <span>Nous contacter par téléphone</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
