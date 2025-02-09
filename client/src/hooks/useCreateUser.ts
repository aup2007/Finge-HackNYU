//Let's generate a custom hook that will handle the login logic. This hook will be used in the Login component.
import { useMutation } from "@tanstack/react-query";
import APIClient from "../api/api-client.ts";

interface createUserResponse {
  id: string;
  email: string;
  created_at: string;
}

const apiClient = new APIClient<createUserResponse>("/signup");

const useCreateUser = () =>
  useMutation<
    createUserResponse,
    Error,
    { username: string; password: string }
  >({
    mutationFn: async (credentials: { username: string; password: string }) =>
      apiClient.createUser(credentials.username, credentials.password),
  });

export default useCreateUser;
