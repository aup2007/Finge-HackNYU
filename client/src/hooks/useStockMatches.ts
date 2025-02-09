import { useQuery } from "@tanstack/react-query";
import APIClient from "../api/api-client";
import { useAuth } from "./useAuth";

interface Opinion {
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

const apiClient = new APIClient<StockResponse>("/data/companies/by-preferences");

export const useStockMatches = () => {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["stockMatches"],
    queryFn: async () => {
      const response = await apiClient.getCompanyMatches(token || "");
      return response.stocks;
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};
