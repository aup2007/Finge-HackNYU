import { useMutation } from "@tanstack/react-query";
import APIClient from "../api/api-client";
import { useAuth } from "./useAuth";
import { UpdateCategoriesResponse } from "@/Interfaces";

const apiClient = new APIClient<UpdateCategoriesResponse>(
  "/users/current_user/update_categories"
);

const useUpdateCategories = () => {
  const { token } = useAuth();
  return useMutation<UpdateCategoriesResponse, Error, { categories: string[] }>(
    {
      mutationFn: async (credentials: { categories: string[] }) =>
        apiClient.updateCategories(credentials.categories, token || ""),
    }
  );
};

export default useUpdateCategories;
