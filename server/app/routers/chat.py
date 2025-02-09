from fastapi import APIRouter, HTTPException, Depends, status, Body
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.agent import LLMChatAgent
from app.database import get_mongo_db
from app.oauth2 import get_current_user

router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)

# Global agent sessions store: key = f"{user_id}_{ticker}", value = LLMChatAgent instance
agent_sessions = {}

@router.post("/{ticker}")
async def chat_with_company(
    ticker: str,
    message: str = Body(..., embed=True),
    current_user: dict = Depends(get_current_user)
):
    user_id = current_user.get("user_id")
    session_key = f"{user_id}_{ticker.upper()}"

    # Auto-initialize the agent if it hasn't been created yet
    if session_key not in agent_sessions:
        agent_sessions[session_key] = LLMChatAgent(ticker=ticker.upper())
    
    agent = agent_sessions[session_key]
    agent.add_user_message(message)
    reply = agent.get_response()
    return {"reply": reply}
