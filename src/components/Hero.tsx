import React from 'react';
import {
  Flame,
  Snowflake,
  Wrench,
  Phone,
  FileText,
  ArrowRight,
  CheckCircle,
  MessageCircle,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { ServiceCategory } from '../types';

interface HeroProps {
  onOpenCallModal: () => void;
  onNavigateToQuote: (service?: ServiceCategory) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenCallModal,
  onNavigateToQuote,
}) => {
  return (
    <section id="accueil" className="relative bg-[#0F1E36] text-white overflow-hidden pt-6 pb-14 sm:pt-8 sm:pb-16 lg:py-24 scroll-mt-24">
      {/* Background ambient lighting and subtle technical patterns */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C87D55]/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl" />
        {/* Subtle geometric line grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-7">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-xs sm:text-sm font-semibold text-slate-200">
              <span className="w-2 h-2 rounded-full bg-[#C87D55]" />
              <span>Chauffage • Climatisation • Plomberie à Lyon</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] sm:leading-[1.08] text-white">
              Votre confort,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E28743] via-[#C87D55] to-[#E07A5F]">
                notre priorité !
              </span>
            </h1>

            {/* Official Business Description */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              {COMPANY_INFO.description}
            </p>

            {/* Primary & Secondary Call to Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => onNavigateToQuote()}
                className="min-h-[48px] inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#C87D55] hover:bg-[#B56C45] text-white text-sm sm:text-base font-extrabold shadow-lg shadow-[#C87D55]/25 active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-white"
              >
                <FileText className="w-5 h-5 text-white" />
                <span>Demander un devis</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onOpenCallModal}
                className="min-h-[48px] inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 active:bg-white/20 border border-white/20 text-white text-sm sm:text-base font-bold backdrop-blur-sm active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-white"
              >
                <Phone className="w-5 h-5 text-[#C87D55]" />
                <span>Appeler maintenant</span>
              </button>
            </div>

            {/* Direct Telephone Badges */}
            <div className="pt-2 border-t border-white/10">
              <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                Joindre un artisan directement :
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {COMPANY_INFO.phoneNumbers.map((phone) => (
                  <a
                    key={phone.raw}
                    href={`tel:${phone.raw}`}
                    className="min-h-[44px] inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white text-xs sm:text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-[#C87D55]"
                    aria-label={`Appeler le ${phone.display}`}
                  >
                    <Phone className="w-4 h-4 text-[#C87D55]" />
                    <span>{phone.display}</span>
                  </a>
                ))}

                <a
                  href="https://wa.me/33758718229?text=Bonjour%20MN%20Solution%20%C3%89nergie%2C%20je%20souhaite%20un%20devis%20ou%20des%20renseignements."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 hover:text-emerald-200 text-xs sm:text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400"
                  aria-label="Contacter sur WhatsApp au 07 58 71 82 29"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Three Pillar Services Pills */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-3">
              {[
                {
                  label: 'Chauffage',
                  desc: 'Installation & panne',
                  icon: Flame,
                  color: 'text-[#C87D55]',
                  service: 'chauffage' as const,
                },
                {
                  label: 'Climatisation',
                  desc: 'Mono & multi-split',
                  icon: Snowflake,
                  color: 'text-sky-400',
                  service: 'climatisation' as const,
                },
                {
                  label: 'Énergie & PAC',
                  desc: 'Pompe à chaleur, thermique',
                  icon: Wrench,
                  color: 'text-[#DE8E60]',
                  service: 'plomberie' as const,
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    type="button"
                    key={item.label}
                    onClick={() => onNavigateToQuote(item.service)}
                    className="min-h-[64px] p-2.5 sm:p-4 rounded-xl bg-white/5 border border-white/10 text-left hover:bg-white/10 hover:border-[#C87D55]/50 active:bg-white/15 transition-all group focus-visible:ring-2 focus-visible:ring-[#C87D55]"
                    aria-label={`Demander un devis pour le service ${item.label}`}
                  >
                    <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${item.color} mb-1`} />
                    <div className="font-bold text-xs sm:text-sm text-white group-hover:text-[#C87D55] transition-colors leading-tight">
                      {item.label}
                    </div>
                    <div className="text-[10px] sm:text-xs text-slate-400 mt-0.5 hidden xs:block truncate">
                      {item.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Hero Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-[#C87D55] via-slate-700 to-sky-400 opacity-25 blur-lg" aria-hidden="true" />

              <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-white/15 shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80"
                  alt="Installation et maintenance de chauffage, climatisation et énergies thermiques - MN Solution Énergie"
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover object-center filter brightness-[0.88] group-hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />

                {/* Floating overlay badge bottom */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 bg-gradient-to-t from-[#0F1E36] via-[#0F1E36]/90 to-transparent">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C87D55]" />
                    <span className="text-[11px] sm:text-xs uppercase tracking-wider font-extrabold text-amber-300">
                      Proximité & Réactivité
                    </span>
                  </div>
                  <div className="text-base sm:text-lg font-bold text-white leading-snug drop-shadow-sm">
                    Intervention sur Lyon et communes limitrophes
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 mt-2 sm:mt-3 text-xs text-slate-200">
                    <span className="inline-flex items-center gap-1 font-medium">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Devis gratuit
                    </span>
                    <span className="inline-flex items-center gap-1 font-medium">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Sans intermédiaire
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
