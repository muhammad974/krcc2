import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { KRCCLogo } from './KRCCLogo';
import { Download, Globe, Menu, X, Phone, FileCode } from 'lucide-react';

interface NavbarProps {
  onOpenProfileModal: () => void;
  onOpenDownloadModal?: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenProfileModal,
  onOpenDownloadModal,
  activeSection,
}) => {
  const { t, language, toggleLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'services', label: t.nav.services },
    { id: 'materials', label: t.nav.materials },
    { id: 'vendors', label: t.nav.vendors },
    { id: 'projects', label: t.nav.projects },
    { id: 'contact', label: t.nav.contact },
  ];

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Utility Bar with Direct Contact Numbers - Light Corporate Palette */}
      <div className="bg-slate-100 text-slate-700 text-xs py-2 px-4 border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 text-[11px] md:text-xs">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-red-700 text-white font-extrabold text-[10px] tracking-wider uppercase shadow-xs">
              {t.company.since}
            </span>
            <span className="hidden sm:inline-block font-semibold text-slate-600">
              {t.company.slogan}
            </span>
            <span className="hidden sm:inline-block text-slate-300">|</span>
            <div className="flex items-center gap-1.5 text-slate-800">
              <Phone className="w-3.5 h-3.5 text-red-700" />
              <a
                href="tel:+966530076628"
                className="hover:text-red-700 transition-colors font-semibold"
                dir="ltr"
              >
                +966 530 076 628
              </a>
              <span className="text-slate-300">/</span>
              <a
                href="tel:+966566200276"
                className="hover:text-red-700 transition-colors font-semibold"
                dir="ltr"
              >
                +966 566 200 276
              </a>
            </div>

            <div className="hidden xl:flex items-center gap-1.5 text-slate-600">
              <span className="text-slate-300">|</span>
              <Globe className="w-3.5 h-3.5 text-red-700" />
              <span className="font-semibold text-[11px] text-slate-700">
                {t.company.globalPresence}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="mailto:khabeeralraida6@gmail.com"
              className="text-[11px] text-slate-600 hover:text-red-700 transition-colors hidden md:inline-block font-medium"
            >
              khabeeralraida6@gmail.com
            </a>
            
            {/* Language Switcher Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white hover:bg-slate-50 text-slate-800 font-medium text-xs transition-colors cursor-pointer border border-slate-300 shadow-xs"
              aria-label="Switch Language / تغيير اللغة"
            >
              <Globe className="w-3.5 h-3.5 text-red-700" />
              <span className="font-bold">
                {language === 'en' ? 'العربية' : 'English'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200 py-2.5'
            : 'bg-white shadow-xs border-b border-slate-200/80 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Company Logo Link */}
          <button
            onClick={() => scrollTo('hero')}
            className="text-start focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700 rounded-lg cursor-pointer"
          >
            <KRCCLogo variant="header" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`px-3 py-2 rounded-md text-sm font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? 'text-red-700 bg-red-50 font-bold border border-red-200/50'
                      : 'text-slate-700 hover:text-red-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Download HTML Website Package Button */}
            {onOpenDownloadModal && (
              <button
                onClick={onOpenDownloadModal}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg shadow-2xs hover:shadow-xs transition-all cursor-pointer border border-emerald-300"
                title={language === 'ar' ? 'تحميل ملف HTML وموقع الويب' : 'Download HTML Website Files'}
              >
                <FileCode className="w-3.5 h-3.5 text-emerald-700" />
                <span>{language === 'ar' ? 'تحميل HTML' : 'Download HTML'}</span>
              </button>
            )}

            {/* Prominent Company Profile Download Button - Direct PDF Download */}
            <a
              href="/KRCC-Company-Profile.pdf"
              download="KRCC-Company-Profile.pdf"
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all cursor-pointer border border-slate-300"
              title={t.nav.downloadProfile}
            >
              <Download className="w-3.5 h-3.5 text-red-700" />
              <span>{t.nav.downloadProfile}</span>
            </a>

            {/* Request a Quote CTA */}
            <button
              onClick={() => scrollTo('contact')}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-700 hover:bg-red-800 text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all cursor-pointer"
            >
              <span>{t.nav.requestQuote}</span>
            </button>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleLanguage}
              className="p-2 text-xs font-bold rounded bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200"
              aria-label="Language switch"
            >
              {language === 'en' ? 'عر' : 'EN'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-800 hover:text-red-700 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label={mobileMenuOpen ? t.nav.close : t.nav.menu}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fade-in">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`text-start px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                    activeSection === link.id
                      ? 'text-red-700 bg-red-50 font-bold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              {onOpenDownloadModal && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDownloadModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold rounded-lg cursor-pointer border border-emerald-300"
                >
                  <FileCode className="w-4 h-4 text-emerald-700" />
                  <span>{language === 'ar' ? 'تحميل ملفات HTML والموقع' : 'Download HTML & Website Files'}</span>
                </button>
              )}

              <a
                href="/KRCC-Company-Profile.pdf"
                download="KRCC-Company-Profile.pdf"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg cursor-pointer border border-slate-300"
              >
                <Download className="w-4 h-4 text-red-700" />
                <span>{t.nav.downloadProfile}</span>
              </a>

              <button
                onClick={() => scrollTo('contact')}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-700 text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                <span>{t.nav.requestQuote}</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
