import { useMutation } from "@tanstack/react-query";
import APIClient from "../api/api-client";
import { useAuth } from "./useAuth";
import { ChatResponse } from "../Interfaces";

const chatApiClient = new APIClient<ChatResponse>("/chat");

export const useChat = (ticker: string) => {
  const { token } = useAuth();
  // Removed initialization mutation since auto-initialization is done on chat
  const sendMessage = useMutation({
    mutationFn: (message: string) =>
      chatApiClient.sendMessage(ticker, message, token || ""),
  });

  return {
    sendMessage,
  };
};
