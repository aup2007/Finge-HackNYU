import { useQuery } from "@tanstack/react-query";
import APIClient from "../api/api-client";
import { useAuth } from "./useAuth";

// Update the generic type to string[] since the endpoint returns a list of categories
const apiClient = new APIClient<string[]>(
  "/users/current_user/user_categories"
);

// A list of company categories that the user prefers - e.g. tech, finance, etc.
export const useGetUserCategories = () => {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["userCategories"],
    queryFn: async () => {
      return apiClient.getUserCategories(token);
    },
    enabled: Boolean(token),
  });
};
