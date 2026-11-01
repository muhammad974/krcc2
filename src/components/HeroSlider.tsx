import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ChevronLeft, ChevronRight, Pause, Play, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

// Import high-resolution engineering assets
import civilConstructionImg from '../assets/images/civil_construction_1793009327289.jpg';
import waterproofingImg from '../assets/images/krcc_hero_waterproofing_1792866437662.jpg';
import epoxyFlooringImg from '../assets/images/krcc_epoxy_floors_1792866451940.jpg';
import puFoamImg from '../assets/images/krcc_pu_foam_1792866464773.jpg';
import grpLiningImg from '../assets/images/krcc_grp_lining_1792866493970.jpg';
import materialsYardImg from '../assets/images/krcc_materials_yard_1792866478729.jpg';

export interface SlideItem {
  id: string;
  categoryEn: string;
  categoryAr: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  badgeEn: string;
  badgeAr: string;
  image: string;
  targetSection: string;
}

export const heroSlides: SlideItem[] = [
  {
    id: 'construction',
    categoryEn: 'Civil & Structural Construction',
    categoryAr: 'الإنشاءات والأعمال المدنية',
    titleEn: 'General Contracting & Structural Works',
    titleAr: 'المقاولات العامة والإنشاءات الهيكلية',
    descEn: 'Reinforced concrete framing, foundations, civil earthworks, and commercial building execution across Saudi Arabia.',
    descAr: 'تنفيذ الهياكل الخرسانية المسلحة، القواعد والأساسات، وأعمال التطوير الإنشائي والتجاري في المملكة.',
    badgeEn: 'PRE-QUALIFIED CONTRACTOR',
    badgeAr: 'مقاول عام معتمد',
    image: civilConstructionImg,
    targetSection: 'services',
  },
  {
    id: 'waterproofing',
    categoryEn: 'Waterproofing Engineering',
    categoryAr: 'هندسة العزل المائي',
    titleEn: 'Multi-Tier Waterproofing Membranes',
    titleAr: 'أنظمة العزل المائي المتطورة والمعتمدة',
    descEn: '4mm SBS bitumen rolls, EPDM, PVC membranes, and acrylic liquid coatings with 10-year watertight guarantee.',
    descAr: 'لفائف البيتومين SBS سماكة ٤ ملم، أغشية EPDM و PVC والعوازل السائلة مع ضمان عزل تام يصل إلى ١٠ سنوات.',
    badgeEn: 'ISO & ARAMCO COMPLIANT',
    badgeAr: 'مطابق للمواصفات القياسية',
    image: waterproofingImg,
    targetSection: 'services',
  },
  {
    id: 'epoxy',
    categoryEn: 'Epoxy & Screed Flooring',
    categoryAr: 'أرضيات الإيبوكسي والسكرييد',
    titleEn: 'Industrial High-Performance Epoxy Floors',
    titleAr: 'أرضيات إيبوكسية صناعية عالية التحمل',
    descEn: 'Self-smoothing resin screeds, chemical-resistant warehouse floors, anti-static coating, and safety line striping.',
    descAr: 'أرضيات إيبوكسي ذاتية التسوية، مقاومة للكيماويات والزيوت، مانعة للشحنات، وتخطيط مسارات السلامة اللوجستية.',
    badgeEn: 'HIGH MECHANICAL RESISTANCE',
    badgeAr: 'مقاومة ميكانيكية وكيميائية فائقة',
    image: epoxyFlooringImg,
    targetSection: 'services',
  },
  {
    id: 'insulation',
    categoryEn: 'Thermal Insulation',
    categoryAr: 'العزل الحراري المتكامل',
    titleEn: 'Polyurethane Spray Foam & Energy Saving',
    titleAr: 'رش فوم البولي يوريثان وكفاءة الطاقة',
    descEn: 'High-density closed-cell PU spray foam and lightweight foam concrete strictly adhering to SEEC standards.',
    descAr: 'عزل حراري برش فوم البولي يوريثان عالي الكثافة والخرسانة الرغوية الخفيفة المعتمدة لدى كفاءة الطاقة.',
    badgeEn: 'SEEC ENERGY CERTIFIED',
    badgeAr: 'معتمد لكفاءة استهلاك الطاقة',
    image: puFoamImg,
    targetSection: 'services',
  },
  {
    id: 'lining',
    categoryEn: 'Tank & Basin Lining',
    categoryAr: 'تبطين الخزانات والأحواض',
    titleEn: 'GRP & HDPE Geomembrane Containment',
    titleAr: 'تبطين متطور بألياف GRP وأغشية HDPE',
    descEn: 'Food-grade fiberglass lining for drinking water reservoirs and heavy HDPE containment liners for municipal basins.',
    descAr: 'تبطين صحي معتمد لخزانات مياه الشرب بألياف GRP الزجاجية وأغشية HDPE العازلة للأحواض الصناعية.',
    badgeEn: 'FOOD-GRADE & CERTIFIED',
    badgeAr: 'آمن لمياه الشرب ومطابق للمواصفات',
    image: grpLiningImg,
    targetSection: 'services',
  },
  {
    id: 'materials',
    categoryEn: 'Material Supply & Fleet',
    categoryAr: 'توريد مواد البناء والردم',
    titleEn: 'Subbase, Dune Sand & Crush Aggregates',
    titleAr: 'توريد الدفان، رمال الكثبان، والركام المصنف',
    descEn: 'Direct bulk material supply with dedicated fleet: certified base coarse, screened gravel, and compaction testing.',
    descAr: 'توريد مباشر وفوري بأسطول شاحنات مجهز: مواد سبيس معتمدة، كرش، رمال، مع اختبارات الدمك الموقعي.',
    badgeEn: '18 APPROVED VENDOR CODES',
    badgeAr: '١٨ كود اعتماد رسمي للموردين',
    image: materialsYardImg,
    targetSection: 'materials',
  },
];

