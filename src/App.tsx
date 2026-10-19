import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { HowItWorks } from './components/HowItWorks';
import { CompanyIntro } from './components/CompanyIntro';
import { GallerySection } from './components/GallerySection';
import { ServiceAreaSection } from './components/ServiceAreaSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CallModal } from './components/CallModal';
import { LegalModal } from './components/LegalModal';
import { AdminModal } from './components/AdminModal';
import { MobileQuickBar } from './components/MobileQuickBar';
import { ServiceCategory } from './types';

export default function App() {
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceCategory>('chauffage');

  useEffect(() => {
    const handleRouteCheck = () => {
      if (
        window.location.pathname === '/admin' ||
        window.location.pathname === '/admin/' ||
        window.location.hash === '#admin'
      ) {
        setIsAdminModalOpen(true);
      }
    };

    handleRouteCheck();
    window.addEventListener('hashchange', handleRouteCheck);
    window.addEventListener('popstate', handleRouteCheck);
    return () => {
      window.removeEventListener('hashchange', handleRouteCheck);
      window.removeEventListener('popstate', handleRouteCheck);
    };
  }, []);

  const scrollToQuote = (service?: ServiceCategory) => {
    if (service) {
      setSelectedService(service);
    }
    const element = document.getElementById('demande-de-devis');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-[#C87D55] selection:text-white">
      {/* 1. Header / Navbar with Logo & Contacts */}
      <Navbar
        onOpenCallModal={() => setIsCallModalOpen(true)}
        onNavigateToQuote={scrollToQuote}
      />

      {/* Main Content Sections */}
      <main className="flex-1 w-full">
        {/* 2 to 5. Hero Section with headline, description, primary and secondary CTAs */}
        <Hero
          onOpenCallModal={() => setIsCallModalOpen(true)}
          onNavigateToQuote={scrollToQuote}
        />

        {/* 6. Three Service Cards & Dedicated Sections: Chauffage, Climatisation, Plomberie */}
        <ServicesSection
          onNavigateToQuote={scrollToQuote}
          onOpenCallModal={() => setIsCallModalOpen(true)}
        />

        {/* 7. How to request a quote */}
        <HowItWorks onNavigateToQuote={() => scrollToQuote()} />

        {/* 8. Professional company introduction without invented facts */}
        <CompanyIntro onOpenCallModal={() => setIsCallModalOpen(true)} />

        {/* 9. Project Gallery with properly licensed images */}
        <GallerySection onNavigateToQuote={scrollToQuote} />

        {/* 10. Service Area for Rhône-Alpes */}
        <ServiceAreaSection
          onOpenCallModal={() => setIsCallModalOpen(true)}
          onNavigateToQuote={() => scrollToQuote()}
        />

        {/* 11. Frequently Asked Questions (FAQ) */}
        <FAQSection
          onNavigateToQuote={() => scrollToQuote()}
          onOpenCallModal={() => setIsCallModalOpen(true)}
        />

        {/* 12. Contact section with official phone numbers, email, and quote request form */}
        <ContactSection selectedService={selectedService} />
      </main>

      {/* 13. Footer with navigation, contact info, and legal notice triggers */}
      <Footer
        onOpenLegalModal={() => setIsLegalModalOpen(true)}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        onOpenCallModal={() => setIsCallModalOpen(true)}
      />

      {/* Sticky Mobile Call & Quote Bar */}
      <MobileQuickBar
        onOpenCallModal={() => setIsCallModalOpen(true)}
        onNavigateToQuote={() => scrollToQuote()}
      />

      {/* Interactive Modals */}
      <CallModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
      />

      <LegalModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
      />

      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => {
          setIsAdminModalOpen(false);
          if (window.location.hash === '#admin') {
            history.replaceState(null, '', window.location.pathname + window.location.search);
          }
        }}
      />
    </div>
  );
}
