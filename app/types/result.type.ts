export interface ResultEntry {
  provider: Provider;
  tariff:   Tariff;
  id:       number;
}

export interface Provider {
  id:            number;
  name:          string;
  logoUrl:       string;
  totalRatings:  number;
  averageRating: number;
}

export interface Tariff {
  id:                     number;
  versionId:              number;
  name:                   string;
  price:                  number;
  onliner:                boolean;
  currencyCode:           string;
  serviceLevelStationary: string;
  serviceLevelAmbulatory: string;
  careLevelList:          CareLevelList[];
  featureList:            FeatureList[];
  highlights:             Highlight[];
  tariffGrade:            TariffGrade;
  reports:                Report[];
  onetimePaymentAmount:   number;
  filters:                Filter[];
}

export interface CareLevelList {
  level:              number;
  amountStationary:   number;
  amountAmbulatory:   number;
  iconNameStationary: string;
  iconNameAmbulatory: string;
  currencyCode:       string;
}

export interface FeatureList {
  name:          string;
  value:         string;
  description?:  string;
  type:          string;
  price?:        number;
  currencyCode?: string;
}

export interface Filter {
  name:  string;
  type:  Type;
  value: boolean | ValueClass;
}

export enum Type {
  Nested = "nested",
  Simple = "simple",
}

export interface ValueClass {
  none:      boolean;
  low:       boolean;
  good:      boolean;
  very_good: boolean;
}

export interface Highlight {
  value:           string;
  label:           string;
  type:            string;
  group:           string;
  description:     string;
  order:           number;
  tooltipHeadline: string;
  tooltip:         string;
}

export interface Report {
  thumbnail: string;
  name:      string;
  published: string;
  text:      string;
}

export interface TariffGrade {
  grade:      Grade;
  totalScore: number;
  maxScore:   number;
  categories: Category[];
}

export interface Category {
  featureCategory: FeatureCategory;
  totalScore:      number;
  maxScore:        number;
  features:        FeatureElement[];
}

export interface FeatureCategory {
  name: string;
}

export interface FeatureElement {
  option:  Option;
  feature: FeatureFeature;
  score:   number;
}

export interface FeatureFeature {
  name:     string;
  maxScore: number;
  order:    number;
}

export interface Option {
  value: string;
  name:  Name;
  score: number;
}

export enum Name {
  Gelb = "Gelb",
  Grün = "Grün",
  Rot = "Rot",
}

export interface Grade {
  value: number;
  name:  string;
}
