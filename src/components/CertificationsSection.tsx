import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, CheckCircle2, Award, ExternalLink } from 'lucide-react';

// ==================== AUTHENTIC VECTOR LOGOS ====================

// 1. ISO Logo (International Organization for Standardization)
const IsoLogo: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="ISO Certification Logo">
    <rect width="80" height="80" rx="14" fill="#005A9C" />
    {/* Global Latitude / Longitude grid lines */}
    <circle cx="40" cy="40" r="30" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3 3" opacity="0.35" />
    <ellipse cx="40" cy="40" rx="30" ry="12" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.4" />
    <path d="M40 10V70" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.4" />
    {/* ISO Bold Lettermark */}
    <text x="40" y="47" textAnchor="middle" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="22" letterSpacing="1">
      ISO
    </text>
    <text x="40" y="60" textAnchor="middle" fill="#93C5FD" fontFamily="sans-serif" fontWeight="700" fontSize="8" letterSpacing="0.5">
      9001:2015
    </text>
  </svg>
);

// 2. Saudi Aramco Logo (أرامكو السعودية)
const AramcoLogo: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Saudi Aramco Logo">
    <rect width="80" height="80" rx="14" fill="#002D42" />
    {/* Aramco stylized dynamic energy starburst */}
    <g transform="translate(10, 8)">
      <circle cx="30" cy="24" r="16" fill="url(#aramcoGlow)" />
      {/* Dynamic converging rays */}
      <path d="M30 10C37.7 10 44 16.3 44 24C44 31.7 37.7 38 30 38C22.3 38 16 31.7 16 24C16 16.3 22.3 10 30 10Z" fill="#00A3E0" />
      <path d="M30 14C35.5 14 40 18.5 40 24C40 29.5 35.5 34 30 34C24.5 34 20 29.5 20 24C20 18.5 24.5 14 30 14Z" fill="#84BD00" />
      <circle cx="30" cy="24" r="6" fill="#002D42" />
      <circle cx="30" cy="24" r="3" fill="#FFFFFF" />
    </g>
    <text x="40" y="58" textAnchor="middle" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="800" fontSize="13" letterSpacing="0.5">
      aramco
    </text>
    <text x="40" y="69" textAnchor="middle" fill="#84BD00" fontFamily="sans-serif" fontWeight="700" fontSize="8">
      أرامكو السعودية
    </text>
    <defs>
      <radialGradient id="aramcoGlow" cx="0.5" cy="0.5" r="0.5">
        <stop stopColor="#00A3E0" stopOpacity="0.4" />
        <stop offset="1" stopColor="#00A3E0" stopOpacity="0" />
      </radialGradient>
    </defs>
  </svg>
);

// 3. SEC (Saudi Electricity Company / الشركة السعودية للكهرباء)
const SecLogo: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Saudi Electricity Company Logo">
    <rect width="80" height="80" rx="14" fill="#0F172A" />
    {/* Electric Energy dynamic wave / arc */}
    <g transform="translate(15, 10)">
      <path
        d="M25 6L14 26H26L21 44L38 22H25L31 6H25Z"
        fill="url(#secElectric)"
      />
      <circle cx="25" cy="25" r="22" stroke="#00A3E0" strokeWidth="1.5" opacity="0.3" strokeDasharray="4 2" />
    </g>
    <text x="40" y="60" textAnchor="middle" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="14" letterSpacing="1">
      SEC
    </text>
    <text x="40" y="70" textAnchor="middle" fill="#38BDF8" fontFamily="sans-serif" fontWeight="600" fontSize="7">
      الكهرباء السعودية
    </text>
    <defs>
      <linearGradient id="secElectric" x1="14" y1="6" x2="38" y2="44">
        <stop stopColor="#F59E0B" />
        <stop offset="0.5" stopColor="#E11D48" />
        <stop offset="1" stopColor="#0284C7" />
      </linearGradient>
    </defs>
  </svg>
);

// 4. Saudi Contractor Classification (تصنيف المقاولين - وزارة البلديات والإسكان)
const ClassificationLogo: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Saudi Contractor Classification Logo">
    <rect width="80" height="80" rx="14" fill="#1C1917" />
    {/* Golden Saudi emblem palm and swords + building tier */}
    <g transform="translate(20, 8)">
      <path d="M20 6C20 6 15 11 12 16C15 17 25 17 28 16C25 11 20 6 20 6Z" fill="#EAB308" />
      <path d="M20 16V28" stroke="#EAB308" strokeWidth="2.5" strokeLinecap="round" />
      {/* Crossed Swords */}
      <path d="M10 24L30 32M30 24L10 32" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" />
      {/* Structural building tiers representing classification */}
      <rect x="5" y="34" width="30" height="3" rx="1.5" fill="#EAB308" />
      <rect x="9" y="30" width="22" height="2" rx="1" fill="#CA8A04" />
      <rect x="13" y="27" width="14" height="2" rx="1" fill="#A16207" />
    </g>
    <text x="40" y="56" textAnchor="middle" fill="#FDE047" fontFamily="sans-serif" fontWeight="900" fontSize="10" letterSpacing="0.5">
      CLASSIFIED
    </text>
    <text x="40" y="68" textAnchor="middle" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="800" fontSize="8.5">
      تصنيف المقاولين
    </text>
  </svg>
);

