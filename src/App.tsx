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
import { DownloadWebsiteModal } from './components/DownloadWebsiteModal';
import { MessageCircle, Phone, ArrowUp } from 'lucide-react';

function MainWebsite() {
  const { language } = useLanguage();
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState('');
  const [selectedMaterialForQuote, setSelectedMaterialForQuote] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scroll for active section highlight and scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      const sections = ['hero', 'about', 'services', 'materials', 'vendors', 'projects', 'contact'];
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
        onOpenDownloadModal={() => setDownloadModalOpen(true)}
        activeSection={activeSection}
      />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onOpenProfileModal={() => setProfileModalOpen(true)}
          onExploreServices={() => scrollTo('services')}
          onContactTeam={() => scrollTo('contact')}
        />

        {/* 2. Certifications & Accreditations (ISO, ARAMCO, SEC, CLASSIFICATION, SAC) */}
        <CertificationsSection />

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

        {/* 5. Approved Vendor Registrations (All 18 Entities with Vendor Codes) */}
        <VendorsSection />

        {/* 6. Projects & Reference Portfolio */}
        <ProjectsSection
          onRequestQuoteWithProject={(title) => handleRequestQuoteWithService(`Project Reference: ${title}`)}
        />

        {/* 6. Contact Us & Request a Quote Section */}
        <ContactSection
          initialService={selectedServiceForQuote}
          initialMaterial={selectedMaterialForQuote}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenProfileModal={() => setProfileModalOpen(true)}
        onOpenDownloadModal={() => setDownloadModalOpen(true)}
      />

      {/* Company Profile Modal Previewer */}
      <CompanyProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />

      {/* Complete Website Download Modal */}
      <DownloadWebsiteModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
      />

      {/* Floating Quick Action Contacts for Mobile/Desktop */}
      <div className="fixed bottom-5 end-5 z-40 flex flex-col gap-2.5">
        {/* Direct WhatsApp Callout */}
        <a
          href="https://wa.me/966530076628"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-transform hover:scale-110 flex items-center justify-center cursor-pointer"
          title={language === 'ar' ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
          aria-label="WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </a>

        {/* Direct Phone Call Button */}
        <a
          href="tel:+966530076628"
          className="p-3.5 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-transform hover:scale-110 flex items-center justify-center cursor-pointer"
          title={language === 'ar' ? 'اتصال مباشر' : 'Call Directly'}
          aria-label="Call"
        >
          <Phone className="w-5 h-5" />
        </a>

        {/* Scroll To Top */}
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-3 bg-white hover:bg-slate-50 text-slate-700 hover:text-red-700 border border-slate-300 rounded-full shadow-lg transition-all flex items-center justify-center cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
      </div>
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
