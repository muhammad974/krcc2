import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import './certificates.css';

type Lang = 'en' | 'ar';
type GroupId = 'standards' | 'government' | 'aramco' | 'manufacturers' | 'letters' | 'profile';
type FilterId = 'all' | GroupId;

interface L10n {
  en: string;
  ar: string;
}
interface Fact {
  label: L10n;
  value: L10n;
}
interface CertItem {
  id: string;
  group: GroupId;
  title: L10n;
  kind: L10n;
  issuer: L10n;
  /** ISO dates (YYYY-MM-DD) exactly as printed on the document (leave out when the document has none) */
  issued?: string;
  expires?: string;
  thumb: string;
  pages: string[];
  /** file offered by the Download button (PDF, or the image when no PDF exists) */
  file: string;
  wide?: boolean;
  /** width / height of a wide (landscape) page, so it is not cropped */
  ratio?: number;
  facts: Fact[];
}

const bi = (en: string, ar?: string): L10n => ({ en, ar: ar ?? en });
const BASE = '/assets/certificates';

const ISO_SCOPE = bi(
  'General contractor: construction and maintenance in civil, mechanical, electrical and instrumentation works, waterproofing, fire fighting and plumbing',
  'مقاول عام: أعمال الإنشاء والصيانة المدنية والميكانيكية والكهربائية وأنظمة القياس والتحكم، والعزل المائي، ومكافحة الحريق، والسباكة'
);
const ISO_ISSUER = bi('UMS Certifications, accredited by UAF', 'UMS Certifications، معتمدة من UAF');

/* ------------------------------------------------------------------ data
   To update a certificate later: replace its files in /public/assets/certificates
   and change the dates below - the "Valid until / Expired" label follows the date. */
