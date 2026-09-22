import os
from typing import Dict, Any, Optional
from fastapi import FastAPI, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

from services.agent_services import ask_agent, reset_conversation

try:
    from BACKEND.auth import get_current_user
except ImportError:
    from auth import get_current_user

load_dotenv()

app = FastAPI(
    title="Campus Placement Assistant",
    description="AI-powered campus placement assistant API with Microsoft Entra External ID authentication and Foundry RAG",
    version="1.0.0",
)

# Configure CORS origins
allowed_origins_env = os.environ.get("CORS_ORIGINS", "")
if allowed_origins_env:
    allowed_origins = [origin.strip() for origin in allowed_origins_env.split(",") if origin.strip()]
else:
    allowed_origins = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:4173",
        "http://127.0.0.1:4173",
    ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    question: str


class ChatResponse(BaseModel):
    answer: str


@app.get("/")
def root():
    return {
        "message": "Campus Placement Assistant API is running",
        "service": "Microsoft Foundry + Foundry IQ RAG",
        "auth": "Microsoft Entra External ID"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


@app.get("/auth/me")
def me(current_user: Dict[str, Any] = Depends(get_current_user)):
    return {
        "user_id": current_user["user_id"],
        "email": current_user["email"],
        "name": current_user["name"],
    }


@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest, current_user: Dict[str, Any] = Depends(get_current_user)):
    # User identity is strictly derived from the validated Entra token
    user_id = current_user["user_id"]
    answer = ask_agent(request.question, user_id=user_id)

    return {
        "answer": answer
    }


@app.post("/reset")
def reset(current_user: Dict[str, Any] = Depends(get_current_user)):
    # Reset conversation isolated to this authenticated user
    user_id = current_user["user_id"]
    reset_conversation(user_id=user_id)
    return {
        "message": "Conversation history cleared",
        "user_id": user_id
    }