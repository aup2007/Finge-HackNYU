import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "@/Interfaces";
import { Send } from "lucide-react";
import { useChat } from "@/hooks/useChat";

interface ChatBoxProps {
  ticker: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatBox({ ticker, isOpen, onClose }: ChatBoxProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const { sendMessage } = useChat(ticker);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || sendMessage.isPending) return;

    const userMessage = inputValue.trim();
    setInputValue("");

    // Add user message immediately
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    try {
      const response = await sendMessage.mutateAsync(userMessage);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.reply },
      ]);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-xl flex flex-col z-50">
        <div className="p-4 border-b flex justify-between items-center bg-white">
          <h2 className="text-lg font-['PP_Pangaia']">Chat with {ticker}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ✕
          </Button>
        </div>

        <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <p className="font-['PP_Radio_Grotesk']">{message.content}</p>
                </div>
              </div>
            ))}
            {sendMessage.isPending && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-3 bg-gray-100">
                  <p className="font-['PP_Radio_Grotesk']">Typing...</p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 font-['PP_Radio_Grotesk']"
              disabled={sendMessage.isPending}
            />
            <Button type="submit" disabled={sendMessage.isPending}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