const ITEMS: CertItem[] = [
  /* management system standards */
  {
    id: 'iso-9001',
    group: 'standards',
    title: bi('ISO 9001:2015', 'آيزو 9001:2015'),
    kind: bi('Quality management system', 'نظام إدارة الجودة'),
    issuer: ISO_ISSUER,
    issued: '2025-09-11',
    expires: '2028-09-10',
    thumb: `${BASE}/iso-9001-thumb.jpg`,
    pages: [`${BASE}/iso-9001.jpg`],
    file: `${BASE}/iso-9001.pdf`,
    facts: [
      { label: bi('Certificate no.', 'رقم الشهادة'), value: bi('UAF110991559') },
      { label: bi('Client ID', 'رقم العميل'), value: bi('KH389') },
      { label: bi('Scope', 'النطاق'), value: ISO_SCOPE },
    ],
  },
  {
    id: 'iso-14001',
    group: 'standards',
    title: bi('ISO 14001:2015', 'آيزو 14001:2015'),
    kind: bi('Environmental management system', 'نظام الإدارة البيئية'),
    issuer: ISO_ISSUER,
    issued: '2025-09-11',
    expires: '2028-09-10',
    thumb: `${BASE}/iso-14001-thumb.jpg`,
    pages: [`${BASE}/iso-14001.jpg`],
    file: `${BASE}/iso-14001.pdf`,
    facts: [
      { label: bi('Certificate no.', 'رقم الشهادة'), value: bi('UAF1109141560') },
      { label: bi('Client ID', 'رقم العميل'), value: bi('KH389') },
      { label: bi('Scope', 'النطاق'), value: ISO_SCOPE },
    ],
  },
  {
    id: 'iso-45001',
    group: 'standards',
    title: bi('ISO 45001:2018', 'آيزو 45001:2018'),
    kind: bi('Occupational health and safety', 'الصحة والسلامة المهنية'),
    issuer: ISO_ISSUER,
    issued: '2025-09-11',
    expires: '2028-09-10',
    thumb: `${BASE}/iso-45001-thumb.jpg`,
    pages: [`${BASE}/iso-45001.jpg`],
    file: `${BASE}/iso-45001.pdf`,
    facts: [
      { label: bi('Certificate no.', 'رقم الشهادة'), value: bi('UAF1109451561') },
      { label: bi('Client ID', 'رقم العميل'), value: bi('KH389') },
      { label: bi('Scope', 'النطاق'), value: ISO_SCOPE },
    ],
  },

  /* approvals and registrations */
  {
    id: 'aramco-approval',
    group: 'aramco',
    title: bi('Saudi Aramco registration', 'تسجيل أرامكو السعودية'),
    kind: bi('Registration approval letter', 'خطاب اعتماد التسجيل'),
    issuer: bi('Saudi Aramco, Supplier Registration Unit', 'أرامكو السعودية، وحدة تسجيل الموردين'),
    issued: '2023-04-17',
    thumb: `${BASE}/aramco-approval-thumb.jpg`,
    pages: [`${BASE}/aramco-approval.jpg`],
    file: `${BASE}/aramco-approval.pdf`,
    facts: [
      { label: bi('Vendor code', 'رمز المورد'), value: bi('10110264') },
      { label: bi('E-reference no.', 'الرقم المرجعي'), value: bi('0006405') },
      { label: bi('Supplier type', 'نوع المورد'), value: bi('Service provider only', 'مزوّد خدمات فقط') },
    ],
  },
  {
    id: 'classification',
    group: 'government',
    title: bi('Municipal services classification', 'تصنيف مقدمي خدمات المدن'),
    kind: bi('Grade 3, construction and building', 'الدرجة الثالثة، التشييد والبناء'),
    issuer: bi('Ministry of Municipalities and Housing (Balady)', 'وزارة البلديات والإسكان (بلدي)'),
    issued: '2024-01-13',
    expires: '2026-01-13',
    thumb: `${BASE}/classification-thumb.jpg`,
    pages: [1, 2, 3, 4, 5, 6].map((n) => `${BASE}/classification-${n}.jpg`),
    file: `${BASE}/classification.pdf`,
    wide: true,
    ratio: 1.414,
    facts: [
      { label: bi('Certificate no.', 'رقم الشهادة'), value: bi('2024000484') },
      { label: bi('Classification', 'التصنيف'), value: bi('Grade 3', 'الدرجة الثالثة') },
      { label: bi('Credit rating', 'درجة التقييم الائتماني'), value: bi('BB') },
      { label: bi('Technical score', 'درجة التقييم الفني'), value: bi('82.925') },
    ],
  },
  {
    id: 'sca-membership',
    group: 'government',
    title: bi('Saudi Contractors Authority', 'الهيئة السعودية للمقاولين'),
    kind: bi('Contractor membership certificate', 'شهادة عضوية مقاول'),
    issuer: bi('Saudi Contractors Authority', 'الهيئة السعودية للمقاولين'),
    issued: '2025-08-19',
    expires: '2026-01-11',
    thumb: `${BASE}/sca-membership-thumb.jpg`,
    pages: [`${BASE}/sca-membership.jpg`],
    file: `${BASE}/sca-membership.pdf`,
    facts: [{ label: bi('Membership no.', 'رقم العضوية'), value: bi('419341932') }],
  },
  {
    id: 'monshaat',
    group: 'government',
    title: bi('Monsha’at SME certificate', 'شهادة منشآت'),
    kind: bi('Small and medium enterprise', 'منشأة صغيرة ومتوسطة'),
    issuer: bi(
      'Small and Medium Enterprises General Authority (Monsha’at)',
      'الهيئة العامة للمنشآت الصغيرة والمتوسطة (منشآت)'
    ),
    issued: '2025-12-07',
    expires: '2026-12-07',
    thumb: `${BASE}/monshaat-thumb.jpg`,
    pages: [`${BASE}/monshaat.jpg`],
    file: `${BASE}/monshaat.pdf`,
    wide: true,
    ratio: 1.627,
    facts: [
      { label: bi('Certificate no.', 'رقم الشهادة'), value: bi('25425282234') },
      { label: bi('Validity', 'مدة الصلاحية'), value: bi('One year from issue date', 'سنة من تاريخ الإصدار') },
    ],
  },

  /* completion and reference letters */
  {
    id: 'khyber',
    group: 'letters',
    title: bi('Khyber International Construction', 'خيبر إنترناشونال كونستركشن'),
    kind: bi('Waterproofing, Jazan', 'العزل المائي، جازان'),
    issuer: bi('Khyber International Construction Co.', 'شركة خيبر إنترناشونال كونستركشن'),
    issued: '2023-03-25',
    thumb: `${BASE}/khyber-thumb.jpg`,
    pages: [`${BASE}/khyber.jpg`],
    file: `${BASE}/khyber.pdf`,
    facts: [
      { label: bi('Project', 'المشروع'), value: bi('Employees Residential Project', 'مشروع سكن الموظفين') },
      { label: bi('Location', 'الموقع'), value: bi('Jazan', 'جازان') },
      { label: bi('Scope', 'نطاق العمل'), value: bi('Waterproofing works', 'أعمال العزل المائي') },
      { label: bi('Completed', 'تاريخ الإنجاز'), value: bi('25 Mar 2023', '25 مارس 2023') },
    ],
  },
  {
    id: 'kaab',
    group: 'letters',
    title: bi('Kaab Modern Contracting', 'شركة الكعب الحديثة للمقاولات'),
    kind: bi('Waterproofing, Taif', 'العزل المائي، الطائف'),
    issuer: bi('Kaab Modern Contracting Co. (KMCC)', 'شركة الكعب الحديثة للمقاولات'),
    issued: '2023-10-10',
    thumb: `${BASE}/kaab-thumb.jpg`,
    pages: [`${BASE}/kaab.jpg`],
    file: `${BASE}/kaab.pdf`,
    facts: [
      { label: bi('Location', 'الموقع'), value: bi('Taif City', 'مدينة الطائف') },
      { label: bi('Scope', 'نطاق العمل'), value: bi('Waterproofing works', 'أعمال العزل المائي') },
      { label: bi('Completed', 'تاريخ الإنجاز'), value: bi('25 Aug 2023', '25 أغسطس 2023') },
    ],
  },
  {
    id: 'bedaa',
    group: 'letters',
    title: bi('Bedaa Contracting', 'شركة بدائع للمقاولات'),
    kind: bi('Waterproofing, Taif', 'العزل المائي، الطائف'),
    issuer: bi('Bedaa Contracting Co.', 'شركة بدائع للمقاولات العامة'),
    issued: '2023-11-12',
    thumb: `${BASE}/bedaa-thumb.jpg`,
    pages: [`${BASE}/bedaa.jpg`],
    file: `${BASE}/bedaa.pdf`,
    facts: [
      { label: bi('Location', 'الموقع'), value: bi('Taif City', 'مدينة الطائف') },
      { label: bi('Scope', 'نطاق العمل'), value: bi('Waterproofing works', 'أعمال العزل المائي') },
      { label: bi('Completed', 'تاريخ الإنجاز'), value: bi('29 Aug 2023', '29 أغسطس 2023') },
    ],
  },
  {
    id: 'fbc',
    group: 'letters',
    title: bi('Future Building Contracting (FBC)', 'شركة بناء المستقبل المتميزة (FBC)'),
    kind: bi('Waterproofing, Riyadh', 'العزل المائي، الرياض'),
    issuer: bi(
      'Future Building Distinguished Contracting Company',
      'شركة بناء المستقبل المتميزة للمقاولات'
    ),
    issued: '2024-10-18',
    thumb: `${BASE}/fbc-thumb.jpg`,
    pages: [`${BASE}/fbc.jpg`],
    file: `${BASE}/fbc.pdf`,
    facts: [
      { label: bi('Project', 'المشروع'), value: bi('Four Season 119', 'فور سيزن 119') },
      { label: bi('Location', 'الموقع'), value: bi('Riyadh', 'الرياض') },
      { label: bi('Scope', 'نطاق العمل'), value: bi('Waterproofing works', 'أعمال العزل المائي') },
      { label: bi('Completed', 'تاريخ الإنجاز'), value: bi('18 Oct 2024', '18 أكتوبر 2024') },
    ],
  },
  {
    id: 'ejad',
    group: 'letters',
    title: bi('Ejad United Contracting (EUCC)', 'شركة إيجاد المتحدة للمقاولات'),
    kind: bi('Waterproofing, Abha', 'العزل المائي، أبها'),
    issuer: bi('Ejad United Contracting Co.', 'شركة إيجاد المتحدة للمقاولات'),
    issued: '2024-10-25',
    thumb: `${BASE}/ejad-thumb.jpg`,
    pages: [`${BASE}/ejad.jpg`],
    file: `${BASE}/ejad.pdf`,
    facts: [
      { label: bi('Project', 'المشروع'), value: bi('Villas & Residential Buildings', 'فلل ومباني سكنية') },
      { label: bi('Location', 'الموقع'), value: bi('Abha', 'أبها') },
      { label: bi('Scope', 'نطاق العمل'), value: bi('Waterproofing works', 'أعمال العزل المائي') },
      { label: bi('Completed', 'تاريخ الإنجاز'), value: bi('25 Oct 2024', '25 أكتوبر 2024') },
    ],
  },
  {
    id: 'jeddah-first',
    group: 'letters',
    title: bi('Jeddah First Group', 'مجموعة جدة الأولى'),
    kind: bi('Reference letter, Jeddah', 'خطاب تزكية، جدة'),
    issuer: bi('Jeddah First Group for Real Estate Co.', 'شركة مجموعة جدة الأولى للاستثمارات العقارية'),
    issued: '2023-08-06',
    thumb: `${BASE}/jeddah-first-thumb.jpg`,
    pages: [`${BASE}/jeddah-first.jpg`],
    file: `${BASE}/jeddah-first.pdf`,
    facts: [
      {
        label: bi('Projects', 'المشاريع'),
        value: bi('Al Waha, Al Wurud, Al Baghdadiyah, Al Safa', 'الواحة، الورود، البغدادية، الصفا'),
      },
      {
        label: bi('Scope', 'نطاق العمل'),
        value: bi(
          'Insulation, gypsum and general finishing of residential buildings',
          'أعمال العزل والجبس والتشطيبات العامة للمباني السكنية'
        ),
      },
    ],
  },
  {
    id: 'local-content',
    group: 'government',
    title: bi('Local content certificate', 'شهادة المحتوى المحلي'),
    kind: bi('Local content score 5.51%', 'نسبة المحتوى المحلي 5.51%'),
    issuer: bi('Local Content and Government Procurement Authority (LCGPA)', 'هيئة المحتوى المحلي والمشتريات الحكومية'),
    issued: '2026-06-02',
    expires: '2026-07-31',
    thumb: `${BASE}/local-content-thumb.jpg`,
    pages: [`${BASE}/local-content.jpg`],
    file: `${BASE}/local-content.pdf`,
    wide: true,
    ratio: 1.439,
    facts: [
      { label: bi('Certificate no.', 'رقم الشهادة'), value: bi('M 273717', 'M 273717') },
      { label: bi('Local content score', 'نسبة المحتوى المحلي'), value: bi('5.51%', '5.51%') },
      { label: bi('Financial year', 'السنة المالية'), value: bi('Year ended 31 Dec 2024', 'السنة المنتهية في 31 ديسمبر 2024') },
    ],
  },
  {
    id: 'aramco-fmar',
    group: 'aramco',
    title: bi('Aramco material approval (FMAR)', 'اعتماد مواد أرامكو (FMAR)'),
    kind: bi('Waterproofing PVC membrane, Jafurah', 'غشاء PVC للعزل المائي، الجافورة'),
    issuer: bi('Saudi Aramco, document transmittal and field material approval request', 'أرامكو السعودية، مراسلة المستندات وطلب اعتماد المواد'),
    issued: '2024-08-20',
    thumb: `${BASE}/aramco-fmar-thumb.jpg`,
    pages: [1, 2].map((n) => `${BASE}/aramco-fmar-${n}.jpg`),
    file: `${BASE}/aramco-fmar.pdf`,
    facts: [
      { label: bi('Document no.', 'رقم المستند'), value: bi('JUS&ICS-AR-FMAR-0066 (Rev. A1)', 'JUS&ICS-AR-FMAR-0066 (Rev. A1)') },
      { label: bi('Project', 'المشروع'), value: bi('Jafurah Utilities, Sulfur and Interconnecting Systems, Package 3', 'مشروع الجافورة للمرافق والكبريت والأنظمة المترابطة، الحزمة 3') },
      { label: bi('Material', 'المادة'), value: bi('Waterproofing PVC membrane', 'غشاء PVC للعزل المائي') },
      { label: bi('Review result', 'نتيجة المراجعة'), value: bi('Reviewed with comments: membrane technically approved, guarantee certificate required', 'روجعت مع ملاحظات: الغشاء معتمد فنيا ويلزم تقديم شهادة ضمان') },
      { label: bi('Vendor code', 'رمز المورد'), value: bi('10110264', '10110264') },
    ],
  },
  {
    id: 'mapei-applicator',
    group: 'manufacturers',
    title: bi('Mapei approved applicator', 'مطبّق معتمد من مابي'),
    kind: bi('Mapefloor flooring systems', 'أنظمة أرضيات Mapefloor'),
    issuer: bi('Mapei Saudia (Sole Shareholder L.L.C.)', 'مابي السعودية (شركة شخص واحد ذ.م.م)'),
    issued: '2023-09-16',
    expires: '2027-06-28',
    thumb: `${BASE}/mapei-applicator-thumb.jpg`,
    pages: [`${BASE}/mapei-applicator.jpg`],
    file: `${BASE}/mapei-applicator.pdf`,
    facts: [
      { label: bi('Document no.', 'رقم المستند'), value: bi('TSD/AAC/KRCC/0126-023', 'TSD/AAC/KRCC/0126-023') },
      { label: bi('Products', 'المنتجات'), value: bi('Mapefloor CPU+/MF, CPU+/RT, FC 200 ME, I 300 SL ME', 'Mapefloor CPU+/MF, CPU+/RT, FC 200 ME, I 300 SL ME') },
    ],
  },
  {
    id: 'fosroc-applicator',
    group: 'manufacturers',
    title: bi('Fosroc approved applicator', 'مطبّق معتمد من فوسروك'),
    kind: bi('Waterproofing, epoxy flooring and repair systems', 'العزل المائي وأرضيات الإيبوكسي وأنظمة الإصلاح'),
    issuer: bi('Fosam Company Limited (Saudi Fosroc)', 'شركة فوسام المحدودة (فوسروك السعودية)'),
    issued: '2025-06-24',
    thumb: `${BASE}/fosroc-applicator-thumb.jpg`,
    pages: [`${BASE}/fosroc-applicator.jpg`],
    file: `${BASE}/fosroc-applicator.pdf`,
    facts: [
      { label: bi('Reference', 'المرجع'), value: bi('AW-CR-GEN-LE-2202025', 'AW-CR-GEN-LE-2202025') },
      { label: bi('Systems', 'الأنظمة'), value: bi('Waterproofing, epoxy flooring, repair and protection', 'العزل المائي وأرضيات الإيبوكسي والإصلاح والحماية') },
      { label: bi('Trained technicians', 'الفنيون المدرّبون'), value: bi('Six technicians named in the letter', 'ستة فنيين مذكورين في الخطاب') },
    ],
  },
  {
    id: 'kingspan-applicator',
    group: 'manufacturers',
    title: bi('Kingspan authorised applicator', 'مطبّق معتمد من كينغسباين'),
    kind: bi('Kingspan Therma TR27', 'Kingspan Therma TR27'),
    issuer: bi('Kingspan Insulation LLC', 'كينغسباين للعزل ذ.م.م'),
    issued: '2024-05-02',
    thumb: `${BASE}/kingspan-applicator-thumb.jpg`,
    pages: [`${BASE}/kingspan-applicator.jpg`],
    file: `${BASE}/kingspan-applicator.pdf`,
    facts: [
      { label: bi('Reference', 'المرجع'), value: bi('DdP/2024051', 'DdP/2024051') },
      { label: bi('Product', 'المنتج'), value: bi('Kingspan Therma TR27', 'Kingspan Therma TR27') },
      { label: bi('Support', 'الدعم'), value: bi('Periodic site visits and observations during projects', 'زيارات ومعاينات دورية للموقع خلال المشاريع') },
    ],
  },
  {
    id: 'henkel-applicator',
    group: 'manufacturers',
    title: bi('Henkel Polybit approved applicator', 'مطبّق معتمد من هنكل بوليبت'),
    kind: bi('Bitumen, cementitious and polyurethane waterproofing', 'العزل المائي بالبيتومين والمواد الإسمنتية والبولي يوريثان'),
    issuer: bi('Henkel Polybit Industries Ltd.', 'هنكل بوليبت للصناعات المحدودة'),
    issued: '2026-04-04',
    expires: '2027-04-04',
    thumb: `${BASE}/henkel-applicator-thumb.jpg`,
    pages: [`${BASE}/henkel-applicator.jpg`],
    file: `${BASE}/henkel-applicator.pdf`,
    facts: [
      { label: bi('Reference', 'المرجع'), value: bi('HPIL/KRCC/1782/2354/13', 'HPIL/KRCC/1782/2354/13') },
      { label: bi('Validity', 'مدة الصلاحية'), value: bi('One year from the date of issue', 'سنة من تاريخ الإصدار') },
    ],
  },
  {
    id: 'spfa-membership',
    group: 'manufacturers',
    title: bi('SPFA membership', 'عضوية SPFA'),
    kind: bi('Spray Polyurethane Foam Alliance', 'تحالف رغوة البولي يوريثان المرشوشة'),
    issuer: bi('Spray Polyurethane Foam Alliance (SPFA)', 'تحالف رغوة البولي يوريثان المرشوشة (SPFA)'),
    expires: '2027-07-24',
    thumb: `${BASE}/spfa-membership-thumb.jpg`,
    pages: [`${BASE}/spfa-membership.jpg`],
    file: `${BASE}/spfa-membership.pdf`,
    wide: true,
    ratio: 1.25,
    facts: [
      { label: bi('Member no.', 'رقم العضوية'), value: bi('52104592', '52104592') },
    ],
  },
  {
    id: 'techno-rubber',
    group: 'manufacturers',
    title: bi('Techno Rubber confirmation letter', 'خطاب تأكيد من تكنو رابر'),
    kind: bi('EPDM application, Jafurah Aramco', 'تركيب EPDM، الجافورة أرامكو'),
    issuer: bi('Techno Rubber Company Ltd.', 'شركة المطاط الفني المحدودة'),
    issued: '2024-05-26',
    thumb: `${BASE}/techno-rubber-thumb.jpg`,
    pages: [`${BASE}/techno-rubber.jpg`],
    file: `${BASE}/techno-rubber.pdf`,
    facts: [
      { label: bi('Project', 'المشروع'), value: bi('Jafurah, Aramco', 'الجافورة، أرامكو') },
      { label: bi('Confirmation', 'التأكيد'), value: bi('Air bubbles in the EPDM installation do not affect membrane performance or cause leakage', 'فقاعات الهواء في تركيب EPDM لا تؤثر على أداء الغشاء ولا تسبب أي تسرب') },
    ],
  },
  {
    id: 'sumou-approval',
    group: 'letters',
    title: bi('Dar Sumou waterproofing approval', 'اعتماد العزل المائي، دار سمو'),
    kind: bi('Pre-qualification submittal, Jeddah', 'طلب تأهيل مسبق، جدة'),
    issuer: bi('Project consultant, Dar Sumou', 'استشاري مشروع دار سمو'),
    issued: '2023-02-25',
    thumb: `${BASE}/sumou-approval-thumb.jpg`,
    pages: [`${BASE}/sumou-approval.jpg`],
    file: `${BASE}/sumou-approval.pdf`,
    facts: [
      { label: bi('Submittal no.', 'رقم الطلب'), value: bi('MTC_SUB_PQ_ARCH_049_R1', 'MTC_SUB_PQ_ARCH_049_R1') },
      { label: bi('Project', 'المشروع'), value: bi('Dar Sumou, 206 villas, Jeddah', 'مشروع دار سمو، 206 فلل، جدة') },
      { label: bi('Scope', 'نطاق العمل'), value: bi('Wet areas: acrylic modified cementitious coating. Roofs: polyurethane foam spray', 'المناطق الرطبة: طلاء إسمنتي معدّل بالأكريليك. الأسطح: رغوة البولي يوريثان المرشوشة') },
      { label: bi('Result', 'النتيجة'), value: bi('Approved as noted, 25 Feb 2023', 'معتمد مع الملاحظات، 25 فبراير 2023') },
    ],
  },
  {
    id: 'sinohydro-hse',
    group: 'letters',
    title: bi('Sinohydro HSE performance certificate', 'شهادة أداء الصحة والسلامة، سينوهيدرو'),
    kind: bi('Development Housing Project, Jazan', 'مشروع الإسكان التنموي، جازان'),
    issuer: bi('Sinohydro Corporation, HSE department', 'سينوهيدرو، قسم الصحة والسلامة والبيئة'),
    issued: '2022-08-24',
    thumb: `${BASE}/sinohydro-hse-thumb.jpg`,
    pages: [`${BASE}/sinohydro-hse.jpg`],
    file: `${BASE}/sinohydro-hse.pdf`,
    wide: true,
    ratio: 1.169,
    facts: [
      { label: bi('Project', 'المشروع'), value: bi('Development Housing Project for Jazan, KSA', 'مشروع الإسكان التنموي بجازان') },
      { label: bi('Recognition', 'سبب التقدير'), value: bi('Outstanding performance in health, safety and environment', 'أداء متميز في الصحة والسلامة والبيئة') },
    ],
  },
  {
    id: 'projects-completed',
    group: 'profile',
    title: bi('Projects completed', 'المشاريع المنجزة'),
    kind: bi('Register of 72 completed projects', 'سجل 72 مشروعا منجزا'),
    issuer: bi('Khabeer Al Raida Contracting Co.', 'شركة خبير الرائدة للمقاولات'),
    thumb: `${BASE}/projects-completed-thumb.jpg`,
    pages: [1, 2].map((n) => `${BASE}/projects-completed-${n}.jpg`),
    file: `${BASE}/projects-completed.pdf`,
    facts: [
      { label: bi('Projects listed', 'عدد المشاريع'), value: bi('72', '72') },
      { label: bi('Work covered', 'الأعمال'), value: bi('Waterproofing, lining, flooring, asphalt, finishing and electrical works', 'العزل المائي والتبطين والأرضيات والأسفلت والتشطيبات والأعمال الكهربائية') },
    ],
  },
  {
    id: 'org-equipment',
    group: 'profile',
    title: bi('Organization and equipment', 'الهيكل التنظيمي والمعدات'),
    kind: bi('Organizational chart and equipment list', 'الهيكل التنظيمي وقائمة المعدات'),
    issuer: bi('Khabeer Al Raida Contracting Co.', 'شركة خبير الرائدة للمقاولات'),
    thumb: `${BASE}/org-equipment-thumb.jpg`,
    pages: [1, 2].map((n) => `${BASE}/org-equipment-${n}.jpg`),
    file: `${BASE}/org-equipment.pdf`,
    facts: [
      { label: bi('Pages', 'الصفحات'), value: bi('Organizational chart, equipment list', 'الهيكل التنظيمي، قائمة المعدات') },
    ],
  },
];

