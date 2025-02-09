"use client"

import { useState, useEffect } from "react"
import StockList from "@/components/stock-list"
import StockDetail from "@/components/stock-detail"
import type { StockWithNews, StockStatus, } from "@/components/types/index.ts"

const MOCK_STOCKS: StockWithNews[] = [
  {
    id: "aapl",
    name: "Apple Inc.",
    symbol: "AAPL",
    price: 123.45,
    currency: "USD",
    trend: "up",
    category: "Technology",
    logo: "/placeholder.svg?height=80&width=80",
    description:
      "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.",
    foundedYear: 1976,
    quarterlyPerformance: [
      { quarter: "Q1", year: 2023, change: 5.2 },
      { quarter: "Q4", year: 2022, change: -3.1 },
      { quarter: "Q3", year: 2022, change: 2.8 },
      { quarter: "Q2", year: 2022, change: 1.5 },
    ],
    exchanges: ["NASDAQ"],
    chartImageUrl: "/placeholder.svg?height=150&width=300",
    news: [
      {
        id: "1",
        title: "Apple Stock Jumps on Artificial Intelligence (AI) Driving iPhone Sales",
        imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-GwqzinYwQULe6sBzRQbotDdTBU0IMv.png",
        link: "#",
      },
      {
        id: "2",
        title: "Experts Predict How High Apple Stock Could Go in 2023",
        imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-GwqzinYwQULe6sBzRQbotDdTBU0IMv.png",
        link: "#",
      },
    ],
    financials: {
      reportDate: "2023-03-31",
      revenue: 94836000000,
      netIncome: 24160000000,
      operatingIncome: 28313000000,
      ebitda: 33116000000,
      totalAssets: 335033000000,
      totalLiabilities: 234955000000,
      equity: 100078000000,
    },
    industry: "Consumer Electronics",
    marketCap: 2500000000000,
    ceo: "Tim Cook",
    headquarters: "Cupertino, California, United States",
    website: "https://www.apple.com",
    employees: 164000,
  },
  {
    id: "msft",
    name: "Microsoft Inc.",
    symbol: "MSFT",
    price: 234.56,
    currency: "USD",
    trend: "up",
    category: "Technology",
    logo: "/placeholder.svg?height=80&width=80",
    description:
      "Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide. Its segments include Productivity and Business Processes, which offers Microsoft 365, Dynamics 365, LinkedIn, and Power Platform; Intelligent Cloud, which includes Azure, server products and cloud services, and Enterprise Services; and More Personal Computing, which comprises Windows, Windows Server, and gaming.",
    foundedYear: 1975,
    quarterlyPerformance: [
      { quarter: "Q1", year: 2023, change: 7.1 },
      { quarter: "Q4", year: 2022, change: 2.3 },
      { quarter: "Q3", year: 2022, change: 4.8 },
      { quarter: "Q2", year: 2022, change: 3.5 },
    ],
    exchanges: ["NASDAQ"],
    chartImageUrl: "/placeholder.svg?height=300&width=500",
    news: [
      {
        id: "3",
        title: "Microsoft's AI Innovations Boost Stock Performance",
        imageUrl: "/placeholder.svg?height=200&width=400",
        link: "#",
      },
    ],
  },
  {
    id: "amzn",
    name: "Amazon Inc.",
    symbol: "AMZN",
    price: 345.67,
    currency: "USD",
    trend: "down",
    category: "E-commerce",
    logo: "/placeholder.svg?height=80&width=80",
    description:
      "Amazon.com, Inc. engages in the retail sale of various products and services through its online stores. It operates through three segments: North America, International, and Amazon Web Services (AWS). The company offers products such as consumer electronics, apparel, books, and groceries.",
    foundedYear: 1994,
    quarterlyPerformance: [
      { quarter: "Q1", year: 2023, change: -1.2 },
      { quarter: "Q4", year: 2022, change: 0.5 },
      { quarter: "Q3", year: 2022, change: -2.8 },
      { quarter: "Q2", year: 2022, change: 1.1 },
    ],
    exchanges: ["NASDAQ"],
    chartImageUrl: "/placeholder.svg?height=300&width=500",
    news: [
      {
        id: "4",
        title: "Amazon Expands Drone Delivery, Stock Reacts",
        imageUrl: "/placeholder.svg?height=200&width=400",
        link: "#",
      },
    ],
  },
]

export default function StockTracker() {
  const [stockQueue, setStockQueue] = useState<StockWithNews[]>(MOCK_STOCKS)
  const [currentStock, setCurrentStock] = useState<StockWithNews | null>(null)
  const [stockStatus, setStockStatus] = useState<StockStatus>("neutral")
  const [likedStocks, setLikedStocks] = useState<StockWithNews[]>([])

  useEffect(() => {
    if (stockQueue.length > 0 && !currentStock) {
      setCurrentStock(stockQueue[0])
      setStockQueue(stockQueue.slice(1))
    }
  }, [stockQueue, currentStock])

  const handleAction = (action: "like" | "pass") => {
    setStockStatus(action === "like" ? "liked" : "passed")

    if (action === "like" && currentStock) {
      setLikedStocks((prev) => [...prev, currentStock])
    }

    setTimeout(() => {
      setCurrentStock(null)
      setStockStatus("neutral")
    }, 500)
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="flex w-full max-w-7xl mx-auto gap-8 h-[calc(100vh-4rem)]">
        <div className="w-[320px] bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col">
          <StockList stocks={likedStocks} onSelectStock={() => {}} />
        </div>
        <div className="flex-1 bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col">
          {currentStock && (
            <StockDetail
              stock={currentStock}
              // onLike={() => handleAction("like")}
              // onPass={() => handleAction("pass")}
              // status={stockStatus}
            />
          )}
        </div>
      </div>
    </div>
  )
}