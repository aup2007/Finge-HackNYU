"use client";

import { useState, useEffect } from "react";
import StockList from "@/components/stock-list";
import StockDetail from "@/components/stock-detail";
import { useStockMatches } from "../hooks/useStockMatches";
import { useLikedStocks } from "../hooks/useLikedStocks";
import useUpdateLiked from "../hooks/useUpdatedLiked";
import useGetStockDetails from "../hooks/useGetStockDetails";
import { Loader2 } from "lucide-react";
import type { StockWithNews, StockStatus, Stock, Company } from "@/Interfaces";

// Transform API company data to match StockWithNews type
const transformCompanyToStock = (company: Company): StockWithNews => {
  const POLYGON_API_KEY = import.meta.env.VITE_POLYGON_API_KEY;
  const logoUrl = company.logo_url
    ? `${company.logo_url}?apiKey=${POLYGON_API_KEY}`
    : "";

  return {
    id: company.id || company.ticker, // Fallback to ticker if id is not available
    name: company.company,
    symbol: company.ticker,
    close: company.close,
    open: company.open,
    price: company.close,
    currency: "USD",
    trend: company.price_change > 0 ? "up" : "down",
    category: company.industry,
    logo: logoUrl,
    description: company.description,
    foundedYear: company.founding_date
      ? new Date(company.founding_date).getFullYear()
      : undefined,
    quarterlyPerformance: [], // This could be added to the API if needed
    exchanges: ["NASDAQ"], // This could be added to the API if needed
    chartImageUrl: "/placeholder.svg?height=300&width=500", // This could be added to the API if needed
    news: [], // This could be added to the API if needed
    financials: {
      reportDate: company.report_date,
      revenue: company.revenue,
      netIncome:
        typeof company.net_income === "number" ? company.net_income : 0,
      operatingIncome:
        typeof company.operating_income === "number"
          ? company.operating_income
          : 0,
      ebitda: typeof company.ebitda === "number" ? company.ebitda : 0,
      totalAssets: company.total_assets,
      totalLiabilities: company.total_liabilities,
      equity: company.equity,
    },
    industry: company.industry,
    marketCap: company.market_cap,
    ceo: company.ceo,
    headquarters: company.headquarters,
    website: company.website,
    employees: company.employees,
    opinions: [company.opinion_1, company.opinion_2, company.opinion_3],
    marketData: {
      open: company.open,
      high: company.high,
      low: company.low,
      close: company.close,
      volume: company.volume,
      afterHours: company.afterHours,
      preMarket: company.preMarket,
      date: company.date,
    },
  };
};

export default function StockTracker() {
  const { data: companies, isLoading, error } = useStockMatches();
  const { data: likedStocks } = useLikedStocks();
  const updateLiked = useUpdateLiked();
  const [stockQueue, setStockQueue] = useState<StockWithNews[]>([]);
  const [currentStock, setCurrentStock] = useState<StockWithNews | null>(null);
  const [stockStatus, setStockStatus] = useState<StockStatus>("neutral");
  const [selectedLikedStock, setSelectedLikedStock] = useState<StockWithNews | null>(null);
  const [selectedTicker, setSelectedTicker] = useState<string | null>(null);
  const { data: stockDetails, isLoading: isLoadingDetails } = useGetStockDetails(selectedTicker || "");

  // Transform companies data when loaded
  useEffect(() => {
    if (companies) {
      const transformedStocks = companies.map(transformCompanyToStock);
      setStockQueue(transformedStocks);
    }
  }, [companies]);

  useEffect(() => {
    if (stockQueue.length > 0 && !currentStock && !selectedLikedStock) {
      setCurrentStock(stockQueue[0]);
      setStockQueue(stockQueue.slice(1));
    }
  }, [stockQueue, currentStock, selectedLikedStock]);

  useEffect(() => {
    if (stockDetails) {
      setSelectedLikedStock(transformCompanyToStock(stockDetails));
    }
  }, [stockDetails]);

  const handleAction = async (action: "like" | "pass") => {
    setStockStatus(action === "like" ? "liked" : "passed");

    if (action === "like" && currentStock) {
      try {
        await updateLiked.mutateAsync({
          ticker: currentStock.symbol || currentStock.id || "",
          imageUrl: currentStock.logo || "",
          company: currentStock.name || "",
          close: currentStock.marketData?.close || currentStock.close || 0,
          open: currentStock.marketData?.open || currentStock.open || 0,
        });
      } catch (error) {
        console.error("Failed to like stock:", error);
      }
    }

    setTimeout(() => {
      setCurrentStock(null);
      setStockStatus("neutral");
    }, 500);
  };

  const handleSelectLikedStock = (stock: Stock) => {
    const ticker = stock.symbol || stock.id;
    if (ticker) {
      setSelectedTicker(ticker);
    }
  };

  const handleBackToDiscovery = () => {
    setSelectedLikedStock(null);
    setSelectedTicker(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">
          Error loading matches. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex flex-col">
      <div
        className="fixed inset-0"
        style={{
          backgroundImage: 'url("https://andrewma.b-cdn.net/images/bg.png")',
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="relative z-10 flex w-full max-w-7xl mx-auto gap-8 h-screen pt-8 px-8">
        <div className="w-[320px] bg-white rounded-t-[50px] shadow-lg overflow-hidden flex flex-col">
          <StockList stocks={likedStocks || []} onSelectStock={handleSelectLikedStock} />
        </div>
        <div className="flex-1 bg-white rounded-t-[50px] shadow-lg overflow-hidden flex flex-col">
          {isLoadingDetails ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : selectedLikedStock ? (
            <StockDetail
              stock={selectedLikedStock}
              onBack={handleBackToDiscovery}
              status="neutral"
              mode="view"
            />
          ) : currentStock ? (
            <StockDetail
              stock={currentStock}
              onLike={() => handleAction("like")}
              onPass={() => handleAction("pass")}
              status={stockStatus}
              mode="discovery"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">No more matches available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
