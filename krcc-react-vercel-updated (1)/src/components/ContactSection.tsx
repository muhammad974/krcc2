import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { servicesData, serviceDivisions } from '../data/servicesData';
import { materialCategories } from '../data/materialsData';
import { QuoteFormData } from '../types';
import {
  Phone,
  Globe,
  Mail,
  MapPin,
  Send,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Building,
  Calendar,
  Layers,
} from 'lucide-react';

interface ContactSectionProps {
  initialService?: string;
  initialMaterial?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialService = '',
  initialMaterial = '',
}) => {
  const { t, language } = useLanguage();

  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    companyName: '',
    phone: '',
    email: '',
    serviceCategory: initialService,
    materialCategory: initialMaterial,
    projectLocation: '',
    projectArea: '',
    projectDetails: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Update when prop changes
  React.useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, serviceCategory: initialService }));
    }
  }, [initialService]);

  React.useEffect(() => {
    if (initialMaterial) {
      setFormData((prev) => ({ ...prev, materialCategory: initialMaterial }));
    }
  }, [initialMaterial]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.email.trim() || !formData.projectDetails.trim()) {
      setErrorMessage(t.contact.validationError);
      return;
    }

    setIsSubmitting(true);
    // Simulate real enterprise dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      companyName: '',
      phone: '',
      email: '',
      serviceCategory: '',
      materialCategory: '',
      projectLocation: '',
      projectArea: '',
      projectDetails: '',
    });
    setSubmitted(false);
    setErrorMessage('');
  };

  const generateWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Hello KRCC Team, I would like to request an engineering quotation:\n` +
      `Name: ${formData.fullName || 'Client'}\n` +
      `Company: ${formData.companyName || 'N/A'}\n` +
      `Service: ${formData.serviceCategory || 'Contracting Services'}\n` +
      `Material: ${formData.materialCategory || 'N/A'}\n` +
      `Location: ${formData.projectLocation || 'Saudi Arabia'}\n` +
      `Details: ${formData.projectDetails || 'Please contact me regarding project specifications.'}`
    );
    return `https://wa.me/966530362363?text=${text}`;
  };

  return (
    <section id="contact" className="py-20 bg-slate-50 text-slate-900 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-red-700 mb-2">
            <span className="w-6 h-0.5 bg-red-700" />
            <span>{t.contact.kicker}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            {t.contact.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Official Contact Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white text-slate-900 rounded-2xl p-7 shadow-sm border-t-4 border-red-700 border border-slate-200 space-y-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-red-700">
                  {language === 'ar' ? 'البيانات الرسمية المعتمدة' : 'OFFICIAL CONTACT DIRECTORY'}
                </span>
                <h3 className="text-xl font-black mt-1 text-slate-900">
                  {language === 'ar'
                    ? 'شركة خبير الرائدة للمقاولات'
                    : 'KHABEER AL RAIDA CONTRACTING COMPANY'}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {t.company.slogan}
                </p>
              </div>

              <div className="space-y-4 pt-2 border-t border-slate-200 text-sm">
                {/* Phones */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-red-50 text-red-700 shrink-0 mt-0.5 border border-red-200/60">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 block mb-0.5">
                      {t.contact.phoneTitle}
                    </span>
                    <div className="flex flex-col gap-1">
                      <a
                        href="tel:+966530362363"
                        className="font-bold text-slate-900 hover:text-red-700 transition-colors text-base"
                        dir="ltr"
                      >
                        +966 53 036 2363
                      </a>
                    </div>
                  </div>
                </div>

                {/* Website */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-red-50 text-red-700 shrink-0 mt-0.5 border border-red-200/60">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 block mb-0.5">
                      {t.contact.websiteTitle}
                    </span>
                    <a
                      href={t.company.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-red-700 hover:text-red-800 transition-colors text-base inline-flex items-center gap-1"
                    >
                      <span>{t.company.website}</span>
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-red-50 text-red-700 shrink-0 mt-0.5 border border-red-200/60">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 block mb-0.5">
                      {t.contact.emailTitle}
                    </span>
                    <a
                      href={`mailto:${t.company.email}`}
                      className="font-semibold text-slate-800 hover:text-red-700 transition-colors text-sm break-all"
                    >
                      {t.company.email}
                    </a>
                    </div>
                </div>

                {/* Headquarters / Region */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-red-50 text-red-700 shrink-0 mt-0.5 border border-red-200/60">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 block mb-0.5">
                      {t.contact.addressTitle}
                    </span>
                    <span className="text-sm text-slate-700">
                      {t.contact.addressValue}
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Action Button */}
              <div className="pt-4 border-t border-slate-200">
                <a
                  href="https://wa.me/966530362363"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-xs transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{t.contact.btnWhatsApp}</span>
                </a>
              </div>
            </div>

            {/* Quick Assurance Box */}
            <div className="p-5 rounded-xl bg-white border border-slate-200/90 text-slate-700 space-y-2 text-xs shadow-xs">
              <span className="font-bold text-slate-900 block text-sm">
                {language === 'ar' ? 'معايير تقديم عروض الأسعار:' : 'Quotation Review Protocol:'}
              </span>
              <p className="text-slate-600">
                {language === 'ar'
                  ? 'يتم تسليم عروض الأسعار والدراسات الفنية بناءً على المخططات الإنشائية وجداول الكميات (BOQ) وفحوصات الموقع في غضون ٢٤ - ٤٨ ساعة عمل.'
                  : 'Commercial tenders and engineering submittals are prepared following review of architectural drawings, BOQ, and site condition parameters within 24–48 business hours.'}
              </p>
            </div>
          </div>

          {/* Right Column: Full Quotation & Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-stone-200">
              {submitted ? (
                <div className="text-center py-10 space-y-4 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-neutral-900">
                    {t.contact.successTitle}
                  </h3>
                  <p className="text-neutral-600 max-w-md mx-auto text-sm leading-relaxed">
                    {t.contact.successMessage}
                  </p>
                  
                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 max-w-sm mx-auto text-xs text-neutral-600 space-y-1 text-start">
                    <div><strong>{language === 'ar' ? 'الاسم:' : 'Name:'}</strong> {formData.fullName}</div>
                    <div><strong>{language === 'ar' ? 'الهاتف:' : 'Phone:'}</strong> {formData.phone}</div>
                    {formData.serviceCategory && <div><strong>{language === 'ar' ? 'الخدمة:' : 'Service:'}</strong> {formData.serviceCategory}</div>}
                    {formData.materialCategory && <div><strong>{language === 'ar' ? 'المادة:' : 'Material:'}</strong> {formData.materialCategory}</div>}
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                    <a
                      href={generateWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{language === 'ar' ? 'إرسال نسخة عبر واتساب' : 'Forward Details to WhatsApp'}</span>
                    </a>
                    <button
                      onClick={resetForm}
                      className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      {language === 'ar' ? 'إرسال طلب آخر' : 'Submit Another Request'}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900">
                      {t.contact.formTitle}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1">
                      {t.contact.formDesc}
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        {t.contact.fieldFullName}
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder={language === 'ar' ? 'الاسم الكامل أو المسؤول' : 'Eng. Mohammed / Project Manager'}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-red-600 text-sm bg-stone-50/50"
                      />
                    </div>

                    {/* Company Name */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        {t.contact.fieldCompany}
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder={language === 'ar' ? 'اسم شركة المقاولات / المطور' : 'Contracting Co. / Developer'}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-red-600 text-sm bg-stone-50/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        {t.contact.fieldPhone}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        dir="ltr"
                        placeholder="+966 5X XXX XXXX"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-red-600 text-sm bg-stone-50/50"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        {t.contact.fieldEmail}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        dir="ltr"
                        placeholder="engineer@company.com"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-red-600 text-sm bg-stone-50/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Service Category Dropdown */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        {t.contact.fieldService}
                      </label>
                      <select
                        name="serviceCategory"
                        value={formData.serviceCategory}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-red-600 text-xs sm:text-sm bg-stone-50/50 text-neutral-800"
                      >
                        <option value="">{t.contact.selectServicePlaceholder}</option>
                        {serviceDivisions.map((div) => {
                          const divTitle = `${div.numberPrefix}. ${language === 'ar' ? div.titleAr : div.titleEn}`;
                          const subServices = servicesData.filter((s) => s.divisionId === div.id);
                          return (
                            <optgroup key={div.id} label={divTitle}>
                              <option value={language === 'ar' ? `القطاع الكامل: ${div.titleAr}` : `Full Division: ${div.titleEn}`}>
                                {language === 'ar' ? `★ حزمة القطاع الكاملة (${div.titleAr})` : `★ Complete Division Package (${div.titleEn})`}
                              </option>
                              {subServices.map((s) => (
                                <option
                                  key={s.id}
                                  value={language === 'ar' ? s.titleAr : s.titleEn}
                                >
                                  {language === 'ar' ? s.titleAr : s.titleEn}
                                </option>
                              ))}
                            </optgroup>
                          );
                        })}
                      </select>
                    </div>

                    {/* Material Supply Dropdown */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        {t.contact.fieldMaterial}
                      </label>
                      <select
                        name="materialCategory"
                        value={formData.materialCategory}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-red-600 text-xs sm:text-sm bg-stone-50/50 text-neutral-800"
                      >
                        <option value="">{t.contact.selectMaterialPlaceholder}</option>
                        {materialCategories.map((m) => (
                          <option
                            key={m.id}
                            value={language === 'ar' ? m.titleAr : m.titleEn}
                          >
                            {language === 'ar' ? m.titleAr : m.titleEn}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Project Location */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        {t.contact.fieldLocation}
                      </label>
                      <input
                        type="text"
                        name="projectLocation"
                        value={formData.projectLocation}
                        onChange={handleChange}
                        placeholder={t.contact.locationPlaceholder}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-red-600 text-sm bg-stone-50/50"
                      />
                    </div>

                    {/* Approximate Area */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        {t.contact.fieldArea}
                      </label>
                      <input
                        type="text"
                        name="projectArea"
                        value={formData.projectArea}
                        onChange={handleChange}
                        placeholder={language === 'ar' ? 'مثال: ٥٠٠٠ م٢' : 'e.g., 2,500 m²'}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-red-600 text-sm bg-stone-50/50"
                      />
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      {t.contact.fieldDetails}
                    </label>
                    <textarea
                      name="projectDetails"
                      rows={4}
                      value={formData.projectDetails}
                      onChange={handleChange}
                      required
                      placeholder={t.contact.detailsPlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-red-600 text-sm bg-stone-50/50 leading-relaxed"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-4 bg-red-700 hover:bg-red-800 text-white font-black text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 active:scale-[0.98]"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? t.contact.btnSubmitting : t.contact.btnSubmit}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
