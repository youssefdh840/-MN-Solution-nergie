import React from 'react';
import {
  Flame,
  Snowflake,
  Wrench,
  Phone,
  FileText,
  MapPin,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface HeroProps {
  onOpenCallModal: () => void;
  onNavigateToQuote: (service?: 'chauffage' | 'climatisation' | 'plomberie') => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenCallModal,
  onNavigateToQuote,
}) => {
  return (
    <section id="accueil" className="relative bg-[#0F1E36] text-white overflow-hidden pt-8 pb-16 lg:py-24">
      {/* Background ambient lighting and subtle technical patterns */}
      <div className="absolute inset-0 pointer-events-none">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-xs sm:text-sm font-semibold text-slate-200">
              <span className="w-2 h-2 rounded-full bg-[#C87D55]" />
              <span>Chauffage • Climatisation • Plomberie à Lyon</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white">
              Votre confort,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E28743] via-[#C87D55] to-[#E07A5F]">
                notre priorité !
              </span>
            </h1>

            {/* Official Business Description */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
              {COMPANY_INFO.description}
            </p>

            {/* Primary & Secondary Call to Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={() => onNavigateToQuote()}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-[#C87D55] hover:bg-[#B56C45] text-white text-base font-extrabold shadow-lg shadow-[#C87D55]/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <FileText className="w-5 h-5 text-white" />
                <span>Demander un devis</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenCallModal}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-base font-bold backdrop-blur-sm transition-all"
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
              <div className="flex flex-wrap items-center gap-3">
                {COMPANY_INFO.phoneNumbers.map((phone) => (
                  <a
                    key={phone.raw}
                    href={`tel:${phone.raw}`}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-white text-xs sm:text-sm font-semibold transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#C87D55]" />
                    <span>{phone.display}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Three Pillar Services Pills */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4">
              {[
                {
                  label: 'Chauffage',
                  desc: 'Installation & dépannage',
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
                  label: 'Plomberie',
                  desc: 'Fuites & sanitaires',
                  icon: Wrench,
                  color: 'text-[#DE8E60]',
                  service: 'plomberie' as const,
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={() => onNavigateToQuote(item.service)}
                    className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 text-left hover:bg-white/10 transition-colors group"
                  >
                    <Icon className={`w-5 h-5 ${item.color} mb-1.5`} />
                    <div className="font-bold text-xs sm:text-sm text-white group-hover:text-[#C87D55] transition-colors">
                      {item.label}
                    </div>
                    <div className="text-[10px] sm:text-xs text-slate-400 mt-0.5 truncate">
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
              {/* Outer decorative ring */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-[#C87D55] via-slate-700 to-sky-400 opacity-30 blur-lg" />

              <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-white/15 shadow-2xl">
                {/* Hero image showcasing professional HVAC installation */}
                <img
                  src="https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=900&q=80"
                  alt="Installation thermique et plomberie par MN Solution Énergie"
                  className="w-full h-80 sm:h-96 object-cover object-center filter brightness-[0.92]"
                />

                {/* Floating overlay badge bottom */}
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-[#0F1E36] via-[#0F1E36]/90 to-transparent">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C87D55]" />
                    <span className="text-xs uppercase tracking-wider font-extrabold text-amber-300">
                      Proximité & Réactivité
                    </span>
                  </div>
                  <div className="text-lg font-bold text-white leading-snug">
                    Intervention sur Lyon et communes limitrophes
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-xs text-slate-300">
                    <span className="inline-flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Devis gratuit
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Sans intermédiaire
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
