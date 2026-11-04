export type Language = 'en' | 'ar';

export interface ServiceDivision {
  id: string;
  order: number;
  numberPrefix: string;
  titleEn: string;
  titleAr: string;
  shortDescEn: string;
  shortDescAr: string;
  iconName: string;
  badgeEn: string;
  badgeAr: string;
  standardsEn?: string;
  standardsAr?: string;
}

export interface ServiceItem {
  id: string;
  order: number;
  divisionId?: string;
  titleEn: string;
  titleAr: string;
  shortDescEn: string;
  shortDescAr: string;
  fullDescEn: string;
  fullDescAr: string;
  applicationsEn: string[];
  applicationsAr: string[];
  iconName: string;
  badgeEn?: string;
  badgeAr?: string;
  specsEn?: string[];
  specsAr?: string[];
}

export interface MaterialCategory {
  id: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  itemsEn: string[];
  itemsAr: string[];
  type: 'waterproofing' | 'earthwork';
  tagEn: string;
  tagAr: string;
}

export interface ProjectItem {
  id: string;
  titleEn: string;
  titleAr: string;
  category: 'waterproofing' | 'insulation' | 'flooring' | 'lining' | 'concrete';
  categoryLabelEn: string;
  categoryLabelAr: string;
  locationEn: string;
  locationAr: string;
  scopeEn: string;
  scopeAr: string;
  image: string;
  statusEn: string;
  statusAr: string;
}

export interface QuoteFormData {
  fullName: string;
  companyName: string;
  phone: string;
  email: string;
  serviceCategory: string;
  materialCategory: string;
  projectLocation: string;
  projectArea: string;
  projectDetails: string;
}

export interface VendorItem {
  id: string;
  number: number;
  nameEn: string;
  nameAr: string;
  vendorCode?: string;
  codeLabelEn?: string;
  codeLabelAr?: string;
  secondaryCode?: string;
  secondaryLabel?: string;
  category: 'giga-projects' | 'energy' | 'contractors' | 'development';
  categoryLabelEn: string;
  categoryLabelAr: string;
}

