import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Download,
  FileCode,
  FolderArchive,
  FileText,
  X,
  ExternalLink,
  CheckCircle2,
  HardDrive,
  Globe,
  HelpCircle,
} from 'lucide-react';

interface DownloadWebsiteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadWebsiteModal: React.FC<DownloadWebsiteModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { language } = useLanguage();

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-slate-50 text-slate-900 p-6 border-b-2 border-red-700 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-700 rounded-xl text-white shadow-xs">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-red-700 block">
                {language === 'ar' ? 'تحميل ملفات الموقع الكاملة' : 'WEBSITE DOWNLOAD CENTER'}
              </span>
              <h3 className="text-xl font-extrabold tracking-tight text-slate-900">
                {language === 'ar'
                  ? 'تحميل ملف HTML والموقع كاملاً'
                  : 'Download Complete HTML Website & Code'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 space-y-5 max-h-[72vh] overflow-y-auto">
          {/* Quick Notice */}
          <div className="p-4 bg-red-50/70 border border-red-200/80 rounded-xl text-xs text-slate-800 flex items-start gap-3">
            <Globe className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-red-700 block mb-0.5">
                {language === 'ar'
                  ? 'ملف الموقع جاهز للتحميل والتشغيل المباشر'
                  : 'Ready to Run Offline or Deploy on Any Hosting'}
              </span>
              <p className="text-slate-600 leading-relaxed">
                {language === 'ar'
                  ? 'يمكنك تحميل ملفات الـ HTML والـ CSS والصور كاملة في ملف ZIP، وعند فك الضغط افتح ملف index.html في المتصفح وسيعمل الموقع كاملاً بدون إنترنت، أو ارفعه على أي استضافة (cPanel / Hostinger / GoDaddy).'
                  : 'Download the production-ready HTML package (ZIP). Extract it and double-click index.html to view offline in your browser, or upload the extracted files directly to any cPanel / Apache / Nginx / Netlify host.'}
              </p>
            </div>
          </div>

          {/* Option 1: Complete HTML Package (ZIP with index.html, styles, images) - RECOMMENDED */}
          <div className="p-4 rounded-xl border-2 border-red-700/60 bg-white hover:bg-slate-50 transition-all shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-red-100 text-red-700 shrink-0 mt-1">
                  <FolderArchive className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-red-700 text-white rounded">
                      {language === 'ar' ? 'الخيار الأفضل والموصى به' : 'RECOMMENDED'}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">krcc-website-html.zip (25 MB)</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mt-1">
                    {language === 'ar'
                      ? 'حزمة الموقع الكاملة جاهزة للتشغيل (HTML + CSS + صور)'
                      : 'Complete Production HTML Package (HTML + CSS + Assets)'}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {language === 'ar'
                      ? 'تتضمن ملف index.html وجميع الصور والمواصفات لفتحها على جهازك فوراً'
                      : 'Contains index.html, JS bundles, Tailwind CSS, images & PDF in portable relative paths.'}
                  </p>
                </div>
              </div>

              <a
                href="/krcc-website-html.zip"
                download="krcc-website-html.zip"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-red-700 hover:bg-red-800 text-white font-bold text-xs rounded-lg shadow-sm transition-all shrink-0 cursor-pointer active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>{language === 'ar' ? 'تحميل ملف ZIP' : 'Download HTML ZIP'}</span>
              </a>
            </div>
          </div>

          {/* Option 2: Download Raw index.html Directly */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-slate-200 text-slate-800 shrink-0 mt-1">
                  <FileCode className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {language === 'ar' ? 'تحميل ملف index.html فقط' : 'Download index.html File Directly'}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {language === 'ar'
                      ? 'ملف الـ HTML الأساسي للموقع'
                      : 'Direct standalone HTML document file.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href="/index-website.html"
                  download="index.html"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'تحميل HTML' : 'Download .html'}</span>
                </a>
                <a
                  href="/index-website.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1 px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-lg border border-slate-300 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'معاينة' : 'Preview'}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Option 3: Full React Source Code */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-blue-100 text-blue-800 shrink-0 mt-1">
                  <HardDrive className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {language === 'ar'
                      ? 'تحميل سورس كود المشروع البرمجي كاملاً (React + TypeScript)'
                      : 'Complete Project Source Code (React + Vite + TypeScript)'}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {language === 'ar'
                      ? 'ملفات المشروع كاملة للمطورين لتعديله عبر VS Code و npm'
                      : 'Developer source repository (src/, package.json, vite.config.ts) for local development.'}
                  </p>
                </div>
              </div>

              <a
                href="/krcc-full-source-code.zip"
                download="krcc-full-source-code.zip"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-lg border border-slate-300 transition-colors shrink-0 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'تحميل السورس كود' : 'Source Code (.zip)'}</span>
              </a>
            </div>
          </div>

          {/* Step-by-Step Instructions */}
          <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-700 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <HelpCircle className="w-4 h-4 text-red-700" />
              <span>{language === 'ar' ? 'طريقة الاستخدام بعد التحميل:' : 'How to use after downloading:'}</span>
            </div>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-600 pl-1">
              <li>
                {language === 'ar'
                  ? 'اضغط على زر "تحميل ملف ZIP" الأحمر أعلاه.'
                  : 'Click the red "Download HTML ZIP" button above to save the file to your computer.'}
              </li>
              <li>
                {language === 'ar'
                  ? 'انقر بالزر الأيمن على الملف المحمّل واختر "Extract All" (فك الضغط).'
                  : 'Right-click the downloaded krcc-website-html.zip and select "Extract All" / "Unzip".'}
              </li>
              <li>
                {language === 'ar'
                  ? 'افتح المجلد الناتج واضغط مرتين على ملف index.html ليعمل الموقع مباشرة في أي متصفح!'
                  : 'Open the extracted folder and double-click index.html to view the full website in Chrome, Edge, or Safari!'}
              </li>
            </ol>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            {language === 'ar'
              ? 'جميع الملفات مفحوصة وجاهزة للنشر والتشغيل المباشر'
              : 'Production build ready for local use or hosting deployment'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            {language === 'ar' ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
