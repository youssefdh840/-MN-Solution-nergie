import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, FileText } from 'lucide-react';
import { FAQ_ITEMS } from '../data/companyData';

interface FAQSectionProps {
  onNavigateToQuote: () => void;
  onOpenCallModal: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  onNavigateToQuote,
  onOpenCallModal,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-[#0F1E36] mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#C87D55]" /> Questions Fréquentes
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F1E36] tracking-tight">
            Tout ce que vous devez savoir
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Retrouvez les réponses à vos interrogations sur nos prestations, nos devis et nos modalités d'intervention.
          </p>
        </div>

        <div className="space-y-3.5">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-slate-50/50 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-[#0F1E36] hover:text-[#C87D55] transition-colors"
                >
                  <span className="text-sm sm:text-base">{item.question}</span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center bg-white border border-slate-200 text-slate-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#C87D55] border-[#C87D55]' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 p-6 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="font-bold text-[#0F1E36] text-sm sm:text-base">
              Une autre question spécifique ?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Nos artisans sont à votre écoute pour vous conseiller.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenCallModal}
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-800 hover:bg-slate-50 text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#C87D55]" />
              <span>Nous appeler</span>
            </button>
            <button
              onClick={onNavigateToQuote}
              className="px-4 py-2.5 rounded-xl bg-[#0F1E36] hover:bg-[#C87D55] text-white text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-[#C87D55]" />
              <span>Demander un devis</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
