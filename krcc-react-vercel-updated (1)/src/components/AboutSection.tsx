import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldAlert, Download, CheckCircle, HardHat, Compass, FileCheck, Globe } from 'lucide-react';
import heroWaterproofing from '../assets/images/krcc_hero_waterproofing_1792866437662.jpg';

interface AboutSectionProps {
  onOpenProfileModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenProfileModal }) => {
  const { t, language } = useLanguage();

  const coreSpecialties = [
    { en: 'Waterproofing solutions (EPDM, PVC, Bitumen & Liquids)', ar: 'حلول العزل المائي (EPDM، PVC، البيتومين، والعوازل السائلة)' },
    { en: 'Thermal insulation systems (Rigid boards & loose infill)', ar: 'أنظمة العزل الحراري (الألواح الصلبة ومواد العزل المعززة)' },
    { en: 'Polyurethane foam spray applications', ar: 'تطبيقات رش فوم البولي يوريثان المتطورة' },
    { en: 'Epoxy flooring and self-leveling concrete screeds', ar: 'أرضيات الإيبوكسي وخرسانة التسوية الذاتية' },
    { en: 'GRP lining and HDPE lining in concrete tanks and basins', ar: 'تبطين ألياف GRP وأغشية HDPE لخزانات الخرسانة والبحيرات' },
    { en: 'Construction materials supply (aggregates, sand, membranes)', ar: 'توريد المواد الإنشائية (الركام، رمال الكثبان، لفائف العزل)' },
  ];

  const pillars = [
    {
      icon: HardHat,
      title: t.about.pillar1Title,
      desc: t.about.pillar1Desc,
    },
    {
      icon: ShieldAlert,
      title: t.about.pillar2Title,
      desc: t.about.pillar2Desc,
    },
    {
      icon: Compass,
      title: t.about.pillar3Title,
      desc: t.about.pillar3Desc,
    },
    {
      icon: FileCheck,
      title: t.about.pillar4Title,
      desc: t.about.pillar4Desc,
    },
  ];

  return (
    <section id="about" className="py-20 bg-slate-50 text-slate-900 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-red-700 mb-2">
            <span className="w-6 h-0.5 bg-red-700" />
            <span>{t.about.kicker}</span>
            <span>·</span>
            <span className="text-slate-500 font-semibold">{t.company.since}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            {t.about.title}
          </h2>
        </div>

        {/* Narrative & Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <div className="lg:col-span-7 space-y-5 text-slate-700 leading-relaxed text-base">
            <p className="font-semibold text-slate-900 text-lg">
              {t.about.p1}
            </p>
            <p>{t.about.p2}</p>
            <p>{t.about.p3}</p>

            {/* Service Areas Bullet List */}
            <div className="pt-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3">
                {language === 'ar' ? 'مجالات التخصص والخدمات الأساسية:' : 'Core Specialized Areas of Work:'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {coreSpecialties.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-800">
                    <CheckCircle className="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
                    <span>{language === 'ar' ? item.ar : item.en}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile Download CTA in About section */}
            <div className="pt-6">
              <a
                href="/KRCC-Company-Profile.pdf"
                download="KRCC-Company-Profile.pdf"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-xl shadow-xs hover:shadow transition-all cursor-pointer border border-slate-300"
              >
                <Download className="w-4 h-4 text-red-700" />
                <span>{t.about.btnDownload}</span>
              </a>
            </div>
          </div>

          {/* Visual Showcase Card - Clean Bright Corporate Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-white text-slate-900">
              <img
                src={heroWaterproofing}
                alt="KRCC On-Site Operations"
                className="w-full h-72 object-cover object-center filter brightness-100"
              />
              <div className="p-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-red-700">
                  {language === 'ar' ? 'شعارنا المؤسسي' : 'CORPORATE MOTTO'}
                </span>
                <h4 className="text-xl font-black text-slate-900 mt-1">
                  {t.company.slogan}
                </h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {language === 'ar'
                    ? 'التزام بالمعايير الهندسية، حماية المنشآت، وتوريد المواد المعتمدة في مختلف مدن المملكة العربية السعودية.'
                    : 'Uncompromising engineering standards, building protection, and certified materials logistics across the Kingdom of Saudi Arabia.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* International Footprint Showcase - Light Executive Presentation */}
        <div className="mb-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white via-slate-50 to-slate-100 text-slate-900 border-t-4 border-red-700 shadow-md border border-slate-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-red-700 mb-1">
                <Globe className="w-4 h-4" />
                <span>{t.about.globalBadge}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                {t.about.globalTitle}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg leading-relaxed">
              {t.about.globalDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white border border-slate-200 hover:border-red-700/60 transition-all shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl">🇸🇦</span>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-800 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                  {language === 'ar' ? 'المقر الرئيسي' : 'HQ'}
                </span>
              </div>
              <h4 className="text-sm font-black text-slate-900 mb-1">{t.about.countryKSA}</h4>
              <p className="text-xs text-slate-500 leading-snug">{t.about.countryKSASub}</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 hover:border-red-700/60 transition-all shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl">🇬🇧</span>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  {language === 'ar' ? 'أوروبا' : 'UK'}
                </span>
              </div>
              <h4 className="text-sm font-black text-slate-900 mb-1">{t.about.countryUK}</h4>
              <p className="text-xs text-slate-500 leading-snug">{t.about.countryUKSub}</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 hover:border-red-700/60 transition-all shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl">🇦🇪</span>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  {language === 'ar' ? 'الخليج' : 'GCC'}
                </span>
              </div>
              <h4 className="text-sm font-black text-slate-900 mb-1">{t.about.countryUAE}</h4>
              <p className="text-xs text-slate-500 leading-snug">{t.about.countryUAESub}</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 hover:border-red-700/60 transition-all shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl">🇵🇰</span>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  {language === 'ar' ? 'جنوب آسيا' : 'PK'}
                </span>
              </div>
              <h4 className="text-sm font-black text-slate-900 mb-1">{t.about.countryPK}</h4>
              <p className="text-xs text-slate-500 leading-snug">{t.about.countryPKSub}</p>
            </div>
          </div>
        </div>

        {/* Operational Pillars */}
        <div className="mb-14">
          <h3 className="text-xl font-bold text-slate-900 mb-6 text-center sm:text-start">
            {t.about.pillarsTitle}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pil, idx) => {
              const Icon = pil.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-red-700/60 hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-red-50 text-red-700 flex items-center justify-center mb-4 border border-red-100">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-2">
                    {pil.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pil.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Clear Notice for Editable Corporate Statistics as strictly instructed */}
        <div className="p-5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3.5">
          <div className="p-2 rounded-lg bg-amber-200 text-amber-800 shrink-0 mt-0.5">
            <FileCheck className="w-4 h-4" />
          </div>
          <div className="text-xs leading-relaxed">
            <strong className="font-bold block text-sm text-amber-950 mb-0.5">
              {t.about.noticeTitle}
            </strong>
            {t.about.noticeText}
          </div>
        </div>
      </div>
    </section>
  );
};
