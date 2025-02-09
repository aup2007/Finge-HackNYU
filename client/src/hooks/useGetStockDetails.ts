import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import APIClient from "../api/api-client";
import { Company } from "@/Interfaces";

const apiClient = new APIClient<Company>("/data/companies");

export default function useGetStockDetails(ticker: string) {
  const { token } = useAuth();

  return useQuery<Company>({
    queryKey: ["stockDetails", ticker],
    queryFn: () => apiClient.getStockDetails(ticker, token || ""),
    enabled: !!token && !!ticker,
  });
}