const PAPER_ORDER = [
  'iso-9001', 'iso-14001', 'iso-45001',
  'classification', 'local-content', 'monshaat', 'sca-membership',
  'aramco-approval', 'aramco-fmar',
  'mapei-applicator', 'fosroc-applicator', 'kingspan-applicator', 'henkel-applicator', 'spfa-membership', 'techno-rubber',
  'khyber', 'kaab', 'bedaa', 'fbc', 'ejad', 'jeddah-first', 'sumou-approval', 'sinohydro-hse',
  'projects-completed', 'org-equipment',
];
ITEMS.sort((a, b) => PAPER_ORDER.indexOf(a.id) - PAPER_ORDER.indexOf(b.id));

const GROUPS: { id: GroupId; title: L10n; tab: L10n }[] = [
  { id: 'standards', title: bi('ISO certifications', 'شهادات الآيزو'), tab: bi('ISO', 'الآيزو') },
  { id: 'government', title: bi('Government and authority registrations', 'التسجيلات والاعتمادات الحكومية'), tab: bi('Government', 'الجهات الحكومية') },
  { id: 'aramco', title: bi('Saudi Aramco', 'أرامكو السعودية'), tab: bi('Saudi Aramco', 'أرامكو') },
  { id: 'manufacturers', title: bi('Manufacturer approvals and memberships', 'اعتمادات المصنّعين والعضويات'), tab: bi('Manufacturers', 'المصنّعون') },
  { id: 'letters', title: bi('Client completion, approval and performance letters', 'شهادات الإنجاز والاعتماد والأداء من العملاء'), tab: bi('Client letters', 'خطابات العملاء') },
  { id: 'profile', title: bi('Company profile', 'ملف الشركة'), tab: bi('Company profile', 'ملف الشركة') },
];

