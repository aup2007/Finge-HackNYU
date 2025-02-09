import type { Stock } from "./types";
import { Filter } from "lucide-react";

interface StockListProps {
  stocks: Stock[];
  onSelectStock: (stock: Stock) => void;
}
// API -> We retrieve the data from the liked_stocks
export default function StockList({ stocks, onSelectStock }: StockListProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b">
        <h1 className="mb-3 font-['PP_Pangaia'] text-3xl">My Matches</h1>
        <button className="inline-flex items-center text-sm text-gray-500 font-['PP_Radio_Grotesk']">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </button>
      </div>
      <div className="p-6 space-y-4">
        {stocks.map((stock) => (
          <button
            key={stock.id}
            className="flex w-full items-center rounded-xl bg-white p-4 transition-colors hover:bg-gray-50 shadow-sm"
            onClick={() => onSelectStock(stock)}
          >
            <img
              src={stock.logo || "/placeholder.svg"}
              alt={stock.name}
              className="h-10 w-10 rounded-full"
            />
            <div className="ml-4 text-left">
              <h3 className="text-base font-['PP_Pangaia']">{stock.name}</h3>
              <div className="flex items-center text-sm text-gray-600 font-['PP_Radio_Grotesk']">
                <span>
                  ${stock.price} {stock.currency}
                </span>
                {stock.trend === "up" && (
                  <span className="ml-1 text-green-500">↗</span>
                )}
                {stock.trend === "down" && (
                  <span className="ml-1 text-red-500">↘</span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