interface HeroSliderProps {
  onSelectService?: (serviceId: string) => void;
  onOpenProfileModal?: () => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onSelectService, onOpenProfileModal }) => {
  const { language, dir } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const SLIDE_DURATION = 5000; // 5 seconds per slide
  const PROGRESS_STEP = 50; // update progress every 50ms

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
    setProgress(0);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setProgress(0);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  // Handle auto-advance
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    const intervalTime = SLIDE_DURATION;
    const increment = (PROGRESS_STEP / intervalTime) * 100;

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + increment;
      });
    }, PROGRESS_STEP);

    timerRef.current = setInterval(() => {
      nextSlide();
    }, intervalTime);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPlaying, nextSlide]);

  const currentSlide = heroSlides[currentIndex];
  const NextChevron = dir === 'rtl' ? ChevronLeft : ChevronRight;
  const PrevChevron = dir === 'rtl' ? ChevronRight : ChevronLeft;
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className="relative w-full rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden group select-none"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
      aria-label="KRCC Engineering Project Showcase Slider"
    >
      {/* Aspect Ratio Container for Main Visual */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/9] w-full overflow-hidden bg-slate-100">
        {heroSlides.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt={language === 'ar' ? slide.titleAr : slide.titleEn}
                className={`w-full h-full object-cover object-center transform transition-transform duration-7000 ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              {/* Subtle daylight gradient for crisp caption readability while maintaining bright architectural feel */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/35 to-slate-900/10" />
            </div>
          );
        })}

        {/* Top Floating Badge Bar */}
        <div className="absolute top-4 inset-x-4 z-20 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-red-700 font-extrabold text-[11px] tracking-wider uppercase shadow-md border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              <span>{language === 'ar' ? currentSlide.badgeAr : currentSlide.badgeEn}</span>
            </span>
          </div>

          {/* Slide Counter & Play/Pause */}
          <div className="flex items-center gap-2 pointer-events-auto">
            <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white font-mono text-xs font-bold border border-slate-700/60 shadow-xs">
              0{currentIndex + 1} / 0{heroSlides.length}
            </span>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md transition-colors cursor-pointer border border-slate-700/60"
              aria-label={isPlaying ? 'Pause Slider' : 'Play Slider'}
              title={isPlaying ? 'Pause Auto-Play' : 'Resume Auto-Play'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Left & Right Chevron Navigation */}
        <div className="absolute inset-y-0 inset-x-3 z-20 flex items-center justify-between pointer-events-none">
          <button
            onClick={prevSlide}
            className="pointer-events-auto p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-800 hover:text-red-700 shadow-lg border border-slate-200 backdrop-blur-sm transition-all transform hover:scale-105 active:scale-95 cursor-pointer opacity-90 group-hover:opacity-100"
            aria-label="Previous Slide"
          >
            <PrevChevron className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="pointer-events-auto p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-800 hover:text-red-700 shadow-lg border border-slate-200 backdrop-blur-sm transition-all transform hover:scale-105 active:scale-95 cursor-pointer opacity-90 group-hover:opacity-100"
            aria-label="Next Slide"
          >
            <NextChevron className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom Slide Info Overlay on Image */}
        <div className="absolute bottom-3 inset-x-4 z-20 pointer-events-auto">
          <div className="p-4 sm:p-5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-lg text-slate-900">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-red-700 block mb-0.5">
                  {language === 'ar' ? currentSlide.categoryAr : currentSlide.categoryEn}
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                  {language === 'ar' ? currentSlide.titleAr : currentSlide.titleEn}
                </h3>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2 max-w-xl">
                  {language === 'ar' ? currentSlide.descAr : currentSlide.descEn}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => scrollTo(currentSlide.targetSection)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-red-700 hover:bg-red-800 text-white font-bold text-xs rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  <span>{language === 'ar' ? 'التفاصيل الهندسية' : 'Engineering Scope'}</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => scrollTo('contact')}
                  className="inline-flex items-center gap-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-lg border border-slate-300 transition-colors cursor-pointer"
                >
                  <span>{language === 'ar' ? 'طلب عرض أسعار' : 'Request Quotation'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar Line */}
      <div className="w-full h-1 bg-slate-100 overflow-hidden">
        <div
          className="h-full bg-red-700 transition-all duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Quick Select Category Tabs Strip Below Image */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-2 min-w-max">
          {heroSlides.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={slide.id}
                onClick={() => goToSlide(idx)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-red-700 text-white shadow-xs'
                    : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-200'
                }`}
              >
                {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />}
                <span>
                  {language === 'ar'
                    ? slide.id === 'construction'
                      ? 'الإنشاءات والمقاولات'
                      : slide.id === 'waterproofing'
                      ? 'العزل المائي'
                      : slide.id === 'epoxy'
                      ? 'أرضيات الإيبوكسي'
                      : slide.id === 'insulation'
                      ? 'العزل الحراري والفوم'
                      : slide.id === 'lining'
                      ? 'تبطين GRP و HDPE'
                      : 'توريد المواد والردم'
                    : slide.id === 'construction'
                    ? 'Construction'
                    : slide.id === 'waterproofing'
                    ? 'Waterproofing'
                    : slide.id === 'epoxy'
                    ? 'Epoxy Flooring'
                    : slide.id === 'insulation'
                    ? 'Thermal Foam'
                    : slide.id === 'lining'
                    ? 'GRP Lining'
                    : 'Materials Supply'}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
