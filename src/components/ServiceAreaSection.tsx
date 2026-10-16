import React, { useState } from 'react';
import { MapPin, Search, Phone, CheckCircle2, AlertCircle } from 'lucide-react';
import { SERVICE_AREAS, COMPANY_INFO } from '../data/companyData';

interface ServiceAreaSectionProps {
  onOpenCallModal: () => void;
}

export const ServiceAreaSection: React.FC<ServiceAreaSectionProps> = ({ onOpenCallModal }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAreas = SERVICE_AREAS.filter((area) =>
    area.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  return (
    <section id="zone-intervention" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-[#0F1E36] mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#C87D55]" /> Proximité Locale
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F1E36] tracking-tight">
            Zone d'intervention : Lyon et alentours
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            MN Solution Énergie intervient rapidement dans l'ensemble de la métropole lyonnaise pour vos travaux et dépannages.
          </p>
        </div>

        {/* Search tool for communes */}
        <div className="max-w-md mx-auto mb-10">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Vérifier votre commune (ex: Villeurbanne, Lyon 3e...)"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C87D55] shadow-sm"
            />
          </div>
        </div>

        {/* Areas pill grid */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div className="text-sm font-bold text-[#0F1E36]">
              Communes et secteurs régulièrement desservis ({filteredAreas.length})
            </div>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              Bassin lyonnais
            </span>
          </div>

          {filteredAreas.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
              {filteredAreas.map((area) => (
                <div
                  key={area}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50/60 border border-slate-200/80 hover:border-[#C87D55]/60 transition-colors text-xs font-semibold text-slate-800"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C87D55] shrink-0" />
                  <span className="truncate">{area}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              <AlertCircle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
              <p className="text-sm font-semibold">Aucun résultat exact pour "{searchQuery}"</p>
              <p className="text-xs text-slate-400 mt-1">
                Contactez-nous directement pour savoir si nous pouvons nous déplacer dans votre secteur.
              </p>
            </div>
          )}

          {/* Neighboring area prompt */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl">
            <div className="text-xs sm:text-sm text-slate-600">
              <strong className="text-slate-900 block font-semibold mb-0.5">
                Votre commune ne figure pas dans cette liste ?
              </strong>
              Nous étudions toute demande dans les localités voisines de Lyon. Appelez-nous pour confirmer.
            </div>

            <button
              onClick={onOpenCallModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F1E36] hover:bg-[#C87D55] text-white text-xs font-bold shrink-0 transition-colors shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 text-[#C87D55]" />
              <span>Vérifier par téléphone</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