// 5. SAC Logo (Saudi Accreditation Center / Saudi Contractors Authority SCA)
const SacLogo: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Saudi Accreditation Center Logo">
    <rect width="80" height="80" rx="14" fill="#064E3B" />
    {/* Geometric green Accreditation Shield & Verification checkmark */}
    <g transform="translate(20, 8)">
      <path
        d="M20 5L36 12V24C36 33 29 41 20 44C11 41 4 33 4 24V12L20 5Z"
        fill="#047857"
        stroke="#10B981"
        strokeWidth="1.5"
      />
      {/* Checkmark of accreditation */}
      <path
        d="M13 24L18 29L28 18"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <text x="40" y="60" textAnchor="middle" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="13" letterSpacing="1">
      SAC
    </text>
    <text x="40" y="70" textAnchor="middle" fill="#A7F3D0" fontFamily="sans-serif" fontWeight="700" fontSize="7">
      المركز السعودي للاعتماد
    </text>
  </svg>
);

const imgLogo = (file: string, alt: string): React.FC<{ className?: string }> => ({ className }) => (
  <img src={`/assets/certs/${file}`} alt={alt} loading="lazy" className={className} />
);
const RealAramco = imgLogo('aramco.png', 'Saudi Aramco logo');
const RealSec = imgLogo('sec.png', 'Saudi Electricity Company logo');
const RealSca = imgLogo('sca.png', 'Saudi Contractors Authority logo');
const RealGrade = imgLogo('grade3.png', 'Classification');

export const CertificationsSection: React.FC = () => {
  const { t, language } = useLanguage();

  const certificationsList = [
    {
      id: 'iso',
      title: t.certifications.isoTitle,
      desc: t.certifications.isoDesc,
      tag: 'ISO 9001 / 45001',
      org: 'International Organization for Standardization',
      logo: IsoLogo,
      accentColor: 'border-blue-600',
    },
    {
      id: 'aramco',
      title: t.certifications.aramcoTitle,
      desc: t.certifications.aramcoDesc,
      tag: 'Saudi Aramco Standards',
      org: 'Saudi Arabian Oil Company',
      logo: RealAramco,
      accentColor: 'border-cyan-600',
    },
    {
      id: 'sec',
      title: t.certifications.secTitle,
      desc: t.certifications.secDesc,
      tag: 'SEC Vendor & Contractor',
      org: 'Saudi Electricity Company',
      logo: RealSec,
      accentColor: 'border-amber-600',
    },
    {
      id: 'classification',
      title: t.certifications.classificationTitle,
      desc: t.certifications.classificationDesc,
      tag: 'Classification',
      org: 'Saudi Contractors Authority',
      logo: RealGrade,
      accentColor: 'border-yellow-600',
    },
    {
      id: 'sac',
      title: t.certifications.sacTitle,
      desc: t.certifications.sacDesc,
      tag: 'SCA Membership',
      org: 'Saudi Contractors Authority',
      logo: RealSca,
      accentColor: 'border-emerald-600',
    },
  ];

  return (
    <section id="certifications" className="py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-red-700 mb-2">
              <span className="w-6 h-0.5 bg-red-700" />
              <span>{t.certifications.kicker}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              {t.certifications.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
              {t.certifications.subtitle}
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-red-50 border border-red-200/80 text-red-800 font-bold text-xs shrink-0 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-red-700" />
            <span>{t.certifications.certifiedFrom}</span>
          </div>
        </div>

        {/* 5 Certifications Cards with Distinctive Logos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-10">
          {certificationsList.map((item) => {
            const LogoComponent = item.logo;
            return (
              <div
                key={item.id}
                className="group flex flex-col justify-between p-5 bg-slate-50/70 rounded-2xl border border-slate-200/90 hover:border-red-700/60 hover:bg-white hover:shadow-xl transition-all duration-200"
              >
                <div>
                  {/* Top Vector Logo Display */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="transition-transform group-hover:scale-105">
                      <LogoComponent className={item.id === 'iso' ? 'w-14 h-14 drop-shadow-xs' : 'h-14 w-auto max-w-[7.5rem] object-contain'} />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{language === 'ar' ? 'معتمد' : 'Verified'}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-red-700 transition-colors mb-1.5 leading-snug">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Tag */}
                <div className="pt-3 border-t border-slate-200/80">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500 block truncate">
                    {item.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Continuous Quick Trust Strip with All 5 Names - Clean Light Theme */}
        <div className="p-4 rounded-xl bg-slate-50 text-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-red-700 font-extrabold uppercase tracking-wider text-[11px]">
            <Award className="w-4 h-4 text-red-700" />
            <span>{t.certifications.certifiedFrom}</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-slate-700 font-bold text-xs">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-slate-200 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>ISO 9001 & 45001</span>
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-slate-200 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              <span>SAUDI ARAMCO</span>
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-slate-200 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>SEC (الكهرباء)</span>
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-slate-200 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-yellow-500" />
              <span>CLASSIFICATION (التصنيف)</span>
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-slate-200 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>SCA (الهيئة السعودية للمقاولين)</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
