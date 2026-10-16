import React, { useState, useEffect } from 'react';
import { Phone, Mail, Menu, X, ChevronRight, FileText } from 'lucide-react';
import { Logo } from './Logo';
import { COMPANY_INFO } from '../data/companyData';

interface NavbarProps {
  onOpenCallModal: () => void;
  onNavigateToQuote: (service?: 'chauffage' | 'climatisation' | 'plomberie') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCallModal,
  onNavigateToQuote,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Accueil', href: '#accueil' },
    { label: 'Chauffage', href: '#chauffage' },
    { label: 'Climatisation', href: '#climatisation' },
    { label: 'Plomberie', href: '#plomberie' },
    { label: 'Comment ça marche', href: '#comment-ca-marche' },
    { label: 'Galerie', href: '#galerie' },
    { label: 'Zone Lyon', href: '#zone-intervention' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-200">
      {/* Top micro bar with contact info */}
      <div className="bg-[#0B1526] text-slate-300 text-xs py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-slate-400">
              Chauffage • Climatisation • Plomberie à Lyon et environs
            </span>
            <span className="inline-flex items-center gap-1 text-amber-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Devis en ligne sans engagement
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium ml-auto">
            <div className="hidden md:flex items-center gap-3">
              <span className="text-slate-400">Lignes directes :</span>
              {COMPANY_INFO.phoneNumbers.map((phone) => (
                <a
                  key={phone.raw}
                  href={`tel:${phone.raw}`}
                  className="text-white hover:text-[#C87D55] font-semibold transition-colors flex items-center gap-1"
                >
                  <Phone className="w-3 h-3 text-[#C87D55]" />
                  {phone.display}
                </a>
              ))}
            </div>

            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="hidden lg:flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Mail className="w-3 h-3 text-slate-400" />
              <span>{COMPANY_INFO.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div
        className={`bg-white/95 backdrop-blur-md transition-shadow duration-300 border-b ${
          scrolled ? 'shadow-md border-slate-200/90 py-2.5' : 'border-slate-100 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#accueil" className="focus:outline-none">
            <Logo size="md" variant="dark" />
          </a>

          {/* Desktop Links */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-slate-700 hover:text-[#C87D55] transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenCallModal}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-[#0F1E36] bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#C87D55]" />
              <span>Appeler</span>
            </button>

            <button
              onClick={() => onNavigateToQuote()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold text-white bg-[#0F1E36] hover:bg-[#C87D55] transition-all shadow-sm hover:shadow-md active:scale-95"
            >
              <FileText className="w-4 h-4 text-[#C87D55]" />
              <span>Demander un devis</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={onOpenCallModal}
              className="p-2 text-slate-700 hover:text-[#C87D55] bg-slate-100 rounded-lg sm:hidden"
              aria-label="Appeler l'entreprise"
            >
              <Phone className="w-5 h-5 text-[#C87D55]" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
              aria-label="Ouvrir le menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 shadow-2xl px-4 py-5 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-2 mb-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-[#C87D55]"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </a>
            ))}
          </nav>

          <div className="space-y-3 pt-3 border-t border-slate-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToQuote();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0F1E36] text-white font-extrabold text-sm shadow-md"
            >
              <FileText className="w-4 h-4 text-[#C87D55]" />
              <span>Demander un devis gratuit</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              {COMPANY_INFO.phoneNumbers.map((phone) => (
                <a
                  key={phone.raw}
                  href={`tel:${phone.raw}`}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-100 text-slate-900 font-bold text-xs"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C87D55]" />
                  <span>{phone.display}</span>
                </a>
              ))}
            </div>

            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="block text-center text-xs text-slate-500 hover:text-slate-800 py-1"
            >
              {COMPANY_INFO.email}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
