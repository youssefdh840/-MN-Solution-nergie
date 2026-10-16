import React, { useState, useEffect } from 'react';
import { GALLERY_ITEMS } from '../data/companyData';
import { GalleryItem, ServiceCategory } from '../types';
import { MapPin, X, Eye, FileText, ArrowRight } from 'lucide-react';

interface GallerySectionProps {
  onNavigateToQuote: (service?: ServiceCategory) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onNavigateToQuote }) => {
  const [filter, setFilter] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Handle escape key and body scroll lock for lightbox
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setSelectedItem(null);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedItem]);

  const filteredItems =
    filter === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === filter);

  return (
    <section id="galerie" className="py-14 sm:py-20 lg:py-24 bg-white border-b border-slate-200/80 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-[#0F1E36] mb-3">
            Galerie de Travaux
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F1E36] tracking-tight">
            Aperçu de nos réalisations
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-slate-600">
            Découvrez en images la rigueur et le soin apportés à nos installations de chauffage, climatisation et plomberie à Lyon et alentours.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 sm:mb-10">
          {[
            { id: 'all', label: 'Toutes les réalisations' },
            { id: 'chauffage', label: 'Chauffage' },
            { id: 'climatisation', label: 'Climatisation' },
            { id: 'plomberie', label: 'Plomberie' },
          ].map((cat) => (
            <button
              type="button"
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all focus-visible:ring-2 focus-visible:ring-[#C87D55] ${
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedItem(item)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedItem(item);
                }
              }}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 hover:border-[#C87D55] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col focus-visible:ring-2 focus-visible:ring-[#C87D55] focus:outline-none"
              aria-label={`Voir les détails de la réalisation : ${item.title}`}
            >
              <div className="relative h-52 sm:h-60 overflow-hidden bg-slate-200">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/95 text-xs font-bold text-[#0F1E36] shadow">
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

              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mb-1">
                    <MapPin className="w-3.5 h-3.5 text-[#C87D55]" />
                    <span>{item.city}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#0F1E36] group-hover:text-[#C87D55] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#C87D55]">
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
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setSelectedItem(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-title"
          >
            <div
              className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200 max-h-[92vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-60 sm:h-80 lg:h-96 bg-slate-900 shrink-0">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="min-w-[44px] min-h-[44px] absolute top-3 right-3 p-2 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-white"
                  aria-label="Fermer la vue détaillée"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#C87D55] text-white">
                    {selectedItem.category}
                  </span>
                </div>
              </div>

              <div className="p-5 sm:p-6 overflow-y-auto">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
                  <MapPin className="w-4 h-4 text-[#C87D55]" />
                  <span>Secteur : {selectedItem.city} (Grand Lyon)</span>
                </div>
                <h3 id="lightbox-title" className="text-lg sm:text-xl font-bold text-[#0F1E36]">
                  {selectedItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {selectedItem.description}
                </p>

                <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-xs text-slate-500">
                    Vous avez un projet similaire ?
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const cat = selectedItem.category;
                      setSelectedItem(null);
                      onNavigateToQuote(cat);
                    }}
                    className="min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F1E36] hover:bg-[#C87D55] text-white text-xs sm:text-sm font-bold transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-[#C87D55]"
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
