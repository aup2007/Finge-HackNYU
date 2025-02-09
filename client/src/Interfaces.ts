import { AxiosError } from "axios";
import { ReactNode } from "react";
export interface LikedStock {
  ticker: string;
  imageUrl: string;
  company: string;
  close: number;
  open: number;
}

export interface UpdateLikedResponse {
  message: string;
}

export interface UpdateCategoriesResponse {
  id: string;
  username: string;
  categories: string[];
  access_token: string;
}

export interface Opinion {
  heading: string;
  content: string;
}

export interface StockResponse {
  stocks: Company[];
}

export interface Company {
  id: string;
  ticker: string;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  afterHours: number;
  preMarket: number;
  company: string;
  logo_url: string;
  cash_equivalents: string | number;
  ceo: string;
  description: string;
  ebitda: string | number;
  employees: number;
  eps: string | number;
  equity: number;
  founding_date: string;
  headquarters: string;
  industry: string;
  market_cap: number;
  net_income: string | number;
  operating_income: string | number;
  report_date: string;
  revenue: number;
  total_assets: number;
  total_liabilities: number;
  website: string;
  opinion_1: Opinion;
  opinion_2: Opinion;
  opinion_3: Opinion;
  price_change: number;
  price_change_percent: number;
}

export interface NewsResponse {
  articles: NewsArticle[];
}

export interface LoginResponse {
  user_id: string;
  access_token: string;
  token_type: string;
}

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
  _id?: string; // MongoDB ID
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
  open: number;
  close: number;
}

export type StockStatus = "neutral" | "liked" | "passed";

export interface StockDetailProps {
  stock: StockWithNews;
  onLike: () => void;
  onPass: () => void;
  status: StockStatus;
}

export interface createUserResponse {
  id: string;
  username: string;
  created_at: string;
}

export interface User {
  id: string;
}

export interface AuthContextType {
  user: User | null;
  token: string;
  loginAction: (data: LoginData) => Promise<void>;
  logOut: () => void;
  error: Error | AxiosError | null;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface StockDetailProps {
  stock: StockWithNews;
  onLike: () => void;
  onPass: () => void;
  status: StockStatus;
}