const REGISTRATIONS = [
  { id: 'aramco', logo: '/assets/certs/aramco.png', name: bi('Saudi Aramco', 'أرامكو السعودية'), code: bi('Vendor code 10110264', 'رمز المورد 10110264') },
  { id: 'sec', logo: '/assets/certs/sec.png', name: bi('Saudi Electricity Company', 'الشركة السعودية للكهرباء'), code: bi('Vendor code 2008453', 'رمز المورد 2008453') },
  { id: 'sca', logo: '/assets/certs/sca.png', name: bi('Saudi Contractors Authority', 'الهيئة السعودية للمقاولين'), code: bi('Membership no. 419341932', 'رقم العضوية 419341932') },
  { id: 'grade', logo: '/assets/certs/grade3.png', name: bi('Municipal classification', 'تصنيف مقدمي خدمات المدن'), code: bi('Grade 3, certificate 2024000484', 'الدرجة الثالثة، شهادة 2024000484') },
];

/* Every certificate image already has the KRCC watermark burned into its pixels
   (npm run watermark). This only stops casual right-click / drag saving. */
const blockSave = (e: React.SyntheticEvent) => e.preventDefault();

const ROTATIONS = [-1.8, 1.4, -0.8, 2, -1.3, 0.9, -2, 1.1, -0.6, 1.7, -1.5, 0.7, 1.2];

