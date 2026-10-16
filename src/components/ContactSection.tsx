import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { QuoteForm } from './QuoteForm';
import { ServiceCategory } from '../types';

interface ContactSectionProps {
  selectedService?: ServiceCategory;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ selectedService }) => {
  return (
    <section id="contact" className="py-14 sm:py-20 lg:py-24 bg-slate-50 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-[#0F1E36] mb-3">
            Contact & Devis
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F1E36] tracking-tight">
            Parlons de votre projet
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-slate-600">
            Joignez-nous directement par téléphone ou déposez votre demande de devis détaillée via notre formulaire ci-dessous.
          </p>
        </div>

        {/* 3 Contact cards for the 2 official phones and email */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-12 sm:mb-16">
          {/* Phone 1 */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:border-[#C87D55] transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#C87D55] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Ligne Directe 1
              </span>
              <h3 className="text-lg sm:text-xl font-black text-[#0F1E36] mt-1 mb-2">
                {COMPANY_INFO.phoneNumbers[0].display}
              </h3>
              <p className="text-xs text-slate-500">
                Contact direct avec notre équipe technique pour toute intervention sur Lyon.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100">
              <a
                href={`tel:${COMPANY_INFO.phoneNumbers[0].raw}`}
                className="min-h-[48px] inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-[#0F1E36] hover:bg-[#C87D55] active:scale-95 text-white text-xs sm:text-sm font-bold transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-[#C87D55]"
                aria-label={`Appeler la ligne 1 au ${COMPANY_INFO.phoneNumbers[0].display}`}
              >
                <Phone className="w-4 h-4 text-[#C87D55]" />
                <span>Appeler maintenant</span>
              </a>
            </div>
          </div>

          {/* Phone 2 */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:border-[#C87D55] transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#C87D55] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Ligne Directe 2
              </span>
              <h3 className="text-lg sm:text-xl font-black text-[#0F1E36] mt-1 mb-2">
                {COMPANY_INFO.phoneNumbers[1].display}
              </h3>
              <p className="text-xs text-slate-500">
                Deuxième ligne joignable pour vos urgences ou demandes de conseils thermiques.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100">
              <a
                href={`tel:${COMPANY_INFO.phoneNumbers[1].raw}`}
                className="min-h-[48px] inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-[#0F1E36] hover:bg-[#C87D55] active:scale-95 text-white text-xs sm:text-sm font-bold transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-[#C87D55]"
                aria-label={`Appeler la ligne 2 au ${COMPANY_INFO.phoneNumbers[1].display}`}
              >
                <Phone className="w-4 h-4 text-[#C87D55]" />
                <span>Appeler maintenant</span>
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:border-[#C87D55] transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Courriel Officiel
              </span>
              <h3 className="text-sm sm:text-base font-bold text-[#0F1E36] mt-1 mb-2 break-all">
                {COMPANY_INFO.email}
              </h3>
              <p className="text-xs text-slate-500">
                Pour l'envoi de plans, cahiers des charges ou questions écrites.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100">
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="min-h-[48px] inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-[#0F1E36] text-slate-800 hover:text-white active:scale-95 text-xs sm:text-sm font-bold transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-[#C87D55]"
                aria-label={`Envoyer un email à ${COMPANY_INFO.email}`}
              >
                <Mail className="w-4 h-4" />
                <span>Envoyer un email</span>
              </a>
            </div>
          </div>
        </div>

        {/* Embedded Interactive Form Anchor with proper scroll-mt */}
        <div id="demande-de-devis" className="pt-2 scroll-mt-28">
          <QuoteForm initialService={selectedService || 'chauffage'} />
        </div>
      </div>
    </section>
  );
};
