import { useQuery } from "@tanstack/react-query";
import APIClient from "../api/api-client";
import { useAuth } from "./useAuth";
import { StockResponse } from "@/interfaces";

const apiClient = new APIClient<StockResponse>(
  "/data/companies/by-preferences"
);

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
