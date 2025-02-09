import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../api/api-client";
import { useAuth } from "./useAuth";

interface UpdateLikedResponse {
  message: string;
}

const apiClient = new APIClient<UpdateLikedResponse>("/users/current_user/liked-stocks");

const useUpdateLiked = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<UpdateLikedResponse, Error, { ticker: string; logoUrl: string }>({
    mutationFn: async ({ ticker, logoUrl }) => {
      return apiClient.updateLikedStocks(ticker, logoUrl, token || "");
    },
    onSuccess: async () => {
      // Immediately fetch the updated list
      await queryClient.fetchQuery({ queryKey: ["likedStocks"] });
    }
  });
};

export default useUpdateLiked;
