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

  const isAr = language === 'ar';
  const nameEn = 'KHABEER AL RAIDA CONTRACTING';
  const nameAr = 'شركة خبير الرائدة للمقاولات';
  const primaryText = isDark ? 'text-neutral-100' : 'text-slate-900';
  const secondaryText = isDark ? 'text-neutral-300' : 'text-slate-700';

  return (
    <div className={`flex items-center gap-3 md:gap-4 select-none ${className}`}>
      {/* Official KRCC emblem with "Since 2008" directly underneath */}
      <div className="shrink-0 flex flex-col items-center gap-1">
        <div
          className={`relative flex items-center justify-center overflow-hidden transition-transform duration-200 ${
            isDark
              ? 'bg-white p-1 rounded-xl shadow-md border border-neutral-700/50'
              : 'bg-white p-0.5 rounded-lg'
          }`}
        >
          <img
            src={logoSrc}
            alt="KHABEER AL RAIDA CONTRACTING COMPANY (KRCC) Official Logo"
            className={`object-contain ${
              variant === 'mark' ? 'w-10 h-10' : 'w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24'
            }`}
          />
        </div>

        {variant !== 'mark' && (
          <span
            className={`text-[9px] sm:text-[10px] md:text-xs leading-none font-extrabold tracking-wider px-2 py-1 rounded whitespace-nowrap ${
              isDark
                ? 'bg-neutral-800 text-neutral-300 border border-neutral-700'
                : 'bg-red-50 text-red-700 border border-red-200/70'
            }`}
          >
            {isAr ? 'منذ ٢٠٠٨' : 'SINCE 2008'}
          </span>
        )}
      </div>

      {/* Company names (English + Arabic) sit right next to the emblem */}
      {variant !== 'mark' && (
        <div className="flex flex-col justify-center leading-tight min-w-0">
          <span
            className={`font-extrabold tracking-tight ${primaryText} ${
              isAr ? 'order-2 text-xs sm:text-sm md:text-lg' : 'text-sm sm:text-base md:text-xl'
            }`}
          >
            {nameEn}
          </span>
          <span
            className={`font-extrabold ${secondaryText} ${
              isAr ? 'order-1 text-lg sm:text-xl md:text-3xl' : 'text-base sm:text-lg md:text-2xl mt-0.5'
            }`}
          >
            {nameAr}
          </span>

          {showSlogan && (
            <span className="order-3 text-[9px] sm:text-[10px] tracking-wider uppercase font-semibold text-red-600 mt-1.5">
              {isAr ? 'نبني اليوم لغدٍ أقوى' : 'BUILDING TODAY FOR A STRONGER TOMORROW'}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
