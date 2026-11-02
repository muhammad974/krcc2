import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface LogoProps {
  variant?: 'header' | 'footer' | 'mark' | 'hero';
  className?: string;
  showSlogan?: boolean;
  isDark?: boolean;
}

export const KRCCLogo: React.FC<LogoProps> = ({
  variant = 'header',
  className = '',
  showSlogan = false,
  isDark = false,
}) => {
  const { language } = useLanguage();

  const logoSrc = '/assets/aistudio/new-logo-without_bg_85911b35.jpeg';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official KRCC Emblem Image */}
      <div
        className={`relative shrink-0 flex items-center justify-center overflow-hidden transition-transform duration-200 ${
          isDark
            ? 'bg-white p-1 rounded-xl shadow-md border border-neutral-700/50'
            : 'bg-white p-0.5 rounded-lg'
        }`}
      >
        <img
          src={logoSrc}
          alt="KHABEER AL RAIDA CONTRACTING COMPANY (KRCC) Official Logo"
          className={`object-contain ${
            variant === 'hero'
              ? 'w-14 h-14'
              : variant === 'mark'
              ? 'w-10 h-10'
              : 'w-12 h-12 md:w-16 md:h-16'
          }`}
        />
      </div>

      {variant !== 'mark' && (
        <div className="flex flex-col justify-center leading-tight">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="font-black tracking-wider text-2xl md:text-3xl">
              <span className="text-red-700">KR</span>
              <span className={isDark ? 'text-neutral-200' : 'text-neutral-700'}>CC</span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-red-700 bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/20">
              KSA
            </span>
            <span
              className={`text-[9px] uppercase font-extrabold tracking-wider px-1.5 py-0.5 rounded ${
                isDark
                  ? 'bg-neutral-800 text-neutral-300 border border-neutral-700'
                  : 'bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              {language === 'ar' ? 'منذ ٢٠٠٨' : 'SINCE 2008'}
            </span>
          </div>

          <span
            className={`${language === 'ar' ? 'text-base md:text-xl' : 'text-xs md:text-sm tracking-tight'} font-bold mt-0.5 ${
              isDark ? 'text-neutral-200' : 'text-slate-800'
            }`}
          >
            {language === 'ar'
              ? 'شركة خبير الرائدة للمقاولات'
              : 'KHABEER AL RAIDA CONTRACTING'}
          </span>

          {showSlogan ? (
            <span className="text-[9px] tracking-wider uppercase font-semibold text-red-600 mt-1">
              {language === 'ar' ? 'نبني اليوم لغدٍ أقوى' : 'BUILDING TODAY FOR A STRONGER TOMORROW'}
            </span>
          ) : (
            <span
              className={`${
                language === 'ar'
                  ? 'text-[9px] tracking-wider uppercase'
                  : 'text-sm md:text-lg font-bold leading-snug'
              } ${isDark ? 'text-neutral-300' : 'text-slate-600'}`}
            >
              {language === 'ar'
                ? 'KHABEER AL RAIDA CONTRACTING'
                : 'شركة خبير الرائدة للمقاولات'}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
