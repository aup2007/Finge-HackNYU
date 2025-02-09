import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../api/api-client";
import { useAuth } from "./useAuth";
import { UpdateLikedResponse, LikedStock } from "@/Interfaces";

const apiClient = new APIClient<UpdateLikedResponse>(
  "/users/current_user/liked-stocks"
);

const useUpdateLiked = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<UpdateLikedResponse, Error, LikedStock>({
    mutationFn: async (stock) => {
      return apiClient.updateLikedStocks(stock, token || "");
    },
    onSuccess: async () => {
      // Immediately fetch the updated list
      await queryClient.fetchQuery({ queryKey: ["likedStocks"] });
    },
  });
};

export default useUpdateLiked;
