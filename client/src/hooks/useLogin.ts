//Let's generate a custom hook that will handle the login logic. This hook will be used in the Login component.
import { useMutation } from "@tanstack/react-query";
import APIClient from "../api/api-client.ts";

interface LoginResponse {
  user_id: string;
  access_token: string;
  token_type: string;
}

const apiClient = new APIClient<LoginResponse>("/login");

const useLogin = () =>
  useMutation<LoginResponse, Error, { username: string; password: string }>({
    mutationFn: async (credentials: { username: string; password: string }) =>
      apiClient.login(credentials.username, credentials.password),
  });

export default useLogin;
