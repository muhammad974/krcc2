import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Download, ExternalLink, X, FileText, CheckCircle2, Phone, Globe, Mail } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CompanyProfileModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { t, language } = useLanguage();

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-neutral-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner */}
        <div className="bg-slate-50 text-slate-900 p-6 border-b-2 border-red-700">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-700 rounded-xl text-white shadow-xs">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold tracking-tight text-slate-900">
                  {t.profileModal.title}
                </h3>
                <p className="text-sm text-slate-600 mt-0.5">
                  {t.profileModal.subtitle}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
              aria-label={t.profileModal.closeBtn}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Quick Details Card */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/90 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-red-700">
                  {language === 'ar' ? 'ملف رسمي معتمد - ٣٤ صفحة' : 'OFFICIAL 34-PAGE COMPANY DOSSIER'}
                </span>
                <h4 className="font-bold text-slate-900 text-base mt-1">
                  KRCC-Company-Profile.pdf
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  {language === 'ar'
                    ? 'النسخة الرسمية الشاملة بدقة عالية | الحجم: ٩.١ ميجابايت'
                    : 'Complete 34-Page High-Resolution Edition | Size: 9.1 MB'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <a
                  href="/KRCC-Company-Profile.pdf"
                  download="KRCC-Company-Profile.pdf"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-red-700 hover:bg-red-800 text-white font-bold text-sm rounded-lg shadow-xs hover:shadow transition-all active:scale-[0.98]"
                >
                  <Download className="w-4 h-4" />
                  <span>{t.profileModal.downloadBtn}</span>
                </a>
                <a
                  href="/KRCC-Company-Profile.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm rounded-lg transition-colors border border-slate-200"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="hidden sm:inline">{t.profileModal.openBtn}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Table of contents summary */}
          <div>
            <h5 className="text-xs font-bold tracking-wider uppercase text-slate-500 mb-3">
              {t.profileModal.summaryTitle}
            </h5>
            <div className="space-y-2.5 text-sm text-slate-700">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
                <span>{t.profileModal.item1}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{t.profileModal.item2}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{t.profileModal.item3}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{t.profileModal.item4}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{t.profileModal.item5}</span>
              </div>
            </div>
          </div>

          {/* Quick Contact verification strip */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 text-xs space-y-2">
            <div className="font-bold text-red-700 uppercase tracking-wider text-[11px]">
              {language === 'ar' ? 'بيانات التواصل الرسمية بالملف' : 'OFFICIAL CONTACT CREDENTIALS'}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-red-700" />
                <span dir="ltr">+966 53 036 2363</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-red-700" />
                <span>www.krcc-ksa.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-red-700" />
                <span>info@krcc-ksa.com</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 sm:col-span-2 pt-2 border-t border-slate-200">
                <span className="font-semibold text-slate-800">
                  {language === 'ar'
                    ? '🇸🇦 السعودية (المقر الرئيسي) · 🇬🇧 بريطانيا · 🇦🇪 الإمارات · 🇵🇰 باكستان'
                    : '🇸🇦 Saudi Arabia (HQ) · 🇬🇧 UK · 🇦🇪 UAE · 🇵🇰 Pakistan'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="bg-stone-100 px-6 py-4 border-t border-stone-200 flex items-center justify-between">
          <span className="text-xs text-neutral-500">
            {language === 'ar' ? 'ملف جاهز للتحميل المباشر والطباعة' : 'Ready for direct download & engineering review'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 text-xs font-semibold rounded-lg transition-colors"
          >
            {t.profileModal.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
