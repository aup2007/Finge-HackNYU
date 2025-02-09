from openai import OpenAI, APIError, AuthenticationError
from .config import settings

client = OpenAI(api_key=settings.PERPLEXITY_API, base_url="https://api.perplexity.ai")

class LLMChatAgent:
    def __init__(self, ticker: str):
        self.ticker = ticker
        self.messages = []
        
        # Set system message
        self.messages.append({
            "role": "system",
            "content": f"You are a knowledgeable financial assistant that provides accurate and helpful information about companies and stocks. You will search the internet when necessary and retrieve vital and relevant quantitative metrics that will aid the user in their process of trying to indentify which stocks to buy. Your Primary Function is to help the user with the company with the following ticker : {ticker}"
        })
        #Initial message required to maintain the alternating pattern
        self.messages.append({
            "role": "user",
            "content": f"Tell me about {ticker}'s business model and recent performance."
        })
        
        try:
            response = client.chat.completions.create(
                model='sonar-reasoning',
                messages=self.messages,
                temperature=0.7,
                stream=False
            )
            initial_reply = response.choices[0].message.content
            self.messages.append({"role": "assistant", "content": initial_reply})
        except Exception as e:
            self.messages.append({"role": "assistant", "content": "Unable to fetch initial information."})

    def add_user_message(self, message: str):
        self.messages.append({"role": "user", "content": message})

    def add_assistant_message(self, message: str):
        self.messages.append({"role": "assistant", "content": message})

    def get_response(self) -> str:
        try:
            response = client.chat.completions.create(
                model='sonar-reasoning',
                messages=self.messages,
                temperature=0.7,
                stream=False
            )
            reply = response.choices[0].message.content
            self.add_assistant_message(reply)
            return reply
        except AuthenticationError:
            return "Error: Authentication failed. Check your API key."
        except APIError as e:
            return f"API Error: {e}"
        except Exception as e:
            return f"Unexpected Error: {e}"
