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
    <section id="faq" className="py-14 sm:py-20 lg:py-24 bg-white border-b border-slate-200/80 scroll-mt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-[#0F1E36] mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#C87D55]" /> Questions Fréquentes
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F1E36] tracking-tight">
            Tout ce que vous devez savoir
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-slate-600">
            Retrouvez les réponses à vos interrogations sur nos prestations, nos devis et nos modalités d'intervention.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            const contentId = `faq-content-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-slate-50/50 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  id={buttonId}
                  onClick={() => toggle(index)}
                  className="w-full min-h-[52px] p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-[#0F1E36] hover:text-[#C87D55] transition-colors focus-visible:ring-2 focus-visible:ring-[#C87D55] focus:outline-none"
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                >
                  <span className="text-sm sm:text-base leading-snug">{item.question}</span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center bg-white border border-slate-200 text-slate-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#C87D55] border-[#C87D55]' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-white"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 sm:mt-12 p-5 sm:p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="font-bold text-[#0F1E36] text-sm sm:text-base">
              Une autre question spécifique ?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Nos artisans sont à votre écoute pour vous conseiller.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={onOpenCallModal}
              className="min-h-[44px] flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-800 hover:bg-slate-50 active:bg-slate-100 text-xs sm:text-sm font-bold transition-colors shadow-sm flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#C87D55]"
            >
              <Phone className="w-4 h-4 text-[#C87D55]" />
              <span>Nous appeler</span>
            </button>
            <button
              type="button"
              onClick={onNavigateToQuote}
              className="min-h-[44px] flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-[#0F1E36] hover:bg-[#C87D55] active:scale-95 text-white text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#C87D55]"
            >
              <FileText className="w-4 h-4 text-[#C87D55]" />
              <span>Demander un devis</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