/* ------------------------------------------------------------- helpers */
const fmtDate = (iso: string, lang: Lang) =>
  new Intl.DateTimeFormat(lang === 'ar' ? 'ar-u-ca-gregory' : 'en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${iso}T00:00:00`));

const NOW = Date.now();

function validity(item: CertItem, lang: Lang): { text: string; state: 'valid' | 'ended' | 'issued' } {
  if (item.expires) {
    const date = fmtDate(item.expires, lang);
    const ended = new Date(`${item.expires}T23:59:59`).getTime() < NOW;
    return ended
      ? { text: lang === 'ar' ? `انتهت في ${date}` : `Expired ${date}`, state: 'ended' }
      : { text: lang === 'ar' ? `سارية حتى ${date}` : `Valid until ${date}`, state: 'valid' };
  }
  if (item.issued) {
    const date = fmtDate(item.issued, lang);
    return { text: lang === 'ar' ? `صدرت في ${date}` : `Issued ${date}`, state: 'issued' };
  }
  return { text: lang === 'ar' ? 'مستند الشركة' : 'Company document', state: 'issued' };
}

function useInView<T extends HTMLElement>(threshold = 0.12) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    if (typeof IntersectionObserver === 'undefined') {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen, threshold]);
  return [ref, seen] as const;
}

