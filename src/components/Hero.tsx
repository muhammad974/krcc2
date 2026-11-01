import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Download, ArrowRight, ArrowLeft, PhoneCall, ShieldCheck, Award, Layers, Sparkles } from 'lucide-react';
import heroWaterproofingImg from '../assets/images/krcc_hero_waterproofing_1792866437662.jpg';
import { HeroSlider } from './HeroSlider';

interface HeroProps {
  onOpenProfileModal: () => void;
  onExploreServices: () => void;
  onContactTeam: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenProfileModal,
  onExploreServices,
  onContactTeam,
}) => {
  const { t, language, dir } = useLanguage();
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const quickHighlights = [
    {
      icon: ShieldCheck,
      titleEn: 'Waterproofing & Insulation',
      titleAr: 'العزل المائي والحراري',
      descEn: 'EPDM, PVC, Bitumen & PU Spray Foam',
      descAr: 'أغشية EPDM و PVC ولفائف البيتومين وفوم الرش',
    },
    {
      icon: Award,
      titleEn: 'MEP Engineering Works',
      titleAr: 'الأعمال الكهروميكانيكية MEP',
      descEn: 'HVAC, Firefighting, Power & Smart BMS',
      descAr: 'التكييف، مكافحة الحريق، الكهرباء وأنظمة BMS',
    },
    {
      icon: Layers,
      titleEn: 'Architectural & Civil Works',
      titleAr: 'الأعمال الإنشائية والمدنية',
      descEn: 'RCC Concrete, Steel, BIM & Turnkey',
      descAr: 'الهياكل الخرسانية والمعدنية والتشييد المتكامل',
    },
    {
      icon: Sparkles,
      titleEn: 'High Voltage & Renewables',
      titleAr: 'الجهد العالي والطاقة النظيفة',
      descEn: '380kV Substations, Solar PV & BESS',
      descAr: 'محطات التحويل ۳۸۰ ك.ف، الطاقة الشمسية وتخزين الطاقة',
    },
  ];

  return (
    <section id="hero" className="relative bg-slate-50 text-slate-900 overflow-hidden border-b border-slate-200">
      {/* Background Hero Image with Bright Daylight Architectural Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={heroWaterproofingImg}
          alt="KHABEER AL RAIDA CONTRACTING COMPANY - Engineering Works"
          className="w-full h-full object-cover object-center scale-105 filter brightness-105 opacity-20"
        />
        {/* Layered Gradient Overlays for Crystal-Clear Text Readability in Daylight */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50/98 via-slate-50/92 to-slate-100/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/40 to-transparent" />
        {/* Subtle Brand Red Ambient Glow */}
        <div className="absolute -top-32 right-1/4 w-96 h-96 bg-red-700/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 md:pt-14 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Official Introduction, Accreditations & CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Company Monogram Badge with Since 2008 & Official Emblem */}
            <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 border border-slate-300 text-xs text-slate-800 mb-5 shadow-xs w-fit">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              <span className="font-extrabold text-red-700 tracking-wider">KRCC</span>
              <span className="text-slate-300">|</span>
              <span className="px-2 py-0.5 rounded-full bg-red-700 font-extrabold text-[10px] text-white tracking-wider uppercase shadow-xs">
                {language === 'ar' ? 'منذ عام ٢٠٠٨' : 'SINCE 2008'}
              </span>
              <span className="text-slate-300">|</span>
              <span className="font-medium tracking-wide">
                {language === 'ar'
                  ? 'شركة خبير الرائدة للمقاولات'
                  : 'KHABEER AL RAIDA CONTRACTING CO.'}
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-[10px] font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
                {language === 'ar' ? 'السعودية · بريطانيا · الإمارات · باكستان' : 'KSA (HQ) · UK · UAE · Pakistan'}
              </span>
            </div>

            {/* Official Required Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-black tracking-tight text-slate-900 leading-tight mb-4">
              {t.hero.headline}
            </h1>

            {/* Official Required Supporting Text */}
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mb-8 max-w-xl">
              {t.hero.subheadline}
            </p>

            {/* Three Prominent Required CTAs */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              {/* CTA 1: Explore Our Services */}
              <button
                onClick={onExploreServices}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-red-700 hover:bg-red-800 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer group active:scale-[0.98]"
              >
                <span>{t.hero.btnServices}</span>
                <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              {/* CTA 2: Download Company Profile */}
              <a
                href="/KRCC-Company-Profile.pdf"
                download="KRCC-Company-Profile.pdf"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm rounded-xl border border-slate-300 hover:border-slate-400 transition-all cursor-pointer shadow-xs"
              >
                <Download className="w-4 h-4 text-red-700" />
                <span>{t.hero.btnProfile}</span>
              </a>

              {/* CTA 3: Contact Our Team */}
              <button
                onClick={onContactTeam}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm rounded-xl border border-slate-300 transition-all cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-slate-700" />
                <span>{t.hero.btnContact}</span>
              </button>
            </div>

            {/* Metrics & Scope Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 max-w-lg">
              <div>
                <div className="text-xl sm:text-2xl font-black text-red-700">
                  {t.hero.stat1Number}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {t.hero.stat1Label}
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-slate-900">
                  {t.hero.stat2Number}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {t.hero.stat2Label}
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-red-700">
                  {t.hero.stat3Number}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {t.hero.stat3Label}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Prominent Interactive Engineering Slider (Construction, Waterproofing, Epoxy) */}
          <div className="lg:col-span-6">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-red-700 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                <span>{language === 'ar' ? 'معرض الأعمال الميدانية المباشر' : 'LIVE PROJECT & FIELD EXECUTION SHOWCASE'}</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-500">
                {language === 'ar' ? '٨ قطاعات هندسية معتمدة' : '8 Certified Engineering Divisions'}
              </span>
            </div>
            <HeroSlider onOpenProfileModal={onOpenProfileModal} />
          </div>
        </div>
      </div>

      {/* Main Service Categories Presentation Strip Below Hero - Clean Light Palette */}
      <div className="relative z-10 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickHighlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-red-700/50 hover:bg-white hover:shadow-md transition-all"
                >
                  <div className="p-2.5 rounded-lg bg-red-50 text-red-700 shrink-0 border border-red-200/60">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">
                      {language === 'ar' ? item.titleAr : item.titleEn}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {language === 'ar' ? item.descAr : item.descEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
