import React from 'react';
import { Phone, FileText } from 'lucide-react';

interface MobileQuickBarProps {
  onOpenCallModal: () => void;
  onNavigateToQuote: () => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({
  onOpenCallModal,
  onNavigateToQuote,
}) => {
  return (
    <aside
      aria-label="Actions rapides mobiles"
      className="fixed bottom-0 inset-x-0 z-30 sm:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 px-4 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]"
    >
      <div className="grid grid-cols-2 gap-2.5 max-w-md mx-auto">
        <button
          type="button"
          onClick={onOpenCallModal}
          className="min-h-[48px] flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-slate-100 active:bg-slate-200 text-[#0F1E36] font-bold text-xs shadow-xs transition-colors focus-visible:ring-2 focus-visible:ring-[#C87D55]"
          aria-label="Appeler nos artisans"
        >
          <Phone className="w-4 h-4 text-[#C87D55]" />
          <span>Appeler</span>
        </button>

        <button
          type="button"
          onClick={onNavigateToQuote}
          className="min-h-[48px] flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-[#0F1E36] active:bg-[#C87D55] text-white font-extrabold text-xs shadow-md transition-colors focus-visible:ring-2 focus-visible:ring-[#C87D55]"
          aria-label="Demander un devis en ligne"
        >
          <FileText className="w-4 h-4 text-[#C87D55]" />
          <span>Devis gratuit</span>
        </button>
      </div>
    </aside>
  );
};
