import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail, Menu, X, ChevronRight, FileText, MessageCircle } from 'lucide-react';
import { Logo } from './Logo';
import { COMPANY_INFO } from '../data/companyData';
import { ServiceCategory } from '../types';

interface NavbarProps {
  onOpenCallModal: () => void;
  onNavigateToQuote: (service?: ServiceCategory) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCallModal,
  onNavigateToQuote,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Scroll detection for header elevation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open & handle Escape key
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setMobileMenuOpen(false);
          menuButtonRef.current?.focus();
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
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Accueil', href: '#accueil' },
    { label: 'Chauffage', href: '#chauffage' },
    { label: 'Climatisation', href: '#climatisation' },
    { label: 'Plomberie', href: '#plomberie' },
    { label: 'Comment ça marche', href: '#comment-ca-marche' },
    { label: 'Galerie', href: '#galerie' },
    { label: 'Rhône-Alpes', href: '#zone-intervention' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-200">
      {/* Top contact micro bar */}
      <div className="bg-[#0B1526] text-slate-300 text-xs py-2 px-3 sm:px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="hidden md:inline text-slate-400">
              Chauffage • Climatisation • Plomberie à Lyon et environs
            </span>
            <span className="inline-flex items-center gap-1.5 text-amber-300 font-medium text-[11px] sm:text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Devis en ligne gratuit & sans engagement
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-xs font-medium ml-auto">
            <div className="hidden sm:flex items-center gap-3">
              <span className="text-slate-400 hidden lg:inline">Lignes directes :</span>
              {COMPANY_INFO.phoneNumbers.map((phone) => (
                <a
                  key={phone.raw}
                  href={`tel:${phone.raw}`}
                  className="min-h-[32px] text-white hover:text-[#C87D55] font-semibold transition-colors inline-flex items-center gap-1.5 focus-visible:ring-1 focus-visible:ring-[#C87D55] rounded px-1"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C87D55]" />
                  <span>{phone.display}</span>
                </a>
              ))}
            </div>

            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="min-h-[32px] hidden lg:inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors focus-visible:ring-1 focus-visible:ring-[#C87D55] rounded px-1"
            >
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{COMPANY_INFO.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div
        className={`bg-white/95 backdrop-blur-md transition-shadow duration-300 border-b border-slate-200/90 ${
          scrolled ? 'shadow-md py-2' : 'py-2.5 sm:py-3'
        }`}
      >
        <div className="flex justify-between items-center w-full px-2.5 min-[380px]:px-4 max-w-7xl mx-auto gap-1.5 min-[380px]:gap-2 sm:gap-4">
          {/* Logo with smooth click */}
          <a
            href="#accueil"
            onClick={(e) => handleNavLinkClick(e, '#accueil')}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C87D55] rounded-xl p-0.5 flex items-center min-w-0 shrink-0"
            aria-label="Accueil MN Solution Énergie"
          >
            <Logo size="md" variant="dark" />
          </a>

          {/* Desktop Links (lg and above) */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-5 shrink-0" aria-label="Navigation principale">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavLinkClick(e, link.href)}
                className="min-h-[44px] flex items-center text-xs xl:text-sm font-bold text-slate-700 hover:text-[#C87D55] transition-colors focus-visible:ring-2 focus-visible:ring-[#C87D55] rounded-lg px-2"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action buttons (desktop: lg and above) */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={onOpenCallModal}
              className="min-h-[44px] px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-[#0F1E36] bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all inline-flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-[#C87D55]"
            >
              <Phone className="w-4 h-4 text-[#C87D55]" />
              <span>Appeler</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigateToQuote()}
              className="min-h-[44px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold text-white bg-[#0F1E36] hover:bg-[#C87D55] active:scale-95 transition-all shadow-sm hover:shadow-md inline-flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-[#C87D55]"
            >
              <FileText className="w-4 h-4 text-[#C87D55]" />
              <span>Demander un devis</span>
            </button>
          </div>

          {/* Mobile buttons (visible below lg, always fully visible on the right) */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden shrink-0">
            <button
              type="button"
              onClick={onOpenCallModal}
              className="w-10 h-10 sm:w-11 sm:h-11 text-slate-700 hover:text-[#C87D55] bg-slate-100 hover:bg-slate-200 active:scale-95 rounded-xl flex items-center justify-center transition-all focus-visible:ring-2 focus-visible:ring-[#C87D55] shrink-0"
              aria-label="Appeler l'entreprise directement"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#C87D55]" />
            </button>

            <button
              type="button"
              ref={menuButtonRef}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 sm:w-11 sm:h-11 text-slate-800 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 active:scale-95 rounded-xl flex items-center justify-center transition-all focus-visible:ring-2 focus-visible:ring-[#C87D55] shrink-0"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu de navigation'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop overlay for mobile menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-[105px] sm:top-[118px] bg-slate-950/50 backdrop-blur-xs z-30 lg:hidden animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          ref={mobileMenuRef}
          className="lg:hidden relative z-40 bg-white border-b border-slate-200 shadow-2xl px-4 py-5 max-h-[calc(100vh-120px)] overflow-y-auto animate-in slide-in-from-top-3 duration-200"
        >
          <nav className="flex flex-col space-y-1 mb-5" aria-label="Navigation mobile">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavLinkClick(e, link.href)}
                className="min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-100 hover:text-[#C87D55] active:bg-slate-200 transition-colors focus-visible:ring-2 focus-visible:ring-[#C87D55]"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            ))}
          </nav>

          <div className="space-y-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToQuote();
              }}
              className="w-full min-h-[48px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0F1E36] hover:bg-[#C87D55] text-white font-extrabold text-sm shadow-md transition-colors focus-visible:ring-2 focus-visible:ring-[#C87D55]"
            >
              <FileText className="w-4 h-4 text-[#C87D55]" />
              <span>Demander un devis gratuit</span>
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {COMPANY_INFO.phoneNumbers.map((phone, idx) => (
                <a
                  key={phone.raw}
                  href={`tel:${phone.raw}`}
                  className="min-h-[44px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-900 font-bold text-xs transition-colors focus-visible:ring-2 focus-visible:ring-[#C87D55]"
                >
                  <Phone className="w-4 h-4 text-[#C87D55]" />
                  <span>{phone.display}</span>
                </a>
              ))}
            </div>

            <a
              href="https://wa.me/33758718229?text=Bonjour%20MN%20Solution%20%C3%89nergie."
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/90 text-emerald-800 font-bold text-xs transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500"
              aria-label="Contacter sur WhatsApp au 07 58 71 82 29"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp : 07 58 71 82 29</span>
            </a>

            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="min-h-[44px] flex items-center justify-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 py-2 transition-colors focus-visible:ring-2 focus-visible:ring-[#C87D55] rounded-lg"
            >
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{COMPANY_INFO.email}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
