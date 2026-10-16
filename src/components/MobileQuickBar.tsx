import React from 'react';
import { Phone, FileText } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface MobileQuickBarProps {
  onOpenCallModal: () => void;
  onNavigateToQuote: () => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({
  onOpenCallModal,
  onNavigateToQuote,
}) => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-30 sm:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 px-4 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
      <div className="grid grid-cols-2 gap-2.5">
        <button
          onClick={onOpenCallModal}
          className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-slate-100 active:bg-slate-200 text-[#0F1E36] font-bold text-xs"
        >
          <Phone className="w-4 h-4 text-[#C87D55]" />
          <span>Appeler</span>
        </button>

        <button
          onClick={onNavigateToQuote}
          className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-[#0F1E36] active:bg-[#C87D55] text-white font-extrabold text-xs shadow-md"
        >
          <FileText className="w-4 h-4 text-[#C87D55]" />
          <span>Devis gratuit</span>
        </button>
      </div>
    </div>
  );
};
