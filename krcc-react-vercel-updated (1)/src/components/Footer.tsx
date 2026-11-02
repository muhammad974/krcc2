import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { KRCCLogo } from './KRCCLogo';
import { servicesData, serviceDivisions } from '../data/servicesData';
import { materialCategories } from '../data/materialsData';
import { Download, Globe, Phone, Mail, MapPin, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenProfileModal: () => void;
  onOpenDownloadModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenProfileModal, onOpenDownloadModal }) => {
  const { t, language, setLanguage } = useLanguage();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-100 text-slate-700 pt-16 pb-10 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Branding Banner with Slogan */}
        <div className="pb-12 border-b border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <KRCCLogo variant="footer" isDark={false} showSlogan={true} />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/KRCC-Company-Profile.pdf"
              download="KRCC-Company-Profile.pdf"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-xl border border-slate-300 hover:border-red-700/60 transition-all cursor-pointer shadow-xs"
            >
              <Download className="w-4 h-4 text-red-700" />
              <span>{t.footer.downloadProfile}</span>
            </a>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-300 transition-colors cursor-pointer shadow-xs"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Columns Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 py-12 border-b border-slate-200">
          {/* Col 1: About KRCC */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              {language === 'ar' ? 'عن الشركة' : 'About KRCC'}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.footer.aboutCompany}
            </p>
            <div className="pt-2 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-700 shrink-0" />
                <span>{t.contact.addressValue}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-red-700 shrink-0" />
                <a
                  href={t.company.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-700 transition-colors"
                >
                  {t.company.website}
                </a>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-800 block mb-1">
                  {language === 'ar' ? 'الشبكة والعمليات الدولية:' : 'International Operations:'}
                </span>
                <span className="text-xs text-slate-600">
                  {language === 'ar'
                    ? '🇸🇦 السعودية (المقر) · 🇬🇧 بريطانيا · 🇦🇪 الإمارات · 🇵🇰 باكستان'
                    : '🇸🇦 Saudi Arabia (HQ) · 🇬🇧 UK · 🇦🇪 UAE · 🇵🇰 Pakistan'}
                </span>
              </div>
            </div>
          </div>

          {/* Col 2: Services Disciplines */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              {language === 'ar' ? 'القطاعات والخدمات الهندسية (٨)' : 'Engineering Divisions (8)'}
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {serviceDivisions.map((div) => (
                <li key={div.id}>
                  <button
                    onClick={() => scrollTo('services')}
                    className="hover:text-red-700 transition-colors text-start cursor-pointer truncate max-w-full flex items-center gap-1.5"
                  >
                    <span className="text-red-700 font-bold text-[10px] shrink-0">{div.numberPrefix}.</span>
                    <span className="truncate">{language === 'ar' ? div.titleAr : div.titleEn}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Materials Supply */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              {t.footer.materialsTitle}
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {materialCategories.slice(0, 6).map((m) => (
                <li key={m.id}>
                  <button
                    onClick={() => scrollTo('materials')}
                    className="hover:text-red-700 transition-colors text-start cursor-pointer"
                  >
                    {language === 'ar' ? m.titleAr : m.titleEn}
                  </button>
                </li>
              ))}
              <li className="pt-2 border-t border-slate-200">
                <button
                  onClick={() => scrollTo('vendors')}
                  className="text-red-700 hover:text-red-800 font-bold transition-colors text-start cursor-pointer text-xs"
                >
                  {language === 'ar' ? '★ قائمة الموردين المعتمدين (١٨)' : '★ Approved Vendor List (18)'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Directory & Language */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              {t.footer.contactInfo}
            </h4>
            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-700" />
                <a href="tel:+966530362363" className="hover:text-red-700 font-bold" dir="ltr">
                  +966 53 036 2363
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-700" />
                <a
                  href={`mailto:${t.company.email}`}
                  className="hover:text-red-700 break-all"
                >
                  {t.company.email}
                </a>
              </div>
              </div>

            {/* Language Selection Buttons */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-slate-600 block mb-1.5">
                {t.footer.switchLang}
              </span>
              <div className="inline-flex rounded-lg bg-white border border-slate-300 p-1 shadow-2xs">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded text-xs font-semibold cursor-pointer ${
                    language === 'en'
                      ? 'bg-red-700 text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage('ar')}
                  className={`px-3 py-1 rounded text-xs font-semibold cursor-pointer ${
                    language === 'ar'
                      ? 'bg-red-700 text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  العربية
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, HTML Download, and Slogan */}
        <div className="pt-8 border-t border-slate-200 mt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-600 gap-4">
          <p>
            © {new Date().getFullYear()} {t.company.name}. {t.footer.rights}
          </p>
          
          {/* Quick Website Download Links */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/KRCC-Company-Profile.pdf"
              download="KRCC-Company-Profile.pdf"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-white hover:bg-slate-50 text-slate-700 font-medium border border-slate-300 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-red-700" />
              <span>{t.nav.downloadProfile} (PDF)</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-800 font-bold tracking-wider">
              {t.company.slogan}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