function useCountUp(target: number, active: boolean, duration = 1300) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return value;
}

const Stat: React.FC<{ target: number; active: boolean; label: string }> = ({ target, active, label }) => {
  const value = useCountUp(target, active);
  return (
    <div className="cv-cell">
      <span className="cv-num">{value}</span>
      <span className="cv-lbl">{label}</span>
    </div>
  );
};

/* ------------------------------------------------------------ one sheet */
const Paper: React.FC<{
  item: CertItem;
  index: number;
  lang: Lang;
  onOpen: (id: string, opener: HTMLElement) => void;
}> = ({ item, index, lang, onOpen }) => {
  const sheetRef = useRef<HTMLSpanElement>(null);
  const rotation = ROTATIONS[index % ROTATIONS.length];
  const status = validity(item, lang);
  const title = item.title[lang];

  const onMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== 'mouse' || !sheetRef.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const s = sheetRef.current.style;
    s.setProperty('--ry', `${((px - 0.5) * 14).toFixed(2)}deg`);
    s.setProperty('--rx', `${((0.5 - py) * 14).toFixed(2)}deg`);
    s.setProperty('--gx', `${(px * 100).toFixed(1)}%`);
    s.setProperty('--gy', `${(py * 100).toFixed(1)}%`);
  };
  const onLeave = () => {
    if (!sheetRef.current) return;
    const s = sheetRef.current.style;
    s.setProperty('--rx', '0deg');
    s.setProperty('--ry', '0deg');
  };

  return (
    <button
      type="button"
      className={`cv-paper${item.wide ? ' cv-wide' : ''}`}
      style={{ '--i': index, '--rot': `${rotation}deg`, '--ar': item.ratio ?? 1.42 } as React.CSSProperties}
      onClick={(e) => onOpen(item.id, e.currentTarget)}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      aria-label={`${lang === 'ar' ? 'عرض' : 'View'}: ${title}`}
    >
      <span className="cv-sheet" ref={sheetRef}>
        <span className="cv-page">
          <img src={item.thumb} alt={title} loading="lazy" draggable={false} onContextMenu={blockSave} />
          <span className="cv-glare" />
          <span className="cv-open">
            <FileText size={12} />
            {item.pages.length > 1
              ? `${item.pages.length} ${lang === 'ar' ? 'صفحات' : 'pages'}`
              : lang === 'ar'
              ? 'عرض الشهادة'
              : 'View certificate'}
          </span>
        </span>
        {index % 3 === 1 ? (
          <span className="cv-tape" style={{ '--tape': `${rotation > 0 ? -4 : 3}deg` } as React.CSSProperties} />
        ) : (
          <span className="cv-pin" />
        )}
      </span>
      <span className="cv-cap">
        <span className="cv-cap-title">{title}</span>
        <span className="cv-cap-kind">{item.kind[lang]}</span>
        <span className="cv-chip" data-state={status.state}>
          <i />
          {status.text}
        </span>
      </span>
    </button>
  );
};

