import { useQuery } from "@tanstack/react-query";
import APIClient from "../api/api-client";
import { useAuth } from "./useAuth";
import { Stock } from "@/components/types";

interface LikedStock {
  ticker: string;
  imageUrl: string;
}

const apiClient = new APIClient<LikedStock[]>("/users/current_user/liked-stocks");

export const useLikedStocks = () => {
  const { token } = useAuth();

  return useQuery<LikedStock[], Error, Stock[]>({
    queryKey: ["likedStocks"],
    queryFn: () => apiClient.getLikedStocks(token || ""),
    select: (data) => data.map(stock => ({
      id: stock.ticker,
      logo: stock.imageUrl,
    })),
    enabled: !!token,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};
