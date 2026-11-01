import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { projectsData } from '../data/projectsData';
import { ProjectItem } from '../types';
import { MapPin, Info, CheckCircle, ExternalLink, X, ArrowRight, ArrowLeft } from 'lucide-react';

interface ProjectsSectionProps {
  onRequestQuoteWithProject: (projectTitle: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onRequestQuoteWithProject,
}) => {
  const { t, language, dir } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'waterproofing' | 'insulation' | 'flooring' | 'lining' | 'concrete'>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const categories = [
    { id: 'all', label: t.projects.filterAll },
    { id: 'waterproofing', label: t.projects.filterWaterproofing },
    { id: 'insulation', label: t.projects.filterInsulation },
    { id: 'flooring', label: t.projects.filterFlooring },
    { id: 'lining', label: t.projects.filterLining },
  ];

  const filtered = projectsData.filter((p) => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  return (
    <section id="projects" className="py-20 bg-white text-slate-900 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-red-700 mb-2">
            <span className="w-6 h-0.5 bg-red-700" />
            <span>{t.projects.kicker}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            {t.projects.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            {t.projects.subtitle}
          </p>
        </div>

        {/* Clear Demonstration Content Notice per user instructions */}
        <div className="mb-8 p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5 shadow-xs">
          <Info className="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
          <span>{t.projects.disclaimer}</span>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 mb-10 bg-slate-200/70 p-1.5 rounded-xl border border-slate-200 w-fit">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as any)}
              className={`py-2 px-4 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                filter === cat.id
                  ? 'bg-red-700 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((proj) => {
            const title = language === 'ar' ? proj.titleAr : proj.titleEn;
            const categoryLabel = language === 'ar' ? proj.categoryLabelAr : proj.categoryLabelEn;
            const location = language === 'ar' ? proj.locationAr : proj.locationEn;
            const scope = language === 'ar' ? proj.scopeAr : proj.scopeEn;
            const status = language === 'ar' ? proj.statusAr : proj.statusEn;

            return (
              <div
                key={proj.id}
                className="group flex flex-col justify-between bg-slate-50/70 rounded-2xl overflow-hidden border border-slate-200/90 hover:border-red-700/60 hover:shadow-xl transition-all duration-200"
              >
                <div>
                  {/* Image container with subtle hover zoom */}
                  <div className="relative h-52 overflow-hidden bg-slate-950">
                    <img
                      src={proj.image}
                      alt={title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    
                    {/* Status & Category overlay */}
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded border border-slate-700/60">
                        {categoryLabel}
                      </span>
                      <span className="text-[10px] font-bold text-white bg-red-700/90 backdrop-blur-md px-2.5 py-1 rounded">
                        {status}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
                      <MapPin className="w-3.5 h-3.5 text-red-700 shrink-0" />
                      <span>{location}</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-red-700 transition-colors mb-2 leading-snug">
                      {title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      {scope}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-slate-200/60 flex items-center gap-2">
                  <button
                    onClick={() => onRequestQuoteWithProject(title)}
                    className="flex-1 py-2.5 px-3 bg-red-700 hover:bg-red-800 text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all text-center cursor-pointer active:scale-[0.98]"
                  >
                    {language === 'ar' ? 'طلب تسعير مماثل' : 'Inquire for Similar Project'}
                  </button>

                  <button
                    onClick={() => setSelectedProject(proj)}
                    className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer border border-slate-200"
                    title={language === 'ar' ? 'تفاصيل المشروع' : 'View Project Details'}
                  >
                    <ArrowIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
        >
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden text-neutral-900">
            {/* Modal Image Header */}
            <div className="relative h-64 bg-neutral-950">
              <img
                src={selectedProject.image}
                alt={selectedProject.titleEn}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 text-white bg-black/50 hover:bg-black/80 rounded-full transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 inset-x-6 text-white">
                <span className="text-[11px] font-bold uppercase tracking-wider text-red-400 bg-black/40 px-2 py-0.5 rounded">
                  {language === 'ar' ? selectedProject.categoryLabelAr : selectedProject.categoryLabelEn}
                </span>
                <h3 className="text-xl font-bold mt-1.5">
                  {language === 'ar' ? selectedProject.titleAr : selectedProject.titleEn}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 text-sm text-neutral-700">
              <div className="flex items-center gap-2 text-neutral-500 text-xs">
                <MapPin className="w-4 h-4 text-red-600" />
                <span>{language === 'ar' ? selectedProject.locationAr : selectedProject.locationEn}</span>
                <span>·</span>
                <span className="font-semibold text-neutral-800">
                  {language === 'ar' ? selectedProject.statusAr : selectedProject.statusEn}
                </span>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-1.5">
                  {language === 'ar' ? 'نطاق العمل الفني المنفذ:' : 'Technical Scope of Execution:'}
                </h4>
                <p className="leading-relaxed">
                  {language === 'ar' ? selectedProject.scopeAr : selectedProject.scopeEn}
                </p>
              </div>

              <div className="p-3 bg-stone-100 rounded-lg text-xs text-neutral-600">
                {language === 'ar'
                  ? 'هذا المشروع يمثل نموذجاً معيارياً لقدرات الشركة الفنية. تتوفر تقارير الإنجاز التفصيلية لعملاء المشروعات المعتمدين.'
                  : 'This reference represents standard KRCC engineering execution. Full methodology dossiers are provided during formal tender submittals.'}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg hover:bg-slate-300 transition-colors cursor-pointer"
              >
                {language === 'ar' ? 'إغلاق' : 'Close'}
              </button>
              <button
                onClick={() => {
                  const pTitle = language === 'ar' ? selectedProject.titleAr : selectedProject.titleEn;
                  setSelectedProject(null);
                  onRequestQuoteWithProject(pTitle);
                }}
                className="px-5 py-2 bg-red-700 hover:bg-red-800 text-white text-xs font-bold rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                {language === 'ar' ? 'طلب تسعير مماثل لهذا المشروع' : 'Request Quotation for Similar Scope'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
