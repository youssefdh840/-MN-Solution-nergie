import React, { useState } from 'react';
import {
  Flame,
  Snowflake,
  Wrench,
  Check,
  FileText,
  ChevronRight,
} from 'lucide-react';
import { SERVICES_DATA } from '../data/companyData';
import { ServiceCategory } from '../types';

interface ServicesSectionProps {
  onNavigateToQuote: (service?: ServiceCategory) => void;
  onOpenCallModal: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onNavigateToQuote,
  onOpenCallModal,
}) => {
  const [activeTab, setActiveTab] = useState<ServiceCategory>('chauffage');

  const activeService = SERVICES_DATA.find((s) => s.id === activeTab) || SERVICES_DATA[0];

  const getServiceIcon = (id: ServiceCategory) => {
    switch (id) {
      case 'chauffage':
        return <Flame className="w-6 h-6 text-[#C87D55]" />;
      case 'climatisation':
        return <Snowflake className="w-6 h-6 text-sky-500" />;
      case 'plomberie':
        return <Wrench className="w-6 h-6 text-[#B56C45]" />;
      default:
        return <Flame className="w-6 h-6 text-[#C87D55]" />;
    }
  };

  return (
    <section id="services" className="py-14 sm:py-20 lg:py-24 bg-slate-50 border-b border-slate-200/80 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-[#0F1E36] mb-3">
            Nos Domaines d'Intervention
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F1E36] tracking-tight">
            Des prestations complètes pour votre habitat
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-slate-600">
            MN Solution Énergie met son savoir-faire technique à votre service à Lyon et dans sa périphérie.
          </p>
        </div>

        {/* 3 Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12 sm:mb-16">
          {SERVICES_DATA.map((service) => {
            return (
              <div
                key={service.id}
                id={service.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group scroll-mt-28"
              >
                {/* Image */}
                <div className="relative p-3 pb-0 overflow-hidden">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="object-cover rounded-xl shadow-md w-full h-64 group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-sm p-2.5 rounded-xl shadow-md">
                    {getServiceIcon(service.id)}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-[#0F1E36] group-hover:text-[#C87D55] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#C87D55] mt-1 mb-3">
                      {service.tagline}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      {service.description}
                    </p>

                    <div className="space-y-2 border-t border-slate-100 pt-3.5 mb-5">
                      {service.bullets.slice(0, 3).map((bullet, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <Check className="w-4 h-4 text-[#C87D55] shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Buttons with accessible touch targets */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => onNavigateToQuote(service.id)}
                      className="min-h-[44px] inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-[#0F1E36] hover:bg-[#C87D55] active:scale-95 text-white text-xs font-bold transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-[#C87D55]"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#C87D55]" />
                      <span>Demander un devis</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab(service.id);
                        const detailElem = document.getElementById('zoom-technique');
                        if (detailElem) detailElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      className="min-h-[44px] text-xs text-slate-500 hover:text-slate-900 font-semibold inline-flex items-center gap-1 px-2 focus-visible:ring-2 focus-visible:ring-[#C87D55] rounded-lg"
                    >
                      <span>En savoir plus</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Service Deep Dive Tab section */}
        <div id="zoom-technique" className="bg-white rounded-3xl border border-slate-200 shadow-md p-5 sm:p-8 lg:p-10 scroll-mt-28">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5 sm:pb-6 mb-6 sm:mb-8">
            <div>
              <span className="text-xs font-bold text-[#C87D55] uppercase tracking-wider">
                Zoom technique
              </span>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0F1E36] mt-0.5">
                Détail de notre accompagnement en {activeService.title}
              </h3>
            </div>

            {/* Tab switchers */}
            <div className="flex items-center gap-1 sm:gap-2 bg-slate-100 p-1.5 rounded-2xl self-start sm:self-auto overflow-x-auto max-w-full">
              {SERVICES_DATA.map((s) => (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => setActiveTab(s.id)}
                  className={`min-h-[44px] px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[#C87D55] ${
                    activeTab === s.id
                      ? 'bg-white text-[#0F1E36] shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  aria-selected={activeTab === s.id}
                  role="tab"
                >
                  {s.title}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                {activeService.description}
              </p>

              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#0F1E36] uppercase tracking-wider mb-3">
                  Interventions courantes prises en charge :
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  {activeService.bullets.map((point, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-800"
                    >
                      <div className="w-5 h-5 rounded-full bg-amber-100 text-[#C87D55] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs" aria-hidden="true">
                        ✓
                      </div>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs sm:text-sm text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <strong className="block font-bold">Un projet ou un dépannage en vue ?</strong>
                  <span>Demandez un chiffrage personnalisé ou posez votre question directement par téléphone.</span>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigateToQuote(activeService.id)}
                  className="min-h-[44px] px-4 py-2.5 rounded-xl bg-[#0F1E36] hover:bg-[#C87D55] active:scale-95 text-white text-xs font-bold shrink-0 transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-[#C87D55]"
                >
                  Demander un devis
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative">
                <img
                  src={activeService.imageUrl}
                  alt={`Prestation de ${activeService.title} MN Solution Énergie`}
                  className="object-cover rounded-xl shadow-md w-full h-64"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E36]/80 via-transparent to-transparent flex items-end p-5 rounded-xl">
                  <div className="text-white">
                    <div className="text-xs text-amber-300 font-semibold uppercase tracking-wider">
                      Rhône-Alpes
                    </div>
                    <div className="text-base sm:text-lg font-bold">
                      Expertise technique en {activeService.title.toLowerCase()}
                    </div>
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
