import React, { useState, useEffect } from 'react';
import { Phone, Copy, Check, X, ShieldCheck, MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CallModal: React.FC<CallModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

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

  const handleCopy = (number: string, index: number) => {
    navigator.clipboard.writeText(number);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="call-modal-title"
    >
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top copper accent banner */}
        <div className="h-2 bg-gradient-to-r from-[#0F1E36] via-[#C87D55] to-[#E07A5F]" />

        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-[#C87D55] border border-amber-200/60 mb-2">
                <Phone className="w-3.5 h-3.5" /> Contact direct
              </span>
              <h3 id="call-modal-title" className="text-lg sm:text-xl font-extrabold text-[#0F1E36]">
                Appeler MN Solution Énergie
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Chauffage, climatisation et plomberie à Lyon et alentours.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-[#C87D55]"
              aria-label="Fermer la boîte de dialogue d'appel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-5 space-y-3">
            {COMPANY_INFO.phoneNumbers.map((phone, idx) => (
              <div
                key={phone.raw}
                className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-[#C87D55] transition-all group"
              >
                <div>
                  <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-0.5">
                    Ligne directe {idx + 1}
                  </div>
                  <div className="text-lg sm:text-xl font-bold tracking-tight text-[#0F1E36] group-hover:text-[#C87D55] transition-colors">
                    {phone.display}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopy(phone.display, idx)}
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 active:bg-slate-200 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-[#C87D55]"
                    aria-label={`Copier le numéro ${phone.display}`}
                    title="Copier le numéro"
                  >
                    {copiedIndex === idx ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <a
                    href={`tel:${phone.raw}`}
                    className="min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0F1E36] hover:bg-[#C87D55] active:scale-95 text-white text-xs sm:text-sm font-semibold transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-[#C87D55]"
                    aria-label={`Appeler le ${phone.display}`}
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Appeler</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* WhatsApp Direct Option */}
          <div className="mt-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/90 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-xs text-emerald-950">
              <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold block text-emerald-900">Contact rapide sur WhatsApp</span>
                <span className="text-emerald-700">Discutez directement au 07 58 71 82 29</span>
              </div>
            </div>
            <a
              href="https://wa.me/33758718229?text=Bonjour%20MN%20Solution%20%C3%89nergie%2C%20je%20souhaite%20des%20renseignements%20pour%20un%20projet."
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[40px] px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold transition-all shadow-xs inline-flex items-center gap-1.5 shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ouvrir WhatsApp</span>
            </a>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-600">
            <ShieldCheck className="w-4 h-4 text-[#C87D55] shrink-0 mt-0.5" />
            <span>
              Interventions sur l'ensemble de la région Rhône-Alpes. Nos techniciens vous répondent directement pour évaluer votre besoin en chauffage, climatisation et énergie.
            </span>
          </div>

          <div className="mt-5 pt-3.5 border-t border-slate-100 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] px-4 py-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors focus-visible:ring-2 focus-visible:ring-[#C87D55]"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
