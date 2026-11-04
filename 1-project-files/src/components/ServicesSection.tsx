import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { serviceDivisions, servicesData } from '../data/servicesData';
import { ServiceDivision, ServiceItem } from '../types';
import {
  Flame,
  Layers,
  ShieldCheck,
  Sun,
  Sparkles,
  Wind,
  Droplet,
  Droplets,
  Building2,
  Compass,
  Shield,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  X,
  FileQuestion,
  Wrench,
  Zap,
  Activity,
  Cpu,
  Server,
  Radio,
  Lock,
  Truck,
  Box,
  Layout,
  Maximize2,
  Search,
  Filter,
  Check,
} from 'lucide-react';

interface ServicesSectionProps {
  onRequestQuoteWithService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onRequestQuoteWithService,
}) => {
  const { t, language, dir } = useLanguage();
  const [selectedDivisionId, setSelectedDivisionId] = useState<string>('waterproofing');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const getDivisionIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return ShieldCheck;
      case 'Wrench':
        return Wrench;
      case 'Building2':
        return Building2;
      case 'Zap':
        return Zap;
      case 'Sun':
        return Sun;
      case 'Layers':
        return Layers;
      case 'Truck':
        return Truck;
      case 'Box':
        return Box;
      case 'Cpu':
        return Cpu;
      default:
        return Building2;
    }
  };

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame':
        return Flame;
      case 'Layers':
        return Layers;
      case 'ShieldCheck':
        return ShieldCheck;
      case 'Sun':
        return Sun;
      case 'Sparkles':
        return Sparkles;
      case 'Wind':
        return Wind;
      case 'Droplet':
      case 'Droplets':
        return Droplet;
      case 'Building2':
        return Building2;
      case 'Compass':
        return Compass;
      case 'Shield':
        return Shield;
      case 'ShieldAlert':
        return ShieldAlert;
      case 'Wrench':
        return Wrench;
      case 'Zap':
        return Zap;
      case 'Activity':
        return Activity;
      case 'Cpu':
        return Cpu;
      case 'Server':
        return Server;
      case 'Radio':
        return Radio;
      case 'Lock':
        return Lock;
      case 'Truck':
        return Truck;
      case 'Box':
        return Box;
      case 'Layout':
        return Layout;
      case 'Maximize2':
        return Maximize2;
      default:
        return CheckCircle2;
    }
  };

  // Filter services by active division & search query
  const filteredServices = useMemo(() => {
    return servicesData.filter((service) => {
      const matchesDivision =
        selectedDivisionId === 'all' || service.divisionId === selectedDivisionId;

      if (!searchQuery.trim()) return matchesDivision;

      const q = searchQuery.toLowerCase().trim();
      const title = (language === 'ar' ? service.titleAr : service.titleEn).toLowerCase();
      const desc = (language === 'ar' ? service.shortDescAr : service.shortDescEn).toLowerCase();
      const apps = (
        language === 'ar' ? service.applicationsAr : service.applicationsEn
      ).join(' ').toLowerCase();

      const matchesSearch = title.includes(q) || desc.includes(q) || apps.includes(q);
      return (selectedDivisionId === 'all' || matchesDivision) && matchesSearch;
    });
  }, [selectedDivisionId, searchQuery, language]);

  const activeDivision = useMemo(() => {
    return serviceDivisions.find((d) => d.id === selectedDivisionId) || serviceDivisions[0];
  }, [selectedDivisionId]);

  const scrollToContact = (customService?: string) => {
    if (customService) {
      onRequestQuoteWithService(customService);
    }
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-20 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-red-700 mb-2">
              <span className="w-6 h-0.5 bg-red-700" />
              <span>{language === 'ar' ? 'قطاعات الأعمال والخدمات الهندسية' : 'Engineering Divisions & Specialized Services'}</span>
              <span>·</span>
              <span className="text-slate-500 font-semibold">
                {language === 'ar' ? '٨ قطاعات رئيسية' : '8 Core Divisions'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
              {language === 'ar'
                ? '٨ قطاعات إنشائية وهندسية متكاملة'
                : '8 Integrated Engineering & Contracting Divisions'}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 max-w-2xl leading-relaxed">
              {language === 'ar'
                ? 'اختر القطاع الهندسي المطلوب للانتقال الفوري إلى كافة خدماته ومواصفاته الفنية المعتمدة، مع إمكانية طلب التسعير المباشر لكل تخصص.'
                : 'Select your required engineering division below to immediately explore certified technical disciplines, method statements, and request customized submittals.'}
            </p>
          </div>

          {/* Search bar inside services */}
          <div className="shrink-0 w-full md:w-72">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'ar' ? 'ابحث في الخدمات والمواصفات...' : 'Search disciplines & specs...'}
                className="w-full pl-9 pr-9 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white shadow-2xs transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 8-Division Interactive Navigation Bar / Pills */}
        <div className="mb-8">
          <div className="flex items-center justify-between pb-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-red-700" />
              <span>{language === 'ar' ? 'انتقل إلى القطاع المطلوب (٨ قطاعات):' : 'Browse By Division (8 Categories):'}</span>
            </span>
            <button
              onClick={() => setSelectedDivisionId('all')}
              className={`text-xs font-bold px-3 py-1 rounded-lg cursor-pointer transition-colors ${
                selectedDivisionId === 'all'
                  ? 'bg-red-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200'
              }`}
            >
              {language === 'ar' ? 'عرض جميع الخدمات (٥٠ خدمة)' : 'View All Disciplines (50)'}
            </button>
          </div>

          {/* 8 Division Buttons Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-2.5">
            {serviceDivisions.map((div) => {
              const Icon = getDivisionIcon(div.iconName);
              const isSelected = selectedDivisionId === div.id;
              const title = language === 'ar' ? div.titleAr : div.titleEn;

              return (
                <button
                  key={div.id}
                  onClick={() => {
                    setSelectedDivisionId(div.id);
                    setSearchQuery('');
                  }}
                  className={`flex items-start gap-2.5 p-3 rounded-xl border text-start transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-red-700 text-white border-red-700 shadow-md ring-2 ring-red-700/20'
                      : 'bg-slate-50 hover:bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg shrink-0 ${
                      isSelected
                        ? 'bg-white/15 text-white'
                        : 'bg-white text-red-700 border border-slate-200 shadow-2xs'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span
                      className={`text-[10px] font-extrabold tracking-wider uppercase block ${
                        isSelected ? 'text-red-100' : 'text-slate-400'
                      }`}
                    >
                      {div.numberPrefix}
                    </span>
                    <h3
                      className={`text-xs font-bold leading-tight line-clamp-2 ${
                        isSelected ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {title}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Division Spotlight Header Banner (When a single division is chosen) */}
        {selectedDivisionId !== 'all' && (
          <div className="mb-10 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-50 via-white to-slate-100 border border-slate-200 shadow-xs text-slate-900">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-red-700 text-white font-extrabold text-[10px] tracking-wider uppercase">
                    {language === 'ar' ? `القطاع رقم ${activeDivision.numberPrefix}` : `DIVISION ${activeDivision.numberPrefix}`}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200 font-bold text-[10px] uppercase">
                    {language === 'ar' ? activeDivision.badgeAr : activeDivision.badgeEn}
                  </span>
                  {activeDivision.standardsEn && (
                    <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {language === 'ar' ? activeDivision.standardsAr : activeDivision.standardsEn}
                    </span>
                  )}
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {language === 'ar' ? activeDivision.titleAr : activeDivision.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {language === 'ar' ? activeDivision.shortDescAr : activeDivision.shortDescEn}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() =>
                    scrollToContact(
                      language === 'ar' ? activeDivision.titleAr : activeDivision.titleEn
                    )
                  }
                  className="inline-flex items-center gap-2 px-5 py-3 bg-red-700 hover:bg-red-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <span>{language === 'ar' ? 'طلب تسعير لهذا القطاع' : 'Request Division Quotation'}</span>
                  <ArrowIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Services Grid Display */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 p-8">
            <Search className="w-8 h-8 text-slate-400 mx-auto mb-3" />
            <h4 className="text-sm font-bold text-slate-800 mb-1">
              {language === 'ar' ? 'لم يتم العثور على خدمات مطابقة' : 'No matching disciplines found'}
            </h4>
            <p className="text-xs text-slate-500 mb-4">
              {language === 'ar'
                ? 'جرب البحث بكلمة أخرى أو تصفح كل القطاعات الثمانية'
                : 'Try searching with different keywords or switch division tabs.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDivisionId('all');
              }}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded-lg cursor-pointer"
            >
              {language === 'ar' ? 'إعادة ضبط البحث' : 'Reset Search'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => {
              const Icon = getServiceIcon(service.iconName);
              const title = language === 'ar' ? service.titleAr : service.titleEn;
              const shortDesc = language === 'ar' ? service.shortDescAr : service.shortDescEn;
              const badge = language === 'ar' ? service.badgeAr : service.badgeEn;
              const specs = language === 'ar' ? service.specsAr : service.specsEn;

              // Find associated division
              const parentDiv = serviceDivisions.find((d) => d.id === service.divisionId);

              return (
                <div
                  key={service.id}
                  className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white border border-slate-200 hover:border-red-700/60 hover:shadow-xl transition-all duration-200"
                >
                  <div>
                    {/* Card Top Strip: Category Badge & Icon */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="p-3 rounded-xl bg-slate-100 text-red-700 group-hover:bg-red-700 group-hover:text-white transition-colors duration-200 shadow-2xs border border-slate-200 group-hover:border-red-700">
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        {badge && (
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-700 bg-red-50 border border-red-200/60 px-2.5 py-0.5 rounded-full">
                            {badge}
                          </span>
                        )}
                        {parentDiv && selectedDivisionId === 'all' && (
                          <span className="text-[9px] font-bold text-slate-500 uppercase">
                            {parentDiv.numberPrefix} · {language === 'ar' ? parentDiv.titleAr : parentDiv.titleEn}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <h4 className="text-base font-extrabold text-slate-900 leading-snug mb-2 group-hover:text-red-700 transition-colors">
                      {title}
                    </h4>

                    {/* Short Description */}
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {shortDesc}
                    </p>

                    {/* Technical Specs Preview Pills */}
                    {specs && specs.length > 0 && (
                      <div className="space-y-1 mb-4 pt-3 border-t border-slate-100">
                        {specs.slice(0, 2).map((sp, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                            <Check className="w-3 h-3 text-red-600 shrink-0" />
                            <span className="truncate">{sp}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Action Footer */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 mt-2">
                    <button
                      onClick={() => setSelectedService(service)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-red-700 hover:text-red-800 transition-colors cursor-pointer group-hover:underline"
                    >
                      <span>{language === 'ar' ? 'المواصفة ونطاق العمل' : 'Technical Scope'}</span>
                      <ArrowIcon className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => scrollToContact(title)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-semibold border border-slate-200 transition-colors cursor-pointer"
                    >
                      {language === 'ar' ? 'تسعير' : 'Quote'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Technical Submittals Notice - Clean Light Palette */}
        <div className="mt-12 p-5 rounded-2xl bg-slate-50 text-slate-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-200 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-red-700 shrink-0 shadow-2xs">
              <FileQuestion className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-0.5">
                {language === 'ar'
                  ? 'هل تحتاج إلى اعتماد مواد محددة أو مخططات تنفيذية معتمدة؟'
                  : 'Need project-specific submittals, material compliance sheets, or method statements?'}
              </h4>
              <p className="text-slate-600">
                {language === 'ar'
                  ? 'مهندسونا في القطاعات الثمانية على أتم الاستعداد لتقديم المخططات التنفيذية والاعتمادات الرسمية فوراً.'
                  : 'Our engineering estimation teams across all 8 divisions are prepared to provide method statements and certified BOQ reviews.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => scrollToContact('General Technical Submittal Inquiry')}
            className="px-5 py-2.5 bg-red-700 hover:bg-red-800 text-white font-bold rounded-xl shrink-0 text-xs cursor-pointer shadow-xs transition-colors"
          >
            {language === 'ar' ? 'طلب استشارة فنية شاملة' : 'Request Technical Consultation'}
          </button>
        </div>
      </div>

      {/* Deep Technical Scope & Specification Modal */}
      {selectedService && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
        >
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900">
            {/* Modal Header */}
            <div className="bg-slate-50 text-slate-900 p-6 border-b-2 border-red-700 flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-red-700 block">
                  {language === 'ar' ? 'المواصفة ونطاق العمل الهندسي' : 'TECHNICAL SCOPE & SPECIFICATION'}
                </span>
                <h3 className="text-xl font-black mt-1 text-slate-900">
                  {language === 'ar' ? selectedService.titleAr : selectedService.titleEn}
                </h3>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 text-sm text-slate-700 max-h-[70vh] overflow-y-auto">
              {/* Comprehensive Description */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                  {language === 'ar' ? 'الوصف الهندسي الشامل ونطاق التنفيذ' : 'Comprehensive Engineering Description & Scope'}
                </h4>
                <p className="leading-relaxed text-slate-700 text-xs sm:text-sm">
                  {language === 'ar' ? selectedService.fullDescAr : selectedService.fullDescEn}
                </p>
              </div>

              {/* Technical Specifications */}
              {selectedService.specsEn && selectedService.specsEn.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2.5">
                    {language === 'ar' ? 'المعايير والمواصفات الفنية' : 'Technical Specifications & Parameters'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {(language === 'ar' ? selectedService.specsAr! : selectedService.specsEn!).map((spec, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800">
                        <Check className="w-3.5 h-3.5 text-red-700 shrink-0" />
                        <span className="font-semibold">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Applications */}
              {selectedService.applicationsEn && selectedService.applicationsEn.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2.5">
                    {language === 'ar' ? 'مجالات التطبيق والاستخدام المعتمدة' : 'Typical Project Applications'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {(language === 'ar' ? selectedService.applicationsAr : selectedService.applicationsEn).map(
                      (app, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200/70 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-red-700 shrink-0" />
                          <span>{app}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Notice */}
              <div className="p-3.5 bg-red-50/60 border border-red-200/60 rounded-xl text-xs text-slate-800 space-y-1">
                <span className="font-bold text-red-700 block">
                  {language === 'ar' ? 'الاعتمادات والمواصفات القياسية:' : 'Standard Compliance Note:'}
                </span>
                <p>
                  {language === 'ar'
                    ? 'يتم إعداد جداول الكميات (BOQ)، المخططات التنفيذية، وشهادات مطابقة المواد طبقاً لاشتراطات كود البناء السعودي والمواصفات المعتمدة لكل مشروع.'
                    : 'Method statements, material submittals, and BOQ items are engineered per Saudi Building Code (SBC) criteria and client consultant requirements.'}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg hover:bg-slate-300 transition-colors cursor-pointer"
              >
                {language === 'ar' ? 'إغلاق' : 'Close'}
              </button>
              <button
                onClick={() => {
                  const sTitle = language === 'ar' ? selectedService.titleAr : selectedService.titleEn;
                  setSelectedService(null);
                  scrollToContact(sTitle);
                }}
                className="px-5 py-2.5 bg-red-700 hover:bg-red-800 text-white text-xs font-bold rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                {language === 'ar' ? 'طلب تسعير هذه الخدمة' : 'Request Quote for this Discipline'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
