import React, { useEffect } from 'react';
import { X, FileText } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
    >
      <div
        className="relative w-full max-w-2xl max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#C87D55]" />
            <h3 id="legal-modal-title" className="text-base sm:text-lg font-bold text-[#0F1E36]">
              Mentions Légales & Données Personnelles
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-200 transition-colors focus-visible:ring-2 focus-visible:ring-[#C87D55]"
            aria-label="Fermer les mentions légales"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <section>
            <h4 className="font-bold text-[#0F1E36] text-sm sm:text-base mb-2">
              1. Éditeur du site
            </h4>
            <p>
              Le présent site web est le site officiel de l'entreprise <strong>{COMPANY_INFO.name}</strong>.
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-xs">
              <li><strong>Raison sociale :</strong> {COMPANY_INFO.name}</li>
              <li><strong>Activité :</strong> Chauffage, Climatisation et Énergies Thermiques (Pompes à chaleur, thermodynamique)</li>
              <li><strong>Zone d'activité :</strong> Région Rhône-Alpes (France)</li>
              <li><strong>Téléphones :</strong> {COMPANY_INFO.phoneNumbers.map(p => p.display).join(' / ')}</li>
              <li><strong>Courriel :</strong> {COMPANY_INFO.email}</li>
            </ul>
          </section>

          <section>
            <h4 className="font-bold text-[#0F1E36] text-sm sm:text-base mb-2">
              2. Protection des données (RGPD)
            </h4>
            <p>
              Les données personnelles recueillies à travers les formulaires de demande de devis (nom, numéro de téléphone, adresse email, adresse de chantier et descriptif du projet) sont collectées exclusivement afin de permettre à <strong>{COMPANY_INFO.name}</strong> de vous recontacter et d'étudier la faisabilité de votre demande.
            </p>
            <p className="mt-2 text-xs text-slate-500">
              Ces informations ne sont en aucun cas vendues, cédées ou divulguées à des tiers à des fins commerciales. Conformément à la réglementation sur la protection des données (RGPD), vous disposez d'un droit d'accès, de rectification et d'effacement de vos données sur simple demande par email à {COMPANY_INFO.email}.
            </p>
          </section>

          <section>
            <h4 className="font-bold text-[#0F1E36] text-sm sm:text-base mb-2">
              3. Absence d'engagement contractuel immédiat
            </h4>
            <p>
              L'envoi d'une demande de devis sur ce site internet constitue une démarche informative préalable. Elle n'entraîne aucune obligation financière pour l'utilisateur et ne vaut pas confirmation ferme de rendez-vous ou acceptation de commande tant qu'un devis formel n'a pas été convenu entre les parties.
            </p>
          </section>

          <section>
            <h4 className="font-bold text-[#0F1E36] text-sm sm:text-base mb-2">
              4. Propriété intellectuelle
            </h4>
            <p>
              L'ensemble des contenus (textes, logos, photographies, éléments visuels) figurant sur ce site sont protégés par le droit de la propriété intellectuelle. Toute reproduction sans autorisation expresse est prohibée.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#0F1E36] text-white text-xs sm:text-sm font-bold hover:bg-[#C87D55] active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-[#C87D55]"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
