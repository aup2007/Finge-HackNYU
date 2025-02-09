export interface Stock {
  id?: string;
  name?: string;
  symbol?: string;
  price?: number;
  currency?: string;
  trend?: "up" | "down" | "neutral";
  category?: string;
  logo?: string;
}

export interface NewsArticle {
  id?: string;
  _id?: string;  // MongoDB ID
  company?: string;
  ticker?: string;
  title?: string;
  description?: string;
  url?: string;
  urlToImage?: string;
  publishedAt?: string;
  source?: string;
  retrievedAt?: string;
}

export interface Financials {
  reportDate?: string;
  revenue?: number;
  netIncome?: number;
  operatingIncome?: number;
  ebitda?: number;
  totalAssets?: number;
  totalLiabilities?: number;
  equity?: number;
}

export interface Opinion {
  heading: string;
  content: string;
}

export interface MarketData {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  afterHours: number;
  preMarket: number;
  date: string;
}

export interface StockWithNews extends Stock {
  news: NewsArticle[];
  description?: string;
  foundedYear?: number;
  financials?: Financials;
  quarterlyPerformance?: {
    quarter: string;
    year: number;
    change: number;
  }[];
  exchanges?: string[];
  chartImageUrl?: string;
  industry?: string;
  marketCap?: number;
  ceo?: string;
  headquarters?: string;
  website?: string;
  employees?: number;
  opinions?: Opinion[];
  marketData?: MarketData;
}

export type StockStatus = "neutral" | "liked" | "passed";

export interface StockDetailProps {
  stock: StockWithNews;
  onLike: () => void;
  onPass: () => void;
  status: StockStatus;
}