/* --------------------------------------------------------------- viewer */
const Viewer: React.FC<{
  items: CertItem[];
  openId: string | null;
  lang: Lang;
  onNavigate: (id: string) => void;
  onClose: () => void;
}> = ({ items, openId, lang, onNavigate, onClose }) => {
  const [zoomed, setZoomed] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const index = openId ? items.findIndex((i) => i.id === openId) : -1;
  const item = index >= 0 ? items[index] : null;
  const isAr = lang === 'ar';

  const go = useCallback(
    (delta: number) => {
      const next = items[index + delta];
      if (next) onNavigate(next.id);
    },
    [items, index, onNavigate]
  );

  useEffect(() => setZoomed(false), [openId]);

  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') go(isAr ? 1 : -1);
      if (e.key === 'ArrowRight') go(isAr ? -1 : 1);
    };
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [item, go, onClose, isAr]);

  useEffect(() => {
    if (item) closeRef.current?.focus();
    // only when the viewer opens, not on every navigation
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item === null]);

  if (!item) return null;
  const status = validity(item, lang);
  const PrevIcon = isAr ? ChevronRight : ChevronLeft;
  const NextIcon = isAr ? ChevronLeft : ChevronRight;
  const fileKind = item.file.endsWith('.pdf') ? 'PDF' : isAr ? 'صورة' : 'image';

  return (
    <div className="cv-modal" onClick={onClose} role="dialog" aria-modal="true" aria-label={item.title[lang]}>
      <div className="cv-panel" onClick={(e) => e.stopPropagation()}>
        <div className="cv-bar">
          <div className="cv-bar-text">
            <h3 className="cv-bar-title">{item.title[lang]}</h3>
            <p className="cv-bar-sub">{item.kind[lang]}</p>
          </div>
          <div className="cv-bar-actions">
            <button type="button" className="cv-ibtn" onClick={() => go(-1)} disabled={index <= 0} aria-label={isAr ? 'السابق' : 'Previous'}>
              <PrevIcon size={20} />
            </button>
            <span className="cv-pos">
              {index + 1} / {items.length}
            </span>
            <button type="button" className="cv-ibtn" onClick={() => go(1)} disabled={index >= items.length - 1} aria-label={isAr ? 'التالي' : 'Next'}>
              <NextIcon size={20} />
            </button>
            <button type="button" className="cv-ibtn" onClick={() => setZoomed((z) => !z)} aria-label={zoomed ? (isAr ? 'تصغير' : 'Zoom out') : isAr ? 'تكبير' : 'Zoom in'}>
              {zoomed ? <ZoomOut size={19} /> : <ZoomIn size={19} />}
            </button>
            <a className="cv-dl" href={item.file} download>
              <Download size={14} />
              <span>{isAr ? `تحميل ${fileKind}` : `Download ${fileKind}`}</span>
            </a>
            <button ref={closeRef} type="button" className="cv-ibtn" onClick={onClose} aria-label={isAr ? 'إغلاق' : 'Close'}>
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="cv-body">
          <div className="cv-doc" key={item.id}>
            <div
              className={`cv-doc-inner${zoomed ? ' is-zoomed' : ''}`}
              style={{ width: zoomed ? '170%' : '100%', maxWidth: zoomed ? 'none' : item.wide ? '60rem' : '38rem' }}
            >
              {item.pages.map((src, i) => (
                <img key={src} src={src} alt={`${item.title[lang]} (${i + 1})`} draggable={false} onContextMenu={blockSave} onDragStart={blockSave} onClick={() => setZoomed((z) => !z)} />
              ))}
            </div>
          </div>

          <aside className="cv-info">
            <dl>
              <div>
                <dt>{isAr ? 'الجهة المصدرة' : 'Issued by'}</dt>
                <dd>{item.issuer[lang]}</dd>
              </div>
              {item.issued && (
                <div>
                  <dt>{isAr ? 'تاريخ الإصدار' : 'Issue date'}</dt>
                  <dd>{fmtDate(item.issued, lang)}</dd>
                </div>
              )}
              {item.expires && (
                <div>
                  <dt>{isAr ? 'تاريخ الانتهاء' : 'Expiry date'}</dt>
                  <dd>
                    <span className="cv-chip" data-state={status.state}>
                      <i />
                      {status.text}
                    </span>
                  </dd>
                </div>
              )}
              {item.facts.map((f) => (
                <div key={f.label.en}>
                  <dt>{f.label[lang]}</dt>
                  <dd>{f.value[lang]}</dd>
                </div>
              ))}
            </dl>
            <p className="cv-wm-note">
              {isAr ? 'جميع النسخ المعروضة تحمل علامة KRCC المائية.' : 'Every copy shown here carries the KRCC watermark.'}
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------- section */
export const CertificationsSection: React.FC = () => {
  const { t, language } = useLanguage();
  const lang: Lang = language === 'ar' ? 'ar' : 'en';
  const [filter, setFilter] = useState<FilterId>('all');
  const [openId, setOpenId] = useState<string | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const [statsRef, statsSeen] = useInView<HTMLDivElement>(0.4);
  const [boardRef, boardSeen] = useInView<HTMLDivElement>(0.08);

  const visibleGroups = GROUPS.filter((g) => filter === 'all' || g.id === filter).map((g) => ({
    ...g,
    items: ITEMS.filter((i) => i.group === g.id),
  }));
  const flat = visibleGroups.flatMap((g) => g.items);

  const tabs: { id: FilterId; label: string; count: number }[] = [
    { id: 'all', label: lang === 'ar' ? 'الكل' : 'All documents', count: ITEMS.length },
    ...GROUPS.map((g) => ({ id: g.id as FilterId, label: g.tab[lang], count: ITEMS.filter((i) => i.group === g.id).length })),
  ];

  const open = useCallback((id: string, opener: HTMLElement) => {
    openerRef.current = opener;
    setOpenId(id);
  }, []);
  const close = useCallback(() => {
    setOpenId(null);
    openerRef.current?.focus();
  }, []);

  const onSpot = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse' || !spotRef.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    spotRef.current.style.setProperty('--mx', `${e.clientX - r.left}px`);
    spotRef.current.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  let running = 0;

  return (
    <section id="certifications" className="cv-section" onPointerMove={onSpot}>
      <div className="cv-grid" aria-hidden="true" />
      <div className="cv-spot" ref={spotRef} aria-hidden="true" />

      <div className="cv-wrap">
        <header className="cv-head">
          <div>
            <p className="cv-kicker">
              <i />
              {t.certifications.kicker}
            </p>
            <h2 className="cv-title">{t.certifications.title}</h2>
            <p className="cv-sub">{t.certifications.subtitle}</p>
          </div>

          <div className="cv-block" ref={statsRef}>
            <div className="cv-block-title">{lang === 'ar' ? 'ملف الاعتمادات' : 'Credentials on file'}</div>
            <Stat target={ITEMS.length} active={statsSeen} label={lang === 'ar' ? 'مستند' : 'Documents'} />
            <Stat target={ITEMS.filter((i) => i.group === 'standards').length} active={statsSeen} label={lang === 'ar' ? 'معايير آيزو' : 'ISO standards'} />
            <Stat target={GROUPS.length} active={statsSeen} label={lang === 'ar' ? 'تصنيفات' : 'Categories'} />
          </div>
        </header>

        <div className="cv-tabs" role="tablist" aria-label={lang === 'ar' ? 'تصفية الشهادات' : 'Filter certificates'}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={filter === tab.id}
              className="cv-tab"
              onClick={() => setFilter(tab.id)}
            >
              {tab.label}
              <b>{tab.count}</b>
            </button>
          ))}
        </div>

        <div ref={boardRef} className={`cv-boardwrap${boardSeen ? ' is-in' : ''}`}>
          <div key={filter}>
            {visibleGroups.map((group) => (
              <div className="cv-group" key={group.id}>
                <div className="cv-group-head">
                  <h3>{group.title[lang]}</h3>
                  <span className="cv-rule" />
                  <span className="cv-group-count">{group.items.length}</span>
                </div>
                <div className="cv-papers">
                  {group.items.map((item) => (
                    <Paper key={item.id} item={item} index={running++} lang={lang} onOpen={open} />
                  ))}
                  {group.id === 'standards' && (
                    <div className="cv-note">
                      <h4>{lang === 'ar' ? 'نطاق الاعتماد' : 'What the certificates cover'}</h4>
                      <p>{ISO_SCOPE[lang]}</p>
                      <p>{ISO_ISSUER[lang]}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="cv-reg">
            <h3 className="cv-reg-title">{lang === 'ar' ? 'مسجّلون ومعتمدون لدى' : 'Registered and approved with'}</h3>
            <div className="cv-reg-list">
              {REGISTRATIONS.map((r, i) => (
                <div className="cv-reg-item" key={r.id} style={{ '--i': i } as React.CSSProperties}>
                  <span className="cv-reg-logo">
                    <img src={r.logo} alt="" loading="lazy" />
                  </span>
                  <span>
                    <span className="cv-reg-name">{r.name[lang]}</span>
                    <span className="cv-reg-code">{r.code[lang]}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Viewer items={flat} openId={openId} lang={lang} onNavigate={setOpenId} onClose={close} />
    </section>
  );
};
