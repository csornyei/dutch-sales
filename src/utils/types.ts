export interface SaleItem {
  site: SupportedSites;
  title: string;
  category: string;
  subtitle: string;
  image: string;
  link: string;
  tag: string;
  from: string;
  until: string;
  price?: string;
}

export interface SaleItemList {
  [category: string]: SaleItem[];
}

export enum SupportedSites {
  jumbo = "jumbo",
  albertHeijn = "albertHeijn",
  aldi = "aldi",
  coop = "coop",
  ekoplaza = "ekoplaza",
}
