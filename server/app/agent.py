import os
import openai
from .config import settings
openai.api_key = os.getenv("DEEPSEEK_API")


class LLMChatAgent:
    def __init__(self, ticker: str, initial_prompt: str = None):
        self.ticker = ticker
        self.messages = []
        if initial_prompt:
            self.messages.append({"role": "system", "content": initial_prompt})
        else:
            # Default system message
            self.messages.append({
                "role": "system",
                "content": f"You are a conversational agent for company data of {ticker}. Use the provided data to answer user queries."
            })

    def add_user_message(self, message: str):
        self.messages.append({"role": "user", "content": message})

    def add_assistant_message(self, message: str):
        self.messages.append({"role": "assistant", "content": message})

    def get_response(self) -> str:
        response = openai.ChatCompletion.create(
            model='deepseek-reasoner',
            messages=self.messages,
            temperature=0.7,
            stream=False
        )
        reply = response.choices[0].message.content
        self.add_assistant_message(reply)
        return reply
