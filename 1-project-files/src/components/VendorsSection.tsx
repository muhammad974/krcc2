import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { vendorsData } from '../data/vendorsData';
import { VendorItem } from '../types';
import {
  CheckCircle2,
  Copy,
  Check,
  Search,
  ExternalLink,
  ShieldCheck,
  Building,
  FileCheck2,
  X,
  Eye,
} from 'lucide-react';

// Official vendor logos live in /public/assets/vendors/vendor-<n>.jpg (taken from the KRCC vendor sheet)
const POSTER_PAGES = [
  '/assets/vendors/poster-1.jpg',
  '/assets/vendors/poster-2.jpg',
  '/assets/vendors/poster-3.jpg',
];

export const VendorsSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [showPosterModal, setShowPosterModal] = useState(false);
  const [failedLogos, setFailedLogos] = useState<string[]>([]);

  const categories = [
    { id: 'all', label: t.vendors.filterAll },
    { id: 'giga-projects', label: t.vendors.filterGiga },
    { id: 'energy', label: t.vendors.filterEnergy },
    { id: 'contractors', label: t.vendors.filterContractors },
    { id: 'development', label: t.vendors.filterDevelopment },
  ];

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const filteredVendors = vendorsData.filter((v) => {
    const matchesCategory = selectedCategory === 'all' || v.category === selectedCategory;
    const term = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !term ||
      v.nameEn.toLowerCase().includes(term) ||
      v.nameAr.toLowerCase().includes(term) ||
      (v.vendorCode && v.vendorCode.toLowerCase().includes(term)) ||
      (v.secondaryCode && v.secondaryCode.toLowerCase().includes(term));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="vendors" className="py-20 bg-slate-50 text-slate-900 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-red-700 mb-2">
              <span className="w-6 h-0.5 bg-red-700" />
              <span>{t.vendors.kicker}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              {t.vendors.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl leading-relaxed">
              {t.vendors.subtitle}
            </p>
          </div>

          {/* Quick Action Button to Inspect Original Registered Poster */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowPosterModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer border border-slate-300"
            >
              <Eye className="w-4 h-4 text-red-700" />
              <span>{t.vendors.viewOriginalPoster}</span>
            </button>
          </div>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          {/* Segmented Category Filter */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-200/70 p-1.5 rounded-xl border border-slate-200">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`py-2 px-3 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-red-700 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[280px]">
            <Search className="w-4 h-4 text-slate-400 absolute top-3 start-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.vendors.searchPlaceholder}
              className="w-full ps-10 pe-4 py-2 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-700 shadow-xs text-slate-900"
            />
          </div>
        </div>

        {/* Vendors Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {filteredVendors.map((vendor) => {
            const logoFailed = failedLogos.includes(vendor.id);
            const isCopied = copiedCodeId === vendor.id;
            const displayNumber = vendor.number.toString().padStart(2, '0');

            return (
              <div
                key={vendor.id}
                className="group relative flex flex-col justify-between bg-white rounded-2xl p-5 border border-slate-200/90 hover:border-red-700/60 hover:shadow-xl transition-all duration-200"
              >
                <div>
                  {/* Top Row: Index number & Logo */}
                  <div className="flex items-center justify-between mb-4">
                    {/* Index Badge matching cardinal red branding */}
                    <div className="flex items-center gap-2">
                      <span className="w-9 h-9 rounded-lg bg-red-700 text-white font-black text-sm flex items-center justify-center shadow-xs">
                        {displayNumber}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {language === 'ar' ? vendor.categoryLabelAr : vendor.categoryLabelEn}
                      </span>
                    </div>

                    {/* Pre-qualification status check */}
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{language === 'ar' ? 'معتمد' : 'Verified'}</span>
                    </span>
                  </div>

                  {/* Company Logo and Entity Name */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="shrink-0 w-28 h-16 bg-white rounded-lg border border-slate-200 p-1.5 flex items-center justify-center overflow-hidden">
                      {!logoFailed ? (
                        <img
                          src={`/assets/vendors/${vendor.id}.jpg`}
                          alt={vendor.nameEn}
                          loading="lazy"
                          onError={() => setFailedLogos((prev) => [...prev, vendor.id])}
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : (
                        <Building className="w-6 h-6 text-slate-400" />
                      )}
                    </div>

                    <div>
                      <h3 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-red-700 transition-colors leading-snug">
                        {vendor.nameEn}
                      </h3>
                      <p className="text-xs font-semibold text-slate-500 mt-0.5">
                        {vendor.nameAr}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Vendor Code Highlight Box with Copy Button (only when the vendor sheet lists a code) */}
                {vendor.vendorCode ? (
                <div className="pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 group-hover:bg-red-50/50 group-hover:border-red-200 transition-colors">
                    <div>
                      <span className="text-[10px] font-extrabold tracking-wider uppercase text-slate-500 block">
                        {language === 'ar'
                          ? vendor.codeLabelAr || t.vendors.codeLabel
                          : vendor.codeLabelEn || t.vendors.codeLabel}
                      </span>
                      <span className="font-mono font-black text-xs sm:text-sm text-slate-900 tracking-wider">
                        {vendor.vendorCode}
                      </span>
                      {vendor.secondaryLabel && (
                        <span className="block text-[9px] font-medium text-slate-500">
                          {vendor.secondaryLabel}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleCopyCode(vendor.id, vendor.vendorCode ?? '')}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        isCopied
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white hover:bg-red-700 text-slate-700 hover:text-white border border-slate-200 shadow-xs'
                      }`}
                      title={t.vendors.copyTooltip}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>{t.vendors.copiedBadge}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">{language === 'ar' ? 'نسخ' : 'Copy'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
                ) : (
                  <div className="pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span className="text-[11px] font-bold tracking-wide text-slate-600">
                        {language === 'ar' ? 'مورد معتمد لدى الجهة' : 'Approved Vendor'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Vendor Verification & Tender Engagement Strip - Clean Light Palette */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-red-50/50 via-white to-slate-50 text-slate-900 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-700 flex items-center justify-center shrink-0 border border-red-200">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-base text-slate-900">
                {language === 'ar'
                  ? 'هل تحتاج إلى التحقق من اعتماد المورد أو إضافة KRCC إلى منصة مناقصاتكم؟'
                  : 'Need official vendor pre-qualification submittals or commercial vendor verification?'}
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                {language === 'ar'
                  ? 'يقوم فريق التقدير والعقود بتزويدكم بشهادات القيد المعتمدة والملفات الفنية خلال دقائق.'
                  : 'Our estimation and contracts office will provide formal registration certificates and compliance submittals.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="mailto:info@krcc-ksa.com?subject=Vendor%20Verification%20Inquiry%20-%20KRCC"
              className="px-5 py-2.5 bg-red-700 hover:bg-red-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
            >
              {language === 'ar' ? 'طلب ملف الاعتماد الموثق' : 'Request Official Vendor File'}
            </a>
          </div>
        </div>
      </div>

      {/* Official Poster Lightbox Modal */}
      {showPosterModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in"
          onClick={() => setShowPosterModal(false)}
        >
          <div
            className="relative w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-slate-900">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-red-700" />
                <h3 className="font-bold text-sm text-slate-900">
                  {language === 'ar'
                    ? 'الملصق الرسمي لقائمة الموردين المعتمدين - شركة خبير الرائدة'
                    : 'KRCC Official Pre-Qualified Vendor List Poster'}
                </h3>
              </div>
              <button
                onClick={() => setShowPosterModal(false)}
                className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Poster Pages (current KRCC vendor sheet) */}
            <div className="p-3 max-h-[80vh] overflow-y-auto flex flex-col items-center gap-3 bg-slate-100">
              {POSTER_PAGES.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`KRCC Official Vendor List - page ${i + 1}`}
                  className="max-w-full h-auto rounded-lg shadow-md border border-slate-200"
                />
              ))}
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <span>{language === 'ar' ? 'سجل اعتمادات وموردي KRCC الرسمي' : 'Official KRCC Approved Vendor Register'}</span>
              <button
                onClick={() => setShowPosterModal(false)}
                className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-lg transition-colors cursor-pointer"
              >
                {t.vendors.closePoster}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
