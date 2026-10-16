import React from 'react';
import { FileEdit, ClipboardCheck, Calculator, CheckCircle, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onNavigateToQuote: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onNavigateToQuote }) => {
  const steps = [
    {
      step: '01',
      title: 'Expression de votre besoin',
      desc: 'Complétez notre formulaire en 2 minutes ou appelez-nous directement. Précisez la nature de vos travaux et votre secteur à Lyon.',
      icon: FileEdit,
    },
    {
      step: '02',
      title: 'Étude technique',
      desc: 'Nous analysons les spécificités de votre installation pour déterminer les solutions les plus adaptées à vos attentes.',
      icon: ClipboardCheck,
    },
    {
      step: '03',
      title: 'Proposition de devis',
      desc: 'Vous recevez un devis détaillé, sans engagement. Aucun frais caché : vous décidez en toute sérénité.',
      icon: Calculator,
    },
    {
      step: '04',
      title: 'Intervention soignée',
      desc: 'Une fois le devis validé, nous planifions l’intervention à votre convenance et réalisons les travaux dans les règles de l’art.',
      icon: CheckCircle,
    },
  ];

  return (
    <section id="comment-ca-marche" className="py-14 sm:py-20 lg:py-24 bg-white border-b border-slate-200/80 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-[#0F1E36] mb-3">
            Démarche Simple & Transparente
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F1E36] tracking-tight">
            Comment obtenir votre devis ?
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-slate-600">
            Un processus clair en 4 étapes pour concrétiser vos projets de chauffage, climatisation et plomberie.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200/90 hover:border-[#C87D55] transition-all hover:shadow-lg flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl sm:text-3xl font-black text-slate-300 group-hover:text-[#C87D55] transition-colors">
                      {item.step}
                    </span>
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center text-[#0F1E36] group-hover:text-[#C87D55] transition-colors">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#0F1E36] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-200/60 text-xs font-semibold text-[#C87D55] flex items-center gap-1">
                  <span>Étape {index + 1}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 sm:mt-14 p-5 sm:p-8 rounded-2xl bg-gradient-to-r from-[#0F1E36] to-[#1E3A8A] text-white flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6 shadow-xl">
          <div>
            <h3 className="text-lg sm:text-2xl font-bold">
              Prêt à lancer votre projet ?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
              Faites votre demande en ligne gratuitement ou contactez directement l'un de nos deux numéros.
            </p>
          </div>
          <button
            type="button"
            onClick={onNavigateToQuote}
            className="min-h-[48px] px-6 py-3 rounded-xl bg-[#C87D55] hover:bg-[#B56C45] active:scale-95 text-white font-extrabold text-xs sm:text-sm transition-all shadow-md shrink-0 flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-white"
          >
            <span>Demander mon devis</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
