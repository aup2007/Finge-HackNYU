import { useQuery } from "@tanstack/react-query";
import APIClient from "../api/api-client";
import { useAuth } from "./useAuth";
import { LikedStock, Stock } from "../interfaces";

const apiClient = new APIClient<LikedStock[]>(
  "/users/current_user/liked-stocks"
);

export const useLikedStocks = () => {
  const { token } = useAuth();

  return useQuery<LikedStock[], Error, Stock[]>({
    queryKey: ["likedStocks"],
    queryFn: () => apiClient.getLikedStocks(token || ""),
    select: (data) =>
      data.map((stock) => ({
        id: stock.ticker,
        name: stock.company,
        symbol: stock.ticker,
        price: stock.close,
        currency: "USD",
        logo: stock.imageUrl,
        category: "",
        trend: stock.close > stock.open ? "up" : stock.close < stock.open ? "down" : "neutral"
      })),
    enabled: !!token,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};
