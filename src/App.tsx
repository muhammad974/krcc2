import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { MaterialsSection } from './components/MaterialsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CertificationsSection } from './components/CertificationsSection';
import { VendorsSection } from './components/VendorsSection';
import { CompanyProfileModal } from './components/CompanyProfileModal';

function MainWebsite() {
  const { language } = useLanguage();
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState('');
  const [selectedMaterialForQuote, setSelectedMaterialForQuote] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scroll for active section highlight and scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      const sections = ['hero', 'about', 'services', 'materials', 'vendors', 'projects', 'certifications', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRequestQuoteWithService = (serviceName: string) => {
    setSelectedServiceForQuote(serviceName);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRequestQuoteWithMaterial = (materialTitle: string) => {
    setSelectedMaterialForQuote(materialTitle);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans">
      {/* Navigation Header */}
      <Navbar
        onOpenProfileModal={() => setProfileModalOpen(true)}
        activeSection={activeSection}
      />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onOpenProfileModal={() => setProfileModalOpen(true)}
          onExploreServices={() => scrollTo('services')}
          onContactTeam={() => scrollTo('contact')}
        />

        {/* 3. About Us Section */}
        <AboutSection
          onOpenProfileModal={() => setProfileModalOpen(true)}
        />

        {/* 3. Services Section (All 11 Categories) */}
        <ServicesSection
          onRequestQuoteWithService={handleRequestQuoteWithService}
        />

        {/* 4. Construction Material Supply Section */}
        <MaterialsSection
          onRequestQuoteWithMaterial={handleRequestQuoteWithMaterial}
        />

        {/* 5. Approved Vendor Registrations (All 32 Entities) */}
        <VendorsSection />

        {/* 6. Projects & Reference Portfolio */}
        <ProjectsSection
          onRequestQuoteWithProject={(title) => handleRequestQuoteWithService(`Project Reference: ${title}`)}
        />

        {/* 7. Certifications & Accreditations (ISO x3, ARAMCO, SEC, CLASSIFICATION, SCA) - just before Contact Us */}
        <CertificationsSection />

        {/* 8. Contact Us & Request a Quote Section */}
        <ContactSection
          initialService={selectedServiceForQuote}
          initialMaterial={selectedMaterialForQuote}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenProfileModal={() => setProfileModalOpen(true)}
      />

      {/* Company Profile Modal Previewer */}
      <CompanyProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/966530362363"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 end-5 z-40 p-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-transform hover:scale-105"
        title={language === 'ar' ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
        aria-label="WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.18 2.095 3.195 5.076 4.483.709.3 1.263.489 1.694.626.712.226 1.36.195 1.871.12.571-.09 1.758-.72 2.006-1.41.248-.69.248-1.289.173-1.41-.074-.12-.272-.195-.57-.345m-5.446 7.443h-.016a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainWebsite />
    </LanguageProvider>
  );
}
