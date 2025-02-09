import { useQuery } from "@tanstack/react-query";
import APIClient from "../api/api-client";
import { useAuth } from "./useAuth";
import { NewsResponse } from "@/interfaces";

const apiClient = new APIClient<NewsResponse>("/data/news");

export const useNewsArticles = (ticker: string) => {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["newsArticles", ticker],
    queryFn: async () => {
      const response = await apiClient.getNewsArticles(ticker, token || "");
      return response.articles;
    },
    enabled: !!token && !!ticker,
    staleTime: 1000 * 60 * 5, // Cache for 50 minutes
  });
};
