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

// ==================== 18 AUTHENTIC VECTOR LOGOS FOR VENDOR LIST ====================

const VendorLogos: Record<string, React.FC<{ className?: string }>> = {
  // 01. Saudi Aramco
  'vendor-1': ({ className = 'w-10 h-10' }) => (
    <svg viewBox="0 0 100 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="50" rx="8" fill="#F8FAFC" />
      <g transform="translate(8, 7)">
        <circle cx="18" cy="18" r="14" fill="#002D42" />
        <circle cx="18" cy="18" r="9" fill="#00A3E0" />
        <circle cx="18" cy="18" r="4" fill="#84BD00" />
      </g>
      <text x="44" y="22" fill="#002D42" fontFamily="sans-serif" fontWeight="900" fontSize="11">aramco</text>
      <text x="44" y="36" fill="#00A3E0" fontFamily="sans-serif" fontWeight="700" fontSize="9">أرامكو السعودية</text>
    </svg>
  ),

  // 02. Saudi Electricity Co.
  'vendor-2': ({ className = 'w-10 h-10' }) => (
    <svg viewBox="0 0 100 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="50" rx="8" fill="#F8FAFC" />
      <g transform="translate(6, 6)">
        <circle cx="18" cy="19" r="13" stroke="#00A3E0" strokeWidth="2.5" />
        <path d="M12 19C14 13 22 13 24 19C26 25 34 25 36 19" stroke="#E11D48" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <text x="44" y="22" fill="#0F172A" fontFamily="sans-serif" fontWeight="900" fontSize="12">SEC</text>
      <text x="44" y="36" fill="#0284C7" fontFamily="sans-serif" fontWeight="700" fontSize="7.5">الشركة السعودية للكهرباء</text>
    </svg>
  ),

  // 03. NEOM
  'vendor-3': ({ className = 'w-10 h-10' }) => (
    <svg viewBox="0 0 100 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="50" rx="8" fill="#F8FAFC" />
      <g transform="translate(6, 8)">
        {/* Colorful NEOM polygon facets */}
        <polygon points="12,6 24,2 28,14 18,18" fill="#E11D48" />
        <polygon points="24,2 34,10 28,22 18,18" fill="#0284C7" />
        <polygon points="12,6 18,18 10,26 4,16" fill="#10B981" />
        <polygon points="18,18 28,22 22,32 10,26" fill="#F59E0B" />
      </g>
      <text x="44" y="24" fill="#1E293B" fontFamily="sans-serif" fontWeight="900" fontSize="13" letterSpacing="1">NEOM</text>
      <text x="44" y="37" fill="#64748B" fontFamily="sans-serif" fontWeight="700" fontSize="9">نيوم</text>
    </svg>
  ),

  // 04. Al Yamama Co.
  'vendor-4': ({ className = 'w-10 h-10' }) => (
    <svg viewBox="0 0 100 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="50" rx="8" fill="#F8FAFC" />
      <g transform="translate(10, 6)">
        <circle cx="16" cy="16" r="10" fill="#22C55E" opacity="0.85" />
        <circle cx="21" cy="21" r="9" fill="#1E40AF" />
      </g>
      <text x="45" y="23" fill="#1E3A8A" fontFamily="sans-serif" fontWeight="900" fontSize="11">اليمامة</text>
      <text x="45" y="36" fill="#22C55E" fontFamily="sans-serif" fontWeight="800" fontSize="8" letterSpacing="0.5">ALYAMAMA</text>
    </svg>
  ),

  // 05. Shapoorji Pallonji
  'vendor-5': ({ className = 'w-10 h-10' }) => (
    <svg viewBox="0 0 100 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="50" rx="8" fill="#F8FAFC" />
      <g transform="translate(6, 6)">
        <path d="M10 26L20 8L30 26H22L20 20L18 26H10Z" fill="#1E3A8A" />
        <path d="M16 28L20 35L24 28H16Z" fill="#0284C7" />
      </g>
      <text x="38" y="22" fill="#1E3A8A" fontFamily="sans-serif" fontWeight="900" fontSize="9">Shapoorji</text>
      <text x="38" y="35" fill="#0284C7" fontFamily="sans-serif" fontWeight="800" fontSize="9">Pallonji</text>
    </svg>
  ),

  // 06. Saudi Radwa Food Co.
  'vendor-6': ({ className = 'w-10 h-10' }) => (
    <svg viewBox="0 0 100 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="50" rx="8" fill="#F8FAFC" />
      <g transform="translate(6, 7)">
        <path d="M12 28C10 20 18 10 26 12C28 14 30 18 28 24C24 28 16 30 12 28Z" fill="#EF4444" />
        <path d="M22 6C20 8 20 10 22 12C24 10 24 8 22 6Z" fill="#F59E0B" />
        <circle cx="20" cy="14" r="2" fill="#FFFFFF" />
      </g>
      <text x="40" y="22" fill="#1E3A8A" fontFamily="sans-serif" fontWeight="900" fontSize="10">دجاج رضوى</text>
      <text x="40" y="35" fill="#EF4444" fontFamily="sans-serif" fontWeight="700" fontSize="8">Radwa Chicken</text>
    </svg>
  ),

  // 07. Alkifah Contracting
  'vendor-7': ({ className = 'w-10 h-10' }) => (
    <svg viewBox="0 0 100 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="50" rx="8" fill="#F8FAFC" />
      <g transform="translate(6, 6)">
        <path d="M8 26C12 14 26 14 30 26" stroke="#DC2626" strokeWidth="3" fill="none" />
        <path d="M14 26L19 12L24 26" stroke="#DC2626" strokeWidth="2" fill="none" />
        <rect x="15" y="15" width="8" height="4" fill="#DC2626" />
      </g>
      <text x="38" y="22" fill="#1E293B" fontFamily="sans-serif" fontWeight="900" fontSize="9">الكفاح للمقاولات</text>
      <text x="38" y="35" fill="#DC2626" fontFamily="sans-serif" fontWeight="700" fontSize="7">ALKIFAH</text>
    </svg>
  ),

  // 08. Al-Bawani
  'vendor-8': ({ className = 'w-10 h-10' }) => (
    <svg viewBox="0 0 100 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="50" rx="8" fill="#F8FAFC" />
      <g transform="translate(6, 6)">
        <polygon points="18,6 28,26 8,26" stroke="#047857" strokeWidth="2.5" fill="none" />
        <line x1="8" y1="20" x2="28" y2="20" stroke="#047857" strokeWidth="2" />
        <circle cx="18" cy="14" r="2.5" fill="#047857" />
      </g>
      <text x="38" y="22" fill="#065F46" fontFamily="sans-serif" fontWeight="900" fontSize="10">البواني</text>
      <text x="38" y="35" fill="#047857" fontFamily="sans-serif" fontWeight="800" fontSize="8" letterSpacing="0.5">AL BAWANI</text>
    </svg>
  ),

  // 09. EFSIM
  'vendor-9': ({ className = 'w-10 h-10' }) => (
    <svg viewBox="0 0 100 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="50" rx="8" fill="#F8FAFC" />
      <text x="50" y="27" textAnchor="middle" fill="#0F172A" fontFamily="sans-serif" fontWeight="900" fontSize="18" letterSpacing="1.5">
        EFSIM
      </text>
      <text x="50" y="40" textAnchor="middle" fill="#0284C7" fontFamily="sans-serif" fontWeight="700" fontSize="6.5" letterSpacing="0.5">
        FACILITIES MANAGEMENT
      </text>
    </svg>
  ),

  // 10. Saudi Binladin Group
  'vendor-10': ({ className = 'w-10 h-10' }) => (
    <svg viewBox="0 0 100 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="50" rx="8" fill="#F8FAFC" />
      <g transform="translate(6, 6)">
        <path d="M18 4L29 10V22L18 28L7 22V10L18 4Z" stroke="#0F172A" strokeWidth="2" fill="none" />
        <path d="M18 10L24 13V20L18 23L12 20V13L18 10Z" fill="#1E293B" />
      </g>
      <text x="38" y="22" fill="#0F172A" fontFamily="sans-serif" fontWeight="900" fontSize="9">مجموعة بن لادن</text>
      <text x="38" y="35" fill="#64748B" fontFamily="sans-serif" fontWeight="700" fontSize="6.5">BINLADIN GROUP</text>
    </svg>
  ),

  // 11. Nesma & Partners
  'vendor-11': ({ className = 'w-10 h-10' }) => (
    <svg viewBox="0 0 100 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="50" rx="8" fill="#F8FAFC" />
      <g transform="translate(6, 8)">
        <polygon points="18,4 28,10 28,22 18,28 8,22 8,10" fill="#F97316" />
        <polygon points="18,9 23,12 23,20 18,23 13,20 13,12" fill="#F8FAFC" />
      </g>
      <text x="38" y="22" fill="#0F172A" fontFamily="sans-serif" fontWeight="900" fontSize="11">نسما</text>
      <text x="38" y="35" fill="#F97316" fontFamily="sans-serif" fontWeight="800" fontSize="8">nesma</text>
    </svg>
  ),

  // 12. SABIC
  'vendor-12': ({ className = 'w-10 h-10' }) => (
    <svg viewBox="0 0 100 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="50" rx="8" fill="#F8FAFC" />
      <text x="50" y="24" textAnchor="middle" fill="#0284C7" fontFamily="sans-serif" fontWeight="900" fontSize="14">
        سابك
      </text>
      <text x="50" y="38" textAnchor="middle" fill="#EA580C" fontFamily="sans-serif" fontWeight="900" fontSize="12" letterSpacing="0.5">
        sabic
      </text>
    </svg>
  ),

  // 13. Jeddah Central Development Co
  'vendor-13': ({ className = 'w-10 h-10' }) => (
    <svg viewBox="0 0 100 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="50" rx="8" fill="#F8FAFC" />
      <g transform="translate(6, 6)">
        <path d="M8 8H14L18 28H12L8 8Z" fill="#F59E0B" />
        <path d="M14 8H20L24 28H18L14 8Z" fill="#0284C7" />
        <path d="M20 8H26L30 28H24L20 8Z" fill="#0D9488" />
      </g>
      <text x="38" y="20" fill="#0F172A" fontFamily="sans-serif" fontWeight="900" fontSize="8.5">وسط جدة للتطوير</text>
      <text x="38" y="34" fill="#0284C7" fontFamily="sans-serif" fontWeight="700" fontSize="7">Jeddah Central</text>
    </svg>
  ),

  // 14. Spray Polyurethane Foam Alliance (SPFA)
  'vendor-14': ({ className = 'w-10 h-10' }) => (
    <svg viewBox="0 0 100 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="50" rx="8" fill="#F8FAFC" />
      <text x="50" y="26" textAnchor="middle" fill="#1E3A8A" fontFamily="sans-serif" fontWeight="900" fontStyle="italic" fontSize="17" letterSpacing="1">
        SPFA
      </text>
      <text x="50" y="39" textAnchor="middle" fill="#EA580C" fontFamily="sans-serif" fontWeight="700" fontSize="6">
        SPRAY FOAM ALLIANCE
      </text>
    </svg>
  ),

  // 15. Tatweer Buildings Company (TBC)
  'vendor-15': ({ className = 'w-10 h-10' }) => (
    <svg viewBox="0 0 100 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="50" rx="8" fill="#F8FAFC" />
      <text x="50" y="25" textAnchor="middle" fill="#0284C7" fontFamily="sans-serif" fontWeight="900" fontSize="18" letterSpacing="1">
        TBC
      </text>
      <text x="50" y="38" textAnchor="middle" fill="#0891B2" fontFamily="sans-serif" fontWeight="700" fontSize="7">
        تطوير المباني
      </text>
    </svg>
  ),

  // 16. El Seif Engineering Contracting Company
  'vendor-16': ({ className = 'w-10 h-10' }) => (
    <svg viewBox="0 0 100 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="50" rx="8" fill="#F8FAFC" />
      <g transform="translate(6, 6)">
        <polygon points="18,4 28,28 8,28" stroke="#DC2626" strokeWidth="2.5" fill="none" />
        <line x1="12" y1="20" x2="24" y2="20" stroke="#DC2626" strokeWidth="2" />
        <line x1="15" y1="12" x2="21" y2="12" stroke="#DC2626" strokeWidth="1.5" />
      </g>
      <text x="38" y="22" fill="#DC2626" fontFamily="sans-serif" fontWeight="900" fontSize="10">EL SEIF</text>
      <text x="38" y="35" fill="#1E293B" fontFamily="sans-serif" fontWeight="700" fontSize="8">السيف مهندسون</text>
    </svg>
  ),

  // 17. ROSHN Group Company
  'vendor-17': ({ className = 'w-10 h-10' }) => (
    <svg viewBox="0 0 100 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="50" rx="8" fill="#F8FAFC" />
      <g transform="translate(6, 6)">
        <circle cx="18" cy="18" r="12" stroke="#047857" strokeWidth="2" fill="none" />
        <path d="M18 8V28M8 18H28M11 11L25 25M25 11L11 25" stroke="#047857" strokeWidth="1.5" />
      </g>
      <text x="38" y="22" fill="#047857" fontFamily="sans-serif" fontWeight="900" fontSize="10">ROSHN</text>
      <text x="38" y="35" fill="#065F46" fontFamily="sans-serif" fontWeight="700" fontSize="8">مجموعة روشن</text>
    </svg>
  ),

  // 18. UrbaCon Trading and Contracting (UCC)
  'vendor-18': ({ className = 'w-10 h-10' }) => (
    <svg viewBox="0 0 100 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="50" rx="8" fill="#F8FAFC" />
      <text x="50" y="25" textAnchor="middle" fill="#854D0E" fontFamily="sans-serif" fontWeight="900" fontSize="17" letterSpacing="1">
        UCC
      </text>
      <text x="50" y="38" textAnchor="middle" fill="#A16207" fontFamily="sans-serif" fontWeight="700" fontSize="7">
        أورباكون UrbaCon
      </text>
    </svg>
  ),
};

export const VendorsSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [showPosterModal, setShowPosterModal] = useState(false);

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
      v.vendorCode.toLowerCase().includes(term) ||
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

        {/* 18 Vendors Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {filteredVendors.map((vendor) => {
            const LogoComponent = VendorLogos[vendor.id];
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
                    <div className="shrink-0 w-24 h-12 bg-slate-50 rounded-lg border border-slate-200 p-1 flex items-center justify-center overflow-hidden">
                      {LogoComponent ? (
                        <LogoComponent className="w-full h-full" />
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

                {/* Vendor Code Highlight Box with Copy Button */}
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
                      onClick={() => handleCopyCode(vendor.id, vendor.vendorCode)}
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

            {/* Poster Image */}
            <div className="p-3 max-h-[80vh] overflow-y-auto flex items-center justify-center bg-slate-100">
              <img
                src="/assets/aistudio/WhatsApp_Image_2026-10-25_at_3.17.15_PM_3530d2cc.jpeg"
                alt="KRCC Official Vendor List Poster"
                className="max-w-full h-auto rounded-lg shadow-md border border-slate-200"
              />
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
