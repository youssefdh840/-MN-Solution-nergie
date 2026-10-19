import React from 'react';
import { Phone, Mail, MapPin, Lock } from 'lucide-react';
import { Logo } from './Logo';
import { COMPANY_INFO } from '../data/companyData';

interface FooterProps {
  onOpenLegalModal: () => void;
  onOpenAdminModal: () => void;
  onOpenCallModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenLegalModal,
  onOpenAdminModal,
}) => {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-[#0A1424] text-slate-300 pt-14 sm:pt-16 pb-28 sm:pb-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-10 sm:pb-12 border-b border-slate-800/80">
          {/* Brand info */}
          <div className="lg:col-span-5 space-y-3.5">
            <Logo size="lg" variant="light" />
            <p className="text-amber-400 font-semibold text-xs sm:text-sm italic">
              « {COMPANY_INFO.tagline} »
            </p>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              {COMPANY_INFO.description}
            </p>
            <div className="text-xs text-slate-500 pt-1">
              Intervention dans l'ensemble de la région Rhône-Alpes pour vos travaux de chauffage, climatisation et plomberie.
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-extrabold text-white">
              Navigation
            </h4>
            <ul className="space-y-1 text-xs sm:text-sm text-slate-400">
              {[
                { label: 'Accueil', id: 'accueil' },
                { label: 'Chauffage', id: 'chauffage' },
                { label: 'Climatisation', id: 'climatisation' },
                { label: 'Plomberie', id: 'plomberie' },
                { label: 'Comment obtenir un devis', id: 'comment-ca-marche' },
                { label: 'Galerie de réalisations', id: 'galerie' },
                { label: 'Zone d\'intervention', id: 'zone-intervention' },
                { label: 'Foire aux questions', id: 'faq' },
              ].map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleScrollTo(e, item.id)}
                    className="min-h-[36px] inline-flex items-center hover:text-white transition-colors focus-visible:ring-1 focus-visible:ring-[#C87D55] rounded px-1"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct contacts */}
          <div className="lg:col-span-4 space-y-3.5">
            <h4 className="text-xs uppercase tracking-wider font-extrabold text-white">
              Coordonnées Officielles
            </h4>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#C87D55] shrink-0 mt-1" />
                <div>
                  <div className="text-slate-400 text-xs">Téléphones :</div>
                  {COMPANY_INFO.phoneNumbers.map((phone) => (
                    <div key={phone.raw}>
                      <a
                        href={`tel:${phone.raw}`}
                        className="min-h-[36px] inline-flex items-center text-white hover:text-[#C87D55] font-bold focus-visible:ring-1 focus-visible:ring-[#C87D55] rounded px-1"
                      >
                        {phone.display}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#C87D55] shrink-0 mt-1" />
                <div>
                  <div className="text-slate-400 text-xs">Email :</div>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="min-h-[36px] inline-flex items-center text-white hover:text-[#C87D55] break-all focus-visible:ring-1 focus-visible:ring-[#C87D55] rounded px-1"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C87D55] shrink-0 mt-1" />
                <div>
                  <div className="text-slate-400 text-xs">Localisation :</div>
                  <span className="text-slate-300">
                    Région Rhône-Alpes (France)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {COMPANY_INFO.name}. Tous droits réservés.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <button
              type="button"
              onClick={onOpenLegalModal}
              className="min-h-[44px] hover:text-slate-300 transition-colors underline focus-visible:ring-1 focus-visible:ring-[#C87D55] rounded px-2"
            >
              Mentions Légales & Confidentialité
            </button>

            <button
              type="button"
              onClick={onOpenAdminModal}
              className="min-h-[44px] flex items-center gap-1.5 text-slate-500 hover:text-slate-300 transition-colors focus-visible:ring-1 focus-visible:ring-[#C87D55] rounded px-2"
              title="Accès réservé à l'artisan pour la gestion des demandes de devis"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Espace Gestion</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
