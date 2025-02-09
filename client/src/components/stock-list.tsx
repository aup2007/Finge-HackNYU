import type { Stock } from "@/Interfaces";
import { useState } from "react";
import ChatBox from "./chat-box";
import { ScrollArea } from "@/components/ui/scroll-area";

interface StockListProps {
  stocks: Stock[];
  onSelectStock: (stock: Stock) => void;
}
// API -> We retrieve the data from the liked_stocks
export default function StockList({ stocks, onSelectStock }: StockListProps) {
  const [chatTicker, setChatTicker] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b">
        <h1 className="mb-3 font-['PP_Pangaia'] text-3xl select-none">My Matches</h1>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-4">
          {stocks.map((stock) => (
            <div key={stock.id} className="flex items-center gap-2">
              <button
                className="flex flex-1 items-center rounded-xl bg-white p-4 transition-colors hover:bg-gray-50 shadow-sm select-none"
                onClick={() => onSelectStock(stock)}
              >
                <img
                  src={stock.logo || "/placeholder.svg"}
                  alt={stock.name}
                  className="h-10 w-10 rounded-full object-contain"
                />
                <div className="ml-4 text-left">
                  <h3 className="text-base font-['PP_Pangaia']">{stock.name}</h3>
                  <div className="flex items-center text-sm text-gray-600 font-['PP_Radio_Grotesk']">
                    <span>
                      ${stock.price?.toFixed(2)} {stock.currency}
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
              <button
                onClick={() => setChatTicker(stock.symbol || null)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-500"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </ScrollArea>
      {chatTicker && (
        <ChatBox
          ticker={chatTicker}
          isOpen={true}
          onClose={() => setChatTicker(null)}
        />
      )}
    </div>
  );
}
