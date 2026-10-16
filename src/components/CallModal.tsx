import React, { useState } from 'react';
import { Phone, Copy, Check, X, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CallModal: React.FC<CallModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleCopy = (number: string, index: number) => {
    navigator.clipboard.writeText(number);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top copper accent banner */}
        <div className="h-2 bg-gradient-to-r from-[#0F1E36] via-[#C87D55] to-[#E07A5F]" />

        <div className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-[#C87D55] border border-amber-200/60 mb-2">
                <Phone className="w-3.5 h-3.5" /> Contact direct
              </span>
              <h3 className="text-xl font-extrabold text-[#0F1E36]">
                Appeler MN Solution Énergie
              </h3>
              <p className="text-sm text-slate-500 mt-0.5">
                Chauffage, climatisation et plomberie à Lyon et alentours.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              aria-label="Fermer la boîte de dialogue"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-5 space-y-3">
            {COMPANY_INFO.phoneNumbers.map((phone, idx) => (
              <div
                key={phone.raw}
                className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-[#C87D55] transition-all group"
              >
                <div>
                  <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-0.5">
                    Ligne directe {idx + 1}
                  </div>
                  <div className="text-xl font-bold tracking-tight text-[#0F1E36] group-hover:text-[#C87D55] transition-colors">
                    {phone.display}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(phone.display, idx)}
                    className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
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
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#0F1E36] hover:bg-[#C87D55] text-white text-sm font-semibold transition-colors shadow-sm"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Appeler</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-600">
            <ShieldCheck className="w-4 h-4 text-[#C87D55] shrink-0 mt-0.5" />
            <span>
              Interventions sur Lyon (1er au 9e) et communes limitrophes. Nos techniciens vous répondent directement pour évaluer votre besoin.
            </span>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
