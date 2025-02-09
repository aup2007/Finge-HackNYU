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


@router.post("/{ticker}/initialize")
async def initialize_agent(
    ticker: str,
    db: AsyncIOMotorDatabase = Depends(get_mongo_db),
    current_user: dict = Depends(get_current_user)
):
    user_id = current_user.get("user_id")
    # Create a new agent with a default system prompt including company_data.
    initial_prompt = "You are an expert financial consultant and you will answer all questions regarding the company with the ticker provided. You will search the internet and find the required data."
    agent = LLMChatAgent(ticker=ticker.upper(), initial_prompt=initial_prompt)
    agent_sessions[f"{user_id}_{ticker.upper()}"] = agent
    return {"message": f"Agent for {ticker.upper()} initialized."}


@router.post("/{ticker}")
async def chat_with_company(
    ticker: str,
    message: str = Body(..., embed=True),
    current_user: dict = Depends(get_current_user)
):
    user_id = current_user.get("user_id")
    session_key = f"{user_id}_{ticker.upper()}"

    if session_key not in agent_sessions:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Agent not initialized. Call the initialize endpoint first."
        )

    agent = agent_sessions[session_key]
    agent.add_user_message(message)
    reply = agent.get_response()
    return {"reply": reply}
