import React from 'react';
import { Phone, Mail, MapPin, Shield, Lock } from 'lucide-react';
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
  onOpenCallModal,
}) => {
  return (
    <footer className="bg-[#0A1424] text-slate-300 pt-16 pb-24 lg:pb-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand info */}
          <div className="lg:col-span-5 space-y-4">
            <Logo size="lg" variant="light" />
            <p className="text-amber-400 font-semibold text-sm italic">
              « {COMPANY_INFO.tagline} »
            </p>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              {COMPANY_INFO.description}
            </p>
            <div className="text-xs text-slate-500 pt-2">
              Intervention à Lyon (1er au 9e) et dans les communes de la métropole lyonnaise.
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-extrabold text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <a href="#accueil" className="hover:text-white transition-colors">
                  Accueil
                </a>
              </li>
              <li>
                <a href="#chauffage" className="hover:text-white transition-colors">
                  Chauffage
                </a>
              </li>
              <li>
                <a href="#climatisation" className="hover:text-white transition-colors">
                  Climatisation
                </a>
              </li>
              <li>
                <a href="#plomberie" className="hover:text-white transition-colors">
                  Plomberie
                </a>
              </li>
              <li>
                <a href="#comment-ca-marche" className="hover:text-white transition-colors">
                  Comment obtenir un devis
                </a>
              </li>
              <li>
                <a href="#galerie" className="hover:text-white transition-colors">
                  Galerie de réalisations
                </a>
              </li>
              <li>
                <a href="#zone-intervention" className="hover:text-white transition-colors">
                  Zone d'intervention
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Foire aux questions
                </a>
              </li>
            </ul>
          </div>

          {/* Direct contacts */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-wider font-extrabold text-white">
              Coordonnées Officielles
            </h4>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#C87D55] shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-400 text-xs">Téléphones :</div>
                  {COMPANY_INFO.phoneNumbers.map((phone) => (
                    <div key={phone.raw}>
                      <a
                        href={`tel:${phone.raw}`}
                        className="text-white hover:text-[#C87D55] font-bold"
                      >
                        {phone.display}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#C87D55] shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-400 text-xs">Email :</div>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="text-white hover:text-[#C87D55] break-all"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C87D55] shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-400 text-xs">Localisation :</div>
                  <span className="text-slate-300">
                    Lyon et agglomération lyonnaise (France)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {COMPANY_INFO.name}. Tous droits réservés.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenLegalModal}
              className="hover:text-slate-300 transition-colors underline"
            >
              Mentions Légales & Confidentialité
            </button>

            <button
              onClick={onOpenAdminModal}
              className="flex items-center gap-1.5 text-slate-600 hover:text-slate-400 transition-colors"
              title="Accès réservé à l'artisan pour la gestion des demandes de devis"
            >
              <Lock className="w-3 h-3" />
              <span>Espace Gestion</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
