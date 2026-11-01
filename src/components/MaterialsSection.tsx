import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { materialCategories } from '../data/materialsData';
import { MaterialCategory } from '../types';
import { CheckCircle2, Truck, ShieldCheck, Mountain, Layers, FileSpreadsheet, ArrowRight, ArrowLeft } from 'lucide-react';
import materialsYardImg from '../assets/images/krcc_materials_yard_1792866478729.jpg';

interface MaterialsSectionProps {
  onRequestQuoteWithMaterial: (materialTitle: string) => void;
}

export const MaterialsSection: React.FC<MaterialsSectionProps> = ({
  onRequestQuoteWithMaterial,
}) => {
  const { t, language, dir } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'waterproofing' | 'earthwork'>('all');
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const filteredMaterials = materialCategories.filter((m) => {
    if (activeTab === 'all') return true;
    return m.type === activeTab;
  });

  return (
    <section id="materials" className="py-20 bg-slate-50 text-slate-900 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-red-700 mb-2">
            <span className="w-6 h-0.5 bg-red-700" />
            <span>{t.materials.kicker}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            {t.materials.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            {t.materials.subtitle}
          </p>
        </div>

        {/* Feature Yard Banner - Clean Bright Corporate Design */}
        <div className="mb-12 relative rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 h-64 sm:h-80 lg:h-full relative overflow-hidden">
              <img
                src={materialsYardImg}
                alt="KRCC Construction Material Supply Depot and Aggregate Fleet in Saudi Arabia"
                className="w-full h-full object-cover object-center filter brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-white/80 via-transparent to-transparent" />
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 text-slate-900 space-y-4 bg-slate-50/90 border-t lg:border-t-0 lg:border-s border-slate-200">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-50 text-red-700 text-xs font-bold uppercase tracking-wider border border-red-200">
                <Truck className="w-4 h-4 text-red-700" />
                <span>{language === 'ar' ? 'سلسلة إمداد ولوجستيات' : 'SUPPLY CHAIN & HAULAGE'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black leading-snug text-slate-900">
                {language === 'ar'
                  ? 'توريد مواد العزل والأعمال الترابية المعتمدة'
                  : 'Certified Waterproofing & Geological Earthwork Supply'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {language === 'ar'
                  ? 'نضمن توريد وتوصيل رمال الكثبان النظيفة، والركام، والكرش، وطبقات الصب بيس مع كامل شهادات الاختبارات المعملية المعتمدة لدى الاستشاريين.'
                  : 'Direct delivery of clean dune sand, crushed stone, aggregates, and sub-base grades directly to civil, industrial, and infrastructure sites across the Kingdom.'}
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs text-slate-700">
                <span className="px-2.5 py-1 bg-white rounded border border-slate-200 shadow-xs font-medium">
                  {language === 'ar' ? 'رمال الكثبان (Dune Sand)' : 'Dune Sand'}
                </span>
                <span className="px-2.5 py-1 bg-white rounded border border-slate-200 shadow-xs font-medium">
                  {language === 'ar' ? 'الكرش (Crush Rock)' : 'Crushed Rock'}
                </span>
                <span className="px-2.5 py-1 bg-white rounded border border-slate-200 shadow-xs font-medium">
                  {language === 'ar' ? 'الركام المصنف (Aggregate)' : 'Graded Aggregate'}
                </span>
                <span className="px-2.5 py-1 bg-white rounded border border-slate-200 shadow-xs font-medium">
                  {language === 'ar' ? 'صب بيس (Sub-base)' : 'Sub-Base Class A/B'}
                </span>
                <span className="px-2.5 py-1 bg-white rounded border border-slate-200 shadow-xs font-medium">
                  {language === 'ar' ? 'صب جريد (Sub-grade)' : 'Sub-Grade Fill'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Filter Segment Control */}
        <div className="flex items-center gap-2 mb-8 bg-slate-200/70 p-1.5 rounded-xl max-w-md border border-slate-200">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-2 px-3 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-red-700 text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            {language === 'ar' ? 'جميع المواد الموردة' : 'All Materials'}
          </button>
          <button
            onClick={() => setActiveTab('waterproofing')}
            className={`flex-1 py-2 px-3 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'waterproofing'
                ? 'bg-red-700 text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            {language === 'ar' ? 'مواد العوازل والكيميائيات' : 'Waterproofing & Resins'}
          </button>
          <button
            onClick={() => setActiveTab('earthwork')}
            className={`flex-1 py-2 px-3 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'earthwork'
                ? 'bg-red-700 text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            {language === 'ar' ? 'الردم والركام (Earthwork)' : 'Earthwork & Backfilling'}
          </button>
        </div>

        {/* Material Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredMaterials.map((mat) => {
            const title = language === 'ar' ? mat.titleAr : mat.titleEn;
            const desc = language === 'ar' ? mat.descAr : mat.descEn;
            const items = language === 'ar' ? mat.itemsAr : mat.itemsEn;
            const tag = language === 'ar' ? mat.tagAr : mat.tagEn;
            const isEarthwork = mat.type === 'earthwork';

            return (
              <div
                key={mat.id}
                className="flex flex-col justify-between p-6 bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-red-700/60 transition-all duration-200"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-red-800 bg-red-50 px-2 py-0.5 rounded border border-red-200/60">
                      {tag}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {isEarthwork ? (
                        <span className="flex items-center gap-1">
                          <Mountain className="w-3.5 h-3.5 text-amber-600" />
                          <span>{language === 'ar' ? 'أعمال الردم' : 'Earthwork'}</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                          <span>{language === 'ar' ? 'عوازل كيميائية' : 'Coatings'}</span>
                        </span>
                      )}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {desc}
                  </p>

                  {/* Representative Supply Items */}
                  <div className="space-y-1.5 pt-3 border-t border-slate-100 mb-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      {language === 'ar' ? 'الأصناف المتوفرة للتوريد:' : 'Available Supply Configurations:'}
                    </span>
                    {items.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-700 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Request Material Quote CTA */}
                <button
                  onClick={() => onRequestQuoteWithMaterial(title)}
                  className="w-full py-2.5 px-3 bg-slate-100 hover:bg-red-700 text-slate-800 hover:text-white border border-slate-300 hover:border-red-700 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.98]"
                >
                  <span>{t.materials.btnQuote}</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Standards & Datasheet Editable Notice as per instructions */}
        <div className="p-4 rounded-xl bg-white border border-slate-200/90 text-slate-700 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2.5">
            <FileSpreadsheet className="w-4 h-4 text-red-700 shrink-0" />
            <span>
              {language === 'ar'
                ? 'تنويه: تتوفر النشرات الفنية المعتمدة (TDS)، وشهادات السلامة الكيميائية (MSDS)، وشهادات اختبارات الدمك للردميات عند الطلب والتوريد.'
                : 'Notice: Technical Data Sheets (TDS), MSDS, and certified sieve/compaction test results are provided with commercial orders.'}
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-semibold shrink-0">
            ASTM / MOT / SASO Standards Compliant
          </span>
        </div>
      </div>
    </section>
  );
};
