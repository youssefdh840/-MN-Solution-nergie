import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/companyData';
import { GalleryItem, ServiceCategory } from '../types';
import { MapPin, X, Eye, FileText, ArrowRight } from 'lucide-react';

interface GallerySectionProps {
  onNavigateToQuote: (service?: ServiceCategory) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onNavigateToQuote }) => {
  const [filter, setFilter] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems =
    filter === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === filter);

  return (
    <section id="galerie" className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-[#0F1E36] mb-3">
            Galerie de Travaux
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F1E36] tracking-tight">
            Aperçu de nos réalisations
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Découvrez en images la rigueur et le soin apportés à nos installations de chauffage, climatisation et plomberie à Lyon et alentours.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'Toutes les réalisations' },
            { id: 'chauffage', label: 'Chauffage' },
            { id: 'climatisation', label: 'Climatisation' },
            { id: 'plomberie', label: 'Plomberie' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                filter === cat.id
                  ? 'bg-[#0F1E36] text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 hover:border-[#C87D55] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-60 overflow-hidden bg-slate-200">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 text-xs font-bold text-[#0F1E36] shadow">
                    <Eye className="w-3.5 h-3.5 text-[#C87D55]" />
                    <span>Agrandir</span>
                  </span>
                </div>

                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-[#0F1E36] shadow-sm">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mb-1">
                    <MapPin className="w-3.5 h-3.5 text-[#C87D55]" />
                    <span>{item.city}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#0F1E36] group-hover:text-[#C87D55] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#C87D55]">
                  <span>Voir le détail</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setSelectedItem(null)}
          >
            <div
              className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-72 sm:h-96 bg-slate-900">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#C87D55] text-white">
                    {selectedItem.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
                  <MapPin className="w-4 h-4 text-[#C87D55]" />
                  <span>Secteur : {selectedItem.city} (Grand Lyon)</span>
                </div>
                <h3 className="text-xl font-bold text-[#0F1E36]">
                  {selectedItem.title}
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {selectedItem.description}
                </p>

                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-xs text-slate-500">
                    Vous avez un projet similaire ?
                  </span>
                  <button
                    onClick={() => {
                      const cat = selectedItem.category;
                      setSelectedItem(null);
                      onNavigateToQuote(cat);
                    }}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F1E36] hover:bg-[#C87D55] text-white text-xs font-bold transition-colors"
                  >
                    <FileText className="w-4 h-4 text-[#C87D55]" />
                    <span>Demander un devis pour ce type de travaux</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
